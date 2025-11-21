const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      // Ensure user is authenticated and has a role
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: "Access denied. No role assigned." });
      }
  
      // Check if the user's role is in the allowedRoles list
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }
  
      next(); // Proceed if role is authorized
    };
  };
  
  module.exports = checkRole;
  