import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Movie from './pages/Movie/Movie';
import BestMovies from './pages/BestMovies/BestMovies';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <>
      <Header text="Кино справочник" />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <BestMovies
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setIsError={setIsError}
                isError={isError}
              />
            }
          />
          <Route
            path="/movie/:id"
            element={
              <Movie
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setIsError={setIsError}
                isError={isError}
              />
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer text="TMDB Movies 2024" />
    </>
  );
};

export default App;
