// Simple user schema validation
class User {
    constructor(data) {
        this.validateUser(data);
        this._id = data._id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.phone = data.phone;
        this.role = data.role || 'user';
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    validateUser(data) {
        if (!data.name) throw new Error('Name is required');
        if (!data.email) throw new Error('Email is required');
        if (!data.password) throw new Error('Password is required');
        if (!data.phone) throw new Error('Phone is required');
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            throw new Error('Invalid email format');
        }
    }
}

module.exports = User; 