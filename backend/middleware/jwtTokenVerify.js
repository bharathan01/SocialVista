const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError.js");
const { UNAUTHORIZED } = require("../utils/httpStatusCodes.js");
const generateJwtToken = require("../utils/generatejwttoken.js");
const tryCatch = require("../utils/tryCatch.js");

const verifyJwtToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

const isAuthorizedUser = tryCatch( async(req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    throw new ApiError(
      UNAUTHORIZED,
      "Unauthorized access, Please login again! "
    );
  }
  try {
    const authorizedAccessToken = verifyJwtToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    req.userId = authorizedAccessToken.userInfo;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        throw new ApiError(
          UNAUTHORIZED,
          "Unauthorized access, Please login again! "
        );
      }

      try {
        const authorizedRefreshToken = verifyJwtToken(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET_KEY
        );
        if (!authorizedRefreshToken) {
          throw new ApiError(
            UNAUTHORIZED,
            "Unauthorized access, Please login again! "
          );
        }

        const newAccessToken = generateJwtToken(
          authorizedRefreshToken.userInfo, // Assuming userInfo contains user details
          process.env.ACCESS_TOKEN_SECRET_KEY,
          "15m"
        );

        const options = {
          httpOnly: true,
          secure: true,
        };

        res.cookie("accessToken", newAccessToken, options);
        req.userId = authorizedRefreshToken.userInfo; // Assuming userInfo contains an _id field
        return next();
      } catch (refreshError) {
        throw new ApiError(
          UNAUTHORIZED,
          "Unauthorized access, Please login again! "
        );
      }
    } else {
      throw new ApiError(
        UNAUTHORIZED,
        "Unauthorized access, Please login again! "
      );
    }
  }
});

module.exports = isAuthorizedUser;
