import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A pet must have a name'],
  },
  breed: {
    type: String,
    required: [true, 'A pet must have a breed'],
  },
  age: {
    type: String,
    required: [true, 'A pet must have an age'],
  },
  price: {
    type: Number,
    required: [true, 'A pet must have a price'],
  },
  image: {
    type: String,
    required: [true, 'A pet must have an image'],
  },
  location: {
    type: String,
    required: [true, 'A pet must have a location'],
  },
  category: {
    type: String,
    required: [true, 'A pet must have a category'],
    enum: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Small'],
  },
  status: {
    type: String,
    enum: ['available', 'adopted'],
    default: 'available',
  },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  description: String,
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pet = mongoose.model('Pet', petSchema);
export default Pet;
