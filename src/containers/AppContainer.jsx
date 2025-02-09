import React, { useState, useEffect } from "react";
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
import api from '../api/client';
import VideoFeed from '../components/videos/VideoFeed';
import Spinner from 'react-bootstrap/Spinner';

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

  // Add refresh trigger
  const [refreshKey, setRefreshKey] = useState(0);

  const [allPosts, setAllPosts] = useState([]);

  // Add loading effect
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const posts = await api.getPosts([]);
        setAllPosts(posts);
        setCurationVideos(posts.slice(0, 3)); // Initial 3 videos
      } catch (err) {
        console.error('Initial load failed:', err);
      } finally {
        setInitialLoad(false);
      }
    };

    if (initialLoad) {
      loadInitialData();
    }
  }, [initialLoad]); // Dependency ensures single run

  // Modify useEffect
  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadPosts = async () => {
      if (searchHashtags.length === 0) {
        if (isActive) {
          setIsLoading(false);
          setCurationVideos([]);
        }
        return;
      }

      setIsLoading(true);
      try {
        const posts = await api.getPosts(searchHashtags);
        if (isActive) {
          setCurationVideos(posts);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Fetch error:', err);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadPosts();
    return () => {
      isActive = false;
      controller.abort();
    };
  }, [searchHashtags]);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await api.getPosts([]);
      setAllPosts(posts);
    };
    loadPosts();
  }, [refreshKey]);

  const [isErrorModalOpen, setErrorModalOpen] = useState(false);

  // Filter videos based on hashtags
  const filteredVideos = hashtags.length > 0 
    ? curationVideos.filter(video => 
        hashtags.every(searchTag =>
          video.hashtags?.some(videoTag =>
            videoTag.toLowerCase() === searchTag.toLowerCase()
          )
        )
      )
    : [];

  // Update upload handler
  const handleVideoUpload = async (newVideo) => {
    const result = await api.savePost(newVideo);
    if (result.success) {
      setCurationVideos(prev => [...prev, newVideo]);
      handleUploadSuccess();
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

  // Add these state reset functions
  const forceStateReset = () => {
    setSearchHashtags([]);
    setCurationVideos([]);
    setIsLoading(false);
    console.log('FORCED STATE RESET');
  };

  // Modify hashtag handler
  const handleSearchHashtags = (hashtags) => {
    if (JSON.stringify(hashtags) !== JSON.stringify(searchHashtags)) {
      setSearchHashtags(hashtags);
      forceStateReset();
      if (hashtags.length > 0) {
        setIsLoading(true);
      }
    }
  };

  const handleUploadSuccess = () => {
    setRefreshKey(prev => prev + 1);
    if (window.twttr) {
      window.twttr.widgets.load();
    }
  };

  return (
    <div className="app-container">
      {initialLoad ? (
        <div className="loading-screen">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
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
                  Upload
                </button>
              </section>
            } />
            
            <Route path="/cubby" element={
              <section className="cubby-section">
                <h2>My Cubby</h2>
                
                <div className="cubby-content">
                  <div className="video-curation">
                    <SearchBar 
                      onSearch={(tags) => {
                        setHashtags(tags);
                        setSearchHashtags(tags);
                      }} 
                      initialTags={['#favorites']}
                    />
                    
                    <div className="curation-interface">
                      <VideoFeed key={refreshKey} hashtags={searchHashtags} />
                    </div>
                  </div>

                  <FavoriteCubbies />
                </div>

                <button 
                  className="add-video-button"
                  onClick={() => setIsUploadModalOpen(true)}
                >
                  Upload
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
                  Upload
                </button>
              </section>
            } />

            <Route path="/videos" element={
              <section className="video-section">
                <VideoList 
                  videos={filteredVideos}
                  isLoading={isLoading}
                  hasActiveSearch={searchHashtags.length > 0}
                />
              </section>
            } />
          </Routes>

          {/* Modals */}
          {isUploadModalOpen && (
            <UploadModal
              onSave={handleVideoUpload}
              onClose={() => setIsUploadModalOpen(false)}
              onSuccess={handleUploadSuccess}
              selectedHashtags={searchHashtags}
            />
          )}
          {isErrorModalOpen && (
            <ErrorModal
              onClose={() => setErrorModalOpen(false)}
              message="You have reached the maximum limit of 10 videos. Please delete a video to upload a new one."
            />
          )}

          <div className="debug-view">
            <h3>All Posts (Debug):</h3>
            {allPosts.map((post) => (
              <div key={post.id} className="debug-post">
                <p>ID: {post.id} | URL: {post.url}</p>
                <p>Hashtags: {post.hashtags?.join(', ') || 'none'}</p>
                <p>Is X Post: {post.isXPost ? 'true' : 'false'}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AppContainer;
