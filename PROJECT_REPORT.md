# 📦 Inventory Management System - Project Report

<div align="center">

![Logo](Frontend/src/assets/logo.png)

**A Full-Stack Inventory Management Solution**

*Built with React.js, Node.js, Express, and MongoDB*

</div>

---

## 📋 Table of Contents

1. [Project Objective](#-project-objective)
2. [Technologies Used](#-technologies-used)
3. [System Architecture](#-system-architecture)
4. [Features Overview](#-features-overview)
5. [Application Screenshots](#-application-screenshots)
6. [Code Snippets](#-code-snippets)
7. [Database Schema](#-database-schema)
8. [API Endpoints](#-api-endpoints)
9. [Installation & Setup](#-installation--setup)

---

## 🎯 Project Objective

The **Inventory Management System** is a comprehensive web application designed to help businesses efficiently manage their inventory, track sales, monitor purchases, and oversee multiple store locations. 

### Primary Goals:

- **📊 Centralized Inventory Control**: Maintain a single source of truth for all product data across multiple store locations
- **💰 Sales & Purchase Tracking**: Monitor revenue streams and purchase expenses with detailed transaction logs
- **📈 Analytics Dashboard**: Visualize business performance through interactive charts and real-time statistics
- **🏪 Multi-Store Management**: Support for managing inventory across multiple physical store locations
- **🔐 User Authentication**: Secure login system with user-specific data isolation
- **🔍 Search & Filter**: Quickly locate products with powerful search functionality

### Target Users:

- Small to medium-sized retail businesses
- Warehouse managers
- Store owners managing multiple locations
- Inventory controllers and stock managers

---

## 🛠 Technologies Used

### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React.js** | 18.2.0 | Core UI library for building interactive user interfaces |
| **React Router DOM** | 6.9.0 | Client-side routing and navigation |
| **TailwindCSS** | 3.2.7 | Utility-first CSS framework for rapid styling |
| **ApexCharts** | 3.37.2 | Interactive bar charts for sales analytics |
| **Chart.js** | 4.2.1 | Doughnut charts for product distribution |
| **Headless UI** | 1.7.13 | Accessible UI component primitives |
| **Heroicons** | 2.0.16 | Beautiful hand-crafted SVG icons |

### Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | - | JavaScript runtime environment |
| **Express.js** | 4.18.2 | Fast, minimalist web framework |
| **MongoDB** | - | NoSQL database for data persistence |
| **Mongoose** | 7.0.2 | Elegant MongoDB object modeling |
| **Multer** | 1.4.5 | Middleware for handling file uploads |
| **CORS** | 2.8.5 | Cross-Origin Resource Sharing middleware |
| **Nodemon** | 2.0.21 | Development auto-restart utility |

### Design Features

- **Glassmorphism UI**: Modern glass-effect design with blur backdrop
- **Dark Theme**: Sleek dark color palette with cyan accents
- **Responsive Layout**: Full mobile and desktop compatibility
- **Animated Gradients**: Subtle background animations for visual appeal

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    React.js Frontend                     │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐ │ │
│  │  │Dashboard │ │Inventory │ │  Sales   │ │   Stores    │ │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └─────────────┘ │ │
│  │                         │                                │ │
│  │                  React Router                            │ │
│  │                  AuthContext                             │ │
│  └──────────────────────────┼──────────────────────────────┘ │
└─────────────────────────────┼───────────────────────────────┘
                              │ HTTP/REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     SERVER (Node.js)                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                   Express.js Backend                     │ │
│  │  ┌──────────────────────────────────────────────────┐   │ │
│  │  │  API Routes                                       │   │ │
│  │  │  /api/product  /api/sales  /api/purchase  /api/store│ │ │
│  │  └──────────────────────────────────────────────────┘   │ │
│  │                         │                                │ │
│  │                   Controllers                            │ │
│  │                         │                                │ │
│  │                   Mongoose ODM                           │ │
│  └─────────────────────────┼───────────────────────────────┘ │
└─────────────────────────────┼───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        DATABASE                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                      MongoDB                             │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐ │ │
│  │  │ Products │ │  Sales   │ │ Purchase │ │   Stores    │ │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └─────────────┘ │ │
│  │                     ┌──────────┐                         │ │
│  │                     │  Users   │                         │ │
│  │                     └──────────┘                         │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features Overview

### 1. 🔐 User Authentication
- Secure login and registration system
- Session management with localStorage
- Protected routes for authenticated users only

### 2. 📊 Dashboard
- Real-time statistics cards (Sales, Purchases, Products, Stores)
- Monthly sales bar chart with ApexCharts
- Product distribution doughnut chart
- Percentage change indicators

### 3. 📦 Inventory Management
- Add, edit, and delete products
- Real-time stock level tracking
- Search products by name
- Stock availability status indicators
- Manufacturer tracking

### 4. 💰 Sales Tracking
- Record new sales transactions
- Track stock sold per transaction
- Calculate total revenue
- View sales history with dates
- "Today" badge for recent sales

### 5. 🛒 Purchase Management
- Record purchase details
- Track purchase amounts
- Link purchases to products and stores
- Monitor total purchase expenditure

### 6. 🏪 Store Management
- Add and manage multiple store locations
- Store-specific inventory tracking
- Location-based reporting

---

## 📸 Application Screenshots

### Login Page
*Modern glassmorphism login interface with animated background*

![Login Illustration](Frontend/src/assets/Login.png)

**Login Page Features:**
- Clean, modern glassmorphism card design
- Email and password authentication
- "Remember me" checkbox
- Forgot password link
- Register account link
- Animated gradient background
- Responsive design for all devices

---

### Dashboard Interface

The dashboard provides a comprehensive overview with:

**Stats Cards:**
| Card | Information Displayed |
|------|----------------------|
| 💚 Total Sales | Total revenue with percentage change |
| ❤️ Total Purchase | Total expenditure with percentage change |
| 💙 Total Products | Count of all products in inventory |
| 💜 Total Stores | Number of active store locations |

**Charts:**
- **Bar Chart**: Monthly sales data visualization (Jan-Dec)
- **Doughnut Chart**: Product distribution by category

---

### Inventory Page

Features a modern data table with:
- Product name and manufacturer columns
- Color-coded stock level badges (Green: >10, Yellow: 1-10, Red: 0)
- Availability status indicators
- Edit and Delete action buttons
- Real-time search functionality
- "Add Product" modal

---

### Sales Page

Displays:
- Total sales count card
- Total revenue card
- Items sold counter
- Sales history table with:
  - Product name
  - Store location
  - Stock sold quantity
  - Sale date (with "Today" badge for recent)
  - Total amount in PKR

---

## 💻 Code Snippets

### 1. React App Router Configuration

```jsx
// App.jsx - Main Application Router
const App = () => {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);

  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedWrapper>
                <Layout />
              </ProtectedWrapper>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/purchase-details" element={<PurchaseDetails />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/manage-store" element={<Store />} />
          </Route>
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
```

---

### 2. Express Server Setup

```javascript
// server.js - Backend Server Configuration
const express = require("express");
const { main } = require("./models/index");
const productRoute = require("./router/product");
const storeRoute = require("./router/store");
const purchaseRoute = require("./router/purchase");
const salesRoute = require("./router/sales");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Initialize MongoDB connection
main();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/store", storeRoute);
app.use("/api/product", productRoute);
app.use("/api/purchase", purchaseRoute);
app.use("/api/sales", salesRoute);

// Authentication Endpoints
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) res.send(user);
  else res.status(401).send("Invalid Credentials");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
```

---

### 3. Product Controller (CRUD Operations)

```javascript
// controller/product.js - Product Business Logic
const Product = require("../models/Product");

// Create new product
const addProduct = (req, res) => {
  const addProduct = new Product({
    userID: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    stock: 0,
    description: req.body.description,
  });

  addProduct
    .save()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(402).send(err));
};

// Read all products for user
const getAllProducts = async (req, res) => {
  const findAllProducts = await Product.find({
    userID: req.params.userId,
  }).sort({ _id: -1 });
  res.json(findAllProducts);
};

// Update product
const updateSelectedProduct = async (req, res) => {
  const updatedResult = await Product.findByIdAndUpdate(
    { _id: req.body.productID },
    {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
    },
    { new: true }
  );
  res.json(updatedResult);
};

// Delete product (cascading delete)
const deleteSelectedProduct = async (req, res) => {
  const deleteProduct = await Product.deleteOne({ _id: req.params.id });
  const deletePurchaseProduct = await Purchase.deleteOne({ ProductID: req.params.id });
  const deleteSaleProduct = await Sales.deleteOne({ ProductID: req.params.id });
  res.json({ deleteProduct, deletePurchaseProduct, deleteSaleProduct });
};

// Search products
const searchProduct = async (req, res) => {
  const products = await Product.find({
    name: { $regex: req.query.searchTerm, $options: "i" },
  });
  res.json(products);
};
```

---

### 4. MongoDB Product Schema

```javascript
// models/product.js - Mongoose Product Model
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
```

---

### 5. Dashboard Component with Charts

```jsx
// pages/Dashboard.jsx - Dashboard with Analytics Charts
function Dashboard() {
  const [saleAmount, setSaleAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);

  const [chart, setChart] = useState({
    options: {
      chart: { id: "basic-bar", background: "transparent" },
      theme: { mode: "dark" },
      colors: ["#06b6d4"],
      xaxis: {
        categories: ["Jan","Feb","Mar","Apr","May","Jun",
                     "Jul","Aug","Sep","Oct","Nov","Dec"],
      },
    },
    series: [{ name: "Monthly Sales (PKR)", data: [] }],
  });

  useEffect(() => {
    fetchTotalSaleAmount();
    fetchTotalPurchaseAmount();
    fetchStoresData();
    fetchProductsData();
    fetchMonthlySalesData();
  }, []);

  return (
    <div className="min-h-screen gradient-bg p-6">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sales, Purchase, Products, Stores Cards */}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart options={chart.options} series={chart.series} type="bar" />
        <Doughnut data={donutData} />
      </div>
    </div>
  );
}
```

---

### 6. Custom CSS - Glassmorphism Effect

```css
/* index.css - Modern Dark Theme Styles */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --dark-bg-primary: #0f172a;
  --dark-bg-secondary: #1e293b;
  --accent-primary: #06b6d4;
  --accent-light: #22d3ee;
}

/* Glassmorphism Effect */
@layer utilities {
  .glass-effect {
    background: rgba(30, 41, 59, 0.8);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(148, 163, 184, 0.2);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  }
}

/* Animated Gradient Background */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.gradient-bg {
  background: linear-gradient(-45deg, #0f172a, #1e293b, #0f172a, #1e293b);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}
```

---

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String,
  phoneNumber: String,
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  userID: ObjectId (ref: users),
  name: String (required),
  manufacturer: String (required),
  stock: Number (required),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Sales Collection
```javascript
{
  _id: ObjectId,
  userID: ObjectId (ref: users),
  ProductID: ObjectId (ref: products),
  StoreID: ObjectId (ref: stores),
  StockSold: Number,
  SaleDate: String,
  TotalSaleAmount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Stores Collection
```javascript
{
  _id: ObjectId,
  userID: ObjectId (ref: users),
  name: String,
  category: String,
  address: String,
  city: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | User login |
| GET | `/api/login` | Get current user |
| POST | `/api/register` | User registration |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/product/get/:userId` | Get all products for user |
| POST | `/api/product/add` | Add new product |
| POST | `/api/product/update` | Update product |
| GET | `/api/product/delete/:id` | Delete product |
| GET | `/api/product/search?searchTerm=` | Search products |

### Sales
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sales/get/:userId` | Get all sales for user |
| POST | `/api/sales/add` | Record new sale |
| GET | `/api/sales/get/:userId/totalsaleamount` | Get total sales amount |
| GET | `/api/sales/getmonthly` | Get monthly sales data |

### Purchase
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/purchase/get/:userId` | Get all purchases |
| POST | `/api/purchase/add` | Record new purchase |
| GET | `/api/purchase/get/:userId/totalpurchaseamount` | Get total purchase amount |

### Stores
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/store/get/:userId` | Get all stores |
| POST | `/api/store/add` | Add new store |

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Backend Setup
```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Start MongoDB service (if not running)
mongod

# Seed initial data (optional)
npm run seed

# Start development server
npm run serverStart
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Environment Variables
Create a `.env` file in the Backend directory:
```env
MONGO_URI=mongodb://127.0.0.1:27017/InventoryManagementApp
PORT=4000
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

---

## 📝 Conclusion

The Inventory Management System is a robust, full-stack web application that provides comprehensive inventory control capabilities. Built with modern technologies like React.js and Node.js, it features:

- ✅ **Modern UI/UX** with glassmorphism design
- ✅ **Real-time analytics** with interactive charts
- ✅ **Secure authentication** system
- ✅ **Complete CRUD operations** for all entities
- ✅ **Multi-store support** for business scalability
- ✅ **RESTful API** architecture
- ✅ **Responsive design** for all devices

This system serves as an excellent foundation for small to medium businesses looking to digitize their inventory management processes.

---

<div align="center">

**Built with ❤️ using React.js & Node.js**

*© 2024 Inventory Management System*

</div>
