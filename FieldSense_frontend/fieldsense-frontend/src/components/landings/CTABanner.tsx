"use client";

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Users, Building, Microscope, Smartphone, X, Phone, Mail, MessageCircle, Copy } from 'lucide-react';
import styles from '@/styles/components/landing/CTABanner.module.scss';

const CTABanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [activeApiSection, setActiveApiSection] = useState('overview');
  const sectionRef = useRef<HTMLElement>(null);

  // Expert team data
  const experts = [
    {
      id: 1,
      name: "Atharv Patil Patki",
      role: "UI UX Lead",
      avatar: "AP",
      phone: "+91 7058602811",
      email: "patkiatharv@gmail.com",
      expertise: "Frontend development, UI UX Planning"
    },
    {
      id: 2,
      name: "Samarth Patil",
      role: "Engineering Lead & MVP Creator", 
      avatar: "SP",
      phone: "+91 8766794922",
      email: "samarth.patil3101@gmail.com",
      expertise: "Backend development, API design"
    },
    {
      id: 3,
      name: "Chinmay Chaudhari",
      role: "Relations Outreach",
      avatar: "CC",
      phone: "+91 8459392268",
      email: "chinmayac234@gmail.com",
      expertise: "Documentation, Client relations"
    },
    {
      id: 4,
      name: "Janvi Somvanshi",
      role: "Research & Development",
      avatar: "JS",
      phone: "+91 8708123055",
      email: "janvisomvanshi@gmail.com",
      expertise: "ML models, Data analysis"
    },
    {
      id: 5,
      name: "Namrata Shinde",
      role: "Technical Support",
      avatar: "NS",
      phone: "+91 8956498940",
      email: "namratapshinde48@gmail.com",
      expertise: "Documentation, User support"
    },
    {
      id: 6,
      name: "Alisha Kalokhe",
      role: "Outreach Coordinator",
      avatar: "AK",
      phone: "+91 7385104069",
      email: "alishakalokhe9@gmail.com",
      expertise: "Client relations, Social media"
    }
  ];

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Government Dashboard Function with ALL FEATURES
  const openGovernmentDashboard = () => {
    const dashboardWindow = window.open('', 'GovernmentDashboard', 'width=1500,height=900,scrollbars=yes,resizable=yes');
    
    if (dashboardWindow) {
      dashboardWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Government Portal - Maharashtra Agricultural Market</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    background: #f8fafc;
                    color: #1e293b;
                    height: 100vh;
                    overflow: hidden;
                }
                .dashboard-container {
                    display: flex;
                    height: 100vh;
                }
                
                /* Sidebar Styles */
                .sidebar {
                    width: 280px;
                    background: #ffffff;
                    border-right: 1px solid #e2e8f0;
                    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
                    z-index: 10;
                }
                .sidebar-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                    background: #fafafa;
                }
                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .logo-icon {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }
                .logo-text {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1e293b;
                }
                .logo-subtitle {
                    font-size: 0.75rem;
                    color: #64748b;
                    margin-top: 0.25rem;
                }
                
                /* Navigation Menu */
                .nav-menu {
                    padding: 1rem;
                }
                .nav-section {
                    margin-bottom: 2rem;
                }
                .nav-section-title {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.75rem;
                    padding: 0 0.75rem;
                }
                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: #64748b;
                    font-weight: 500;
                    margin-bottom: 0.25rem;
                }
                .nav-item:hover {
                    background: #f1f5f9;
                    color: #3b82f6;
                }
                .nav-item.active {
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    color: white;
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }
                .nav-item-icon {
                    width: 20px;
                    height: 20px;
                    flex-shrink: 0;
                }
                
                /* Main Content Area */
                .main-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                
                /* Top Header */
                .top-header {
                    background: white;
                    border-bottom: 1px solid #e2e8f0;
                    padding: 1.26rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                }
                .page-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #1e293b;
                }
                .page-subtitle {
                    font-size: 0.875rem;
                    color: #64748b;
                    margin-top: 0.25rem;
                }
                .header-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .status-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #dcfce7;
                    color: #16a34a;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                .status-dot {
                    width: 8px;
                    height: 8px;
                    background: #16a34a;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                /* Content Area */
                .content-area {
                    flex: 1;
                    padding: 2rem;
                    overflow-y: auto;
                    background: #f8fafc;
                }
                
                /* Global Filters */
                .filters-bar {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                }
                .filters-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 1rem;
                }
                .filters-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    align-items: end;
                }
                .filter-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .filter-label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                }
                .filter-select {
                    padding: 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    background: white;
                    font-size: 0.875rem;
                    color: #1e293b;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .filter-select:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
                .apply-filters-btn {
                    padding: 0.75rem 1.5rem;
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .apply-filters-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }
                
                /* Stats Cards */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                .stat-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                    transition: all 0.2s ease;
                }
                .stat-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .stat-header {
                    display: flex;
                    justify-content: between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }
                .stat-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                }
                .stat-icon.blue {
                    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
                    color: #3b82f6;
                }
                .stat-icon.green {
                    background: linear-gradient(135deg, #dcfce7, #bbf7d0);
                    color: #16a34a;
                }
                .stat-icon.purple {
                    background: linear-gradient(135deg, #ede9fe, #ddd6fe);
                    color: #8b5cf6;
                }
                .stat-icon.orange {
                    background: linear-gradient(135deg, #fed7aa, #fdba74);
                    color: #ea580c;
                }
                .stat-value {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 0.25rem;
                }
                .stat-label {
                    font-size: 0.875rem;
                    color: #64748b;
                    font-weight: 500;
                }
                .stat-change {
                    font-size: 0.75rem;
                    padding: 0.25rem 0.5rem;
                    border-radius: 12px;
                    font-weight: 500;
                    margin-top: 0.5rem;
                    display: inline-block;
                }
                .stat-change.positive {
                    background: #dcfce7;
                    color: #16a34a;
                }
                .stat-change.negative {
                    background: #fef2f2;
                    color: #dc2626;
                }
                
                /* Data Table */
                .data-section {
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                    overflow: hidden;
                }
                .section-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                    background: #fafafa;
                }
                .section-title {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 0.25rem;
                }
                .section-subtitle {
                    font-size: 0.875rem;
                    color: #64748b;
                }
                .table-container {
                    padding: 1.5rem;
                }
                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .table-header {
                    border-bottom: 2px solid #e2e8f0;
                }
                .table-header th {
                    text-align: left;
                    padding: 0.75rem;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #374151;
                    text-transform: uppercase;
                    letter-spacing: 0.025em;
                }
                .table-row {
                    border-bottom: 1px solid #f1f5f9;
                    transition: all 0.2s ease;
                }
                .table-row:hover {
                    background: #f8fafc;
                }
                .table-row td {
                    padding: 1rem 0.75rem;
                    font-size: 0.875rem;
                }
                .commodity-cell {
                    font-weight: 600;
                    color: #1e293b;
                }
                .market-cell {
                    color: #64748b;
                    font-size: 0.8125rem;
                }
                .price-cell {
                    font-weight: 600;
                    color: #1e293b;
                }
                .trend-indicator {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    margin-left: 0.5rem;
                }
                .trend-up {
                    background: #dcfce7;
                    color: #16a34a;
                }
                .trend-down {
                    background: #fef2f2;
                    color: #dc2626;
                }
                .trend-stable {
                    background: #f1f5f9;
                    color: #64748b;
                }
                
                /* Chart Containers */
                .charts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                .chart-card {
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                    overflow: hidden;
                }
                .chart-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                    background: #fafafa;
                }
                .chart-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 0.25rem;
                }
                .chart-subtitle {
                    font-size: 0.8125rem;
                    color: #64748b;
                }
                .chart-content {
                    padding: 1.5rem;
                    height: 300px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                    color: #64748b;
                    font-size: 1rem;
                    text-align: center;
                }
                
                /* Region Cards */
                .regions-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 1.5rem;
                }
                .region-card {
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    padding: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                    transition: all 0.2s ease;
                }
                .region-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .region-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .region-name {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: #1e293b;
                }
                .region-status {
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                .status-active {
                    background: #dcfce7;
                    color: #16a34a;
                }
                .status-moderate {
                    background: #fef3c7;
                    color: #d97706;
                }
                .region-metrics {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }
                .metric {
                    text-align: center;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 8px;
                }
                .metric-value {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 0.25rem;
                }
                .metric-label {
                    font-size: 0.75rem;
                    color: #64748b;
                    font-weight: 500;
                }
                
                /* Report Cards */
                .reports-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 1.5rem;
                }
                .report-card {
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                    overflow: hidden;
                }
                .report-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                    background: #fafafa;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .report-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #1e293b;
                }
                .download-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 0.8125rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .download-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }
                .report-content {
                    padding: 1.5rem;
                }
                .report-metrics {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 1rem;
                }
                
                /* Responsive */
                @media (max-width: 1024px) {
                    .dashboard-container {
                        flex-direction: column;
                    }
                    .sidebar {
                        width: 100%;
                        height: auto;
                        border-right: none;
                        border-bottom: 1px solid #e2e8f0;
                    }
                    .nav-menu {
                        display: flex;
                        overflow-x: auto;
                        padding: 1rem 0;
                    }
                    .nav-section {
                        margin: 0;
                        min-width: max-content;
                    }
                    .nav-item {
                        margin: 0 0.5rem;
                        white-space: nowrap;
                    }
                }
                
                /* Loading Animation */
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .spinner {
                    animation: spin 1s linear infinite;
                }
                
                /* Hidden Content */
                .content-section {
                    display: none;
                }
                .content-section.active {
                    display: block;
                }
            </style>
        </head>
        <body>
            <div class="dashboard-container">
                <!-- Sidebar -->
                <div class="sidebar">
                    <div class="sidebar-header">
                        <div class="logo-container">
                            <div class="logo-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 21h18v-2H3v2zM5 10h3v7H5v-7zM19 17h-3v-7h3v7zM14 12h-4v5h4v-5zM10 3h4v6h-4V3z"/>
                                </svg>
                            </div>
                            <div>
                                <div class="logo-text">Gov Portal</div>
                                <div class="logo-subtitle">Maharashtra APMC</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="nav-menu">
                        <div class="nav-section">
                            <div class="nav-section-title">Main</div>
                            <div class="nav-item active" onclick="showSection('market-data')">
                                <svg class="nav-item-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                                </svg>
                                Market Data
                            </div>
                        </div>
                        
                        <div class="nav-section">
                            <div class="nav-section-title">Insights</div>
                            <div class="nav-item" onclick="showSection('analytics')">
                                <svg class="nav-item-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 21h18v-2H3v2zM5 10h3v7H5v-7zM19 17h-3v-7h3v7zM14 12h-4v5h4v-5z"/>
                                </svg>
                                Analytics
                            </div>
                            <div class="nav-item" onclick="showSection('regions')">
                                <svg class="nav-item-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                Regions
                            </div>
                        </div>
                        
                        <div class="nav-section">
                            <div class="nav-section-title">Reports</div>
                            <div class="nav-item" onclick="showSection('reports')">
                                <svg class="nav-item-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zM19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                                </svg>
                                Reports
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Main Content -->
                <div class="main-content">
                    <div class="top-header">
                        <div>
                            <div class="page-title" id="page-title">Market Data Dashboard</div>
                            <div class="page-subtitle" id="page-subtitle">Real-time agricultural market monitoring</div>
                        </div>
                        <div class="header-actions">
                            <div class="status-badge">
                                <div class="status-dot"></div>
                                Live Data
                            </div>
                        </div>
                    </div>
                    
                    <div class="content-area">
                        <!-- Global Filters -->
                        <div class="filters-bar">
                            <div class="filters-title">Filter Market Data</div>
                            <div class="filters-grid">
                                <div class="filter-group">
                                    <label class="filter-label">District</label>
                                    <select class="filter-select" id="district-filter" onchange="updateData()">
                                        <option value="All">All Districts</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Pune">Pune</option>
                                        <option value="Nagpur">Nagpur</option>
                                        <option value="Nashik">Nashik</option>
                                        <option value="Aurangabad">Aurangabad</option>
                                        <option value="Kolhapur">Kolhapur</option>
                                        <option value="Solapur">Solapur</option>
                                        <option value="Satara">Satara</option>
                                        <option value="Sangli">Sangli</option>
                                        <option value="Ahmednagar">Ahmednagar</option>
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label class="filter-label">Commodity</label>
                                    <select class="filter-select" id="commodity-filter" onchange="updateData()">
                                        <option value="All">All Commodities</option>
                                        <option value="Onion">Onion</option>
                                        <option value="Potato">Potato</option>
                                        <option value="Tomato">Tomato</option>
                                        <option value="Cotton">Cotton</option>
                                        <option value="Sugarcane">Sugarcane</option>
                                        <option value="Wheat">Wheat</option>
                                        <option value="Rice">Rice</option>
                                        <option value="Soybean">Soybean</option>
                                        <option value="Turmeric">Turmeric</option>
                                        <option value="Banana">Banana</option>
                                        <option value="Chilli">Chilli</option>
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <button class="apply-filters-btn" onclick="refreshData()">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" id="refresh-icon">
                                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                                        </svg>
                                        Refresh Data
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Market Data Section -->
                        <div class="content-section active" id="market-data-section">
                            <!-- Stats Cards -->
                            <div class="stats-grid">
                                <div class="stat-card">
                                    <div class="stat-icon blue">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                    </div>
                                    <div class="stat-value" id="active-markets">5</div>
                                    <div class="stat-label">Active Markets</div>
                                    <div class="stat-change positive">↑ 12% from yesterday</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-icon green">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                        </svg>
                                    </div>
                                    <div class="stat-value" id="total-arrivals">11,300</div>
                                    <div class="stat-label">Total Arrivals (Qt)</div>
                                    <div class="stat-change positive">↑ 8% from last week</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-icon purple">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                                        </svg>
                                    </div>
                                    <div class="stat-value" id="avg-price">₹2,620</div>
                                    <div class="stat-label">Avg Modal Price</div>
                                    <div class="stat-change positive">↑ 5% from last month</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-icon orange">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                                        </svg>
                                    </div>
                                    <div class="stat-value" id="trending-up">3</div>
                                    <div class="stat-label">Trending Up</div>
                                    <div class="stat-change positive">↑ 2 commodities</div>
                                </div>
                            </div>
                            
                            <!-- Data Table -->
                            <div class="data-section">
                                <div class="section-header">
                                    <div class="section-title">Maharashtra Krushi Bazaar Samiti - Live Market Rates</div>
                                    <div class="section-subtitle" id="last-updated">Last updated: ${new Date().toLocaleString()}</div>
                                </div>
                                <div class="table-container">
                                    <table class="data-table">
                                        <thead class="table-header">
                                            <tr>
                                                <th>Commodity</th>
                                                <th>Market</th>
                                                <th>District</th>
                                                <th>Modal Price (₹)</th>
                                                <th>Price Range</th>
                                                <th>Arrivals (Qt)</th>
                                                <th>Trend</th>
                                            </tr>
                                        </thead>
                                        <tbody id="market-table-body">
                                            <!-- Table rows will be populated by JavaScript -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Analytics Section -->
                        <div class="content-section" id="analytics-section">
                            <div class="charts-grid">
                                <div class="chart-card">
                                    <div class="chart-header">
                                        <div class="chart-title">Price Trends (Last 30 Days)</div>
                                        <div class="chart-subtitle">Commodity price movements over time</div>
                                    </div>
                                    <div class="chart-content">
                                        📈 Interactive Price Chart<br>
                                        <small>Real-time price analysis and forecasting</small>
                                    </div>
                                </div>
                                <div class="chart-card">
                                    <div class="chart-header">
                                        <div class="chart-title">Arrival Volumes</div>
                                        <div class="chart-subtitle">Market supply analysis</div>
                                    </div>
                                    <div class="chart-content">
                                        📊 Volume Distribution Chart<br>
                                        <small>Supply trends and seasonal patterns</small>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="chart-card" style="margin-bottom: 2rem;">
                                <div class="chart-header">
                                    <div class="chart-title">Market Performance Dashboard</div>
                                    <div class="chart-subtitle">Key performance indicators</div>
                                </div>
                                <div style="padding: 1.5rem;">
                                    <div class="stats-grid">
                                        <div class="stat-card">
                                            <div class="stat-value">+12.5%</div>
                                            <div class="stat-label">Price Growth Rate</div>
                                        </div>
                                        <div class="stat-card">
                                            <div class="stat-value">8.2%</div>
                                            <div class="stat-label">Market Volatility</div>
                                        </div>
                                        <div class="stat-card">
                                            <div class="stat-value">76</div>
                                            <div class="stat-label">Supply Index</div>
                                        </div>
                                        <div class="stat-card">
                                            <div class="stat-value">High</div>
                                            <div class="stat-label">Demand Forecast</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Regions Section -->
                        <div class="content-section" id="regions-section">
                            <div style="margin-bottom: 2rem;">
                                <h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">
                                    Regional Market Overview
                                </h3>
                                <p style="color: #64748b;">District-wise performance and market activity monitoring</p>
                            </div>
                            
                            <div class="regions-grid" id="regions-grid">
                                <!-- Region cards will be populated by JavaScript -->
                            </div>
                        </div>
                        
                        <!-- Reports Section -->
                        <div class="content-section" id="reports-section">
                            <div style="margin-bottom: 2rem;">
                                <h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">
                                    Market Reports & Analytics
                                </h3>
                                <p style="color: #64748b;">Comprehensive market analysis and downloadable reports</p>
                            </div>
                            
                            <div class="reports-grid">
                                <div class="report-card">
                                    <div class="report-header">
                                        <div class="report-title">Daily Market Summary</div>
                                        <button class="download-btn" onclick="downloadReport('daily')">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                                            </svg>
                                            Download
                                        </button>
                                    </div>
                                    <div class="report-content">
                                        <div class="report-metrics" id="daily-summary">
                                            <!-- Will be populated by JavaScript -->
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="report-card">
                                    <div class="report-header">
                                        <div class="report-title">Weekly Analysis</div>
                                        <button class="download-btn" onclick="downloadReport('weekly')">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                                            </svg>
                                            Download
                                        </button>
                                    </div>
                                    <div class="report-content">
                                        <div class="report-metrics" id="weekly-summary">
                                            <!-- Will be populated by JavaScript -->
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="report-card">
                                    <div class="report-header">
                                        <div class="report-title">Monthly Report</div>
                                        <button class="download-btn" onclick="downloadReport('monthly')">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                                            </svg>
                                            Download
                                        </button>
                                    </div>
                                    <div class="report-content">
                                        <div class="report-metrics" id="monthly-summary">
                                            <!-- Will be populated by JavaScript -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                // Sample market data
                const marketData = [
                    { commodity: 'Onion', market: 'Lasalgaon APMC', district: 'Nashik', minPrice: 800, maxPrice: 1200, modalPrice: 1000, arrival: 2500, trend: 'up' },
                    { commodity: 'Potato', market: 'Pune APMC', district: 'Pune', minPrice: 1500, maxPrice: 1800, modalPrice: 1650, arrival: 1800, trend: 'down' },
                    { commodity: 'Cotton', market: 'Akola APMC', district: 'Akola', minPrice: 6800, maxPrice: 7200, modalPrice: 7000, arrival: 800, trend: 'stable' },
                    { commodity: 'Tomato', market: 'Mumbai APMC', district: 'Mumbai', minPrice: 2000, maxPrice: 2800, modalPrice: 2400, arrival: 1200, trend: 'up' },
                    { commodity: 'Sugarcane', market: 'Kolhapur APMC', district: 'Kolhapur', minPrice: 320, maxPrice: 380, modalPrice: 350, arrival: 5000, trend: 'stable' },
                    { commodity: 'Wheat', market: 'Pune APMC', district: 'Pune', minPrice: 2200, maxPrice: 2400, modalPrice: 2300, arrival: 1500, trend: 'up' },
                    { commodity: 'Rice', market: 'Nagpur APMC', district: 'Nagpur', minPrice: 2800, maxPrice: 3200, modalPrice: 3000, arrival: 2200, trend: 'stable' },
                    { commodity: 'Soybean', market: 'Aurangabad APMC', district: 'Aurangabad', minPrice: 4500, maxPrice: 4800, modalPrice: 4650, arrival: 1100, trend: 'down' },
                    { commodity: 'Turmeric', market: 'Sangli APMC', district: 'Sangli', minPrice: 8000, maxPrice: 9500, modalPrice: 8750, arrival: 600, trend: 'up' },
                    { commodity: 'Banana', market: 'Solapur APMC', district: 'Solapur', minPrice: 1200, maxPrice: 1600, modalPrice: 1400, arrival: 800, trend: 'stable' }
                ];

                let currentDistrict = 'All';
                let currentCommodity = 'All';

                // Section navigation
                function showSection(sectionId) {
                    document.querySelectorAll('.content-section').forEach(section => {
                        section.classList.remove('active');
                    });
                    
                    document.querySelectorAll('.nav-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    document.getElementById(sectionId + '-section').classList.add('active');
                    event.target.classList.add('active');
                    
                    const titles = {
                        'market-data': 'Market Data Dashboard',
                        'analytics': 'Analytics & Insights',
                        'regions': 'Regional Overview',
                        'reports': 'Reports & Downloads'
                    };
                    
                    const subtitles = {
                        'market-data': 'Real-time agricultural market monitoring',
                        'analytics': 'Advanced market analysis and forecasting',
                        'regions': 'District-wise performance tracking',
                        'reports': 'Comprehensive market reports and data exports'
                    };
                    
                    document.getElementById('page-title').textContent = titles[sectionId];
                    document.getElementById('page-subtitle').textContent = subtitles[sectionId];
                }

                function updateData() {
                    currentDistrict = document.getElementById('district-filter').value;
                    currentCommodity = document.getElementById('commodity-filter').value;
                    
                    populateMarketTable();
                    updateStats();
                    populateRegions();
                    populateReports();
                }

                function refreshData() {
                    const refreshIcon = document.getElementById('refresh-icon');
                    refreshIcon.classList.add('spinner');
                    
                    setTimeout(() => {
                        updateData();
                        document.getElementById('last-updated').textContent = 'Last updated: ' + new Date().toLocaleString();
                        refreshIcon.classList.remove('spinner');
                    }, 1000);
                }

                function filterData(data) {
                    return data.filter(item => {
                        const districtMatch = currentDistrict === 'All' || item.district === currentDistrict;
                        const commodityMatch = currentCommodity === 'All' || item.commodity === currentCommodity;
                        return districtMatch && commodityMatch;
                    });
                }

                function populateMarketTable() {
                    const filteredData = filterData(marketData);
                    const tbody = document.getElementById('market-table-body');
                    
                    tbody.innerHTML = '';
                    
                    if (filteredData.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: #64748b;">No data found for selected filters</td></tr>';
                        return;
                    }
                    
                    filteredData.forEach(item => {
                        const trendIcon = getTrendIcon(item.trend);
                        tbody.innerHTML += \`
                            <tr class="table-row">
                                <td>
                                    <div class="commodity-cell">\${item.commodity}</div>
                                </td>
                                <td>
                                    <div class="market-cell">\${item.market}</div>
                                </td>
                                <td>\${item.district}</td>
                                <td class="price-cell">₹\${item.modalPrice.toLocaleString()}</td>
                                <td>₹\${item.minPrice.toLocaleString()} - ₹\${item.maxPrice.toLocaleString()}</td>
                                <td>\${item.arrival.toLocaleString()}</td>
                                <td>\${trendIcon}</td>
                            </tr>
                        \`;
                    });
                }

                function updateStats() {
                    const filteredData = filterData(marketData);
                    const totalArrivals = filteredData.reduce((sum, item) => sum + item.arrival, 0);
                    const avgPrice = filteredData.length > 0 ? Math.round(filteredData.reduce((sum, item) => sum + item.modalPrice, 0) / filteredData.length) : 0;
                    const trendingUp = filteredData.filter(item => item.trend === 'up').length;
                    
                    document.getElementById('active-markets').textContent = filteredData.length;
                    document.getElementById('total-arrivals').textContent = totalArrivals.toLocaleString();
                    document.getElementById('avg-price').textContent = '₹' + avgPrice.toLocaleString();
                    document.getElementById('trending-up').textContent = trendingUp;
                }

                function populateRegions() {
                    const regionsGrid = document.getElementById('regions-grid');
                    const districts = ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Kolhapur', 'Solapur', 'Satara', 'Sangli', 'Ahmednagar'];
                    
                    regionsGrid.innerHTML = '';
                    
                    districts.forEach(district => {
                        if (currentDistrict !== 'All' && currentDistrict !== district) {
                            return;
                        }
                        
                        const districtData = marketData.filter(item => item.district === district);
                        const filteredDistrictData = filterData(districtData);
                        
                        if (filteredDistrictData.length === 0 && currentCommodity !== 'All') {
                            return;
                        }
                        
                        const totalArrivals = filteredDistrictData.reduce((sum, item) => sum + item.arrival, 0);
                        const avgPrice = filteredDistrictData.length > 0 ? Math.round(filteredDistrictData.reduce((sum, item) => sum + item.modalPrice, 0) / filteredDistrictData.length) : 0;
                        const activeMarkets = filteredDistrictData.length;
                        const status = totalArrivals > 2000 ? 'active' : 'moderate';
                        
                        regionsGrid.innerHTML += \`
                            <div class="region-card">
                                <div class="region-header">
                                    <div class="region-name">\${district}</div>
                                    <div class="region-status status-\${status}">
                                        \${status === 'active' ? 'High Activity' : 'Moderate Activity'}
                                    </div>
                                </div>
                                <div class="region-metrics">
                                    <div class="metric">
                                        <div class="metric-value">\${activeMarkets}</div>
                                        <div class="metric-label">Markets</div>
                                    </div>
                                    <div class="metric">
                                        <div class="metric-value">\${totalArrivals.toLocaleString()}</div>
                                        <div class="metric-label">Arrivals</div>
                                    </div>
                                    <div class="metric">
                                        <div class="metric-value">₹\${avgPrice.toLocaleString()}</div>
                                        <div class="metric-label">Avg Price</div>
                                    </div>
                                    <div class="metric">
                                        <div class="metric-value">\${Math.floor(Math.random() * 20) + 80}%</div>
                                        <div class="metric-label">Efficiency</div>
                                    </div>
                                </div>
                            </div>
                        \`;
                    });
                }

                function populateReports() {
                    const filteredData = filterData(marketData);
                    const totalArrivals = filteredData.reduce((sum, item) => sum + item.arrival, 0);
                    const avgPrice = filteredData.length > 0 ? Math.round(filteredData.reduce((sum, item) => sum + item.modalPrice, 0) / filteredData.length) : 0;
                    const trendingUp = filteredData.filter(item => item.trend === 'up').length;
                    
                    document.getElementById('daily-summary').innerHTML = \`
                        <div class="metric">
                            <div class="metric-value">\${filteredData.length}</div>
                            <div class="metric-label">Markets</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">\${totalArrivals.toLocaleString()}</div>
                            <div class="metric-label">Arrivals</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">₹\${avgPrice.toLocaleString()}</div>
                            <div class="metric-label">Avg Price</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">\${trendingUp}</div>
                            <div class="metric-label">Increases</div>
                        </div>
                    \`;
                    
                    document.getElementById('weekly-summary').innerHTML = \`
                        <div class="metric">
                            <div class="metric-value">+12.5%</div>
                            <div class="metric-label">Growth</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">\${(totalArrivals * 7).toLocaleString()}</div>
                            <div class="metric-label">Weekly Total</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">8.2%</div>
                            <div class="metric-label">Volatility</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">76</div>
                            <div class="metric-label">Supply Index</div>
                        </div>
                    \`;
                    
                    document.getElementById('monthly-summary').innerHTML = \`
                        <div class="metric">
                            <div class="metric-value">\${(totalArrivals * 30).toLocaleString()}</div>
                            <div class="metric-label">Monthly Total</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">₹\${(avgPrice * 1.15).toFixed(0)}</div>
                            <div class="metric-label">Peak Price</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">₹\${(avgPrice * 0.85).toFixed(0)}</div>
                            <div class="metric-label">Low Price</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">\${filteredData.length * 30}</div>
                            <div class="metric-label">Trading Days</div>
                        </div>
                    \`;
                }

                function getTrendIcon(trend) {
                    switch (trend) {
                        case 'up':
                            return '<div class="trend-indicator trend-up">↑</div>';
                        case 'down':
                            return '<div class="trend-indicator trend-down">↓</div>';
                        default:
                            return '<div class="trend-indicator trend-stable">→</div>';
                    }
                }

                function downloadReport(type) {
                    alert('Downloading ' + type + ' report for: ' + currentDistrict + ', ' + currentCommodity);
                }

                document.addEventListener('DOMContentLoaded', function() {
                    updateData();
                });
            </script>
        </body>
        </html>
      `);
      dashboardWindow.document.close();
      dashboardWindow.focus();
    }
  };

  // Expert contact handlers
  const handleCallExpert = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleEmailExpert = (email: string) => {
    window.open(`mailto:${email}?subject=FieldSense Inquiry&body=Hi, I would like to know more about FieldSense services.`, '_blank');
  };

  const handleWhatsAppExpert = (phone: string) => {
    const formattedPhone = phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/91${formattedPhone.slice(-10)}?text=Hi, I'm interested in FieldSense services and would like to speak with an expert.`, '_blank');
  };

  const ctaOptions = [
    {
      icon: Users,
      title: 'Farmer Dashboard',
      description: 'AI-powered crop insights and monitoring',
      features: ['Soil Analysis', 'Crop Health', 'Pest Detection'],
      cta: 'Start Free Trial (Locked)',
      action: () => console.log('Navigate to farmer dashboard'),
      color: 'green',
      badge: 'Free'
    },
    {
      icon: Microscope,
      title: 'Research Access',
      description: 'Agricultural datasets and research APIs',
      features: ['Open Data', 'API Access', 'Research Tools'],
      cta: 'Join Research (Locked)',
      action: () => console.log('Navigate to research dashboard'),
      color: 'blue',
      badge: 'Academia'
    },
    {
      icon: Building,
      title: 'Government Portal',
      description: 'Regional monitoring and farmer support',
      features: ['Analytics', 'Policy Tools', 'Data Export'],
      cta: 'Access Portal (Proto Available)',
      action: openGovernmentDashboard,
      color: 'purple',
      badge: 'Secure'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowExpertModal(false);
        setShowApiModal(false);
      }
    };

    if (showExpertModal || showApiModal) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [showExpertModal, showApiModal]);

  return (
    <>
      <section className={styles.ctaBanner} ref={sectionRef}>
        <div className={styles.container}>
          {/* Header */}
          <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.badge}>
              <Smartphone className={styles.badgeIcon} />
              <span>Ready to Transform Agriculture?</span>
            </div>
            
            <h2 className={styles.title}>
              Choose Your <span className={styles.highlight}>Dashboard</span>
            </h2>
            
            <p className={styles.subtitle}>
              Join thousands using AI to revolutionize Indian agriculture. 
              Select your role and start transforming farming today.
            </p>
          </div>

          {/* CTA Cards */}
          <div className={`${styles.ctaGrid} ${isVisible ? styles.visible : ''}`}>
            {ctaOptions.map((option, index) => (
              <div
                key={index}
                className={`${styles.ctaCard} ${styles[option.color]}`}
                style={{ '--delay': `${index * 0.15}s` } as React.CSSProperties}
              >
                <div className={styles.cardBadge}>{option.badge}</div>

                <div className={styles.cardIcon}>
                  <option.icon className={styles.icon} />
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{option.title}</h3>
                  <p className={styles.cardDescription}>{option.description}</p>

                  <div className={styles.featuresList}>
                    {option.features.map((feature, i) => (
                      <span key={i} className={styles.feature}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button onClick={option.action} className={styles.cardCta}>
                  <span>{option.cta}</span>
                  <ArrowRight className={styles.ctaIcon} />
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className={`${styles.bottomActions} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.actionContent}>
              <h3 className={styles.actionTitle}>Need Help Choosing?</h3>
              <p className={styles.actionDescription}>
                Speak with our experts to find the right solution
              </p>
            </div>
            
            <div className={styles.actionButtons}>
              <button 
                className={styles.primaryBtn}
                onClick={() => setShowExpertModal(true)}
              >
                Talk to Team
              </button>
              <button 
                className={styles.secondaryBtn}
                onClick={() => setShowApiModal(true)}
              >
                View API Docs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Modal */}
      {showExpertModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '1rem'
          }}
          onClick={() => setShowExpertModal(false)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '16px',
              width: '90vw',
              maxWidth: '900px',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              zIndex: 100000
            }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '1.5rem 1.5rem 1rem 1.5rem',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: '0 0 0.5rem 0'
                }}>Talk to Our Team</h2>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: '0'
                }}>
                  Connect with our agricultural technology specialists
                </p>
              </div>
              <button 
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.4rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
                onClick={() => setShowExpertModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              padding: '1.5rem'
            }}>
              {experts.map((expert) => (
                <div key={expert.id} style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '1.2rem'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '0.8rem',
                    marginBottom: '1.2rem'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '1.1rem',
                      color: 'white'
                    }}>
                      <span>{expert.avatar}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: '0 0 0.2rem 0'
                      }}>{expert.name}</h3>
                      <p style={{
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        color: '#3b82f6',
                        margin: '0 0 0.4rem 0'
                      }}>{expert.role}</p>
                      <p style={{
                        fontSize: '0.72rem',
                        color: '#6b7280',
                        margin: '0'
                      }}>{expert.expertise}</p>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}>
                    <button 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.6rem 0.8rem',
                        border: '1px solid #d1fae5',
                        borderRadius: '8px',
                        background: '#f0fdf4',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        width: '100%',
                        color: '#059669'
                      }}
                      onClick={() => handleCallExpert(expert.phone)}
                    >
                      <Phone size={16} />
                      <span style={{ flex: 1 }}>{expert.phone}</span>
                    </button>
                    
                    <button 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.6rem 0.8rem',
                        border: '1px solid #dbeafe',
                        borderRadius: '8px',
                        background: '#eff6ff',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        width: '100%',
                        color: '#3b82f6'
                      }}
                      onClick={() => handleEmailExpert(expert.email)}
                    >
                      <Mail size={16} />
                      <span style={{ flex: 1 }}>Email</span>
                    </button>
                    
                    <button 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.6rem 0.8rem',
                        border: '1px solid #dcfce7',
                        borderRadius: '8px',
                        background: '#f0fdf4',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        width: '100%',
                        color: '#16a34a'
                      }}
                      onClick={() => handleWhatsAppExpert(expert.phone)}
                    >
                      <MessageCircle size={16} />
                      <span style={{ flex: 1 }}>WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* API Documentation Modal - FIXED SIZE VERSION */}
      {showApiModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '1rem'
          }}
          onClick={() => setShowApiModal(false)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '16px',
              width: '95vw',
              maxWidth: '1200px',
              height: '85vh',
              minHeight: '600px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              position: 'relative'
            }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Left Sidebar - FIXED HEIGHT */}
            <div style={{
              width: '280px',
              height: '100%',
              background: '#f8fafc',
              borderRight: '1px solid #e2e8f0',
              borderRadius: '16px 0 0 16px',
              overflow: 'auto',
              flexShrink: 0
            }}>
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid #e2e8f0',
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                color: 'white',
                position: 'sticky',
                top: 0,
                zIndex: 1
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  margin: 0,
                  marginBottom: '0.25rem'
                }}>FieldSense API</h3>
                <p style={{
                  fontSize: '0.85rem',
                  margin: 0,
                  opacity: 0.9
                }}>FPI v1.0 Documentation</p>
              </div>
              
              <div style={{ padding: '1rem 0' }}>
                {[
                  { id: 'overview', title: 'Overview' },
                  { id: 'authentication', title: 'Authentication' },
                  { id: 'endpoints', title: 'API Endpoints' },
                  { id: 'examples', title: 'Code Examples' },
                  { id: 'responses', title: 'Response Format' },
                  { id: 'errors', title: 'Error Codes' },
                  { id: 'limits', title: 'Rate Limits' }
                ].map((section) => (
                  <div
                    key={section.id}
                    style={{
                      padding: '0.75rem 1.5rem',
                      cursor: 'pointer',
                      borderLeft: activeApiSection === section.id ? '3px solid #16a34a' : '3px solid transparent',
                      background: activeApiSection === section.id ? '#f0fdf4' : 'transparent',
                      fontSize: '0.9rem',
                      fontWeight: activeApiSection === section.id ? '600' : '500',
                      color: activeApiSection === section.id ? '#16a34a' : '#374151',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setActiveApiSection(section.id)}
                  >
                    {section.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - FIXED HEIGHT */}
            <div style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Header - FIXED HEIGHT */}
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'white',
                flexShrink: 0,
                height: '100px'
              }}>
                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: 0,
                    marginBottom: '0.25rem'
                  }}>FieldSense API Documentation</h2>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#6b7280',
                    margin: 0
                  }}>AI-powered agricultural insights for Indian farming</p>
                </div>
                <button 
                  style={{
                    background: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                  onClick={() => setShowApiModal(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content Area - SCROLLABLE WITH FIXED HEIGHT */}
              <div style={{
                flex: 1,
                overflow: 'auto',
                padding: '2rem',
                height: 'calc(100% - 100px)'
              }}>
                {activeApiSection === 'overview' && (
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                      API Overview
                    </h3>
                    
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      FieldSense API (FPI) provides AI-powered agricultural insights for Indian agriculture. 
                      Access real-time crop analysis, soil health data, weather information, and satellite imagery.
                    </p>

                    <div style={{
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '8px',
                      padding: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#16a34a' }}>Base URL</h4>
                      <div style={{
                        background: '#1f2937',
                        color: '#f9fafb',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span>https://api.fieldsense.ai/v1</span>
                        <button
                          onClick={() => copyToClipboard('https://api.fieldsense.ai/v1')}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#9ca3af',
                            cursor: 'pointer'
                          }}
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Key Features
                      </h4>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1rem'
                      }}>
                        {[
                          { title: 'Soil Analysis', desc: 'AI-powered NPK analysis and soil health monitoring' },
                          { title: 'Crop Health', desc: 'Real-time crop condition assessment and yield prediction' },
                          { title: 'Pest Detection', desc: 'Early pest identification with treatment recommendations' },
                          { title: 'Weather Data', desc: 'Comprehensive weather forecasts and historical data' }
                        ].map((feature, index) => (
                          <div key={index} style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '1rem'
                          }}>
                            <h5 style={{
                              fontSize: '1rem',
                              fontWeight: '600',
                              marginBottom: '0.5rem'
                            }}>{feature.title}</h5>
                            <p style={{
                              fontSize: '0.85rem',
                              color: '#6b7280',
                              margin: 0
                            }}>{feature.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: '8px',
                      padding: '1rem'
                    }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#3b82f6' }}>
                        Getting Started
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#1e40af' }}>
                        Sign up for free and get 1,000 API calls per month to start building with FieldSense.
                      </p>
                    </div>
                  </div>
                )}

                {activeApiSection === 'authentication' && (
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                      Authentication
                    </h3>
                    
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      FieldSense API uses API key authentication. Include your API key in the Authorization header of all requests.
                    </p>

                    <div style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <h4 style={{ marginBottom: '1rem' }}>Authentication Header</h4>
                      <div style={{
                        background: '#1f2937',
                        color: '#f9fafb',
                        padding: '1rem',
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span>Authorization: Bearer fpi_live_sk_1234567890abcdef</span>
                        <button
                          onClick={() => copyToClipboard('Authorization: Bearer fpi_live_sk_1234567890abcdef')}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#9ca3af',
                            cursor: 'pointer'
                          }}
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>

                    <div style={{
                      background: '#fef3c7',
                      border: '1px solid #fcd34d',
                      borderRadius: '8px',
                      padding: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#d97706' }}>
                        Security Notice
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#92400e' }}>
                        Keep your API keys secure and never expose them in client-side code. Use environment variables or secure key management systems.
                      </p>
                    </div>

                    <div style={{
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '8px',
                      padding: '1rem'
                    }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#16a34a' }}>
                        API Key Format
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#15803d' }}>
                        API keys start with 'fpi_live_' for production and 'fpi_test_' for testing environments.
                      </p>
                    </div>
                  </div>
                )}

                {activeApiSection === 'endpoints' && (
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                      API Endpoints
                    </h3>
                    
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      FieldSense API provides several endpoints for different agricultural data and analysis needs.
                    </p>
                    
                    <div>
                      {[
                        {
                          method: 'POST',
                          endpoint: '/v1/analyze/soil',
                          description: 'Analyze soil composition and health from image data. Returns NPK levels, pH, and recommendations.'
                        },
                        {
                          method: 'POST',
                          endpoint: '/v1/analyze/crop',
                          description: 'Assess crop health and predict yield potential using satellite or ground imagery.'
                        },
                        {
                          method: 'GET',
                          endpoint: '/v1/weather/{location}',
                          description: 'Get real-time weather data and 7-day forecast for specific coordinates.'
                        },
                        {
                          method: 'GET',
                          endpoint: '/v1/satellite/{coords}',
                          description: 'Access high-resolution satellite imagery and NDVI analysis data.'
                        },
                        {
                          method: 'POST',
                          endpoint: '/v1/pest/detect',
                          description: 'Identify pests and diseases from crop images with treatment recommendations.'
                        },
                        {
                          method: 'GET',
                          endpoint: '/v1/market/prices',
                          description: 'Get current market prices for agricultural commodities by region.'
                        }
                      ].map((endpoint, index) => (
                        <div key={index} style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '1.5rem',
                          marginBottom: '1rem'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '0.75rem'
                          }}>
                            <span style={{
                              background: endpoint.method === 'GET' ? '#dcfce7' : '#fef3c7',
                              color: endpoint.method === 'GET' ? '#16a34a' : '#d97706',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}>
                              {endpoint.method}
                            </span>
                            <code style={{
                              background: '#1f2937',
                              color: '#f9fafb',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '4px',
                              fontSize: '0.9rem'
                            }}>
                              {endpoint.endpoint}
                            </code>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.5' }}>
                            {endpoint.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeApiSection === 'examples' && (
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                      Code Examples
                    </h3>

                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      Here are practical examples showing how to integrate FieldSense API in different programming languages.
                    </p>

                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>Python Example</h4>
                      <div style={{
                        background: '#1f2937',
                        color: '#f9fafb',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        lineHeight: '1.6',
                        position: 'relative'
                      }}>
                        <button
                          onClick={() => copyToClipboard(`import requests

# Initialize FieldSense API
api_key = "your_fpi_key_here"
headers = {"Authorization": f"Bearer {api_key}"}

# Get soil analysis
response = requests.post(
    "https://api.fieldsense.ai/v1/analyze/soil",
    headers=headers,
    json={
        "location": {"lat": 19.0760, "lng": 72.8777},
        "image_url": "your_soil_image.jpg"
    }
)

result = response.json()
print(f"Soil Health: {result['health_score']}")
print(f"NPK: {result['nutrients']}")`)}
                          style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: '#374151',
                            border: 'none',
                            color: '#9ca3af',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            borderRadius: '4px'
                          }}
                        >
                          <Copy size={16} />
                        </button>
{`import requests

# Initialize FieldSense API
api_key = "your_fpi_key_here"
headers = {"Authorization": f"Bearer {api_key}"}

# Get soil analysis
response = requests.post(
    "https://api.fieldsense.ai/v1/analyze/soil",
    headers=headers,
    json={
        "location": {"lat": 19.0760, "lng": 72.8777},
        "image_url": "your_soil_image.jpg"
    }
)

result = response.json()
print(f"Soil Health: {result['health_score']}")
print(f"NPK: {result['nutrients']}")`}
                      </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>JavaScript Example</h4>
                      <div style={{
                        background: '#1f2937',
                        color: '#f9fafb',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        position: 'relative'
                      }}>
                        <button
                          onClick={() => copyToClipboard(`const API_KEY = 'your_fpi_key_here';

const analyzeSoil = async () => {
  try {
    const response = await fetch('https://api.fieldsense.ai/v1/analyze/soil', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: { lat: 19.0760, lng: 72.8777 },
        image_url: 'your_soil_image.jpg'
      })
    });
    
    const result = await response.json();
    console.log('Soil Health:', result.health_score);
    console.log('NPK:', result.nutrients);
  } catch (error) {
    console.error('Error:', error);
  }
};`)}
                          style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: '#374151',
                            border: 'none',
                            color: '#9ca3af',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            borderRadius: '4px'
                          }}
                        >
                          <Copy size={16} />
                        </button>
{`const API_KEY = 'your_fpi_key_here';

const analyzeSoil = async () => {
  try {
    const response = await fetch('https://api.fieldsense.ai/v1/analyze/soil', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: { lat: 19.0760, lng: 72.8777 },
        image_url: 'your_soil_image.jpg'
      })
    });
    
    const result = await response.json();
    console.log('Soil Health:', result.health_score);
    console.log('NPK:', result.nutrients);
  } catch (error) {
    console.error('Error:', error);
  }
};`}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>cURL Example</h4>
                      <div style={{
                        background: '#1f2937',
                        color: '#f9fafb',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        position: 'relative'
                      }}>
                        <button
                          onClick={() => copyToClipboard(`curl -X POST "https://api.fieldsense.ai/v1/analyze/soil" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "location": {"lat": 19.0760, "lng": 72.8777},
    "image_url": "your_soil_image.jpg"
  }'`)}
                          style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: '#374151',
                            border: 'none',
                            color: '#9ca3af',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            borderRadius: '4px'
                          }}
                        >
                          <Copy size={16} />
                        </button>
{`curl -X POST "https://api.fieldsense.ai/v1/analyze/soil" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "location": {"lat": 19.0760, "lng": 72.8777},
    "image_url": "your_soil_image.jpg"
  }'`}
                      </div>
                    </div>
                  </div>
                )}

                {activeApiSection === 'responses' && (
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                      Response Format
                    </h3>
                    
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      All API responses follow a consistent JSON format with standard HTTP status codes for easy integration.
                    </p>

                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>Success Response (200)</h4>
                      <div style={{
                        background: '#1f2937',
                        color: '#f9fafb',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem'
                      }}>
{`{
  "success": true,
  "data": {
    "health_score": 85,
    "nutrients": {
      "nitrogen": 45,
      "phosphorus": 23,
      "potassium": 38
    },
    "ph_level": 6.8,
    "moisture": 42,
    "recommendations": [
      "Add organic matter to improve soil structure",
      "Consider phosphorus supplementation",
      "Maintain current irrigation schedule"
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "request_id": "req_1234567890"
}`}
                      </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>Error Response (400)</h4>
                      <div style={{
                        background: '#1f2937',
                        color: '#f9fafb',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem'
                      }}>
{`{
  "success": false,
  "error": {
    "code": "INVALID_LOCATION",
    "message": "Invalid latitude or longitude provided",
    "details": "Latitude must be between -90 and 90, longitude between -180 and 180"
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "request_id": "req_1234567891"
}`}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>Response Fields</h4>
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '1rem'
                      }}>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                          <li><strong>success</strong>: Boolean indicating if the request was successful</li>
                          <li><strong>data</strong>: Contains the actual response data when successful</li>
                          <li><strong>error</strong>: Contains error information when request fails</li>
                          <li><strong>timestamp</strong>: ISO 8601 timestamp of the response</li>
                          <li><strong>request_id</strong>: Unique identifier for request tracking</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeApiSection === 'errors' && (
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                      Error Codes
                    </h3>
                    
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      FieldSense API uses conventional HTTP response codes and provides detailed error messages to help you debug integration issues.
                    </p>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      {[
                        { code: '200', title: 'OK', desc: 'Request successful', type: 'success' },
                        { code: '400', title: 'Bad Request', desc: 'Invalid request parameters or malformed JSON', type: 'error' },
                        { code: '401', title: 'Unauthorized', desc: 'Invalid or missing API key', type: 'error' },
                        { code: '403', title: 'Forbidden', desc: 'API key lacks required permissions for this endpoint', type: 'error' },
                        { code: '404', title: 'Not Found', desc: 'Requested resource or endpoint does not exist', type: 'error' },
                        { code: '429', title: 'Too Many Requests', desc: 'Rate limit exceeded, please slow down requests', type: 'error' },
                        { code: '500', title: 'Internal Server Error', desc: 'Server error occurred, please try again later', type: 'error' }
                      ].map((error) => (
                        <div key={error.code} style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '1rem'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem'
                          }}>
                            <span style={{
                              background: error.type === 'success' ? '#dcfce7' : '#fef2f2',
                              color: error.type === 'success' ? '#16a34a' : '#dc2626',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}>
                              {error.code}
                            </span>
                            <span style={{ fontWeight: '600' }}>{error.title}</span>
                          </div>
                          <p style={{
                            fontSize: '0.85rem',
                            color: '#6b7280',
                            margin: 0,
                            lineHeight: '1.4'
                          }}>{error.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div style={{
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: '8px',
                      padding: '1rem'
                    }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#3b82f6' }}>
                        Error Handling Best Practices
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#1e40af', lineHeight: '1.6' }}>
                        <li>Always check the response status code before processing data</li>
                        <li>Implement exponential backoff for rate limit (429) errors</li>
                        <li>Log request_id for easier debugging and support</li>
                        <li>Handle network errors gracefully with proper timeouts</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeApiSection === 'limits' && (
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                      Rate Limits & Pricing
                    </h3>
                    
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      API requests are limited based on your subscription tier to ensure fair usage and optimal performance for all users.
                    </p>

                    <div style={{
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <h4 style={{ margin: '0 0 1rem 0', color: '#16a34a', fontSize: '1.2rem' }}>Free Tier</h4>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#16a34a' }}>1,000</div>
                          <div style={{ fontSize: '0.9rem', color: '#15803d' }}>API calls/month</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#16a34a' }}>10</div>
                          <div style={{ fontSize: '0.9rem', color: '#15803d' }}>requests/minute</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#16a34a' }}>Basic</div>
                          <div style={{ fontSize: '0.9rem', color: '#15803d' }}>support</div>
                        </div>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#15803d' }}>
                        <li>Perfect for testing and small projects</li>
                        <li>All core API endpoints included</li>
                        <li>Community support</li>
                      </ul>
                    </div>

                    <div style={{
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <h4 style={{ margin: '0 0 1rem 0', color: '#3b82f6', fontSize: '1.2rem' }}>Pro Tier - ₹2,999/month</h4>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>50,000</div>
                          <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>API calls/month</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>100</div>
                          <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>requests/minute</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>Priority</div>
                          <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>processing</div>
                        </div>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#1e40af' }}>
                        <li>Suitable for production applications</li>
                        <li>Advanced analytics endpoints</li>
                        <li>Email support with 24h response</li>
                        <li>Historical data access</li>
                      </ul>
                    </div>

                    <div style={{
                      background: '#faf5ff',
                      border: '1px solid #d8b4fe',
                      borderRadius: '8px',
                      padding: '1.5rem'
                    }}>
                      <h4 style={{ margin: '0 0 1rem 0', color: '#7c3aed', fontSize: '1.2rem' }}>Enterprise - Custom Pricing</h4>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#7c3aed' }}>Custom</div>
                          <div style={{ fontSize: '0.9rem', color: '#6b21a8' }}>volume limits</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#7c3aed' }}>Unlimited</div>
                          <div style={{ fontSize: '0.9rem', color: '#6b21a8' }}>rate limits</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#7c3aed' }}>Dedicated</div>
                          <div style={{ fontSize: '0.9rem', color: '#6b21a8' }}>support</div>
                        </div>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#6b21a8' }}>
                        <li>Custom integrations and endpoints</li>
                        <li>SLA guarantees and uptime commitments</li>
                        <li>Phone and video call support</li>
                        <li>Custom model training</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CTABanner;