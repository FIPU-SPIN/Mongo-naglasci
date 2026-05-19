const jwt = require('jsonwebtoken');

async function isAdmin(req, res, next) {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Niste prijavljeni."
    });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.tip !== "admin") {

      return res.status(403).json({
        error: "Samo admin može pristupiti."
      });

    }

    req.adminId = decoded.id;
    req.adminRole = decoded.role;

    next();

  } catch (error) {

    return res.status(401).json({
      error: "Token nije valjan."
    });

  }

}

module.exports = isAdmin;