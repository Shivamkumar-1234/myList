import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Layout.css";

// Configure axios defaults
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

function Layout() {
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState("home");
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  };

  const setUserState = (userData, token) => {
    if (userData && token) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setAuthToken(token);
    } else {
      setUser(null);
      localStorage.removeItem("user");
      setAuthToken(null);
    }
  };

  const verifyAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUserState(null);
        return null;
      }

      const response = await axios.get("/user/auth/verify");
      
      if (response.data.user) {
        setUserState(response.data.user, response.data.token);
        return response.data.user;
      }
      return null;
    } catch (error) {
      console.error("Session verification failed:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        setUserState(null);
      }
      return null;
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    const verifyAndInitialize = async () => {
      // Check for existing user in localStorage
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");
      
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setAuthToken(savedToken);
      }
      
      await verifyAuth();
    };

    verifyAndInitialize();
    
   
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      setIsSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  const handleLogin = (userData, token) => {
    setUserState(userData, token);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/user/auth/logout");
      setUserState(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout properly");
      setUserState(null);
    }
  };

  const handleToggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  if (isVerifying) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className="layout">
      <Sidebar
        activeMenu={activeMenu}
        onMenuClick={setActiveMenu}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      <div className={`layout-content-wrapper ${
        isSidebarCollapsed ? "layout-content-wrapper--expanded" : ""
      }`}>
        <main className="content">
          <Outlet context={{ user, verifyAuth, handleLogin }} />
        </main>
        <Footer />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Layout;