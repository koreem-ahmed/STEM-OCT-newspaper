import React, { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import { FaNewspaper } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNewspaperStore } from "../../store/Newspaper";
import "./PublishPage.scss";

const PublishPage = () => {
  const { fetchNewspaper, newspapers } = useNewspaperStore();
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const load = async () => {
      await fetchNewspaper();
      setLoading(false);
    };
    load();
  }, [fetchNewspaper]);

  return (
    <div className="publish">
      <div className="publish__bg">
        <div className="publish__orb publish__orb--1" />
        <div className="publish__orb publish__orb--2" />
        <div className="publish__grid" />
      </div>

      <div className="publish__wrap">
        <header className="publish__header">
          <div className="publish__badge">
            <FaNewspaper className="publish__badge-icon" />
            <span className="publish__badge-pulse" />
          </div>
          <div className="publish__header-text">
            <h1 className="publish__title">Latest News</h1>
            <p className="publish__subtitle">Stay updated with the newest articles</p>
          </div>
          <div className="publish__count">
            <span className="publish__count-num">{newspapers.length}</span>
            <span className="publish__count-label">articles</span>
          </div>
        </header>

        {loading && (
          <div className="publish__loader">
            <div className="publish__loader-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
            <p className="publish__loader-text">Loading news...</p>
          </div>
        )}

        {!loading && newspapers.length > 0 && (
          <div className="publish__grid-posts">
            {newspapers.map((newspaper, index) => (
              <div
                key={newspaper._id}
                className="publish__post-wrap"
                style={{ animationDelay: `${0.08 * index}s` }}
                onMouseEnter={() => setHoveredCard(newspaper._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`publish__post-glow ${hoveredCard === newspaper._id ? 'publish__post-glow--active' : ''}`} />
                <Post newspaper={newspaper} />
              </div>
            ))}
          </div>
        )}

        {!loading && newspapers.length === 0 && (
          <div className="publish__empty">
            <div className="publish__empty-illustration">
              <div className="publish__empty-paper">📰</div>
              <div className="publish__empty-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
            <h2 className="publish__empty-title">No articles yet</h2>
            <p className="publish__empty-text">Be the first to publish something amazing</p>
            <Link to="/create" className="publish__empty-btn">
              <span className="publish__empty-btn-icon">✨</span>
              <span>Create Article</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishPage;