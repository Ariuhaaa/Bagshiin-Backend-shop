const { default: mongoose, Schema } = require("mongoose");

const CategoriesSchema = mongoose.Schema(
  {
    categoryName: String,
  },
  { collection: "Categories", timestamps: true }
);

const Categories = mongoose.model("Categories", CategoriesSchema);
module.exports = Categories;
