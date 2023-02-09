
const throwError = (message, status, errorObj = null) => {
  const error = new Error(message);
  error.customError = true;
  error.status = status;
  error.errorObj = errorObj;
  throw error;
}

const responseError = (res, error) => {
  if (error.customError) {
    const { status, message, errorObj } = error;
    return res.status(status).send({ message, error: errorObj });
  }
  return res.status(500).send({ message: 'An unespected error ocurred, please try again!', error: error.toString() });
}

module.exports = { throwError, responseError };
