// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import EditOptions from './EditOptions';
import { useLocation, useNavigate } from 'react-router-dom';
import AddAdmin from './AddAdmin';
import RemoveAdmin from './RemoveAdmin';
import VerifyDevice from './VerifyDevice';
import EditProfile from './EditProfile';

const BASEURL = process.env.REACT_APP_BASEURL

const AdminDashboard = () => {
  const [editProfile,setEditProfile]=useState(false);
  const [editProfileText,setEditProfileText]=useState("Show Profile");
  const [adminID,setAdminID]=useState();
  const [selectedSection, setSelectedSection] = useState('');
  const [name, setName] = useState()
  const [email, setEmail] = useState();
  const [alert, setAlert] = useState();
  const [accessType, setAccessType] = useState('Full Access');
  const location = useLocation();
  const [remove, setRemove] = useState(false)
  const [add, setAdd] = useState(false)
  const [verifyDevice, setVerifyDevice] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (location && location.state && location.state.adminID) {
      setAdminID(location.state.adminID)
      const adminid = `adminID=${location.state.adminID}`
      const url = `${BASEURL}/admin/find?${adminid}`
      fetch(url)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then((res) => {
          // Check if the response contains valid JSON data
          if (!res || Object.keys(res).length === 0) {
            throw new Error('No valid JSON data in the response');
          }

          // Handle the successful response
          console.log(res[0].email);
          setName(res[0].name);
          setEmail(res[0].email)
          if (res[0].accessType) {
            setAccessType(res[0].accessType)
          }
        })
        .catch((error) => {
          // Handle errors from both fetch and the json() parsing
          console.error('Fetch error:', error);
        });

    }
  },[location])

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setRemove(false)
    setAdd(false)
  };

  const handleNewAdmin = () => {
    // alert('new')
    if (accessType) {
      setRemove(false)
      setVerifyDevice(false)
      setAdd(true)
      setSelectedSection(null);
    } else {

      setAlert('Permission Denied')
    }
  }
  const handleRemoveAdmin = () => {
    if (accessType) {
      setAdd(false)
      setVerifyDevice(false)
      setRemove(true)
      setSelectedSection(null);
    } else {

      setAlert('Permission Denied')
    }
  }
  const handleVerifyDevice = () => {
    // alert('hi')
    console.log('hi')
    setVerifyDevice(true)
    setAdd(false)
    setRemove(false)
    setSelectedSection(null);
  }


  const handleLogOut = () => {
    const Email = `studentEmail=${email}`

    if (email) {

      const url = `${BASEURL}/student/logout?${Email}`
      fetch(url)
        .then((res) => {

          return res.json()

        })

        .then((res) => {
          navigate('/')
        })


    }
  }


  const handleEditProfile=()=>{
    setEditProfile(!editProfile)
    if(!editProfile){
      setEditProfileText("Close Profile")
    }else{
      setEditProfileText("Show Profile")
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-500 to-purple-500">
        {/* <img
          src="path/to/profile-image.jpg"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        /> */}
        <div className='w-3/5'>
          <h3 className="text-lg text-white font-semibold">Name : {name}</h3>
          <p className="text-white">Email : {email}</p>
          <button
        className='text-white bg-green-400 rounded-md px-2 p-1'
        onClick={handleEditProfile}
          >{editProfileText}</button>
          {/* <p className="text-white">AccessType :{accessType}</p> */}
        </div>
        <div className='sticky left-full flex flex-col sm:flex-col md:flex-row lg:flex-row'>
          <button className='bg-green-400  hover:bg-green-600  px-6 py-1 m-1 rounded-md ' onClick={handleVerifyDevice}>Verify Device</button>
          {/* <button className='bg-green-400 hover:bg-green-600  px-6 py-1 m-1 rounded-md ' onClick={handleNewAdmin}>Add</button> */}
          {/* /<button className='bg-red-400 hover:bg-red-600  px-2.5 py-1  m-1   rounded-md ' onClick={handleRemoveAdmin}>Remove</button> */}
          <button className='bg-red-400 hover:bg-red-600  px-2.5 py-1  m-1   rounded-md ' onClick={handleLogOut}>Logout</button>
          {/* <button className='p-1.5 w-18 px-2 mt-1 bg-red-400 text-md rounded-md '
            onClick={handleLogOut}
          >
            Logout
          </button> */}
        </div>
      </div>


      <nav className="bg-gray-800 text-white py-2">
        <div className="container mx-auto flex justify-center space-x-6">
          <button
            onClick={() => handleSectionChange('faculty')}
            className={`hover:bg-gray-700 px-2 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${selectedSection === 'faculty' ? 'bg-gray-700' : ''
              }`}
          >
            Faculty
          </button>

          <button
            onClick={() => handleSectionChange('student')}
            className={`hover:bg-gray-700 px-2 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${selectedSection === 'student' ? 'bg-gray-700' : ''
              }`}
          >
            View Students
          </button>

          <button
            onClick={() => handleSectionChange('courses')}
            className={`hover:bg-gray-700 px-2 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${selectedSection === 'courses' ? 'bg-gray-700' : ''
              }`}
          >
            Courses
          </button>
        </div>
      </nav>
      <p className='text-white m-auto'>{alert}</p>
      {editProfile && <EditProfile adminID={adminID}/>}
      {verifyDevice && <VerifyDevice/>}
      {add && <AddAdmin accessType={accessType} />}
      {remove && <RemoveAdmin accessType={accessType} />}
      <main className="container mx-auto flex-1 mt-8">
        <div className="flex justify-center items-center h-full ">
          {selectedSection && <EditOptions section={selectedSection} />}
        </div>
      </main>

     


    </div>
  );
};

export default AdminDashboard;
