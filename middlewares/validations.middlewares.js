const { body, validationResult } = require('express-validator');

//no son asíncronas por eso no llevan catchAsync
const createUserValidations = [
  body('username').notEmpty().withMessage('Username cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const changePasswordValidations = [
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const loginValidations = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    // [msg, msg, msg] -> 'msg. msg. msg'
    const errorMsg = messages.join('. ');

    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }

  next();
};

const createBidonValidations = [
  body('ceco_type').notEmpty().withMessage('CeCo Type cannot be empty'),
  body('ceco').notEmpty().withMessage('CeCo cannot be empty'),
  body('ceco_desc').notEmpty().withMessage('CeCo Description cannot be empty'),
  body('quantity')
    .notEmpty()
    .withMessage('Quantity cannot be empty')
    .isNumeric({ min: 0 })
    .withMessage('Quantity must be over 0'),
  body('year').notEmpty().withMessage('Year cannot be empty'),
  body('month').notEmpty().withMessage('Month cannot be empty'),
  body('userId').notEmpty().withMessage('user Id cannot be empty'),
];

module.exports = {
  createUserValidations,
  createBidonValidations,
  checkValidations,
  loginValidations,
  changePasswordValidations,
};
