
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import FeatureShowcase from "@/components/FeatureShowcase";
import ChatDemo from "@/components/ChatDemo";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ParallaxBackground />
      <Header />
      <Hero />
      <About />
      <Features />
      <FeatureShowcase />
      <ChatDemo />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
