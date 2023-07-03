import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageHeader from './Components/PageHeader';
import WelcomeBanner from './Components/WelcomeBanner';
import TrendingWidget from './Components/TrendingWidget';
import MovieDetailPage from './Components/MovieDetailPage';
import LatestTrailers from './Components/LatestTrailers';
import WhatsPopularWidget from './Components/WhatsPopularWidget';
import FreeToWatchWidget from './Components/FreeToWatchWidget';
import PageFooter from './Components/PageFooter';


function HomePage() {
  return (
    <div className="home-page">
      <WelcomeBanner />
      <TrendingWidget />
      <LatestTrailers />
      <WhatsPopularWidget/>
      <FreeToWatchWidget />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <PageHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage mediaType="movie" />} />
          <Route path="/tv/:id" element={<MovieDetailPage mediaType="tv" />} />
        </Routes>
        <PageFooter />
      </div>
    </Router>
  );
}

export default App;
