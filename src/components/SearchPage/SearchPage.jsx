"use client";

import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  Search,
  ChevronDown,
  Star,
  Flame,
  Calendar,
  X,
  Filter,
  AlertTriangle,
} from "lucide-react";
import "./SearchPage.css";

const SearchPage = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Check sidebar state from localStorage
  useEffect(() => {
    const checkSidebarState = () => {
      const savedState = localStorage.getItem("sidebarCollapsed");
      setIsSidebarCollapsed(savedState === "true");
    };

    checkSidebarState();

    // Listen for storage changes to update when sidebar state changes
    const handleStorageChange = (e) => {
      if (e.key === "sidebarCollapsed") {
        setIsSidebarCollapsed(e.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check periodically in case localStorage changes without storage event
    const interval = setInterval(checkSidebarState, 100);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Load saved search data from localStorage on component mount
  useEffect(() => {
    const savedSearch = localStorage.getItem("animeSearch");
    if (savedSearch) {
      const { query, results, page, hasMore } = JSON.parse(savedSearch);
      setSearchQuery(query);
      setSearchResults(results);
      setCurrentPage(page || 1);
      setHasMore(hasMore || false);
    }
  }, []);

  // Generate years from 1970 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1969 },
    (_, i) => currentYear - i
  );

  const handleSearch = async (page = 1, append = false) => {
    if (!searchQuery.trim()) {
      if (!searchQuery === "") {
        toast.info("Please enter a search term");
        return;
      }
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/anime/search`,
        {
          params: {
            query: searchQuery,
            page: page,
            sort: "asc",
          },
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const results = response.data.data || [];
      const pagination = response.data.pagination || {};

      if (append) {
        setSearchResults((prev) => [...prev, ...results]);
      } else {
        setSearchResults(results);
      }

      setHasMore(pagination.has_next_page || false);
      setCurrentPage(page);

      // Save search results to localStorage
      localStorage.setItem(
        "animeSearch",
        JSON.stringify({
          query: searchQuery,
          results: append ? [...searchResults, ...results] : results,
          page: page,
          hasMore: pagination.has_next_page || false,
        })
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error fetching search results";
      setError(errorMessage);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(errorMessage);
      }

      if (!append) {
        setSearchResults([]);
        localStorage.removeItem("animeSearch");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    handleSearch(currentPage + 1, true);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setCurrentPage(1);
    setHasMore(false);
    setError(null);
    localStorage.removeItem("animeSearch");
  };

  const handleYearSearch = async (year) => {
    setSelectedYear(year);
    setIsYearDropdownOpen(false);

    if (!user) {
      toast.info("Please login to view this content");
      return;
    }

    navigate(`/filter-search?year=${year}`);
  };

  const handleCategoryClick = (category) => {
    if (!user) {
      toast.info("Please login to view this content");
      return;
    }
    navigate(`/filter-search?sort=${category}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (error && searchResults.length === 0) {
    return (
      <div
        className={`rsp-page ${
          isSidebarCollapsed ? "rsp-page--sidebar-collapsed" : ""
        }`}
      >
        <div className="rsp-container">
          <div className="rsp-error-state">
            <AlertTriangle className="rsp-error-icon" />
            <h2>Something went wrong</h2>
            <p className="rsp-error-message">{error}</p>
            <button
              className="rsp-button rsp-button-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rsp-page ${
        isSidebarCollapsed ? "rsp-page--sidebar-collapsed" : ""
      }`}
    >
      {/* Header Section */}
      <div className="rsp-header">
        <div className="rsp-container">
          <div className="rsp-header-content">
            <div className="rsp-header-left">
              <h1 className="rsp-page-title">
                <Search className="rsp-header-icon" />
                Discover Anime
              </h1>
              <div className="rsp-page-meta">
                <span className="rsp-meta-item">
                  <Filter className="rsp-meta-icon" />
                  {searchResults.length > 0
                    ? `${searchResults.length} results`
                    : "Search and explore"}
                </span>
                <span className="rsp-meta-item">
                  <Calendar className="rsp-meta-icon" />
                  Updated now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="rsp-search-section">
        <div className="rsp-container">
          <div className="rsp-search-controls">
            <div className="rsp-search-bar-container">
              <div className="rsp-search-input-wrapper">
                <Search className="rsp-search-icon" />
                <input
                  type="text"
                  placeholder="Search for anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="rsp-search-input"
                />
                {(searchQuery || searchResults.length > 0) && (
                  <button
                    onClick={handleClearSearch}
                    className="rsp-clear-search-button"
                    aria-label="Clear search"
                  >
                    <X className="rsp-clear-icon" />
                  </button>
                )}
                <button
                  onClick={() => handleSearch()}
                  className="rsp-search-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>

              <div className="rsp-year-dropdown">
                <button
                  onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                  className="rsp-year-dropdown-button"
                >
                  <Calendar className="rsp-dropdown-icon" />
                  {selectedYear ? `Year: ${selectedYear}` : "Filter by Year"}
                  <ChevronDown
                    className={`rsp-chevron ${
                      isYearDropdownOpen ? "rsp-chevron-open" : ""
                    }`}
                  />
                </button>

                {isYearDropdownOpen && (
                  <div className="rsp-year-dropdown-content">
                    <div className="rsp-year-grid">
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={() => handleYearSearch(year)}
                          className={`rsp-year-item ${
                            selectedYear === year ? "rsp-year-active" : ""
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rsp-category-buttons">
              <button
                onClick={() => handleCategoryClick("top")}
                className="rsp-category-button"
              >
                <Star className="rsp-category-icon" />
                Top Anime
              </button>
              <button
                onClick={() => handleCategoryClick("popular")}
                className="rsp-category-button"
              >
                <Flame className="rsp-category-icon" />
                Popular
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="rsp-main">
        <div className="rsp-container">
          {isLoading && currentPage === 1 ? (
            <div className="rsp-loading-state">
              <div className="rsp-loading-grid">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="rsp-skeleton-card">
                    <div className="rsp-skeleton-image"></div>
                    <div className="rsp-skeleton-content">
                      <div className="rsp-skeleton-title"></div>
                      <div className="rsp-skeleton-meta"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="rsp-content-grid">
                {searchResults.map((anime) => (
                  <div
                    key={`${anime.mal_id}-${anime.title}`}
                    className="rsp-card"
                    onClick={() => navigate(`/anime/${anime.mal_id}`)}
                    role="button"
                    tabIndex="0"
                    aria-label={`View details for ${anime.title}`}
                    onKeyPress={(e) =>
                      e.key === "Enter" && navigate(`/anime/${anime.mal_id}`)
                    }
                  >
                    <div className="rsp-card-poster">
                      <div className="rsp-poster-container">
                        <img
                          src={
                            anime.images?.jpg?.image_url || "/placeholder.svg"
                          }
                          alt={anime.title}
                          className="rsp-poster-image"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300x400/23252b/ffffff?text=No+Image";
                            e.target.alt = "Image not available";
                          }}
                        />
                        {anime.rank && (
                          <div className="rsp-rank-badge">#{anime.rank}</div>
                        )}
                        {anime.year && (
                          <div className="rsp-year-badge">{anime.year}</div>
                        )}
                      </div>
                    </div>
                    <div className="rsp-card-content">
                      <h3 className="rsp-card-title" title={anime.title}>
                        {anime.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="rsp-load-more-container">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="rsp-button rsp-button-primary rsp-load-more"
                  >
                    {isLoading ? "Loading..." : "Show More"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rsp-empty-state">
              <div className="rsp-empty-content">
                <Search className="rsp-empty-icon" />
                <h3>Start your anime journey</h3>
                <p>
                  {searchQuery
                    ? "No results found for your search. Try different keywords."
                    : "Search for anime titles or use the filters above to discover new shows."}
                </p>
                {(searchQuery || searchResults.length > 0) && (
                  <button
                    className="rsp-button rsp-button-primary"
                    onClick={handleClearSearch}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
