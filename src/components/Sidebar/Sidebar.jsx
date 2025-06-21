// import {
//   Search,
//   Home,
//   Heart,
//   LogIn,
//   LogOut,
//   X,
//   Menu,
//   ChevronLeft,
// } from "lucide-react";
// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Sidebar.css";
// import axios from "axios";

// export function Sidebar({
//   className = "",
//   onMenuClick,
//   activeMenu = "home",
//   user,
//   onLogin,
//   onLogout,
//   isCollapsed = false,
//   onToggleCollapse,
// }) {
//   const [showUserPopup, setShowUserPopup] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
//   const [isGoogleButtonLoading, setIsGoogleButtonLoading] = useState(false);
//   const googleSignInButtonRef = useRef(null);
//   const navigate = useNavigate();

//   const baseMenuItems = [
//     { id: "search", icon: Search, label: "Search", url: "/search-page" },
//     { id: "home", icon: Home, label: "Home", url: "/home" },
//     { id: "favourite", icon: Heart, label: "Favourite", url: "/favorites" },
//   ];

//   const menuItems = [
//     ...baseMenuItems,
//     ...(!user
//       ? [{ id: "login", icon: LogIn, label: "Login with Google" }]
//       : []),
//   ];

//   useEffect(() => {
//     if (!user && !window.googleSignInInitialized) {
//       const initializeGoogleSignIn = () => {
//         if (window.google?.accounts?.id) {
//           window.google.accounts.id.initialize({
//             client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//             callback: handleCredentialResponse,
//             ux_mode: "popup",
//           });
//           window.googleSignInInitialized = true;
//         }
//       };

//       if (
//         !document.querySelector(
//           'script[src="https://accounts.google.com/gsi/client"]'
//         )
//       ) {
//         const script = document.createElement("script");
//         script.src = "https://accounts.google.com/gsi/client";
//         script.async = true;
//         script.defer = true;
//         script.onload = initializeGoogleSignIn;
//         document.body.appendChild(script);
//       } else if (window.google?.accounts?.id) {
//         initializeGoogleSignIn();
//       }
//     }
//   }, [user]);

//   useEffect(() => {
//     if (
//       showGoogleSignIn &&
//       window.google?.accounts?.id &&
//       googleSignInButtonRef.current &&
//       !googleSignInButtonRef.current.hasChildNodes()
//     ) {
//       window.google.accounts.id.renderButton(googleSignInButtonRef.current, {
//         theme: "outline",
//         size: "large",
//         width: "200",
//       });

//       setIsGoogleButtonLoading(false);
//     }
//   }, [showGoogleSignIn]);

//   const handleGoogleSignIn = () => {
//     if (!showGoogleSignIn) {
//       setShowGoogleSignIn(true);
//       setIsGoogleButtonLoading(true);
//     }

//     if (!window.google?.accounts?.id) {
//       toast.error("Google sign-in not loaded yet. Please wait...");
//       return;
//     }
//   };

//   const handleCredentialResponse = async (response) => {
//     const toastId = toast.loading("Authenticating...");

//     try {
//       const backendResponse = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/user/auth/google`,
//         { token: response.credential },
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!backendResponse.data.user) throw new Error("Authentication failed");

//       onLogin?.(backendResponse.data.user);
//       setShowGoogleSignIn(false);
//       toast.success(
//         `Welcome ${
//           backendResponse.data.user.name || backendResponse.data.user.email
//         }!`
//       );
//     } catch (error) {
//       console.error("Login failed:", error);
//       toast.error(error.message || "Login failed");
//     } finally {
//       toast.dismiss(toastId);
//     }
//   };

//   const handleLogout = async () => {
//     setIsLoggingOut(true);
//     const toastId = toast.loading("Logging out...");

//     try {
//       await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/user/auth/logout`,
//         {},
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       onLogout?.();
//       toast.success("Logged out successfully");
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error("Failed to logout properly");
//       onLogout?.();
//     } finally {
//       setIsLoggingOut(false);
//       toast.dismiss(toastId);
//     }
//   };

//   const handleMenuClick = (menuId) => {
//     if (menuId === "login") {
//       handleGoogleSignIn();
//       return;
//     }

//     const selectedItem = menuItems.find((item) => item.id === menuId);
//     if (selectedItem?.url) {
//       navigate(selectedItem.url);
//     }
//     onMenuClick?.(menuId);
//   };

//   useEffect(() => {
//     if (isCollapsed) {
//       setShowUserPopup(false);
//       setShowGoogleSignIn(false);
//     }
//   }, [isCollapsed]);

//   return (
//     <>
//       <button
//         className={`sidebar-toggle-btn ${
//           isCollapsed ? "sidebar-toggle-btn--collapsed" : ""
//         }`}
//         onClick={onToggleCollapse}
//         aria-label={isCollapsed ? "Show sidebar" : "Hide sidebar"}
//         title={isCollapsed ? "Show sidebar" : "Hide sidebar"}
//       >
//         {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
//       </button>

//       <div
//         className={`sidebar-container ${
//           isCollapsed ? "sidebar-container--collapsed" : ""
//         } ${className}`}
//       >
//         <nav className="sidebar-nav">
//           <div className="sidebar-menu-items">
//             {menuItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => handleMenuClick(item.id)}
//                 className={`sidebar-menu-btn ${
//                   activeMenu === item.id ? "sidebar-menu-btn--active" : ""
//                 }`}
//                 aria-label={item.label}
//                 title={item.label}
//               >
//                 <item.icon size={18} strokeWidth={1.5} />
//               </button>
//             ))}
//           </div>

//           {user && (
//             <div className="sidebar-user-section">
//               <div
//                 className="sidebar-user-avatar"
//                 onClick={() => setShowUserPopup(!showUserPopup)}
//               >
//                 {user.picture ? (
//                   <img
//                     src={user.picture || "/placeholder.svg"}
//                     alt="Profile"
//                     className="sidebar-user-avatar-img"
//                   />
//                 ) : (
//                   user.email.charAt(0).toUpperCase()
//                 )}
//               </div>

//               {showUserPopup && (
//                 <div className="sidebar-user-popup">
//                   <div className="sidebar-user-email">{user.email}</div>
//                   <button
//                     className="sidebar-logout-btn"
//                     onClick={handleLogout}
//                     disabled={isLoggingOut}
//                   >
//                     <LogOut size={16} />
//                     {isLoggingOut ? "Logging out..." : "Logout"}
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </nav>

//         {showGoogleSignIn && (
//           <div className="sidebar-google-signin-popup">
//             <div className="sidebar-google-signin-header">
//               <h3 className="sidebar-google-signin-title">
//                 Sign in with Google
//               </h3>
//               <button
//                 onClick={() => setShowGoogleSignIn(false)}
//                 className="sidebar-google-signin-close"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {isGoogleButtonLoading && (
//               <div className="sidebar-google-signin-loading">
//                 Loading Google Sign-In...
//               </div>
//             )}

//             <div
//               ref={googleSignInButtonRef}
//               className="sidebar-google-signin-button"
//             />
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Sidebar;















import { Search, Home, Heart, LogIn, LogOut, X, Menu, ChevronLeft } from "lucide-react";
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

  const menuItems = [...baseMenuItems, ...(!user ? [{ id: "login", icon: LogIn, label: "Login", url: "/auth" }] : [])];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const toastId = toast.loading("Logging out...");

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/auth/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      localStorage.removeItem('token');
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
        className={`sidebar-toggle-btn ${isCollapsed ? "sidebar-toggle-btn--collapsed" : ""}`}
        onClick={onToggleCollapse}
        aria-label={isCollapsed ? "Show sidebar" : "Hide sidebar"}
        title={isCollapsed ? "Show sidebar" : "Hide sidebar"}
      >
        {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
      </button>

      <div className={`sidebar-container ${isCollapsed ? "sidebar-container--collapsed" : ""} ${className}`}>
        <nav className="sidebar-nav">
          <div className="sidebar-menu-items">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`sidebar-menu-btn ${activeMenu === item.id ? "sidebar-menu-btn--active" : ""}`}
                aria-label={item.label}
                title={item.label}
              >
                <item.icon size={18} strokeWidth={1.5} />
              </button>
            ))}
          </div>

          {user && (
            <div className="sidebar-user-section">
              <div className="sidebar-user-avatar" onClick={() => setShowUserPopup(!showUserPopup)}>
                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </div>

              {showUserPopup && (
                <div className="sidebar-user-popup">
                  <div className="sidebar-user-name">{user.name || user.email}</div>
                  {user.email && <div className="sidebar-user-email">{user.email}</div>}
                  <button className="sidebar-logout-btn" onClick={handleLogout} disabled={isLoggingOut}>
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






