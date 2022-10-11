const express = require('express');
const { body } = require('express-validator');

//middleware
const { protectToken } = require('../middlewares/users.middlewares');

const {
  createBidonValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

const {
  getAllBidonsByMonth,
  createBidon,
  deleteBidon,
} = require('../controllers/bidon.controller');

//router declaration
const router = express.Router();

// Apply protectToken middleware
router.use(protectToken);

router.get('/', getAllBidonsByMonth);

router.post('/', createBidonValidations, checkValidations, createBidon);

router.delete('/', deleteBidon);

module.exports = { bidonsRouter: router };
