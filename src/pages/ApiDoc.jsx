import React, { useState } from "react";

const ApiDocPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("curl");
  const [activeSection, setActiveSection] = useState("introduction");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { id: "curl", name: "Curl" },
    { id: "javascript", name: "JavaScript" },
    { id: "python", name: "Python" },
    { id: "php", name: "PHP" },
    { id: "ruby", name: "Ruby" },
  ];

  const codeExamples = {
    curl: `curl -G https://api.protocol.chat/v1/conversations \\
  -H "Authorization: Bearer {token}" \\
  -d limit=10`,
    javascript: `const response = await fetch('https://api.protocol.chat/v1/conversations', {
  headers: {
    'Authorization': 'Bearer {token}'
  }
});`,
    python: `import requests

response = requests.get(
  'https://api.protocol.chat/v1/conversations',
  headers={'Authorization': 'Bearer {token}'}
)`,
    php: `$response = Http::withHeaders([
  'Authorization' => 'Bearer {token}'
])->get('https://api.protocol.chat/v1/conversations');`,
    ruby: `response = HTTParty.get(
  'https://api.protocol.chat/v1/conversations',
  headers: { 'Authorization' => 'Bearer {token}' }
)`,
  };

  const sidebarItems = [
    {
      title: "Get Started",
      items: [
        { id: "introduction", name: "Introduction" },
        { id: "quick-start", name: "Quick Start" },
        { id: "client", name: "Client" },
        { id: "libraries", name: "Libraries" },
      ],
    },
    {
      title: "Guide",
      items: [
        { id: "authentication", name: "Authentication" },
        { id: "error-handling", name: "Error Handling" },
        { id: "response", name: "Response" },
        { id: "request", name: "Request" },
        { id: "pagination", name: "Pagination" },
        { id: "webhook", name: "Webhook" },
      ],
    },
    {
      title: "Core Resources",
      items: [
        { id: "payment", name: "Payment" },
        { id: "overview", name: "Overview" },
        { id: "accept-payment", name: "Accept Payment" },
        { id: "subscription", name: "Subscription" },
        { id: "payout", name: "Payout" },
        { id: "refund", name: "Refund" },
        { id: "split-payment", name: "Split Payment" },
        { id: "transaction-search", name: "Transaction Search" },
        { id: "orders", name: "Orders" },
        { id: "invoicing", name: "Invoicing" },
      ],
    },
  ];

  const clientLibraries = [
    {
      name: "Rubby",
      description:
        "A dynamic, open source programming language with a focus on simplicity and productivity",
      icon: "💎",
    },
    {
      name: "Php",
      description:
        "A dynamic, open source programming language with a focus on simplicity and productivity",
      icon: "🐘",
    },
    {
      name: "Nodejs",
      description:
        "A dynamic, open source programming language with a focus on simplicity and productivity",
      icon: "🟢",
    },
    {
      name: "Python",
      description:
        "A dynamic, open source programming language with a focus on simplicity and productivity",
      icon: "🐍",
    },
    {
      name: "GO",
      description:
        "A dynamic, open source programming language with a focus on simplicity and productivity",
      icon: "🔗",
    },
  ];

  return (
    <div className="api-doc-container">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .api-doc-container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, sans-serif;
          min-height: 100vh;
          background: #fafafa;
          display: flex;
          flex-direction: column;
        }

        .header {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1a202c;
        }

        .search-container {
          flex: 1;
          max-width: 400px;
          margin: 0 2rem;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          background: #f8fafc;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #1a202c;
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .mainContent {
          display: flex;
          flex: 1;
        }

        .sidebar {
          width: 280px;
          background: white;
          border-right: 1px solid #e2e8f0;
          padding: 2rem 0;
          height: calc(100vh - 80px);
          overflow-y: auto;
          position: sticky;
          top: 80px;
        }

        .sidebar-section {
          margin-bottom: 2rem;
        }

        .sidebar-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1rem;
          padding: 0 1.5rem;
        }

        .sidebar-item {
          display: block;
          padding: 0.5rem 1.5rem;
          color: #6b7280;
          text-decoration: none;
          font-size: 0.875rem;
          transition: all 0.2s;
          border-left: 3px solid transparent;
        }

        .sidebar-item:hover {
          background: #f8fafc;
          color: #374151;
        }

        .sidebar-item.active {
          background: #eff6ff;
          color: #3b82f6;
          border-left-color: #3b82f6;
        }

        .content {
          flex: 1;
          padding: 2rem;
          max-width: 800px;
        }

        .content h1 {
          font-size: 2rem;
          font-weight: bold;
          color: #1a202c;
          margin-bottom: 1rem;
        }

        .content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a202c;
          margin: 2rem 0 1rem 0;
        }

        .content p {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .getting-started-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin: 2rem 0;
        }

        .getting-started-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 1.5rem;
          transition: shadow 0.2s;
        }

        .getting-started-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .getting-started-card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .getting-started-card p {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .cta-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
          margin-top: 1rem;
          display: inline-block;
        }

        .cta-link:hover {
          text-decoration: underline;
        }

        .setup-steps {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin: 2rem 0;
        }

        .setup-steps ol {
          list-style: decimal;
          margin-left: 1.5rem;
        }

        .setup-steps li {
          color: #4b5563;
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }

        .code-block-container {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          margin: 2rem 0;
          overflow: hidden;
        }

        .code-tabs {
          display: flex;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          overflow-x: auto;
        }

        .code-tab {
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          color: #6b7280;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .code-tab.active {
          color: #3b82f6;
          background: white;
          border-bottom: 2px solid #3b82f6;
        }

        .code-tab:hover {
          color: #374151;
        }

        .code-content {
          padding: 1.5rem;
          background: #1e293b;
          color: #e2e8f0;
          font-family: "Monaco", "Consolas", monospace;
          font-size: 0.875rem;
          line-height: 1.6;
          overflow-x: auto;
        }

        .copy-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #374151;
          color: white;
          border: none;
          padding: 0.5rem;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 0.75rem;
        }

        .copy-button:hover {
          background: #4b5563;
        }

        .client-libraries {
          margin: 2rem 0;
        }

        .libraries-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .library-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 1.5rem;
          transition: shadow 0.2s;
        }

        .library-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .library-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .library-icon {
          font-size: 1.5rem;
        }

        .library-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1a202c;
        }

        .library-description {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .footer {
          background: white;
          border-top: 1px solid #e2e8f0;
          padding: 2rem;
          text-align: center;
          color: #6b7280;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .header {
            padding: 1rem;
          }

          header .logo {
            margin-left: 2rem;
          }

          .search-container {
            display: none;
          }

          .nav-links {
            display: none;
          }

          .mobile-menu-toggle {
            display: block;
          }

          .mainContent {
            flex-direction: column;
          }

          .sidebar {
            position: fixed;
            top: 55px;
            left: 0;
            width: 60%;
            height: calc(100vh - 80px);
            background: white;
            z-index: 50;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .content {
            padding: 1rem;
          }

          .getting-started-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .libraries-grid {
            grid-template-columns: 1fr;
          }

          .code-tabs {
            flex-wrap: wrap;
          }

          .code-tab {
            flex: 1;
            min-width: 80px;
          }
        }

        @media (max-width: 480px) {
          .content h1 {
            font-size: 1.5rem;
          }

          .content h2 {
            font-size: 1.25rem;
          }

          .getting-started-card,
          .library-card {
            padding: 1rem;
          }

          .code-content {
            padding: 1rem;
            font-size: 0.8rem;
          }
        }
      `}</style>

      <header className="header">
        <div className="logo">API-DOC</div>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search" />
        </div>
        <nav className="nav-links">
          <a href="#" className="nav-link">
            API
          </a>
          <a href="#" className="nav-link">
            Support
          </a>
        </nav>
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </header>

      <div className="mainContent">
        <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
          {sidebarItems.map((section, index) => (
            <div key={index} className="sidebar-section">
              <div className="sidebar-title">{section.title}</div>
              {section.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`sidebar-item ${
                    activeSection === item.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          ))}
        </aside>

        <main className="content">
          <h1>API-DOC Documentation</h1>
          <p>
            Join the ranks of satisfied developers who have harnessed the power
            of our API to enhance their applications and drive business growth.
            Explore our documentation and start revolutionizing payment
            experiences today.
          </p>
          <p>
            You can use the API-DOC in test mode, which doesn't affect your live
            data or interact with the banking networks. The API key you use to
            authenticate the request determines whether the request is live mode
            or test mode.
          </p>

          <div className="getting-started-grid">
            <div className="getting-started-card">
              <h3>Getting started</h3>
              <p>
                Embark on your payment processing journey with ease by following
                these simple steps to get started with our Payment API.
              </p>
              <a href="#" className="cta-link">
                Developer Quick Start Guide
              </a>
            </div>
            <div className="getting-started-card">
              <h3>Not a developer?</h3>
              <p>
                Explore our no-code option to get started with API-DOC and do
                more with our API-DOC account.
              </p>
              <a href="#" className="cta-link">
                No Code Option
              </a>
            </div>
          </div>

          <h2>Choose your client</h2>
          <p>
            Select the client that best suits your development needs from our
            comprehensive range of options. API-DOC offers clients for
            JavaScript, Python, and PHP. In the following example, you can see
            how to install each client.
          </p>

          <div className="setup-steps">
            <p>
              <strong>
                Here's how to get your client ID and client secret:
              </strong>
            </p>
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

          <div className="code-block-container">
            <div className="code-tabs">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  className={`code-tab ${
                    selectedLanguage === lang.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedLanguage(lang.id)}
                >
                  {lang.name}
                </button>
              ))}
            </div>
            <div className="code-content" style={{ position: "relative" }}>
              <button className="copy-button">Copy</button>
              <pre>{codeExamples[selectedLanguage]}</pre>
            </div>
          </div>

          <div className="client-libraries">
            <h2>Client Libraries</h2>
            <div className="libraries-grid">
              {clientLibraries.map((library, index) => (
                <div key={index} className="library-card">
                  <div className="library-header">
                    <span className="library-icon">{library.icon}</span>
                    <span className="library-name">{library.name}</span>
                  </div>
                  <p className="library-description">{library.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <footer className="footer">© Copyright 2025. All rights reserved.</footer>
    </div>
  );
};

export default ApiDocPage;
