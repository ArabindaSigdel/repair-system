const apiResponse = require("../utility/apiResponse");

const auth = (req, res, next) => {
  const authHeader = req.head.authorization;

  if (!authHeader) {
    return res.status(401).json(
      apiResponse({
        success: false,
        message: "Authorization failed",
        data: {},
      })
    );
  }

  //Check token
  const token = authHeader.split("Bearer ")[1];
  try {
    const checkToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = checkToken;
  } catch {
    return req.status(401).json(
      apiResponse({
        success: false,
        message: "Authorization failed",
        data: {},
      })
    );
  }
  next();
};

module.exports = auth;
