import React, { useState, useEffect, useContext } from "react";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import AuthContext from "../AuthContext";

function Inventory() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [updatePage, setUpdatePage] = useState(true);
  const [stores, setAllStores] = useState([]);

  const authContext = useContext(AuthContext);
  console.log('====================================');
  console.log(authContext);
  console.log('====================================');

  useEffect(() => {
    fetchProductsData();
    fetchSalesData();
  }, [updatePage]);

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of Search Products
  const fetchSearchData = () => {
    fetch(`http://localhost:4000/api/product/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching all stores data
  const fetchSalesData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  // Modal for Product ADD
  const addProductModalSetting = () => {
    setShowProductModal(!showProductModal);
  };

  // Modal for Product UPDATE
  const updateProductModalSetting = (selectedProductData) => {
    console.log("Clicked: edit");
    setUpdateProduct(selectedProductData);
    setShowUpdateModal(!showUpdateModal);
  };


  // Delete item
  const deleteItem = (id) => {
    console.log("Product ID: ", id);
    console.log(`http://localhost:4000/api/product/delete/${id}`);
    fetch(`http://localhost:4000/api/product/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
      });
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Handle Search Term
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };

  return (
    <div className="min-h-screen gradient-bg p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Inventory</h1>
          <p className="text-slate-400">Manage your products and stock levels</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Products Card */}
          <div className="glass-effect rounded-xl p-6 border border-slate-700/50 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Total Products</p>
              <p className="text-3xl font-bold text-slate-100 mb-1">{products.length}</p>
              <p className="text-xs text-slate-500">Last 7 days</p>
            </div>
          </div>

          {/* Stores Card */}
          <div className="glass-effect rounded-xl p-6 border border-slate-700/50 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Stores</p>
              <div className="flex gap-6">
                <div>
                  <p className="text-2xl font-bold text-slate-100">{stores.length}</p>
                  <p className="text-xs text-slate-500">Active</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-100">PKR 2,000</p>
                  <p className="text-xs text-slate-500">Revenue</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Selling Card */}
          <div className="glass-effect rounded-xl p-6 border border-slate-700/50 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Top Selling</p>
              <div className="flex gap-6">
                <div>
                  <p className="text-2xl font-bold text-slate-100">5</p>
                  <p className="text-xs text-slate-500">Last 7 days</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-100">PKR 1,500</p>
                  <p className="text-xs text-slate-500">Cost</p>
                </div>
              </div>
            </div>
          </div>

          {/* Low Stocks Card */}
          <div className="glass-effect rounded-xl p-6 border border-slate-700/50 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Low Stocks</p>
              <div className="flex gap-6">
                <div>
                  <p className="text-2xl font-bold text-slate-100">12</p>
                  <p className="text-xs text-slate-500">Ordered</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-100">2</p>
                  <p className="text-xs text-slate-500">Not in Stock</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showProductModal && (
          <AddProduct
            addProductModalSetting={addProductModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateProduct
            updateProductData={updateProduct}
            updateModalSetting={updateProductModalSetting}
          />
        )}

        {/* Products Table */}
        <div className="glass-effect rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-slate-100">Products</h2>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus-within:border-accent-primary transition-colors">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  className="bg-transparent border-none outline-none text-slate-300 placeholder-slate-500 text-sm w-40"
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm || ""}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <button
              className="bg-gradient-to-r from-accent-primary to-accent-light text-white font-semibold px-4 py-2 rounded-lg shadow-lg shadow-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/40 transform hover:scale-105 transition-all duration-200 text-sm"
              onClick={addProductModalSetting}
            >
              + Add Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700/50">
              <thead className="bg-slate-800/30">
                <tr>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Manufacturer
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-700/30">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <p className="text-slate-400">No products found</p>
                    </td>
                  </tr>
                ) : (
                  products.map((element) => {
                    return (
                      <tr
                        key={element._id}
                        className="hover:bg-slate-800/30 transition-colors duration-150"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-100">
                          {element.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                          {element.manufacturer}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              element.stock > 10
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : element.stock > 0
                                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {element.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400 max-w-xs truncate">
                          {element.description || "—"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              element.stock > 0
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {element.stock > 0 ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <div className="flex items-center gap-3">
                            <button
                              className="text-accent-primary hover:text-accent-light font-medium transition-colors duration-200"
                              onClick={() => updateProductModalSetting(element)}
                            >
                              Edit
                            </button>
                            <span className="text-slate-600">|</span>
                            <button
                              className="text-red-400 hover:text-red-300 font-medium transition-colors duration-200"
                              onClick={() => deleteItem(element._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
