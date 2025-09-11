'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    // Scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.reveal, .slide-in-left, .slide-in-right, .scale-in, .fade-in, .rotate-in');
    animatedElements.forEach((el) => observer.observe(el));

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="font-inter text-white overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator" 
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
      
      {/* Floating Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 nav-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold gradient-text">Gaurav.dev</div>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <a href="#home" className="nav-link text-white/80 hover:text-[#00d4ff] transition-colors duration-300 text-sm lg:text-base">Home</a>
              <a href="#about" className="nav-link text-white/80 hover:text-[#00d4ff] transition-colors duration-300 text-sm lg:text-base">About</a>
              <a href="#skills" className="nav-link text-white/80 hover:text-[#00d4ff] transition-colors duration-300 text-sm lg:text-base">Skills</a>
              <a href="#experience" className="nav-link text-white/80 hover:text-[#00d4ff] transition-colors duration-300 text-sm lg:text-base">Experience</a>
              <a href="#projects" className="nav-link text-white/80 hover:text-[#00d4ff] transition-colors duration-300 text-sm lg:text-base">Projects</a>
              <a href="#contact" className="nav-link text-white/80 hover:text-[#00d4ff] transition-colors duration-300 text-sm lg:text-base">Contact</a>
            </div>
            <button className="md:hidden text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center z-10 w-full">
          <div className="reveal flex flex-col items-center">
            <div className="profile-image-container mb-8 sm:mb-10">
              <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 mx-auto glass rounded-full flex items-center justify-center neon-glow overflow-hidden relative">
                {/* Profile Image */}
                <Image 
                  src="/profile-image.jpg" 
                  alt="Gaurav Singh Bais" 
                  width={176}
                  height={176}
                  className="w-full h-full object-cover rounded-full"
                  priority
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const nextElement = target.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                {/* Fallback G letter - hidden by default */}
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text absolute inset-0 flex items-center justify-center" style={{display: 'none'}}>G</span>
              </div>
            </div>
            <div className="hero-text max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 leading-tight">
                Hi, I&apos;m <span className="gradient-text">Gaurav</span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/80 mb-8 sm:mb-10">
                Full-Stack <span className="gradient-text font-semibold">Engineer</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed px-4 sm:px-0">
                Turning <span className="font-semibold gradient-text">complex ideas</span> into 
                <span className="font-semibold text-[#00d4ff]"> seamless products</span>. 🚀 <br />
                I specialize in building <span className="font-semibold text-[#8b5cf6]">scalable web apps</span> with the <span className="font-bold text-[#f472b6]">MERN stack</span> — 
                <span className="italic"> fast</span>, <span className="italic">reliable</span>, and 
                <span className="italic"> built to grow</span>. ⚡
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0 w-full max-w-md sm:max-w-none">
              <button 
                onClick={() => scrollToSection('projects')} 
                className="glass px-8 py-4 rounded-xl font-semibold text-lg neon-glow hover:scale-105 transition-all duration-300 flex-1 sm:flex-none"
              >
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="border border-[#00d4ff]/50 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#00d4ff]/10 transition-all duration-300 flex-1 sm:flex-none"
              >
                Let&apos;s Connect
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="reveal text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 gradient-text">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="slide-in-left">
              <div className="glass-card rounded-3xl p-8 h-full">
                <h3 className="text-3xl font-bold mb-6 gradient-text">My Journey</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  I&apos;m a full-stack engineer with 3+ years of hands-on experience building scalable web applications and SaaS platforms using the MERN stack. What started as curiosity about how products work quickly grew into a career focused on crafting systems that are reliable, efficient, and impactful.
                </p>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  At RapidData, I contributed to a low-code platform where I built reusable React components, analytics dashboards, and optimized performance for enterprise users. Later, at NoxAlgo, I worked as a full-stack engineer, building a SaaS social media management tool with React, Node.js, DevOps pipelines, and even React Native for mobile scheduling.
                </p>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  Through these roles, I&apos;ve learned that great software isn&apos;t just about code — it&apos;s about solving problems, streamlining workflows, and delivering experiences that help businesses grow.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center reveal-delay-1">
                    <div className="text-3xl font-bold gradient-text">3+</div>
                    <div className="text-white/60">Years of Experience</div>
                  </div>
                  <div className="text-center reveal-delay-2">
                    <div className="text-3xl font-bold gradient-text">10+</div>
                    <div className="text-white/60">End-to-end Projects Delivered</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="slide-in-right space-y-6">
              <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="text-xl font-bold">Performance-Driven</h4>
                </div>
                <p className="text-white/70">I specialize in building fast, scalable applications. From optimizing React apps to designing APIs that handle thousands of requests, I focus on speed, reliability, and growth.</p>
              </div>
              
              <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#8b5cf6] to-[#f472b6] rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h4 className="text-xl font-bold">Collaborative Builder</h4>
                </div>
                <p className="text-white/70">Great products are a team sport. I bring strong cross-functional collaboration and enjoy mentoring, reviewing code, and aligning engineering with business goals.</p>
              </div>
              
              <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#f472b6] to-[#10b981] rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <h4 className="text-xl font-bold">Full-Stack & DevOps</h4>
                </div>
                <p className="text-white/70">Beyond MERN, I bring experience with CI/CD, AWS, and containerization — bridging development and deployment to deliver end-to-end solutions.</p>
              </div>

              <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#10b981] to-[#00d4ff] rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h4 className="text-xl font-bold">Always Evolving</h4>
                </div>
                <p className="text-white/70">Tech moves fast. Whether it&apos;s React Native for mobile or AI-driven tools, I stay curious and adapt quickly, bringing modern solutions to every project.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 sm:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="reveal text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 gradient-text">Skills & Tech</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Frontend */}
            <div className="scale-in reveal-delay-1 glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Frontend</h3>
              <div className="tech-grid">
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">React</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">Next.js</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">TypeScript</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">Tailwind CSS</div>
              </div>
            </div>
            
            {/* Backend */}
            <div className="scale-in reveal-delay-2 glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#8b5cf6] to-[#f472b6] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Backend</h3>
              <div className="tech-grid">
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">Node.js</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">Express</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">REST & GraphQL APIs</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">Prisma ORM</div>
              </div>
            </div>
            
            {/* Database */}
            <div className="scale-in reveal-delay-3 glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#f472b6] to-[#10b981] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Database</h3>
              <div className="tech-grid">
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">MongoDB</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">PostgreSQL</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">Redis</div>
              </div>
            </div>
            
            {/* DevOps / Cloud */}
            <div className="scale-in reveal-delay-4 glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#10b981] to-[#00d4ff] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-center gradient-text">DevOps / Cloud</h3>
              <div className="tech-grid">
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">Docker</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">AWS</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">CI/CD (GitHub Actions)</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">Linux</div>
              </div>
            </div>
            
            {/* Mobile Development */}
            <div className="scale-in reveal-delay-5 glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Mobile Development</h3>
              <div className="tech-grid">
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">React Native</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">Expo</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">Firebase</div>
                <div className="glass text-center py-3 px-2 rounded-lg text-sm font-mono">App Store</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 sm:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="reveal text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 gradient-text">Work Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] mx-auto"></div>
          </div>
          
          <div className="space-y-8">
            {/* NoxAlgo Experience */}
            <div className="rotate-in glass-card rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-3xl font-bold gradient-text mb-2">Full-Stack Engineer</h3>
                  <p className="text-2xl font-semibold text-[#00d4ff] mb-2">NoxAlgo LLP</p>
                  <p className="text-white/60 font-mono">Aug 2024 – Apr 2025</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-xl font-bold text-white mb-4">Key Achievements</h4>
                <ul className="space-y-3 text-white/  
                80">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Built and led development of a Social Media Management SaaS Platform (similar to Hootsuite) for scheduling, content approvals, and analytics
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#8b5cf6] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Designed and implemented backend using Node.js, Express, MongoDB with scalable APIs
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#f472b6] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Built frontend dashboards in React.js (with Redux & Tailwind) for influencers and agencies
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#10b981] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Implemented cron jobs for automated social media post scheduling & reminders
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Integrated AWS S3, Lambda, EC2 for storage and deployment
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#8b5cf6] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Worked on microservices architecture and implemented GitHub Actions CI/CD pipelines
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#f472b6] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Built a companion React Native mobile app for social media scheduling on the go
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#10b981] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Set up Dockerized pipelines and monitored deployments using AWS + CI/CD
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#00d4ff]">MERN Stack</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#8b5cf6]">MongoDB</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#f472b6]">Express</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#10b981]">React</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#00d4ff]">Node.js</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#8b5cf6]">AWS</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#f472b6]">Docker</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#10b981]">GitHub Actions</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#00d4ff]">TailwindCSS</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#8b5cf6]">REST APIs</span>
              </div>
            </div>
            
            {/* RapidData Experience */}
            <div className="rotate-in reveal-delay-1 glass-card rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-3xl font-bold gradient-text mb-2">Full-Stack Developer</h3>
                  <p className="text-2xl font-semibold text-[#8b5cf6] mb-2">RapidData</p>
                  <p className="text-white/60 font-mono">Sept 2022 – Jun 2024</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-xl font-bold text-white mb-4">Key Achievements</h4>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#8b5cf6] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Worked on BuildSafal, a low-code/no-code platform for businesses to create applications without coding
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#f472b6] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Developed reusable React.js components and optimized performance for large-scale forms
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#10b981] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Designed and maintained backend APIs with Node.js + Express connected to MongoDB
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Integrated third-party APIs (payment gateways, file storage, authentication)
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#8b5cf6] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Collaborated closely with product & design teams to deliver scalable features
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#f472b6] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Mentored junior developers and handled client discussions
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Developed Multi-Level Kanban boards with RBAC, versioning, and approval workflows for enterprise teams
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#10b981] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Implemented analytics dashboards using Recharts & Chart.js with MongoDB pipelines, reducing reporting cycles from hours to minutes
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#8b5cf6]">React.js</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#00d4ff]">Node.js</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#f472b6]">Express</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#10b981]">MongoDB</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#8b5cf6]">REST APIs</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#00d4ff]">Redux</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#f472b6]">WebSockets</span>
                <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#10b981]">Agile/Scrum</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="reveal text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 gradient-text">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="fade-in reveal-delay-1 project-card glass-card rounded-3xl overflow-hidden group">
              <div className="h-64 bg-gradient-to-br from-[#00d4ff]/20 to-[#8b5cf6]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/10 to-[#8b5cf6]/10 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-[#00d4ff] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    <p className="text-white/60 font-mono">Social Media SaaS</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text">NoxAlgo Platform</h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Complete social media management SaaS with scheduling, analytics, and team collaboration features.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#00d4ff]">React</span>
                  <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#8b5cf6]">Node.js</span>
                  <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#f472b6]">MongoDB</span>
                  <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#10b981]">AWS</span>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 glass px-4 py-3 rounded-xl font-semibold hover:bg-[#00d4ff]/10 transition-colors duration-300">
                    Live Demo
                  </button>
                  <button className="flex-1 border border-[#00d4ff]/30 px-4 py-3 rounded-xl font-semibold hover:bg-[#00d4ff]/10 transition-colors duration-300">
                    GitHub
                  </button>
                </div>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="fade-in reveal-delay-2 project-card glass-card rounded-3xl overflow-hidden group">
              <div className="h-64 bg-gradient-to-br from-[#8b5cf6]/20 to-[#f472b6]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 to-[#f472b6]/10 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-[#8b5cf6] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    <p className="text-white/60 font-mono">Low-Code Platform</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text">BuildSafal Platform</h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  No-code platform enabling businesses to create applications without coding knowledge.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#00d4ff]">React</span>
                  <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#8b5cf6]">Express</span>
                  <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#f472b6]">MongoDB</span>
                  <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#10b981]">WebSocket</span>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 glass px-4 py-3 rounded-xl font-semibold hover:bg-[#8b5cf6]/10 transition-colors duration-300">
                    Live Demo
                  </button>
                  <button className="flex-1 border border-[#8b5cf6]/30 px-4 py-3 rounded-xl font-semibold hover:bg-[#8b5cf6]/10 transition-colors duration-300">
                    GitHub
                  </button>
                </div>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className="fade-in reveal-delay-3 project-card glass-card rounded-3xl overflow-hidden group">
              <div className="h-64 bg-gradient-to-br from-[#f472b6]/20 to-[#10b981]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f472b6]/10 to-[#10b981]/10 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-[#f472b6] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    <p className="text-white/60 font-mono">Mobile App</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text">Task Manager Pro</h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Cross-platform mobile app for team collaboration with real-time updates and analytics.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#00d4ff]">React Native</span>
                  <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#8b5cf6]">Node.js</span>
                  <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#f472b6]">Firebase</span>
                  <span className="glass px-3 py-1 rounded-full text-xs font-mono text-[#10b981]">Redux</span>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 glass px-4 py-3 rounded-xl font-semibold hover:bg-[#f472b6]/10 transition-colors duration-300">
                    Live Demo
                  </button>
                  <button className="flex-1 border border-[#f472b6]/30 px-4 py-3 rounded-xl font-semibold hover:bg-[#f472b6]/10 transition-colors duration-300">
                    GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="reveal text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 gradient-text">Let&apos;s Connect</h2>
            <p className="text-xl text-white/60 mb-8">Ready to bring your ideas to life? Let&apos;s discuss your next project!</p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="slide-in-left">
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-3xl font-bold mb-8 gradient-text">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] rounded-2xl flex items-center justify-center">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Email</p>
                      <p className="text-white/70">gauravbais2001@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-[#8b5cf6] to-[#f472b6] rounded-2xl flex items-center justify-center">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">LinkedIn</p>
                      <p className="text-white/70">linkedin.com/in/gaurav-bais</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-[#f472b6] to-[#10b981] rounded-2xl flex items-center justify-center">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">GitHub</p>
                      <p className="text-white/70">github.com/GSB1920</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-[#10b981] to-[#00d4ff] rounded-2xl flex items-center justify-center">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Twitter</p>
                      <p className="text-white/70">@TheObservsing1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="slide-in-right">
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-3xl font-bold mb-8 gradient-text">Send Message</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-white/80 mb-2 font-semibold">Name</label>
                    <input 
                      type="text" 
                      className="w-full glass px-4 py-3 rounded-xl border border-white/20 focus:border-[#00d4ff] focus:outline-none transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 font-semibold">Email</label>
                    <input 
                      type="email" 
                      className="w-full glass px-4 py-3 rounded-xl border border-white/20 focus:border-[#00d4ff] focus:outline-none transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 font-semibold">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full glass px-4 py-3 rounded-xl border border-white/20 focus:border-[#00d4ff] focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full glass px-6 py-4 rounded-xl font-semibold text-lg gradient-text hover:scale-105 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-4">Gaurav.dev</div>
            <p className="text-white/60 mb-8">Crafting digital experiences with passion and precision</p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a href="https://x.com/TheObservsing1" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/gaurav-bais" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com/GSB1920" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
            
            <div className="border-t border-white/10 pt-8">
              <p className="text-white/40 text-sm">
                © 2024 Gaurav Singh Bais. Built with passion using modern web technologies.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}