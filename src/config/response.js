/**
 * 
 * @desc This file contain success and Error response for sending to client / user 
 * @author Onoja Igoche Matthew 
 * @since 2021 
 */

/**
 * 
 * @param {string} message 
 * @param {object | array} results 
 * @param {number} statusCode 
 */

export const success = (message, results, statusCode) => {
  return {
    message,
    error: false,
    code: statusCode,
    results
  }
}

/**
 * @desc send ady error response
 * @param {string} message 
 * @param {number} statusCode 
 * @ 
 */
export const error = (message, statusCode) => {
  // List of common HTTP request code
  const codes = [ 200, 201, 400, 401, 404, 403, 409, 422, 500 ];
  // Get matched code
  const matchedCode = codes.find(code => code === statusCode);
  if (!matchedCode) statusCode = 500;
  else statusCode = matchedCode;

  return {
    message,
    code: statusCode,
    error: true
  }
}

/**
 * @desc Send any validation response
 * @param {object | array} erors 
 */
export const validation = (errors) => {
  return {
    message: "Validation errors",
    error: true,
    code: 422,
    errors
  }
}