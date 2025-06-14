{
  /* Sidebar */
}

import logo from "../assets/dashboardAssets/WhatsApp Image 2025-05-15 at 11.15.05_db0fe0fa 1.png";
import dashboardIcon from "../assets/dashboardAssets/element-4.png";
import historyIcon from "../assets/dashboardAssets/Calendar.png";
import billingIcon from "../assets/dashboardAssets/stash_billing-info.png";
import nav_icon from "../assets/dashboardAssets/Chart.png";
import profileIcon from "../assets/dashboardAssets/user.png";
import { useNavigate } from "react-router-dom";
import "../dashboard.css";

import logOutIcon from "../assets/dashboardAssets/login.png";
import "../dashboard.css";
export default function SideBar({ isMobile, sidebarOpen }) {
  const navigate = useNavigate();


  function handleDashboard() {
      const token = localStorage.getItem("token");
    async function toDashboard(authCode) {
      const res = await fetch(
        "https://sprintcheck.megasprintlimited.com.ng/api/dashboard",
        {
          method: "GET",
          headers: {
            //  "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authCode}`,
          },
          // body: JSON.stringify(authCode),
        }
      );

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.message || "Failed to login");
      } else {
        navigate("/dashboard");
      }
    }
    toDashboard(token);
  }


    function handleHistory() {
      const token = localStorage.getItem("token");
      async function toDashboard(authCode) {
        const res = await fetch(
          "https://sprintcheck.megasprintlimited.com.ng/api/history",
          {
            method: "GET",
            headers: {
              //  "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${authCode}`,
            },
            // body: JSON.stringify(authCode),
          }
        );

        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(data.message || "You're not logged in");
        } else {
           navigate("/apilogs");
        }
      }
      toDashboard(token);
    }

  

  function handleLogout() {
    localStorage.removeItem("token");
     localStorage.removeItem("dashBoardData");
    navigate("/");
  }


   function handleBilling() {
     const token = localStorage.getItem("token");
     async function toDashboard(authCode) {
       const res = await fetch(
         "https://sprintcheck.megasprintlimited.com.ng/api/history",
         {
           method: "GET",
           headers: {
             //  "Content-Type": "application/json",
             Accept: "application/json",
             Authorization: `Bearer ${authCode}`,
           },
           // body: JSON.stringify(authCode),
         }
       );

       const data = await res.json();
       console.log(data);
       if (!res.ok) {
         throw new Error(data.message || "You're not logged in");
       } else {
         navigate("/billing");
       }
     }
     toDashboard(token);
   }

  function handleDeveloper() {
    navigate("/developer");
  }

  function handleProfile() {
    navigate("/profile");
  }
  return (
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
          <div onClick={() => handleHistory()} className="nav-item">
            <div className="nav-icon">
              <img src={historyIcon} alt="icon" />
            </div>
            History
          </div>
          <div onClick={() => handleBilling()} className="nav-item">
            <div className="nav-icon">
              <img src={billingIcon} alt="icon" />
            </div>
            Billing
          </div>
          <div onClick={() => handleDeveloper()} className="nav-item">
            <div className="nav-icon">
              <img src={nav_icon} alt="icon" />
            </div>
            Developers
          </div>
        </div>

        <div className="nav-divider"></div>

        <div onClick={() => handleProfile()} className="nav-section">
          <div className="nav-item">
            <div className="nav-icon">
              {" "}
              <img src={profileIcon} alt="icon" />
            </div>
            Profile
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
  );
}
