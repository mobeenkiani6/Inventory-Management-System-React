import React, { useState, useEffect, useContext } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
import AuthContext from "../AuthContext";

function PurchaseDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchPurchaseData();
    fetchProductsData();
  }, [updatePage]);

  // Fetching Data of All Purchase items
  const fetchPurchaseData = () => {
    fetch(`http://localhost:4000/api/purchase/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllPurchaseData(data);
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

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  
  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Calculate total purchase amount
  const totalPurchaseAmount = purchase.reduce((sum, item) => {
    return sum + (item.TotalPurchaseAmount || 0);
  }, 0);

  // Calculate total quantity
  const totalQuantity = purchase.reduce((sum, item) => {
    return sum + (item.QuantityPurchased || 0);
  }, 0);

  return (
    <div className="min-h-screen gradient-bg p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Purchase Details</h1>
          <p className="text-slate-400">Track all your purchase transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Purchases Card */}
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Total Purchases</p>
              <p className="text-3xl font-bold text-slate-100 mb-1">{purchase.length}</p>
              <p className="text-xs text-slate-500">All time</p>
            </div>
          </div>

          {/* Total Amount Card */}
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-slate-100 mb-1">
                PKR {totalPurchaseAmount?.toLocaleString('en-PK') || 0}
              </p>
              <p className="text-xs text-slate-500">Total spent</p>
            </div>
          </div>

          {/* Total Quantity Card */}
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Total Quantity</p>
              <p className="text-3xl font-bold text-slate-100 mb-1">{totalQuantity}</p>
              <p className="text-xs text-slate-500">Items purchased</p>
            </div>
          </div>
        </div>

        {showPurchaseModal && (
          <AddPurchaseDetails
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}

        {/* Purchase Table */}
        <div className="glass-effect rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-slate-100">Purchase History</h2>
            </div>
            <button
              className="bg-gradient-to-r from-accent-primary to-accent-light text-white font-semibold px-4 py-2 rounded-lg shadow-lg shadow-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/40 transform hover:scale-105 transition-all duration-200 text-sm"
              onClick={addSaleModalSetting}
            >
              + Add Purchase
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
                    Quantity Purchased
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Purchase Date
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Total Amount
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-700/30">
                {purchase.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <p className="text-slate-400 mb-4">No purchase records found</p>
                      <button
                        className="text-accent-primary hover:text-accent-light font-medium transition-colors"
                        onClick={addSaleModalSetting}
                      >
                        Add your first purchase
                      </button>
                    </td>
                  </tr>
                ) : (
                  purchase.map((element) => {
                    const purchaseDate = new Date(element.PurchaseDate);
                    const today = new Date();
                    const isToday =
                      purchaseDate.toLocaleDateString() === today.toLocaleDateString();
                    return (
                      <tr
                        key={element._id}
                        className="hover:bg-slate-800/30 transition-colors duration-150"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-100">
                          {element.ProductID?.name || "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {element.QuantityPurchased}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                          <div className="flex items-center gap-2">
                            {isToday && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                                Today
                              </span>
                            )}
                            <span>{isToday ? "" : element.PurchaseDate}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-green-400">
                          PKR {element.TotalPurchaseAmount?.toLocaleString("en-PK") || 0}
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

export default PurchaseDetails;
