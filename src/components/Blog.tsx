import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of AGI: Beyond Human Intelligence',
      date: '2024-06-10',
      excerpt: 'Exploring the implications of artificial general intelligence that surpasses human cognitive abilities across all domains.',
      category: 'Research',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
      link: '/blog/future-of-agi'
    },
    {
      id: 2,
      title: 'Ethical AI: Building Responsible AGI Systems',
      date: '2024-06-08',
      excerpt: 'How pearNI incorporates ethical frameworks and safety measures to ensure AGI development serves humanity.',
      category: 'Ethics',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      link: '/blog/ethical-ai'
    },
    {
      id: 3,
      title: 'Scientific Breakthroughs Accelerated by AI',
      date: '2024-06-05',
      excerpt: 'Real-world examples of how artificial intelligence is revolutionizing scientific discovery and research methodologies.',
      category: 'Science',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80',
      link: '/blog/scientific-breakthroughs'
    },
    {
      id: 4,
      title: 'Human-AI Collaboration: The Perfect Partnership',
      date: '2024-06-03',
      excerpt: 'Designing AI systems that enhance human capabilities rather than replace them, creating symbiotic relationships.',
      category: 'Collaboration',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Quantum Computing Meets AGI: New Horizons',
      date: '2024-06-01',
      excerpt: 'The intersection of quantum computing and artificial general intelligence opens unprecedented computational possibilities.',
      category: 'Technology',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Climate Solutions Through Advanced AI',
      date: '2024-05-28',
      excerpt: 'How pearNI contributes to climate change mitigation through intelligent resource optimization and predictive modeling.',
      category: 'Environment',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?auto=format&fit=crop&w=800&q=80'
    },
    // Additional posts for "Load More" functionality
    {
      id: 7,
      title: 'Neural Architecture Evolution in AGI',
      date: '2024-05-25',
      excerpt: 'Advanced neural network architectures that enable more sophisticated reasoning and learning capabilities.',
      category: 'Research',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 8,
      title: 'AGI in Drug Discovery: Accelerating Medicine',
      date: '2024-05-22',
      excerpt: 'Revolutionary applications of artificial general intelligence in pharmaceutical research and development.',
      category: 'Science',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 9,
      title: 'The Economics of AGI: Transforming Industries',
      date: '2024-05-20',
      excerpt: 'Economic implications and opportunities created by the widespread adoption of artificial general intelligence.',
      category: 'Technology',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const categories = ['All', 'Research', 'Ethics', 'Science', 'Technology', 'Environment'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayedPosts, setDisplayedPosts] = useState(6);

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const visiblePosts = filteredPosts.slice(0, displayedPosts);
  const hasMore = displayedPosts < filteredPosts.length;

  const handleLoadMore = () => {
    setDisplayedPosts(prev => Math.min(prev + 6, filteredPosts.length));
  };

  const loadMoreVariants = {
    initial: { x: 0, rotate: 0 },
    loading: { 
      x: [-10, 10, 0],
      rotate: 90,
      transition: { 
        x: { duration: 0.3 },
        rotate: { duration: 0.2, delay: 0.1 }
      }
    }
  };

  return (
    <section id="blog" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Latest <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest developments in AGI research, ethical AI practices, and breakthrough innovations.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCategory(category);
                setDisplayedPosts(6);
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                  : 'glass text-gray-700 hover:bg-white/30'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="glass-card group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>

                <Link to={post.link || '#'}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-teal-600 font-medium pt-2"
                  >
                    <span>Read More</span>
                    <i className='bx bx-arrow-right ml-2'></i>
                  </motion.div>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              variants={loadMoreVariants}
              whileHover={{ scale: 1.05 }}
              whileTap="loading"
              onClick={handleLoadMore}
              className="glass-button text-gray-700 font-semibold px-8 py-3"
            >
              <motion.i className='bx bx-refresh mr-2'></motion.i>
              Load More Articles
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
