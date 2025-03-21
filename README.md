# MedStore - Online Pharmacy Platform

A modern online pharmacy and healthcare platform built with Node.js and Tailwind CSS, similar to 1mg.com.

## Features

- User Authentication & Authorization
- Product Catalog with Categories
- Advanced Search Functionality
- Shopping Cart & Checkout System
- Order Management
- Product Reviews & Ratings
- Responsive Design
- Admin Dashboard

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS, Tailwind CSS
- **Authentication**: JWT, bcrypt
- **File Upload**: Multer
- **Form Validation**: Express Validator

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd medstore
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/medstore
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` in your browser

## Project Structure

```
medstore/
├── src/
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── views/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── config/
└── tests/
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 