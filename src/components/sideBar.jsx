import React, { useState, useEffect } from "react"; // ADD THIS
import { useNavigate } from "react-router-dom";
import logo from "../assets/dashboardAssets/WhatsApp Image 2025-05-15 at 11.15.05_db0fe0fa 1.png";
import dashboardIcon from "../assets/dashboardAssets/element-4.png";
import historyIcon from "../assets/dashboardAssets/Calendar.png";
import billingIcon from "../assets/dashboardAssets/stash_billing-info.png";
import nav_icon from "../assets/dashboardAssets/Chart.png";
import profileIcon from "../assets/dashboardAssets/user.png";
import logOutIcon from "../assets/dashboardAssets/login.png";
import "../dashboard.css";

export default function SideBar({ isMobile, sidebarOpen }) {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(() =>
    localStorage.getItem("activeTab")
  ); // <-- active item tracker

  useEffect(() => {
    localStorage.setItem("activeTab", activeItem);
  }, [activeItem]);

  // function handleDashboard() {
  //   setActiveItem("dashboard"); // set active
  //   const token = localStorage.getItem("token");
  //   async function toDashboard(authCode) {
  //     const res = await fetch(
  //       "https://sprintcheck.megasprintlimited.com.ng/api/dashboard",
  //       {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${authCode}`,
  //         },
  //       }
  //     );
  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message || "Failed to login");
  //     navigate("/dashboard");
  //   }
  //   toDashboard(token);
  // }

  // function transformApiLogs(apiResponse) {
  //   return apiResponse.data.data.map((item) => {
  //     let bvnData = null;
  //     try {
  //       if (item.bvn?.data) bvnData = JSON.parse(item.bvn.data);
  //     } catch (e) {
  //       console.error("Error parsing BVN data:", e);
  //     }
  //     const fullName = bvnData
  //       ? `${bvnData.firstName || ""} ${bvnData.lastName || ""}`.trim()
  //       : "Null";
  //     return {
  //       id: item.id,
  //       endpoint: item.type,
  //       name: fullName,
  //       amount: 40.0,
  //       source: item.source,
  //       performedBy: "Samuel Odejirmi",
  //       date: new Date(item.created_at).toLocaleString("en-US", {
  //         month: "short",
  //         day: "numeric",
  //         year: "numeric",
  //         hour: "numeric",
  //         minute: "numeric",
  //         hour12: true,
  //       }),
  //       status: item.status === 1 ? "SUCCESSFUL" : "FAILED",
  //       userDetails: bvnData || null,
  //     };
  //   });
  // }

function handleHistory() {
  setActiveItem("history");
  navigate("/apilogs");
}
function handleDashboard() {
  setActiveItem("dashboard");
  navigate("/dashboard");
}


function handleBilling() {
  setActiveItem("billing");
  navigate("/billing");
}


  function handleDeveloper() {
    setActiveItem("developer");
    navigate("/developer");
  }

  function handleProfile() {
    setActiveItem("profile");
    navigate("/profile");
  }
  function handleLogout() {
    setActiveItem(""); // Clear local state (if applicable)

    const keysToRemove = [
      "token",
      "dashboardData", // fixed case sensitivity
      "activeTab",
      "apiLogsData",
      "avatar",
      "avatarChar",
      "billingData",
      "business_Id",
      "api_key",
      "encryption_key",
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));

    navigate("/login");
  }

  return (
    <div
      className={`sidebar ${isMobile ? "mobile" : ""} ${
        isMobile && sidebarOpen ? "open" : ""
      }`}
    >
      <div className="sidebar-header">
        <div
          style={{ cursor: "pointer" }}
          onClick={handleDashboard}
          className="logoDashboard"
        >
          <img src={logo} alt="logo" />
        </div>
      </div>

      <nav className="nav-menu">
        <div className="nav-section">
          <div
            onClick={handleDashboard}
            className={`nav-item ${activeItem === "dashboard" ? "active" : ""}`}
          >
            <div className="nav-icon">
              <img src={dashboardIcon} alt="icon" />
            </div>
            Dashboard
          </div>
          <div
            onClick={handleHistory}
            className={`nav-item ${activeItem === "history" ? "active" : ""}`}
          >
            <div className="nav-icon">
              <img src={historyIcon} alt="icon" />
            </div>
            History
          </div>
          <div
            onClick={handleBilling}
            className={`nav-item ${activeItem === "billing" ? "active" : ""}`}
          >
            <div className="nav-icon">
              <img src={billingIcon} alt="icon" />
            </div>
            Billing
          </div>
          <div
            onClick={handleDeveloper}
            className={`nav-item ${activeItem === "developer" ? "active" : ""}`}
          >
            <div className="nav-icon">
              <img src={nav_icon} alt="icon" />
            </div>
            Developers
          </div>
        </div>

        <div className="nav-divider"></div>

        <div onClick={handleProfile} className="nav-section">
          <div
            className={`nav-item ${activeItem === "profile" ? "active" : ""}`}
          >
            <div className="nav-icon">
              <img src={profileIcon} alt="icon" />
            </div>
            Profile
          </div>
        </div>

        <div className="nav-bottom">
          <div onClick={handleLogout} className="nav-item">
            <div className="nav-icon">
              <img src={logOutIcon} alt="icon" />
            </div>
            Logout
          </div>
        </div>
      </nav>
    </div>
  );
}
