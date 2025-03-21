import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Omuto AI Hub</h1>
          <p>Welcome to the Omuto AI Hub platform!</p>
        </header>
        <main>
          <p>This platform is currently under development.</p>
          <p>Coming soon: Grant Generator Studio, Funder Matchmaker, Theory of Change Builder, and Impact Dashboard.</p>
        </main>
      </div>
    </Router>
  );
}

export default App;
