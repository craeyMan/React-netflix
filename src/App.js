import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import MoviePage from './pages/Moives/MoviePage';
import AppLayout from './layout/AppLayout';
import Homepage  from './pages/Homepage/Homepage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="movies">
          <Route index element={<MoviePage />} />
          <Route path=":id" element={<MovieDetailPage />} />
        </Route>
      </Route>


      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
