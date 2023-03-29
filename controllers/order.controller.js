const uuid = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 3;
const myKey = "1234!@#$";

const orderModel = require("../models/order.model");

exports.getAll = async (request, response) => {
  try {
    const result = await orderModel.find({}).populate("userId").populate({
      path: "orderDetails.productId",
      select: "productId currentPrice",
    });
    if (result.length > 0) {
      return response.json({ status: true, result });
    }
  } catch (err) {
    return response.json({ status: false, message: err });
  }
};

exports.getOne = async (request, response) => {
  const { id } = request.params;

  if (!id)
    return response.json({ status: false, message: "user id not found" });

  try {
    const result = await orderModel
      .findById({ _id: id })
      .populate("userId")
      .populate({
        path: "orderDetails.productId",
        select: "productId currentPrice",
      });
    if (result) {
      return response.json({ status: true, result });
    } else {
      return response.json({ status: false, message: "product id not found" });
    }
  } catch (err) {
    return response.json({ status: false, message: err });
  }
};

exports.create = async (request, response) => {
  const {
    userId,
    orderNumber,
    totalPrice,
    orderPaymentStatus,
    orderDetails,
    isDeliveried,
  } = request.body;

  orderNumber = "AWEDEV";

  const newObj = new orderModel({
    userId,
    orderNumber,
    totalPrice,
    orderPaymentStatus,
    orderDetails,
    isDeliveried,
  });
  const result = newObj.save();
  if (result) {
    return response.json({ status: true, result, message: "Success" });
  } else {
    return response.json({
      status: false,
      message: "Hadgalahad aldaa garlaa",
    });
  }
};

exports.update = async (request, response) => {
  const { id } = request.params;
  if (!id)
    return response.json({ status: false, message: "order id not found" });

  try {
    const result = await orderModel.updateOne({ _id: id }, request.body);
    if (result.modifiedCount > 0) {
      return response.json({ status: true, result, message: "Success" });
    } else {
      return response.json({
        status: false,
        message: "Hadgalahad aldaa garlaa",
      });
    }
  } catch (err) {
    return response.json({ status: false, message: err });
  }
};

exports.delete = async (request, response) => {
  const { id } = request.params;

  if (!id)
    return response.json({ status: false, message: "ordwer id not found" });

  try {
    const result = await orderModel.updateOne({ _id: id }, request.body);
    if (result.modifiedCount > 0) {
      return response.json({ status: true, result, message: "Success" });
    } else {
      return response.json({
        status: false,
        message: "Hadgalahad aldaa garlaa",
      });
    }
  } catch (err) {
    return response.json({ status: false, message: err });
  }
};
