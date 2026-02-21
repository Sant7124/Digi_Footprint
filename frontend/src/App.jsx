import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import { LandingPage } from './pages/LandingPage';
import { ScannerPage } from './pages/ScannerPage';
import { ResultsPage } from './pages/ResultsPage';
import { EducationPage } from './pages/EducationPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
