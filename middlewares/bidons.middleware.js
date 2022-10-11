const { Bidon } = require('../models/bidon.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const bidonExist = catchAsync(async (req, res, next) => {
  const { year, month } = req.body;

  const bidon = await Bidon.findOne({
    where: { year, month },
  });

  if (!bidon) {
    return next(
      new AppError(
        `Table: Bidon not found given that year and month: ${(year, month)}`,
        404
      )
    );
  }

  //add user data to request
  req.bidon = bidon;

  next();
});

module.exports = { bidonExist };
