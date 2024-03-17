// StudentSignUp.js
import React, { useEffect, useState } from 'react';
import { fetchData } from '../admin/SetFormData';
import { Link, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading'
import { isMobileDevice, generateDeviceFingerprint } from '../../deviceFingerPrint/DeviceFingerPrint';


const StudentSignUp = () => {
  const [name, setName] = useState();
  const [roll, setRoll] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [yearOfAdmission, setYearOfAdmission] = useState();
  const [Department, setDepartment] = useState();
  const [degree, setDegree] = useState();
  const [gender, setGender] = useState();
  const [Alert, setAlert] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFingerPrint, setMobileFingerPrint] = useState(null);
  const [laptopFingerPrint, setLaptopFingerPrint] = useState(null);
  const [isMobile, setIsMobile] = useState(true);
  // const [password, setPassword] = useState(null);
  // const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const BASEURL = process.env.REACT_APP_BASEURL


  useEffect(() => {

    generateDeviceFingerprint()
      // console.log(x)
      .then((res) => {
        // console.log("re",res)
        if (isMobile) {
          setMobileFingerPrint(res)
          setLaptopFingerPrint(null);
        } else {
          setLaptopFingerPrint(res);
          setMobileFingerPrint(null)
        }
        return res
      })
      .then((res) => {
        // console.log("f",res)
      })
      .catch((error) => {
        console.log(error)
      })


  }, [isMobile])


  const handleSignUp = () => {
    if (!name || !email || !roll || !phone || !yearOfAdmission || !Department || !degree || !gender) {
      alert("Please fill up mandatory fields")
      return
    }

    if (email.endsWith("@iiitg.ac.in")) {
      setAlert()
    } else {
      setAlert("Please use iiitg email address")
      return
    }

    // return 

    const url = `${BASEURL}/student/register`
    const data = {
      studentName: name,
      studentRoll: roll,
      studentEmail: email,
      studentDepartment: Department,
      studentDegree: degree,
      studentAdmissionYear: yearOfAdmission,
      studentPhone: phone,
      studentSex: gender,
      isVerified: false,
      mobileID: mobileFingerPrint,
      laptopID: laptopFingerPrint
    }
    // console.log("dax", data)
    if(window.confirm("Are you confirm ?")){

    }else{
      return ;
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

  const departmentOptions = [
    { value: 'CSE', label: ' CSE' },
    { value: 'ECE', label: ' ECE ' },
    // Add more department options as needed
  ];


  const degreeOptions = [
    { value: 'B.Tech', label: ' B.Tech' },
    { value: 'M.Tech', label: ' M.Tech' },
    // { value: 'PhD', label: 'PhD' },
    // Add more degree options as needed
  ];

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, [isMobile])


  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const yearOptions = [];

    for (let i =currentYear-4; i <= currentYear; i++) {
      yearOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return yearOptions;
  };

  return (
    <div className="flex items-center justify-center h-5/6  bg-gradient-to-r from-blue-500 to-purple-500">
      <div className='flex justify-center items-center flex-col w-4/5'>
        <h2 className="text-2xl font-bold m-8 text-white">Student Sign Up</h2>
        <div className=" m-8 mb-48 p-8  w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-2 border-white-400 rounded-md bg-blue-500 ">

          <div className="m-4 text-white lg:mx-8">
            <label className="block  text-sm font-bold mb-2 " htmlFor="name">
              Name *
            </label>
            <input
              type="text"
              id="name"
              className="w-full border p-2 rounded text-black"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="m-4 text-white  lg:mx-8">
            <label className="block  text-sm font-bold mb-2" htmlFor="roll">
              Roll Number *
            </label>
            <input
              type="text"
              id="roll"
              className="w-full border  p-2 rounded text-black"
              placeholder="Enter your roll number"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            />
          </div>
          <div className="m-4 text-white  lg:mx-8">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email *
            </label>
            <input
              type="email"
              id="email"
              className="w-full border  p-2 rounded text-black"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div className="m-4 text-white  lg:mx-8">
            <label className="block  text-sm font-bold mb-2" htmlFor="phone">
              Phone Number *
            </label>
            <input
              type="text"
              id="phone"
              className="w-full border  p-2 rounded text-black"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>



          <div className="m-4 text-white  lg:mx-8">
            <label className="block text-sm font-bold mb-2" htmlFor="yearOfAdmission">
              Year of Admission *
            </label>
            <select
              id="yearOfAdmission"
              className="w-full border text-gray-800  p-2 rounded"
              value={yearOfAdmission}
              onChange={(e) => setYearOfAdmission(e.target.value)}
            >
              <option value="">Select Year of Admission</option>
              {renderYearOptions()}
            </select>
          </div>

          <div className="m-4 text-white  lg:mx-8">
            <label className="block text-sm font-bold mb-2">Department *</label>
            <div className="flex">
              {departmentOptions.map((option) => (
                <label key={option.value} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    id={option.value}
                    value={option.value}
                    checked={Department === option.value}
                    onChange={() => setDepartment(option.value)}
                    className="form-radio h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="m-4 lg:mx-8">
            <label className="block text-white  text-sm font-bold mb-2">Degree *</label>
            <div className="flex">
              {degreeOptions.map((option) => (
                <label key={option.value} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    id={option.value}
                    value={option.value}
                    checked={degree === option.value}
                    onChange={() => setDegree(option.value)}
                    className="form-radio h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2 text-white ">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="m-4 lg:mx-8">
            <label className="block text-white  text-sm font-bold mb-2" htmlFor="gender">
              Gender *
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
                <span className="ml-2 text-white ">Male</span>
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
                <span className="ml-2 text-white ">Female</span>
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
                <span className="ml-2 text-white ">Third Gender</span>
              </label>
            </div>
          </div>



          {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password*
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full border border-gray-300 p-2 rounded pr-10"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none cursor-pointer"
            >
              {showPassword ? (
                <span className="text-gray-600">Hide</span>
              ) : (
                <span className="text-gray-600">Show</span>
              )}
            </button>
          </div>
        </div> */}

          <div className="m-4 text-white  lg:mx-8">
            <label className="block  text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full border  p-2 rounded text-black"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <p className='m-2'>{Alert}</p>
          <button
            className="bg-blue-500 text-white py-2 px-4 m-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 m-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          // onClick={handleSignUp}
          >
            <Link to='/student/login'>
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
    </div>
  );
};

export default StudentSignUp;
