const express = require("express");

const router = express.Router();
const product = require("../controllers/product.controller.js");

const auth = require("../middlewares/auth");

router.get("/product", auth, product.getAll);
router.get("/product/:id", auth, product.getOne);
router.post("/product", auth, product.create);
router.delete("/product/:id", auth, product.delete);
router.put("/product/:id", auth, product.update);

module.exports = router;
