const express = require('express');
const { body } = require('express-validator');

//middleware
const {
  userExists,
  protectToken,
  protectAccountOwner,
  userDeletedExists,
} = require('../middlewares/users.middlewares');

const {
  createUserValidations,
  checkValidations,
  loginValidations,
  changePasswordValidations,
} = require('../middlewares/validations.middlewares');

//import controller functions
const {
  createUser,
  updateUser,
  deleteUser,
  login,
  getAllUsers,
  changePassword,
  activateUser,
} = require('../controllers/user.controller');

//router declaration
const router = express.Router();

router.post('/', createUserValidations, checkValidations, createUser);

router.post('/login', loginValidations, checkValidations, login);

router.get('/', getAllUsers);

// Apply protectToken middleware
router.use(protectToken);

router.patch(
  '/password/:id',
  changePasswordValidations,
  userExists,
  checkValidations,
  changePassword
);

router.patch('/active/:id', userDeletedExists, checkValidations, activateUser);

router
  .route('/:id')
  .patch(userExists, updateUser)
  .delete(userExists, deleteUser);
// .patch(userExists, protectAccountOwner, updateUser)
// .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
