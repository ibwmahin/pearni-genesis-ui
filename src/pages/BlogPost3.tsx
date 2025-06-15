
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPost3 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8 font-medium"
            >
              <i className='bx bx-arrow-left mr-2'></i>
              Back to Home
            </Link>

            <div className="glass-card mb-12">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
                <img
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80"
                  alt="Scientific Breakthroughs"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Science
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                  Scientific Breakthroughs Accelerated by AI
                </h1>
                
                <div className="flex items-center gap-6 text-readable-muted">
                  <span>By Dr. Emily Watson</span>
                  <span>•</span>
                  <span>June 5, 2024</span>
                  <span>•</span>
                  <span>10 min read</span>
                </div>

                <p className="text-xl text-readable-muted leading-relaxed">
                  Real-world examples of how artificial intelligence is revolutionizing scientific discovery and research methodologies.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="glass-card bg-gradient-to-r from-purple-50 to-pink-50">
                <h2 className="text-2xl font-bold text-readable mb-4">Revolutionary Impact</h2>
                <p className="text-readable-muted leading-relaxed">
                  Artificial Intelligence is not just changing how we conduct science—it's fundamentally transforming what kinds of scientific questions we can ask and answer. From protein folding to climate modeling, AI is accelerating discovery at an unprecedented pace.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="text-3xl mb-4">🧬</div>
                  <h3 className="text-lg font-bold text-readable mb-2">Drug Discovery</h3>
                  <p className="text-readable-muted text-sm">AI reduces drug development time from decades to months through molecular simulation and prediction.</p>
                </div>

                <div className="glass-card bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="text-3xl mb-4">🌍</div>
                  <h3 className="text-lg font-bold text-readable mb-2">Climate Science</h3>
                  <p className="text-readable-muted text-sm">Advanced models predict climate patterns with unprecedented accuracy and detail.</p>
                </div>

                <div className="glass-card bg-gradient-to-br from-orange-50 to-red-50">
                  <div className="text-3xl mb-4">🔬</div>
                  <h3 className="text-lg font-bold text-readable mb-2">Materials Science</h3>
                  <p className="text-readable-muted text-sm">AI discovers new materials with specific properties in virtual laboratories.</p>
                </div>
              </div>

              <div className="glass-card">
                <h2 className="text-2xl font-bold text-readable mb-4">Case Study: Protein Folding</h2>
                <p className="text-readable-muted leading-relaxed mb-4">
                  DeepMind's AlphaFold represents a watershed moment in computational biology. By solving the protein folding problem that had puzzled scientists for decades, it opened new avenues for drug discovery and disease treatment.
                </p>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl">
                  <p className="text-readable font-medium italic">
                    "This breakthrough will fundamentally change how we approach drug discovery and personalized medicine." - Dr. Emily Watson
                  </p>
                </div>
              </div>

              <div className="glass-card">
                <h2 className="text-2xl font-bold text-readable mb-4">The Future of Science</h2>
                <p className="text-readable-muted leading-relaxed">
                  As AI systems become more sophisticated, we're entering an era of automated science where hypotheses can be generated, tested, and refined at machine speed. This doesn't replace human scientists but amplifies their capabilities exponentially.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost3;
