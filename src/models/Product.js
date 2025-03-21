class Product {
    constructor(data) {
        this.validateProduct(data);
        this._id = data._id;
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.category = data.category;
        this.stock = data.stock;
        this.brand = data.brand;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    validateProduct(data) {
        if (!data.name) throw new Error('Name is required');
        if (!data.price) throw new Error('Price is required');
        if (!data.category) throw new Error('Category is required');
        if (typeof data.stock !== 'number') throw new Error('Stock must be a number');
        if (!data.brand) throw new Error('Brand is required');
    }
}

module.exports = Product; 