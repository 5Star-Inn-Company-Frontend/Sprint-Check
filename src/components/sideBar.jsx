// {
//   /* Sidebar */
// }

// import logo from "../assets/dashboardAssets/WhatsApp Image 2025-05-15 at 11.15.05_db0fe0fa 1.png";
// import dashboardIcon from "../assets/dashboardAssets/element-4.png";
// import historyIcon from "../assets/dashboardAssets/Calendar.png";
// import billingIcon from "../assets/dashboardAssets/stash_billing-info.png";
// import nav_icon from "../assets/dashboardAssets/Chart.png";
// import profileIcon from "../assets/dashboardAssets/user.png";
// import { useNavigate } from "react-router-dom";
// import "../dashboard.css";

// import logOutIcon from "../assets/dashboardAssets/login.png";
// import "../dashboard.css";
// export default function SideBar({ isMobile, sidebarOpen }) {
//   const navigate = useNavigate();

//   function handleDashboard() {
//       const token = localStorage.getItem("token");
//     async function toDashboard(authCode) {
//       const res = await fetch(
//         "https://sprintcheck.megasprintlimited.com.ng/api/dashboard",
//         {
//           method: "GET",
//           headers: {
//             //  "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${authCode}`,
//           },
//           // body: JSON.stringify(authCode),
//         }
//       );

//       const data = await res.json();
//       console.log(data);
//       if (!res.ok) {
//         throw new Error(data.message || "Failed to login");
//       } else {
//         navigate("/dashboard");
//       }
//     }
//     toDashboard(token);
//   }

//   function transformApiLogs(apiResponse) {
//     return apiResponse.data.data.map((item) => {
//       // Parse BVN data if available
//       let userDetails = null;
//       let bvnData = null;

//       try {
//         if (item.bvn?.data) {
//           bvnData = JSON.parse(item.bvn.data);
//         }
//       } catch (e) {
//         console.error("Error parsing BVN data:", e);
//       }

//       // Construct userDetails if BVN data exists
//       if (bvnData) {
//         userDetails = {
//           avatar: item.image || "avatar",
//           bvn: bvnData.bvn || "",
//           firstName: bvnData.firstName || "",
//           lastName: bvnData.lastName || "",
//           middleName: bvnData.middleName || "",
//           dateOfBirth: bvnData.dateOfBirth || "",
//           gender: bvnData.gender || "",
//           phoneNumber: bvnData.phoneNumber1 || "",
//           lgaOfOrigin: bvnData.lgaOfOrigin || "",
//           lgaOfResidence: bvnData.lgaOfResidence || "",
//           maritalStatus: bvnData.maritalStatus || "",
//           nationality: bvnData.nationality || "",
//           residentialAddress: bvnData.residentialAddress || "",
//           stateOfOrigin: bvnData.stateOfOrigin || "",
//           stateOfResidence: bvnData.stateOfResidence || "",
//           enrollmentBank: bvnData.enrollmentBank || "",
//           enrollmentBranch: bvnData.enrollmentBranch || "",
//           nameOnCard: bvnData.nameOnCard || "",
//           nin: bvnData.nin || "",
//           levelOfAccount: bvnData.levelOfAccount || "",
//           watchlisted: bvnData.watchListed === "True" ? "Yes" : "No",
//           number: bvnData.number || "",
//         };
//       }

//       // Format date
//       const formattedDate = new Date(item.created_at).toLocaleString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       });

//       // Determine status
//       const status = item.status === 1 ? "SUCCESSFUL" : "FAILED";

//       // Construct full name
//       const fullName = bvnData
//         ? `${bvnData.firstName || ""} ${bvnData.lastName || ""}`.trim()
//         : "Null";

//       return {
//         id: item.id,
//         endpoint: item.type,
//         name: fullName || "Null",
//         amount: 40.0, // Static value as in mock data
//         source: item.source,
//         performedBy: "Samuel Odejirmi", // Static as in mock
//         date: formattedDate,
//         status: status,
//         userDetails: userDetails, // null when BVN data unavailable
//       };
//     });
//   }

//     function handleHistory() {
//       const token = localStorage.getItem("token");
//       async function toDashboard(authCode) {
//         const res = await fetch(
//           "https://sprintcheck.megasprintlimited.com.ng/api/history",
//           {
//             method: "GET",
//             headers: {
//               //  "Content-Type": "application/json",
//               Accept: "application/json",
//               Authorization: `Bearer ${authCode}`,
//             },
//             // body: JSON.stringify(authCode),
//           }
//         );

//         const data = await res.json();
//         const apiData = transformApiLogs(data);
//          localStorage.setItem("apiLogsData", JSON.stringify(apiData));
//         if (!res.ok) {
//           throw new Error(data.message || "You're not logged in");
//         } else {
//            navigate("/apilogs");
//         }
//       }
//       toDashboard(token);
//     }

//   function handleLogout() {
//     localStorage.removeItem("token");
//      localStorage.removeItem("dashBoardData");
//     navigate("/");
//   }

//    function handleBilling() {
//      const token = localStorage.getItem("token");
//      async function toDashboard(authCode) {
//        const res = await fetch(
//          "https://sprintcheck.megasprintlimited.com.ng/api/wallet-history",
//          {
//            method: "GET",
//            headers: {
//              //  "Content-Type": "application/json",
//              Accept: "application/json",
//              Authorization: `Bearer ${authCode}`,
//            },
//            // body: JSON.stringify(authCode),
//          }
//        );

//        const data = await res.json();
//        console.log(data);
//        localStorage.setItem("billingData", JSON.stringify(data.data));
//        if (!res.ok) {
//          throw new Error(data.message || "You're not logged in");
//        } else {
//          navigate("/billing");
//        }
//      }
//      toDashboard(token);
//    }

//   function handleDeveloper() {
//     navigate("/developer");
//   }

//   function handleProfile() {
//     navigate("/profile");
//   }
//   return (
//     <div
//       className={`sidebar ${isMobile ? "mobile" : ""} ${
//         isMobile && sidebarOpen ? "open" : ""
//       }`}
//     >
//       <div className="sidebar-header">
//         <div className="logoDashboard">
//           <img src={logo} alt="logo" />
//         </div>
//       </div>

//       <nav className="nav-menu">
//         <div className="nav-section">
//           <div onClick={() => handleDashboard()} className="nav-item active">
//             <div className="nav-icon">
//               {" "}
//               <img src={dashboardIcon} alt="icon" />
//             </div>
//             Dashboard
//           </div>
//           <div onClick={() => handleHistory()} className="nav-item">
//             <div className="nav-icon">
//               <img src={historyIcon} alt="icon" />
//             </div>
//             History
//           </div>
//           <div onClick={() => handleBilling()} className="nav-item">
//             <div className="nav-icon">
//               <img src={billingIcon} alt="icon" />
//             </div>
//             Billing
//           </div>
//           <div onClick={() => handleDeveloper()} className="nav-item">
//             <div className="nav-icon">
//               <img src={nav_icon} alt="icon" />
//             </div>
//             Developers
//           </div>
//         </div>

//         <div className="nav-divider"></div>

//         <div onClick={() => handleProfile()} className="nav-section">
//           <div className="nav-item">
//             <div className="nav-icon">
//               {" "}
//               <img src={profileIcon} alt="icon" />
//             </div>
//             Profile
//           </div>
//         </div>

//         <div className="nav-bottom">
//           <div onClick={() => handleLogout()} className="nav-item">
//             <div className="nav-icon">
//               {" "}
//               <img src={logOutIcon} alt="icon" />
//             </div>
//             Logout
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

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

  function handleDashboard() {
    setActiveItem("dashboard"); // set active
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
      navigate("/dashboard");
    }
    toDashboard(token);
  }

  function transformApiLogs(apiResponse) {
    return apiResponse.data.data.map((item) => {
      let bvnData = null;
      try {
        if (item.bvn?.data) bvnData = JSON.parse(item.bvn.data);
      } catch (e) {
        console.error("Error parsing BVN data:", e);
      }
      const fullName = bvnData
        ? `${bvnData.firstName || ""} ${bvnData.lastName || ""}`.trim()
        : "Null";
      return {
        id: item.id,
        endpoint: item.type,
        name: fullName,
        amount: 40.0,
        source: item.source,
        performedBy: "Samuel Odejirmi",
        date: new Date(item.created_at).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        status: item.status === 1 ? "SUCCESSFUL" : "FAILED",
        userDetails: bvnData || null,
      };
    });
  }

  function handleHistory() {
    setActiveItem("history");
    const token = localStorage.getItem("token");
    async function toDashboard(authCode) {
      const res = await fetch(
        "https://sprintcheck.megasprintlimited.com.ng/api/history",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authCode}`,
          },
        }
      );
      const data = await res.json();
      localStorage.setItem(
        "apiLogsData",
        JSON.stringify(transformApiLogs(data))
      );
      if (!res.ok) throw new Error(data.message || "You're not logged in");
      navigate("/apilogs");
    }
    toDashboard(token);
  }

  function handleBilling() {
    setActiveItem("billing");
    const token = localStorage.getItem("token");
    async function toDashboard(authCode) {
      const res = await fetch(
        "https://sprintcheck.megasprintlimited.com.ng/api/wallet-history",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authCode}`,
          },
        }
      );
      const data = await res.json();
      localStorage.setItem("billingData", JSON.stringify(data.data));
      if (!res.ok) throw new Error(data.message || "You're not logged in");
      navigate("/billing");
    }
    toDashboard(token);
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
    setActiveItem(""); // Clear active
    localStorage.removeItem("token");
    localStorage.removeItem("dashBoardData");
    localStorage.removeItem("activeTab"); // clear active tab
    setActiveItem(""); // clear state too
    navigate("/");
  }

  return (
    <div
      className={`sidebar ${isMobile ? "mobile" : ""} ${
        isMobile && sidebarOpen ? "open" : ""
      }`}
    >
      <div className="sidebar-header">
        <div style={{"cursor":"pointer"}} onClick={handleDashboard} className="logoDashboard">
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
