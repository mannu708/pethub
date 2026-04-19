import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  category: {
    type: String,
    required: [true, 'A product must have a category'],
  },
  image: {
    type: String,
    required: [true, 'A product must have an image'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
