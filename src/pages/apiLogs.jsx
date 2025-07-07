import React, { useState, useEffect } from "react";
// import logo from "../assets/dashboardAssets/WhatsApp Image 2025-05-15 at 11.15.05_db0fe0fa 1.png";
import { Eye, RotateCcw, Filter, FileDown, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import notificationIcon from "../assets/dashboardAssets/notification-bing.png";

import eyeIcon from "../assets/dashboardAssets/hugeicons_view.png";
import SideBar from "../components/sideBar";
import returnIcon from "../assets/dashboardAssets/icon-park_return.png";
import searchIcon from "../assets/dashboardAssets/search-normal.png";
import empty from "../assets/Empty.gif";

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLogs, setFilteredLogs] = useState([]);
  const apiChar = localStorage.getItem("avatarChar");
  const apiAvatar = localStorage.getItem("avatar");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterStatus, setFilterStatus] = useState(""); // SUCCESSFUL / FAILED
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);

  const [filterMinAmount, setFilterMinAmount] = useState("");
  const [filterMaxAmount, setFilterMaxAmount] = useState("");

  const handleViewClick = (log) => {
    if (log.userDetails) {
      setSelectedLog(log);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLog(null);
  };

  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={index}
          style={{ backgroundColor: "skyblue", padding: "0 2px" }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const [apiLogs, setApiLogs] = useState([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("apiLogsData")) || [];
    setApiLogs(storedLogs);
  }, []);

  useEffect(() => {
    if (!apiLogs) return;

    const filtered = apiLogs.filter((log) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        log.endpoint?.toLowerCase().includes(query) ||
        log.name?.toLowerCase().includes(query) ||
        log.status?.toLowerCase().includes(query) ||
        log.performedBy?.toLowerCase().includes(query) ||
        log.date?.toLowerCase().includes(query) ||
        log.amount?.toString().includes(query);

      const matchesStatus = filterStatus ? log.status === filterStatus : true;

      const matchesStartDate = filterStartDate
        ? new Date(log.date) >= new Date(filterStartDate)
        : true;

      const matchesEndDate = filterEndDate
        ? new Date(log.date) <= new Date(filterEndDate)
        : true;

      const matchesMinAmount = filterMinAmount
        ? parseFloat(log.amount) >= parseFloat(filterMinAmount)
        : true;

      const matchesMaxAmount = filterMaxAmount
        ? parseFloat(log.amount) <= parseFloat(filterMaxAmount)
        : true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesStartDate &&
        matchesEndDate &&
        matchesMinAmount &&
        matchesMaxAmount
      );
    });

    setFilteredLogs(filtered);

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [
    searchQuery,
    apiLogs,
    filterEndDate,
    filterMaxAmount,
    filterMinAmount,
    filterStartDate,
    filterStatus,
  ]);

  const exportToCSV = () => {
    if (!filteredLogs || filteredLogs.length === 0) {
      alert("No data to export.");
      return;
    }

    const headers = [
      "Name",
      "Endpoint",
      "Amount",
      "Source",
      "Performed By",
      "Status",
      "Date",
    ];

    const rows = filteredLogs.map((log) => [
      log.name,
      log.endpoint,
      log.amount,
      log.source,
      log.performedBy,
      log.status,
      log.date,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "api_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          padding: 20px 25px 2px 20px;
          margin: 26px;
          background-color: white;
          border-radius: 1rem;
          min-height: calc(100vh - 120px);
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 600;
          color: #2d3436;
        }

        .header-actions {
          display: flex;
          gap: 16px;
        }

        .filter-btn,
        .export-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn {
          background: white;
          border: 1px solid #e5e7eb;
          color: #374151;
        }

        .filter-btn:hover {
          background: #f9fafb;
        }

        .filterOptions {
          margin-top: 1rem;
          background: #f8fafc;
          padding: 1rem;
          border-radius: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          max-width: 300px;
          font-size: 0.8rem;
        }

        .filterOptions select {
          width: 50%;
          margin-left: 1rem;
          border: none;
          outline: none;
          padding: 0.5rem;
          border-radius: 1rem;
        }

        .filterOptions input {
          border: 1px solid lightgrey;
          border-radius: 5px;
          width: 50%;
          margin-left: 1rem;
          padding: 0.5rem;
          outline: none;
        }

        .filterOptions .custom-date {
          width: 37%;
        }

        .export-btn {
          background: #4f46e5;
          border: 1px solid #4f46e5;
          color: white;
        }

        .export-btn:hover {
          background: #4338ca;
        }

        .search-section {
          margin-bottom: 0px;
        }

        .logs-search {
          position: relative;
          max-width: 500px;
        }

        .logs-search-input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }

        .logs-search-input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .logs-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          width: 16px;
          height: 16px;
        }

        .table-container {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          background: white;
        }

        .table-container img {
          position: relative;
          top: 50%;

          right: -27%;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table-header {
          background: #f9fafb;
        }

        .table-header th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
        }

        .table-row {
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s ease;
        }

        .table-row:hover {
          background: #f9fafb;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .table-cell {
          padding: 16px;
          font-size: 14px;
          color: #374151;
          vertical-align: middle;
        }

        tbody .date {
          font-size: 12px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
        }

        .status-success {
          background: #dcfce7;
          color: #166534;
        }

        .status-failed {
          background: #fee2e2;
          color: #dc2626;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          flex-direction: column;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 50px;

          border: none;
          background: transparent;
          color: black;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          color: blue;
          outline: none;
          background: transparent;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
          padding: 20px;
        }

        .pagination-btn {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 6px;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
        }

        .pagination-btn:hover {
          background: #f3f4f6;
        }

        .pagination-btn.active {
          background: #4f46e5;
          color: white;
          border-color: #4f46e5;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .modal {
          background: #d5d5d5;
          border-radius: 16px;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .modal-header {
          padding: 24px 24px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #f3f4f6;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-close:hover {
          background: #e5e7eb;
        }

        .modal-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 16px;
        }

        .modal-content {
          padding: 3rem;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .modal-grid {
          display: flex;
          gap: 20rem;
          margin-bottom: 32px;
        }
        .modalFlex {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .flex2 {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .modal-label {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        .modal-value {
          font-size: 16px;
          color: #1f2937;
          font-weight: 600;
        }

        .close-button {
          width: 100%;
          padding: 12px 24px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          background: #4338ca;
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

          .hamSearch {
            display: flex;
            gap: 2rem;
          }

          .search-bar {
            max-width: 200px;
          }

          .user-name {
            display: none;
          }

          .header-actions {
            gap: 8px;
          }

          .filter-btn,
          .export-btn {
            padding: 8px 12px;
            font-size: 12px;
          }

          .table-container {
            overflow-x: auto;
          }

          .table {
            min-width: 800px;
          }
          .main-content {
            max-width: 790px;
          }
          .modal-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .content {
            padding: 16px;
            margin: 16px;
          }
          .main-content {
            max-width: 390px;
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
            max-width: 390px;
          }
          .modal {
            margin: 10px;
            max-height: 80vh;
          }

          .modal-content {
            padding: 20px;
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

          .main-content {
            width: 100%;
          }

          .table-cell {
            padding: 12px 8px;
            font-size: 12px;
          }

          .action-buttons {
            flex-direction: column;
          }

          .action-buttons .eye img {
            max-width: 18px;
          }

          .modal {
            margin: 5px;
            border-radius: 12px;
          }

          .modal-header {
            padding: 20px 20px 0;
          }

          .modal-avatar {
            width: 60px;
            height: 60px;
          }

          .modal-grid {
            display: flex;
            gap: 1rem;

            margin-bottom: 32px;
            flex-direction: column;
          }

          .table-container img {
            width: 50%;
          }
        }
      `}</style>

      {/* Overlay for mobile */}
      <div
        className={`overlay ${isMobile && sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Modal */}
      {modalOpen && selectedLog && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              {/* <button className="modal-close" onClick={() => closeModal()}>
                X
              </button> */}
              <img
                src={`data:image/png;base64,${selectedLog.userDetails.base64Image}`}
                alt="User Avatar"
                className="modal-avatar"
              />
            </div>
            <div className="modal-content">
              <div className="modal-grid">
                <div className="modalFlex">
                  {" "}
                  <div className="modal-field">
                    <span className="modal-label">BVN</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.bvn}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">First Name</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.firstName}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Last Name</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.lastName}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Middle Name</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.middleName}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Date Of Birth</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.dateOfBirth}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Gender</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.gender}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Phone number</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.phoneNumber1}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Lga Of Origin</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.lgaOfOrigin}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Lga Of Residence</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.lgaOfResidence}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Marital Status</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.maritalStatus}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Nationality</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.nationality}
                    </div>
                  </div>
                </div>

                <div className="flex2">
                  <div className="modal-field">
                    <span className="modal-label">Residential Address</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.residentialAddress}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">State Of Origin</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.stateOfOrigin}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">State Of Residence</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.stateOfResidence}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Enrollment Bank</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.enrollmentBank}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Enrollment Branch</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.enrollmentBranch}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Name On Card</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.nameOnCard}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">NIN</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.nin}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Level Of Account</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.levelOfAccount}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Watchlisted</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.watchListed}
                    </div>
                  </div>
                  <div className="modal-field">
                    <span className="modal-label">Number</span>
                    <div className="modal-value">
                      {selectedLog.userDetails.number}
                    </div>
                  </div>
                </div>
              </div>
              <button className="close-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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

            <h1 className="page-bar">API Logs</h1>
          </div>

          <div className="user-section">
            <div className="notification-icon">
              <img src={notificationIcon} alt="icon" />
            </div>
            <div className="user-avatar">{apiAvatar.toUpperCase()}</div>
            <span className="user-name">{apiChar}</span>
            <span className="arrow-down">
              <ChevronDown size={16} />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <div className="page-header">
            {showFilterOptions && (
              <div className="filterOptions">
                <div>
                  <label>Status :</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="SUCCESSFUL">SUCCESSFUL</option>
                    <option value="FAILED">FAILED</option>
                  </select>
                </div>

                <div>
                  <label>Start Date :</label>
                  <DatePicker
                    selected={filterStartDate}
                    onChange={(date) => setFilterStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="start date"
                    className="custom-date"
                    maxDate={new Date()}
                  />
                </div>

                <div>
                  <label>End Date :</label>
                  <DatePicker
                    selected={filterEndDate}
                    onChange={(date) => setFilterEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="end date"
                    className="custom-date"
                    maxDate={new Date()}
                  />
                </div>

                <div>
                  <label>Min Amount :</label>
                  <input
                    type="number"
                    value={filterMinAmount}
                    onChange={(e) => setFilterMinAmount(e.target.value)}
                  />
                </div>

                <div>
                  <label>Max Amount :</label>
                  <input
                    type="number"
                    value={filterMaxAmount}
                    onChange={(e) => setFilterMaxAmount(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="search-section">
              <div className="logs-search">
                <div className="logs-search-icon">
                  <img src={searchIcon} alt="icon" />
                </div>
                <input
                  type="text"
                  className="logs-search-input"
                  placeholder="Search by endpoint, name, status, or performer"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="header-actions">
              <button
                className="filter-btn"
                onClick={() => {
                  if (showFilterOptions) {
                    // Reset filters if closing
                    setFilterStatus("");
                    setFilterStartDate("");
                    setFilterEndDate("");
                    setFilterMinAmount("");
                    setFilterMaxAmount("");
                  }
                  setShowFilterOptions((prev) => !prev);
                }}
              >
                <Filter size={16} />
                {showFilterOptions ? "Clear Filter" : "Filter"}
              </button>

              <button onClick={exportToCSV} className="export-btn">
                <FileDown size={16} />
                Export
              </button>
            </div>
          </div>

          <div className="table-container">
            {filteredLogs.length > 0 ? (
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th>Endpoint</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Source</th>
                    <th>Performed By</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="table-row">
                      <td className="table-cell">
                        {highlightText(log.endpoint, searchQuery)}
                      </td>
                      <td className="table-cell">
                        {highlightText(log.name, searchQuery)}
                      </td>
                      <td className="table-cell">
                        {highlightText(log.amount.toString(), searchQuery)}
                      </td>
                      <td className="table-cell">
                        {highlightText(log.source, searchQuery)}
                      </td>
                      <td className="table-cell">
                        {highlightText(log.performedBy, searchQuery)}
                      </td>
                      <td className="table-cell date">
                        {highlightText(log.date, searchQuery)}
                      </td>

                      <td className="table-cell">
                        <span
                          className={`status-badge ${
                            log.status === "SUCCESSFUL"
                              ? "status-success"
                              : "status-failed"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="action-buttons">
                          <span
                            onClick={() => handleViewClick(log)}
                            className="action-btn eye"
                          >
                            <img src={eyeIcon} alt="icon" />
                            <span>View</span>
                          </span>
                          <span className="action-btn">
                            <img src={returnIcon} alt="icon" />
                            <span>Resend to webhook</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <img src={empty} alt="emptyGif" />
            )}
          </div>

          <div className="pagination">
            <button className="pagination-btn" disabled>
              Prev
            </button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <span style={{ margin: "0 8px", color: "#9ca3af" }}>...</span>
            <button className="pagination-btn">10</button>
            <button className="pagination-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
