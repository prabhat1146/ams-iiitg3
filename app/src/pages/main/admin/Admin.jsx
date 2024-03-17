// AdminLogin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';

const AdminLogin = () => {
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [adminID, setAdminID] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const BASEURL = process.env.REACT_APP_BASEURL;

  const handleLogin = () => {
    const userID = `adminID=${adminID}`
    const pass = `password=${password}`
    // console.log('j')
    if (adminID && password) {
      const url = `${BASEURL}/admin/login?${userID}&${pass}`
      setIsLoading(true);
      fetch(url)
        .then((res) => {
          console.log(res)
          if (res.ok) {
            return res.json()
          } else {
            return null
          }



        })
        .then((res) => {
          if (res) {
            setIsLoading(false)
            navigate('/admin/profile', { state: { logedIn: true, adminID: adminID } });
            setAlert('success')
          }
          else {
            // alert(res.message)
            setIsLoading(false);
            setAlert('Incorrect Details')
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        })
    } else {
      setAlert('All fields are required');
    }
  };

  // const handleEmailVerification = () => {
  //   // setAlert('already verified')
  //   const Email = `email=${email}`
  //   if (email) {
  //     const url = `${BASEURL}/admin/find?${Email}`
  //     fetch(url)
  //       .then((res) => {

  //         if (res.ok) {
  //           return res.json()
  //         } else {
  //           return ' '
  //         }

  //       })
  //       .then((res) => {
  //         console.log(res)
  //         if (res.length > 1) {
  //           setAlert('More than one accound found')
  //           return
  //         }
  //         if (res.length < 1) {
  //           setAlert('Account not found')
  //           return
  //         }
  //         if (res[0].isVerified) {
  //           setAlert('Already Verified')
  //         } else {
  //           const name = res[0].name;
  //           navigate('/verification/emailVerificationLink', { state: { email: email, name: name } });
  //         }

  //       })
  //   } else {
  //     setAlert('Please enter valid Email');
  //   }
  // }

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen  bg-gradient-to-r from-blue-500 to-purple-500 ">
      <div className="bg-blue-400 p-8 rounded shadow-md w-96 ">
        <h2 className="text-2xl font-bold mb-6 text-white">Admin Login</h2>
        {alert && <p className="text-red-500 mb-4">{alert}</p>}
        <div className=' flex justify-center'>
          {
            isLoading && <ReactLoading type='spin' color='blue' />
          }
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
            Admin ID *
          </label>
          <input
            type="text"
            id="adminUserID"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Admin user id"
            value={adminID}
            onChange={(e) => setAdminID(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password *
          </label>
          <div className='flex'>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full border border-white outline-none p-2 rounded-l-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleTogglePassword} className='bg-white px-2 p-1 rounded-r-md border-white'>
              {showPassword ? <img className='w-12 h-8 px-1' src="/images/openEye.png" alt="" /> : <img className='w-12 h-5 px-1' src="/images/closeEye.png" alt="" />}
            </button>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleLogin}
        >
          Login
        </button>
        <Link to="/admin/forgot-password" className="block text-white hover:underline mt-4">
          Forgot Password ?
        </Link>
        {/* <Link onClick={handleEmailVerification} className="block text-blue-500 hover:underline mt-2">
          Verify Email
        </Link> */}
        {/* <Link to="/admin/signup" className="block text-blue-500 hover:underline mt-2">
          SignUp
        </Link> */}
      </div>
    </div>
  );
};

export default AdminLogin;
