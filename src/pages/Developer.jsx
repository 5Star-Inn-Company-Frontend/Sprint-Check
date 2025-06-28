import React, { useState, useEffect, useRef } from "react";
import { Copy, Eye, EyeOff } from "lucide-react";
// import logo from "../assets/dashboardAssets/WhatsApp Image 2025-05-15 at 11.15.05_db0fe0fa 1.png";
// import dashboardIcon from "../assets/dashboardAssets/element-4.png";
// import historyIcon from "../assets/dashboardAssets/Calendar.png";
import notificationIcon from "../assets/dashboardAssets/notification-bing.png";
// import logOutIcon from "../assets/dashboardAssets/login.png";
// import billingIcon from "../assets/dashboardAssets/stash_billing-info.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CopyIcon from "../assets/dashboardAssets/solar_copy-bold.png";
import SideBar from "../components/sideBar";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
export default function Developer() {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showEncryptionKey, setShowEncryptionKey] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const devChar = localStorage.getItem("avatarChar");
  const devAvatar = localStorage.getItem("avatar");

  const IdRef = useRef(null);
  useEffect(() => {
    IdRef.current.focus();
  }, []);

  const [formData, setFormData] = useState({
    clientId: "",
    encryptionKey: "sk_test_12345678901234567890",
    apiKey: "api_key_abcdefghijklmnopqrstuvwxyz",
  });
  const [webHookUrl, setWebHookUrl] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function handleApiDoc() {
    navigate("/apiDoc");
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleRegenerateKeys = () => {
    // Generate new keys
    const newEncryptionKey = `sk_test_${Math.random()
      .toString(36)
      .substring(2, 28)}`;
    const newApiKey = `api_key_${Math.random().toString(36).substring(2, 28)}`;

    setFormData((prev) => ({
      ...prev,
      encryptionKey: newEncryptionKey,
      apiKey: newApiKey,
    }));

    console.log(formData);
  };

  const validatewebHook = (webHookUrl) => {
    const hookRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return hookRegex.test(webHookUrl);
  };

  async function updateWebHook(webHook) {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://sprintcheck.megasprintlimited.com.ng/api/update-webhook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(webHook),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to Update");
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    // if (!validatewebHook()) return;

    setLoading(true);
    try {
      const response = await updateWebHook({ webhook_url: webHookUrl });
      toast.success("Update successful!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      console.log("Saving configuration:");
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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

        // .sidebar {
        //   width: 250px;
        //   background: white;
        //   border-right: 1px solid #e9ecef;
        //   position: fixed;
        //   left: 0;
        //   top: 0;
        //   height: 100vh;
        //   z-index: 1000;
        //   transition: transform 0.3s ease;
        //   overflow-y: auto;
        //   display: flex;
        //   flex-direction: column;
        // }

        // .sidebar.mobile {
        //   transform: translateX(-100%);
        // }

        // .sidebar.mobile.open {
        //   transform: translateX(0);
        // }

        // .sidebar-header {
        //   padding: 20px;
        //   display: flex;
        //   align-items: center;
        //   gap: 10px;
        // }

        .logo {
          font-size: 20px;
          font-weight: bold;
          color: #333;
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
          width: 100%;
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

        .page-bar {
          width: 100%;
          padding: 0.5rem 1rem;

          border-radius: 2rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3436;
          background: white;
        }

        // .search-bar {
        //   flex: 1;
        //   max-width: 600px;
        //   position: relative;
        // }

        // .search-input {
        //   width: 100%;
        //   padding: 15px 16px 15px 40px;
        //   border: none;
        //   border-radius: 2rem;
        //   font-size: 14px;
        //   outline: none;
        // }

        // .search-input::placeholder {
        //   color: #636e72;
        // }

        // .search-icon {
        //   position: absolute;
        //   left: 12px;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   color: #636e72;
        // }

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

        .hamburger {
          display: none;
          background: none;
          //   border: none;
          //   font-size: 24px;
          //   cursor: pointer;
          //   color: #636e72;
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
        .user-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #333;
        }

        .user-name {
          color: #2d3436;
          font-weight: 500;
        }

        .content {
          padding: 32px;

          margin-left: 0px;
          width: 100%;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background: transparent;
        }

        .section {
          background: white;
          border-radius: 12px;
          padding: 32px;
          margin-bottom: 24px;
          max-width: 775px;
          width: 100%;
        }

        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #2d3436;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          color: #374151;
          background: #f8f9fb;
          transition: border-color 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .form-input::placeholder {
          color: #9ca3af;
        }

        .input-actions {
          position: absolute;
          right: 12px;
          display: flex;
          gap: 8px;
        }

        .action-button {
          padding: 4px;
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          border-radius: 4px;
          transition: color 0.2s ease;
        }

        .primary-button {
          background: #6366f1;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .primary-button:hover {
          background: #5856eb;
        }

        .secondary-button {
          background: white;
          color: #6366f1;
          border: 1px solid #6366f1;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-right: 12px;
        }

        .secondary-button:hover {
          background: #f0f0ff;
        }

        .button-group {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 32px;
        }

        .documentation-link {
          color: #6366f1;
          text-decoration: none;
          font-size: 14px;
          margin-top: 16px;
          display: inline-block;
        }

        .documentation-link:hover {
          text-decoration: underline;
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
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #636e72;
          }

          .user-name {
            display: none;
          }
          .hamSearch {
            display: flex;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .content {
            padding: 20px;
          }

          .section {
            padding: 20px;
          }

          .top-bar {
            padding: 16px 20px;
          }

          .button-group {
            flex-direction: column;
          }

          .secondary-button {
            margin-right: 0;
            margin-bottom: 12px;
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

          .notification-icon {
            display: none;
          }
          .user-section {
            background-color: transparent;
          }
          .arrow-down {
            display: none;
          }

          .main-content {
            width: 100%;
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

            {/* <div className="search-bar">
              <div className="search-icon">
                <img src={searchIcon} alt="icon" />
              </div>
              <input
                type="text"
                className="search-input"
                placeholder="Search here ..."
              />
            </div> */}
            <h1 className="page-bar">Billing</h1>
          </div>

          <div className="user-section">
            <div className="notification-icon">
              <img src={notificationIcon} alt="icon" />
            </div>
            <div className="user-avatar">{devAvatar.toUpperCase()}</div>
            <span className="user-name">{devChar}</span>
            <span className="arrow-down">
              <ChevronDown size={16} />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <ToastContainer position="bottom-right" autoClose={3000} />
          {/* API Section */}
          <div className="section">
            <h2 className="section-title">API</h2>

            <div className="form-group">
              <label className="form-label">Client ID</label>
              <div className="input-container">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Client ID"
                  value={formData.clientId}
                  onChange={(e) =>
                    handleInputChange("clientId", e.target.value)
                  }
                  ref={IdRef}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Encryption Key</label>
              <div className="input-container">
                <input
                  type={showEncryptionKey ? "text" : "password"}
                  className="form-input"
                  placeholder="Secret Key"
                  value={formData.encryptionKey}
                  onChange={(e) =>
                    handleInputChange("encryptionKey", e.target.value)
                  }
                />
                <div className="input-actions">
                  <button
                    className="action-button"
                    onClick={() => setShowEncryptionKey(!showEncryptionKey)}
                  >
                    {showEncryptionKey ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">API Key</label>
              <div className="input-container">
                <input
                  type={showApiKey ? "text" : "password"}
                  className="form-input"
                  placeholder="API Key"
                  value={formData.apiKey}
                  onChange={(e) => handleInputChange("apiKey", e.target.value)}
                />
                <div className="input-actions">
                  <button
                    className="action-button"
                    onClick={() => copyToClipboard(formData.apiKey)}
                  >
                    <img src={CopyIcon} alt="copy" />
                  </button>
                  <button
                    className="action-button"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="button-group">
              <button className="primary-button" onClick={handleRegenerateKeys}>
                Regenerate Keys
              </button>
            </div>
          </div>

          {/* Webhook Section */}
          <div className="section">
            <h2 className="section-title">Webhook</h2>

            <div className="form-group">
              <label className="form-label">Webhook URL</label>
              <div className="input-container">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Webhook URL"
                  value={webHookUrl}
                  onChange={(e) => setWebHookUrl(e.target.value)}
                />
                <div className="input-actions">
                  <button
                    className="action-button"
                    onClick={() => copyToClipboard(webHookUrl)}
                  >
                    <img src={CopyIcon} alt="copy" />
                  </button>
                </div>
              </div>
            </div>

            <div className="button-group">
              <button
                type="submit"
                className="primary-button"
                onClick={(e) => handleSave(e)}
              >
                Save
              </button>
            </div>

            <a
              onClick={() => handleApiDoc()}
              href="#"
              className="documentation-link"
            >
              Visit Documentation Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
