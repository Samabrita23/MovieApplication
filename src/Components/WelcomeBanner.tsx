//WelcomeBanner.tsx
import React from 'react';
import BannerPoster from '../Assets/Banner poster.svg'
import '../Styles/WelcomeBanner.css';


const WelcomeBanner = () => {
  return (
    <div className='bannerWrapper'>
    <div className="welcome-banner">
      <img src={BannerPoster} alt="Welcome Banner" className="banner-image" />
      <div className="banner-content">
        <h1>Welcome</h1>
        <p>Discover Countless Movies, TV Shows, and Inspiring Personalities</p>
        <p>Start Exploring Now for an Unforgettable Experience !</p>
        {/* <div className="search-bar">
          <input type="text" placeholder="Search movies, TV shows, people" />
          <button>Search</button>
        </div> */}
      </div>
    </div>
    </div>
  );
};

export default WelcomeBanner;

