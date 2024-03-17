// FacultyLogin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading'

const FacultyLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState();
  const [userEmail, setUserEmail] = useState();
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [alert, setAlert] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const BASEURL = process.env.REACT_APP_BASEURL
  const handleLogin = () => {
    // Add your authentication logic here
    const email = `email=${userEmail}`
    const pass = `password=${password}`
    const dep = `department=${department}`
    if (email && password && department) {
      setIsLoading(true);
      const url = `${BASEURL}/faculty/login?${email}&${pass}&${dep}`
      fetch(url)
        .then((res) => {
          console.log(res)
          if (res.ok) {
            console.log(res)
            return res.json()
          } else {
            return []
          }

        })
        .then((res) => {

          if (res.length === 1) {
            if (res[0].isVerified) {
              setIsLoading(false);
              navigate('/faculty/profile', { state: { logedIn: true, userEmail: userEmail } });
            } else {
              setIsLoading(false);
              setAlert('You are not verified yet ...')
            }

          }
          else {
            // alert(res.message)
            setIsLoading(false);
            setAlert('Incorrect Details')
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setAlert('Server Error')
          console.log(error)
        })
    } else {
      setAlert('All fields are required');
    }
  };

  const handleNotHaveAnAccount = () => {
    setAlert('Contact Admin/Administrator')
  }

  const handleEmailVerification = () => {
    // setAlert('already verified')
    const email = `email=${userEmail}`
    if (userEmail) {
      setIsLoading(true);
      const url = `${BASEURL}/faculty/search?${email}`
      fetch(url)
        .then((res) => {

          if (res.ok) {
            return res.json()
          } else {
            return ' '
          }

        })
        .then((res) => {
          console.log(res)
          if (res.length > 1) {
            setIsLoading(false);
            setAlert('More than one accound found')
            return
          }
          if (res.length < 1) {
            setIsLoading(false);
            setAlert('Account not found')
            return
          }
          if (res[0].isVerified) {
            setIsLoading(false);
            setAlert('Already Verified')
          } else {
            const name = res[0].name;
            setIsLoading(false);
            navigate('/verification/emailVerificationLink', { state: { email: userEmail, name: name } });
          }

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
      <div className=" p-8 rounded shadow-md w-96 bg-blue-400 ">
        <h2 className="text-2xl font-bold mb-6 text-white">Faculty Login</h2>
        <p className='text-red-600'>{alert}</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
            Email *
          </label>
          <input
            type="text"
            id="email"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your username"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white  text-sm font-bold mb-2" htmlFor="password">
            Password *
          </label>
          <div className='flex'>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full border outline-none border-white p-2 rounded-l-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleTogglePassword} className='bg-white px-2 p-1 rounded-r-md border-white'>
              {showPassword ? <img className='w-12 h-8 px-1' src="/images/openEye.png" alt="" /> : <img className='w-12 h-5 px-1' src="/images/closeEye.png" alt="" />}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="department">
            Department *
          </label>
          <select
            id="department"
            className="w-full border border-gray-300 p-2 rounded"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="CSE"> Computer Science and Engineering (CSE) </option>
            <option value="ECE"> Electronics and Communication Engineering (ECE) </option>
            <option value="MATHS&SCIENCE"> Maths and science </option>
            <option value="HSS"> Humanities and Social Sciences (HSS) </option>
          </select>
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleLogin}
        >
          Login
        </button>

        <Link to="/faculty/forgot-password" className="block text-white hover:underline mt-4">
          Forgot Password?
        </Link>
        <Link onClick={handleEmailVerification} className="block text-white hover:underline mt-2">
          Verify Email
        </Link>
        <button onClick={handleNotHaveAnAccount} className='text-white'>Not have an account ?</button>
      </div>
      <div className='flex fixed top-2/4'>
        {
          isLoading && <ReactLoading type='spin' color='blue' />
        }
      </div>
    </div>
  );
};

export default FacultyLogin;
