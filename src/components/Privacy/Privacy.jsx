import { Shield, Eye, Download, Database, Info, CheckCircle } from "lucide-react"
import "./Privacy.css"

const Privacy = () => {
  return (
    <div className="rpp-page">
      <div className="rpp-container">
        {/* Header Section */}
        <div className="rpp-header">
          <div className="rpp-header-content">
            <h1 className="rpp-page-title">
              <Shield className="rpp-header-icon" />
              Privacy Policy
            </h1>
            <p className="rpp-page-subtitle">
              Your privacy and data protection are important to us. Learn how we handle your information.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="rpp-main">
          <div className="rpp-content">
            {/* Section 1: Anime Content Ownership */}
            <div className="rpp-section">
              <div className="rpp-section-header">
                <Info className="rpp-section-icon" />
                <h2 className="rpp-section-title">1. Anime Content Ownership</h2>
              </div>
              <div className="rpp-section-content">
                <p className="rpp-paragraph">
                  Our app allows users to explore anime information, search for titles, and add favorites to their
                  personal list. However, we do not host, stream, or distribute any anime content.
                </p>
                <p className="rpp-paragraph">
                  All anime titles, characters, images, logos, and related media are the intellectual property of their
                  respective creators, production studios, and license holders. We do not claim ownership of any anime
                  content presented within the app.
                </p>
                <div className="rpp-highlight-box">
                  <CheckCircle className="rpp-highlight-icon" />
                  <p className="rpp-highlight-text">
                    We use publicly available data or APIs to provide anime details purely for informational and
                    entertainment purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: No Streaming or Downloading */}
            <div className="rpp-section">
              <div className="rpp-section-header">
                <Download className="rpp-section-icon" />
                <h2 className="rpp-section-title">2. No Streaming or Downloading</h2>
              </div>
              <div className="rpp-section-content">
                <p className="rpp-paragraph">
                  This app is not a streaming platform. Users cannot watch or download anime through this app.
                </p>
                <div className="rpp-feature-list">
                  <div className="rpp-feature-item">
                    <CheckCircle className="rpp-feature-icon" />
                    <span>Discovering anime titles</span>
                  </div>
                  <div className="rpp-feature-item">
                    <CheckCircle className="rpp-feature-icon" />
                    <span>Tracking favorites</span>
                  </div>
                  <div className="rpp-feature-item">
                    <CheckCircle className="rpp-feature-icon" />
                    <span>Learning more about titles</span>
                  </div>
                </div>
                <p className="rpp-paragraph">The app is intended only for the purposes listed above.</p>
              </div>
            </div>

            {/* Section 3: User Data & Privacy */}
            <div className="rpp-section">
              <div className="rpp-section-header">
                <Database className="rpp-section-icon" />
                <h2 className="rpp-section-title">3. User Data & Privacy</h2>
              </div>
              <div className="rpp-section-content">
                <p className="rpp-paragraph">
                  We respect your privacy. Any user data collected—such as favorites or preferences—is used solely to
                  enhance your experience within the app.
                </p>
                <div className="rpp-privacy-grid">
                  <div className="rpp-privacy-card">
                    <Eye className="rpp-privacy-icon" />
                    <h3 className="rpp-privacy-title">Data Collection</h3>
                    <p className="rpp-privacy-text">
                      We only collect data necessary for app functionality, such as your favorites and preferences.
                    </p>
                  </div>
                  <div className="rpp-privacy-card">
                    <Shield className="rpp-privacy-icon" />
                    <h3 className="rpp-privacy-title">Data Protection</h3>
                    <p className="rpp-privacy-text">
                      Your data is securely stored and protected using industry-standard security measures.
                    </p>
                  </div>
                  <div className="rpp-privacy-card">
                    <CheckCircle className="rpp-privacy-icon" />
                    <h3 className="rpp-privacy-title">No Sharing</h3>
                    <p className="rpp-privacy-text">
                      We do not share, sell, or misuse your data in any way. Your information stays private.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="rpp-footer-note">
              <div className="rpp-footer-content">
                <Shield className="rpp-footer-icon" />
                <div className="rpp-footer-text">
                  <h3>Questions about our Privacy Policy?</h3>
                  <p>
                    If you have any questions or concerns about how we handle your data, please don't hesitate to
                    contact us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
