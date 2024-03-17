import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading'

const StudentLogin = () => {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [Department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const BASEURL = process.env.REACT_APP_BASEURL
  const handleLogin = () => {
    // Add your authentication logic here
    const email = `studentEmail=${useremail}`
    const pass = `studentPassword=${password}`
    const dep = `studentDepartment=${Department}`
    if (useremail && password && Department) {

      const url = `${BASEURL}/student/login?${email}&${pass}&${dep}`
      setIsLoading(true)
      fetch(url)
        .then((res) => {

          return res.json()

        })
        .then((res) => {
          if (!res) {
            setIsLoading(false)
            setError("Account not found")
            return
          }
          if (res.length > 1) {
            setIsLoading(false)
            setError('More than one accound found')
            return
          }
          if (res.length < 1) {
            setIsLoading(false)
            setError('Account not found')
            return
          }
          if (res[0].isVerified) {
            setIsLoading(false)
            navigate('/student/profile', { state: { logedIn: true, userEmail: useremail } });

          } else {
            setIsLoading(false)
            setError('You have not verified yet')
            // navigate('/student/profile', { state: { logedIn: true, userEmail: useremail } });
          }

        })
        .catch((error) => {
          setError('Server Error')
          console.log(error)
        })


    } else {
      setError('All fields are required');
    }
  };



  const handleStudentEmailVerification = () => {
    const email = `studentEmail=${useremail}`
    if (useremail) {
      const url = `${BASEURL}/student/find?${email}`
      setIsLoading(true);
      fetch(url)
        .then((res) => {

          if (res.ok) {
            return res.json()
          } else {
            return []
          }

        })
        .then((res) => {
          // console.log('r', res)
          if (!res) {
            setIsLoading(false);
            setError("Account not found")
            return
          }
          if (res.length > 1) {
            setIsLoading(false);
            setError('More than one accound found')
            return
          }
          if (res.length < 1) {
            setIsLoading(false);
            setError('Account not found')
            return
          }
          if (res[0].isVerified) {
            setIsLoading(false);
            setError('Already Verified')
          } else {
            setIsLoading(false);
            const name = res[0].studentName;
            setError()
            navigate('/verification/emailVerificationLink', { state: { email: useremail, name: name } });
          }

        })
        .catch((error) => {
          setIsLoading(false);
          setError("Error")
          console.log(error)
        })
    } else {
      setError('Please enter valid Email');
    }
  }
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-blue-400 m-8 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-white m-auto">Student Login</h2>
        {/* <p className='text-red-600'>{error}</p> */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4 bg-opacity-90">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input
            type="text"
            id="username"
            className="w-full border text-black p-2 rounded bg-white"
            placeholder="Enter your user-email"
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
          />
        </div>
        <div className="mb-4 bg-opacity-90">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className='flex'>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full border outline-none p-2 rounded-l-md bg-white border-white hover:border-white"
              placeholder="Enter your password"
              value={password}

              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleTogglePassword} className='bg-white px-2 p-1 rounded-r-md border-white'>
              {showPassword ? <img className='w-12 h-8 px-1' src="/images/openEye.png" alt="" /> : <img  className='w-12 h-5 px-1' src="/images/closeEye.png" alt="" />}
            </button>
          </div>
          <div>
          {/* <img src="/images/openEye.png" alt="" /> */}
          </div>

        </div>
        <div className="mb-4 bg-opacity-90">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="course">
            Department
          </label>
          <select
            id="course"
            className="w-full border border-gray-300 p-2 rounded bg-white"
            value={Department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="" disabled>Select your course</option>
            <option value="CSE">Computer Science and Engineering (CSE)</option>
            <option value="ECE">Electronics and Communication Engineering (ECE)</option>
            {/* <option value="science">Science</option> */}
          </select>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4  rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        // onClick={handleLogin}
        >
          <Link to="/student/forgot-password">
            Forgot Password
          </Link>

        </button>

        <p className='text-white'><Link to='/student/signup'>Not have an account? SignUp</Link></p>
        {/* <p><Link to='/student/signup'>verify Email</Link></p> */}
        <button onClick={handleStudentEmailVerification} className='text-white'>Verify Email</button>

      </div>
      <div className='flex fixed top-2/4 '>
        {
          isLoading && <ReactLoading type='spin' color='blue' />
        }
      </div>
    </div>
  );
};

export default StudentLogin;
