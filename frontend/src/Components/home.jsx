import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';


const Summarizer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [islogout, setIslogout] = useState('');
  const [islogin, setIslogin] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  
  useEffect(() => {
      document.body.classList.add('font-inter');
     const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTryNowClick = async(e)=> {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if(!token){
        setIslogin('Please login to access the Text Summarizer.');
          return;
      }
      else{
          const response = await axios.get(`${API_BASE_URL}/api/middleware/loginornot`, {
        withCredentials: true,
        headers: {
        Authorization: `Bearer ${token}`,
        }
      });
       if (response.status === 200) {
         window.location.href = '/summarizer';  
       } else {
          window.location.href = '/login';  
      }
      }
    
    } catch (error) {
      console.error(error)
        setIslogin('Authinticstion error');
     }
  }

   const logout= async(e)=>{
    e.preventDefault();
    try{
      await axios.get(`${API_BASE_URL}/api/user/logout`,{
        withCredentials:true,
        headers:{ 
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      });
      localStorage.removeItem('token');
      setIslogout('Logout successful! Redirecting to home...');
      window.location.href='/'; 
    }
    catch(err){
    setIslogout('error while logouting');    }
  }

  
  const features = [
    {
      icon: 'bi-lightning-charge',
      title: 'Quick & Accurate',
      description: 'Generate summaries in less than a second, ensuring you capture the most important points with high precision.',
    },
    {
      icon: 'bi-cursor',
      title: 'Easy-to-Use Interface',
      description: 'A clean, intuitive design means zero learning curve. Just paste your text and get your result instantly.',
    },
    {
      icon: 'bi-file-earmark-text',
      title: 'Supports Long Texts',
      description: 'Process articles, reports, and academic papers up to 50,000 words without compromising speed or quality.',
    },
    {
      icon: 'bi-box-arrow-down',
      title: 'Copy ',
      description: 'Easily copy the summarized text to your clipboard.',
    },
  ];
  
  
  const steps = [
    { step: 1, title: 'Enter Your Text', icon: 'bi-input-cursor-text', description: 'Paste or type the text you need summarized into the input box.' },
    { step: 2, title: 'Process & Analyze', icon: 'bi-lightning-charge-fill', description: 'Our smart algorithm processes the content, identifying key sentences and concepts.' },
    { step: 3, title: 'Get Your Result', icon: 'bi-check2-circle', description: 'Receive your concise, comprehensive summary, ready for review or sharing.' },
  ];

  return (
    
    <>
 
       <div className={`fade-in-container ${isLoaded ? 'loaded' : ''}`}>

          <nav className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 backdrop-blur-sm" style={{ backgroundColor: 'rgba(21, 32, 43, 0.95)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
               <a className="text-3xl font-bold logo" href="/">
               AI Text Summarizer <sub className="text-xs">SF</sub>
              </a>
              
              {/* Mobile Nav   */}
              <button
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsNavOpen(!isNavOpen)}
                aria-controls="navbarNav"
                aria-expanded={isNavOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger Icon */}
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isNavOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
         
              {/* DM */}
              <div className="hidden lg:flex lg:ml-auto lg:space-x-6 items-center" id="navbarNav">
                <ul className="flex space-x-6">
                     <li className="nav-item">
                     <a href="/" className='text-gray-300 hover:text-white transition-colors duration-300 gap-10px'>Home</a>
                     <a href="#about" className='text-gray-300 hover:text-white transition-colors duration-300'>About</a>
                    <a href="#contact" className='text-gray-300 hover:text-white transition-colors duration-300'>Contact</a>
                     <a href="#how-it-works" className='text-gray-300 hover:text-white transition-colors duration-300'>Working</a>
                    </li>
                 
                </ul>

                 <a className="border border-white text-white px-4 py-2 rounded-full text-sm font-semibold  hover:text-gray-900 transition-all duration-300 d-login" href="/login" >
                  Login
                </a>
                
                 <button className="border border-white text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-500 hover:border-red-600 transition-all duration-300 logout-btn-hover " onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile M*/}
          <div className={`${isNavOpen ? 'block' : 'hidden'} lg:hidden pb-3`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                     <li className="nav-item flex flex-col">
                     <a href="/" className='text-gray-300 hover:text-white transition-colors duration-300 gap-10px'>Home</a>
                     <a href="#about" className='text-gray-300 hover:text-white transition-colors duration-300'>About</a>
                    <a href="#contact" className='text-gray-300 hover:text-white transition-colors duration-300'>Contact</a>
                     <a href="#how-it-works" className='text-gray-300 hover:text-white transition-colors duration-300'>Working</a>
                    </li>
                 
           
              <div className="pt-4 border-t border-gray-700 space-y-2">
                 <a className="w-full text-center border border-white text-white px-4 py-2 rounded-full block text-sm font-semibold hover:bg-red-500 hover:border-red-600 transition-all duration-300 m-login-btn" href="/login">
                  Login
                </a>
                 <button className="w-full text-center border border-white text-white px-4 py-2 rounded-full block text-sm font-semibold hover:bg-red-500 hover:border-red-600 transition-all duration-300 logout-btn-hover" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        
         <main>
            {/* Hero  */}
            <section id="home" className="hero-section-bg text-white flex items-center text-center">
            
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36 w-full">
              <div className="flex justify-center">
 
                <div className="w-full lg:max-w-4xl">
                  <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-text-slide">
                    Summarize Text Instantly and Effortlessly.
                  </h1>
                  <p className="text-xl mb-8 text-white text-opacity-75 animate-text-slide" style={{ animationDelay: '0.2s' }}>
                    Our state-of-the-art Text Summarizer helps you cut through the noise, providing concise, accurate, and essential information from long documents and articles in seconds.
                  </p>
                  
                  <p className="text-red-400 mt-4 text-xl font-bold">{islogin}</p>
                  
                  <button 
                    className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 text-lg custom-btn-hover animate-text-slide try-now-btn" 
                    style={{ animationDelay: '0.4s' }}
                    onClick={handleTryNowClick}
                  >
                    Try Now
                  </button>
                </div>
              </div>
            </div>
          </section>
          
            {islogout && (
                <div
                  className="fixed top-0 right-0 mt-20 mr-4 p-4 rounded-lg shadow-xl bg-green-500 text-white z-[1050]"
                  style={{
                    animation: "fadeInOut 3s ease-in-out forwards",
                    width: "auto",
                  }}
                >
                  {islogout}
                </div>
            )}


           <section id="about" className="py-16 md:py-20 bg-white text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Maximize Productivity. Minimize Reading Time.</h2>
              <p className="text-xl text-gray-600 mt-4">
                Built on advanced text processing, our tool delivers professional-grade summaries that respect the original context and meaning.
              </p>
            </div>
          </section>
          
            <section id="features" className="py-16 md:py-20 bg-gray-50 fade-in-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <h2 className="text-center text-4xl md:text-5xl font-bold mb-3 text-gray-900">Key Features</h2>
              <p className="text-center text-xl mb-12 text-gray-600">Boost your reading efficiency and comprehension.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div key={index}>
                     <div className="h-full shadow-lg feature-card-hover border-0 rounded-xl p-6 bg-white text-center fade-in-item" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                      <div className="text-center">
                         <i className={`${feature.icon} text-cyan-500 text-4xl mb-4`}></i>
                        <h5 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h5>
                        <p className="text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

            <section id="how-it-works" className="py-16 md:py-20 fade-in-section bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <h2 className="text-center text-4xl md:text-5xl font-bold mb-3 text-gray-900">How It Works</h2>
              <p className="text-center text-xl mb-12 text-gray-600">Summarizing complex documents is simple and fast.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center text-center">
                {steps.map((item, index) => (
                  <div key={item.step}>
                    <div className="flex flex-col items-center fade-in-item" style={{ animationDelay: `${0.2 + 0.1 * (index + 1)}s` }}>
                      <div className="bg-cyan-50 text-cyan-500 p-5 rounded-full mb-4 flex items-center justify-center h-20 w-20">
                         <i className={`${item.icon} text-3xl`}></i>
                      </div>
                      <h3 className="font-bold text-2xl mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
            <section className="py-16 md:py-20 bg-cyan-50 text-center">
              <p className="text-red-400 mt-4 text-xl font-bold">{islogin}</p>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="font-bold text-3xl mb-6 text-gray-900">Ready to Get Started?</h3>
              <button 
                className="bg-cyan-500 text-white font-bold py-3 px-8  shadow-lg hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 text-lg custom-btn-hover try-now-btn " 
                onClick={handleTryNowClick}
              >
                Summarize Your First Text
              </button>
            </div>
          </section>

        </main>
        
          <footer id="contact" className="bg-gray-900 text-white pt-12 pb-8 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-9">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
               <div className="md:col-span-1">
                <h5 className="text-cyan-400 font-bold mb-4 text-xl" >AI Text Summarizer SF</h5>
                <p className="text-sm text-gray-400">
                  Your modern solution for reading efficiency. Get straight to the point, every time.
                </p>
              </div>

               <div className="md:col-span-1">
                <h5 className="font-bold mb-4 text-lg">Quick Links</h5>
                <ul className="list-none space-y-2">
                  <li className="nav-item">
                     <a href="/" className='text-gray-300 hover:text-white transition-colors duration-300 gap-10px'>Home</a> <br />
                     <a href="#about" className='text-gray-300 hover:text-white transition-colors duration-300'>About</a> <br />
                    <a href="#contact" className='text-gray-300 hover:text-white transition-colors duration-300'>Contact</a> <br />
                     <a href="#how-it-works" className='text-gray-300 hover:text-white transition-colors duration-300'>Working</a>
                    </li>
                </ul>
              </div>

               <div className="md:col-span-1">
                <h5 className="font-bold mb-4 text-lg">Contact</h5>
                <ul className="list-none text-sm text-gray-400 space-y-2">
                  <li>Email: support@smarttexttool.com</li>
                  <li>Phone: +91 6303447465</li>
                  <li>Location: Hyderabad, TG</li>
                </ul>
              </div>

               <div className="md:col-span-1">
                <h5 className="font-bold mb-4 text-lg">Follow Us</h5>
                <div className="flex space-x-4">
                  <a href="https://github.com/Yuvaraj-kurri3" className="text-cyan-400 text-xl hover:text-white transition-colors duration-300" aria-label="GitHub">
                    <i className="bi-github"></i>
                  </a>
                  <a href="https://linkedin.com/in/yuvarajkurri" className="text-cyan-400 text-xl hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                    <i className="bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-700" />
            <div className="text-center">
              <p className="text-sm text-gray-400 flex flex-row justify-center">&copy; {new Date().getFullYear()} Text Summarizer By <sub>Svuidha Foundadtion</sub>. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Summarizer;
