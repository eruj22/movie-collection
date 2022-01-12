import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import MovieFilter from "./components/MovieFilter";

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState({ movies: false, genre: false });
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [genresChecked, setGenresChecked] = useState([]);
  const [clickSearch, setClickSearch] = useState(false);

  const addNewMovies = () => setPageNumber((pageNumber) => pageNumber + 1);

  const resetPageNumber = () => setPageNumber(1);

  const toggleClickSearch = () => setClickSearch(!clickSearch);

  const handleCheckboxToggle = (itemId) => {
    if (genresChecked.find((item) => item === itemId) === undefined) {
      setGenresChecked([...genresChecked, itemId]);
    } else {
      setGenresChecked(genresChecked.filter((item) => item !== itemId));
    }
  };

  const fetchMovies = (url) => {
    setIsFetching(true);

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${url}&language=en-US&sort_by=popularity.desc&page=${pageNumber}&with_genres=${genresChecked.join(
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
      .catch((error) => {
        setIsError({ ...isError, movies: true });
        console.log(error);
      });
  };

  const fetchGenres = (url) => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${url}&language=en-US`
      )
      .then((response) => {
        setAllGenres(response.data.genres);
      })
      .catch((error) => {
        setIsError({ ...isError, genre: true });
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMovies(process.env.REACT_APP_API_KEY);
    // eslint-disable-next-line
  }, [pageNumber, clickSearch]);

  useEffect(() => {
    fetchGenres(process.env.REACT_APP_API_KEY);
    // eslint-disable-next-line
  }, []);

  if (isError.movies || isError.genre) {
    return (
      <div>
        <h1>There has been an error. Try refreshing the page.</h1>
      </div>
    );
  }

  return (
    <>
      <Header />

      <section className="movies">
        <div className="container">
          <h1 className="movies__title">Popular movies</h1>

          <div className="movies__flex">
            <MovieFilter
              allGenres={allGenres}
              genresChecked={genresChecked}
              handleCheckboxToggle={handleCheckboxToggle}
              toggleClickSearch={toggleClickSearch}
              resetPageNumber={resetPageNumber}
            />

            {movies.length < 1 ? (
              <h2 className="movies__empty">No movies found</h2>
            ) : isFetching ? (
              <main className="movies__cards">
                <h1>Loading...</h1>
              </main>
            ) : (
              <main className="movies__cards">
                {movies.map((movie) => {
                  return <MovieCard key={movie.id} {...movie} />;
                })}

                <button className="movies__moreBtn" onClick={addNewMovies}>
                  load more
                </button>
              </main>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
