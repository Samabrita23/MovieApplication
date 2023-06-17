import React from 'react';
import PageHeader from './Components/PageHeader';
// import './App.css';
import './App.css';
import WelcomeBanner from './Components/WelcomeBanner';


function App() {
  return (
    <div className="App">

      <PageHeader />
      <WelcomeBanner />



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
  );
}

export default App;
