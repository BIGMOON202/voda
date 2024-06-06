import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router} from 'react-router-dom';

import { RouteHandler } from './RouteHandler'; // Ensure this is correctly imported based on your file structure

function App() {
  return (
    <Router>
      <RouteHandler />
    </Router>
  );
}

export default App;
