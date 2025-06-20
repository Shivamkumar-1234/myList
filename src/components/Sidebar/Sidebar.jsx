// import { Search, Home, Heart, LogIn, LogOut, X } from "lucide-react";
// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export function Sidebar({
//   className = "",
//   onMenuClick,
//   activeMenu = "home",
//   user,
//   onLogin,
//   onLogout,
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

//   // Initialize Google Sign-In
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

//   // Render Google Sign-In button
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
//       const backendResponse = await fetch(
//         `${process.env.REACT_APP_BACKEND_URL}/user/auth/google`,
//         {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ token: response.credential }),
//         }
//       );

//       if (!backendResponse.ok) throw new Error("Authentication failed");

//       const data = await backendResponse.json();
//       onLogin?.(data.user);
//       setShowGoogleSignIn(false);
//       toast.success(`Welcome ${data.user.name || data.user.email}!`);
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
//       await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });

//       onLogout?.();
//       toast.success("Logged out successfully");
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.info("Logout completed (backend may not have received)");
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

//   // Styles
//   const sidebarStyle = {
//     position: "fixed",
//     left: 0,
//     top: 0,
//     zIndex: 50,
//     height: "100vh",
//     width: "64px",
//     background: "linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)",
//     borderRight: "1px solid #1a1a1a",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     paddingTop: "16px",
//     paddingBottom: "16px",
//     transition: "all 0.3s ease-in-out",
//     boxShadow: "inset -1px 0 0 rgba(255, 255, 255, 0.05)",
//   };

//   const navStyle = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "8px",
//     width: "100%",
//     paddingLeft: "8px",
//     paddingRight: "8px",
//     marginTop: "16px",
//     height: "100%",
//   };

//   const getButtonStyle = (isActive) => ({
//     position: "relative",
//     width: "48px",
//     height: "48px",
//     borderRadius: "8px",
//     transition: "all 0.2s ease",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: isActive ? "#1a1a1a" : "transparent",
//     color: isActive ? "#ffffff" : "#808080",
//     border: "none",
//     cursor: "pointer",
//     outline: "none",
//   });

//   const userAvatarStyle = {
//     position: "relative",
//     width: "36px",
//     height: "36px",
//     borderRadius: "50%",
//     overflow: "hidden",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#3f51b5",
//     color: "white",
//     fontWeight: "bold",
//     fontSize: "16px",
//     cursor: "pointer",
//   };

//   const userPopupStyle = {
//     position: "absolute",
//     bottom: "70px",
//     left: "70px",
//     width: "200px",
//     backgroundColor: "#1a1a1a",
//     borderRadius: "8px",
//     padding: "12px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     zIndex: 100,
//     border: "1px solid #2d2d2d",
//   };

//   const userEmailStyle = {
//     color: "#e0e0e0",
//     fontSize: "14px",
//     marginBottom: "12px",
//     wordBreak: "break-all",
//     paddingBottom: "8px",
//     borderBottom: "1px solid #2d2d2d",
//   };

//   const logoutButtonStyle = {
//     width: "100%",
//     padding: "8px",
//     backgroundColor: "transparent",
//     color: "#ff4d4f",
//     border: "1px solid #ff4d4f",
//     borderRadius: "4px",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "8px",
//   };

//   return (
//     <div style={sidebarStyle} className={className}>
//       <nav style={navStyle}>
//         <div style={{ flex: 1 }}>
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => handleMenuClick(item.id)}
//               style={getButtonStyle(activeMenu === item.id)}
//               aria-label={item.label}
//               title={item.label}
//             >
//               <item.icon size={18} strokeWidth={1.5} />
//             </button>
//           ))}
//         </div>

//         {user && (
//           <div style={{ position: "relative" }}>
//             <div
//               style={userAvatarStyle}
//               onClick={() => setShowUserPopup(!showUserPopup)}
//             >
//               {user.picture ? (
//                 <img
//                   src={user.picture}
//                   alt="Profile"
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 />
//               ) : (
//                 user.email.charAt(0).toUpperCase()
//               )}
//             </div>

//             {showUserPopup && (
//               <div style={userPopupStyle}>
//                 <div style={userEmailStyle}>{user.email}</div>
//                 <button
//                   style={logoutButtonStyle}
//                   onClick={handleLogout}
//                   disabled={isLoggingOut}
//                 >
//                   <LogOut size={16} />
//                   {isLoggingOut ? "Logging out..." : "Logout"}
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* Google Sign-In Popup */}
//       {showGoogleSignIn && (
//         <div
//           style={{
//             position: "fixed",
//             left: "80px",
//             top: "20px",
//             zIndex: 100,
//             backgroundColor: "#1a1a1a",
//             padding: "16px",
//             borderRadius: "8px",
//             boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             flexDirection: "column",
//             gap: "12px",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <h3 style={{ margin: 0, color: "#fff" }}>Sign in with Google</h3>
//             <button
//               onClick={() => setShowGoogleSignIn(false)}
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#fff",
//                 cursor: "pointer",
//               }}
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {isGoogleButtonLoading && (
//             <div
//               style={{ color: "#aaa", fontSize: "14px", textAlign: "center" }}
//             >
//               Loading Google Sign-In...
//             </div>
//           )}

//           <div ref={googleSignInButtonRef} style={{ margin: "0 auto" }} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Sidebar;















// import { Search, Home, Heart, LogIn, LogOut, X, Menu, ChevronLeft } from "lucide-react"
// import { useEffect, useState, useRef } from "react"
// import { useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import "./Sidebar.css"
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
//   const [showUserPopup, setShowUserPopup] = useState(false)
//   const [isLoggingOut, setIsLoggingOut] = useState(false)
//   const [showGoogleSignIn, setShowGoogleSignIn] = useState(false)
//   const [isGoogleButtonLoading, setIsGoogleButtonLoading] = useState(false)
//   const googleSignInButtonRef = useRef(null)
//   const navigate = useNavigate()

//   const baseMenuItems = [
//     { id: "search", icon: Search, label: "Search", url: "/search-page" },
//     { id: "home", icon: Home, label: "Home", url: "/home" },
//     { id: "favourite", icon: Heart, label: "Favourite", url: "/favorites" },
//   ]

//   const menuItems = [...baseMenuItems, ...(!user ? [{ id: "login", icon: LogIn, label: "Login with Google" }] : [])]

//   // Initialize Google Sign-In
//   useEffect(() => {
//     if (!user && !window.googleSignInInitialized) {
//       const initializeGoogleSignIn = () => {
//         if (window.google?.accounts?.id) {
//           window.google.accounts.id.initialize({
//             client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//             callback: handleCredentialResponse,
//             ux_mode: "popup",
//           })
//           window.googleSignInInitialized = true
//         }
//       }

//       if (!document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
//         const script = document.createElement("script")
//         script.src = "https://accounts.google.com/gsi/client"
//         script.async = true
//         script.defer = true
//         script.onload = initializeGoogleSignIn
//         document.body.appendChild(script)
//       } else if (window.google?.accounts?.id) {
//         initializeGoogleSignIn()
//       }
//     }
//   }, [user])

//   // Render Google Sign-In button
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
//       })

//       setIsGoogleButtonLoading(false)
//     }
//   }, [showGoogleSignIn])

//   const handleGoogleSignIn = () => {
//     if (!showGoogleSignIn) {
//       setShowGoogleSignIn(true)
//       setIsGoogleButtonLoading(true)
//     }

//     if (!window.google?.accounts?.id) {
//       toast.error("Google sign-in not loaded yet. Please wait...")
//       return
//     }
//   }


//   // const handleCredentialResponse = async (response) => {
//   //   const toastId = toast.loading("Authenticating...")

//   //   try {
//   //     const backendResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/auth/google`, {
//   //       method: "POST",
//   //       credentials: "include",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ token: response.credential }),
//   //     })

//   //     if (!backendResponse.ok) throw new Error("Authentication failed")

//   //     const data = await backendResponse.json()
//   //     onLogin?.(data.user)
//   //     setShowGoogleSignIn(false)
//   //     toast.success(`Welcome ${data.user.name || data.user.email}!`)
//   //   } catch (error) {
//   //     console.error("Login failed:", error)
//   //     toast.error(error.message || "Login failed")
//   //   } finally {
//   //     toast.dismiss(toastId)
//   //   }
//   // }




// const handleCredentialResponse = async (response) => {
//   const toastId = toast.loading("Authenticating...");

//   try {
//     const backendResponse = await axios.post(
//       `${process.env.REACT_APP_BACKEND_URL}/user/auth/google`,
//       { token: response.credential },
//       {
//         withCredentials: true
//       }
//     );

//     if (!backendResponse.data.user) throw new Error("Authentication failed");

//     onLogin?.(backendResponse.data.user);
//     setShowGoogleSignIn(false);
//     toast.success(`Welcome ${backendResponse.data.user.name || backendResponse.data.user.email}!`);
    
//     // Force a refresh after successful login to establish session
//     window.location.reload();
//   } catch (error) {
//     console.error("Login failed:", error);
//     toast.error(error.message || "Login failed");
//   } finally {
//     toast.dismiss(toastId);
//   }
// };






//   const handleLogout = async () => {
//     setIsLoggingOut(true)
//     const toastId = toast.loading("Logging out...")

//     try {
//       await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       })

//       onLogout?.()
//       toast.success("Logged out successfully")
//     } catch (error) {
//       console.error("Logout error:", error)
//       toast.info("Logout completed (backend may not have received)")
//       onLogout?.()
//     } finally {
//       setIsLoggingOut(false)
//       toast.dismiss(toastId)
//     }
//   }

//   const handleMenuClick = (menuId) => {
//     if (menuId === "login") {
//       handleGoogleSignIn()
//       return
//     }

//     const selectedItem = menuItems.find((item) => item.id === menuId)
//     if (selectedItem?.url) {
//       navigate(selectedItem.url)
//     }
//     onMenuClick?.(menuId)
//   }

//   // Close user popup when sidebar collapses
//   useEffect(() => {
//     if (isCollapsed) {
//       setShowUserPopup(false)
//       setShowGoogleSignIn(false)
//     }
//   }, [isCollapsed])

//   return (
//     <>
//       {/* Toggle Button - Always visible */}
//       <button
//         className={`sidebar-toggle-btn ${isCollapsed ? "sidebar-toggle-btn--collapsed" : ""}`}
//         onClick={onToggleCollapse}
//         aria-label={isCollapsed ? "Show sidebar" : "Hide sidebar"}
//         title={isCollapsed ? "Show sidebar" : "Hide sidebar"}
//       >
//         {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
//       </button>

//       {/* Sidebar */}
//       <div className={`sidebar-container ${isCollapsed ? "sidebar-container--collapsed" : ""} ${className}`}>
//         <nav className="sidebar-nav">
//           <div className="sidebar-menu-items">
//             {menuItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => handleMenuClick(item.id)}
//                 className={`sidebar-menu-btn ${activeMenu === item.id ? "sidebar-menu-btn--active" : ""}`}
//                 aria-label={item.label}
//                 title={item.label}
//               >
//                 <item.icon size={18} strokeWidth={1.5} />
//               </button>
//             ))}
//           </div>

//           {user && (
//             <div className="sidebar-user-section">
//               <div className="sidebar-user-avatar" onClick={() => setShowUserPopup(!showUserPopup)}>
//                 {user.picture ? (
//                   <img src={user.picture || "/placeholder.svg"} alt="Profile" className="sidebar-user-avatar-img" />
//                 ) : (
//                   user.email.charAt(0).toUpperCase()
//                 )}
//               </div>

//               {showUserPopup && (
//                 <div className="sidebar-user-popup">
//                   <div className="sidebar-user-email">{user.email}</div>
//                   <button className="sidebar-logout-btn" onClick={handleLogout} disabled={isLoggingOut}>
//                     <LogOut size={16} />
//                     {isLoggingOut ? "Logging out..." : "Logout"}
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </nav>

//         {/* Google Sign-In Popup */}
//         {showGoogleSignIn && (
//           <div className="sidebar-google-signin-popup">
//             <div className="sidebar-google-signin-header">
//               <h3 className="sidebar-google-signin-title">Sign in with Google</h3>
//               <button onClick={() => setShowGoogleSignIn(false)} className="sidebar-google-signin-close">
//                 <X size={20} />
//               </button>
//             </div>

//             {isGoogleButtonLoading && <div className="sidebar-google-signin-loading">Loading Google Sign-In...</div>}

//             <div ref={googleSignInButtonRef} className="sidebar-google-signin-button" />
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default Sidebar


















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
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const [isGoogleButtonLoading, setIsGoogleButtonLoading] = useState(false);
  const googleSignInButtonRef = useRef(null);
  const navigate = useNavigate();

  const baseMenuItems = [
    { id: "search", icon: Search, label: "Search", url: "/search-page" },
    { id: "home", icon: Home, label: "Home", url: "/home" },
    { id: "favourite", icon: Heart, label: "Favourite", url: "/favorites" },
  ];

  const menuItems = [...baseMenuItems, ...(!user ? [{ id: "login", icon: LogIn, label: "Login with Google" }] : [])];

  useEffect(() => {
    if (!user && !window.googleSignInInitialized) {
      const initializeGoogleSignIn = () => {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
            ux_mode: "popup",
          });
          window.googleSignInInitialized = true;
        }
      };

      if (!document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleSignIn;
        document.body.appendChild(script);
      } else if (window.google?.accounts?.id) {
        initializeGoogleSignIn();
      }
    }
  }, [user]);

  useEffect(() => {
    if (
      showGoogleSignIn &&
      window.google?.accounts?.id &&
      googleSignInButtonRef.current &&
      !googleSignInButtonRef.current.hasChildNodes()
    ) {
      window.google.accounts.id.renderButton(googleSignInButtonRef.current, {
        theme: "outline",
        size: "large",
        width: "200",
      });

      setIsGoogleButtonLoading(false);
    }
  }, [showGoogleSignIn]);

  const handleGoogleSignIn = () => {
    if (!showGoogleSignIn) {
      setShowGoogleSignIn(true);
      setIsGoogleButtonLoading(true);
    }

    if (!window.google?.accounts?.id) {
      toast.error("Google sign-in not loaded yet. Please wait...");
      return;
    }
  };

  const handleCredentialResponse = async (response) => {
    const toastId = toast.loading("Authenticating...");

    try {
      const backendResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/auth/google`,
        { token: response.credential },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!backendResponse.data.user) throw new Error("Authentication failed");

      onLogin?.(backendResponse.data.user);
      setShowGoogleSignIn(false);
      toast.success(`Welcome ${backendResponse.data.user.name || backendResponse.data.user.email}!`);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message || "Login failed");
    } finally {
      toast.dismiss(toastId);
    }
  };

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
            'Content-Type': 'application/json'
          }
        }
      );
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
    if (menuId === "login") {
      handleGoogleSignIn();
      return;
    }

    const selectedItem = menuItems.find((item) => item.id === menuId);
    if (selectedItem?.url) {
      navigate(selectedItem.url);
    }
    onMenuClick?.(menuId);
  };

  useEffect(() => {
    if (isCollapsed) {
      setShowUserPopup(false);
      setShowGoogleSignIn(false);
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
                {user.picture ? (
                  <img src={user.picture || "/placeholder.svg"} alt="Profile" className="sidebar-user-avatar-img" />
                ) : (
                  user.email.charAt(0).toUpperCase()
                )}
              </div>

              {showUserPopup && (
                <div className="sidebar-user-popup">
                  <div className="sidebar-user-email">{user.email}</div>
                  <button className="sidebar-logout-btn" onClick={handleLogout} disabled={isLoggingOut}>
                    <LogOut size={16} />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {showGoogleSignIn && (
          <div className="sidebar-google-signin-popup">
            <div className="sidebar-google-signin-header">
              <h3 className="sidebar-google-signin-title">Sign in with Google</h3>
              <button onClick={() => setShowGoogleSignIn(false)} className="sidebar-google-signin-close">
                <X size={20} />
              </button>
            </div>

            {isGoogleButtonLoading && <div className="sidebar-google-signin-loading">Loading Google Sign-In...</div>}

            <div ref={googleSignInButtonRef} className="sidebar-google-signin-button" />
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;