import { createContext, useContext, useState } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  const addVideo = (newVideo) => {
    setVideos(prev => [...prev, newVideo]);
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);