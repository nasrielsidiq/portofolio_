import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import About from './pages/About';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Social from './pages/Social';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          {/* Octagram Decoration System */}
          <div className="octagram-system">
            <div className="octa-track octa-track-1"></div>
            <div className="octa-track octa-track-2"></div>
            <div className="octa-track octa-track-3"></div>
            <img src="/octagram.svg" alt="" className="octagram-center" />
            <img src="/octa1.svg" alt="" className="octa-orbit octa-orbit-1" />
            <img src="/octa2.svg" alt="" className="octa-orbit octa-orbit-2" />
            <img src="/octa3.svg" alt="" className="octa-orbit octa-orbit-3" />
          </div>
          
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/article/:slug" element={<ArticleDetail />} />
              <Route path="/social" element={<Social />} />
            </Routes>
          </main>
          <Footer />
          <ThemeToggle />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
