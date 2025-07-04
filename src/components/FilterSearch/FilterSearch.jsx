// "use client"

// import { useState, useEffect, useRef } from "react"
// import { useLocation, useNavigate, useOutletContext } from "react-router-dom"
// import axios from "axios";
// import { Star, Flame, Calendar, RotateCcw, Filter, X } from "lucide-react"
// import { toast } from "react-toastify"
// import "./FilterSearch.css"

// const FilterSearch = () => {
//   const { user } = useOutletContext()
//   const location = useLocation()
//   const navigate = useNavigate()
//   const [animeList, setAnimeList] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [hasMore, setHasMore] = useState(true)
//   const initialLoad = useRef(true)

//   useEffect(() => {
//     const savedAnime = localStorage.getItem("animeList")
//     const savedState = localStorage.getItem("animeListState")

//     if (savedAnime && savedState) {
//       const { search, page, hasMore } = JSON.parse(savedState)

//       if (search === location.search) {
//         setAnimeList(JSON.parse(savedAnime))
//         setCurrentPage(page)
//         setHasMore(hasMore)
//         initialLoad.current = false
//       }
//     }
//   }, [location.search])

//   useEffect(() => {
//     if (animeList.length > 0) {
//       localStorage.setItem("animeList", JSON.stringify(animeList))
//       localStorage.setItem(
//         "animeListState",
//         JSON.stringify({
//           search: location.search,
//           page: currentPage,
//           hasMore,
//         }),
//       )
//     }
//   }, [animeList, currentPage, hasMore, location.search])

//   const loadMoreAnime = async () => {
//     if (isLoading || !hasMore) return

//     try {
//       setIsLoading(true)
//       const searchParams = new URLSearchParams(location.search)
//       searchParams.set("page", currentPage.toString())

//       const response = await axios.get(`/user/all-anime`, {
//         params: Object.fromEntries(searchParams),
//       })

//       const newAnime = response.data.data || []
//       setAnimeList((prev) => {
//         const existingIds = new Set(prev.map((anime) => anime.mal_id))
//         const uniqueNewAnime = newAnime.filter((anime) => !existingIds.has(anime.mal_id))
//         return [...prev, ...uniqueNewAnime]
//       })
//       setHasMore(response.data.pagination?.has_next_page || false)
//       setCurrentPage((prev) => prev + 1)
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to fetch anime")
//       if (err.response?.status === 401) {
//         toast.info("Please sign in to view this content")
//       } else if (err.response?.status === 429) {
//         setTimeout(() => loadMoreAnime(), 1000)
//       }
//     } finally {
//       setIsLoading(false)
//       initialLoad.current = false
//     }
//   }

//   useEffect(() => {
//     if (initialLoad.current && hasMore && animeList.length === 0) {
//       loadMoreAnime()
//     }
//   }, [location.search, hasMore, animeList.length])

//   const clearSavedAnime = () => {
//     localStorage.removeItem("animeList")
//     localStorage.removeItem("animeListState")
//     setAnimeList([])
//     setCurrentPage(1)
//     setHasMore(true)
//     initialLoad.current = true
//   }

//   const getFilterTitle = () => {
//     const searchParams = new URLSearchParams(location.search)
//     const sort = searchParams.get("sort")
//     const year = searchParams.get("year")

//     if (sort === "top") return "Top Rated Anime"
//     if (sort === "popular") return "Most Popular Anime"
//     if (year) return `Anime from ${year}`
//     return "Filtered Anime"
//   }

//   const getFilterIcon = () => {
//     const searchParams = new URLSearchParams(location.search)
//     const sort = searchParams.get("sort")
//     const year = searchParams.get("year")

//     if (sort === "top") return <Star className="filter-search-header-icon" />
//     if (sort === "popular") return <Flame className="filter-search-header-icon" />
//     if (year) return <Calendar className="filter-search-header-icon" />
//     return <Filter className="filter-search-header-icon" />
//   }

//   if (error) {
//     return (
//       <div className="filter-search-crunchyroll-page">
//         <div className="filter-search-cr-container">
//           <div className="filter-search-error-state">
//             <X className="filter-search-error-icon" />
//             <h2>Something went wrong</h2>
//             <p className="filter-search-error-message">{error}</p>
//             <button className="filter-search-cr-button filter-search-primary" onClick={() => window.location.reload()}>
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="filter-search-crunchyroll-page">
//       <div className="filter-search-cr-header">
//         <div className="filter-search-cr-container">
//           <div className="filter-search-header-content">
//             <div className="filter-search-header-left">
//               <h1 className="filter-search-page-title">
//                 {getFilterIcon()}
//                 {getFilterTitle()}
//               </h1>
//               <div className="filter-search-page-meta">
//                 <span className="filter-search-meta-item">
//                   <Filter className="filter-search-meta-icon" />
//                   {isLoading && animeList.length === 0 ? "Loading..." : `${animeList.length} results`}
//                 </span>
//                 <span className="filter-search-meta-item">
//                   <Calendar className="filter-search-meta-icon" />
//                   Updated now
//                 </span>
//               </div>
//             </div>
//             <div className="filter-search-header-actions">
//               <button
//                 onClick={clearSavedAnime}
//                 className="filter-search-cr-button filter-search-secondary"
//                 title="Reset filters and reload"
//               >
//                 <RotateCcw className="filter-search-button-icon" />
//                 Reset
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="filter-search-cr-main">
//         <div className="filter-search-cr-container">
//           {animeList.length > 0 ? (
//             <>
//               <div className="filter-search-content-grid">
//                 {animeList.map((anime) => (
//                   <div
//                     key={`${anime.mal_id}-${anime.title}`}
//                     className="filter-search-cr-card"
//                     onClick={() => navigate(`/anime/${anime.mal_id}`)}
//                     role="button"
//                     tabIndex="0"
//                     aria-label={`View details for ${anime.title}`}
//                     onKeyPress={(e) => e.key === "Enter" && navigate(`/anime/${anime.mal_id}`)}
//                   >
//                     <div className="filter-search-card-poster">
//                       <div className="filter-search-poster-container">
//                         <img
//                           src={anime.images?.jpg?.image_url || "/placeholder.svg"}
//                           alt={anime.title}
//                           className="filter-search-poster-image"
//                           onError={(e) => {
//                             e.target.src = "https://via.placeholder.com/300x400/23252b/ffffff?text=No+Image"
//                             e.target.alt = "Image not available"
//                           }}
//                         />
//                         {anime.rank && <div className="filter-search-rank-badge">#{anime.rank}</div>}
//                         {anime.year && <div className="filter-search-year-badge">{anime.year}</div>}
//                       </div>
//                     </div>
//                     <div className="filter-search-card-content">
//                       <h3 className="filter-search-card-title" title={anime.title}>
//                         {anime.title}
//                       </h3>
//                       {/* <div className="filter-search-card-meta">
//                         <div className="filter-search-meta-row">
//                           <span className="filter-search-meta-label">Rating:</span>
//                           <div className="filter-search-rating">
//                             <Star className="filter-search-star-icon" />
//                             <span className="filter-search-rating-value">{anime.score || "N/A"}</span>
//                           </div>
//                         </div>
//                         {anime.members && (
//                           <div className="filter-search-meta-row">
//                             <span className="filter-search-meta-label">Members:</span>
//                             <span className="filter-search-meta-value">
//                               {anime.members > 1000000
//                                 ? `${(anime.members / 1000000).toFixed(1)}M`
//                                 : anime.members > 1000
//                                   ? `${(anime.members / 1000).toFixed(1)}K`
//                                   : anime.members.toLocaleString()}
//                             </span>
//                           </div>
//                         )}
//                         <div className="filter-search-meta-row">
//                           <span className="filter-search-meta-label">Year:</span>
//                           <span className="filter-search-meta-value filter-search-year">{anime.year || "N/A"}</span>
//                         </div>
//                       </div> */}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {hasMore && (
//                 <div className="filter-search-load-more-container">
//                   <button
//                     onClick={loadMoreAnime}
//                     disabled={isLoading}
//                     className="filter-search-cr-button filter-search-primary filter-search-load-more"
//                   >
//                     {isLoading ? "Loading..." : "Show More"}
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : isLoading ? (
//             <div className="filter-search-loading-state">
//               <div className="filter-search-loading-grid">
//                 {[...Array(12)].map((_, i) => (
//                   <div key={i} className="filter-search-skeleton-card">
//                     <div className="filter-search-skeleton-image"></div>
//                     <div className="filter-search-skeleton-content">
//                       <div className="filter-search-skeleton-title"></div>
//                       <div className="filter-search-skeleton-meta"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="filter-search-empty-state">
//               <div className="filter-search-empty-content">
//                 <Filter className="filter-search-empty-icon" />
//                 <h3>No results found</h3>
//                 <p>No anime found with the current filters. Try adjusting your search criteria.</p>
//                 <button className="filter-search-cr-button filter-search-primary" onClick={clearSavedAnime}>
//                   Reset Filters
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FilterSearch











"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate, useOutletContext } from "react-router-dom"
import axios from "axios"
import { Star, Flame, Calendar, RotateCcw, Filter, X } from "lucide-react"
import { toast } from "react-toastify"
import "./FilterSearch.css"

const FilterSearch = () => {
  const { user } = useOutletContext()
  const location = useLocation()
  const navigate = useNavigate()
  const [animeList, setAnimeList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const initialLoad = useRef(true)

  // Check sidebar state from localStorage
  useEffect(() => {
    const checkSidebarState = () => {
      const savedState = localStorage.getItem("sidebarCollapsed")
      setIsSidebarCollapsed(savedState === "true")
    }

    checkSidebarState()

    // Listen for storage changes to update when sidebar state changes
    const handleStorageChange = (e) => {
      if (e.key === "sidebarCollapsed") {
        setIsSidebarCollapsed(e.newValue === "true")
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check periodically in case localStorage changes without storage event
    const interval = setInterval(checkSidebarState, 100)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const savedAnime = localStorage.getItem("animeList")
    const savedState = localStorage.getItem("animeListState")

    if (savedAnime && savedState) {
      const { search, page, hasMore } = JSON.parse(savedState)

      if (search === location.search) {
        setAnimeList(JSON.parse(savedAnime))
        setCurrentPage(page)
        setHasMore(hasMore)
        initialLoad.current = false
      }
    }
  }, [location.search])

  useEffect(() => {
    if (animeList.length > 0) {
      localStorage.setItem("animeList", JSON.stringify(animeList))
      localStorage.setItem(
        "animeListState",
        JSON.stringify({
          search: location.search,
          page: currentPage,
          hasMore,
        }),
      )
    }
  }, [animeList, currentPage, hasMore, location.search])

  const loadMoreAnime = async () => {
    if (isLoading || !hasMore) return

    try {
      setIsLoading(true)
      const searchParams = new URLSearchParams(location.search)
      searchParams.set("page", currentPage.toString())

      const response = await axios.get(`/user/all-anime`, {
        params: Object.fromEntries(searchParams),
      })

      const newAnime = response.data.data || []
      setAnimeList((prev) => {
        const existingIds = new Set(prev.map((anime) => anime.mal_id))
        const uniqueNewAnime = newAnime.filter((anime) => !existingIds.has(anime.mal_id))
        return [...prev, ...uniqueNewAnime]
      })
      setHasMore(response.data.pagination?.has_next_page || false)
      setCurrentPage((prev) => prev + 1)
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch anime")
      if (err.response?.status === 401) {
        toast.info("Please sign in to view this content")
      } else if (err.response?.status === 429) {
        setTimeout(() => loadMoreAnime(), 1000)
      }
    } finally {
      setIsLoading(false)
      initialLoad.current = false
    }
  }

  useEffect(() => {
    if (initialLoad.current && hasMore && animeList.length === 0) {
      loadMoreAnime()
    }
  }, [location.search, hasMore, animeList.length])

  const clearSavedAnime = () => {
    localStorage.removeItem("animeList")
    localStorage.removeItem("animeListState")
    setAnimeList([])
    setCurrentPage(1)
    setHasMore(true)
    initialLoad.current = true
  }

  const getFilterTitle = () => {
    const searchParams = new URLSearchParams(location.search)
    const sort = searchParams.get("sort")
    const year = searchParams.get("year")

    if (sort === "top") return "Top Rated Anime"
    if (sort === "popular") return "Most Popular Anime"
    if (year) return `Anime from ${year}`
    return "Filtered Anime"
  }

  const getFilterIcon = () => {
    const searchParams = new URLSearchParams(location.search)
    const sort = searchParams.get("sort")
    const year = searchParams.get("year")

    if (sort === "top") return <Star className="filter-search-header-icon" />
    if (sort === "popular") return <Flame className="filter-search-header-icon" />
    if (year) return <Calendar className="filter-search-header-icon" />
    return <Filter className="filter-search-header-icon" />
  }

  if (error) {
    return (
      <div
        className={`filter-search-crunchyroll-page ${isSidebarCollapsed ? "filter-search-page--sidebar-collapsed" : ""}`}
      >
        <div className="filter-search-cr-container">
          <div className="filter-search-error-state">
            <X className="filter-search-error-icon" />
            <h2>Something went wrong</h2>
            <p className="filter-search-error-message">{error}</p>
            <button className="filter-search-cr-button filter-search-primary" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`filter-search-crunchyroll-page ${isSidebarCollapsed ? "filter-search-page--sidebar-collapsed" : ""}`}
    >
      <div className="filter-search-cr-header">
        <div className="filter-search-cr-container">
          <div className="filter-search-header-content">
            <div className="filter-search-header-left">
              <h1 className="filter-search-page-title">
                {getFilterIcon()}
                {getFilterTitle()}
              </h1>
              <div className="filter-search-page-meta">
                <span className="filter-search-meta-item">
                  <Filter className="filter-search-meta-icon" />
                  {isLoading && animeList.length === 0 ? "Loading..." : `${animeList.length} results`}
                </span>
                <span className="filter-search-meta-item">
                  <Calendar className="filter-search-meta-icon" />
                  Updated now
                </span>
              </div>
            </div>
            <div className="filter-search-header-actions">
              <button
                onClick={clearSavedAnime}
                className="filter-search-cr-button filter-search-secondary"
                title="Reset filters and reload"
              >
                <RotateCcw className="filter-search-button-icon" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="filter-search-cr-main">
        <div className="filter-search-cr-container">
          {animeList.length > 0 ? (
            <>
              <div className="filter-search-content-grid">
                {animeList.map((anime) => (
                  <div
                    key={`${anime.mal_id}-${anime.title}`}
                    className="filter-search-cr-card"
                    onClick={() => navigate(`/anime/${anime.mal_id}`)}
                    role="button"
                    tabIndex="0"
                    aria-label={`View details for ${anime.title}`}
                    onKeyPress={(e) => e.key === "Enter" && navigate(`/anime/${anime.mal_id}`)}
                  >
                    <div className="filter-search-card-poster">
                      <div className="filter-search-poster-container">
                        <img
                          src={anime.images?.jpg?.image_url || "/placeholder.svg"}
                          alt={anime.title}
                          className="filter-search-poster-image"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/300x400/23252b/ffffff?text=No+Image"
                            e.target.alt = "Image not available"
                          }}
                        />
                        {anime.rank && <div className="filter-search-rank-badge">#{anime.rank}</div>}
                        {anime.year && <div className="filter-search-year-badge">{anime.year}</div>}
                      </div>
                    </div>
                    <div className="filter-search-card-content">
                      <h3 className="filter-search-card-title" title={anime.title}>
                        {anime.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="filter-search-load-more-container">
                  <button
                    onClick={loadMoreAnime}
                    disabled={isLoading}
                    className="filter-search-cr-button filter-search-primary filter-search-load-more"
                  >
                    {isLoading ? "Loading..." : "Show More"}
                  </button>
                </div>
              )}
            </>
          ) : isLoading ? (
            <div className="filter-search-loading-state">
              <div className="filter-search-loading-grid">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="filter-search-skeleton-card">
                    <div className="filter-search-skeleton-image"></div>
                    <div className="filter-search-skeleton-content">
                      <div className="filter-search-skeleton-title"></div>
                      <div className="filter-search-skeleton-meta"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="filter-search-empty-state">
              <div className="filter-search-empty-content">
                <Filter className="filter-search-empty-icon" />
                <h3>No results found</h3>
                <p>No anime found with the current filters. Try adjusting your search criteria.</p>
                <button className="filter-search-cr-button filter-search-primary" onClick={clearSavedAnime}>
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterSearch
