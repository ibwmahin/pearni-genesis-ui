
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const [showToast, setShowToast] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user starts typing
    if (formErrors[e.target.name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: false
      });
    }
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

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
      message: !formData.message.trim()
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Show success toast
    setShowToast(true);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setFocused({ name: false, email: false, message: false });
    
    // Auto-dismiss toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const shakeVariants = {
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5 }
    }
  };

  const toastVariants = {
    hidden: { 
      opacity: 0, 
      y: -100,
      backdrop: "rgba(0,0,0,0)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      backdrop: "rgba(0,0,0,0.1)",
      transition: { duration: 0.4, ease: "easeOut" }
    }
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
              <motion.div 
                className="relative"
                variants={shakeVariants}
                animate={formErrors.name ? "shake" : ""}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={(e) => handleBlur('name', e.target.value)}
                  className={`w-full glass rounded-xl px-4 py-4 text-gray-800 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    formErrors.name ? 'focus:ring-red-500/50 ring-2 ring-red-500/50' : 'focus:ring-teal-500/50'
                  }`}
                  required
                />
                <motion.label
                  initial={false}
                  animate={{
                    y: focused.name || formData.name ? -24 : 0,
                    scale: focused.name || formData.name ? 0.8 : 1,
                    color: formErrors.name ? '#ef4444' : focused.name ? '#14b8a6' : '#6b7280'
                  }}
                  className="absolute left-4 top-4 pointer-events-none origin-left transition-all duration-300"
                >
                  <i className='bx bx-user mr-2'></i>
                  Your Name
                </motion.label>
              </motion.div>

              {/* Email Field */}
              <motion.div 
                className="relative"
                variants={shakeVariants}
                animate={formErrors.email ? "shake" : ""}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={(e) => handleBlur('email', e.target.value)}
                  className={`w-full glass rounded-xl px-4 py-4 text-gray-800 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    formErrors.email ? 'focus:ring-red-500/50 ring-2 ring-red-500/50' : 'focus:ring-teal-500/50'
                  }`}
                  required
                />
                <motion.label
                  initial={false}
                  animate={{
                    y: focused.email || formData.email ? -24 : 0,
                    scale: focused.email || formData.email ? 0.8 : 1,
                    color: formErrors.email ? '#ef4444' : focused.email ? '#14b8a6' : '#6b7280'
                  }}
                  className="absolute left-4 top-4 pointer-events-none origin-left transition-all duration-300"
                >
                  <i className='bx bx-envelope mr-2'></i>
                  Email Address
                </motion.label>
              </motion.div>

              {/* Message Field */}
              <motion.div 
                className="relative"
                variants={shakeVariants}
                animate={formErrors.message ? "shake" : ""}
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={(e) => handleBlur('message', e.target.value)}
                  rows={5}
                  className={`w-full glass rounded-xl px-4 py-4 text-gray-800 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                    formErrors.message ? 'focus:ring-red-500/50 ring-2 ring-red-500/50' : 'focus:ring-teal-500/50'
                  }`}
                  required
                />
                <motion.label
                  initial={false}
                  animate={{
                    y: focused.message || formData.message ? -24 : 0,
                    scale: focused.message || formData.message ? 0.8 : 1,
                    color: formErrors.message ? '#ef4444' : focused.message ? '#14b8a6' : '#6b7280'
                  }}
                  className="absolute left-4 top-4 pointer-events-none origin-left transition-all duration-300"
                >
                  <i className='bx bx-message mr-2'></i>
                  Your Message
                </motion.label>
              </motion.div>

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

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="glass-card bg-green-500/20 border-green-500/30">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <i className='bx bx-check text-white'></i>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Thank you!</h4>
                  <p className="text-green-700">Your message has been sent successfully.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
