import React, { useState } from "react";
import { ChevronDown, ChevronRight, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ApiDocumentation() {
  const [activeSection, setActiveSection] = useState("get-started");
  const [openSections, setOpenSections] = useState({
    "get-started": true,
    guide: false,
    "core-resources": false,
  });
  const [activeTab, setActiveTab] = useState("curl");

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
      const navigate = useNavigate();

  const codeSnippets = {
    curl: `curl -G https://api.protocol.chat/v1/conversations \\
  -H "Authorization: Bearer {token}" \\
  -d limit=10`,
    javascript: `const response = await fetch('https://api.protocol.chat/v1/conversations', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer {token}'
  },
  params: {
    limit: 10
  }
});`,
    python: `import requests

response = requests.get(
  'https://api.protocol.chat/v1/conversations',
  headers={'Authorization': 'Bearer {token}'},
  params={'limit': 10}
)`,
    php: `<?php
$response = Http::withHeaders([
    'Authorization' => 'Bearer {token}',
])->get('https://api.protocol.chat/v1/conversations', [
    'limit' => 10,
]);`,
    ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.protocol.chat/v1/conversations')
uri.query = URI.encode_www_form(limit: 10)
req = Net::HTTP::Get.new(uri)
req['Authorization'] = 'Bearer {token}'`,
  };

  return (
    <div className="api-doc-container">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .api-doc-container {
          display: flex;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
          background-color: #ffffff;
        }

        .sidebar {
          width: 280px;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          padding: 24px 0;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .sidebar-header {
          padding: 0 24px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .logo {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .sidebar-nav {
          padding-top: 24px;
        }

        .nav-section {
          margin-bottom: 24px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 24px;
          cursor: pointer;
          color: #374151;
          font-weight: 500;
          font-size: 14px;
          transition: color 0.2s;
        }

        .section-header:hover {
          color: #111827;
        }

        .section-content {
          display: none;
          padding-left: 24px;
        }

        .section-content.open {
          display: block;
        }

        .nav-item {
          display: block;
          padding: 6px 24px 6px 40px;
          color: #6b7280;
          text-decoration: none;
          font-size: 14px;
          cursor: pointer;
          transition: color 0.2s;
          border-left: 2px solid transparent;
        }

        .nav-item:hover {
          color: #374151;
        }

        .nav-item.active {
          color: #3b82f6;
          border-left-color: #3b82f6;
          background-color: #f8fafc;
        }

        .main-content {
          flex: 1;
          margin-left: 280px;
          background: #ffffff;
        }

        .header {
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .search-container {
          flex: 1;
          max-width: 400px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background: #f9fafb;
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .header-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .header-link {
          color: #374151;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }

        .header-link:hover {
          color: #111827;
        }

        .content {
          padding: 32px;
          max-width: 800px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 16px;
        }

        .page-description {
          color: #6b7280;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .section {
          margin-bottom: 48px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 16px;
        }

        .section-description {
          color: #6b7280;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .cards-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          background: #ffffff;
          transition: border-color 0.2s;
        }

        .card:hover {
          border-color: #d1d5db;
        }

        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 8px;
        }

        .card-description {
          color: #6b7280;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .card-link {
          color: #3b82f6;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-bottom: 1px solid transparent;
        }

        .card-link:hover {
          border-bottom-color: #3b82f6;
        }

        .client-section {
          margin-top: 48px;
        }

        .client-steps {
          background: #f9fafb;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .client-steps h4 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 16px;
        }

        .client-steps ol {
          color: #374151;
          line-height: 1.6;
          padding-left: 20px;
        }

        .client-steps li {
          margin-bottom: 8px;
        }

        .code-container {
          background: #1f2937;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 32px;
        }

        .code-tabs {
          display: flex;
          background: #374151;
          border-bottom: 1px solid #4b5563;
        }

        .code-tab {
          padding: 12px 16px;
          background: none;
          border: none;
          color: #d1d5db;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .code-tab.active {
          background: #1f2937;
          color: #ffffff;
        }

        .code-tab:hover {
          color: #ffffff;
        }

        .code-content {
          position: relative;
          padding: 20px;
        }

        .code-block {
          color: #e5e7eb;
          font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
          font-size: 13px;
          line-height: 1.5;
          white-space: pre;
          overflow-x: auto;
        }

        .copy-button {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #374151;
          border: none;
          color: #d1d5db;
          padding: 6px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .copy-button:hover {
          background: #4b5563;
          color: #ffffff;
        }

        .libraries-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }

        .library-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          background: #ffffff;
          transition: all 0.2s;
        }

        .library-card:hover {
          border-color: #d1d5db;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .library-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .library-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #ffffff;
        }

        .library-icon.ruby {
          background: #cc342d;
        }
        .library-icon.php {
          background: #777bb4;
        }
        .library-icon.nodejs {
          background: #339933;
        }
        .library-icon.python {
          background: #3776ab;
        }
        .library-icon.go {
          background: #00add8;
        }

        .library-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .library-description {
          color: #6b7280;
          font-size: 14px;
          line-height: 1.5;
        }

        .footer {
          text-align: center;
          padding: 24px;
          color: #6b7280;
          font-size: 14px;
          border-top: 1px solid #e5e7eb;
          margin-top: 48px;
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }

          .main-content {
            margin-left: 0;
          }

          .cards-container {
            grid-template-columns: 1fr;
          }

          .content {
            padding: 20px;
          }

          .libraries-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">API-DOC</div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div
              className="section-header"
              onClick={() => toggleSection("get-started")}
            >
              Get Started
              {openSections["get-started"] ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
            <div
              className={`section-content ${
                openSections["get-started"] ? "open" : ""
              }`}
            >
              <div
                className={`nav-item ${
                  activeSection === "introduction" ? "active" : ""
                }`}
                onClick={() => setActiveSection("introduction")}
              >
                Introduction
              </div>
              <div
                className={`nav-item ${
                  activeSection === "quick-start" ? "active" : ""
                }`}
                onClick={() => setActiveSection("quick-start")}
              >
                Quick Start
              </div>
              <div
                className={`nav-item ${
                  activeSection === "client" ? "active" : ""
                }`}
                onClick={() => setActiveSection("client")}
              >
                Client
              </div>
              <div
                className={`nav-item ${
                  activeSection === "libraries" ? "active" : ""
                }`}
                onClick={() => setActiveSection("libraries")}
              >
                Libraries
              </div>
            </div>
          </div>

          <div className="nav-section">
            <div
              className="section-header"
              onClick={() => toggleSection("guide")}
            >
              Guide
              {openSections["guide"] ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
            <div
              className={`section-content ${
                openSections["guide"] ? "open" : ""
              }`}
            >
              <div className="nav-item">Authentication</div>
              <div className="nav-item">Error Handling</div>
              <div className="nav-item">Response</div>
              <div className="nav-item">Request</div>
              <div className="nav-item">Pagination</div>
              <div className="nav-item">Webhook</div>
            </div>
          </div>

          <div className="nav-section">
            <div
              className="section-header"
              onClick={() => toggleSection("core-resources")}
            >
              Core Resources
              {openSections["core-resources"] ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
            <div
              className={`section-content ${
                openSections["core-resources"] ? "open" : ""
              }`}
            >
              <div className="nav-item">Payment</div>
              <div className="nav-item">Overview</div>
              <div className="nav-item">Accept Payment</div>
              <div className="nav-item">Subscription</div>
              <div className="nav-item">Payout</div>
              <div className="nav-item">Refund</div>
              <div className="nav-item">Split Payment</div>
              <div className="nav-item">Transaction Search</div>
              <div className="nav-item">Orders</div>
              <div className="nav-item">Invoicing</div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <div className="search-container">
            <input type="text" className="search-input" placeholder="Search" />
          </div>
          <div className="header-actions">
            <a href="#" className="header-link">
              API
            </a>
            <a href="#" className="header-link">
              Support
            </a>
          </div>
        </div>

        <div className="content">
          <h1 className="page-title">API-DOC Documentation</h1>
          <p className="page-description">
            Join the ranks of satisfied developers who have harnessed the power
            of our API to enhance their applications and drive business growth.
            Explore our documentation and start revolutionizing payment
            experiences today.
          </p>
          <p className="page-description">
            You can use the API-DOC in test mode, which doesn't affect your live
            data or interact with the banking networks. The API key you use to
            authenticate the request determines whether the request is live mode
            or test mode.
          </p>

          <div className="section">
            <div className="cards-container">
              <div className="card">
                <h3 className="card-title">Getting started</h3>
                <p className="card-description">
                  Embark on your payment processing journey with ease by
                  following these simple steps to get started with our Payment
                  API.
                </p>
                <a href="#" className="card-link">
                  Developer Quick Start Guide
                </a>
              </div>
              <div className="card">
                <h3 className="card-title">Not a developer?</h3>
                <p className="card-description">
                  Explore our no-code option to get started with API-DOC and do
                  more with our API-DOC account
                </p>
                <a href="#" className="card-link">
                  No Code Option
                </a>
              </div>
            </div>
          </div>

          <div className="section client-section">
            <h2 className="section-title">Choose your client</h2>
            <p className="section-description">
              Select the client that best suits your development needs from our
              comprehensive range of options. API-DOC offers clients for
              JavaScript, Python, and PHP. In the following example, you can see
              how to install each client.
            </p>

            <div className="client-steps">
              <h4>Here's how to get your client ID and client secret:</h4>
              <ol>
                <li>Select Log in to Dashboard and log in or sign up.</li>
                <li>Select Apps & Credentials.</li>
                <li>
                  New accounts come with a Default Application in the REST API
                  apps section. To create a new project, select Create App.
                </li>
                <li>Copy the client ID and client secret for your app.</li>
              </ol>
            </div>

            <div className="code-container">
              <div className="code-tabs">
                {Object.keys(codeSnippets).map((lang) => (
                  <button
                    key={lang}
                    className={`code-tab ${activeTab === lang ? "active" : ""}`}
                    onClick={() => setActiveTab(lang)}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
              <div className="code-content">
                <button
                  className="copy-button"
                  onClick={() => copyToClipboard(codeSnippets[activeTab])}
                >
                  <Copy size={14} />
                </button>
                <pre className="code-block">{codeSnippets[activeTab]}</pre>
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">Client Libraries</h2>
            <div className="libraries-grid">
              <div className="library-card">
                <div className="library-header">
                  <div className="library-icon ruby">💎</div>
                  <h3 className="library-title">Rubby</h3>
                </div>
                <p className="library-description">
                  A dynamic, open source programming language with a focus on
                  simplicity and productivity
                </p>
              </div>

              <div className="library-card">
                <div className="library-header">
                  <div className="library-icon php">🐘</div>
                  <h3 className="library-title">Php</h3>
                </div>
                <p className="library-description">
                  A dynamic, open source programming language with a focus on
                  simplicity and productivity
                </p>
              </div>

              <div className="library-card">
                <div className="library-header">
                  <div className="library-icon nodejs">⬢</div>
                  <h3 className="library-title">Nodejs</h3>
                </div>
                <p className="library-description">
                  A dynamic, open source programming language with a focus on
                  simplicity and productivity
                </p>
              </div>

              <div className="library-card">
                <div className="library-header">
                  <div className="library-icon python">🐍</div>
                  <h3 className="library-title">Python</h3>
                </div>
                <p className="library-description">
                  A dynamic, open source programming language with a focus on
                  simplicity and productivity
                </p>
              </div>

              <div className="library-card">
                <div className="library-header">
                  <div className="library-icon go">∞</div>
                  <h3 className="library-title">GO</h3>
                </div>
                <p className="library-description">
                  A dynamic, open source programming language with a focus on
                  simplicity and productivity
                </p>
              </div>
            </div>
          </div>

          <div className="footer">© Copyright 2025. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
