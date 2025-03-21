class Order {
    constructor(data) {
        this.validateOrder(data);
        this._id = data._id;
        this.user = data.user;
        this.items = data.items || [];
        this.shippingAddress = data.shippingAddress;
        this.paymentMethod = data.paymentMethod;
        this.total = data.total;
        this.status = data.status || 'Pending';
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    validateOrder(data) {
        if (!data.user) throw new Error('User is required');
        if (!Array.isArray(data.items) || data.items.length === 0) {
            throw new Error('Order must contain items');
        }
        if (!data.shippingAddress) throw new Error('Shipping address is required');
        if (!data.paymentMethod) throw new Error('Payment method is required');
        if (typeof data.total !== 'number' || data.total <= 0) {
            throw new Error('Valid total amount is required');
        }

        // Validate shipping address
        const requiredAddressFields = ['street', 'city', 'state', 'zipCode', 'country'];
        requiredAddressFields.forEach(field => {
            if (!data.shippingAddress[field]) {
                throw new Error(`Shipping address must include ${field}`);
            }
        });

        // Validate each order item
        data.items.forEach(item => {
            if (!item.product) throw new Error('Product is required for order item');
            if (!item.quantity || item.quantity < 1) throw new Error('Valid quantity is required');
            if (!item.price || item.price < 0) throw new Error('Valid price is required');
        });
    }
}

module.exports = Order; 