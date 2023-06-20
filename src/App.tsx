import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageHeader from './Components/PageHeader';
// import './App.css';
import './App.css';
import WelcomeBanner from './Components/WelcomeBanner';
import TrendingWidget from './Components/TrendingWidget';
import MovieDetailPage from './Components/MovieDetailPage';


function App() {
  return (
    <Router>
      <div className="App">
        <PageHeader />
        <WelcomeBanner />
        <Routes>
          <Route path="/" Component={TrendingWidget} />
          <Route path="/movie/:id" Component={MovieDetailPage} />
        </Routes>


       {/* <header className="App-header">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header> */}

    </div>
       </Router>
  );
}

export default App;
