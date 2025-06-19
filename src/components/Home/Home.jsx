"use client"

import { useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { Star, Flame, Calendar, ArrowRight, Heart, Users, Search, Sparkles, Plus, BookOpen } from "lucide-react"
import char1 from "../img/anime-manga-4chan-weapon-girl-sexy-b00e5aa44aafa8e6dfe234ea873b1c87.png"
import char2 from "../img/Sung-Jin-Woo-Solo-Leveling-Character-Holding-Knives-4146.png"
import char3 from "../img/Saitama-One-Punch-Man-protagonist-anime-transparent-PNG-image.png"
import char4 from "../img/Sung-Jinwoo-Shadow-Monarch-Ascends-4291.png"
import "./Home.css"

const Home = () => {
  const navigate = useNavigate()
  const { user } = useOutletContext()

  // Intersection Observer for smooth scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("home-animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".home-animate-on-scroll")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const categories = [
    {
      name: "Top Rated",
      icon: <Star />,
      path: "/filter-search?sort=top",
      description: "Discover the highest rated anime of all time",
      gradient: "linear-gradient(135deg, #f47521 0%, #ff6b35 100%)",
    },
    {
      name: "Most Popular",
      icon: <Flame />,
      path: "/filter-search?sort=popular",
      description: "Explore trending and most watched anime",
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)",
    },
    {
      name: "Latest Releases",
      icon: <Calendar />,
      path: "/filter-search?year=2024",
      description: "Find the newest anime releases this year",
      gradient: "linear-gradient(135deg, #4ecdc4 0%, #6bcf7f 100%)",
    },
  ]

  return (
    <div className="home-crunchyroll-page">
      {/* Hero Section - Original Design */}
      <section className="home-hero">
        <div className="home-hero-background">
          <div className="home-floating-elements">
            <div className="home-floating-sakura home-sakura-1"></div>
            <div className="home-floating-sakura home-sakura-2"></div>
            <div className="home-floating-sakura home-sakura-3"></div>
            <div className="home-floating-sakura home-sakura-4"></div>
          </div>
        </div>

        <div className="home-hero-content">
          <div className="home-cr-container">
            <div className="home-hero-text home-animate-on-scroll">
              <div className="home-welcome-badge">
                <Sparkles className="home-welcome-icon" />
                <span>Welcome to AnimeVerse</span>
              </div>
              <h1 className="home-hero-title">
                <span className="home-title-line">Track & Discover</span>
                <span className="home-title-accent">Your Anime Journey</span>
              </h1>
              <p className="home-hero-subtitle">
                Create your personal anime collection, track your favorites, and discover new series to add to your
                watchlist. Build the ultimate anime library that's uniquely yours.
              </p>

              <div className="home-hero-actions">
                <button onClick={() => navigate("/search-page")} className="home-cr-button home-primary home-large">
                  <BookOpen className="home-button-icon" />
                  Start Building Your List
                </button>
                {user ? (
                  <button onClick={() => navigate("/favorites")} className="home-cr-button home-secondary home-large">
                    <Heart className="home-button-icon" />
                    My Collection
                  </button>
                ) : (
                  <button className="home-cr-button home-secondary home-large">
                    <Users className="home-button-icon" />
                    Join Community
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Platform Section */}
      <section className="home-about-section home-animate-on-scroll">
        <div className="home-cr-container">
          <div className="home-about-layout">
            {/* Left - Large Anime Character */}
            <div className="home-about-character">
              <img src={char1 || "/placeholder.svg"} alt="Anime Character" className="home-about-character-image" />
            </div>

            {/* Middle - Message */}
            <div className="home-about-text">
              <h2 className="home-about-title">Your Gateway to Anime Discovery</h2>
              <p className="home-about-description">
                Whether you're a seasoned otaku or just beginning your anime journey, AnimeVerse is your perfect
                companion for discovering new series and movies. Explore thousands of titles and create your personal
                favorites list to keep track of the anime that captures your heart.
              </p>
              <div className="home-about-features">
                <div className="home-feature-item">
                  <Heart className="home-feature-icon" />
                  <span>Add to Favorites</span>
                </div>
                <div className="home-feature-item">
                  <Search className="home-feature-icon" />
                  <span>Explore Thousands of Anime</span>
                </div>
                <div className="home-feature-item">
                  <Plus className="home-feature-icon" />
                  <span>Discover New Series</span>
                </div>
              </div>
            </div>

            {/* Right - Anime Collage */}
            <div className="home-about-collage">
              <div className="home-anime-collage">
                <div className="home-anime-poster home-poster-1">
                  <img
                    src="https://cdn.myanimelist.net/images/anime/10/47347l.jpg"
                    alt="Attack on Titan"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x400/23252b/ffffff?text=Anime"
                    }}
                  />
                  <div className="home-poster-overlay">
                    <div className="home-poster-info">
                      <h4>Action</h4>
                      <p>Epic Adventures</p>
                    </div>
                  </div>
                </div>
                <div className="home-anime-poster home-poster-2">
                  <img
                    src="https://cdn.myanimelist.net/images/anime/1286/99889l.jpg"
                    alt="Demon Slayer"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x400/23252b/ffffff?text=Anime"
                    }}
                  />
                  <div className="home-poster-overlay">
                    <div className="home-poster-info">
                      <h4>Romance</h4>
                      <p>Heartfelt Stories</p>
                    </div>
                  </div>
                </div>
                <div className="home-anime-poster home-poster-3">
                  <img
                    src="https://cdn.myanimelist.net/images/anime/5/87048l.jpg"
                    alt="Your Name"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x400/23252b/ffffff?text=Anime"
                    }}
                  />
                  <div className="home-poster-overlay">
                    <div className="home-poster-info">
                      <h4>Fantasy</h4>
                      <p>Magical Worlds</p>
                    </div>
                  </div>
                </div>
                <div className="home-anime-poster home-poster-4">
                  <img
                    src="https://cdn.myanimelist.net/images/anime/6/79597l.jpg"
                    alt="Spirited Away"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x400/23252b/ffffff?text=Anime"
                    }}
                  />
                  <div className="home-poster-overlay">
                    <div className="home-poster-info">
                      <h4>Slice of Life</h4>
                      <p>Daily Adventures</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="home-categories-section home-animate-on-scroll">
        <div className="home-categories-background">
          <img src={char2 || "/placeholder.svg"} alt="Anime Background" className="home-categories-bg-image" />
        </div>
        <div className="home-cr-container">
          <div className="home-section-header">
            <h2 className="home-section-title">Explore by Category</h2>
            <p className="home-section-subtitle">
              Find and add anime to your collection by browsing our curated categories
            </p>
          </div>

          <div className="home-categories-grid">
            {categories.map((category, index) => (
              <div
                key={index}
                className="home-category-card home-animate-on-scroll"
                onClick={() => navigate(category.path)}
                style={{ "--category-gradient": category.gradient, animationDelay: `${index * 0.2}s` }}
              >
                <div className="home-category-background"></div>
                <div className="home-category-content">
                  <div className="home-category-icon">{category.icon}</div>
                  <h3 className="home-category-name">{category.name}</h3>
                  <p className="home-category-description">{category.description}</p>
                  <div className="home-category-action">
                    <span>Browse & Add</span>
                    <ArrowRight className="home-category-arrow" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Original Design */}
      <section className="home-cta-section home-animate-on-scroll">
        <div className="home-cta-background">
          <div className="home-cta-character-left">
            <img src={char3 || "/placeholder.svg"} alt="Saitama" className="home-cta-character-image-left" />
          </div>
          <div className="home-cta-character-right">
            <img src={char4 || "/placeholder.svg"} alt="Shadow Monarch" className="home-cta-character-image-right" />
          </div>
        </div>
        <div className="home-cr-container">
          <div className="home-cta-content">
            <div className="home-cta-text">
              <h2 className="home-cta-title">Ready to Start Your Anime Collection?</h2>
              <p className="home-cta-subtitle">
                Join thousands of anime fans who use AnimeVerse to track their favorite series, discover new shows, and
                build their ultimate anime collection.
              </p>
            </div>
            <div className="home-cta-actions">
              <button onClick={() => navigate("/search-page")} className="home-cr-button home-primary home-xl">
                <BookOpen className="home-button-icon" />
                Start Collecting
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
