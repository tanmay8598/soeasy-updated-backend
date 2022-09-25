const jwt = require("jsonwebtoken");

const generateTokenAdmin = (id, name, email, isAdmin) => {
  return jwt.sign(
    { id, name: name, email: email, isAdmin: isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = generateTokenAdmin;
