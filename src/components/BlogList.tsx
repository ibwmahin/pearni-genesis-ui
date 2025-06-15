import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of AGI: Beyond Human Intelligence',
      date: '2024-06-10',
      excerpt: 'Exploring the implications of artificial general intelligence that surpasses human cognitive abilities across all domains.',
      category: 'Research',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
      tags: ['AGI', 'Future Tech', 'Intelligence'],
      author: 'Dr. Sarah Chen',
      featured: true,
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
      tags: ['Ethics', 'AI Safety', 'Responsibility'],
      author: 'Prof. Michael Torres',
      featured: true,
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
      tags: ['Science', 'Discovery', 'Research'],
      author: 'Dr. Emily Watson',
      featured: false,
      link: '/blog/scientific-breakthroughs'
    },
    {
      id: 4,
      title: 'Human-AI Collaboration: The Perfect Partnership',
      date: '2024-06-03',
      excerpt: 'Designing AI systems that enhance human capabilities rather than replace them, creating symbiotic relationships.',
      category: 'Collaboration',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      tags: ['Collaboration', 'Human-AI', 'Partnership'],
      author: 'Alex Rodriguez',
      featured: false
    },
    {
      id: 5,
      title: 'Quantum Computing Meets AGI: New Horizons',
      date: '2024-06-01',
      excerpt: 'The intersection of quantum computing and artificial general intelligence opens unprecedented computational possibilities.',
      category: 'Technology',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
      tags: ['Quantum', 'Computing', 'Innovation'],
      author: 'Dr. James Liu',
      featured: true
    },
    {
      id: 6,
      title: 'Climate Solutions Through Advanced AI',
      date: '2024-05-28',
      excerpt: 'How pearNI contributes to climate change mitigation through intelligent resource optimization and predictive modeling.',
      category: 'Environment',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?auto=format&fit=crop&w=800&q=80',
      tags: ['Climate', 'Environment', 'Sustainability'],
      author: 'Dr. Maria Gonzalez',
      featured: false
    },
    {
      id: 7,
      title: 'Neural Architecture Evolution in AGI',
      date: '2024-05-25',
      excerpt: 'Advanced neural network architectures that enable more sophisticated reasoning and learning capabilities.',
      category: 'Research',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
      tags: ['Neural Networks', 'Architecture', 'Deep Learning'],
      author: 'Dr. Kevin Park',
      featured: false
    },
    {
      id: 8,
      title: 'AGI in Drug Discovery: Accelerating Medicine',
      date: '2024-05-22',
      excerpt: 'Revolutionary applications of artificial general intelligence in pharmaceutical research and development.',
      category: 'Science',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80',
      tags: ['Medicine', 'Drug Discovery', 'Healthcare'],
      author: 'Dr. Lisa Thompson',
      featured: false
    },
    {
      id: 9,
      title: 'The Economics of AGI: Transforming Industries',
      date: '2024-05-20',
      excerpt: 'Economic implications and opportunities created by the widespread adoption of artificial general intelligence.',
      category: 'Technology',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
      tags: ['Economics', 'Industry', 'Transformation'],
      author: 'Prof. Robert Kim',
      featured: false
    }
  ];

  return (
    <div className="glass-card">
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">Complete Blog Archive</h2>
        <p className="text-readable-muted">All {blogPosts.length} articles from our research and insights collection</p>
      </div>

      <div className="space-y-6">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex gap-6 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg ${
              post.featured 
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          >
            <div className="flex-shrink-0">
              <img
                src={post.image}
                alt={post.title}
                className="w-32 h-24 object-cover rounded-xl"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  post.featured 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {post.category}
                </span>
                {post.featured && (
                  <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                    ⭐ Featured
                  </span>
                )}
              </div>
              
              <Link to={post.link || '#'}>
                <h3 className="text-xl font-bold text-readable mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                  {post.title}
                </h3>
              </Link>
              
              <p className="text-readable-muted mb-3 line-clamp-2">{post.excerpt}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-readable-light">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <div className="flex gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span 
                      key={tag}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl text-center">
        <h3 className="text-lg font-bold text-readable mb-2">Stay Updated</h3>
        <p className="text-readable-muted mb-4">Subscribe to our newsletter for the latest insights and research updates</p>
        <button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300">
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default BlogList;
