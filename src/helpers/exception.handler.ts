import { GraphQLError } from 'graphql';
import { ArgumentValidationError, Maybe } from 'type-graphql';

export const ExceptionHandler = (error: GraphQLError) => {
  const { message } = error;
  const validations: Maybe<Error> = error.originalError;
  if (validations instanceof ArgumentValidationError) {
    const { validationErrors } = validations;
    return {
      message,
      validationErrors,
    };
  }
  return error;
};
