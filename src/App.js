import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import EmailGenerator from "./EmailGenerator";
import Workflow from "./Workflow";
import "./App.css";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark");
    };

    return (
        <Router>
            <div className={`app-container ${darkMode ? "dark" : ""}`}>
                <nav className="navbar">
                    <h1 className="navbar-title">Email Generator</h1>
                    <div className="nav-links">
                        <Link to="/home" className="nav-link">Home</Link>
                        <Link to="/workflow" className="nav-link">Workflow</Link>
                        <button className="theme-toggle" onClick={toggleDarkMode}>
                            {darkMode ? (
                                <>
                                    <span>☀️</span> Light Mode
                                </>
                            ) : (
                                <>
                                    <span>🌙</span> Dark Mode
                                </>
                            )}
                        </button>
                    </div>
                </nav>
                <Routes>
                    <Route path="/home" element={<EmailGenerator />} />
                    <Route path="/workflow" element={<Workflow />} />
                    <Route path="*" element={<Navigate to="/home" replace />} /> {/* Redirect invalid URLs to Home */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
