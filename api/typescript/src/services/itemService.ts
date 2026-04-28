import { Item } from "../types/item.js"
import ItemModel from "../models/itemModel.js";

export default class ItemService {
  itemModel: ItemModel;

  constructor() {
    this.itemModel = new ItemModel();
  }

  findAll = async (): Promise<Item[]> => {
    return await this.itemModel.findAll();
  };

  findById = async (itemId: number): Promise<Item|undefined> => {
    return await this.itemModel.findById(itemId);
  };

  create = async (properties: { name: string; price: number; }): Promise<Item> => {
    return await this.itemModel.create(properties);
  };

  update = async (itemId: number, properties: Partial<Item>): Promise<Item> => {
    return await this.itemModel.update(itemId, properties);
  };

  delete = async (itemId: number): Promise<number> => {
    return await this.itemModel.delete(itemId);
  };
}