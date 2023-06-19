const { body, validationResult } = require("express-validator");

exports.userValidator = () => {
  return [
    body("name").notEmpty().withMessage("Name is invalide"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({min: 8})
      .withMessage("Password is invalid")
      .custom(value => {
        let firstLetter = value[0]

        if (firstLetter !== firstLetter.toUpperCase()){
          throw new Error('Password is invalid')
        }
        return value
      })
  ];
};

exports.libraryValidator = () => ([
  body('bookName').notEmpty().withMessage('Invalid bookName'),
  body('quantity').isLength({min: 1}).withMessage('Invalid quantity')
])

exports.checkPassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
