const mongoose = require("mongoose");

const uri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/InventoryManagementApp";

function main() {
  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 15000,
    })
    .then(() => {
      console.log("MongoDB connection successful");
    })
    .catch((err) => {
      console.log("MongoDB connection error: ", err);
    });
}

module.exports = { main };