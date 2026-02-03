const mongoose = require("mongoose");
require('dotenv').config();
const uri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/InventoryManagementApp";
const User = require("./models/users");
const Product = require("./models/product");
const Store = require("./models/store");
const Purchase = require("./models/purchase");
const Sales = require("./models/sales");

async function seedDatabase() {
  try {
    // Connect to database
    console.log("Connecting to database...");
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to database successfully!");

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Product.deleteMany({});
    await Store.deleteMany({});
    await Purchase.deleteMany({});
    await Sales.deleteMany({});

    // Create default user
    console.log("Creating users...");
    const defaultUser = await User.create({
      firstName: "Ahmed",
      lastName: "Khan",
      email: "admin@example.com",
      password: "admin123",
      phoneNumber: 923001234567,
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
    });

    const user2 = await User.create({
      firstName: "Fatima",
      lastName: "Ali",
      email: "jane@example.com",
      password: "password123",
      phoneNumber: 923009876543,
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    });

    console.log("Users created:", defaultUser.email, user2.email);

    // Create products
    console.log("Creating products...");
    const products = await Product.insertMany([
      {
        userID: defaultUser._id,
        name: "Laptop",
        manufacturer: "Dell",
        stock: 50,
        description: "High-performance laptop for business use",
      },
      {
        userID: defaultUser._id,
        name: "Mouse",
        manufacturer: "Logitech",
        stock: 200,
        description: "Wireless optical mouse",
      },
      {
        userID: defaultUser._id,
        name: "Keyboard",
        manufacturer: "Corsair",
        stock: 75,
        description: "Mechanical gaming keyboard",
      },
      {
        userID: defaultUser._id,
        name: "Monitor",
        manufacturer: "Samsung",
        stock: 30,
        description: "27-inch 4K monitor",
      },
      {
        userID: defaultUser._id,
        name: "Headphones",
        manufacturer: "Sony",
        stock: 100,
        description: "Wireless noise-cancelling headphones",
      },
      {
        userID: user2._id,
        name: "Tablet",
        manufacturer: "Apple",
        stock: 25,
        description: "iPad Pro 12.9 inch",
      },
      {
        userID: user2._id,
        name: "Smartphone",
        manufacturer: "Samsung",
        stock: 80,
        description: "Galaxy S23 Ultra",
      },
    ]);

    console.log(`Created ${products.length} products`);

    // Create stores
    console.log("Creating stores...");
    const stores = await Store.insertMany([
      {
        userID: defaultUser._id,
        name: "Karachi Electronics Store",
        category: "Electronics",
        address: "123 I.I. Chundrigar Road",
        city: "Karachi",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      },
      {
        userID: defaultUser._id,
        name: "Lahore Mall Outlet",
        category: "Retail",
        address: "456 MM Alam Road",
        city: "Lahore",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      },
      {
        userID: defaultUser._id,
        name: "Islamabad Discount Store",
        category: "Discount",
        address: "789 Jinnah Avenue",
        city: "Islamabad",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop",
      },
      {
        userID: user2._id,
        name: "Rawalpindi Tech Hub",
        category: "Electronics",
        address: "321 Murree Road",
        city: "Rawalpindi",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      },
    ]);

    console.log(`Created ${stores.length} stores`);

    // Create purchases
    console.log("Creating purchases...");
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const purchases = await Purchase.insertMany([
      {
        userID: defaultUser._id,
        ProductID: products[0]._id,
        QuantityPurchased: 20,
        PurchaseDate: lastMonth.toISOString().split("T")[0],
        TotalPurchaseAmount: 2000000, // PKR 2,000,000
      },
      {
        userID: defaultUser._id,
        ProductID: products[1]._id,
        QuantityPurchased: 100,
        PurchaseDate: lastMonth.toISOString().split("T")[0],
        TotalPurchaseAmount: 500000, // PKR 500,000
      },
      {
        userID: defaultUser._id,
        ProductID: products[2]._id,
        QuantityPurchased: 50,
        PurchaseDate: today.toISOString().split("T")[0],
        TotalPurchaseAmount: 750000, // PKR 750,000
      },
      {
        userID: defaultUser._id,
        ProductID: products[3]._id,
        QuantityPurchased: 15,
        PurchaseDate: today.toISOString().split("T")[0],
        TotalPurchaseAmount: 1200000, // PKR 1,200,000
      },
      {
        userID: user2._id,
        ProductID: products[5]._id,
        QuantityPurchased: 10,
        PurchaseDate: lastMonth.toISOString().split("T")[0],
        TotalPurchaseAmount: 1500000, // PKR 1,500,000
      },
    ]);

    console.log(`Created ${purchases.length} purchases`);

    // Create sales
    console.log("Creating sales...");
    const sales = await Sales.insertMany([
      {
        userID: defaultUser._id,
        ProductID: products[0]._id,
        StoreID: stores[0]._id,
        StockSold: 5,
        SaleDate: today.toISOString().split("T")[0],
        TotalSaleAmount: 600000, // PKR 600,000
      },
      {
        userID: defaultUser._id,
        ProductID: products[1]._id,
        StoreID: stores[0]._id,
        StockSold: 25,
        SaleDate: today.toISOString().split("T")[0],
        TotalSaleAmount: 150000, // PKR 150,000
      },
      {
        userID: defaultUser._id,
        ProductID: products[2]._id,
        StoreID: stores[1]._id,
        StockSold: 10,
        SaleDate: lastMonth.toISOString().split("T")[0],
        TotalSaleAmount: 200000, // PKR 200,000
      },
      {
        userID: defaultUser._id,
        ProductID: products[3]._id,
        StoreID: stores[2]._id,
        StockSold: 3,
        SaleDate: today.toISOString().split("T")[0],
        TotalSaleAmount: 300000, // PKR 300,000
      },
      {
        userID: defaultUser._id,
        ProductID: products[4]._id,
        StoreID: stores[0]._id,
        StockSold: 15,
        SaleDate: lastMonth.toISOString().split("T")[0],
        TotalSaleAmount: 450000, // PKR 450,000
      },
      {
        userID: user2._id,
        ProductID: products[5]._id,
        StoreID: stores[3]._id,
        StockSold: 2,
        SaleDate: today.toISOString().split("T")[0],
        TotalSaleAmount: 400000, // PKR 400,000
      },
    ]);

    console.log(`Created ${sales.length} sales`);

    console.log("\n✅ Database seeded successfully!");
    console.log("\n📋 Default Login Credentials:");
    console.log("   Email: admin@example.com");
    console.log("   Password: admin123");
    console.log("\n   Email: jane@example.com");
    console.log("   Password: password123");
    console.log("\n📊 Summary:");
    console.log(`   Users: 2`);
    console.log(`   Products: ${products.length}`);
    console.log(`   Stores: ${stores.length}`);
    console.log(`   Purchases: ${purchases.length}`);
    console.log(`   Sales: ${sales.length}`);

    await mongoose.connection.close();
    console.log("\nDatabase connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedDatabase();

