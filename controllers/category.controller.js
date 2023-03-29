const fs = require("fs");
const uuid = require("uuid");

const categoryModel = require("../models/category.model");
//id, categoryName, icon

exports.getAll = async (request, response) => {
  try {
    const result = await categoryModel.find({});
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
    return response.json({ status: false, message: "category id not found" });

  try {
    const result = await categoryModel.findOne({ _id: id });

    console.log(result);

    if (result) {
      return response.json({ status: true, result });
    } else {
      return response.json({ status: false, message: "category not found" });
    }
  } catch (err) {
    console.log(err);
    return response.json({ status: false, message: err });
  }
};

exports.create = async (request, response) => {
  const { categoryName } = request.body;

  try {
    const newObj = new categoryModel({ categoryName });
    const result = newObj.save();

    if (result) {
      return response.json({ status: true, result, message: "Success" });
    } else {
      return response.json({
        status: false,
        message: "Hadgalahad aldaa garlaa",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (request, response) => {
  const { id } = request.params;
  const { categoryName } = request.body;

  if (!id)
    return response.json({ status: false, message: "category id not found" });

  const result = await categoryModel.findByIdAndUpdate(
    { _id: id },
    { categoryName },
    { new: true }
  );
  if (result) {
    return response.json({ status: true, result, message: "Success" });
  } else {
    return response.json({
      status: false,
      message: "Hadgalahad aldaa garlaa",
    });
  }
};

exports.delete = async (request, response) => {
  const { id } = request.params;

  if (!id)
    return response.json({ status: false, message: "category id not found" });

  try {
    const result = await categoryModel.deleteOne({ _id: id });
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
