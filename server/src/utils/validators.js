import {
    UserNotFound,
    UserNotActive,
    UserHasNoPassword,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    InvalidTokenError,
    BadPasswordError,
    EmailNotFound,
} from "./errors.js";


export const isStrongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
};

export const validateActivation = (user, token, password) => {
    if (!user) throw new UserNotFound();
    if (user.activationToken !== token) throw new InvalidTokenError();
    if (!isStrongPassword(password)) throw new BadPasswordError();
};

//Login
export const validateLogin = (user, isActive, password) => {
    if (!user) throw new EmailNotFound();
    if (!isActive) throw new UserNotActive();
    if (!password) throw new UserHasNoPassword();
}

export const validateLoginFields = (email, password) => {
    if (!email) throw new UserEmailNotProvided();
    if (!password) throw new UserPasswordNotProvided();
}

//Register
export const validateRegisterFields = (email, password) => {
  if (!email) throw new UserEmailNotProvided();
  if (!password) throw new UserPasswordNotProvided();
};