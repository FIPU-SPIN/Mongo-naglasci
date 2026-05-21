function checkRole(...allowedRoles) {
  return (req, res, next) => {

    const role = req.adminRole;

    if (!role) {
      return res.status(403).json({
        error: "Role nije definiran."
      });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        error: "Nemate dozvolu za ovu akciju."
      });
    }

    next();
  };
}

module.exports = checkRole;