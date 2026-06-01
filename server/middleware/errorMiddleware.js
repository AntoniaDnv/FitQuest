// Error Middleware
// Handles error responses

const errorMiddleware = (err, req, res, next) => {
  // Add error handling logic here
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorMiddleware;
