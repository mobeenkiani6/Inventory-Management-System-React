import React, { useState, useEffect, useContext } from "react";
import AddSale from "../components/AddSale";
import AuthContext from "../AuthContext";

function Sales() {
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [sales, setAllSalesData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchSalesData();
    fetchProductsData();
    fetchStoresData();
  }, [updatePage]);

  // Fetching Data of All Sales
  const fetchSalesData = () => {
    fetch(`http://localhost:4000/api/sales/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllSalesData(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Stores
  const fetchStoresData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setShowSaleModal(!showSaleModal);
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Calculate total sales amount
  const totalSalesAmount = sales.reduce((sum, item) => {
    return sum + (item.TotalSaleAmount || 0);
  }, 0);

  // Calculate total items sold
  const totalItemsSold = sales.reduce((sum, item) => {
    return sum + (item.StockSold || 0);
  }, 0);

  return (
    <div className="min-h-screen gradient-bg p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Sales</h1>
          <p className="text-slate-400">Track all your sales transactions and revenue</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Sales Card */}
          <div className="glass-effect rounded-xl p-6 border border-slate-700/50 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Total Sales</p>
              <p className="text-3xl font-bold text-slate-100 mb-1">{sales.length}</p>
              <p className="text-xs text-slate-500">All transactions</p>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="glass-effect rounded-xl p-6 border border-slate-700/50 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-light/20 border border-accent-primary/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-accent-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-slate-100 mb-1">
                PKR {totalSalesAmount?.toLocaleString("en-PK") || 0}
              </p>
              <p className="text-xs text-slate-500">Total earnings</p>
            </div>
          </div>

          {/* Total Items Sold Card */}
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Items Sold</p>
              <p className="text-3xl font-bold text-slate-100 mb-1">{totalItemsSold}</p>
              <p className="text-xs text-slate-500">Total units</p>
            </div>
          </div>
        </div>

        {showSaleModal && (
          <AddSale
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            stores={stores}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}

        {/* Sales Table */}
        <div className="glass-effect rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-slate-100">Sales History</h2>
            </div>
            <button
              className="bg-gradient-to-r from-accent-primary to-accent-light text-white font-semibold px-4 py-2 rounded-lg shadow-lg shadow-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/40 transform hover:scale-105 transition-all duration-200 text-sm"
              onClick={addSaleModalSetting}
            >
              + Add Sale
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700/50">
              <thead className="bg-slate-800/30">
                <tr>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Store Name
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Stock Sold
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Sales Date
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Total Amount
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-700/30">
                {sales.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <p className="text-slate-400 mb-4">No sales records found</p>
                      <button
                        className="text-accent-primary hover:text-accent-light font-medium transition-colors"
                        onClick={addSaleModalSetting}
                      >
                        Add your first sale
                      </button>
                    </td>
                  </tr>
                ) : (
                  sales.map((element) => {
                    const saleDate = new Date(element.SaleDate);
                    const today = new Date();
                    const isToday =
                      saleDate.toLocaleDateString() === today.toLocaleDateString();
                    return (
                      <tr
                        key={element._id}
                        className="hover:bg-slate-800/30 transition-colors duration-150"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-100">
                          {element.ProductID?.name || "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                            <span>{element.StoreID?.name || "N/A"}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {element.StockSold}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                          <div className="flex items-center gap-2">
                            {isToday && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                                Today
                              </span>
                            )}
                            <span>{isToday ? "" : element.SaleDate}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-green-400">
                          PKR {element.TotalSaleAmount?.toLocaleString("en-PK") || 0}
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

export default Sales;
