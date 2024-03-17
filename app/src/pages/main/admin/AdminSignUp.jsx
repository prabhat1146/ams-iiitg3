// StudentSignUp.js
import React, { useState } from 'react';
import { fetchData } from '../admin/SetFormData';
import { Link, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading'


const AdminSignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [accessType, setAccessType] = useState('Full Access');
  const [gender, setGender] = useState();
  const [Alert, setAlert] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const BASEURL = process.env.REACT_APP_BASEURL


  const handleSignUp = () => {
    if (!name || !email || !gender) {
      alert("Please fill up mandatory fields")
      return
    }

    if (email.endsWith("@iiitg.ac.in")) {
      setAlert()
    } else {
      setAlert("Please use iiitg email address")
      return
    }

 

    const url = `${BASEURL}/admin/add`
    const data = {
      name: name,
      email: email,
      gender: gender,
      isVerified: false,
      accessType:'Full Access'
    }
    setIsLoading(true)
    fetchData(url, data, "Registered", true)
      .then((res) => {
        // console.log('ress',res, typeof(res))
        if (res) {
          // console.log('ver')
          // navigate('/verification', { state: { email:email,name:name}});
          setIsLoading(false)
          navigate('/verification/emailVerificationLink', { state: { email: email, name: name } });
        } else {
          setIsLoading(false)
          navigate('/error')
        }

      })
      .catch((error) => {
        alert("Something went wrong")
      })
    console.log(data)
  };

  


 
  return (
    <div className="flex items-center justify-center  bg-gradient-to-r from-blue-500 to-purple-500">

      <div className="bg-white m-8 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 ">Admin SignUp</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="name">
            Name*
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email*
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>



        

        
        
     
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender*
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="male"
                value="Male"
                checked={gender === 'Male'}
                onChange={() => setGender('Male')}
                className="form-radio h-5 w-5 text-blue-500"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="female"
                value="Female"
                checked={gender === 'Female'}
                onChange={() => setGender('Female')}
                className="form-radio h-5 w-5 text-blue-500"
              />
              <span className="ml-2">Female</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="nota"
                value="NOTA"
                checked={gender === 'NOTA'}
                onChange={() => setGender('NOTA')}
                className="form-radio h-5 w-5 text-blue-500"
              />
              <span className="ml-2">Third Gender</span>
            </label>
          </div>
        </div>



        

        
        <p className='m-2'>{Alert}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4  rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        // onClick={handleSignUp}
        >
          <Link to='/admin/login'>
            Already have an account?
          </Link>

        </button>
      </div>

      <div className='flex fixed top-2/4'>
        {
          isLoading && <ReactLoading type='spin' color='blue' />
        }
      </div>
    </div>
  );
};

export default AdminSignUp;
