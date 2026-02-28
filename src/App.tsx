import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import ThreeBackground from './components/ThreeBackground';
import { Text3D } from './components/Text3D';
import { QuoteModal } from './components/QuoteModal';
import { AdminDashboard } from './components/AdminDashboard';
import { 
  Phone, 
  Sun, 
  Battery, 
  Wind, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight, 
  Zap,
  ShieldCheck,
  Award
} from 'lucide-react';

// --- Components ---

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 p-2 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse">
              <Sun className="w-6 h-6 text-slate-950 fill-slate-950" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight text-white drop-shadow-lg">
              <span className="text-amber-500">Gold Coast Solar Power Solutions</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors hover:scale-105 transform duration-200">Services</a>
            <a href="#about" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors hover:scale-105 transform duration-200">About</a>
            <a href="#testimonials" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors hover:scale-105 transform duration-200">Reviews</a>
            
            <div className="flex items-center gap-4 ml-4">
              <a 
                href="tel:1300000000" 
                className="flex items-center gap-2 text-white font-medium hover:text-amber-400 transition-colors hover:scale-105 transform duration-200"
              >
                <Phone className="w-4 h-4 animate-bounce" />
                <span>+61 7 5522 8980</span>
              </a>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenModal}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]"
              >
                Get a Free Quote
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden bg-slate-900/98 backdrop-blur-2xl border-b border-white/10 overflow-hidden absolute w-full top-full left-0 shadow-2xl z-50"
          >
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1
                  }
                }
              }}
              className="px-6 py-8 space-y-5"
            >
              {[
                { name: 'Services', href: '#services' },
                { name: 'About', href: '#about' },
                { name: 'Reviews', href: '#testimonials' }
              ].map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="block text-slate-300 hover:text-amber-400 font-medium text-xl transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="pt-6 border-t border-white/10 space-y-5"
              >
                <a href="tel:1300000000" className="flex items-center gap-3 text-white font-bold justify-center w-full py-3 text-xl bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                  <Phone className="w-6 h-6 text-amber-500" />
                  +61 7 5522 8980
                </a>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onOpenModal(); }} 
                  className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded-xl font-bold text-xl shadow-[0_4px_20px_rgba(245,158,11,0.3)] active:scale-[0.98] transition-all"
                >
                  Get a Free Quote
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]); // Reduced movement
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);  // Reduced movement
  const opacity = useTransform(scrollY, [0, 600], [1, 0]); // Extended fade out range

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay - Reduced opacity to show 3D background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          style={{ perspective: 1000, y: y1, opacity }}
          className="max-w-4xl backdrop-blur-sm bg-slate-950/30 p-8 rounded-3xl border border-white/5 shadow-2xl z-20 flex flex-col items-center"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-[0_0_10px_#f59e0b]"></span>
            </span>
            #1 Rated Solar Installer in QLD
          </motion.div>
          
          <motion.h1 style={{ y: y2 }} className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-6 drop-shadow-2xl">
            Power Your Home. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 animate-gradient-x bg-[length:200%_auto]">
              Cut Your Bills.
            </span> <br />
            Go Solar Today.
          </motion.h1>
          
          <motion.p style={{ y: y2 }} className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl drop-shadow-md">
            Speak directly to fully qualified local electricians and CEC Accredited installers—not a pushy sales call centre.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245,158,11,0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenModal}
              className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                Get Your Free Quote
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </motion.button>
            <motion.a 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              href="#services" 
              className="inline-flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-white/10"
            >
              View Services
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Trust Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-4 items-center text-slate-400 text-sm font-medium backdrop-blur-sm bg-slate-950/20 rounded-xl p-4 inline-flex"
        >
          <div className="flex items-center gap-2 hover:text-amber-400 transition-colors cursor-default group">
            <ShieldCheck className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span>Clean Energy Council Approved</span>
          </div>
          <div className="flex items-center gap-2 hover:text-amber-400 transition-colors cursor-default group">
            <Zap className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span>Tesla Certified Installer</span>
          </div>
          <div className="flex items-center gap-2 hover:text-amber-400 transition-colors cursor-default group">
            <Award className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span>QLD Electrical Contractor Licence</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


const Counter = ({ end, suffix = "", label }: { end: number, suffix?: string, label: string }) => {
  const [count, setCount] = useState(0);
  const { scrollYProgress } = useScroll();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Simple intersection observer simulation for this demo
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasAnimated) return;
    
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [end, hasAnimated]);

  return (
    <div className="text-center p-6 border-r border-white/5 last:border-0">
      <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-amber-500 font-medium tracking-wide uppercase text-sm">
        {label}
      </div>
    </div>
  );
};

const StatsStrip = () => {
  return (
    <section className="bg-slate-900 border-y border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 divide-white/5">
          <Counter end={20} suffix="+" label="Years Experience" />
          <Counter end={10000} suffix="+" label="Panels Installed" />
          <Counter end={500} suffix="+" label="5-Star Local Reviews" />
        </div>
      </div>
    </section>
  );
};


const ServiceCard = ({ icon: Icon, title, description, roi, onQuote }: { icon: any, title: string, description: string, roi: string, onQuote: () => void }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const parallaxY_Icon = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const parallaxY_Content = useTransform(scrollYProgress, [0, 1], [15, -15]);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      className="group bg-slate-900/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-amber-500/50 transition-colors duration-300 relative overflow-hidden cursor-pointer shadow-xl"
    >
      <motion.div style={{ z: 50, y: parallaxY_Icon }} className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-24 h-24 text-amber-500" />
      </motion.div>
      
      <motion.div style={{ z: 75, y: parallaxY_Icon }} className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors text-amber-500 shadow-lg shadow-amber-500/20">
        <Icon className="w-6 h-6" />
      </motion.div>
      
      <motion.h3 style={{ z: 60, y: parallaxY_Content }} className="text-2xl font-display font-bold text-white mb-3">{title}</motion.h3>
      
      <motion.div style={{ z: 50, y: parallaxY_Content }} className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-4 bg-emerald-400/10 py-1 px-3 rounded-full w-fit">
        <Zap className="w-3 h-3" />
        {roi}
      </motion.div>
      
      <motion.p style={{ z: 40, y: parallaxY_Content }} className="text-slate-400 mb-8 leading-relaxed">
        {description}
      </motion.p>
      
      <motion.button 
        style={{ z: 60 }}
        onClick={(e) => {
          e.stopPropagation();
          onQuote();
        }}
        className="w-full py-3 rounded-lg border border-white/10 text-white font-medium hover:bg-white hover:text-slate-950 transition-all flex items-center justify-center gap-2 group-hover:border-amber-500 group-hover:text-amber-500 group-hover:hover:bg-amber-500 group-hover:hover:text-slate-950 shadow-lg"
      >
        Request a Quote
      </motion.button>
    </motion.div>
  );
};

const Services = ({ onOpenModal }: { onOpenModal: (service: string) => void }) => {
  return (
    <section id="services" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <h2 className="text-amber-500 font-medium tracking-wide uppercase text-sm mb-3">Our Services</h2>
          <Text3D text="Complete Energy Solutions" className="text-4xl md:text-5xl font-display font-bold text-white mb-6 justify-center" />
          <p className="text-slate-400 text-lg">
            From residential rooftops to large-scale commercial arrays, we design systems that maximize your savings and energy independence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard 
            icon={Sun}
            title="Residential Solar"
            roi="Save up to $2,500/yr"
            description="Premium Tier-1 panels and inverters designed for Australian conditions. Slash your quarterly bills immediately."
            onQuote={() => onOpenModal("Residential Solar")}
          />
          <ServiceCard 
            icon={Wind}
            title="Commercial Solar"
            roi="ROI in 3-4 Years"
            description="Scale up your savings. We handle everything from engineering to grid connection for businesses of all sizes."
            onQuote={() => onOpenModal("Commercial Solar")}
          />
          <ServiceCard 
            icon={Battery}
            title="Battery Storage"
            roi="Power Through Blackouts"
            description="Store your excess solar energy for use at night. Tesla Powerwall and Sungrow certified installers."
            onQuote={() => onOpenModal("Battery Storage")}
          />
          <ServiceCard 
            icon={Zap}
            title="Ducted Air Con"
            roi="Smart Climate Control"
            description="Ultra-efficient ducted systems that pair perfectly with solar to keep your home cool for free."
            onQuote={() => onOpenModal("Ducted Air Con")}
          />
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ name, location, text }: { name: string, location: string, text: string }) => (
  <div className="bg-slate-900 p-8 rounded-2xl border border-white/5 relative">
    <div className="flex gap-1 text-amber-500 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
    </div>
    <p className="text-slate-300 italic mb-6 leading-relaxed">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 font-bold">
        {name[0]}
      </div>
      <div>
        <div className="text-white font-bold">{name}</div>
        <div className="text-slate-500 text-sm">{location}</div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-amber-500 font-medium tracking-wide uppercase text-sm mb-3">Customer Stories</h2>
          <Text3D text="Don't Just Take Our Word For It" className="text-4xl font-display font-bold text-white justify-center" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            name="Sarah Jenkins"
            location="Gold Coast"
            text="The team was incredibly professional. They arrived exactly when they said they would, left the site spotless, and the system is generating even more power than quoted. Highly recommend!"
          />
          <TestimonialCard 
            name="Michael Ross"
            location="Brisbane South"
            text="Refreshing to deal with a tradesman rather than a salesperson. No pressure, just honest advice. The installation of our 10kW system was seamless."
          />
          <TestimonialCard 
            name="David Chen"
            location="Byron Bay"
            text="We installed both solar and ducted air con with Gold Coast Solar Power Solutions. The integration is fantastic - we basically run our AC for free during the day now. Great ROI."
          />
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-amber-500 font-medium tracking-wide uppercase text-sm mb-3">Service Areas</h2>
            <Text3D text="Local Experts Serving Your Community" className="text-4xl md:text-5xl font-display font-bold text-white mb-6" />
            <p className="text-slate-400 text-lg mb-8">
              We are proud to service the entire South East Queensland and Northern NSW region. From the Sunshine Coast down to Ballina.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-white">
                <MapPin className="text-amber-500 w-5 h-5" />
                <span>Gold Coast & Hinterland</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <MapPin className="text-amber-500 w-5 h-5" />
                <span>Brisbane Greater Metro</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <MapPin className="text-amber-500 w-5 h-5" />
                <span>Northern NSW (Tweed to Byron)</span>
              </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl border border-white/5 inline-block">
              <p className="text-slate-400 text-sm mb-2">Call us directly</p>
              <a href="tel:1300000000" className="text-2xl font-bold text-white hover:text-amber-500 transition-colors flex items-center gap-2">
                <Phone className="w-6 h-6" />
                +61 7 5522 8980
              </a>
              <p className="text-slate-400 text-sm mt-4 mb-2">Email us directly</p>
              <a href="mailto:info@gcsolar.com.au" className="text-lg font-bold text-white hover:text-amber-500 transition-colors flex flex-wrap items-center gap-2">
                info@gcsolar.com.au, sales@gcsolar.com.au
              </a>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl border border-white/10 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent rounded-3xl pointer-events-none"></div>
            <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Get Your Free Quote</h3>
            <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number</label>
                <input type="tel" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="0400 000 000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Service Needed</label>
                <select className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors">
                  <option>Residential Solar</option>
                  <option>Commercial Solar</option>
                  <option>Battery Storage</option>
                  <option>Air Conditioning</option>
                  <option>Service & Repair</option>
                </select>
              </div>
              <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 rounded-lg transition-all shadow-[0_4px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.4)] mt-2">
                Request Callback
              </button>
              <p className="text-xs text-slate-500 text-center mt-4">
                No obligation. We respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onAdminClick }: { onAdminClick: () => void }) => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12 text-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 p-1.5 rounded-md">
              <Sun className="w-4 h-4 text-slate-950 fill-slate-950" />
            </div>
            <span className="text-xl font-display font-bold text-white">
              <span className="text-amber-500">Gold Coast Solar Power Solutions</span>
            </span>
          </div>
          
          <div className="text-slate-500 text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Gold Coast Solar Power Solutions. All rights reserved.</p>
            <p className="mt-1">QLD Lic: 12345678 | NSW Lic: 987654C | ARC: L123456</p>
            <button 
              onClick={onAdminClick}
              className="mt-6 text-slate-600 hover:text-amber-500 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 border border-white/5 hover:border-amber-500/30 px-3 py-1 rounded-full bg-white/5 hover:bg-amber-500/5 cursor-pointer relative z-10"
            >
              Admin Access
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isAdminView, setIsAdminView] = useState(false);

  const openQuoteModal = (service: string = "General Inquiry") => {
    setSelectedService(service);
    setModalOpen(true);
  };

  if (isAdminView) {
    window.scrollTo(0, 0);
    return <AdminDashboard onBack={() => setIsAdminView(false)} />;
  }

  return (
    <div className="font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      <ThreeBackground />
      <QuoteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} serviceTitle={selectedService} />
      <Navbar onOpenModal={() => openQuoteModal("General Inquiry")} />
      <Hero onOpenModal={() => openQuoteModal("General Inquiry")} />
      <StatsStrip />
      <Services onOpenModal={openQuoteModal} />
      <Testimonials />
      <Contact />
      <Footer onAdminClick={() => {
        console.log("Admin button clicked");
        setIsAdminView(true);
      }} />
    </div>
  );
}
