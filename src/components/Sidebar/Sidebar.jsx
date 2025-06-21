import {
  Search,
  Home,
  Heart,
  LogIn,
  LogOut,
  X,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Sidebar.css";
import axios from "axios";

export function Sidebar({
  className = "",
  onMenuClick,
  activeMenu = "home",
  user,
  onLogin,
  onLogout,
  isCollapsed = false,
  onToggleCollapse,
}) {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const baseMenuItems = [
    { id: "search", icon: Search, label: "Search", url: "/search-page" },
    { id: "home", icon: Home, label: "Home", url: "/home" },
    { id: "favourite", icon: Heart, label: "Favourite", url: "/favorites" },
  ];

  const menuItems = [
    ...baseMenuItems,
    ...(!user
      ? [{ id: "login", icon: LogIn, label: "Login", url: "/auth" }]
      : []),
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const toastId = toast.loading("Logging out...");

    try {
      const token = localStorage.getItem("token");
      await axios.post("/user/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem("token");
      onLogout?.();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout properly");
      onLogout?.();
    } finally {
      setIsLoggingOut(false);
      toast.dismiss(toastId);
    }
  };

  const handleMenuClick = (menuId) => {
    const selectedItem = menuItems.find((item) => item.id === menuId);
    if (selectedItem?.url) {
      navigate(selectedItem.url);
    }
    onMenuClick?.(menuId);
  };

  useEffect(() => {
    if (isCollapsed) {
      setShowUserPopup(false);
    }
  }, [isCollapsed]);

  return (
    <>
      <button
        className={`sidebar-toggle-btn ${
          isCollapsed ? "sidebar-toggle-btn--collapsed" : ""
        }`}
        onClick={onToggleCollapse}
        aria-label={isCollapsed ? "Show sidebar" : "Hide sidebar"}
        title={isCollapsed ? "Show sidebar" : "Hide sidebar"}
      >
        {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
      </button>

      <div
        className={`sidebar-container ${
          isCollapsed ? "sidebar-container--collapsed" : ""
        } ${className}`}
      >
        <nav className="sidebar-nav">
          <div className="sidebar-menu-items">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`sidebar-menu-btn ${
                  activeMenu === item.id ? "sidebar-menu-btn--active" : ""
                }`}
                aria-label={item.label}
                title={item.label}
              >
                <item.icon size={18} strokeWidth={1.5} />
              </button>
            ))}
          </div>

          {user && (
            <div className="sidebar-user-section">
              <div
                className="sidebar-user-avatar"
                onClick={() => setShowUserPopup(!showUserPopup)}
              >
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : user.email.charAt(0).toUpperCase()}
              </div>

              {showUserPopup && (
                <div className="sidebar-user-popup">
                  <div className="sidebar-user-name">
                    {user.name || user.email}
                  </div>
                  {user.email && (
                    <div className="sidebar-user-email">{user.email}</div>
                  )}
                  <button
                    className="sidebar-logout-btn"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    <LogOut size={16} />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;