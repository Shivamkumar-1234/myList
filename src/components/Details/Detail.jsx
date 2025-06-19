// import { useState, useEffect } from "react";
// import { useParams, useNavigate, useOutletContext } from "react-router-dom";
// import axios from "axios";
// import { Heart, HeartFill, ChevronLeft } from "react-bootstrap-icons";
// import { toast } from "react-toastify";
// import "./Detail.css";

// const Detail = () => {
//   const { user, verifyAuth } = useOutletContext();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [anime, setAnime] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isCheckingFavorite, setIsCheckingFavorite] = useState(true);

//   useEffect(() => {
//     const fetchAnimeDetails = async () => {
//       try {
//         setIsLoading(true);

//         // Fetch anime details
//         const detailsResponse = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/user/anime/${id}`,
//           { withCredentials: true }
//         );

//         setAnime(detailsResponse.data.data);

//         // Check if anime is in favorites
//         if (user) {
//           await checkFavoriteStatus();
//         } else {
//           setIsCheckingFavorite(false);
//         }
//       } catch (err) {
//         console.error("Error fetching anime details:", err);
//         setError(err.response?.data?.error || "Failed to fetch anime details");
//         if (err.response?.status === 401) {
//           await verifyAuth();
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const checkFavoriteStatus = async () => {
//       try {
//         setIsCheckingFavorite(true);
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/user/favorites/${user.id}`,
//           { withCredentials: true }
//         );

//         const found = response.data.some(
//           (item) => item.mal_id == id || item.id == id
//         );
//         setIsFavorite(found);
//       } catch (err) {
//         console.error("Error checking favorite status:", err);
//         if (err.response?.status === 401) {
//           await verifyAuth();
//         }
//       } finally {
//         setIsCheckingFavorite(false);
//       }
//     };

//     fetchAnimeDetails();
//   }, [id, user, verifyAuth]);

//   const toggleFavorite = async () => {
//     if (!user) {
//       toast.info("Please sign in to add favorites");
      
//       return;
//     }

//     try {
//       if (isFavorite) {
//         await axios.delete(
//           `${process.env.REACT_APP_BACKEND_URL}/user/favorites/${user.id}/${id}`,
//           { withCredentials: true }
//         );
//         toast.success("Removed from favorites");
//         setIsFavorite(false);
//       } else {
//         if (!anime) return;

//         await axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/user/favorites`,
//           {
//             userId: user.id,
//             animeId: id,
//             animeData: {
//               title: anime.title,
//               images: anime.images,
//               score: anime.score,
//               members: anime.members,
//               year: anime.year || anime.aired?.prop?.from?.year || null,
//               status: anime.status,
//               synopsis: anime.synopsis,
//               type: anime.type,
//               episodes: anime.episodes,
//               rating: anime.rating,
//               duration: anime.duration,
//               genres: anime.genres,
//               studios: anime.studios,
//               trailer: anime.trailer,
//             },
//           },
//           { withCredentials: true }
//         );
//         toast.success("Added to favorites");
//         setIsFavorite(true);
//       }
//     } catch (err) {
//       console.error("Favorite error:", err);
//       if (err.response?.status === 401) {
//         await verifyAuth();
//         toast.error("Please sign in again.");
//       } else {
//         toast.error(err.response?.data?.error || "Failed to update favorites");
//       }
//     }
//   };

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   if (isLoading) {
//     return <div className="loading-indicator">Loading...</div>;
//   }

//   return (
//     <div className="detail-container">
//       <button onClick={() => navigate(-1)} className="back-button">
//         <ChevronLeft size={24} /> Back
//       </button>

//       {anime && (
//         <>
//           <div className="detail-header">
//             <div className="detail-poster">
//               <img
//                 src={
//                   anime.images?.jpg?.large_image_url ||
//                   anime.images?.jpg?.image_url ||
//                   "/placeholder.jpg"
//                 }
//                 alt={anime.title}
//                 onError={(e) => {
//                   e.target.src = "/placeholder.jpg";
//                 }}
//               />
//             </div>
//             <div className="detail-info">
//               <h1>{anime.title}</h1>
//               <div className="detail-meta">
//                 <span>⭐ {anime.score || "N/A"}</span>
//                 <span>👥 {anime.members?.toLocaleString() || "N/A"}</span>
//                 <span>{anime.year || "N/A"}</span>
//                 <span>{anime.status || "N/A"}</span>
//               </div>
//               <button
//                 onClick={toggleFavorite}
//                 className={`favorite-button ${isFavorite ? "favorited" : ""}`}
//                 disabled={isCheckingFavorite}
//               >
//                 {isFavorite ? <HeartFill size={20} /> : <Heart size={20} />}
//                 {isFavorite ? "In Favorites" : "Add to Favorites"}
//               </button>
//             </div>
//           </div>

//           <div className="detail-content">
//             <div className="detail-section">
//               <h2>Synopsis</h2>
//               <p>{anime.synopsis || "No synopsis available."}</p>
//             </div>

//             <div className="detail-section">
//               <h2>Information</h2>
//               <div className="info-grid">
//                 <div>
//                   <strong>Type:</strong> {anime.type || "N/A"}
//                 </div>
//                 <div>
//                   <strong>Episodes:</strong> {anime.episodes || "N/A"}
//                 </div>
//                 <div>
//                   <strong>Status:</strong> {anime.status || "N/A"}
//                 </div>
//                 <div>
//                   <strong>Aired:</strong> {anime.aired?.string || "N/A"}
//                 </div>
//                 <div>
//                   <strong>Rating:</strong> {anime.rating || "N/A"}
//                 </div>
//                 <div>
//                   <strong>Duration:</strong> {anime.duration || "N/A"}
//                 </div>
//                 <div>
//                   <strong>Genres:</strong>{" "}
//                   {anime.genres?.map((g) => g.name).join(", ") || "N/A"}
//                 </div>
//                 <div>
//                   <strong>Studios:</strong>{" "}
//                   {anime.studios?.map((s) => s.name).join(", ") || "N/A"}
//                 </div>
//               </div>
//             </div>

//             {anime.trailer?.url && (
//               <div className="detail-section">
//                 <h2>Trailer</h2>
//                 <div className="trailer-container">
//                   <iframe
//                     src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
//                     title={`${anime.title} Trailer`}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Detail;








"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, useOutletContext } from "react-router-dom"
import axios from "axios"
import { Heart, ChevronLeft, Star, Users, Calendar, Play, Info, AlertTriangle, Film } from "lucide-react"
import { toast } from "react-toastify"
import "./Detail.css"

const Detail = () => {
  const { user, verifyAuth } = useOutletContext()
  const { id } = useParams()
  const navigate = useNavigate()
  const [anime, setAnime] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isCheckingFavorite, setIsCheckingFavorite] = useState(true)

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch anime details
        const detailsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/anime/${id}`, {
          withCredentials: true,
        })

        setAnime(detailsResponse.data.data)

        // Check if anime is in favorites
        if (user) {
          await checkFavoriteStatus()
        } else {
          setIsCheckingFavorite(false)
        }
      } catch (err) {
        console.error("Error fetching anime details:", err)
        setError(err.response?.data?.error || "Failed to fetch anime details")
        if (err.response?.status === 401) {
          await verifyAuth()
        }
      } finally {
        setIsLoading(false)
      }
    }

    const checkFavoriteStatus = async () => {
      try {
        setIsCheckingFavorite(true)
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/favorites/${user.id}`, {
          withCredentials: true,
        })

        const found = response.data.some((item) => item.mal_id == id || item.id == id)
        setIsFavorite(found)
      } catch (err) {
        console.error("Error checking favorite status:", err)
        if (err.response?.status === 401) {
          await verifyAuth()
        }
      } finally {
        setIsCheckingFavorite(false)
      }
    }

    fetchAnimeDetails()
  }, [id, user, verifyAuth])

  const toggleFavorite = async () => {
    if (!user) {
      toast.info("Please sign in to add favorites")
      return
    }

    try {
      if (isFavorite) {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/user/favorites/${user.id}/${id}`, {
          withCredentials: true,
        })
        toast.success("Removed from favorites")
        setIsFavorite(false)
      } else {
        if (!anime) return

        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/user/favorites`,
          {
            userId: user.id,
            animeId: id,
            animeData: {
              title: anime.title,
              images: anime.images,
              score: anime.score,
              members: anime.members,
              year: anime.year || anime.aired?.prop?.from?.year || null,
              status: anime.status,
              synopsis: anime.synopsis,
              type: anime.type,
              episodes: anime.episodes,
              rating: anime.rating,
              duration: anime.duration,
              genres: anime.genres,
              studios: anime.studios,
              trailer: anime.trailer,
            },
          },
          { withCredentials: true },
        )
        toast.success("Added to favorites")
        setIsFavorite(true)
      }
    } catch (err) {
      console.error("Favorite error:", err)
      if (err.response?.status === 401) {
        await verifyAuth()
        toast.error("Please sign in again.")
      } else {
        toast.error(err.response?.data?.error || "Failed to update favorites")
      }
    }
  }

  if (error) {
    return (
      <div className="detail-crunchyroll-page">
        <div className="detail-cr-container">
          <div className="detail-error-state">
            <AlertTriangle className="detail-error-icon" />
            <h2>Something went wrong</h2>
            <p className="detail-error-message">{error}</p>
            <div className="detail-error-actions">
              <button className="detail-cr-button detail-primary" onClick={() => window.location.reload()}>
                Try Again
              </button>
              <button className="detail-cr-button detail-secondary" onClick={() => navigate(-1)}>
                <ChevronLeft className="detail-button-icon" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="detail-crunchyroll-page">
        <div className="detail-cr-container">
          <div className="detail-loading-state">
            <div className="detail-loading-header">
              <div className="detail-loading-poster"></div>
              <div className="detail-loading-info">
                <div className="detail-loading-title"></div>
                <div className="detail-loading-meta"></div>
                <div className="detail-loading-button"></div>
              </div>
            </div>
            <div className="detail-loading-content">
              <div className="detail-loading-section">
                <div className="detail-loading-section-title"></div>
                <div className="detail-loading-text"></div>
              </div>
              <div className="detail-loading-section">
                <div className="detail-loading-section-title"></div>
                <div className="detail-loading-grid"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-crunchyroll-page">
      <div className="detail-cr-container">
        <button onClick={() => navigate(-1)} className="detail-back-button">
          <ChevronLeft className="detail-back-icon" />
          Back
        </button>

        {anime && (
          <>
            <div className="detail-header">
              <div className="detail-poster-section">
                <div className="detail-poster-container">
                  <img
                    src={
                      anime.images?.jpg?.large_image_url ||
                      anime.images?.jpg?.image_url ||
                      "https://via.placeholder.com/300x400/23252b/ffffff?text=No+Image" ||
                      "/placeholder.svg"
                    }
                    alt={anime.title}
                    className="detail-poster-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x400/23252b/ffffff?text=No+Image"
                    }}
                  />
                  {anime.score && (
                    <div className="detail-score-badge">
                      <Star className="detail-score-icon" />
                      {anime.score}
                    </div>
                  )}
                </div>
              </div>

              <div className="detail-info-section">
                <div className="detail-title-area">
                  <h1 className="detail-title">{anime.title}</h1>
                  {anime.title_english && anime.title_english !== anime.title && (
                    <p className="detail-subtitle">{anime.title_english}</p>
                  )}
                </div>

                <div className="detail-meta-stats">
                  <div className="detail-stat">
                    <Star className="detail-stat-icon" />
                    <span className="detail-stat-value">{anime.score || "N/A"}</span>
                    <span className="detail-stat-label">Rating</span>
                  </div>
                  <div className="detail-stat">
                    <Users className="detail-stat-icon" />
                    <span className="detail-stat-value">
                      {anime.members ? `${(anime.members / 1000000).toFixed(1)}M` : "N/A"}
                    </span>
                    <span className="detail-stat-label">Members</span>
                  </div>
                  <div className="detail-stat">
                    <Calendar className="detail-stat-icon" />
                    <span className="detail-stat-value">{anime.year || "N/A"}</span>
                    <span className="detail-stat-label">Year</span>
                  </div>
                  <div className="detail-stat">
                    <Film className="detail-stat-icon" />
                    <span className="detail-stat-value">{anime.episodes || "N/A"}</span>
                    <span className="detail-stat-label">Episodes</span>
                  </div>
                </div>

                <div className="detail-genres">
                  {anime.genres?.map((genre) => (
                    <span key={genre.mal_id} className="detail-genre-tag">
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="detail-actions">
                  <button
                    onClick={toggleFavorite}
                    className={`detail-favorite-button ${isFavorite ? "detail-favorited" : ""}`}
                    disabled={isCheckingFavorite}
                  >
                    <Heart className={`detail-heart-icon ${isFavorite ? "detail-heart-filled" : ""}`} />
                    {isFavorite ? "In Favorites" : "Add to Favorites"}
                  </button>
                </div>
              </div>
            </div>

            <div className="detail-content">
              <div className="detail-section">
                <h2 className="detail-section-title">
                  <Info className="detail-section-icon" />
                  Synopsis
                </h2>
                <p className="detail-synopsis">{anime.synopsis || "No synopsis available."}</p>
              </div>

              <div className="detail-section">
                <h2 className="detail-section-title">
                  <Info className="detail-section-icon" />
                  Information
                </h2>
                <div className="detail-info-grid">
                  <div className="detail-info-item">
                    <span className="detail-info-label">Type:</span>
                    <span className="detail-info-value">{anime.type || "N/A"}</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Episodes:</span>
                    <span className="detail-info-value">{anime.episodes || "N/A"}</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Status:</span>
                    <span className="detail-info-value detail-status">{anime.status || "N/A"}</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Aired:</span>
                    <span className="detail-info-value">{anime.aired?.string || "N/A"}</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Rating:</span>
                    <span className="detail-info-value">{anime.rating || "N/A"}</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">Duration:</span>
                    <span className="detail-info-value">{anime.duration || "N/A"}</span>
                  </div>
                  <div className="detail-info-item detail-info-full">
                    <span className="detail-info-label">Genres:</span>
                    <span className="detail-info-value">{anime.genres?.map((g) => g.name).join(", ") || "N/A"}</span>
                  </div>
                  <div className="detail-info-item detail-info-full">
                    <span className="detail-info-label">Studios:</span>
                    <span className="detail-info-value">{anime.studios?.map((s) => s.name).join(", ") || "N/A"}</span>
                  </div>
                </div>
              </div>

              {anime.trailer?.url && (
                <div className="detail-section">
                  <h2 className="detail-section-title">
                    <Play className="detail-section-icon" />
                    Trailer
                  </h2>
                  <div className="detail-trailer-container">
                    <iframe
                      src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                      title={`${anime.title} Trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="detail-trailer-iframe"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Detail
