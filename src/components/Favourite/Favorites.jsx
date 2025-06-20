import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "../axiosConfig";
import {
  X,
  Star,
  AlertTriangle,
  Bookmark,
  Calendar,
  Heart,
} from "lucide-react";
import { toast } from "react-toastify";
import "./Favorites.css";

const Favorites = () => {
  const { user, verifyAuth } = useOutletContext();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view favorites");
      return;
    }

    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/user/favorites/${user.id}`,
          {
            withCredentials: true,
            timeout: 5000,
          }
        );

        // Transform data to ensure consistent structure
        const formattedFavorites = response.data.map((item) => ({
          mal_id: item.mal_id || item.id,
          id: item.mal_id || item.id,
          title: item.title,
          images: item.images || {
            jpg: {
              image_url: item.image_url || "",
            },
          },
          score: item.score,
          members: item.members,
          year: item.year,
          status: item.status,
        }));

        setFavorites(formattedFavorites);
        setError(null);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError(err.response?.data?.error || "Failed to fetch favorites");
        if (err.response?.status === 401) {
          await verifyAuth();
          toast.error("Session expired. Please login again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [user, navigate, verifyAuth]);

  const removeFavorite = async (animeId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/user/favorites/${user.id}/${animeId}`,
        {
          withCredentials: true,
        }
      );

      setFavorites((prev) => prev.filter((fav) => fav.mal_id !== animeId));
      toast.success("Removed from favorites");
    } catch (err) {
      console.error("Error removing favorite:", err);
      toast.error(err.response?.data?.error || "Failed to remove favorite");
      if (err.response?.status === 401) {
        await verifyAuth();
      }
    }
  };

  if (error) {
    return (
      <div className="favorites-crunchyroll-page">
        <div className="favorites-cr-container">
          <div className="favorites-error-state">
            <AlertTriangle className="favorites-error-icon" />
            <h2>Something went wrong</h2>
            <p className="favorites-error-message">{error}</p>
            <button
              className="favorites-cr-button favorites-primary"
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
    <div className="favorites-crunchyroll-page">
      {/* Header Section */}
      <div className="favorites-cr-header">
        <div className="favorites-cr-container">
          <div className="favorites-header-content">
            <div className="favorites-header-left">
              <h1 className="favorites-page-title">My Favorites</h1>
              <div className="favorites-page-meta">
                <span className="favorites-meta-item">
                  <Bookmark className="favorites-meta-icon" />
                  {!user
                    ? "Please login to view your list"
                    : isLoading
                    ? "Loading..."
                    : `${favorites.length} titles`}
                </span>
                <span className="favorites-meta-item">
                  <Calendar className="favorites-meta-icon" />
                  Last updated today
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="favorites-cr-main">
        <div className="favorites-cr-container">
          {!user ? (
            <div className="favorites-auth-required">
              <div className="favorites-auth-card">
                <Heart className="favorites-auth-icon" />
                <h3>Sign in required</h3>
                <p>Please sign in to view your favorites list</p>
               
              </div>
            </div>
          ) : isLoading ? (
            <div className="favorites-loading-state">
              <div className="favorites-loading-grid">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="favorites-skeleton-card">
                    <div className="favorites-skeleton-image"></div>
                    <div className="favorites-skeleton-content">
                      <div className="favorites-skeleton-title"></div>
                      <div className="favorites-skeleton-meta"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : favorites.length > 0 ? (
            <div className="favorites-content-grid">
              {favorites.map((anime) => (
                <div
                  key={anime.mal_id}
                  className="favorites-cr-card"
                  onClick={() => navigate(`/anime/${anime.mal_id}`)}
                >
                  <div className="favorites-card-poster">
                    <div className="favorites-poster-container">
                      <img
                        src={anime.images?.jpg?.image_url || ""}
                        alt={anime.title}
                        className="favorites-poster-image"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x400/23252b/ffffff?text=No+Image";
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFavorite(anime.mal_id);
                        }}
                        className="favorites-remove-button"
                        title="Remove from favorites"
                      >
                        <X className="favorites-remove-icon" />
                      </button>
                      {anime.year && (
                        <div className="favorites-year-badge">{anime.year}</div>
                      )}
                    </div>
                  </div>
                  <div className="favorites-card-content">
                    <h3 className="favorites-card-title" title={anime.title}>
                      {anime.title}
                    </h3>
                    <div className="favorites-card-meta">
                      <div className="favorites-meta-row">
                        <span className="favorites-meta-label">Rating:</span>
                        <div className="favorites-rating">
                          <Star className="favorites-star-icon" />
                          <span className="favorites-rating-value">
                            {anime.score || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="favorites-meta-row">
                        <span className="favorites-meta-label">Members:</span>
                        <span className="favorites-meta-value">
                          {anime.members
                            ? `${(anime.members / 1000000).toFixed(1)}M`
                            : "N/A"}
                        </span>
                      </div>
                      <div className="favorites-meta-row">
                        <span className="favorites-meta-label">Status:</span>
                        <span className="favorites-meta-value favorites-status">
                          {anime.status || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="favorites-empty-state">
              <div className="favorites-empty-content">
                <Heart className="favorites-empty-icon" />
                <h3>No favorites yet</h3>
                <p>
                  Start building your favorites list by adding anime you love!
                </p>
                <button
                  className="favorites-cr-button favorites-primary"
                  onClick={() => navigate("/search-page")}
                >
                  Browse Anime
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
