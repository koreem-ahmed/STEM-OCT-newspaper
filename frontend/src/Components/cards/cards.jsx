import './cards.scss'

const Card = ({ title, imgUrl, description, url, source, author, publishedAt }) => {
  return (
    <div className="news-card">
      {imgUrl && (
        <div className="news-card__img-wrap">
          <img className="news-card__img" src={imgUrl} alt={title} />
        </div>
      )}

      <div className="news-card__body">
        <h3 className="news-card__title">{title}</h3>

        {description && (
          <p className="news-card__desc">{description.substring(0, 200)}</p>
        )}

        <div className="news-card__meta">
          <div className="news-card__source">
            <span className="news-card__label">Source:</span>
            <a href={url} target="_blank" rel="noreferrer" className="news-card__link">
              {source?.substring(0, 70)}
            </a>
          </div>

          {author && (
            <p className="news-card__author">
              <span className="news-card__label">Author:</span> {author}
            </p>
          )}

          {publishedAt && (
            <p className="news-card__date">
              <span className="news-card__label">Published:</span> {publishedAt}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
