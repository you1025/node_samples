import { Request, Response, NextFunction } from 'express';
import ItemService from "../services/itemService.js";

export default class ItemController {
  itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const items = await this.itemService.findAll();

      if(items.length === 0) {
        res.status(404).json({ error: "Items Empty." });
        return;
      }
      res.json(items);
    } catch(error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemId = Number(req.params.id);
      const item = await this.itemService.findById(itemId);

      if(!item) {
        res.status(404).json({ error: "Item not found." });
        return;
      }
      res.json(item);
    } catch(error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const properties = req.body;
      const newItem = await this.itemService.create(properties);
      res.status(201).json(newItem);
    } catch(error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemId = Number(req.params.id);
      const properties = req.body;
      const updatedItem = await this.itemService.update(itemId, properties);
      res.json(updatedItem);
    } catch(error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemId = Number(req.params.id);
      await this.itemService.delete(itemId);
      res.json({ message: "Delete Completed." });
    } catch(error) {
      next(error);
    }
  };
}