class Product {
    constructor(id, name, description, price, category, image, stock = 100, rating = 4.5, reviews = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
        this.stock = stock;
        this.rating = rating;
        this.reviews = reviews;
    }

    static getAllProducts() {
        return [
            new Product(1, "Paracetamol", "Pain relief and fever reducer", 5.99, "Medicines", "/images/products/paracetamol.jpg"),
            new Product(2, "Vitamin C", "Immune system support", 12.99, "Vitamins", "/images/products/vitamin-c.jpg"),
            new Product(3, "First Aid Kit", "Complete emergency kit", 29.99, "Healthcare", "/images/products/first-aid.jpg"),
            new Product(4, "Hand Sanitizer", "Alcohol-based sanitizer", 4.99, "Personal Care", "/images/products/sanitizer.jpg"),
            new Product(5, "Baby Diapers", "Premium quality diapers", 24.99, "Baby Care", "/images/products/diapers.jpg"),
            new Product(6, "Blood Pressure Monitor", "Digital BP monitor", 49.99, "Healthcare", "/images/products/bp-monitor.jpg"),
            new Product(7, "Multivitamin", "Daily multivitamin supplement", 15.99, "Vitamins", "/images/products/multivitamin.jpg"),
            new Product(8, "Face Mask", "Surgical face mask", 9.99, "Personal Care", "/images/products/face-mask.jpg"),
            new Product(9, "Baby Lotion", "Gentle baby moisturizer", 8.99, "Baby Care", "/images/products/baby-lotion.jpg"),
            new Product(10, "Walking Stick", "Adjustable walking aid", 19.99, "Elderly Care", "/images/products/walking-stick.jpg")
        ];
    }

    static getProductsByCategory(category) {
        return this.getAllProducts().filter(product => product.category === category);
    }

    static getProductById(id) {
        return this.getAllProducts().find(product => product.id === parseInt(id));
    }
}

module.exports = Product; 