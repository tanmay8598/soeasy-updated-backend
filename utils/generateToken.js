const jwt = require("jsonwebtoken");

const generateToken = (id, name, email, isSalesMan, isAppointed) => {
  return jwt.sign(
    { id, name: name, email: email, isSalesMan: isSalesMan, isAppointed: isAppointed },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = generateToken;
