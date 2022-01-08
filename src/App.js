import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
    // eslint-disable-next-line
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
    <>
      <Header />
      <section className="movies">
        <div className="container">
          <h1 className="movies__title">Popular movies</h1>

          <div className="movies__flex">
            <aside className="movies__filter">
              <h2 className="movies__genreTitle">Filter movies by genre</h2>

              <div className="movies__genre">
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
                      <label
                        className={
                          genresChecked.includes(id)
                            ? "movies__label movies__label--active"
                            : "movies__label"
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

            <main className="movies__cards">
              {isFetching ? (
                <h1>Loading...</h1>
              ) : (
                movies.map((movie) => {
                  return <MovieCard key={movie.id} {...movie} />;
                })
              )}

              {isFetching ? (
                ""
              ) : (
                <button className="movies__moreBtn" onClick={addNewMovies}>
                  load more
                </button>
              )}
            </main>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
