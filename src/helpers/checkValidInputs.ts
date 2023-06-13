import { AuthErrors } from "../types/AuthErrors";

export const checkValidInput = (checkError: AuthErrors, input: string) => {
  switch (checkError) {
    case AuthErrors.EMAIL:
      const validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      return input.match(validRegexEmail);

    case AuthErrors.PASSWORD:
      return input.length >= 8;

    case AuthErrors.FIRSTNAME:
      return input.length >= 4;

    default:
      return;
  }
};