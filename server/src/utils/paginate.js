import { InvalidPaginationParams } from "./errors.js";

export const paginateQuery = async (model, filter = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    select = "",
    populate = [],
    sort = {},
  } = options;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
    throw new InvalidPaginationParams();
  }

  const skip = (pageNumber - 1) * limitNumber;
  
  const query = model.find(filter).skip(skip).limit(limitNumber).select(select).sort(sort);

  if (populate.length) {
    populate.forEach((pop) => query.populate(pop));
  }

  const [results, total] = await Promise.all([
    query.exec(),
    model.countDocuments(filter),
  ]);

  return {
    results,
    page: pageNumber,
    limit: limitNumber,
    total,
    totalPages: Math.ceil(total / limitNumber),
  };
};
