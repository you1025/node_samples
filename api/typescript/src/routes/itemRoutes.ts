import { Router } from "express";
import ItemController from "../controllers/itemController.js";

const router = Router();
const itemController = new ItemController();

router.get("/", itemController.getAll);
router.get("/:id", itemController.getById);
router.post("/", itemController.create);
router.put("/:id", itemController.update);
router.delete("/:id", itemController.delete);

export default router;