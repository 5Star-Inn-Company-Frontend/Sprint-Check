import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          background-color: #f8f9fa;
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
          border-bottom: 1px solid #e9ecef;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6c5ce7, #a29bfe);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 600;
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
          background: white;
          padding: 16px 24px;
          border-bottom: 1px solid #e9ecef;
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
          max-width: 400px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 10px 16px 10px 40px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
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
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .notification-icon {
          width: 24px;
          height: 24px;
          color: #636e72;
          cursor: pointer;
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
          padding: 24px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 600;
          color: #2d3436;
          margin-bottom: 24px;
        }

        .balance-card {
          background: linear-gradient(135deg, #6c5ce7, #a29bfe);
          border-radius: 16px;
          padding: 32px;
          color: white;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
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
          margin-bottom: 16px;
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
        }

        .balance-amount {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .fund-wallet-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          float: right;
        }

        .fund-wallet-btn:hover {
          background: rgba(255, 255, 255, 0.3);
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
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .stat-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .stat-icon {
          width: 24px;
          height: 24px;
        }

        .stat-title {
          font-size: 14px;
          color: #636e72;
          font-weight: 500;
        }

        .stat-change {
          font-size: 12px;
          color: #00b894;
          display: flex;
          align-items: center;
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
        }

        .chart {
          display: flex;
          align-items: end;
          justify-content: space-between;
          height: 200px;
          gap: 8px;
          margin-bottom: 16px;
        }

        .chart-bar-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          max-width: 60px;
        }

        .chart-bars {
          display: flex;
          gap: 4px;
          align-items: end;
          height: 160px;
          margin-bottom: 8px;
        }

        .chart-bar {
          width: 16px;
          border-radius: 4px 4px 0 0;
          transition: all 0.3s ease;
          animation: barGrow 0.8s ease forwards;
          transform-origin: bottom;
        }

        .chart-bar:hover {
          opacity: 0.8;
        }

        .chart-bar.verified {
          background: #00b894;
        }

        .chart-bar.fail {
          background: #e17055;
        }

        .chart-date {
          font-size: 11px;
          color: #636e72;
          text-align: center;
          transform: rotate(-45deg);
          white-space: nowrap;
        }

        .chart-legend {
          display: flex;
          justify-content: center;
          gap: 24px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #636e72;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .legend-color.verified {
          background: #00b894;
        }

        .legend-color.fail {
          background: #e17055;
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

        @keyframes barGrow {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
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
            display: none;
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
          }

          .chart-bar {
            width: 12px;
          }

          .chart-date {
            font-size: 10px;
          }
        }

        @media (max-width: 480px) {
          .top-bar {
            padding: 12px 16px;
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

          .chart-container {
            padding: 16px;
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
          <div className="logo">SC</div>
          <span className="logo-text">SprintCheck</span>
        </div>

        <nav className="nav-menu">
          <div className="nav-section">
            <div className="nav-item active">
              <div className="nav-icon">🟨</div>
              Dashboard
            </div>
            <div className="nav-item">
              <div className="nav-icon">⏱️</div>
              History
            </div>
            <div className="nav-item">
              <div className="nav-icon">📄</div>
              Billing
            </div>
            <div className="nav-item">
              <div className="nav-icon">🔗</div>
              Developers
            </div>
          </div>

          <div className="nav-divider"></div>

          <div className="nav-section">
            <div className="nav-item">
              <div className="nav-icon">👤</div>
              Profile
            </div>
            <div className="nav-item">
              <div className="nav-icon">👥</div>
              Business info
            </div>
          </div>

          <div className="nav-bottom">
            <div className="nav-item">
              <div className="nav-icon">🚪</div>
              Logout
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isMobile ? "mobile" : ""}`}>
        {/* Top Bar */}
        <div className="top-bar">
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

          <div className="user-section">
            <div className="notification-icon">🔔</div>
            <div className="user-avatar">E</div>
            <span className="user-name">emmy</span>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <h1 className="page-title">Overview</h1>

          {/* Balance Card */}
          <div className="balance-card">
            <div className="balance-header">
              <div className="balance-icon">💰</div>
              <span className="balance-title">Your Balance</span>
            </div>
            <div className="balance-amount">$28,891.138</div>
            <button className="fund-wallet-btn">Fund Wallet</button>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-info">
                  <div className="stat-icon">📞</div>
                  <span className="stat-title">Total API Calls</span>
                </div>
                <div className="stat-change">📈 Up by 0%</div>
              </div>
              <div className="stat-value">
                5<span className="stat-arrow">→</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-info">
                  <div className="stat-icon">💙</div>
                  <span className="stat-title">Total verified document</span>
                </div>
                <div className="stat-change">📈 Up by 0%</div>
              </div>
              <div className="stat-value">
                0<span className="stat-arrow">→</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-info">
                  <div className="stat-icon">💙</div>
                  <span className="stat-title">
                    Total Successful Verificatio
                  </span>
                </div>
                <div className="stat-change">📈 Up by 100%</div>
              </div>
              <div className="stat-value">
                5<span className="stat-arrow">→</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-info">
                  <div className="stat-icon">❤️</div>
                  <span className="stat-title">Total Failed Verifications</span>
                </div>
                <div className="stat-change">📈 Up by 0%</div>
              </div>
              <div className="stat-value">
                0<span className="stat-arrow">→</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="chart-container">
            <div className="chart">
              {chartData.map((data, index) => (
                <div key={index} className="chart-bar-group">
                  <div className="chart-bars">
                    <div
                      className="chart-bar verified"
                      style={{
                        height: `${(data.verified / maxValue) * 100}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    />
                    <div
                      className="chart-bar fail"
                      style={{
                        height: `${(data.fail / maxValue) * 100}%`,
                        animationDelay: `${index * 0.1 + 0.05}s`,
                      }}
                    />
                  </div>
                  <div className="chart-date">{data.date}</div>
                </div>
              ))}
            </div>

            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color verified"></div>
                Verified
              </div>
              <div className="legend-item">
                <div className="legend-color fail"></div>
                Fail
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
