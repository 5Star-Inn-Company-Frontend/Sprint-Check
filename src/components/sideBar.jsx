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

  
  function transformApiLogs(apiResponse) {
    return apiResponse.data.data.map((item) => {
      // Parse BVN data if available
      let userDetails = null;
      let bvnData = null;

      try {
        if (item.bvn?.data) {
          bvnData = JSON.parse(item.bvn.data);
        }
      } catch (e) {
        console.error("Error parsing BVN data:", e);
      }

      // Construct userDetails if BVN data exists
      if (bvnData) {
        userDetails = {
          avatar: item.image || "avatar",
          bvn: bvnData.bvn || "",
          firstName: bvnData.firstName || "",
          lastName: bvnData.lastName || "",
          middleName: bvnData.middleName || "",
          dateOfBirth: bvnData.dateOfBirth || "",
          gender: bvnData.gender || "",
          phoneNumber: bvnData.phoneNumber1 || "",
          lgaOfOrigin: bvnData.lgaOfOrigin || "",
          lgaOfResidence: bvnData.lgaOfResidence || "",
          maritalStatus: bvnData.maritalStatus || "",
          nationality: bvnData.nationality || "",
          residentialAddress: bvnData.residentialAddress || "",
          stateOfOrigin: bvnData.stateOfOrigin || "",
          stateOfResidence: bvnData.stateOfResidence || "",
          enrollmentBank: bvnData.enrollmentBank || "",
          enrollmentBranch: bvnData.enrollmentBranch || "",
          nameOnCard: bvnData.nameOnCard || "",
          nin: bvnData.nin || "",
          levelOfAccount: bvnData.levelOfAccount || "",
          watchlisted: bvnData.watchListed === "True" ? "Yes" : "No",
          number: bvnData.number || "",
        };
      }

      // Format date
      const formattedDate = new Date(item.created_at).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      // Determine status
      const status = item.status === 1 ? "SUCCESSFUL" : "FAILED";

      // Construct full name
      const fullName = bvnData
        ? `${bvnData.firstName || ""} ${bvnData.lastName || ""}`.trim()
        : "Null";

      return {
        id: item.id,
        endpoint: item.type,
        name: fullName || "Null",
        amount: 40.0, // Static value as in mock data
        source: item.source,
        performedBy: "Samuel Odejirmi", // Static as in mock
        date: formattedDate,
        status: status,
        userDetails: userDetails, // null when BVN data unavailable
      };
    });
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
        const apiData = transformApiLogs(data);
         localStorage.setItem("apiLogsData", JSON.stringify(apiData));
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
       localStorage.setItem("billingData", JSON.stringify(data.data));
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
