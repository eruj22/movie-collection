import React from "react";

function MovieFilter({ allGenres, genresChecked, handleCheckboxToggle }) {
  if (allGenres.length < 1) {
    return <h2>Explore all movies</h2>;
  }

  return (
    <aside className="filter">
      <h2 className="filter__genreTitle">Filter movies by genre</h2>

      <div className="filter__genre">
        {allGenres.map((item) => {
          const { id, name } = item;
          return (
            <div key={id}>
              <input
                type="checkbox"
                name="genre"
                id={id}
                onChange={() => handleCheckboxToggle(id)}
              />

              <label
                className={
                  genresChecked.includes(id)
                    ? "filter__label filter__label--active"
                    : "filter__label"
                }
                htmlFor={id}
              >
                {name}
              </label>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default MovieFilter;
