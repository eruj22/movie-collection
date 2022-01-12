import React, { useState } from "react";

function MovieFilter({
  allGenres,
  genresChecked,
  handleCheckboxToggle,
  toggleClickSearch,
  resetPageNumber,
}) {
  const [isGenreClicked, setIsGenreClicked] = useState(false);

  const filterIsClicked = () => setIsGenreClicked(true);

  const filterIsSubmitted = () => {
    setIsGenreClicked(false);
    resetPageNumber();
    window.scrollTo({ top: 0 });
  };

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
                onChange={() => {
                  handleCheckboxToggle(id);
                  filterIsClicked();
                }}
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

      <button
        className="filter__search"
        onClick={() => {
          toggleClickSearch();
          filterIsSubmitted();
        }}
        disabled={!isGenreClicked}
      >
        Search
      </button>
    </aside>
  );
}

export default MovieFilter;
