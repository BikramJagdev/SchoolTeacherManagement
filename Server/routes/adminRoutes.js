const express = require("express");
const { registerUser, loginUser } = require("../controllers/adminControllers");
const {
  teacherData,
  getTeachersDetails,
} = require("../controllers/teachersControllers");
const { authMiddleWare } = require("../middleWare/adminAuthCheck");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/teacherId", teacherData);
router.get("/teachersDetails", getTeachersDetails);

router.use(authMiddleWare);

module.exports = router;
