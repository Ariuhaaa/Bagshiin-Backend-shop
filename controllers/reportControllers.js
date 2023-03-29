const productModel = require("../models/user.model");
const orderModel = require("../models/order.model");
// const productModel = require("../models/user.model");
// const productModel = require("../models/user.model");

exports.getProductCountByCategory = async (request, response) => {
  try {
    const result = await productModel.aggregate([
      {
        $lookup: {
          from: "Categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
          pipeline: [
            { $group: { _id: "$categoryId", totalProducts: { $sum: 1 } } },
            {
              $sort: { totalProducts: -1 },
            },
          ],
        },
      },
    ]);
    if (result.length > 0) {
      return response.json({ status: true, result });
    }
  } catch (err) {
    return response.json({ status: false, message: err });
  }
};

exports.getProductCountByCategory = async (request, response) => {
  try {
    const result = await productModel.aggregate([
      {
        $group: { _id: "$categoryId", totalProducts: { $sum: 1 } },
      },
      {
        $sort: { totalProducts: -1 },
      },
    ]);
    if (result.length > 0) {
      return response.json({ status: true, result });
    }
  } catch (err) {
    return response.json({ status: false, message: err });
  }
};
