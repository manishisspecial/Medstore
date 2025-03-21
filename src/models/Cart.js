class Cart {
    constructor(data) {
        this.validateCart(data);
        this._id = data._id;
        this.user = data.user;
        this.items = data.items || [];
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    validateCart(data) {
        if (!data.user) throw new Error('User is required');
        if (data.items && !Array.isArray(data.items)) {
            throw new Error('Items must be an array');
        }

        // Validate each item in the cart
        if (data.items) {
            data.items.forEach(item => {
                if (!item.product) throw new Error('Product is required for cart item');
                if (!item.quantity || item.quantity < 1) throw new Error('Valid quantity is required');
                if (!item.price || item.price < 0) throw new Error('Valid price is required');
            });
        }
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}

module.exports = Cart; 