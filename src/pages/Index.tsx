
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import FeatureShowcase from '../components/FeatureShowcase';
import ChatDemo from '../components/ChatDemo';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ParallaxBackground from '../components/ParallaxBackground';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ParallaxBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Features />
          <FeatureShowcase />
          <ChatDemo />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
