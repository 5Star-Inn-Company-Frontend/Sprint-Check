import React, { useState, useEffect } from "react";
import logo from "../assets/dashboardAssets/WhatsApp Image 2025-05-15 at 11.15.05_db0fe0fa 1.png";
import dashboardIcon from "../assets/dashboardAssets/element-4.png";
import historyIcon from "../assets/dashboardAssets/Calendar.png";
import billingIcon from "../assets/dashboardAssets/stash_billing-info.png";
import nav_icon from "../assets/dashboardAssets/Chart.png";
import profileIcon from "../assets/dashboardAssets/user.png";
import BusinessIcon from "../assets/dashboardAssets/icon-park-outline_user-business.png";
import logOutIcon from "../assets/dashboardAssets/login.png";
import searchIcon from "../assets/dashboardAssets/search-normal.png";
import notificationIcon from "../assets/dashboardAssets/notification-bing.png";
import arrowIcon from "../assets/dashboardAssets/arrow-down.png";
import balanceIcon from "../assets/dashboardAssets/balance.png";
import arrowRight from "../assets/dashboardAssets/arrow-right.png";
import redIcon from "../assets/dashboardAssets/red.png";
import blueIcon from "../assets/dashboardAssets/blue.png";
import yellowIcon from "../assets/dashboardAssets/yellow.png";
import export1Icon from "../assets/dashboardAssets/export1.png";
import exportIcon from "../assets/dashboardAssets/export.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  function handleHistory() {
    navigate("/apilogs");
  }

  // const [active, setActive] = useState(true);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const chartData = [
    { date: "14/05/2025", verified: 28, fail: 15 },
    { date: "15/05/2025", verified: 80, fail: 28 },
    { date: "16/05/2025", verified: 16, fail: 32 },
    { date: "17/05/2025", verified: 79, fail: 95 },
    { date: "18/05/2025", verified: 43, fail: 73 },
    { date: "19/05/2025", verified: 24, fail: 63 },
    { date: "20/05/2025", verified: 52, fail: 112 },
    { date: "21/05/2025", verified: 44, fail: 98 },
  ];

  const maxValue = Math.max(...chartData.flatMap((d) => [d.verified, d.fail]));

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
          background-color:rgb(234, 237, 239);
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
          background:transparent;
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
          outline:none
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
        background-color:white;
        padding:.4rem .8rem;
        border-radius:2rem;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .notification-icon {
          padding:.5rem 1.5rem;
          border:1px solid rgba(119, 133, 138, 0.24);;
         display:flex;
         align-items:center;
          color: #636e72;
          cursor: pointer;
          border-radius:2rem;
        }
          .notification-icon{
          }
          .user-avatar{
          }
          .arrow-down{
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
          padding:20px 25px 2px 20px;
          margin:26px;
          background-color:white;
          border-radius:1rem;
        }

        .page-title {
          font-size: 28px;
          font-weight: 600;
          color: #2d3436;
          margin-bottom: 24px;
        }

        .balance-card {
          background:#4745A4;
          border-radius: 16px;
          padding: 20px 32px;
          color: white;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
          display:flex;
          gap:1rem;
          flex-direction:column;
          
        }

        .balance-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%
          );
          pointer-events: none;
        
          
        }

        .balance-header {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom:1px solid white;
          padding-bottom:1.7rem;
        }

        .balance-icon {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .balance-title {
          font-size: 18px;
          font-weight: 500;
          opacity: 0.9;
          color:white;
        }

          .balance-fund{
          display:flex;
          justify-content:space-between;
          align-items:center;
          }

        .balance-amount {
          font-size: 36px;
          font-weight: 700;
         
        }

        .fund-wallet-btn {
          background: white;
          border:none;
          color: #4745A4;
          padding:.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .fund-wallet-btn:hover {
          transform:scale(1.1);
          transition:.2s;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #e9ecef;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .stat-header {
          display: flex;
          gap:3rem;
          margin-bottom: 16px;
          padding-bottom:1.3rem;
          border-bottom:1px solid #e9ecef;
        }

        .stat-info {
          display: flex;
        
          gap: 8px;
          
        }

        .stat-icon {
          width: 24px;
          height: 24px;
        }

        .stat-title {
          font-size: 14px;
          color: black;
          font-weight: 500;
          // white-space:nowrap;
        }

        .stat-change {
          font-size: 12px;
          color: grey;
          display: flex;
          flex-direction:column;
          gap: 4px;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #2d3436;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .stat-arrow {
          color: #636e72;
          font-size: 16px;
        }

        .chart-container {
          background: white;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #e9ecef;
          position: relative;
          margin:1.7rem;
        }

        .chart-wrapper {
          position: relative;
          background: white;
        }

        .chart-y-axis {
          position: absolute;
          left: 0;
          top: 0%;
          height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
        }

        .y-axis-label {
          font-size: 12px;
          color: #9ca3af;
          text-align: right;
          padding-right: 8px;
        }

        .chart-grid {
          position: absolute;
          left: 40px;
          right: 0;
          top: 0;
          height: 280px;
        }

        .grid-line {
          position: absolute;
          left: 0;
          right: 0;
          border-top: 1px solid #f3f4f6;
        }

        .chart {
          margin-left: 40px;
          display: flex;
          align-items: end;
          justify-content: space-between;
          height: 280px;
          gap: 8px;
          margin-bottom: 16px;
          top:1.8rem;
          position: relative;
        }

        .chart-bar-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          max-width: 80px;
        }

        .chart-bars {
          display: flex;
          gap: 6px;
          align-items: end;
          height: 240px;
          margin-bottom: 12px;
        }

        .chart-bar {
          width: 24px;
          border-radius: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: barGrowUp 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          transform-origin: bottom;
          cursor: pointer;
          position: relative;
          transform: scaleY(0);
        }

        .chart-bar:hover {
          transform: scaleX(1.1) scaleY(var(--bar-scale-y, 1));
          filter: brightness(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .chart-bar.verified {
          background: linear-gradient(180deg, #4ade80 0%, #22c55e 100%);
        }

        .chart-bar.fail {
          background: linear-gradient(180deg, #ef4444 0%, #dc2626 100%);
        }

        .tooltip {
          position: absolute;
          bottom: 105%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 1000;
        }

        .tooltip::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: rgba(0, 0, 0, 0.9);
        }

        .chart-bar:hover .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(-5px);
        }

        .chart-bar-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          max-width: 80px;
          animation: slideUp 0.8s ease-out forwards;
          animation-delay: var(--stagger-delay, 0s);
          opacity: 0;
          transform: translateY(20px);
        }

        .chart-date {
          font-size: 11px;
          color: #6b7280;
          text-align: center;
          white-space: nowrap;
        }

        .chart-legend {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 40px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #6b7280;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .legend-color.verified {
          background: #4ade80;
        }

        .legend-color.fail {
          background: #ef4444;
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

        @keyframes barGrowUp {
          0% {
            transform: scaleY(0);
          }
          100% {
            transform: scaleY(1);
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(74, 222, 128, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(74, 222, 128, 0.6);
          }
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
            max-width:200px;
          }

          .user-name {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .content {
            padding: 16px;
          }

          .balance-card {
            padding: 24px;
          }

          .balance-amount {
            font-size: 28px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .chart {
            height: 150px;
            gap: 4px;
          }

          .chart-bars {
            height: 120px;
      
          .chart-bar {
            width: 12px;
          }

          .chart-date {
            font-size: 10px;
          }

           
        }

        @media (max-width: 480px) {
          .top-bar {
            padding: 13px 5px 12px 16px;
            display:flex;
            justify-content:space-between;

      }
            .hamSearch{
            display:flex;
            justify-content:space-between;
            gap:1rem;
            }

          .balance-card {
            padding: 20px;
          }

          .balance-amount {
            font-size: 24px;
          }

          .stat-card {
            padding: 16px;
          }

          .notification-icon{
           display:none;
          }
         .user-section{
         background-color:transparent;
         }
          .arrow-down{
          display:none;
          }

          .chart-container {
            padding: 16px;
            overflow-x: scroll;
            overflow-y: scroll;
          }

          .chart {
          margin-left: 40px;
          display: flex;
          align-items: end;
          justify-content: space-between;
          height: 270px;
          gap: 8px;
          margin-bottom: 16px;
          top:1.8rem;
          position: relative;
        }

          .main-content {
            max-width: 385px;
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
            <div className="nav-item active">
              <div className="nav-icon">
                {" "}
                <img src={dashboardIcon} alt="icon" />
              </div>
              Dashboard
            </div>
            <div onClick={() => handleHistory()} className="nav-item">
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
            <div className="nav-item">
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
              <div className="search-icon">
                <img src={searchIcon} alt="icon" />
              </div>
              <input
                type="text"
                className="search-input"
                placeholder="Search here ..."
              />
            </div>
          </div>

          <div className="user-section">
            <div className="notification-icon">
              {" "}
              <img src={notificationIcon} alt="icon" />
            </div>
            <div className="user-avatar">E</div>
            <span className="user-name">emmy</span>
            <span className="arrow-down">
              <img src={arrowIcon} alt="icon" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <h1 className="page-title">Overview</h1>

          {/* Balance Card */}
          <div className="balance-card">
            <div className="balance-header">
              <div className="balance-icon">
                <img src={balanceIcon} alt="icon" />
              </div>
              <span className="balance-title">Your Balance</span>
            </div>
            <div className="balance-fund">
              <div className="balance-amount">$28,891.138</div>
              <button className="fund-wallet-btn">Fund Wallet</button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-info">
                  <div className="stat-icon">
                    <img src={yellowIcon} alt="icon" />
                  </div>
                </div>
                <div className="stat-change">
                  <span className="stat-title">Total API Calls</span>
                  <div>
                    <img src={export1Icon} alt="icon" /> <span>Up by 0%</span>
                  </div>
                </div>
              </div>
              <div className="stat-value">
                5
                <span className="stat-arrow">
                  <img src={arrowRight} alt="icon" />
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-info">
                  <div className="stat-icon">
                    <img src={blueIcon} alt="icon" />
                  </div>
                </div>
                <div className="stat-change">
                  <span className="stat-title">Total verified document</span>
                  <div>
                    <img src={exportIcon} alt="icon" /> <span>Up by 0%</span>
                  </div>
                </div>
              </div>
              <div className="stat-value">
                0
                <span className="stat-arrow">
                  <img src={arrowRight} alt="icon" />
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-info">
                  <div className="stat-icon">
                    <img src={blueIcon} alt="icon" />
                  </div>
                </div>
                <div className="stat-change">
                  <span className="stat-title">
                    Total Successful Verifications
                  </span>
                  <div>
                    <img src={exportIcon} alt="icon" /> <span>Up by 100%</span>
                  </div>
                </div>
              </div>
              <div className="stat-value">
                5
                <span className="stat-arrow">
                  <img src={arrowRight} alt="icon" />
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-info">
                  <div className="stat-icon">
                    <img src={redIcon} alt="icon" />
                  </div>
                </div>
                <div className="stat-change">
                  <span style={{ color: "red" }} className="stat-title">
                    Total Failed Verifications
                  </span>
                  <div>
                    <img src={exportIcon} alt="icon" />
                    <span> Up by 0%</span>
                  </div>
                </div>
              </div>
              <div className="stat-value">
                0
                <span className="stat-arrow">
                  <img src={arrowRight} alt="icon" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="chart-container">
          <div className="chart-wrapper">
            {/* Y-axis labels */}
            <div className="chart-y-axis">
              <div className="y-axis-label">100</div>
              <div className="y-axis-label">80</div>
              <div className="y-axis-label">60</div>
              <div className="y-axis-label">40</div>
              <div className="y-axis-label">20</div>
              <div className="y-axis-label">0</div>
            </div>

            {/* Grid lines */}
            <div className="chart-grid">
              <div className="grid-line" style={{ top: "0%" }}></div>
              <div className="grid-line" style={{ top: "20%" }}></div>
              <div className="grid-line" style={{ top: "40%" }}></div>
              <div className="grid-line" style={{ top: "60%" }}></div>
              <div className="grid-line" style={{ top: "80%" }}></div>
              <div className="grid-line" style={{ top: "100%" }}></div>
            </div>

            {/* Chart bars */}
            <div className="chart">
              {chartData.map((data, index) => (
                <div
                  key={index}
                  className="chart-bar-group"
                  style={{
                    "--stagger-delay": `${index * 0.15}s`,
                  }}
                >
                  <div className="chart-bars">
                    <div
                      className="chart-bar verified"
                      style={{
                        height: `${(data.verified / 100) * 240}px`,
                        animationDelay: `${index * 0.15}s`,
                        "--bar-scale-y": `${
                          ((data.verified / 100) * 240) / 24
                        }`,
                      }}
                    >
                      <div className="tooltip">Verified: {data.verified}</div>
                    </div>
                    <div
                      className="chart-bar fail"
                      style={{
                        height: `${(data.fail / 100) * 240}px`,
                        animationDelay: `${index * 0.15 + 0.1}s`,
                        "--bar-scale-y": `${((data.fail / 100) * 240) / 24}`,
                      }}
                    >
                      <div className="tooltip">Failed: {data.fail}</div>
                    </div>
                  </div>
                  <div className="chart-date">{data.date}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color verified"></div>
              Verified
            </div>
            <div className="legend-item">
              <div className="legend-color fail"></div>
              fail
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
