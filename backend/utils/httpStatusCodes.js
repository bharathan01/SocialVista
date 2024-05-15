// utils/httpStatusCodes.js

const httpStatusCodes = {
    // Client error responses (400–499)
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
  
    // Server error responses (500–599)
    INTERNAL_SERVER_ERROR: 500,
  };
  
  module.exports = httpStatusCodes;
  