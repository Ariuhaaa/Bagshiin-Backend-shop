const express = require("express");

const router = express.Router();
const category = require("../controllers/category.controller.js");
const auth = require("../middlewares/auth");

router.get("/category", auth, category.getAll);
router.get("/category/:id", auth, category.getOne);
router.post("/category", auth, category.create);
router.delete("/category/:id", auth, category.delete);
router.put("/category/:id", auth, category.update);

module.exports = router;
