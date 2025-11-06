import React, { useState, useEffect } from 'react';
import { Mail, Lock, LogIn, UserPlus,SignalHigh,BookUser } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// The main component containing the responsive login form
const SignupPage = () => {
  // Simple state to manage input values (good practice, even if not used for actual submission here)
   const [form, setForm] = useState({ name:'',email: '', password: '' });
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const[IsEmailValid,setIsEmailValid]=useState(true)
  // Trigger a subtle fade-in animation on mount
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
   const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
  }, []);
  // handleChange

 const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });

  if (name === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  }
};
  
 const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

     if (!form.name || !form.password || !form.email) {
      setError('Please enter All fields.');
      setLoading(false);
      return;
    }

    // Simulate signup API call
     try{
      let response = await axios.api(`${API_BASE_URL}/api/user/signup`,{
        name: form.name,
        email: form.email,
        password: form.password
      } ,{ withCredentials: true });
      setLoading(false);
       if (response.data.message==="User registered successfully"){
        setMsg('Signup successful! please Login....');
        setTimeout(() => {
                  navigate('/login');
        }, 2000);
      }
    else{
        setError('User already exists. Please login.');
    }
     }
     catch(err){
        setError('Server error. Please try again later.');
         setLoading(false);
     }
  };



  return (
    // Outer Container: Full screen height, centered content, and visually appealing gradient background.
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-100 font-sans">
      
      {/* Login Card Container */}
      <div 
        className={`w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl transition-all duration-500 ease-out 
          ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
      >
        <div className="text-center mb-8">
          <div className="text-indigo-600 mb-2">
            {/* Simple Logo/Icon */}
            <SignalHigh className="w-12 h-12 mx-auto" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
           Create Your Account
          </h1>
          <p className="text-gray-500 mt-1">Signup in to continue to your dashboard</p>
        </div>

        {/* Login Form */}
        <form   className="space-y-6">

          {/* Name Field */}
            <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
             Enter Your Name
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Suvidha Foundation.."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm text-gray-800 focus:outline-none"
              />
              <BookUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Email Input */}
        <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
             Enter Your mail  
            </label>
  <input
    id="email"
    name="email"
    type="email"
    required
    value={form.email}
    onChange={handleChange}
    placeholder="yourmail@gmail.com"
    className={`w-full pl-10 pr-4 py-3 border ${
      IsEmailValid ? "border-gray-300" : "border-red-500"
    } rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm text-gray-800 focus:outline-none`}
  />
  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

  {!IsEmailValid && (
    <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
  )}
</div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Create Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm text-gray-800 focus:outline-none"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent   shadow-lg 
                       text-base font-semibold text-white bg-indigo-600 
                       hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                       transition duration-300 ease-in-out transform hover:scale-[1.01] active:scale-[0.98] auth-btns"
              onClick={handleSubmit} 
               >
            Signup
          </button>
        </form>
        {
          msg && 
          <p className='text-green-500 font-serif mt-20'><b>{msg}</b></p>
        }
          {
          error && 
          <p className='text-red-500 font-serif mt-7'><b>{error}</b></p>
        }
            
        {/* Links Section */}
        <div className="mt-8 space-y-3 text-center">
          {/* Forgot Password Link with Hover Underline Animation */}
          <div className="flex justify-center">
            <a 
              href="#" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition duration-200 group relative inline-block"
            >
              Forgot Password?
              <span 
                className="absolute left-0 bottom-0 h-[2px] w-full bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              ></span>
            </a>
          </div>

          {/* Sign Up Link */}
          <div className="flex justify-center items-center pt-2 border-t border-gray-100 mt-4">
            <span className="text-sm text-gray-500 mr-2">Already have an account?</span>
            <a 
              href="/login"
              className="text-sm font-semibold text-purple-600 hover:text-purple-500 transition duration-200 group relative inline-flex items-center"
            >
              <UserPlus className="w-4 h-4 mr-1"/>
              Login
              <span 
                className="absolute left-0 bottom-0 h-[2px] w-full bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              ></span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignupPage;
