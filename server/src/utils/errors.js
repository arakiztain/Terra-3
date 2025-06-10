/**
 * Project
 */
class ProjectNotFound extends Error {
  constructor(message = "Project not found") {
    super(message);
    this.name = "ProjectNotFound";
    this.statusCode = 404;
  }
}
class ProjectNameNotProvided extends Error {
  constructor(message = "Project name not provided") {
    super(message);
    this.name = "ProjectNameNotProvided";
    this.statusCode = 404;
  }
}

class UsersAssigned extends Error {
  constructor() {
    super("All provided users are already assigned to this project");
    this.name = "UsersAssigned";
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

class ProjectAlreadyExists extends Error {
  constructor() {
    super("A project with that title already exists");
    this.name = "ProjectAlreadyExists";
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
 * Issue
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
 *  authController
 */
class UserNotActive extends Error {
  constructor() {
    super("User not active");
    this.name = "UserNotActive";
    this.statusCode = 404;
  }
}
class UserHasNoPassword extends Error {
  constructor() {
    super("User has no password");
    this.name = "UserHasNoPassword";
    this.statusCode = 404;
  }
}
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

class TokenNotFound extends Error{
      constructor(){
        super("Account with token not found");
        this.statusCode = 400;
    }
}
/**
 *  userController
 */
class BadPasswordError extends Error {
  constructor(message = "The password has to be at least 8 characters long, with at least one lowercase letter, one uppercase letter and one number") {
    super(message);
    this.name = "BadPasswordError";
    this.statusCode = 400;
  }
}


class UserNameNotProvided extends Error {
    constructor(){
        super("Nombre de usuario no introducido");
        this.statusCode = 400;
    }
}

class UserEmailNotProvided extends Error {
    constructor(){
        super("Email not provided");
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
//------------------------------------------------------------
class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ForbiddenError extends Error {
  constructor(message = "You do not have permission to access this resource") {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}


export {
    ProjectNotFound,
    ProjectNameNotProvided,
    UsersAssigned,
    InvalidRestaurantData,
    ProjectAlreadyExists,
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
    EmailNotFound,
    UserNotActive,
    UserHasNoPassword,
    IncorrectPassword,
    UserNameNotProvided,
    BadPasswordError,
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
    InvalidTokenError,
    TokenNotFound,
    NotFoundError,
    ForbiddenError
}