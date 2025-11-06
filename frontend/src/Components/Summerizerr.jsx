import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Summerizerr.css"
import {sendRUM} from '../rum'
import History from "./history.jsx";
import api from '../utils/api'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Summarizer() {
  const [article, setArticle] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // State for mobile nav toggle
  const [islogin,setIslogin]=useState('');
  const [error,setError]=useState('')
  
  useEffect(() => {
    sendRUM("page_load");
  }, []);
  const handleTryNowClick = async (e) => {
  const token = localStorage.getItem('token');  
  if (!token) return;

  try {
    await axios.api(
      `${API_BASE_URL}/api/middleware/loginornot`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}` ,
           "x-correlation-id": crypto.randomUUID(),
        }
      }
    ).then(()=>{})
    .catch(()=>{window.location.href='/login'})
  } catch (err) {
    setError('please try again later')
  }
};
  useEffect(()=>{
    handleTryNowClick();
  },[]);

const countWords = (str) => {
    return str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
  };

  const handleSummarize = async () => {
    const token=localStorage.getItem('token');
    if(!token) return window.location.href='/login';
    if (!article.trim()) {
      alert("Please enter some text to summarize!");
      return;
    }

    setLoading(true);
    setShowHistory(false);
    setSummary("");

    try {
        const res = await axios.api(`${API_BASE_URL}/api/summarize/summarizetext`, 
          { article },
          { withCredentials: true,
               headers: {
          Authorization: `Bearer ${token}` ,
           "x-correlation-id": crypto.randomUUID(),
        }

           }
        );
      setSummary(res.data.summary);
     
    } catch (err) {
       setSummary("Error: Unable to summarize text.");
    } finally {
      setLoading(false);
    }
  };
   const logout= async(e)=>{
    e.preventDefault();
    try{
      await axios.api(`${API_BASE_URL}/api/user/logout`,{
        withCredentials:true,
        headers:{ 
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      });
      localStorage.removeItem('token');
      setIslogin('Logout successful! Redirecting to home...');
      setTimeout(()=>{

        window.location.href='/';  
      },1000);
    }
    catch(err){
setIslogin('error while logouting! please try again later');
    }
  }

  const home=async(e)=>{
      window.location.href='/'; 
  }


  return (
    <div className="container py-5">
          <nav className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 backdrop-blur-sm" style={{ backgroundColor: 'rgba(21, 32, 43, 0.95)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Brand */}
              <a className="text-3xl font-bold logo" href="/">
               AI Text Summarizer <sub className="text-xs">SF</sub>
              </a>
              
              {/* Mobile Nav */}
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
         
              {/* Desktop Menu */}
              <div className="hidden lg:flex lg:ml-auto lg:space-x-6 items-center" id="navbarNav">
                <ul className="flex space-x-6">
                     <li className="nav-item flex flex-row gap-3">
 <button className="border border-white text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-500 hover:border-red-600 transition-all duration-300 home-btn-hover mr-4 " onClick={home}>
                  Home
                </button>    
                 <button className="border border-white text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-500 hover:border-red-600 transition-all duration-300 logout-btn-hover " onClick={logout}>
                  Logout
                </button>
                                 </li>    
                </ul>
                
              </div>
            </div>
          </div>

          {/* Mobile Menu Content   */}
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

    <div className="row justify-content-center">
      <div className="col-md-10 col-lg-8">
        <div className="card shadow-lg">
          
            <div className="card-body mt-19">
            <p className="text-red-400 text-xl font-bold d-flex justify-content-end">{islogin}</p>
            <p className="text-center mb-4">{error}</p>
               <h1 className="text-center mb-4 text-primary">Text Summarizer</h1>
               <h6 className="text-center mb-4">By Suvidha Foundation</h6>
                <div className="d-flex justify-content-end mb-3">
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => setShowHistory(!showHistory) }
                  >
                    {showHistory ? 'Hide History' : 'Show History'}
                  </button>
                </div>
                <div className="form-group mb-4">
                <textarea
                  className="form-control"
                  placeholder="Paste your Article here..."
                  value={article}
                  onChange={(e) => setArticle(e.target.value)}
                  rows="6"
                />
                  <p className="text-muted">Word count: <b>{countWords(article)}</b></p>
              </div>
              <div className="text-center mb-4">
                <button 
                  className={`btn ${loading ? 'btn-secondary' : 'btn-primary'} btn-lg px-5`}
                  onClick={handleSummarize} 
                   disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Summarizing...
                    </>
                  ) : "Summarize"}
                </button>
              </div>

             {summary && (
           <div className="flex flex-col">
               <div className="output bg-light p-4 rounded-3 mb-4 ">
                <h3 className="text-primary mb-3 d-flex justify-content-between align-items-center">
                  Summary
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(summary);
                      alert("Summary copied to clipboard!");}}>
                    Copy
                  </button>
                </h3>
                <p className="lead mb-0">
                  <b>{summary}</b>
                  
                </p>

               </div>
               <p className="text-muted">Word count: <b>{countWords(summary)}</b></p>
            </div>
               
            )}

            </div>
          </div>
                
          {showHistory && (

                <History/>
          )}
          <footer className="text-center mt-4 text-muted">
            <p>© 2025 Text Summarizer by suvidha Foundation. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}