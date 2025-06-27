import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { initializeDynamicBackground } from './utils/dynamicBackground';
import './styles/globals.css';

function App() {
  useEffect(() => {
    initializeDynamicBackground();
  }, []);

  return (
    <div className="min-h-screen dynamic-bg">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;