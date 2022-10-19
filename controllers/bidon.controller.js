const { Bidon } = require('../models/bidon.model');
const { User } = require('../models/user.model');
const { AppError } = require('../utils/appError');

// utils
const { catchAsync } = require('../utils/catchAsync');

const getAllBidonsByMonth = catchAsync(async (req, res, next) => {
  //const { id } = req.params;
  const { year, month } = req.body;
  console.log('desde api:: ', year, month);

  const bidon = await Bidon.findAll({ where: { year, month } });
  res.status(200).json({
    bidon,
  });
});

const createBidon = catchAsync(async (req, res, next) => {
  const { ceco_type, ceco, ceco_desc, quantity, year, month, year_month } =
    req.body;
  const { sessionUser } = req;
  const bidon = await Bidon.create({
    ceco_type,
    ceco,
    ceco_desc,
    quantity,
    year,
    month,
    year_month,
    //userId: sessionUser.id,
  });
  res.status(201).json({ status: 'success', bidon });
});

const deleteBidon = catchAsync(async (req, res, next) => {
  const { year, month } = req.body;

  Bidon.destroy({ where: { year, month } });

  res.status(201).json({
    status: 'success',
    message: 'Bidon file have been deleted',
  });
});

module.exports = {
  getAllBidonsByMonth,
  createBidon,
  deleteBidon,
};
