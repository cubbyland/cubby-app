import React, { useState } from "react";
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
  const [curationVideos, setCurationVideos] = useState([
    {
      id: 1,
      title: "Cute Cat Video",
      url: "https://example.com/cat.mp4",
      hashtags: ['favorites', 'cats']
    },
    {
      id: 2,
      title: "Funny Dog Compilation",
      url: "https://example.com/dog.mp4", 
      hashtags: ['favorites', 'dogs']
    }
  ]);
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);

  // Add search state
  const [searchHashtags, setSearchHashtags] = useState(['#favorites']);

  // Filter videos based on hashtags
  const filteredVideos = curationVideos.filter(video => 
    searchHashtags.every(tag => 
      video.hashtags?.includes(tag.replace('#', ''))
    )
  );

  const addCurationVideo = (data) => {
    if (curationVideos.length >= 10) {
      setErrorModalOpen(true);
      return;
    }
    const newVideo = { id: `curation-${Date.now()}`, title: "New Video", url: data.url };
    setCurationVideos((prev) => [...prev, newVideo]);
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
              onClick={() => setVideoModalOpen(true)}
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
                
                {filteredVideos.length === 0 ? (
                  <div className="empty-cubby">
                    <p>No posts match {searchHashtags.join(' ')}</p>
                  </div>
                ) : (
                  <VideoList
                    videos={filteredVideos}
                    onDelete={deleteCurationVideo}
                    onReorder={reorderCurationVideos}
                    isSortable={true}
                  />
                )}
              </div>

              <FavoriteCubbies />
            </div>

            <button 
              className="add-video-button"
              onClick={() => setVideoModalOpen(true)}
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
              onClick={() => setVideoModalOpen(true)}
            >
              Upload Video
            </button>
          </section>
        } />
      </Routes>

      {/* Modals */}
      {isVideoModalOpen && (
        <UploadModal
          title="Upload Video Link"
          fields={[
            {
              name: "url",
              type: "text",
              placeholder: "Enter Video URL (x.com)",
              autoFocus: true,
            },
          ]}
          onSave={addCurationVideo}
          onClose={() => setVideoModalOpen(false)}
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
