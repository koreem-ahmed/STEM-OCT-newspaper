const Card = ({ title, imgUrl, description, url, source, author, publishedAt }) => {
  return (
    <div className="mt-10 everything-card">
      <div className="flex-wrap gap-1 p-5 mb-1">
        <b className="title">{title}</b>
        <div className="mx-auto">
          <img className="everything-card-img" src={imgUrl} alt={title} />
        </div>
      </div>

      <div className="description">
        <p className="leading-7 description-text">
          {description?.substring(0, 200)}
        </p>
      </div>

      <div className="info">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Source:</span>
          <a href={url} target="_blank" rel="noreferrer" className="underline break-words link">
            {source?.substring(0, 70)}
          </a>
        </div>

        <div className="flex flex-col">
          <p><span className="font-semibold">Author:</span> {author}</p>
          <p><span className="font-semibold">Published At:</span> {publishedAt}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
