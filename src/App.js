import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import MoviePage from './pages/Movies/MoviePage';          // ✅ 장르 기반 All 페이지
import SearchPage from './pages/SearchPage';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Footer from './pages/Homepage/components/Footer/Footer';


const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}> 
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          
          {/* 🎬 영화 관련 라우팅 */}
          <Route path="movies">
            <Route index element={<MoviePage />} />          {/* ✅ All: 장르별 슬라이드 */}
            <Route path="search" element={<SearchPage />} /> {/* 🔍 검색 결과 페이지 */}
            <Route path=":id" element={<MovieDetailPage />} /> {/* 📄 영화 상세페이지 */}
          </Route>
        </Route>

        {/* 404 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </QueryClientProvider>
    </div>
  );
}

export default App;
