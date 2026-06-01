// Role Middleware
// Handles role-based access control

const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // Add role verification logic here
    next();
  };
};

module.exports = roleMiddleware;
