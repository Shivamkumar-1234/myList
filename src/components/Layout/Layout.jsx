// import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import Footer from "../Footer/Footer";
// import { ToastContainer } from "react-toastify";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "../axiosConfig";

// import "./Layout.css"; // 

// function Layout() {
//   const [user, setUser] = useState(null);
//   const [activeMenu, setActiveMenu] = useState("home");
//   const [isVerifying, setIsVerifying] = useState(true);

//   const setUserState = (userData) => {
//     if (userData) {
//       setUser(userData);
//       localStorage.setItem("user", JSON.stringify(userData));
//     } else {
//       setUser(null);
//       localStorage.removeItem("user");
//     }
//   };

//   const verifyAuth = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/user/auth/verify`,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.user) {
//         setUserState({
//           email: response.data.user.email,
//           id: response.data.user.id,
//           name: response.data.user.name,
//           picture: response.data.user.picture,
//         });
//       }
//     } catch (error) {
//       console.error("Session verification failed:", error);
//       setUserState(null);
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   useEffect(() => {
//     verifyAuth();

//     // Set up axios interceptor to handle 401 errors
//     const interceptor = axios.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         if (error.response?.status === 401) {
//           // If we get a 401, verify auth status
//           await verifyAuth();

//           if (!user) {
//             toast.error("Session expired. Please login again.");
//           }
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axios.interceptors.response.eject(interceptor);
//     };
//   }, []);

//   const handleLogin = (userData) => {
//     setUserState({
//       email: userData.email,
//       id: userData.id,
//       name: userData.name,
//       picture: userData.picture,
//     });
//   };

//   const handleLogout = async () => {
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
//       setUserState(null);
//       toast.success("Logged out successfully");
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error("Failed to logout properly");
//     }
//   };

//   if (isVerifying) {
//     return <div className="loading-screen">Loading...</div>;
//   }

//   return (
//     <div className="layout">
//       <Sidebar
//         activeMenu={activeMenu}
//         onMenuClick={setActiveMenu}
//         user={user}
//         onLogin={handleLogin}
//         onLogout={handleLogout}
//       />

//       <div className="layout-content-wrapper">
//         <main className="content">
//           <Outlet context={{ user, verifyAuth }} />
//         </main>
//         <Footer />
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default Layout;



















// import { Outlet } from "react-router-dom"
// import { useState, useEffect } from "react"
// import Sidebar from "../Sidebar/Sidebar"
// import Footer from "../Footer/Footer"
// import { ToastContainer } from "react-toastify"
// import { toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import axios from "axios"

// import "./Layout.css"

// function Layout() {
//   const [user, setUser] = useState(null)
//   const [activeMenu, setActiveMenu] = useState("home")
//   const [isVerifying, setIsVerifying] = useState(true)
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

//   const setUserState = (userData) => {
//     if (userData) {
//       setUser(userData)
//       localStorage.setItem("user", JSON.stringify(userData))
//     } else {
//       setUser(null)
//       localStorage.removeItem("user")
//     }
//   }

//   // const verifyAuth = async () => {
//   //   try {
//   //     const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/auth/verify`, {
//   //       // withCredentials: true,
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //     })

//   //     if (response.data.user) {
//   //       setUserState({
//   //         email: response.data.user.email,
//   //         id: response.data.user.id,
//   //         name: response.data.user.name,
//   //         picture: response.data.user.picture,
//   //       })
//   //     }
//   //   } catch (error) {
//   //     console.error("Session verification failed:", error)
//   //     setUserState(null)
//   //   } finally {
//   //     setIsVerifying(false)
//   //   }
//   // }


//   const verifyAuth = async () => {
//   try {
//     const response = await axios.get(
//       `${process.env.REACT_APP_BACKEND_URL}/user/auth/verify`,
//       { 
//         withCredentials: true
//       }
//     );

//     if (response.data.user) {
//       setUserState({
//         email: response.data.user.email,
//         id: response.data.user.id,
//         name: response.data.user.name,
//         picture: response.data.user.picture,
//       });
//     } else {
//       setUserState(null);
//     }
//   } catch (error) {
//     console.error("Session verification failed:", error);
//     setUserState(null);
//   } finally {
//     setIsVerifying(false);
//   }
// };



// useEffect(() => {
//   let isMounted = true;
  
//   const verifyAndRefresh = async () => {
//     if (isMounted) {
//       await verifyAuth();
//     }
//   };
  
//   // Verify auth on mount
//   verifyAndRefresh();

//   // Set up periodic verification (every 5 minutes)
//   const interval = setInterval(verifyAndRefresh, 5 * 60 * 1000);
  
//   return () => {
//     isMounted = false;
//     clearInterval(interval);
//   };
// }, []);



// // Add this useEffect for periodic verification
// useEffect(() => {
//   const verifyAndRefresh = async () => {
//     await verifyAuth();
//   };
  
//   // Verify auth on mount
//   verifyAndRefresh();

//   // Set up periodic verification (every 5 minutes)
//   const interval = setInterval(verifyAndRefresh, 5 * 60 * 1000);
  
//   return () => clearInterval(interval);
// }, []);







//   useEffect(() => {
//     verifyAuth()

//     // Set up axios interceptor to handle 401 errors
//     const interceptor = axios.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         if (error.response?.status === 401) {
//           // If we get a 401, verify auth status
//           await verifyAuth()

//           if (!user) {
//             toast.error("Session expired. Please login again.")
//           }
//         }
//         return Promise.reject(error)
//       },
//     )

//     return () => {
//       axios.interceptors.response.eject(interceptor)
//     }
//   }, [])

//   // Load sidebar state from localStorage
//   useEffect(() => {
//     const savedSidebarState = localStorage.getItem("sidebarCollapsed")
//     if (savedSidebarState !== null) {
//       setIsSidebarCollapsed(JSON.parse(savedSidebarState))
//     }
//   }, [])

//   const handleLogin = (userData) => {
//     setUserState({
//       email: userData.email,
//       id: userData.id,
//       name: userData.name,
//       picture: userData.picture,
//     })
//   }

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/user/auth/logout`,
//         {},
//         {
//           // withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       )
//       setUserState(null)
//       toast.success("Logged out successfully")
//     } catch (error) {
//       console.error("Logout error:", error)
//       toast.error("Failed to logout properly")
//     }
//   }

//   const handleToggleSidebar = () => {
//     const newState = !isSidebarCollapsed
//     setIsSidebarCollapsed(newState)
//     localStorage.setItem("sidebarCollapsed", JSON.stringify(newState))
//   }

//   if (isVerifying) {
//     return <div className="loading-screen">Loading...</div>
//   }

//   return (
//     <div className="layout">
//       <Sidebar
//         activeMenu={activeMenu}
//         onMenuClick={setActiveMenu}
//         user={user}
//         onLogin={handleLogin}
//         onLogout={handleLogout}
//         isCollapsed={isSidebarCollapsed}
//         onToggleCollapse={handleToggleSidebar}
//       />

//       <div className={`layout-content-wrapper ${isSidebarCollapsed ? "layout-content-wrapper--expanded" : ""}`}>
//         <main className="content">
//           <Outlet context={{ user, verifyAuth }} />
//         </main>
//         <Footer />
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   )
// }

// export default Layout
















import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./Layout.css";

function Layout() {
  const [user, setUser] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const setUserState = (userData) => {
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const verifyAuth = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/auth/verify`,
        { withCredentials: true }
      );
      setUserState(response.data.user);
    } catch (err) {
      setUserState(null);
      console.warn("Verification failed", err?.response?.data?.error);
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    verifyAuth();

    const interval = setInterval(() => {
      verifyAuth();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && user) {
          toast.error("Session expired. Please login again.");
          setUserState(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [user]);

  useEffect(() => {
    const sidebarState = localStorage.getItem("sidebarCollapsed");
    if (sidebarState) {
      setIsSidebarCollapsed(JSON.parse(sidebarState));
    }
  }, []);

  const handleLogin = (userData) => setUserState(userData);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUserState(null);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout error", err);
      toast.error("Failed to logout");
    }
  };

  const handleToggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  if (isVerifying) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="layout">
      <Sidebar
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      <div className={`layout-content-wrapper ${isSidebarCollapsed ? "layout-content-wrapper--expanded" : ""}`}>
        <main className="content">
          <Outlet context={{ user, verifyAuth }} />
        </main>
        <Footer />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Layout;
