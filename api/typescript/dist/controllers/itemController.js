import ItemService from "../services/itemService.js";
export default class ItemController {
    itemService;
    constructor() {
        this.itemService = new ItemService();
    }
    getAll = async (req, res, next) => {
        try {
            const items = await this.itemService.findAll();
            if (items.length === 0) {
                res.status(404).json({ error: "Items Empty." });
                return;
            }
            res.json(items);
        }
        catch (error) {
            next(error);
        }
    };
    getById = async (req, res, next) => {
        try {
            const itemId = Number(req.params.id);
            const item = await this.itemService.findById(itemId);
            if (!item) {
                res.status(404).json({ error: "Item not found." });
                return;
            }
            res.json(item);
        }
        catch (error) {
            next(error);
        }
    };
    create = async (req, res, next) => {
        try {
            const properties = req.body;
            const newItem = await this.itemService.create(properties);
            res.status(201).json(newItem);
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const itemId = Number(req.params.id);
            const properties = req.body;
            const updatedItem = await this.itemService.update(itemId, properties);
            res.json(updatedItem);
        }
        catch (error) {
            next(error);
        }
    };
    delete = async (req, res, next) => {
        try {
            const itemId = Number(req.params.id);
            await this.itemService.delete(itemId);
            res.json({ message: "Delete Completed." });
        }
        catch (error) {
            next(error);
        }
    };
}
