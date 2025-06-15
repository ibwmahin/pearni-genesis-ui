
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Mail, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Pricing = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const plans = [
    {
      name: 'Starter',
      price: '$9',
      period: '/month',
      description: 'Perfect for individuals getting started with AI-powered space exploration',
      features: [
        'Basic NASA data access',
        '100 AI queries per month',
        'Standard response time',
        'Email support',
        'Basic space insights'
      ],
      buttonText: 'Get Started',
      popular: false
    },
    {
      name: 'Mid',
      price: '$29',
      period: '/month',
      description: 'Ideal for researchers and professionals who need more power',
      features: [
        'Full NASA API access',
        '1,000 AI queries per month',
        'Priority response time',
        'Live chat support',
        'Advanced analytics',
        'Custom space data queries',
        'Export capabilities'
      ],
      buttonText: 'Most Popular',
      popular: true
    },
    {
      name: 'Advanced',
      price: '$99',
      period: '/month',
      description: 'For organizations requiring enterprise-level capabilities',
      features: [
        'Unlimited NASA data access',
        'Unlimited AI queries',
        'Real-time processing',
        '24/7 priority support',
        'Advanced AI models',
        'Custom integrations',
        'Team collaboration',
        'API access',
        'White-label options'
      ],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  const handlePlanSelection = async (plan: typeof plans[0]) => {
    setIsLoading(plan.name);
    setNotification(null);

    try {
      // Initialize EmailJS (you'll need to replace these with your actual keys)
      // For now, using placeholder keys - user will need to set up EmailJS account
      const serviceId = 'your_service_id';
      const templateId = 'your_template_id';
      const publicKey = 'your_public_key';

      const templateParams = {
        plan_name: plan.name,
        plan_price: plan.price + plan.period,
        plan_description: plan.description,
        plan_features: plan.features.join(', '),
        user_timestamp: new Date().toLocaleString(),
        user_agent: navigator.userAgent,
        page_url: window.location.href,
        to_email: 'your-email@example.com' // Replace with your email
      };

      // For demo purposes, we'll simulate the email sending
      // In production, replace this with actual EmailJS call:
      // await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // Simulated delay for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Plan selection sent:', templateParams);
      
      setNotification({
        type: 'success',
        message: `Thank you! We've received your interest in the ${plan.name} plan. We'll contact you soon!`
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setNotification({
        type: 'error',
        message: 'Sorry, there was an error processing your request. Please try again.'
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Notification */}
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg ${
                notification.type === 'success' 
                  ? 'bg-green-100 border border-green-400 text-green-700' 
                  : 'bg-red-100 border border-red-400 text-red-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                {notification.message}
              </div>
            </motion.div>
          )}

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock the power of AI-driven space exploration and sustainability insights with pearNI
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-3xl p-8 shadow-lg border ${
                  plan.popular 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelection(plan)}
                  disabled={isLoading === plan.name}
                  className={`w-full py-3 px-6 rounded-full font-medium transition-colors flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50'
                  }`}
                >
                  {isLoading === plan.name ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    plan.buttonText
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
                <p className="text-gray-600">We offer a 7-day free trial for all plans so you can explore pearNI's capabilities.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">What's included in support?</h3>
                <p className="text-gray-600">All plans include technical support. Higher tiers get priority support and live chat access.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
