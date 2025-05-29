import './App.css';
import { Route, Routes } from 'react-router-dom';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import MoviePage from './pages/Movies/MoviePage';
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
import { AuthProvider } from './context/AuthContext';
import SignupPage from './pages/Homepage/components/Auth/SignupPage/SignupPage';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider> 
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
                <Route path="edit/:id" element={<EditPostPage />} />
              </Route>
            </Route>

            <Route path="/signup" element={<SignupPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Footer />
        </BoardProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
