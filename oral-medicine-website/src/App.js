import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const diagnosticCategories = [
    {
      id: 1,
      title: "Historical",
      description: "Historical data constitute an important component in every diagnosis. Includes personal history, drug ingestion history, and history of presenting disease.",
      icon: "📋",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      accentColor: "border-blue-500",
      details: [
        "Personal history (e.g., certain diseases in middle-aged black females)",
        "History of drug ingestion (e.g., calcium channel blockers and gingival enlargement)",
        "History of the presenting disease or lesion"
      ],
      svg: (
        <svg className="w-full h-32 opacity-10 absolute bottom-0 right-0" viewBox="0 0 200 100" fill="none">
          <path d="M20 50 Q50 20, 80 50 T140 50" stroke="#3b82f6" strokeWidth="3" fill="none"/>
          <circle cx="20" cy="50" r="5" fill="#3b82f6"/>
          <circle cx="80" cy="50" r="5" fill="#3b82f6"/>
          <circle cx="140" cy="50" r="5" fill="#3b82f6"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Clinical Diagnosis",
      description: "The strength of diagnosis comes from the clinical appearance of the lesion. Based on color, shape, location, and history.",
      icon: "🔬",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      accentColor: "border-purple-500",
      details: [
        "Based on color, shape, location, and history of the lesion",
        "Biopsy or surgical intervention is not necessary",
        "May require historical information (e.g., amalgam tattoo)"
      ],
      svg: (
        <svg className="w-full h-32 opacity-10 absolute bottom-0 right-0" viewBox="0 0 200 100" fill="none">
          <circle cx="100" cy="50" r="30" stroke="#a855f7" strokeWidth="2" fill="none"/>
          <circle cx="100" cy="50" r="20" stroke="#a855f7" strokeWidth="2" fill="none"/>
          <circle cx="100" cy="50" r="10" stroke="#a855f7" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Radiographic Diagnosis",
      description: "Diagnosis obtained mainly from the radiograph, although clinical and historical information may contribute.",
      icon: "📸",
      color: "from-green-500 to-teal-500",
      bgColor: "bg-green-50",
      accentColor: "border-green-500",
      details: [
        "Primary diagnosis from radiographic images",
        "Clinical and historical information contribute",
        "Essential for internal structure evaluation"
      ],
      svg: (
        <svg className="w-full h-32 opacity-10 absolute bottom-0 right-0" viewBox="0 0 200 100" fill="none">
          <rect x="50" y="20" width="100" height="60" stroke="#10b981" strokeWidth="2" fill="none" rx="5"/>
          <line x1="70" y1="40" x2="130" y2="40" stroke="#10b981" strokeWidth="2"/>
          <line x1="70" y1="50" x2="130" y2="50" stroke="#10b981" strokeWidth="2"/>
          <line x1="70" y1="60" x2="130" y2="60" stroke="#10b981" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Laboratory Diagnosis",
      description: "Clinical laboratory tests, including blood chemistry and urine analysis, provide information that contribute to the diagnosis.",
      icon: "🧪",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      accentColor: "border-yellow-500",
      details: [
        "Blood chemistry analysis",
        "Urine analysis",
        "Biochemical markers evaluation"
      ],
      svg: (
        <svg className="w-full h-32 opacity-10 absolute bottom-0 right-0" viewBox="0 0 200 100" fill="none">
          <path d="M80 30 L80 70 L100 80 L120 70 L120 30 Z" stroke="#f59e0b" strokeWidth="2" fill="none"/>
          <ellipse cx="100" cy="30" rx="20" ry="5" stroke="#f59e0b" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      id: 5,
      title: "Surgical Diagnosis",
      description: "Diagnosis made using information obtained during the surgical procedure (e.g., traumatic bone cyst).",
      icon: "⚕️",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      accentColor: "border-red-500",
      details: [
        "Information obtained during surgical procedure",
        "Direct tissue observation",
        "Example: traumatic bone cyst"
      ],
      svg: (
        <svg className="w-full h-32 opacity-10 absolute bottom-0 right-0" viewBox="0 0 200 100" fill="none">
          <path d="M100 20 L100 80 M70 50 L130 50" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="100" cy="50" r="25" stroke="#ef4444" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      id: 6,
      title: "Therapeutic Diagnosis",
      description: "Nutritional deficiencies are common conditions diagnosed by therapeutic means (e.g., Angular Cheilitis responding to vitamin B therapy).",
      icon: "💊",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      accentColor: "border-indigo-500",
      details: [
        "Response to treatment confirms diagnosis",
        "Common for nutritional deficiencies",
        "Example: Angular Cheilitis responding to vitamin B therapy"
      ],
      svg: (
        <svg className="w-full h-32 opacity-10 absolute bottom-0 right-0" viewBox="0 0 200 100" fill="none">
          <rect x="70" y="35" width="60" height="30" rx="15" stroke="#6366f1" strokeWidth="2" fill="none"/>
          <line x1="100" y1="35" x2="100" y2="65" stroke="#6366f1" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 7,
      title: "Differential Diagnosis",
      description: "The point when the practitioner decides which test or procedure is required to rule out suspected conditions and establish definitive diagnosis.",
      icon: "🎯",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      accentColor: "border-pink-500",
      details: [
        "Evaluation of suspected lesions",
        "Determining required tests or procedures",
        "Establishing definitive diagnosis"
      ],
      svg: (
        <svg className="w-full h-32 opacity-10 absolute bottom-0 right-0" viewBox="0 0 200 100" fill="none">
          <circle cx="100" cy="50" r="30" stroke="#ec4899" strokeWidth="2" fill="none"/>
          <circle cx="100" cy="50" r="20" stroke="#ec4899" strokeWidth="2" fill="none"/>
          <circle cx="100" cy="50" r="10" stroke="#ec4899" strokeWidth="2" fill="none"/>
          <circle cx="100" cy="50" r="3" fill="#ec4899"/>
        </svg>
      )
    }
  ];

  const branches = [
    { name: "Oral Histology", icon: "🔬", color: "bg-blue-500" },
    { name: "Oral Radiology", icon: "📸", color: "bg-purple-500" },
    { name: "Oral Diagnosis", icon: "🎯", color: "bg-green-500" },
    { name: "Oral Pathology", icon: "🧬", color: "bg-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🦷</span>
              <span className={`text-xl font-bold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                Oral Medicine
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Diagnosis', 'Categories'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'} transition-colors duration-300 font-medium`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-4 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
          {/* Floating Medical Icons */}
          <div className="absolute top-1/4 left-1/4 text-6xl opacity-20 animate-float">🦷</div>
          <div className="absolute top-1/3 right-1/4 text-5xl opacity-20 animate-float animation-delay-1000">🔬</div>
          <div className="absolute bottom-1/3 left-1/3 text-5xl opacity-20 animate-float animation-delay-2000">💊</div>
          <div className="absolute bottom-1/4 right-1/3 text-6xl opacity-20 animate-float animation-delay-3000">⚕️</div>
        </div>
        
        {/* Geometric Patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <div className="mb-8 animate-scale-in">
            <div className="inline-block p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-full mb-6">
              <span className="text-8xl">🦷</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in-up tracking-tight">
            Oral Medicine
          </h1>
          
          <div className="h-1 w-32 bg-white mx-auto mb-6 rounded-full animate-expand"></div>
          
          <p className="text-xl md:text-3xl text-white mb-12 animate-fade-in-up animation-delay-300 max-w-4xl mx-auto font-light leading-relaxed">
            The branch of dentistry dealing with diagnosis, treatment, and prevention of oral diseases
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up animation-delay-600">
            <div className="group glass-card px-8 py-4 text-white transform hover:scale-110 transition-all duration-300 cursor-pointer">
              <span className="text-3xl mr-3 inline-block group-hover:animate-bounce">🦷</span>
              <span className="text-lg font-semibold">Oral Mucosal Diseases</span>
            </div>
            <div className="group glass-card px-8 py-4 text-white transform hover:scale-110 transition-all duration-300 cursor-pointer">
              <span className="text-3xl mr-3 inline-block group-hover:animate-bounce">🔬</span>
              <span className="text-lg font-semibold">Local Oral Diseases</span>
            </div>
            <div className="group glass-card px-8 py-4 text-white transform hover:scale-110 transition-all duration-300 cursor-pointer">
              <span className="text-3xl mr-3 inline-block group-hover:animate-bounce">💊</span>
              <span className="text-lg font-semibold">Systemic Manifestations</span>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <div className="flex flex-col items-center text-white opacity-75">
              <span className="text-sm mb-2">Scroll to explore</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section id="about" className={`py-20 px-4 relative overflow-hidden transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-6xl animate-pulse-slow">🏥</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
              Related Branches
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-center text-gray-600 text-xl max-w-2xl mx-auto">
              Oral Medicine encompasses multiple specialized fields working together
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {branches.map((branch, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 transform transition-all duration-500 hover:scale-110 hover:-rotate-2 hover:shadow-2xl cursor-pointer ${
                  visibleSections.has('about') ? 'animate-slide-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 ${branch.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
                
                {/* Icon Container */}
                <div className="relative">
                  <div className={`${branch.color} w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto shadow-lg transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`}>
                    {branch.icon}
                  </div>
                  
                  {/* Decorative Circle */}
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 ${branch.color} rounded-full opacity-20 filter blur-xl group-hover:scale-150 transition-all duration-300`}></div>
                </div>
                
                <h3 className="text-xl font-bold text-center text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {branch.name}
                </h3>
                
                {/* Hover Effect Line */}
                <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic Process Section */}
      <section id="diagnosis" className={`py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden transition-all duration-1000 ${visibleSections.has('diagnosis') ? 'opacity-100' : 'opacity-0'}`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diagnostic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="30" fill="none" stroke="#3b82f6" strokeWidth="2"/>
                <path d="M50 20 L50 80 M20 50 L80 50" stroke="#8b5cf6" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagnostic-pattern)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-blue-600 rounded-full"></div>
              <span className="text-6xl animate-pulse-slow">🔍</span>
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-purple-600 rounded-full"></div>
            </div>
            
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 text-gradient ${visibleSections.has('diagnosis') ? 'animate-fade-in-up' : ''}`}>
              The Diagnostic Process
            </h2>
            
            <p className={`text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed ${visibleSections.has('diagnosis') ? 'animate-fade-in-up animation-delay-300' : ''}`}>
              Making a diagnosis requires gathering information from various sources. Usually one area alone does not provide sufficient information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className={`group relative bg-white rounded-3xl p-10 shadow-2xl border-l-8 border-blue-500 transform hover:scale-105 transition-all duration-500 overflow-hidden ${visibleSections.has('diagnosis') ? 'animate-slide-in-left' : ''}`}>
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full filter blur-3xl opacity-50 group-hover:scale-150 transition-all duration-500"></div>
              
              {/* SVG Illustration */}
              <svg className="absolute bottom-0 right-0 w-48 h-48 opacity-5 group-hover:opacity-10 transition-opacity duration-300" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="#3b82f6" strokeWidth="4"/>
                <circle cx="100" cy="100" r="60" stroke="#3b82f6" strokeWidth="3"/>
                <circle cx="100" cy="100" r="40" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="100" cy="100" r="10" fill="#3b82f6"/>
              </svg>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl mr-4 transform group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-5xl">🎯</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">Oral Diagnosis</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  An art and science of identifying an oral disease from its symptoms and signs.
                </p>
                
                {/* Decorative Element */}
                <div className="mt-6 flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse animation-delay-300"></div>
                  <div className="h-2 w-2 bg-blue-300 rounded-full animate-pulse animation-delay-600"></div>
                </div>
              </div>
            </div>

            <div className={`group relative bg-white rounded-3xl p-10 shadow-2xl border-l-8 border-purple-500 transform hover:scale-105 transition-all duration-500 overflow-hidden ${visibleSections.has('diagnosis') ? 'animate-slide-in-right' : ''}`}>
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-100 rounded-full filter blur-3xl opacity-50 group-hover:scale-150 transition-all duration-500"></div>
              
              {/* SVG Illustration */}
              <svg className="absolute bottom-0 right-0 w-48 h-48 opacity-5 group-hover:opacity-10 transition-opacity duration-300" viewBox="0 0 200 200" fill="none">
                <rect x="40" y="40" width="120" height="120" stroke="#8b5cf6" strokeWidth="4" rx="10"/>
                <line x1="60" y1="80" x2="140" y2="80" stroke="#8b5cf6" strokeWidth="3"/>
                <line x1="60" y1="100" x2="140" y2="100" stroke="#8b5cf6" strokeWidth="3"/>
                <line x1="60" y1="120" x2="140" y2="120" stroke="#8b5cf6" strokeWidth="3"/>
              </svg>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl mr-4 transform group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-5xl">📸</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">Oral Radiography</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  An art and science of producing photographic images of oral tissues through use of x-radiation.
                </p>
                
                {/* Decorative Element */}
                <div className="mt-6 flex items-center space-x-2">
                  <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse animation-delay-300"></div>
                  <div className="h-2 w-2 bg-purple-300 rounded-full animate-pulse animation-delay-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Diagnostic Categories */}
      <section id="categories" className={`py-20 px-4 relative overflow-hidden transition-all duration-1000 ${visibleSections.has('categories') ? 'opacity-100' : 'opacity-0'}`}>
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-transparent rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-bl from-purple-200 to-transparent rounded-full filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce animation-delay-300"></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-600"></div>
              </div>
            </div>
            
            <h2 className={`text-5xl md:text-7xl font-bold mb-6 text-gradient ${visibleSections.has('categories') ? 'animate-fade-in-up' : ''}`}>
              7 Diagnostic Categories
            </h2>
            
            <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
            
            <p className={`text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed ${visibleSections.has('categories') ? 'animate-fade-in-up animation-delay-300' : ''}`}>
              Seven essential categories that contribute segments of information leading to definitive diagnosis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diagnosticCategories.map((category, index) => (
              <div
                key={category.id}
                className={`group relative bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer border-2 ${category.accentColor} ${
                  visibleSections.has('categories') ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Top Gradient Bar */}
                <div className={`h-3 bg-gradient-to-r ${category.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
                
                {/* Background SVG */}
                <div className="absolute inset-0 overflow-hidden">
                  {category.svg}
                </div>
                
                {/* Content */}
                <div className="relative p-8 z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`${category.bgColor} p-4 rounded-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                      <span className="text-5xl">{category.icon}</span>
                    </div>
                    <div className={`text-6xl font-black bg-gradient-to-r ${category.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300`}>
                      {category.id}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {category.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed text-base">
                    {category.description}
                  </p>
                  
                  {/* Divider */}
                  <div className={`h-1 w-full bg-gradient-to-r ${category.color} opacity-20 rounded-full mb-6`}></div>
                  
                  {/* Key Points */}
                  <div className={`${category.bgColor} rounded-2xl p-4 border-2 ${category.accentColor} border-opacity-20`}>
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                      <span className="mr-2">✓</span>
                      Key Points:
                    </h4>
                    <ul className="space-y-2">
                      {category.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent font-bold mr-2 mt-0.5`}>•</span>
                          <span className="flex-1">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Hover Effect Indicator */}
                  <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-1">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} animate-pulse`}></div>
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} animate-pulse animation-delay-300`}></div>
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} animate-pulse animation-delay-600`}></div>
                    </div>
                  </div>
                </div>
                
                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical History Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="bg-white rounded-[3rem] shadow-2xl p-12 md:p-16 border-4 border-gray-100 relative overflow-hidden">
            {/* Background Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="record-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M0 25 L50 25 M25 0 L25 50" stroke="#8b5cf6" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#record-pattern)" />
            </svg>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-block mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full filter blur-xl opacity-30 animate-pulse-slow"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-3xl transform hover:scale-110 hover:rotate-6 transition-all duration-300">
                    <span className="text-7xl">📝</span>
                  </div>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
                  Patient Records
                </h2>
                
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
                
                <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Thorough medical and dental histories should be part of every patient's permanent record
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {/* Medical History Card */}
                <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-lg border-4 border-blue-200 transform hover:scale-105 hover:-rotate-2 transition-all duration-500 overflow-hidden">
                  {/* Background Icon */}
                  <div className="absolute top-4 right-4 text-9xl opacity-5 group-hover:opacity-10 transition-opacity duration-300">💊</div>
                  
                  {/* SVG Decoration */}
                  <svg className="absolute bottom-0 left-0 w-32 h-32 opacity-10" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="2"/>
                    <path d="M50 20 L50 80 M20 50 L80 50" stroke="#3b82f6" strokeWidth="3"/>
                  </svg>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl mr-4 transform group-hover:rotate-12 transition-transform duration-300">
                        <span className="text-4xl">🏥</span>
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900">Medical History</h3>
                    </div>
                    
                    <ul className="space-y-4">
                      {[
                        { icon: "💊", text: "Current medications" },
                        { icon: "🩺", text: "Systemic conditions" },
                        { icon: "⚠️", text: "Allergies" }
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center bg-white bg-opacity-60 rounded-2xl p-4 transform hover:translate-x-2 transition-all duration-300 shadow-md">
                          <span className="text-2xl mr-3">{item.icon}</span>
                          <span className="text-blue-900 font-semibold text-lg">{item.text}</span>
                          <span className="ml-auto text-blue-500 text-xl">→</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Dental History Card */}
                <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 shadow-lg border-4 border-purple-200 transform hover:scale-105 hover:rotate-2 transition-all duration-500 overflow-hidden">
                  {/* Background Icon */}
                  <div className="absolute top-4 right-4 text-9xl opacity-5 group-hover:opacity-10 transition-opacity duration-300">🦷</div>
                  
                  {/* SVG Decoration */}
                  <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-10" viewBox="0 0 100 100" fill="none">
                    <path d="M30 30 Q50 10, 70 30 T70 70 Q50 90, 30 70 T30 30" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                  </svg>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-2xl mr-4 transform group-hover:rotate-12 transition-transform duration-300">
                        <span className="text-4xl">🦷</span>
                      </div>
                      <h3 className="text-2xl font-bold text-purple-900">Dental History</h3>
                    </div>
                    
                    <ul className="space-y-4">
                      {[
                        { icon: "🔧", text: "Previous treatments" },
                        { icon: "😷", text: "Current complaints" },
                        { icon: "🪥", text: "Oral hygiene habits" }
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center bg-white bg-opacity-60 rounded-2xl p-4 transform hover:translate-x-2 transition-all duration-300 shadow-md">
                          <span className="text-2xl mr-3">{item.icon}</span>
                          <span className="text-purple-900 font-semibold text-lg">{item.text}</span>
                          <span className="ml-auto text-purple-500 text-xl">→</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Bottom Decorative Element */}
              <div className="mt-12 flex justify-center">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce animation-delay-300"></div>
                  <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce animation-delay-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full filter blur-xl opacity-30 animate-pulse-slow"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-5 rounded-3xl">
                  <span className="text-6xl">👥</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">Presented By</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-xl">Our dedicated team of professionals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "أبرار الصنعاني", color: "from-blue-500 to-cyan-500", icon: "👩‍⚕️" },
              { name: "آية بشير", color: "from-purple-500 to-pink-500", icon: "👩‍⚕️" },
              { name: "إيلاف الجبري", color: "from-green-500 to-teal-500", icon: "👩‍⚕️" },
              { name: "حنين بكري", color: "from-orange-500 to-red-500", icon: "👩‍⚕️" },
              { name: "دالياء الإدريسي", color: "from-indigo-500 to-purple-500", icon: "👩‍⚕️" },
              { name: "شيماء نبيل", color: "from-pink-500 to-rose-500", icon: "👩‍⚕️" }
            ].map((member, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${member.color} rounded-3xl filter blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                
                {/* Card */}
                <div className={`relative bg-gradient-to-br ${member.color} text-white rounded-3xl p-8 shadow-xl transform hover:scale-110 hover:-rotate-2 transition-all duration-500 cursor-pointer overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`pattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="2" fill="white"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                      <span className="text-5xl">{member.icon}</span>
                    </div>
                    <p className="text-xl font-bold mb-2" dir="rtl">{member.name}</p>
                    
                    {/* Decorative Line */}
                    <div className="h-1 w-0 group-hover:w-full bg-white mx-auto rounded-full transition-all duration-500"></div>
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Decoration */}
          <div className="mt-16 flex justify-center">
            <div className="flex items-center space-x-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-4xl">🦷</span>
            <span className="text-2xl font-bold">Oral Medicine</span>
          </div>
          <p className="text-gray-400 mb-4">
            Advancing dental care through comprehensive diagnosis and treatment
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Oral Medicine Education. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
