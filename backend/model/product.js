const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
  },
  tags: {
    car_type: { type: String },
    company: { type: String },
    dealer: { type: String },
    model: { type: String },
    price: { type: String },
    year: { type: String }
  }
}, {
  collection: 'Cars',
  timestamps: true
});

// Custom validator for image array length
function arrayLimit(val) {
  return val.length <= 10;
}

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
