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
import empty from "../assets/Empty.gif";
import { ToastContainer, toast } from "react-toastify";
import bankLogo from "../assets/dashboardAssets/bankLogo.png";
import "react-toastify/dist/ReactToastify.css";

export default function ApiLogs() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1 = initial modal, 2 = BVN modal
  // Usage:

  const [bvn, setBvn] = useState("");
  function card() {
    setShowModal(true);
    setModalStep(5); // show account info

    // Wait 5 seconds, then hide modal
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
    console.log("heelloe");
  }

  function showAccountCardThenClose() {
    setModalStep(5);
    setTimeout(() => {
      setShowModal(false);
    }, 5000);
  }

  function handleDashboard() {
    const token = localStorage.getItem("token");
    async function toDashboard(authCode) {
      const res = await fetch(
        "https://sprintcheck.megasprintlimited.com.ng/api/dashboard",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authCode}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to login");
      console.log(data);
    }
    toDashboard(token);
  }

  useEffect(() => {
    const storedData = localStorage.getItem("dashboardData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setDashboardData(parsed);

      handleDashboard();
      const dashboardInfo = extractDashboardInfo(parsed);
      const hasAccountNumber = dashboardInfo?.virtual_accounts?.length > 0;

      if (!hasAccountNumber) {
        setShowModal(true);
      }
    }

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  async function getAcc(bvnData) {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://sprintcheck.megasprintlimited.com.ng/api/generate-account",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bvnData),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Incorrect BVN");
    console.log(data);
    return data;
  }

  const handleBvnSubmit = async () => {
    const cleanBvn = bvn.trim();

    if (!cleanBvn) {
      toast.error("BVN field is required");
      return;
    }

    if (!/^\d{11}$/.test(cleanBvn)) {
      toast.error("Please enter a valid 11-digit BVN");
      return;
    }

    setLoading(true);
    setModalStep(3); // Show loader UI

    try {
      const response = await getAcc({ bvn: cleanBvn });

      if (response.success) {
        toast.success("BVN updated successfully!");
        showAccountCardThenClose();
      } else {
        if (response.status) {
          toast.success(response.message);
          showAccountCardThenClose();
        } else {
          toast.error(response.message || "Failed to update BVN");
          setModalStep(2);
        }
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      setModalStep(2);
    } finally {
      setLoading(false);
      console.log("BVN submission finished");
    }
  };

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

  const chartData = [
    // { date: "14/05/2025", verified: 28, fail: 15 },
    // { date: "15/05/2025", verified: 80, fail: 28 },
    // { date: "16/05/2025", verified: 16, fail: 32 },
    // { date: "17/05/2025", verified: 79, fail: 95 },
    // { date: "18/05/2025", verified: 43, fail: 73 },
    // { date: "19/05/2025", verified: 24, fail: 63 },
    // { date: "20/05/2025", verified: 52, fail: 112 },
    // { date: "21/05/2025", verified: 44, fail: 98 },
  ];

  // const maxValue = Math.max(...chartData.flatMap((d) => [d.verified, d.fail]));
  const dashboardInfo = extractDashboardInfo(dashboardData);
  const avatarChar = dashboardInfo.businessName;
  const avatar = avatarChar ? avatarChar[0] : "";
  console.log(dashboardInfo.virtual_accounts);
  const accountInfo = dashboardInfo?.virtual_accounts?.[0] || {};
  const { account_number, customer_name, bank_name } = accountInfo;

  const TotalApiCalls = Number(
    dashboardInfo.total + dashboardInfo.successful + dashboardInfo.failed
  );

  localStorage.setItem("avatarChar", avatarChar);
  localStorage.setItem("avatar", avatar);

  return (
    <div className="dashboard">
      {/* Overlay for mobile */}
      <div
        className={`overlay ${isMobile && sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <SideBar sidebarOpen={sidebarOpen} isMobile={isMobile} />
      {showModal && (
        <div className="modal-overlay">
          <ToastContainer position="top-right" autoClose={3000} />
          {modalStep !== 5 && (
            <div className="accNo_Modal">
              {modalStep === 1 && (
                <>
                  <p>
                    You do not have an account number yet. Kindly generate
                    account number by clicking the button below.
                  </p>
                  <button onClick={() => setModalStep(2)}>
                    Generate account number
                  </button>
                </>
              )}

              {modalStep === 2 && (
                <>
                  <p>Enter BVN</p>
                  <input
                    type="text"
                    value={bvn}
                    onChange={(e) => setBvn(e.target.value)}
                    placeholder="Enter your BVN"
                    className="bvn-input"
                  />
                  <button onClick={handleBvnSubmit}>
                    {loading ? <Loaderacc /> : `Generate account number`}
                  </button>
                </>
              )}

              {modalStep === 3 && (
                <>
                  <p>Generating account number...</p>
                  <button>
                    <Loaderacc />
                  </button>
                </>
              )}

              {modalStep === 4 && (
                <>
                  <p>Recheck in the next 5 minutes for your account number</p>
                  <button onClick={() => showAccountCardThenClose()}>
                    Okay
                  </button>
                </>
              )}
            </div>
          )}

          {modalStep === 5 && (
            <div className="accCard">
              <img src={bankLogo} alt="bank"></img>
              <p>
                <strong>Account Number: </strong>
                {account_number}
              </p>
              <p>
                <strong>Account Name: </strong>
                {customer_name}
              </p>
              <p>
                s<strong>Bank Name: </strong>
                {bank_name}
              </p>
            </div>
          )}
        </div>
      )}

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
              <button onClick={() => card()} className="fund-wallet-btn">
                Fund Wallet
              </button>
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
          {chartData[0] ? (
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
                {chartData?.map((data, index) => (
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
          ) : (
            <img src={empty} alt="logo" />
          )}
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

function Loaderacc() {
  return <div className="loaderAcc"></div>;
}
