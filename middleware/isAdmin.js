const jwt = require('jsonwebtoken');

function isAdmin(req, res, next) {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Niste prijavljeni."
    });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // mora biti admin token
    if (!decoded.tip || decoded.tip !== "admin") {
      return res.status(403).json({
        error: "Niste admin."
      });
    }

    req.adminId = decoded.id;
    req.adminRole = decoded.role; // super_admin, admin ili moderator

    next();

  } catch (error) {

    return res.status(401).json({
      error: "Token nije valjan."
    });

  }
}

module.exports = isAdmin;