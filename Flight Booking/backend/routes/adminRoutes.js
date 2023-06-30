import express from "express";
import {
  authAdmin,
  registerAdmin,
} from "../controllers/adminControllers.js";
//import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerAdmin);
router.post("/login", authAdmin);

export default router;
