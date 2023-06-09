const fs = require("fs");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 3;
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

const dataFile = process.cwd() + "/data/user.json";
//id, firstname, lastname, username, password, email, password, favoriteProducs: ["",""], mostViewProducts:["",""], lastLoginDate

exports.getAll = async (request, response) => {
  try {
    const result = await userModel
      .find({})
      .populate("favoriteProducts")
      .populate("mostViewProducts");
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
    const result = await userModel
      .findById({ _id: _id })
      .populate("favoriteProducts")
      .populate("mostViewProducts");
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
  const newPassword = await bcrypt.hash(request.body.password, saltRounds);
  const newObj = new userModel({ ...request.body, password: newPassword });

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
    return response.json({ status: false, message: "user id not found" });

  try {
    const result = await userModel.updateOne({ _id: id }, request.body);
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
    return response.json({ status: false, message: "user id not found" });

  try {
    const result = await userModel.updateOne({ _id: id }, request.body);
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

exports.login = async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password)
    return response.json({
      status: false,
      message: "medeellee buren buglunu uu",
    });

  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "30d",
    });
    response
      .status(200)
      .send({ status: true, data: user, message: "Success", token });
    return;
  } else {
    response.status(400).send({
      status: false,
      message: "user oldsongui ee, nuuts ug taarahgui bna",
    });
    return;
  }
};
