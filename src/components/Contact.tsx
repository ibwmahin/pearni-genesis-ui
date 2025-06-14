
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    message: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (field: string) => {
    setFocused({
      ...focused,
      [field]: true
    });
  };

  const handleBlur = (field: string, value: string) => {
    if (!value) {
      setFocused({
        ...focused,
        [field]: false
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setFocused({ name: false, email: false, message: false });
  };

  const contactInfo = [
    {
      icon: 'bx-envelope',
      title: 'Email',
      value: 'hello@pearni.ai',
      description: 'Send us a message'
    },
    {
      icon: 'bx-phone',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Call us directly'
    },
    {
      icon: 'bx-map',
      title: 'Office',
      value: 'San Francisco, CA',
      description: 'Visit our headquarters'
    }
  ];

  const socialLinks = [
    { icon: 'bxl-twitter', url: '#', name: 'Twitter' },
    { icon: 'bxl-linkedin', url: '#', name: 'LinkedIn' },
    { icon: 'bxl-github', url: '#', name: 'GitHub' },
    { icon: 'bxl-discord', url: '#', name: 'Discord' }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to explore the possibilities of AGI? Let's discuss how pearNI can transform your research and innovation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={(e) => handleBlur('name', e.target.value)}
                  className="w-full glass rounded-xl px-4 py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-300"
                  required
                />
                <motion.label
                  initial={false}
                  animate={{
                    y: focused.name || formData.name ? -24 : 0,
                    scale: focused.name || formData.name ? 0.8 : 1,
                    color: focused.name ? '#14b8a6' : '#6b7280'
                  }}
                  className="absolute left-4 top-4 text-gray-500 pointer-events-none origin-left transition-all duration-300"
                >
                  <i className='bx bx-user mr-2'></i>
                  Your Name
                </motion.label>
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={(e) => handleBlur('email', e.target.value)}
                  className="w-full glass rounded-xl px-4 py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-300"
                  required
                />
                <motion.label
                  initial={false}
                  animate={{
                    y: focused.email || formData.email ? -24 : 0,
                    scale: focused.email || formData.email ? 0.8 : 1,
                    color: focused.email ? '#14b8a6' : '#6b7280'
                  }}
                  className="absolute left-4 top-4 text-gray-500 pointer-events-none origin-left transition-all duration-300"
                >
                  <i className='bx bx-envelope mr-2'></i>
                  Email Address
                </motion.label>
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={(e) => handleBlur('message', e.target.value)}
                  rows={5}
                  className="w-full glass rounded-xl px-4 py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-300 resize-none"
                  required
                />
                <motion.label
                  initial={false}
                  animate={{
                    y: focused.message || formData.message ? -24 : 0,
                    scale: focused.message || formData.message ? 0.8 : 1,
                    color: focused.message ? '#14b8a6' : '#6b7280'
                  }}
                  className="absolute left-4 top-4 text-gray-500 pointer-events-none origin-left transition-all duration-300"
                >
                  <i className='bx bx-message mr-2'></i>
                  Your Message
                </motion.label>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <i className='bx bx-send mr-2'></i>
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-4 glass rounded-xl hover:bg-white/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <i className={`bx ${item.icon} text-white text-xl`}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-gray-600">{item.value}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-card">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 glass rounded-xl flex items-center justify-center text-gray-600 hover:text-teal-500 hover:bg-white/30 transition-all duration-300"
                  >
                    <i className={`bx ${social.icon} text-xl`}></i>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
