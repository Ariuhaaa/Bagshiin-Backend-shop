const express = require("express");

const router = express.Router();
const user = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth");

router.get("/user", auth, user.getAll);
router.get("/user/:id", auth, user.getOne);
router.post("/user", user.create);

router.delete("/user/:id", auth, user.delete);
router.put("/user", auth, user.update);
router.post("/user/login", user.login);

module.exports = router;
