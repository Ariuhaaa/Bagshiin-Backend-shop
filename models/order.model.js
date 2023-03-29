const { default: mongoose, Schema } = require("mongoose");

const ordersSchema = mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    orderNumber: String,
    totalPrice: Number,
    orderPaymentStatus: {
      paymentStatus: String,
      paymentType: String,
      paymentDate: Date,
    },
    orderDetails: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Products" },
        currentPrice: Number,
        salePercent: Number,
        quantity: Number,
      },
    ],
    isDeliveried: Boolean,
  },
  { collection: "Orders", timestamps: true }
);

const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;
