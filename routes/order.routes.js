const express = require("express");

const router = express.Router();
const order = require("../controllers/order.controller");

const auth = require("../middlewares/auth");

router.get("/order", auth, order.getAll);
router.get("/order/:id", auth, order.getOne);
router.post("/order", auth, order.create);
router.delete("/order/:id", auth, order.delete);
router.put("/order/:id", auth, order.update);

module.exports = router;
