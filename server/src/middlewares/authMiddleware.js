import { verifyToken } from "../utils/token.js";
import {
  UnauthorizedError,
  TokenExpiredError,
  InvalidTokenError
} from "../utils/errors.js";

function isLoggedInAPI(req, res, next) {
  const authorization = req.headers.authorization;
  console.log("authorization", authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Token no proporcionado"));
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    req.user = {
      _id: decoded._id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new TokenExpiredError());
    }

    if (error.name === "JsonWebTokenError") {
      return next(new InvalidTokenError());
    }

    console.error("Error inesperado en verificación de token:", error);
    return next(error);
  }
}

export { isLoggedInAPI };
