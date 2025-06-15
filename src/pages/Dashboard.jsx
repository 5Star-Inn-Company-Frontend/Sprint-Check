import React, { useState, useEffect } from "react";
import SideBar from "../components/sideBar";
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

export default function ApiLogs() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("dashboardData");
    if (storedData) {
      setDashboardData(JSON.parse(storedData));
    }

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  //  if (!dashboardData) {
  //    return <p>Loading dashboard...</p>;
  //  }

  function extractDashboardInfo(dashboardData) {
    if (!dashboardData?.data?.user) return {};

    const {
      user: {
        id: userId,
        name: userName,
        email,
        phone_number,
        reset_code,
        reset_code_expires_at,
        business: {
          id: businessId,
          name: businessName,
          wallet,
          confidence_level,
          api_key,
          encryption_key,
        } = {},
      },
      wallet_balance,
      virtual_accounts,
      api_calls: { total, successful, failed } = {},
    } = dashboardData.data;

    return {
      userId,
      userName,
      email,
      phone_number,
      reset_code,
      reset_code_expires_at,
      businessId,
      businessName,
      wallet,
      confidence_level,
      api_key,
      encryption_key,
      wallet_balance,
      virtual_accounts,
      total,
      successful,
      failed,
    };
  }

  // Usage:
  const dashboardInfo = extractDashboardInfo(dashboardData);
  const TotalApiCalls =Number(dashboardInfo.total + dashboardInfo.successful + dashboardInfo.failed);

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

  // const maxValue = Math.max(...chartData.flatMap((d) => [d.verified, d.fail]));
  const avatarChar = dashboardInfo.businessName;
  const avatar = avatarChar ? avatarChar[0] : "";


  return (
    <div className="dashboard">
      {/* Overlay for mobile */}
      <div
        className={`overlay ${isMobile && sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <SideBar sidebarOpen={sidebarOpen} isMobile={isMobile} />
      <div className="accNo_Modal">
        <p>
          You do not have an account number yet. Kindly generate account number
          by clicking the button below
        </p>

        <button>Generate account number</button>
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
            <div className="user-avatar">{avatar.toUpperCase()}</div>
            <span className="user-name">{dashboardInfo.businessName}</span>
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
              <div className="balance-amount">${dashboardInfo.wallet}</div>
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
                {TotalApiCalls}
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
                {dashboardInfo.total}
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
                {dashboardInfo.successful}
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
                {dashboardInfo.failed}
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
}
