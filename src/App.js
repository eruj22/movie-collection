import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [allGenres, setAllGenres] = useState([]);
  const [genresChecked, setGenresChecked] = useState([]);

  const addNewMovies = () => setPageNumber((pageNumber) => pageNumber + 1);

  useEffect(() => {
    setIsFetching(true);

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&sort_by=popularity.desc&page=${pageNumber}&with_genres=${genresChecked.join(
          ","
        )}`
      )
      .then((res) => {
        if (pageNumber > 1) {
          setMovies([...movies, ...res.data.results]);
          setIsFetching(false);
        } else {
          setMovies(res.data.results);
          setIsFetching(false);
        }
      })
      .catch((err) => console.log(err));
  }, [pageNumber, genresChecked]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((response) => setAllGenres(response.data.genres))
      .catch((error) => console.log(error));
  }, []);

  const handleToggle = (itemId) => {
    if (genresChecked.find((item) => item === itemId) === undefined) {
      setGenresChecked([...genresChecked, itemId]);
    } else {
      setGenresChecked(genresChecked.filter((item) => item !== itemId));
    }

    setPageNumber(1);
  };

  return (
    <section className="movies">
      <div className="container">
        <h1 className="movies__title">Popular movies</h1>

        <div className="movies__flex">
          <aside className="movies__filter">
            {allGenres.map((item) => {
              const { id, name } = item;
              return (
                <div key={id}>
                  <input
                    type="checkbox"
                    name="genre"
                    id={id}
                    onChange={() => handleToggle(id)}
                  />
                  <label htmlFor={id}>{name}</label>
                </div>
              );
            })}
          </aside>

          <main className="movies__cards">
            {isFetching ? (
              <h1>Loading...</h1>
            ) : (
              movies.map((movie) => {
                return <MovieCard key={movie.id} {...movie} />;
              })
            )}

            <button className="movies__moreBtn" onClick={addNewMovies}>
              load more movies
            </button>
          </main>
        </div>
      </div>
    </section>
  );
}

export default App;
