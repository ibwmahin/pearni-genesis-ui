
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import FeatureShowcase from '../components/FeatureShowcase';
import ChatDemo from '../components/ChatDemo';
import Blog from '../components/Blog';
import BlogList from '../components/BlogList';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ParallaxBackground from '../components/ParallaxBackground';

const Index = () => {
  const [showAllBlogs, setShowAllBlogs] = useState(false);

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
          
          {/* Blog Section with Toggle */}
          <section className="py-20 relative">
            <div className="container mx-auto px-4">
              {!showAllBlogs ? (
                <>
                  <Blog />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                  >
                    <button
                      onClick={() => setShowAllBlogs(true)}
                      className="glass-button text-readable font-semibold px-8 py-3 hover:scale-105 transition-all duration-300"
                    >
                      <i className='bx bx-list-ul mr-2'></i>
                      View Complete Blog Archive
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <BlogList />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mt-12"
                  >
                    <button
                      onClick={() => setShowAllBlogs(false)}
                      className="glass-button text-readable font-semibold px-8 py-3 hover:scale-105 transition-all duration-300"
                    >
                      <i className='bx bx-arrow-back mr-2'></i>
                      Back to Latest Posts
                    </button>
                  </motion.div>
                </>
              )}
            </div>
          </section>
          
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
