const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  } else {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      req.user = payload;
      next();
    } catch (err) {
      res.status(400).send({ error: "Invalid token." });
    }
  }
};

const salesman = (req, res, next) => {
  const usr = req.query.user ? JSON.parse(req.query.user) : req.body.user;
  const admin = usr.isSalesMan;
  const user = usr;
  if (user && admin) {
    3;
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { auth, salesman };
