const { default: mongoose, Schema } = require("mongoose");

const ProductsSchema = mongoose.Schema(
  {
    productName: String,
    categoryId: { type: Schema.Types.ObjectId, ref: "Categories" },
    price: Number,
    thumbImage: String,
    images: [String],
    salePercent: Number,
    quantityInStock: Number,
    desc: String,
    isActive: Boolean,
  },
  { collection: "Products", timestamps: true }
);

const Products = mongoose.model("Products", ProductsSchema);
module.exports = Products;
