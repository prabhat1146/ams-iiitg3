import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading'

const ForgotPasswordPage = () => {

  const [isLoading,setIsLoading]=useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    Department: '',
  });
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // console.log(formData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if(formData.email){
     
      setIsLoading(false);
      navigate('/verification/emailVerificationLink', { state: {email:formData.email,name:formData.name}});
    }else{
      setIsLoading(false);
      navigate('/error')
    }
    // setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <form
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full m-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>

        {submitted ? (
          <p className="text-green-500">Password reset instructions sent to your email.</p>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter your name"
                // value={formData.name}
                onChange={handleChange}
              
              />
            </div>

            <div className="mb-4">
              <label htmlFor="rollNumber" className="block text-gray-700 text-sm font-bold mb-2">
                Roll Number
              </label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter your roll number"
                value={formData.rollNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="course" className="block text-gray-700 text-sm font-bold mb-2">
              Department
              </label>
              <select
                id="course"
                name="Department"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.Department}
                onChange={handleChange}
                // required
              >
                <option value="">Select Department</option>
                <option value="CSE">Computer Science and Engineering (CSE)</option>
                <option value="ECE">Electronics and Communication Engineering (ECE)</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
            >
              Submit
            </button>
          </>
        )}
      </form>

      <div className='flex fixed top-2/4'>
        {
          isLoading && <ReactLoading type='spin' color='blue' />
        }
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
