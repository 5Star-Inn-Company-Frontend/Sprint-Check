import React, { useState, useEffect } from "react";
import logo from "../assets/dashboardAssets/WhatsApp Image 2025-05-15 at 11.15.05_db0fe0fa 1.png";
import { Eye, RotateCcw, Filter, FileDown, ChevronDown } from "lucide-react";
import dashboardIcon from "../assets/dashboardAssets/element-4.png";
import historyIcon from "../assets/dashboardAssets/Calendar.png";
import notificationIcon from "../assets/dashboardAssets/notification-bing.png";
import billingIcon from "../assets/dashboardAssets/stash_billing-info.png";
import nav_icon from "../assets/dashboardAssets/Chart.png";
import profileIcon from "../assets/dashboardAssets/user.png";
import BusinessIcon from "../assets/dashboardAssets/icon-park-outline_user-business.png";
import logOutIcon from "../assets/dashboardAssets/login.png";
import eyeIcon from "../assets/dashboardAssets/hugeicons_view.png";
import returnIcon from "../assets/dashboardAssets/icon-park_return.png";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  function handleDashboard() {
    navigate("/dashboard");
  }

  function handleLogout() {
    navigate("/");
  }

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Sample API logs data
  const apiLogs = [
    {
      id: 1,
      endpoint: "Bank Verification Number (Advance)",
      name: "NUNGAMIYA BOKUNGA",
      amount: 40.0,
      source: "API",
      performedBy: "Samuel Odejirmi",
      date: "Apr 21, 2025 6:12 AM",
      status: "SUCCESSFUL",
    },
    {
      id: 2,
      endpoint: "Bank Verification Number (Advance)",
      name: "Null",
      amount: 40.0,
      source: "API",
      performedBy: "Samuel Odejirmi",
      date: "Apr 21, 2025 6:12 AM",
      status: "Failed",
    },
    {
      id: 3,
      endpoint: "Bank Verification Number (Advance)",
      name: "NUNGAMIYA BOKUNGA",
      amount: 40.0,
      source: "API",
      performedBy: "Samuel Odejirmi",
      date: "Apr 21, 2025 6:12 AM",
      status: "SUCCESSFUL",
    },
    {
      id: 4,
      endpoint: "Bank Verification Number (Advance)",
      name: "NUNGAMIYA BOKUNGA",
      amount: 40.0,
      source: "API",
      performedBy: "Samuel Odejirmi",
      date: "Apr 21, 2025 6:12 AM",
      status: "SUCCESSFUL",
    },
    {
      id: 5,
      endpoint: "Bank Verification Number (Advance)",
      name: "NUNGAMIYA BOKUNGA",
      amount: 40.0,
      source: "API",
      performedBy: "Samuel Odejirmi",
      date: "Apr 21, 2025 6:12 AM",
      status: "SUCCESSFUL",
    },
  ];

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

        .search-bar {
          flex: 1;
          max-width: 600px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 15px 16px 15px 40px;
          border: none;
          border-radius: 2rem;
          font-size: 14px;
          outline: none;
        }

        .search-input::placeholder {
          color: #636e72;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #636e72;
        }

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
          margin-bottom: 24px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 600;
          color: #2d3436;
        }

        .header-actions {
          display: flex;
          gap: 16px;
        }

        .filter-btn,
        .export-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn {
          background: white;
          border: 1px solid #e5e7eb;
          color: #374151;
        }

        .filter-btn:hover {
          background: #f9fafb;
        }

        .export-btn {
          background: #4f46e5;
          border: 1px solid #4f46e5;
          color: white;
        }

        .export-btn:hover {
          background: #4338ca;
        }

        .search-section {
          margin-bottom: 24px;
        }

        .logs-search {
          position: relative;
          max-width: 500px;
        }

        .logs-search-input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }

        .logs-search-input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .logs-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          width: 16px;
          height: 16px;
        }

        .table-container {
          border: 1px solid #e5e7eb;
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
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
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
          padding: 16px;
          font-size: 14px;
          color: #374151;
          vertical-align: middle;
        }

        tbody .date {
          font-size: 12px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
        }

        .status-success {
          background: #dcfce7;
          color: #166534;
        }

        .status-failed {
          background: #fee2e2;
          color: #dc2626;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          flex-direction: column;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 10px;

          border: none;
          background: white;
          color: black;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          color: blue;
          outline: none;
          background: transparent;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
          padding: 20px;
        }

        .pagination-btn {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 6px;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
        }

        .pagination-btn:hover {
          background: #f3f4f6;
        }

        .pagination-btn.active {
          background: #4f46e5;
          color: white;
          border-color: #4f46e5;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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

          .header-actions {
            gap: 8px;
          }

          .filter-btn,
          .export-btn {
            padding: 8px 12px;
            font-size: 12px;
          }

          .table-container {
            overflow-x: auto;
          }

          .table {
            min-width: 800px;
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
        }

        @media (max-width: 480px) {
          .top-bar {
            padding: 13px 5px 12px 16px;
            display: flex;
            justify-content: space-between;
          }

          .hamSearch {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
          }

          .main-content {
            max-width: 385px;
          }

          .table-cell {
            padding: 12px 8px;
            font-size: 12px;
          }

          .action-buttons {
            flex-direction: column;
          }
        }
      `}</style>

      {/* Overlay for mobile */}
      <div
        className={`overlay ${isMobile && sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`sidebar ${isMobile ? "mobile" : ""} ${
          isMobile && sidebarOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </div>

        <nav className="nav-menu">
          <div className="nav-section">
            <div onClick={() => handleDashboard()} className="nav-item active">
              <div className="nav-icon">
                {" "}
                <img src={dashboardIcon} alt="icon" />
              </div>
              Dashboard
            </div>
            <div className="nav-item">
              <div className="nav-icon">
                <img src={historyIcon} alt="icon" />
              </div>
              History
            </div>
            <div className="nav-item">
              <div className="nav-icon">
                <img src={billingIcon} alt="icon" />
              </div>
              Billing
            </div>
            <div className="nav-item">
              <div className="nav-icon">
                <img src={nav_icon} alt="icon" />
              </div>
              Developers
            </div>
          </div>

          <div className="nav-divider"></div>

          <div className="nav-section">
            <div className="nav-item">
              <div className="nav-icon">
                {" "}
                <img src={profileIcon} alt="icon" />
              </div>
              Profile
            </div>
            <div className="nav-item">
              <div className="nav-icon">
                {" "}
                <img src={BusinessIcon} alt="icon" />
              </div>
              Business info
            </div>
          </div>

          <div className="nav-bottom">
            <div onClick={() => handleLogout()} className="nav-item">
              <div className="nav-icon">
                {" "}
                <img src={logOutIcon} alt="icon" />
              </div>
              Logout
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isMobile ? "mobile" : ""}`}>
        {/* Top Bar */}
        <div className="top-bar">
          <div className="hamSearch">
            <button className="hamburger" onClick={() => setSidebarOpen(true)}>
              ☰
            </button>

            <div className="search-bar">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                className="search-input"
                placeholder="Search here ..."
              />
            </div>
          </div>

          <div className="user-section">
            <div className="notification-icon">
              <img src={notificationIcon} alt="icon" />
            </div>
            <div className="user-avatar">E</div>
            <span className="user-name">emmmy</span>
            <span className="arrow-down">
              <ChevronDown size={16} />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <div className="page-header">
            <h1 className="page-title">API Logs</h1>
            <div className="header-actions">
              <button className="filter-btn">
                <Filter size={16} />
                Filter
              </button>
              <button className="export-btn">
                <FileDown size={16} />
                Export
              </button>
            </div>
          </div>

          <div className="search-section">
            <div className="logs-search">
              <div className="logs-search-icon">🔍</div>
              <input
                type="text"
                className="logs-search-input"
                placeholder="Search by reference number, press enter to search"
              />
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th>Endpoint</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Source</th>
                  <th>Performed By</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {apiLogs.map((log) => (
                  <tr key={log.id} className="table-row">
                    <td className="table-cell">{log.endpoint}</td>
                    <td className="table-cell">{log.name}</td>
                    <td className="table-cell">{log.amount}</td>
                    <td className="table-cell">{log.source}</td>
                    <td className="table-cell">{log.performedBy}</td>
                    <td className="table-cell date">{log.date}</td>
                    <td className="table-cell">
                      <span
                        className={`status-badge ${
                          log.status === "SUCCESSFUL"
                            ? "status-success"
                            : "status-failed"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="action-buttons">
                        <span className="action-btn">
                          <img src={eyeIcon} alt="icon" />
                          <span>View</span>
                        </span>
                        <span className="action-btn">
                          <img src={returnIcon} alt="icon" />
                          <span>Resend to webhook</span>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button className="pagination-btn" disabled>
              Prev
            </button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <span style={{ margin: "0 8px", color: "#9ca3af" }}>...</span>
            <button className="pagination-btn">10</button>
            <button className="pagination-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
