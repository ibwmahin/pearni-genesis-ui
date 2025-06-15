
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPost1 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Button */}
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium"
            >
              <i className='bx bx-arrow-left mr-2'></i>
              Back to Home
            </Link>

            {/* Hero Section */}
            <div className="glass-card mb-12">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
                  alt="The Future of AGI"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Research
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                  The Future of AGI: Beyond Human Intelligence
                </h1>
                
                <div className="flex items-center gap-6 text-readable-muted">
                  <span>By Dr. Sarah Chen</span>
                  <span>•</span>
                  <span>June 10, 2024</span>
                  <span>•</span>
                  <span>8 min read</span>
                </div>

                <p className="text-xl text-readable-muted leading-relaxed">
                  Exploring the implications of artificial general intelligence that surpasses human cognitive abilities across all domains.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div className="glass-card">
                <h2 className="text-2xl font-bold text-readable mb-4">Introduction</h2>
                <p className="text-readable-muted leading-relaxed mb-4">
                  Artificial General Intelligence (AGI) represents the next evolutionary leap in artificial intelligence—systems that can understand, learn, and apply knowledge across any domain at or beyond human level. Unlike narrow AI that excels in specific tasks, AGI promises to revolutionize every aspect of human civilization.
                </p>
                <p className="text-readable-muted leading-relaxed">
                  As we stand on the precipice of this technological revolution, it's crucial to understand not just the capabilities AGI will unlock, but the profound implications for humanity's future.
                </p>
              </div>

              <div className="glass-card bg-gradient-to-r from-blue-50 to-purple-50">
                <h2 className="text-2xl font-bold text-readable mb-4">The Cognitive Revolution</h2>
                <p className="text-readable-muted leading-relaxed mb-4">
                  AGI systems will possess cognitive capabilities that transcend human limitations. They will process information at unprecedented speeds, maintain perfect memory recall, and synthesize knowledge across vast domains simultaneously.
                </p>
                <ul className="list-disc list-inside text-readable-muted space-y-2">
                  <li>Instantaneous learning and knowledge acquisition</li>
                  <li>Perfect information retention and recall</li>
                  <li>Parallel processing across multiple domains</li>
                  <li>Creativity and innovation beyond human imagination</li>
                </ul>
              </div>

              <div className="glass-card">
                <h2 className="text-2xl font-bold text-readable mb-4">Scientific Acceleration</h2>
                <p className="text-readable-muted leading-relaxed">
                  Perhaps nowhere will AGI's impact be more profound than in scientific research. By automating hypothesis generation, experimental design, and data analysis, AGI will compress decades of research into years or months. We're already seeing early signs of this transformation in drug discovery, materials science, and theoretical physics.
                </p>
              </div>

              <div className="glass-card bg-gradient-to-r from-green-50 to-teal-50">
                <h2 className="text-2xl font-bold text-readable mb-4">Conclusion</h2>
                <p className="text-readable-muted leading-relaxed">
                  The future of AGI is not just about creating smarter machines—it's about fundamentally reimagining what's possible for intelligence itself. As we approach this threshold, we must ensure that the development of AGI remains aligned with human values and serves to enhance rather than replace human potential.
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

export default BlogPost1;
