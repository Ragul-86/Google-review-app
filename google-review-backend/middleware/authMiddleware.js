const jwt = require("jsonwebtoken");

module.exports = (
  req,
  res,
  next
) => {
  try {
    const token =
      req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Access Denied",
      });
    }

    const verified = jwt.verify(
      token,
      "mySuperSecretKey123"
    );

    req.admin = verified;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message:
        "Invalid Token",
    });
  }
};