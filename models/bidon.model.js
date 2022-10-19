const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Bidon = db.define('bidon', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  ceco_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ceco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ceco_desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year_month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // userId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
});

module.exports = { Bidon };
