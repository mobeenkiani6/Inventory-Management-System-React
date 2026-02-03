import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AuthContext from "../AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ["Apple", "Knorr", "Shoop", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [0, 1, 5, 8, 9, 15],
      backgroundColor: [
        "rgba(6, 182, 212, 0.3)",
        "rgba(34, 211, 238, 0.3)",
        "rgba(8, 145, 178, 0.3)",
        "rgba(14, 165, 233, 0.3)",
        "rgba(59, 130, 246, 0.3)",
        "rgba(99, 102, 241, 0.3)",
      ],
      borderColor: [
        "rgba(6, 182, 212, 1)",
        "rgba(34, 211, 238, 1)",
        "rgba(8, 145, 178, 1)",
        "rgba(14, 165, 233, 1)",
        "rgba(59, 130, 246, 1)",
        "rgba(99, 102, 241, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

function Dashboard() {
  const [saleAmount, setSaleAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);

  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
        background: "transparent",
      },
      theme: {
        mode: "dark",
      },
      colors: ["#06b6d4"],
      grid: {
        borderColor: "rgba(148, 163, 184, 0.1)",
        strokeDashArray: 4,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "#94a3b8",
            fontSize: "12px",
          },
        },
        axisBorder: {
          color: "rgba(148, 163, 184, 0.2)",
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#94a3b8",
            fontSize: "12px",
          },
        },
      },
      tooltip: {
        theme: "dark",
      },
    },
    series: [
      {
        name: "series",
        data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
      },
    ],
  });

  // Update Chart Data
  const updateChartData = (salesData) => {
    setChart({
      ...chart,
      series: [
        {
          name: "Monthly Sales Amount (PKR)",
          data: [...salesData],
        },
      ],
    });
  };

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchTotalSaleAmount();
    fetchTotalPurchaseAmount();
    fetchStoresData();
    fetchProductsData();
    fetchMonthlySalesData();
  }, []);

  // Fetching total sales amount
  const fetchTotalSaleAmount = () => {
    fetch(
      `http://localhost:4000/api/sales/get/${authContext.user}/totalsaleamount`
    )
      .then((response) => response.json())
      .then((datas) => setSaleAmount(datas.totalSaleAmount));
  };

  // Fetching total purchase amount
  const fetchTotalPurchaseAmount = () => {
    fetch(
      `http://localhost:4000/api/purchase/get/${authContext.user}/totalpurchaseamount`
    )
      .then((response) => response.json())
      .then((datas) => setPurchaseAmount(datas.totalPurchaseAmount));
  };

  // Fetching all stores data
  const fetchStoresData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => setStores(datas));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => setProducts(datas))
      .catch((err) => console.log(err));
  };

  // Fetching Monthly Sales
  const fetchMonthlySalesData = () => {
    fetch(`http://localhost:4000/api/sales/getmonthly`)
      .then((response) => response.json())
      .then((datas) => updateChartData(datas.salesAmount))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="min-h-screen gradient-bg p-6">
        <div className="w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Dashboard</h1>
            <p className="text-slate-400">Welcome back! Here's your overview</p>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Sales Card */}
            <article className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-200 border border-slate-700/50">
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
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="inline-flex gap-2 rounded-full bg-green-500/20 px-3 py-1 border border-green-500/30">
                  <span className="text-xs font-medium text-green-400">↑ 67.81%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Total Sales</p>
                <p className="text-3xl font-bold text-slate-100 mb-1">
                  PKR {saleAmount?.toLocaleString('en-PK') || 0}
                </p>
                <p className="text-xs text-slate-500">from PKR 240,940</p>
              </div>
            </article>

            {/* Purchase Card */}
            <article className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-200 border border-slate-700/50">
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
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    />
                  </svg>
                </div>
                <div className="inline-flex gap-2 rounded-full bg-red-500/20 px-3 py-1 border border-red-500/30">
                  <span className="text-xs font-medium text-red-400">↓ 67.81%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Total Purchase</p>
                <p className="text-3xl font-bold text-slate-100 mb-1">
                  PKR {purchaseAmount?.toLocaleString('en-PK') || 0}
                </p>
                <p className="text-xs text-slate-500">from PKR 404,320</p>
              </div>
            </article>

            {/* Products Card */}
            <article className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-200 border border-slate-700/50">
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
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <div className="inline-flex gap-2 rounded-full bg-accent-primary/20 px-3 py-1 border border-accent-primary/30">
                  <span className="text-xs font-medium text-accent-primary">Active</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-slate-100 mb-1">
                  {products.length}
                </p>
                <p className="text-xs text-slate-500">in inventory</p>
              </div>
            </article>

            {/* Stores Card */}
            <article className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-200 border border-slate-700/50">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div className="inline-flex gap-2 rounded-full bg-purple-500/20 px-3 py-1 border border-purple-500/30">
                  <span className="text-xs font-medium text-purple-400">Locations</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Total Stores</p>
                <p className="text-3xl font-bold text-slate-100 mb-1">
                  {stores.length}
                </p>
                <p className="text-xs text-slate-500">active locations</p>
              </div>
            </article>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart Card */}
            <div className="glass-effect rounded-xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-semibold text-slate-100 mb-4">Monthly Sales (PKR)</h2>
              <div className="flex justify-center">
                <Chart
                  options={chart.options}
                  series={chart.series}
                  type="bar"
                  width="100%"
                  height="350"
                />
              </div>
            </div>

            {/* Doughnut Chart Card */}
            <div className="glass-effect rounded-xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-semibold text-slate-100 mb-4">Product Distribution</h2>
              <div className="flex justify-center items-center">
                <div style={{ width: "300px", height: "300px" }}>
                  <Doughnut 
                    data={data}
                    options={{
                      plugins: {
                        legend: {
                          labels: {
                            color: "#94a3b8",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
