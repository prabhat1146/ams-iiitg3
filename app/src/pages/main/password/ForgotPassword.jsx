// ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const [Alert,setAlert]=useState();


 const navigate =useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!email){
      setAlert("Email id is required !")
      return ;
    }
    if(!email.endsWith("@iiitg.ac.in")){
      setAlert("IIITG Email-id is required !")
      return ;
    }

    if(email){
      setIsLoading(false);
      navigate('/admin/verification/admin-password-reset-link', { state: {email:email,name:email}});
    }else{
      setIsLoading(false);
      navigate('/error')
    }

   
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <p className='m-4'>{Alert}</p>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Forgot Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {submitted ? 'Email Sent' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
