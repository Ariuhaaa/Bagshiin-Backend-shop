const { default: mongoose, Schema } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    favoriteProducts: { type: Schema.Types.ObjectId, ref: "Product" },
    mostViewProducts: { type: Schema.Types.ObjectId, ref: "Product" },
    address: {
      country: String,
      city: String,
      street: String,
      buildingNumber: String,
      doorNumber: String,
    },
  },
  { collection: "Users", timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
