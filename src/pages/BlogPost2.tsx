
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPost2 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
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
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-8 font-medium"
            >
              <i className='bx bx-arrow-left mr-2'></i>
              Back to Home
            </Link>

            <div className="glass-card mb-12">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80"
                  alt="Ethical AI"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Ethics
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                  Ethical AI: Building Responsible AGI Systems
                </h1>
                
                <div className="flex items-center gap-6 text-readable-muted">
                  <span>By Prof. Michael Torres</span>
                  <span>•</span>
                  <span>June 8, 2024</span>
                  <span>•</span>
                  <span>6 min read</span>
                </div>

                <p className="text-xl text-readable-muted leading-relaxed">
                  How pearNI incorporates ethical frameworks and safety measures to ensure AGI development serves humanity.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="glass-card border-l-4 border-emerald-500">
                <h2 className="text-2xl font-bold text-readable mb-4">The Ethical Imperative</h2>
                <p className="text-readable-muted leading-relaxed">
                  As artificial intelligence systems become more sophisticated and autonomous, the need for robust ethical frameworks becomes paramount. The development of AGI presents unprecedented challenges that require careful consideration of moral, social, and philosophical implications.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card bg-gradient-to-br from-emerald-50 to-green-50">
                  <h3 className="text-xl font-bold text-readable mb-3">Core Principles</h3>
                  <ul className="space-y-2 text-readable-muted">
                    <li>• Transparency and explainability</li>
                    <li>• Fairness and non-discrimination</li>
                    <li>• Privacy and data protection</li>
                    <li>• Human autonomy and dignity</li>
                  </ul>
                </div>

                <div className="glass-card bg-gradient-to-br from-blue-50 to-cyan-50">
                  <h3 className="text-xl font-bold text-readable mb-3">Safety Measures</h3>
                  <ul className="space-y-2 text-readable-muted">
                    <li>• Robust testing and validation</li>
                    <li>• Continuous monitoring systems</li>
                    <li>• Fail-safe mechanisms</li>
                    <li>• Human oversight protocols</li>
                  </ul>
                </div>
              </div>

              <div className="glass-card">
                <h2 className="text-2xl font-bold text-readable mb-4">Implementation Framework</h2>
                <p className="text-readable-muted leading-relaxed mb-4">
                  At pearNI, we've developed a comprehensive ethical framework that guides every aspect of our AGI development process. This framework is built on three pillars: responsibility, transparency, and human-centricity.
                </p>
                <p className="text-readable-muted leading-relaxed">
                  Our approach ensures that ethical considerations are not an afterthought but are embedded into the core architecture of our systems from the ground up.
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

export default BlogPost2;
