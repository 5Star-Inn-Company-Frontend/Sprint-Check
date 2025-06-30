import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import pencilIcon from "../assets/dashboardAssets/Group 194.png";
// import logo from "../assets/dashboardAssets/WhatsApp Image 2025-05-15 at 11.15.05_db0fe0fa 1.png";
import { Eye, RotateCcw, FileDown } from "lucide-react";

import notificationIcon from "../assets/dashboardAssets/notification-bing.png";
import SideBar from "../components/sideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const profChar = localStorage.getItem("avatarChar");
  const profAvatar = localStorage.getItem("avatar");
  const [editMode, setEditMode] = useState(false);
  const [bEditMode, setbEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileForm, setProfileForm] = useState({
    name: "Emmanuel",
    username: "emmy",
    email: "emmy@gmail.com",
    dob: "1990-01-17", // ✅ fixed format
    address: "San Jose, California, USA",
    city: "Abule",
    postalCode: "45962",
    country: "USA",
  });

  const [businessForm, setbusinessForm] = useState({
    businessName: "Del",
    businessEmail: "emmy@gmail.com",
    businessPhone: "0808453834728",
    businessRegNo: "3473943",
    pAddress: "abule",
    city: "abule",
    postalCode: "45962",
    country: "USA",
    tin: "1328938230",
    website: "business.com",
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    const storedProfileData = localStorage.getItem("profileData");
    if (storedProfileData) {
      setProfileForm(JSON.parse(storedProfileData));
    }

       const storedBusinessData = localStorage.getItem("businessData");
       if (storedBusinessData) {
         setbusinessForm(JSON.parse(storedBusinessData));
       }
   
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="dashboard">
      <ToastContainer position="top-right" autoClose={3000} />
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
          padding: 0.5rem 1rem;

          border-radius: 2rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3436;
          background: white;
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
          padding: 20px 25px 20px 20px;
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

        .profile-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .profile-tabs {
          display: flex;
          gap: 40px;
          margin-left: 10rem;
          margin-bottom: 40px;
          // border-bottom: 1px solid #e5e7eb;
        }

        .tab-button {
          background: none;
          border: none;
          padding: 16px 0;
          font-size: 16px;
          font-weight: 500;
          color: #9ca3af;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
          outline: none;
        }

        .tab-button.active {
          color: #4745a4;
          border-bottom-color: #4745a4;
        }

        .tab-button:hover {
          color: #4745a4;
        }

        .profile-content {
          display: flex;
          gap: 40px;
          align-items: flex-start;
        }

        .profile-avatar-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .edit-avatar-btn {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: transparent;

          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          font-size: 14px;
          z-index: 1000;
          padding: 0rem;
        }
        .EditIcon {
          width: 100%;
          z-index: 1000000;
        }
        .profile-form {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .form-input {
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          background: #f9fafb;
          color: #3b82f6;
          outline: none;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          border-color: #3b82f6;
          background: white;
        }

        .form-select {
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          color: #374151;
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 12px center;
          background-repeat: no-repeat;
          background-size: 16px;
          padding-right: 40px;
        }

        .form-select:focus {
          border-color: #3b82f6;
        }

        .form-actions {
          grid-column: 1 / -1;
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          margin-top: 24px;
        }

        .btn {
          padding: 12px 32px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: #4c49a6;
          color: white;
          border: none;
        }

        .btn-primary:hover {
          background: #4c49a6;
        }

        .btn-secondary {
          background: transparent;
          color: #6b7280;
          border: 1px solid #d1d5db;
        }

        .btn-secondary:hover {
          background: #f9fafb;
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

          .profile-form {
            grid-template-columns: 1fr;
          }

          .hamSearch {
            display: flex;
            gap: 1rem;
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

          .profile-tabs {
            gap: 20px;
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

          .main-content {
            width: 100%;
          }

          .profile-form {
            gap: 16px;
          }

          .profile-tabs {
            display: flex;
            gap: 40px;
            margin-left: 0;
            margin-bottom: 40px;
            // border-bottom: 1px solid #e5e7eb;
          }

          .profile-content {
            flex-direction: column;
            padding-left: 1.5rem;
          }
        }

        @media (max-width: 350px) {
          .profile-tabs {
            display: flex;
            gap: 40px;
            margin-left: 0;
            margin-bottom: 40px;
            // border-bottom: 1px solid #e5e7eb;
          }

          .profile-content {
            width: 100%;
            flex-direction: column;
            padding-left: 1.5rem;
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

            <h1 className="page-bar">Profile</h1>
          </div>

          <div className="user-section">
            <div className="notification-icon">
              <img src={notificationIcon} alt="icon" />
            </div>
            <div className="user-avatar">{profAvatar.toUpperCase()}</div>
            <span className="user-name">{profChar}</span>
            <span className="arrow-down">
              <ChevronDown size={16} />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          {/* <div className="page-header">skhaskas</div> */}

          <div className="profile-container">
            {/* Profile Tabs */}
            <div className="profile-tabs">
              <button
                className={`tab-button ${
                  activeTab === "profile" ? "active" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                className={`tab-button ${
                  activeTab === "business" ? "active" : ""
                }`}
                onClick={() => setActiveTab("business")}
              >
                Business info
              </button>
            </div>

            {/* Profile Content */}
            <div className="profile-content">
              {/* Avatar Section */}
              <div className="profile-avatar-section">
                <div
                  style={{ backgroundImage: `url(${profileImage})` }}
                  className="profile-avatar"
                >
                  <div className="edit-avatar-btn">
                    <label htmlFor="profileImageInput">
                      <img className="EditIcon" src={pencilIcon} alt="Edit" />
                    </label>
                    <input
                      type="file"
                      id="profileImageInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setProfileImage(reader.result);
                            localStorage.setItem("profileImage", reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              {activeTab === "profile" ? (
                <div className="profile-form">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                      readOnly={!editMode}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">User Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={profileForm.username}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          username: e.target.value,
                        })
                      }
                      readOnly={!editMode}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-input"
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          email: e.target.value,
                        })
                      }
                      readOnly={!editMode}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    {editMode ? (
                      <input
                        type="date"
                        className="form-input"
                        value={profileForm.dob}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            dob: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-input"
                        value={new Date(profileForm.dob).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                        readOnly
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Permanent Address</label>
                    <input
                      type="text"
                      className="form-input"
                      value={profileForm.address}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          address: e.target.value,
                        })
                      }
                      readOnly={!editMode}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-input"
                      value={profileForm.city}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          city: e.target.value,
                        })
                      }
                      readOnly={!editMode}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Postal Code</label>
                    <input
                      type="text"
                      className="form-input"
                      value={profileForm.postalCode}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          postalCode: e.target.value,
                        })
                      }
                      readOnly={!editMode}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-input"
                      value={profileForm.country}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          country: e.target.value,
                        })
                      }
                      readOnly={!editMode}
                    />
                  </div>

                  <div className="form-actions">
                    {editMode ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          localStorage.setItem(
                            "profileData",
                            JSON.stringify(profileForm)
                          );
                          toast.success("Profile saved");
                          setEditMode(false);
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => setEditMode(true)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="profile-form">
                  <div className="form-group">
                    <label className="form-label">Business Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={businessForm.businessName}
                      onChange={(e) =>
                        setbusinessForm({
                          ...businessForm,
                          businessName: e.target.value,
                        })
                      }
                      readOnly={!bEditMode}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Business Email</label>
                    <input
                      type="text"
                      className="form-input"
                      value={businessForm.businessEmail}
                      onChange={(e) =>
                        setbusinessForm({
                          ...businessForm,
                          businessEmail: e.target.value,
                        })
                      }
                      readOnly={!bEditMode}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Business Phone Number</label>
                    <input
                      type="text"
                      className="form-input"
                      value={businessForm.businessPhone}
                      onChange={(e) =>
                        setbusinessForm({
                          ...businessForm,
                          businessPhone: e.target.value,
                        })
                      }
                      readOnly={!bEditMode}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Business Registration Number
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={businessForm.businessRegNo}
                      onChange={(e) =>
                        setbusinessForm({
                          ...businessForm,
                          businessRegNo: e.target.value,
                        })
                      }
                      readOnly={!bEditMode}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Permanent Address</label>
                    <input
                      type="text"
                      className="form-input"
                      value={businessForm.pAddress}
                      onChange={(e) =>
                        setbusinessForm({
                          ...businessForm,
                          pAddress: e.target.value,
                        })
                      }
                      readOnly={!bEditMode}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-input"
                      value={businessForm.city}
                      onChange={(e) =>
                        setbusinessForm({
                          ...businessForm,
                          city: e.target.value,
                        })
                      }
                      readOnly={!bEditMode}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Postal Code</label>
                    <input
                      type="text"
                      className="form-input"
                      value={businessForm.postalCode}
                      onChange={(e) =>
                        setbusinessForm({
                          ...businessForm,
                          postalCode: e.target.value,
                        })
                      }
                      readOnly={!bEditMode}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-input"
                      value={businessForm.country}
                      onChange={(e) =>
                        setbusinessForm({
                          ...businessForm,
                          country: e.target.value,
                        })
                      }
                      readOnly={!bEditMode}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Tax Identification Number
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={businessForm.tin}
                      onChange={(e) =>
                        setbusinessForm({
                          ...businessForm,
                          tin: e.target.value,
                        })
                      }
                      readOnly={!bEditMode}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Business Website</label>
                    <input
                      type="text"
                      className="form-input"
                      value={businessForm.website}
                      onChange={(e) =>
                        setbusinessForm({
                          ...businessForm,
                          website: e.target.value,
                        })
                      }
                      readOnly={!bEditMode}
                    />
                  </div>

                  <div className="form-actions">
                    {bEditMode ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          localStorage.setItem(
                            "businessData",
                            JSON.stringify(businessForm)
                          );
                          toast.success("Profile saved");
                          setbEditMode(false);
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => setbEditMode(true)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
