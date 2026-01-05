const jwt = require("jsonwebtoken");

const optional = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      req.user = jwt.verify(token, process.env.SECRETKEY);
    } catch (err) {
      req.user = null;
    }
  }

  next();
};

module.exports.optional = optional;


const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

auth.optional = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    req.user = null;
    return next();
  }
  return auth(req, res, next);
};

module.exports = auth;
