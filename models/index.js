// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// create associations

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});


Tag.hasMany(ProductTag, {
  foreignKey: 'Tag_id'
});

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: "cascade",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
