import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
  X,
  ChevronLeft, // For calendar navigation
  ChevronRight, // For calendar navigation
} from "lucide-react";
import notificationIcon from "../assets/dashboardAssets/notification-bing.png";
import SideBar from "../components/sideBar";
import empty from "../assets/Empty.gif";

// Basic Calendar Component (You might replace this with a library)
const CalendarPicker = ({
  selectedStartDate,
  selectedEndDate,
  onDateSelect,
  onClose,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDays = lastDayOfMonth.getDate();

    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null); // Placeholder for days before the 1st of the month
    }
    for (let i = 1; i <= numDays; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isInRange = (date, start, end) => {
    if (!start || !end) return false;
    return date >= start && date <= end;
  };

  const handleDayClick = (day) => {
    if (!day) return;
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      onDateSelect(day, null); // Start new selection
    } else if (day < selectedStartDate) {
      onDateSelect(day, selectedStartDate); // Swap if end date is before start
    } else {
      onDateSelect(selectedStartDate, day); // Complete the range
    }
  };

  const handleOkClick = () => {
    onClose();
  };

  return (
    <div className="calendar-dropdown">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>
          <ChevronLeft size={16} />
        </button>
        <span>
          {currentMonth.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={handleNextMonth}>
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="calendar-weekdays">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="calendar-days">
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${
              isSameDay(day, selectedStartDate) ? "selected-start" : ""
            } ${isSameDay(day, selectedEndDate) ? "selected-end" : ""} ${
              isInRange(day, selectedStartDate, selectedEndDate) &&
              !isSameDay(day, selectedStartDate) &&
              !isSameDay(day, selectedEndDate)
                ? "in-range"
                : ""
            } ${!day ? "empty" : ""}`}
            onClick={() => handleDayClick(day)}
          >
            {day ? day.getDate() : ""}
          </div>
        ))}
      </div>
      <div className="calendar-footer">
        <button className="calendar-ok-btn" onClick={handleOkClick}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default function Billing() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const billingChar = localStorage.getItem("avatarChar");
  const billingAvatar = localStorage.getItem("avatar");

  // State for filter visibility
  const [showFilter, setShowFilter] = useState(false);

  // State for calendar visibility
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // State for filter criteria
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDescription, setFilterDescription] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterTransactionId, setFilterTransactionId] = useState("");
  const [filterAmount, setFilterAmount] = useState("");

  function transformBillingData(data) {
    return data.map((item) => {
      const createdAt = new Date(item.created_at);
      const dateString = createdAt.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return {
        id: item.id,
        description: item.description.replace(/_/g, " "), // Format e.g. BVN_VERIFICATION
        transactionId: `#${item.reference.slice(0, 8)}`,
        type: item.description.includes("FUND") ? "Transfer" : "API",
        date: dateString,
        timestamp: createdAt.getTime(), // Add timestamp for easier date comparison
        amount: parseFloat(item.amount),
        direction: item.type.toLowerCase(),
        icon: item.type.toLowerCase() === "credit" ? "up" : "down",
      };
    });
  }
const rawBillingData = useMemo(() => {
  return JSON.parse(localStorage.getItem("billingData")).data;
}, []);

const billingData = useMemo(
  () => transformBillingData(rawBillingData),
  [rawBillingData]
);


  // State for filtered data
  const [filteredBillingData, setFilteredBillingData] = useState(billingData);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    // Apply filters whenever filter criteria or original billing data changes
    applyFilters();
  }, [
    filterStatus,
    filterDescription,
    filterType,
    filterTransactionId,
    filterAmount,
    startDate, // Include startDate in dependency array
    endDate, // Include endDate in dependency array
    billingData,
  ]);

  const applyFilters = () => {
    let tempFilteredData = billingData;

    // Filter by Status (direction)
    if (filterStatus !== "All") {
      tempFilteredData = tempFilteredData.filter(
        (transaction) => transaction.direction === filterStatus.toLowerCase()
      );
    }

    // Filter by Description
    if (filterDescription) {
      tempFilteredData = tempFilteredData.filter((transaction) =>
        transaction.description
          .toLowerCase()
          .includes(filterDescription.toLowerCase())
      );
    }

    // Filter by Type
    if (filterType !== "All") {
      tempFilteredData = tempFilteredData.filter(
        (transaction) =>
          transaction.type.toLowerCase() === filterType.toLowerCase()
      );
    }

    // Filter by Transaction ID
    if (filterTransactionId) {
      tempFilteredData = tempFilteredData.filter((transaction) =>
        transaction.transactionId
          .toLowerCase()
          .includes(filterTransactionId.toLowerCase())
      );
    }

    // Filter by Amount
    if (filterAmount) {
      tempFilteredData = tempFilteredData.filter(
        (transaction) => transaction.amount === parseFloat(filterAmount)
      );
    }

    // Filter by Date Range
    if (startDate && endDate) {
      // Normalize dates to start/end of day for accurate range comparison
      const startOfDay = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      ).getTime();
      const endOfDay = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        23,
        59,
        59,
        999
      ).getTime();

      tempFilteredData = tempFilteredData.filter(
        (transaction) =>
          transaction.timestamp >= startOfDay &&
          transaction.timestamp <= endOfDay
      );
    } else if (startDate && !endDate) {
      // If only start date is selected, filter for that day
      const startOfDay = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      ).getTime();
      const endOfDay = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        23,
        59,
        59,
        999
      ).getTime();
      tempFilteredData = tempFilteredData.filter(
        (transaction) =>
          transaction.timestamp >= startOfDay &&
          transaction.timestamp <= endOfDay
      );
    }

    setFilteredBillingData(tempFilteredData);
  };

  const clearFilters = () => {
    setFilterStatus("All");
    setFilterDescription("");
    setFilterType("All");
    setFilterTransactionId("");
    setFilterAmount("");
    setStartDate(null); // Clear date filters
    setEndDate(null); // Clear date filters
    setFilteredBillingData(billingData); // Reset to original data
    setShowFilter(false); // Close the filter
    setShowCalendar(false); // Close the calendar
  };

  const handleDateSelect = (start, end) => {
    setStartDate(start);
    setEndDate(end);
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
          position: relative; /* Added for filter positioning */
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
          padding: 0.6rem 1.2rem;

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
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 32px;
          position: relative; /* Added for filter dropdown positioning */
        }

        .page-title {
          font-size: 28px;
          font-weight: 600;
          color: #2d3436;
        }

        .header-controls {
          display: flex;
          align-items: flex-end;
          gap: 16px;
        }

        .period-selector {
          display: flex;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 4px;
        }

        .period-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .period-btn.active {
          background: white;
          color: #374151;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .select-period-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          color: #6b7280;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative; /* For calendar positioning */
        }

        .select-period-btn:hover {
          border-color: #d1d5db;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          color: #6b7280;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          border-color: #d1d5db;
        }

        /* Filter Dropdown Styles */
        .filter-dropdown {
          position: absolute;
          top: 100%; /* Position below the filter button */
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 20px;
          width: 500px; /* Adjust width as needed */
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .filter-body {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 15px;
        }
        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 15px;
          border-bottom: 1px solid #f3f4f6;
        }

        .filter-header h4 {
          font-size: 16px;
          font-weight: 600;
          color: #2d3436;
        }

        .filter-header .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filter-group label {
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
        }

        .filter-group select,
        .filter-group input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          color: #374151;
          outline: none;
        }

        .filter-group select:focus,
        .filter-group input:focus {
          border-color: #d1d5db;
        }

        .filter-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          padding-top: 15px;
          border-top: 1px solid #f3f4f6;
        }

        .filter-actions button {
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-actions .clear-btn {
          background: brown;
          border: 1px solid #e5e7eb;
          color: white;
        }

        .filter-actions .clear-btn:hover {
          background: brown;
        }

        .filter-actions .apply-btn {
          background: #d97706; /* Adjusted to original brown, user prefers this */
          color: white;
          border: 1px solid #d97706;
        }

        .filter-actions .apply-btn:hover {
          background: #b46105; /* Darker shade for hover */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        /* Calendar Dropdown Styles */
        .calendar-dropdown {
          position: absolute;
          top: 100%; /* Position below the select period button */
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 15px;
          width: 320px; /* Adjust width as needed */
          z-index: 11; /* Higher than filter dropdown */
          display: flex;
          flex-direction: column;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          font-weight: 600;
          color: #2d3436;
        }

        .calendar-header button {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 5px;
          border-radius: 4px;
          transition: background 0.2s ease;
        }

        .calendar-header button:hover {
          background: #f3f4f6;
        }

        .calendar-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
          margin-bottom: 8px;
        }

        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }

        .calendar-day {
          padding: 8px;
          text-align: center;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.2s ease, color 0.2s ease;
          font-size: 14px;
          color: #374151;
        }

        .calendar-day.empty {
          visibility: hidden;
        }

        .calendar-day:hover {
          background-color: #f3f4f6;
        }

        .calendar-day.selected-start,
        .calendar-day.selected-end {
          background-color: #d97706; /* Primary color */
          color: white;
        }

        .calendar-day.in-range {
          background-color: rgba(
            217,
            119,
            6,
            0.1
          ); /* Lighter shade for range */
          color: #d97706;
        }
        .calendar-day.selected-start:hover,
        .calendar-day.selected-end:hover {
          background-color: #b46105; /* Darker primary for hover */
        }

        .calendar-footer {
          margin-top: 15px;
          display: flex;
          justify-content: flex-end;
        }

        .calendar-footer .calendar-ok-btn {
          background-color: #d97706;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .calendar-footer .calendar-ok-btn:hover {
          background-color: #b46105;
        }

        .table-container {
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
          padding: 16px 20px;
          text-align: left;
          font-weight: 500;
          color: #9ca3af;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
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
          padding: 20px;
          font-size: 14px;
          color: #374151;
          vertical-align: middle;
        }

        .description-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .transaction-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .icon-up {
          background: #dcfce7;
          color: #16a34a;
        }

        .icon-down {
          background: #dbeafe;
          color: #2563eb;
        }

        .transaction-id {
          color: #6b7280;
          font-size: 13px;
        }

        .amount-credit {
          color: #16a34a;
          font-weight: 600;
        }

        .amount-debit {
          color: #dc2626;
          font-weight: 600;
        }

        .date-text {
          color: #6b7280;
          font-size: 13px;
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

          .hamSearch {
            display: flex;
            gap: 1rem;
          }

          .user-name {
            display: none;
          }

          .header-controls {
            gap: 8px;
          }

          .period-selector {
            display: none;
          }

          .table-container {
            overflow-x: auto;
          }

          .table {
            min-width: 700px;
          }

          /* Adjust calendar dropdown for smaller screens */
          .calendar-dropdown {
            width: calc(100% - 32px);
            left: 16px;
            right: 16px;
          }

          /* Adjust filter dropdown for smaller screens */
          .filter-dropdown {
            width: 300px;
          }

          .filter-body {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
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

          .table-cell {
            padding: 12px 8px;
            font-size: 12px;
          }

          .description-cell {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          .main-content {
            width: 100%;
          }

          .table-container img {
            width: 70%;
            left: 17%;
            margin-top: 3rem;
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

            <h1 className="page-bar">Billing</h1>
          </div>

          <div className="user-section">
            <div className="notification-icon">
              <img src={notificationIcon} alt="icon" />
            </div>
            <div className="user-avatar">{billingAvatar?.toUpperCase()}</div>
            <span className="user-name">{billingChar}</span>
            <span className="arrow-down">
              <ChevronDown size={16} />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <div className="page-header">
            <div className="header-controls">
              <button
                className="select-period-btn"
                onClick={() => {
                  setShowCalendar(!showCalendar);
                  setShowFilter(false);
                }}
              >
                <Calendar size={16} />
                {startDate && endDate
                  ? `${startDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })} - ${endDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}`
                  : "Select period"}
              </button>
              <button
                className="filter-btn"
                onClick={() => {
                  setShowFilter(!showFilter);
                  setShowCalendar(false);
                }}
              >
                <Filter size={16} />
                Filter
              </button>
            </div>

            {/* Calendar Dropdown */}
            {showCalendar && (
              <CalendarPicker
                selectedStartDate={startDate}
                selectedEndDate={endDate}
                onDateSelect={handleDateSelect}
                onClose={() => setShowCalendar(false)}
              />
            )}

            {/* Filter Dropdown */}
            {showFilter && (
              <div className="filter-dropdown">
                <div className="filter-header">
                  <h4>Filter</h4>
                  <button
                    className="close-btn"
                    onClick={() => setShowFilter(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="filter-body">
                  <div className="filter-group">
                    <label htmlFor="status">STATUS</label>
                    <select
                      id="status"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Credit">Credit</option>
                      <option value="Debit">Debit</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label htmlFor="description">DESCRIPTION</label>
                    <input
                      type="text"
                      id="description"
                      placeholder="All"
                      value={filterDescription}
                      onChange={(e) => setFilterDescription(e.target.value)}
                    />
                  </div>

                  <div className="filter-group">
                    <label htmlFor="type">TYPE</label>
                    <select
                      id="type"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Transfer">Transfer</option>
                      <option value="API">API</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label htmlFor="transactionId">TRANSACTION ID</label>
                    <input
                      type="text"
                      id="transactionId"
                      placeholder=""
                      value={filterTransactionId}
                      onChange={(e) => setFilterTransactionId(e.target.value)}
                    />
                  </div>

                  <div className="filter-group">
                    <label htmlFor="amount">AMOUNT</label>
                    <input
                      type="number"
                      id="amount"
                      value={filterAmount}
                      onChange={(e) => setFilterAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="filter-actions">
                  <button className="clear-btn" onClick={clearFilters}>
                    Clear All
                  </button>
                  <button
                    className="apply-btn"
                    onClick={() => {
                      applyFilters();
                      setShowFilter(false);
                    }}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="table-container">
            {filteredBillingData && filteredBillingData.length > 0 ? (
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th>Description</th>
                    <th>Transaction ID</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBillingData.map((transaction) => (
                    <tr key={transaction.id} className="table-row">
                      <td className="table-cell">
                        <div className="description-cell">
                          <div
                            className={`transaction-icon ${
                              transaction.icon === "up"
                                ? "icon-up"
                                : "icon-down"
                            }`}
                          >
                            {transaction.icon === "up" ? (
                              <ArrowUp size={16} />
                            ) : (
                              <ArrowDown size={16} />
                            )}
                          </div>
                          <span>{transaction.description}</span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className="transaction-id">
                          {transaction.transactionId}
                        </span>
                      </td>
                      <td className="table-cell">{transaction.type}</td>
                      <td className="table-cell">
                        <span className="date-text">{transaction.date}</span>
                      </td>
                      <td className="table-cell">
                        <span
                          className={
                            transaction.direction === "credit"
                              ? "amount-credit"
                              : "amount-debit"
                          }
                        >
                          {transaction.direction === "credit" ? "+" : "-"}₦
                          {transaction.amount}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <img src={empty} alt="emptyGif" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
