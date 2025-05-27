import './App.css';
import { Route, Routes } from 'react-router-dom';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import MoviePage from './pages/Movies/MoviePage';          // ✅ 장르 기반 All 페이지
import SearchPage from './pages/SearchPage/SearchPage';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Footer from './pages/Homepage/components/Footer/Footer';
import BoardPage from './pages/Board/BoardPage/BoardPage';
import NewPostPage from './pages/Board/NewPostPage/NewPostPage';
import PostDetailPage from './pages/Board/PostDetailPage/PostDetailPage';
import { BoardProvider } from './pages/Board/BoardContext';
import EditPostPage from './pages/Board/EditPostPage/EditPostPage'; 

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BoardProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />

          <Route path="movies">
            <Route index element={<MoviePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path=":id" element={<MovieDetailPage />} />
          </Route>

          <Route path="board">
            <Route index element={<BoardPage />} />
            <Route path="new" element={<NewPostPage />} />
            <Route path=":id" element={<PostDetailPage />} />
            <Route path="/board/edit/:id" element={<EditPostPage />} />
          </Route>
        </Route>
 
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
      </BoardProvider>
    </QueryClientProvider>
  );
}

export default App;
