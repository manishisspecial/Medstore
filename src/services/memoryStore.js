// In-memory storage service
class MemoryStore {
    constructor() {
        this.users = new Map();
        this.products = new Map();
        this.carts = new Map();
        this.orders = new Map();
    }

    // User methods
    async createUser(userData) {
        const id = Date.now().toString();
        const user = { ...userData, _id: id };
        this.users.set(id, user);
        return user;
    }

    async findUserByEmail(email) {
        return Array.from(this.users.values()).find(user => user.email === email);
    }

    async findUserById(id) {
        return this.users.get(id);
    }

    // Product methods
    async createProduct(productData) {
        const id = Date.now().toString();
        const product = { ...productData, _id: id };
        this.products.set(id, product);
        return product;
    }

    async getAllProducts() {
        return Array.from(this.products.values());
    }

    async findProductById(id) {
        return this.products.get(id);
    }

    // Cart methods
    async getCart(userId) {
        return this.carts.get(userId) || { items: [] };
    }

    async updateCart(userId, cart) {
        this.carts.set(userId, cart);
        return cart;
    }

    // Order methods
    async createOrder(orderData) {
        const id = Date.now().toString();
        const order = { ...orderData, _id: id };
        this.orders.set(id, order);
        return order;
    }

    async getOrdersByUserId(userId) {
        return Array.from(this.orders.values())
            .filter(order => order.user === userId);
    }

    async findOrderById(id) {
        return this.orders.get(id);
    }
}

module.exports = new MemoryStore(); 