const allowRoles = (roles = []) => (req, res, next) => {
    const userRole = req.user.role;

    if (roles.includes(userRole)) {
      return next();
    }

    // Jika tidak termasuk, tolak akses
    return res.status(403).json({ message: "Access denied" });
  };

module.exports = { allowRoles };
