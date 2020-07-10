/* eslint-disable no-unused-vars */
function errorMiddleware(err, req, res, next) {
  return res.status(err.code || 500).json({
    message: err.message || 'Unexpected error',
  })
}

module.exports = errorMiddleware
