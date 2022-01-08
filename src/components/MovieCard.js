import React from "react";
import moment from "moment";

function MovieCard({
  poster_path,
  original_title,
  release_date,
  vote_average,
}) {
  return (
    <article className="card">
      <img
        className="card__image"
        src={`https://image.tmdb.org/t/p/w185${poster_path}`}
        alt={`poster of movie ${original_title}`}
      />

      <div className="card__info">
        <p className="card__title">{original_title}</p>
        <p className="card__date">
          {moment(release_date).format("DD MMM, YYYY")}
        </p>

        <div className="card__ratingOuter">
          <div
            className="card__ratingInner"
            style={{
              background: `conic-gradient(#ffd60a ${
                vote_average * 10 * 3.6
              }deg, #383838 ${vote_average * 10 * 3.6}deg)`,
            }}
          >
            <div className="card__value">
              <span className="card__percentage">{vote_average}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
