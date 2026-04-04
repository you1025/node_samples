import ItemModel from "../models/itemModel.js";
export default class ItemService {
    itemModel;
    constructor() {
        this.itemModel = new ItemModel();
    }
    findAll = async () => {
        return await this.itemModel.findAll();
    };
    findById = async (itemId) => {
        return await this.itemModel.findById(itemId);
    };
    create = async (properties) => {
        return await this.itemModel.create(properties);
    };
    update = async (itemId, properties) => {
        return await this.itemModel.update(itemId, properties);
    };
    delete = async (itemId) => {
        return await this.itemModel.delete(itemId);
    };
}
