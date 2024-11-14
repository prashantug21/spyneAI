const User = require('../model/userModel');
const Product = require('../model/product');

async function updateProduct(req, res) {
    try {
        const itemid = req.params.itemid.replace(':', '');

        // Find the product by its ID
        let product = await Product.findById(itemid);

        // If no product is found, return a 404 error
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update the product fields with data from req.body
        Object.keys(req.body).forEach((key) => {
            product[key] = req.body[key];
        });

        // Save the updated product
        await product.save();

        // Respond with the updated product data
        return res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

module.exports = updateProduct;
