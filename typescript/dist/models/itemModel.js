export default class ItemModel {
    items;
    constructor() {
        this.items = [
            { id: 1, name: "商品1", price: 100 },
            { id: 2, name: "商品2", price: 200 }
        ];
    }
    findAll = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.items);
            }, 1000);
        });
    };
    findById = async (itemId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const item = this.items.find(item => item.id === itemId);
                resolve(item);
            }, 1000);
        });
    };
    create = async (properties) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newItem = {
                    id: this.items.length + 1,
                    name: properties.name,
                    price: properties.price
                };
                this.items.push(newItem);
                resolve(newItem);
            }, 1000);
        });
    };
    update = async (itemId, properties) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const itemIndex = this.items.findIndex(item => item.id === itemId);
                const originalItem = this.items[itemIndex];
                const updatedItem = { ...originalItem, ...properties };
                this.items[itemIndex] = updatedItem;
                resolve(updatedItem);
            }, 1000);
        });
    };
    delete = async (itemId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.items = this.items.filter(item => item.id !== itemId);
                resolve(itemId);
            }, 1000);
        });
    };
}
