const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { AppError } = require('../utils/appError');

const { User } = require('../models/user.model');
const { Bidon } = require('../models/bidon.model');

// utils
const { catchAsync } = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    where: { status: 'active' },
  });
  res.status(200).json({
    users,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({ user });
});

const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
    role,
  });

  user.password = undefined;

  res.status(201).json({
    status: 'Success',
    message: 'User has been created',
    user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { username, email } = req.body;

  await user.update({ username, email });
  res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'deleted' });

  res.status(201).json({
    status: 'success',
    message: `User account has been deleted`,
  });
});

const activateUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'active' });

  res.status(201).json({
    status: 'success',
    message: `User account has been activated`,
  });
});

const changePassword = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const { user } = req;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  await user.update({
    password: hashPassword,
  });

  user.password = undefined;

  res.status(201).json({
    status: 'Success',
    message: 'Password has been modified',
    user,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate that user exists with given email
  const user = await User.findOne({
    where: { email, status: 'active' },
  });

  // Compare password with db
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid credentials', 400));
  }

  // Generate JWT
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({ user, token });
});

const checkToken = catchAsync(async (req, res, next) => {
  res.status(200).json({ user: req.sessionUser });
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  checkToken,
  changePassword,
  activateUser,
};
