// Demo products data
const products = [
    {
        id: 1,
        name: 'Paracetamol',
        description: 'Effective pain relief for headaches, fever, and other common pains',
        price: 50,
        brand: 'HealthCare',
        category: 'Medicines',
        image: 'https://via.placeholder.com/300',
        stock: 100
    },
    {
        id: 2,
        name: 'Vitamin C 1000mg',
        description: 'Boost your immunity with daily Vitamin C supplements',
        price: 150,
        brand: 'VitaLife',
        category: 'Vitamins',
        image: 'https://via.placeholder.com/300',
        stock: 75
    }
];

exports.getAllProducts = (req, res) => {
    try {
        res.render('products/index', {
            title: 'Products - MedStore',
            products: products,
            user: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.getProduct = (req, res) => {
    try {
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found'
            });
        }
        res.render('products/show', {
            title: `${product.name} - MedStore`,
            product: product,
            user: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'No product found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'No product found with that ID'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide a search query'
      });
    }

    const products = await Product.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(10);

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const products = await Product.find({ category });

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Add review
exports.addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'No product found with that ID'
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: req.body.rating,
      comment: req.body.comment
    };

    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;

    // Calculate average rating
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();

    res.status(201).json({
      status: 'success',
      data: {
        review
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
}; 