import React, { useState, useEffect, useContext } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching all stores data
  const fetchData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="min-h-screen gradient-bg p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Manage Stores</h1>
          <p className="text-slate-400">View and manage all your store locations</p>
        </div>

        {/* Stats Card */}
        <div className="glass-effect rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Total Stores</p>
              <p className="text-3xl font-bold text-slate-100">{stores.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-400"
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
        </div>

        {/* Add Store Button and Modal */}
        <div className="flex justify-end">
          <button
            className="bg-gradient-to-r from-accent-primary to-accent-light text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/40 transform hover:scale-105 transition-all duration-200"
            onClick={modalSetting}
          >
            + Add Store
          </button>
        </div>

        {showModal && <AddStore />}

        {/* Stores Grid */}
        {stores.length === 0 ? (
          <div className="glass-effect rounded-xl p-12 border border-slate-700/50 text-center">
            <div className="p-4 rounded-lg bg-slate-800/50 inline-block mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-slate-400"
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
            <p className="text-slate-400 mb-4 text-lg">No stores found</p>
            <button
              className="text-accent-primary hover:text-accent-light font-medium transition-colors"
              onClick={modalSetting}
            >
              Add your first store
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((element) => {
              return (
                <div
                  className="glass-effect rounded-xl overflow-hidden border border-slate-700/50 hover:scale-105 transition-transform duration-200 group"
                  key={element._id}
                >
                  {/* Store Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      alt="store"
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      src={element.image}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-primary/20 text-accent-primary border border-accent-primary/30 backdrop-blur-sm">
                        {element.category}
                      </span>
                    </div>
                  </div>

                  {/* Store Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-accent-primary transition-colors">
                      {element.name}
                    </h3>
                    <div className="flex items-start gap-3 text-slate-300">
                      <svg
                        className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {element.address}
                        </p>
                        <p className="text-sm text-slate-400 mt-1">{element.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Store;
