const { body, validationResult, oneOf, check } = require("express-validator");
const ApiError = require("../utils/ApiError");
const { BAD_REQUEST } = require("../utils/httpStatusCodes");

const loginValidate = [
  check().custom((_, { req }) => {
    if (!req.body.username && !req.body.email) {
      throw new Error("Please enter either username or email!");
    }
    return true;
  }),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Please enter your password!"),
];

const registerValidate = [
  body("username").notEmpty().withMessage("Please enter your username !"),
  body("email").isEmail().withMessage("Please enter a valid email !"),
  body("password")
    .notEmpty()
    .withMessage("Please enter your password !")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters"),
  body("fullName").notEmpty().withMessage("Please enter your full name !"),
];

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(BAD_REQUEST, { errors: errors.array() });
  }
  next();
};

module.exports = {
  validateLoginFields: [...loginValidate, validateFields],
  validateRegisterFields: [...registerValidate, validateFields],
  loginValidate,
  registerValidate,
};
