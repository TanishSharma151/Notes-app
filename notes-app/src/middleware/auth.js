const {getUser} = require('../service/auth.js');

const jwt = require("jsonwebtoken");

function restrictToLoggedUserOnly(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("Auth header :", req.headers.authorization);
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = jwt.verify(token, "secret123");
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}


async function checkAuth(req, res, next) {
  const token = req.cookies?.token;

  if (token) {
    const user = getUser(token);
    req.user = user || null;
  } else {
    req.user = null;
  }
  next();
}

module.exports = {
  restrictToLoggedUserOnly,
  checkAuth,
};