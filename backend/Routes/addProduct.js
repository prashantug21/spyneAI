const Car = require('../model/product'); // Ensure this path is correct

async function addProduct(req, res) {
  try {
    // Ensure req.user exists and has a valid userId
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    // Destructure other data from req.body
    const {
      title,
      description,
      images,
      tags: {
        car_type,
        company,
        dealer,
        model,
        price,
        year
      }
    } = req.body;

    // Required fields check
    if (!title || !description || !images || images.length === 0) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Image array limit check
    if (images.length > 10) {
      return res.status(400).json({ message: "Image limit exceeded. Max 10 images allowed." });
    }

    // Create car document with userId from req.user
    const car = await Car.create({
      userId: req.user._id, // Set userId from req.user
      title,
      description,
      images,
      tags: {
        car_type,
        company,
        dealer,
        model,
        price,
        year
      }
    });

    // Success response
    res.status(200).json({ message: "Car added successfully", car });
  } catch (err) {
    // Handle any errors
    res.status(400).json({ message: "Failed to add car", error: err.message });
  }
};

module.exports = addProduct;
