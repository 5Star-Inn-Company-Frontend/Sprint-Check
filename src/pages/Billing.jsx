import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
// import logo from "../assets/dashboardAssets/WhatsApp Image 2025-05-15 at 11.15.05_db0fe0fa 1.png";
import { Eye, RotateCcw, FileDown } from "lucide-react";
// import dashboardIcon from "../assets/dashboardAssets/element-4.png";
// import historyIcon from "../assets/dashboardAssets/Calendar.png";
import notificationIcon from "../assets/dashboardAssets/notification-bing.png";
import SideBar from "../components/sideBar";
// import billingIcon from "../assets/dashboardAssets/stash_billing-info.png";
// import nav_icon from "../assets/dashboardAssets/Chart.png";
// import profileIcon from "../assets/dashboardAssets/user.png";

// import logOutIcon from "../assets/dashboardAssets/login.png";

// import searchIcon from "../assets/dashboardAssets/search-normal.png";
// import { useNavigate } from "react-router-dom";

export default function Billing() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Day");

  // const navigate = useNavigate();
  // function handleDashboard() {
  //   navigate("/dashboard");
  // }

  // function handleLogout() {
  //   navigate("/");
  // }
  // function handleHistory() {
  //   navigate("/apilogs");
  // }

  // function handleDeveloper() {
  //   navigate("/developer");
  // }
  // function handleProfile() {
  //   navigate("/profile");
  // }

  // Mock billing data
  // const billingData = [
  //   {
  //     id: 1,
  //     description: "Fund",
  //     transactionId: "#12548796",
  //     type: "Transfer",
  //     date: "28 Jan, 12.30 AM",
  //     amount: 750,
  //     direction: "credit",
  //     icon: "up",
  //   },
  //   {
  //     id: 2,
  //     description: "BVN",
  //     transactionId: "#12548796",
  //     type: "API",
  //     date: "25 Jan, 10.40 PM",
  //     amount: 450,
  //     direction: "credit",
  //     icon: "down",
  //   },
  //   {
  //     id: 3,
  //     description: "BVN",
  //     transactionId: "#12548796",
  //     type: "API",
  //     date: "20 Jan, 10.40 PM",
  //     amount: 150,
  //     direction: "debit",
  //     icon: "down",
  //   },
  //   {
  //     id: 4,
  //     description: "BVN",
  //     transactionId: "#12548796",
  //     type: "API",
  //     date: "15 Jan, 03.29 PM",
  //     amount: 1050,
  //     direction: "debit",
  //     icon: "down",
  //   },
  //   {
  //     id: 5,
  //     description: "BVN",
  //     transactionId: "#12548796",
  //     type: "API",
  //     date: "25 Jan, 10.40 PM",
  //     amount: 450,
  //     direction: "credit",
  //     icon: "down",
  //   },
  //   {
  //     id: 6,
  //     description: "Fund",
  //     transactionId: "#12548796",
  //     type: "Transfer",
  //     date: "28 Jan, 12.30 AM",
  //     amount: 750,
  //     direction: "credit",
  //     icon: "up",
  //   },
  //   {
  //     id: 7,
  //     description: "BVN",
  //     transactionId: "#12548796",
  //     type: "API",
  //     date: "20 Jan, 10.40 PM",
  //     amount: 150,
  //     direction: "debit",
  //     icon: "down",
  //   },
  //   {
  //     id: 8,
  //     description: "BVN",
  //     transactionId: "#12548796",
  //     type: "API",
  //     date: "15 Jan, 03.29 PM",
  //     amount: 1050,
  //     direction: "debit",
  //     icon: "down",
  //   },
  //   {
  //     id: 9,
  //     description: "BVN",
  //     transactionId: "#12548796",
  //     type: "API",
  //     date: "14 Jan, 10.40 PM",
  //     amount: 850,
  //     direction: "debit",
  //     icon: "down",
  //   },
  // ];

  //Real Billing Data

  const billingData = JSON.parse(localStorage.getItem("billingData")).data;
  console.log(billingData);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="dashboard">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
          background-color: #f8f9fa;
        }

        .dashboard {
          display: flex;
          min-height: 100vh;
          background-color: rgb(234, 237, 239);
          align-items: center;
          justify-content: center;
        }

        .sidebar {
          width: 250px;
          background: white;
          border-right: 1px solid #e9ecef;
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          z-index: 1000;
          transition: transform 0.3s ease;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .sidebar.mobile {
          transform: translateX(-100%);
        }

        .sidebar.mobile.open {
          transform: translateX(0);
        }

        .sidebar-header {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo {
          font-size: 20px;
          font-weight: bold;
          color: #2d3436;
        }

        .nav-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px 0;
        }

        .nav-section {
          margin-bottom: 40px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          color: #9ca3af;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-size: 15px;
          font-weight: 500;
          border-left: 4px solid transparent;
        }

        .nav-item:hover {
          color: #374151;
        }

        .nav-item.active {
          color: #d97706;
          border-left: 4px solid #d97706;
          background-color: rgba(217, 119, 6, 0.05);
        }

        .nav-icon {
          width: 20px;
          height: 20px;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .nav-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 20px 32px;
        }

        .nav-bottom {
          margin-top: auto;
          padding-bottom: 20px;
        }

        .main-content {
          flex: 1;
          margin-left: 250px;
          transition: margin-left 0.3s ease;
        }

        .main-content.mobile {
          margin-left: 0;
        }

        .top-bar {
          background: transparent;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .hamburger {
          display: none;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #636e72;
        }
        .page-bar {
          width: 100%;
          padding: 0.6rem 1.2rem;

          border-radius: 2rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3436;
          background: white;
        }

        // .search-bar {
        //   flex: 1;
        //   max-width: 600px;
        //   position: relative;
        // }

        // .search-input {
        //   width: 100%;
        //   padding: 15px 16px 15px 40px;
        //   border: none;
        //   border-radius: 2rem;
        //   font-size: 14px;
        //   outline: none;
        // }

        // .search-input::placeholder {
        //   color: #636e72;
        // }

        // .search-icon {
        //   position: absolute;
        //   left: 12px;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   color: #636e72;
        // }

        .user-section {
          background-color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 2rem;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .notification-icon {
          padding: 0.5rem 1.5rem;
          border: 1px solid rgba(119, 133, 138, 0.24);
          display: flex;
          align-items: center;
          color: #636e72;
          cursor: pointer;
          border-radius: 2rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .user-name {
          color: #2d3436;
          font-weight: 500;
          cursor: pointer;
        }

        .content {
          padding: 20px 25px 2px 20px;
          margin: 26px;
          background-color: white;
          border-radius: 1rem;
          min-height: calc(100vh - 120px);
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 600;
          color: #2d3436;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .period-selector {
          display: flex;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 4px;
        }

        .period-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .period-btn.active {
          background: white;
          color: #374151;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .select-period-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          color: #6b7280;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .select-period-btn:hover {
          border-color: #d1d5db;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          color: #6b7280;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          border-color: #d1d5db;
        }

        .table-container {
          border-radius: 12px;
          overflow: hidden;
          background: white;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table-header {
          background: #f9fafb;
        }

        .table-header th {
          padding: 16px 20px;
          text-align: left;
          font-weight: 500;
          color: #9ca3af;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .table-row {
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s ease;
        }

        .table-row:hover {
          background: #f9fafb;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .table-cell {
          padding: 20px;
          font-size: 14px;
          color: #374151;
          vertical-align: middle;
        }

        .description-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .transaction-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .icon-up {
          background: #dcfce7;
          color: #16a34a;
        }

        .icon-down {
          background: #dbeafe;
          color: #2563eb;
        }

        .transaction-id {
          color: #6b7280;
          font-size: 13px;
        }

        .amount-credit {
          color: #16a34a;
          font-weight: 600;
        }

        .amount-debit {
          color: #dc2626;
          font-weight: 600;
        }

        .date-text {
          color: #6b7280;
          font-size: 13px;
        }

        .overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .overlay.show {
          display: block;
        }

        @media (max-width: 1023px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main-content {
            margin-left: 0;
          }

          .hamburger {
            display: block;
          }

          .search-bar {
            max-width: 200px;
          }

          .user-name {
            display: none;
          }

          .header-controls {
            gap: 8px;
          }

          .period-selector {
            display: none;
          }

          .table-container {
            overflow-x: auto;
          }

          .table {
            min-width: 700px;
          }
        }

        @media (max-width: 768px) {
          .content {
            padding: 16px;
            margin: 16px;
          }

          .page-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .notification-icon {
            display: none;
          }

          .user-section {
            background-color: transparent;
          }

          .main-content {
            max-width: 420px;
          }
        }

        @media (max-width: 480px) {
          .top-bar {
            padding: 13px 5px 12px 16px;
          }

          .hamSearch {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
          }

          .table-cell {
            padding: 12px 8px;
            font-size: 12px;
          }

          .description-cell {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          .main-content {
            width: 100%;
          }
        }
      `}</style>

      {/* Overlay for mobile */}
      <div
        className={`overlay ${isMobile && sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} isMobile={isMobile} />

      {/* Main Content */}
      <div className={`main-content ${isMobile ? "mobile" : ""}`}>
        {/* Top Bar */}
        <div className="top-bar">
          <div className="hamSearch">
            <button className="hamburger" onClick={() => setSidebarOpen(true)}>
              ☰
            </button>

            {/* <div className="search-bar">
              <div className="search-icon">
                <img src={searchIcon} alt="icon" />
              </div>
              <input
                type="text"
                className="search-input"
                placeholder="Search here ..."
              />
            </div> */}
            <h1 className="page-bar">Billing</h1>
          </div>

          <div className="user-section">
            <div className="notification-icon">
              <img src={notificationIcon} alt="icon" />
            </div>
            <div className="user-avatar">E</div>
            <span className="user-name">emmy</span>
            <span className="arrow-down">
              <ChevronDown size={16} />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <div className="page-header">
            {/* <h1 className="page-title">Billing</h1> */}
            <div className="header-controls">
              <div className="period-selector">
                <button
                  className={`period-btn ${
                    selectedPeriod === "Day" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPeriod("Day")}
                >
                  Day
                </button>
                <button
                  className={`period-btn ${
                    selectedPeriod === "Week" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPeriod("Week")}
                >
                  Week
                </button>
                <button
                  className={`period-btn ${
                    selectedPeriod === "Month" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPeriod("Month")}
                >
                  Month
                </button>
              </div>
              <button className="select-period-btn">
                <Calendar size={16} />
                Select period
              </button>
              <button className="filter-btn">
                <Filter size={16} />
                Filter
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th>Description</th>
                  <th>Transaction ID</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {billingData?.map((transaction) => (
                  <tr key={transaction.id} className="table-row">
                    <td className="table-cell">
                      <div className="description-cell">
                        <div
                          className={`transaction-icon ${
                            transaction.icon === "up" ? "icon-up" : "icon-down"
                          }`}
                        >
                          {transaction.icon === "up" ? (
                            <ArrowUp size={16} />
                          ) : (
                            <ArrowDown size={16} />
                          )}
                        </div>
                        <span>{transaction.description}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="transaction-id">
                        {transaction.transactionId}
                      </span>
                    </td>
                    <td className="table-cell">{transaction.type}</td>
                    <td className="table-cell">
                      <span className="date-text">{transaction.date}</span>
                    </td>
                    <td className="table-cell">
                      <span
                        className={
                          transaction.direction === "credit"
                            ? "amount-credit"
                            : "amount-debit"
                        }
                      >
                        {transaction.direction === "credit" ? "+" : "-"}₦
                        {transaction.amount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
