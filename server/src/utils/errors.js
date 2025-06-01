/**
 * Restaurant
 */
class RestaurantNotFound extends Error {
  constructor(message = "Restaurante no encontrado") {
    super(message);
    this.name = "RestaurantNotFound";
    this.statusCode = 404;
  }
}

class InvalidRestaurantId extends Error {
  constructor() {
    super("ID de restaurante no válido");
    this.name = "InvalidRestaurantId";
    this.statusCode = 400;
  }
}
class InvalidRestaurantData extends Error {
  constructor(message = "Datos inválidos para crear un restaurante") {
    super(message);
    this.name = "InvalidRestaurantData";
    this.statusCode = 400;
  }
}

class RestaurantAlreadyExists extends Error {
  constructor() {
    super("Ya existe un restaurante con ese nombre en esa ubicación");
    this.name = "RestaurantAlreadyExists";
    this.statusCode = 409;
  }
}
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;

    if (!message) {
      this.message = "Error de validación";
    }
  }
}
/**
 * Review
 */
class NoReviewsFound extends Error {
  constructor() {
    super("No reviews for this user");
    this.name = "NoReviewsFound";
    this.statusCode = 404;
  }
}
class NoRestaurantReviewsFound extends Error {
  constructor() {
    super("No reviews for this restaurant");
    this.name = "NoReviewsRestaurant";
    this.statusCode = 404;
  }
}
class MissingReviewFields extends Error {
  constructor() {
    super("The text or rating is missing");
    this.name = "MissingReviewFields";
    this.statusCode = 404;
  }
}
class ReviewAlreadyExists extends Error {
  constructor() {
    super("Review already exist");
    this.name = "ReviewAlreadyExists";
    this.statusCode = 404;
  }
}
class ReviewNotFound extends Error {
  constructor() {
    super("Review not Found");
    this.name = "ReviewNotFound";
    this.statusCode = 404;
  }
}
class NotAuthorizedToUpdateReview extends Error {
  constructor() {
    super("No authorized to update this review");
    this.name = "NoAuthorizedToUpdateReview";
    this.statusCode = 404;
  }
}
class NoImageProvided extends Error {
  constructor() {
    super("No image provided");
    this.name = "NoImageProvided";
    this.statusCode = 404;
  }
}
class NotAuthorizedToDeleteReview extends Error {
  constructor() {
    super("No authorized to delete this review");
    this.name = "NoAuthorizedToDeleteReview";
    this.statusCode = 404;
  }
}
class ReviewImageNotValid extends Error {
  constructor() {
    super("No image to delete");
    this.name = "ReviewImageNotValid";
    this.statusCode = 404;
  }
}
class ErrorDeleteImage extends Error {
  constructor() {
    super("Error to delete");
    this.name = "ErrorDeleteImage";
    this.statusCode = 404;
  }
}
/**
 * Favorite
 */
class NoFavoritesFound extends Error {
  constructor() {
    super("No favorites yet");
    this.name = "NoFavoritesFound";
    this.statusCode = 404;
  }
}
class RestaurantIdNotProvided extends Error {
  constructor() {
    super("ID restaurant is not provided");
    this.name = "RestaurantIdNotProvided";
    this.statusCode = 400;
  }
}

class FavoriteAlreadyExists extends Error {
  constructor() {
    super("The restaurant is already in favorites");
    this.name = "FavoriteAlreadyExists";
    this.statusCode = 400;
  }
}
class FavoriteNotFound extends Error {
  constructor() {
    super("Favorite not found");
    this.statusCode = 404;
  }
}

class NotAuthorizedToDeleteFavorite extends Error {
  constructor() {
    super("Not authorized to delete another user's favorites");
    this.statusCode = 403;
  }
}

/**
 *  authController
 */

class EmailNotFound extends Error{
    constructor(){
        super("El email de usuario no existe");
        this.statusCode = 400;
    }
}
class IncorrectPassword extends Error{
    constructor(){
        super("Contraseña incorrecta");
        this.statusCode = 400;
    }
}
/**
 *  userController
 */
class UserNameNotProvided extends Error {
    constructor(){
        super("Nombre de usuario no introducido");
        this.statusCode = 400;
    }
}

class UserEmailNotProvided extends Error {
    constructor(){
        super("Email no introducido");
        this.statusCode = 400;
    }
}
class UserPasswordNotProvided extends Error {
    constructor(){
        super("Contraseña no introducida");
        this.statusCode = 400;
    }
}

class UserRoleNotProvided extends Error {
    constructor(){
        super("User role not provided");
        this.statusCode = 400;
    }
}

class UserRoleIncorrect extends Error {
    constructor(){
        super("User role is not correct, it must be 'client' or 'admin'");
        this.statusCode = 400;
    }
}
class UserEmailAlreadyExists extends Error{
    constructor(){
        super("Email de usuario ya existe");
        this.statusCode = 400;
    }
}
class UsernameAlreadyExists extends Error{
    constructor(){
        super("Username already exists");
        this.statusCode = 400;
    }
}
class NoUsersFound extends Error {
  constructor() {
    super("No se encuentra este usuario");
    this.statusCode = 404;
  }
}

class UserInvalidCredentials extends Error {
    constructor(){
        super("Credenciales incorrectas");
        this.statusCode = 401;
    }
}
class InvalidUserId extends Error {
  constructor() {
    super("Invalid ID User");
    this.name = "InvalidUserId";
    this.statusCode = 400;
  }
}

class UserNotFound extends Error {
  constructor() {
    super("User not found");
    this.name = "UserNotFound";
    this.statusCode = 404;
  }
}

//Paginate
class InvalidPaginationParams extends Error {
  constructor() {
    super("Invalid pagination parameters. Page and limit must be positive numbers.");
    this.statusCode = 400;
  }
}
//authMiddleware
class UnauthorizedError extends Error {
  constructor(message = "No estás autorizado") {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

class TokenExpiredError extends Error {
  constructor(message = "Token expirado") {
    super(message);
    this.name = "TokenExpiredError";
    this.statusCode = 401;
  }
}

class InvalidTokenError extends Error {
  constructor(message = "Token inválido") {
    super(message);
    this.name = "InvalidTokenError";
    this.statusCode = 401;
  }
}

export {
    RestaurantNotFound ,
    InvalidRestaurantId,
    InvalidRestaurantData,
    RestaurantAlreadyExists,
    NoFavoritesFound,
    RestaurantIdNotProvided,
    ValidationError,
    NoReviewsFound,
    NoRestaurantReviewsFound,
    MissingReviewFields,
    ReviewAlreadyExists,
    ReviewNotFound,
    NotAuthorizedToUpdateReview,
    NotAuthorizedToDeleteReview,
    ReviewImageNotValid,
    ErrorDeleteImage,
    NoImageProvided,
    FavoriteAlreadyExists,
    FavoriteNotFound,
    NotAuthorizedToDeleteFavorite,
    EmailNotFound,
    IncorrectPassword,
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserRoleNotProvided,
    UserRoleIncorrect,
    UserEmailAlreadyExists,
    UsernameAlreadyExists,
    UserInvalidCredentials,
    NoUsersFound,
    InvalidUserId,
    UserNotFound,
    InvalidPaginationParams,
    UnauthorizedError,
    TokenExpiredError,
    InvalidTokenError
}