import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const diagnosticCategories = [
    {
      id: 1,
      title: "Historical",
      description: "Historical data constitute an important component in every diagnosis. Includes personal history, drug ingestion history, and history of presenting disease.",
      icon: "📋",
      color: "from-blue-500 to-cyan-500",
      details: [
        "Personal history (e.g., certain diseases in middle-aged black females)",
        "History of drug ingestion (e.g., calcium channel blockers and gingival enlargement)",
        "History of the presenting disease or lesion"
      ]
    },
    {
      id: 2,
      title: "Clinical Diagnosis",
      description: "The strength of diagnosis comes from the clinical appearance of the lesion. Based on color, shape, location, and history.",
      icon: "🔬",
      color: "from-purple-500 to-pink-500",
      details: [
        "Based on color, shape, location, and history of the lesion",
        "Biopsy or surgical intervention is not necessary",
        "May require historical information (e.g., amalgam tattoo)"
      ]
    },
    {
      id: 3,
      title: "Radiographic Diagnosis",
      description: "Diagnosis obtained mainly from the radiograph, although clinical and historical information may contribute.",
      icon: "📸",
      color: "from-green-500 to-teal-500",
      details: [
        "Primary diagnosis from radiographic images",
        "Clinical and historical information contribute",
        "Essential for internal structure evaluation"
      ]
    },
    {
      id: 4,
      title: "Laboratory Diagnosis",
      description: "Clinical laboratory tests, including blood chemistry and urine analysis, provide information that contribute to the diagnosis.",
      icon: "🧪",
      color: "from-yellow-500 to-orange-500",
      details: [
        "Blood chemistry analysis",
        "Urine analysis",
        "Biochemical markers evaluation"
      ]
    },
    {
      id: 5,
      title: "Surgical Diagnosis",
      description: "Diagnosis made using information obtained during the surgical procedure (e.g., traumatic bone cyst).",
      icon: "⚕️",
      color: "from-red-500 to-pink-500",
      details: [
        "Information obtained during surgical procedure",
        "Direct tissue observation",
        "Example: traumatic bone cyst"
      ]
    },
    {
      id: 6,
      title: "Therapeutic Diagnosis",
      description: "Nutritional deficiencies are common conditions diagnosed by therapeutic means (e.g., Angular Cheilitis responding to vitamin B therapy).",
      icon: "💊",
      color: "from-indigo-500 to-purple-500",
      details: [
        "Response to treatment confirms diagnosis",
        "Common for nutritional deficiencies",
        "Example: Angular Cheilitis responding to vitamin B therapy"
      ]
    },
    {
      id: 7,
      title: "Differential Diagnosis",
      description: "The point when the practitioner decides which test or procedure is required to rule out suspected conditions and establish definitive diagnosis.",
      icon: "🎯",
      color: "from-pink-500 to-rose-500",
      details: [
        "Evaluation of suspected lesions",
        "Determining required tests or procedures",
        "Establishing definitive diagnosis"
      ]
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
      <section id="home" className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Oral Medicine
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 animate-slide-up max-w-3xl mx-auto">
            The branch of dentistry dealing with diagnosis, treatment, and prevention of oral diseases
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg px-6 py-3 text-white border border-white border-opacity-30">
              <span className="text-2xl mr-2">🦷</span>
              Oral Mucosal Diseases
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg px-6 py-3 text-white border border-white border-opacity-30">
              <span className="text-2xl mr-2">🔬</span>
              Local Oral Diseases
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg px-6 py-3 text-white border border-white border-opacity-30">
              <span className="text-2xl mr-2">💊</span>
              Systemic Manifestations
            </div>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">
            Related Branches
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Oral Medicine encompasses multiple specialized fields
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((branch, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg card-hover border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`${branch.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto shadow-lg`}>
                  {branch.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800">
                  {branch.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic Process Section */}
      <section id="diagnosis" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              The Diagnostic Process
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Making a diagnosis requires gathering information from various sources. Usually one area alone does not provide sufficient information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">🎯</span>
                <h3 className="text-2xl font-bold text-gray-800">Oral Diagnosis</h3>
              </div>
              <p className="text-gray-600 text-lg">
                An art and science of identifying an oral disease from its symptoms and signs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-purple-500">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">📸</span>
                <h3 className="text-2xl font-bold text-gray-800">Oral Radiography</h3>
              </div>
              <p className="text-gray-600 text-lg">
                An art and science of producing photographic images of oral tissues through use of x-radiation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Diagnostic Categories */}
      <section id="categories" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              7 Diagnostic Categories
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Seven essential categories that contribute segments of information leading to definitive diagnosis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diagnosticCategories.map((category, index) => (
              <div
                key={category.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100"
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-5xl">{category.icon}</span>
                    <span className={`text-3xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                      {category.id}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Key Points:</h4>
                    <ul className="space-y-2">
                      {category.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical History Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">📝</span>
              <h2 className="text-4xl font-bold text-gradient mb-4">
                Patient Records
              </h2>
              <p className="text-xl text-gray-700">
                Thorough medical and dental histories should be part of every patient's permanent record
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Medical History</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Current medications
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Systemic conditions
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Allergies
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-3">Dental History</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">✓</span>
                    Previous treatments
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">✓</span>
                    Current complaints
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">✓</span>
                    Oral hygiene habits
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient mb-4">Presented By</h2>
            <p className="text-gray-600 text-lg">Our dedicated team</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              "أبرار الصنعاني",
              "آية بشير",
              "إيلاف الجبري",
              "حنين بكري",
              "دالياء الإدريسي",
              "شيماء نبيل"
            ].map((name, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl px-8 py-4 shadow-lg card-hover"
              >
                <p className="text-lg font-semibold">{name}</p>
              </div>
            ))}
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
