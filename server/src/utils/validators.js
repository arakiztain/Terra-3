import { UserNotFound, InvalidTokenError, BadPasswordError } from "./errors.js";

export const isStrongPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

export const validateActivation = (user, token, password) => {
  if (!user) throw new UserNotFound();
  if (user.activationToken !== token) throw new InvalidTokenError();
  if (!isStrongPassword(password)) throw new BadPasswordError();
};

