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
    const loadTwitter = () => {
      let script;
      
      if (!document.querySelector('script[src^="https://platform.twitter.com/widgets.js"]')) {
        script = document.createElement('script');
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);
      }

      if (script) {
        script.onload = () => {
          window.twttr?.widgets?.load(document.getElementById('video-feed-container'));
        };
      } else {
        setTimeout(() => {
          window.twttr?.widgets?.load();
        }, 500);
      }
    };

    const initTimer = setTimeout(loadTwitter, 300);
    const containerCheck = setInterval(() => {
      if (document.getElementById('video-feed-container')) {
        window.twttr?.widgets?.load();
        clearInterval(containerCheck);
      }
    }, 200);

    return () => {
      clearTimeout(initTimer);
      clearInterval(containerCheck);
    };
  }, [videos]);

  return (
    <div id="video-feed-container" className="video-feed">
      {isLoading && <div className="loading">Loading posts...</div>}
      {!isLoading && videos.map((video) => (
        <div key={video.id} className="video-item">
          {video.isXPost ? (
            <blockquote className="twitter-tweet" data-lang="en">
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