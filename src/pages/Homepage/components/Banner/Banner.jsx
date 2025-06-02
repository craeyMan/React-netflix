import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { FaPlay, FaInfoCircle, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import MovieModal from '../../MovieModal/MovieModal';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import './Banner.style.css';
import Spinner from '../Spinner/Spinner';
import api from '../../../../utils/api'; 

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const [randomMovie, setRandomMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [certification, setCertification] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (!data?.results) return;

    const fetchValidMovie = async () => {
      const shuffled = [...data.results].sort(() => 0.5 - Math.random());

      for (const movie of shuffled) {
        try {
          const [videosRes, releaseRes] = await Promise.all([
            api.get(`/movie/${movie.id}/videos`, {
              params: { language: 'ko-KR' },
            }),
            api.get(`/movie/${movie.id}/release_dates`),
          ]);

          const trailer = videosRes.data.results.find(
            (v) => v.type === 'Trailer' && v.site === 'YouTube'
          );

          if (trailer) {
            setRandomMovie(movie);
            setTrailerKey(trailer.key);

            const krRelease = releaseRes.data.results.find(r => r.iso_3166_1 === 'KR');
            const cert = krRelease?.release_dates?.[0]?.certification;
            if (cert) setCertification(cert);
            break;
          }
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      }
    };

    fetchValidMovie();
  }, [data]);

  const handlePlayerReady = (event) => {
    setPlayer(event.target);
    isMuted ? event.target.mute() : event.target.unMute();
  };

  const toggleMute = () => {
    if (player) {
      isMuted ? player.unMute() : player.mute();
      setIsMuted(!isMuted);
    }
  };

  if (isLoading || !randomMovie || !trailerKey) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="banner">
        <YouTube
          videoId={trailerKey}
          className="banner-video"
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 1,
              controls: 0,
              mute: 1,
              loop: 1,
              playlist: trailerKey,
              modestbranding: 1,
              rel: 0,
            },
          }}
          onReady={handlePlayerReady}
        />

        <div className="banner-fade-bottom" />

        {/* 왼쪽 아래 텍스트 + 버튼 */}
        <div className="banner-content">
          <h1>{randomMovie.title}</h1>
          <div className="left-buttons">
            <button className="banner-play-button"><FaPlay /></button>
            <button className="banner-info-button" onClick={() => setShowModal(true)}>
              <FaInfoCircle /> 상세 정보
            </button>
          </div>
        </div>

        {/* 오른쪽 아래 버튼 */}
        <div className="right-buttons">
          <button className="banner-mute-button" onClick={toggleMute}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          {certification && <span className="banner-cert">{certification}+</span>}
        </div>
      </div>

      <MovieModal
        show={showModal}
        onClose={() => setShowModal(false)}
        movie={randomMovie}
      />
    </>
  );
};

export default Banner;
