import { Router } from "express";
import ItemController from "../controllers/itemController.js";
import { authenticateToken } from "../utils/auth.js";
const router = Router();
const itemController = new ItemController();

// 認証
router.use(authenticateToken);

router.get("/", itemController.getAll);
router.get("/:id", itemController.getById);
router.post("/", itemController.create);
router.put("/:id", itemController.update);
router.delete("/:id", itemController.delete);

export default router;