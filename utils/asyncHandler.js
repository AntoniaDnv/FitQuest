// Async handler — wraps async controllers so thrown errors reach Express' error middleware.
// (Stefan) Keeps controllers clean of repetitive try/catch.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
