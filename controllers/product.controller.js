const fs = require("fs");
const uuid = require("uuid");

const productModel = require("../models/product.model");
// Id, product name, categoryId, price, thumbImage, images,
// salePercent, quantity, brandId, desc, createdDate,
// UpdateDate, CreatedUser, UpdatedUser

exports.getAll = async (request, response) => {
  try {
    const result = await productModel
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
    return response.json({ status: false, message: "product id not found" });

  try {
    const result = await productModel.findOne({ _id: id });

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

exports.create = (request, response) => {
  const {
    productName,
    categoryId,
    price,
    thumbImage,
    images,
    salePercent,
    quantity,
    brandId,
    desc,
    saleFinishDate,
  } = request.body;

  try {
    const newObj = new productModel({
      productName,
      categoryId,
      price,
      thumbImage,
      images,
      salePercent,
      quantity,
      brandId,
      desc,
      saleFinishDate,
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
  } catch (err) {
    console.log(err);
  }
};

exports.update = (request, response) => {
  const { id } = request.params;
  const {
    productName,
    categoryId,
    price,
    thumbImage,
    images,
    salePercent,
    quantity,
    brandId,
    desc,
  } = request.body;

  if (!id)
    return response.json({ status: false, message: "product id not found" });

  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = JSON.parse(data);

    const updateData = parsedData.map((userObj) => {
      if (userObj.id == id) {
        return {
          ...userObj,
          productName,
          categoryId,
          price,
          thumbImage,
          images,
          salePercent,
          quantity,
          brandId,
          desc,
          updateDate: Date.now(),
        };
      } else {
        return userObj;
      }
    });

    fs.writeFile(dataFile, JSON.stringify(updateData), (writeErr) => {
      if (writeErr) {
        return response.json({ status: false, message: writeErr });
      }

      return response.json({ status: true, message: "Амжилттай засагдлаа" });
    });
  });
};

exports.delete = (request, response) => {
  const { id } = request.params;

  if (!id)
    return response.json({ status: false, message: "product id not found" });

  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = JSON.parse(data);

    const deletedData = parsedData.filter((e) => e.id != id);

    fs.writeFile(dataFile, JSON.stringify(deletedData), (writeErr) => {
      if (writeErr) {
        return response.json({ status: false, message: writeErr });
      }

      return response.json({ status: true, message: "Амжилттай устгалаа" });
    });
  });
};
