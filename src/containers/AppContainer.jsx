import React, { useState, useEffect } from "react";
import ReactDom from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import VideoList from "../components/videos/VideoList";
import UploadModal from "../components/modals/UploadModal";
import ErrorModal from "../components/modals/ErrorModal";
import Bio from "../components/profile/Bio";
import SocialLinks from "../components/profile/SocialLinks";
import ProfilePicture from "../components/profile/ProfilePicture";
import Achievements from "../components/profile/Achievements";
import "../styles/highlight.css";
import "../styles/global.css";
import NavBar from '../components/navigation/NavBar';
import FavoriteCubbies from '../components/cubby/FavoriteCubbies';
import SearchBar from '../components/cubby/SearchBar';
import { api } from '../api/client';

const AppContainer = () => {
  // Profile Section State
  const [profile, setProfile] = useState({
    name: 'Cubby User',
    handle: '@cubber',
    image: null,
    socialLinks: [],
    hashtags: ['#cubbylife', '#digitalhoarder']
  });

  // Cubby Section State (ONLY DECLARE ONCE)
  const [curationVideos, setCurationVideos] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // Add initial loaded state
  const [initialLoad, setInitialLoad] = useState(true);

  // Proper initial state
  const [searchHashtags, setSearchHashtags] = useState([]);

  // Direct state control
  const handleHashtagUpdate = (newHashtags) => {
    setSearchHashtags(newHashtags);
    setIsLoading(newHashtags.length > 0); // Immediate state sync
    if (newHashtags.length === 0) {
      setCurationVideos([]);
    }
  };

  // Modify useEffect
  useEffect(() => {
    if (searchHashtags.length === 0) return;

    let isMounted = true;
    setIsLoading(true);
    
    api.getPosts(searchHashtags)
      .then(posts => {
        if (isMounted) setCurationVideos(posts);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false };
  }, [searchHashtags]);

  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);

  // Filter videos based on hashtags
  const filteredVideos = searchHashtags.length > 0 
    ? curationVideos.filter(video => 
        searchHashtags.every(searchTag =>
          video.hashtags.some(videoTag =>
            videoTag.toLowerCase() === searchTag.toLowerCase()
          )
        )
      )
    : [];

  // Add validation function
  const validateHashtagLimits = (newVideo) => {
    const hashtagCounts = {};
    
    curationVideos.forEach(video => {
      video.hashtags.forEach(tag => {
        if (tag !== '#favorites') {
          hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
        }
      });
    });

    return newVideo.hashtags.every(tag => 
      tag === '#favorites' || 
      (hashtagCounts[tag] || 0) < 3
    );
  };

  // Update upload handler
  const handleVideoUpload = async (newVideo) => {
    const result = await api.savePost(newVideo);
    if (result.success) {
      setCurationVideos(prev => [...prev, newVideo]);
    }
  };

  const addCurationVideo = (data) => {
    if (curationVideos.length >= 10) {
      setErrorModalOpen(true);
      return;
    }
    const newVideo = { id: `curation-${Date.now()}`, title: "New Video", url: data.url };
    handleVideoUpload(newVideo);
  };

  const deleteCurationVideo = (id) => {
    console.log("Deleting Curation Video with ID: ", id);
    setCurationVideos((prev) => {
      const updatedVideos = prev.filter((video) => video.id !== id);
      console.log("Updated Curation Videos: ", updatedVideos);
      return updatedVideos;
    });
  };  
  
  

  const reorderCurationVideos = (reorderedVideos) => {
    setCurationVideos(reorderedVideos);
  };

  // Social Links Handlers
  const addSocialLink = () => {
    setProfile(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '' }]
    }));
  };

  const updateSocialLink = (index, action) => {
    if (action === 'remove') {
      setProfile(prev => ({
        ...prev,
        socialLinks: prev.socialLinks.filter((_, i) => i !== index)
      }));
    } else {
      setProfile(prev => {
        const updatedLinks = [...prev.socialLinks];
        updatedLinks[index][field] = value;
        return { ...prev, socialLinks: updatedLinks };
      });
    }
  };

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  const handleSavePost = (newPost) => {
    setCurationVideos(prev => [...prev, newPost]);
  };

  // Add clear button handler
  const handleClearSearch = () => {
    setSearchHashtags([]);
    setCurationVideos([]);
    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <NavBar />
      
      <Routes>
        <Route path="/profile" element={
          <section className="profile-section">
            <div className="profile-header">
              <ProfilePicture
                src={profile.image}
                onChange={img => setProfile(p => ({...p, image: img}))}
              />
              <div className="profile-info">
                <input
                  value={profile.name}
                  onChange={e => setProfile(p => ({...p, name: e.target.value}))}
                  className="profile-name"
                />
                <input
                  value={profile.handle}
                  onChange={e => setProfile(p => ({...p, handle: e.target.value}))}
                  className="profile-handle"
                />
              </div>
            </div>

            <div className="profile-social">
              <h3>Social Links</h3>
              <SocialLinks
                links={profile.socialLinks}
                onAdd={addSocialLink}
                onUpdate={updateSocialLink}
              />
            </div>

            <div className="profile-hashtags">
              <h3>Signature Hashtags</h3>
              <div className="hashtag-cloud">
                {profile.hashtags.map((tag, i) => (
                  <span key={i} className="hashtag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Achievements />
            <button 
              className="add-video-button"
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload Video
            </button>
          </section>
        } />
        
        <Route path="/cubby" element={
          <section className="cubby-section">
            <h2>My Cubby</h2>
            
            <div className="cubby-content">
              <div className="video-curation">
                <SearchBar 
                  onSearch={setSearchHashtags} 
                  initialTags={['#favorites']}
                />
                
                <div className="curation-interface">
                  <VideoList 
                    videos={filteredVideos}
                    isLoading={isLoading && searchHashtags.length > 0}
                  />
                </div>
              </div>

              <FavoriteCubbies />
            </div>

            <button 
              className="add-video-button"
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload Video
            </button>
          </section>
        } />
        
        {/* Default redirect */}
        <Route path="/" element={
          <section className="profile-section">
            <div className="profile-header">
              <ProfilePicture
                src={profile.image}
                onChange={img => setProfile(p => ({...p, image: img}))}
              />
              <div className="profile-info">
                <input
                  value={profile.name}
                  onChange={e => setProfile(p => ({...p, name: e.target.value}))}
                  className="profile-name"
                />
                <input
                  value={profile.handle}
                  onChange={e => setProfile(p => ({...p, handle: e.target.value}))}
                  className="profile-handle"
                />
              </div>
            </div>

            <div className="profile-social">
              <h3>Social Links</h3>
              <SocialLinks
                links={profile.socialLinks}
                onAdd={addSocialLink}
                onUpdate={updateSocialLink}
              />
            </div>

            <div className="profile-hashtags">
              <h3>Signature Hashtags</h3>
              <div className="hashtag-cloud">
                {profile.hashtags.map((tag, i) => (
                  <span key={i} className="hashtag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Achievements />
            <button 
              className="add-video-button"
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload Video
            </button>
          </section>
        } />
      </Routes>

      {/* Modals */}
      {isUploadModalOpen && (
        <UploadModal
          onClose={() => setIsUploadModalOpen(false)}
          onSave={handleSavePost}
        />
      )}
      {isErrorModalOpen && (
        <ErrorModal
          onClose={() => setErrorModalOpen(false)}
          message="You have reached the maximum limit of 10 videos. Please delete a video to upload a new one."
        />
      )}
    </div>
  );
};

export default AppContainer;
