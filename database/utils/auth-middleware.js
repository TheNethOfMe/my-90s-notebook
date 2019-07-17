const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // Get token
  const token = req.header("x-auth-token");
  // if (!token) return res.status(401).json({ msg: "Access Denied: No Token" });
  if (!token) return res.status(401).send("401");
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Access Denied: Bad Token" });
  }
};
