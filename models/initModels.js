// Models
const { User } = require('./user.model');
const { Bidon } = require('./bidon.model');

const initModels = () => {
  // one user <–—> many bidon
  //solo cuando es <> userId (userId es lo que busca sequelize)
  //User.hasMany(Product, { foreignKey: 'user_id' });
  User.hasMany(Bidon);
  Bidon.belongsTo(User);

  //   // one user <---> many order
  //   User.hasMany(Order);
  //   Order.belongsTo(User);

  //   // one user <---> one cart
  //   User.hasOne(Cart);
  //   Cart.belongsTo(User);

  //   // one product <---> many productImg
  //   Product.hasMany(ProductImg);
  //   ProductImg.belongsTo(Product);

  //   // one product <---> one productInCart
  //   Product.hasOne(ProductInCart);
  //   ProductInCart.belongsTo(Product);

  //   // one Category <---> many product
  //   Category.hasMany(Product);
  //   Product.belongsTo(Category);

  //   // one cart <---> many productInCart
  //   Cart.hasMany(ProductInCart);
  //   ProductInCart.belongsTo(Cart);

  //   // one cart <---> one order
  //   Cart.hasOne(Order);
  //   Order.belongsTo(Cart);
};

module.exports = { initModels };
