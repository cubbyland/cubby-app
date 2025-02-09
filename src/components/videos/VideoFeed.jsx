import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../api/client';

const VideoFeed = ({ hashtags }) => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadVideos = async () => {
      if (!hashtags.length) {
        setIsLoading(false);
        setVideos([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await api.getPosts(hashtags);
        if (isActive) setVideos(data);
      } catch (err) {
        if (isActive) {
          setVideos([]);
          console.error('Failed to load posts:', err);
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadVideos();
    return () => {
      isActive = false;
      controller.abort();
    };
  }, [hashtags]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="video-feed-container" className="video-feed">
      {isLoading && <div className="loading">Loading posts...</div>}
      {!isLoading && videos.map((video) => (
        <div key={video.id} className="video-item">
          {video.isXPost ? (
            <blockquote className="twitter-tweet">
              <a href={video.url}></a>
            </blockquote>
          ) : (
            <>
              <h3>{video.title}</h3>
              <p>Hashtags: {video.hashtags?.join(', ')}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

VideoFeed.propTypes = {
  hashtags: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default VideoFeed;