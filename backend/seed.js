import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pet from './models/petModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';

dotenv.config();

const pets = [
  {
    name: "Max",
    breed: "Golden Retriever",
    age: "8 months",
    price: 85000,
    image: "https://images.unsplash.com/photo-1661762997507-728e42d35f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZ29sZGVuJTIwcmV0cmlldmVyJTIwcHVwcHl8ZW58MXx8fHwxNzc1NTQ4NTQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Mumbai",
    category: "Dog",
    description: "Max is a friendly and energetic Golden Retriever pup looking for an active family in Mumbai."
  },
  {
    name: "Luna",
    breed: "British Shorthair",
    age: "1 year",
    price: 65000,
    image: "https://images.unsplash.com/photo-1629624467541-f73ef8f12df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicml0aXNoJTIwc2hvcnRoYWlyJTIwY2F0fGVufDF8fHx8MTc3NTU2NzUxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Bangalore",
    category: "Cat",
    description: "Luna is a calm and affectionate British Shorthair who loves to lounge in the Bangalore sun."
  },
  {
    name: "Rio",
    breed: "Macaw Parrot",
    age: "6 months",
    price: 125000,
    image: "https://images.unsplash.com/photo-1695736338019-d9258f713e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBhcnJvdCUyMGJpcmR8ZW58MXx8fHwxNzc1NTI0NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Delhi",
    category: "Bird",
    description: "Rio is a vibrant Macaw with a big personality, originally from the tropical bird markets."
  }
];

const products = [
  {
    name: "Premium Dog Food (Chicken)",
    price: 2500,
    category: "Food",
    image: "https://images.unsplash.com/photo-1767023023369-96a7c923be0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBmb29kJTIwZG9nJTIwYm93bHxlbnwxfHx8fDE3NzU2Mzg5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Nutritious and delicious chicken and rice formula for adult dogs in India."
  },
  {
    name: "Interactive Toy Set",
    price: 1500,
    category: "Toys",
    image: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjB0b3lzJTIwYW5pbWFsc3xlbnwxfHx8fDE3NzU2Mzg5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A set of 12 various toys to keep your pets engaged and active."
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await Pet.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({ role: 'admin' }); // Only reset admin for safety

    await Pet.insertMany(pets);
    await Product.insertMany(products);

    // Create Admin User
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      await User.create({
        name: 'Master Admin',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin'
      });
      console.log(`Admin user created: ${process.env.ADMIN_EMAIL}`);
    }

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
