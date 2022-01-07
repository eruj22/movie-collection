import React from "react";

function MovieCard({
  poster_path,
  original_title,
  release_date,
  vote_average,
}) {
  //
  return (
    <article className="card">
      <img
        className="card__image"
        src={`https://image.tmdb.org/t/p/w185${poster_path}`}
        alt={`poster of movie ${original_title}`}
      />

      <div className="card__info">
        <p className="card__title">{original_title}</p>
        <p className="card__date">{release_date}</p>
      </div>
    </article>
  );
}

export default MovieCard;
