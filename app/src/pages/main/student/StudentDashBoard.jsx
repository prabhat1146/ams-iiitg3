import React, { useState, useEffect } from 'react';
import StudentAttendanceForm from './StudentAttendanceForm';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewCourses from './ReviewCourse';
import AddNewSemester from './AddNewSemester';
import LiveClasses from './LiveClasses';
import { generateDeviceFingerprint, isMobileDevice } from '../../deviceFingerPrint/DeviceFingerPrint';
import { fetchData } from '../admin/SetFormData';
import StudentEditProfile from './StudentEditProfile';

const StudentDashboard = () => {
  const [showProfileText, setShowProfileText] = useState('Show profile');
  const [showProfileEnable, setShowProfileEnable] = useState(false);
  const [currentMobileFingerPrint, setCurrentMobileFingerPrint] = useState(null);
  const [currentLaptopFingerPrint, setCurrentLaptopFingerPrint] = useState(null);
  const [verifiedMobileFingerPrint, setVerifiedMobileFingerPrint] = useState(null);
  const [verifiedLaptopFingerPrint, setVerifiedLaptopFingerPrint] = useState(null);
  const [isMobile, setIsMobile] = useState(true);
  const [isVerifyDevicesDisable, setIsVerifyDevicesDisable] = useState(false);
  const [deviceVerifyButtonText, setDeviceVerifyButtonText] = useState('Verify devices');
  const [studentDegree, setStudentDegree] = useState('');
  const [studentDepartment, setStudentDepartment] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentRollNumber, setStudentRollNumber] = useState('');
  const [giveAttendance, setGiveAttendance] = useState(false);
  const [reviewAttendance, setReviewAttendance] = useState(false);
  const [reviewCourse, setReviewCourse] = useState(false);
  const [addSemester, setAddSemester] = useState(false);
  const [Alert, setAlert] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState(
    `${String(date.getHours()).padStart(2, '0')}-${String(date.getHours() + 1).padStart(2, '0')}`
  );
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate()

  const [studentData, setStudentData] = useState({
    studentDegree: studentDegree,
    studentDepartment: studentDepartment,
    date: date.toISOString().split('T')[0],
    timeSlot: timeSlot,
    studentRollNumber: studentRollNumber,
    studentEmail: studentEmail
  });
  const BASEURL = process.env.REACT_APP_BASEURL
  useEffect(() => {
    setStudentData((prevData) => ({
      ...prevData,
      studentDegree: studentDegree,
      studentDepartment: studentDepartment,
      studentRollNumber: studentRollNumber,
      studentEmail: studentEmail
    }));
  }, [studentDegree, studentDepartment, studentEmail, studentRollNumber]);


  useEffect(() => {

    setIsMobile(isMobileDevice());

    generateDeviceFingerprint()
      // console.log(x)
      .then((res) => {
        // console.log("re",res)
        if (isMobile) {
          setCurrentMobileFingerPrint(res)
          setCurrentLaptopFingerPrint(null);
        } else {
          setCurrentLaptopFingerPrint(res);
          setCurrentMobileFingerPrint(null)
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


  useEffect(() => {


    if (location.state.userEmail) {
      setStudentEmail(location.state.userEmail);
    } else {
      return
    }

    // const url = `${BASEURL}/student/find?studentEmail=${studentEmail}`;
    const url = `${BASEURL}/student/find?studentEmail=${location.state.userEmail}`;

    fetch(url)
      .then((res) => (res.ok ? res.json() : []))
      .then((res) => {
        if (res.length) {
          // console.log(res)
          setStudentName(res[0].studentName);
          setStudentRollNumber(res[0].studentRoll);
          setStudentDepartment(res[0].studentDepartment);
          setStudentDegree(res[0].studentDegree);
          setVerifiedMobileFingerPrint(res[0].mobileID);
          setVerifiedLaptopFingerPrint(res[0].laptopID);

          // console.log('rr',res)
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }, [BASEURL, location.state.userEmail, studentDegree, studentEmail]);

  const handleChange = (option) => {
    if (option === 'giveAttendance') {
      if (isMobile) {
        if (verifiedMobileFingerPrint) {
          if (currentMobileFingerPrint !== verifiedMobileFingerPrint) {
            setAlert("Please use your own mobile !");
            // return;
          }
        } else {
          setAlert("You have not verified your own mobile yet !");
          // return;
        }

      } else {
        if (verifiedLaptopFingerPrint) {
          if (verifiedLaptopFingerPrint !== currentLaptopFingerPrint) {
            setAlert("Please use your own Laptop !");
            // return;
          }
        } else {
          setAlert("You have not verified your own Laptop yet !");
          // return;
        }
      }
    }
    setAlert()
    setGiveAttendance(option === 'giveAttendance');
    setReviewAttendance(option === 'reviewAttendance');
    setReviewCourse(option === 'reviewCourse');
    setAddSemester(option === 'addSemester');
    if (isMobileMenuOpen) setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const handleLogOut = () => {
    const email = `studentEmail=${studentEmail}`

    if (studentEmail) {

      const url = `${BASEURL}/student/logout?${email}`
      fetch(url)
        .then((res) => {

          return res.json()

        })
        .then((res) => {
          navigate('/')
        })


    }
  }

  const handleDevices = () => {

    if (isMobile) {
      // console.log('mb')
      if (!verifiedMobileFingerPrint) {
        const url = `${BASEURL}/student/verify-mobile`;
        const data = {
          studentEmail: studentEmail,
          mobileID: currentMobileFingerPrint
        }

        setIsLoading(true);
        fetchData(url, data)
          .then((res) => {
            setIsLoading(false);
            if (res) {
              setDeviceVerifyButtonText("Verified")
            } else {
              setAlert("Error")
            }

          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
            setAlert("Error")
          })

      }
    } else {
      if (!verifiedLaptopFingerPrint) {
        const url = `${BASEURL}/student/verify-laptop`;

        const data = {
          studentEmail: studentEmail,
          laptopID: currentLaptopFingerPrint
        }
        // console.log('lp',data)

        setIsLoading(true);
        fetchData(url, data)
          .then((res) => {
            setIsLoading(false);
            if (res) {
              setDeviceVerifyButtonText("Verified")
            } else {
              setAlert("Error")
            }

          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
            setAlert("Error")
          })
      }
    }

  }

  useEffect(() => {
    // console.log('l',verifiedMobileFingerPrint)
    if (isMobile) {
      if (verifiedMobileFingerPrint) {
        setIsVerifyDevicesDisable(true);
        // console.log('l',verifiedMobileFingerPrint)
        setDeviceVerifyButtonText("Verified")
      }
    } else {
      if (verifiedLaptopFingerPrint) {
        setIsVerifyDevicesDisable(true);
        setDeviceVerifyButtonText("Verified")
      }
    }

  }, [isMobile, verifiedLaptopFingerPrint, verifiedMobileFingerPrint])

  const handleShowProfile = () => {
    setShowProfileEnable(!showProfileEnable)
    setReviewAttendance(false);
    setGiveAttendance(false);
    setReviewCourse(false);
    setAddSemester(false);
    if (!showProfileEnable) {
      setShowProfileText('Close profile')
    } else {
      setShowProfileText('Show profile');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-8">
      <div className="flex justify-between">
        <div>
          <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center overflow-hidden ">
            <img src="" alt="Profile-pic" className="w-full h-full object-cover" />
          </div>


        </div>
        <div>
          <button className={`p-2 m-4 px-4 ${isVerifyDevicesDisable ? 'bg-green-300 hover:cursor-not-allowed' : 'bg-green-500'}  text-md rounded-md hover:bg-green-600`}
            onClick={handleDevices}
            disabled={isVerifyDevicesDisable}
          >
            {deviceVerifyButtonText}
          </button>
          <button className='p-2  px-4 bg-red-400 text-md rounded-md hover:bg-red-600 '
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="text-white">
        <h3 className="text-2xl font-bold-500">Name : {studentName}</h3>
        <p className="text-xl">Email : {studentEmail}</p>
        <p className="text-white">{`Roll No : ${studentRollNumber}`}</p>
        <p className="text-white">{`Department : ${studentDepartment}`}</p>
        <button className='px-2 p-1 bg-blue-400 hover:bg-blue-600 rounded-md ' onClick={handleShowProfile}>{showProfileText}</button>
      </div>
      {/* <h3 className="text-xl font-bold text-white mb-6">Student Dashboard</h3> */}

      <h2 className='text-black m-4'>{Alert}</h2>
      {showProfileEnable &&
        <StudentEditProfile email={studentEmail}/>
      }
      {!showProfileEnable &&



        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => handleChange('giveAttendance')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full transition-all duration-300 ease-in-out"
          >
            Mark Your Attendance
          </button>
          <button
            onClick={() => handleChange('reviewCourse')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full transition-all duration-300 ease-in-out"
          >
            Review Courses
          </button>
          <button
            onClick={() => handleChange('reviewAttendance')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full transition-all duration-300 ease-in-out"
          >
            Live Classes
          </button>
          <button
            onClick={() => handleChange('addSemester')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full transition-all duration-300 ease-in-out"
          >
            Add New Semester
          </button>
        </div>
      }
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4">
          <button
            onClick={() => handleChange('giveAttendance')}
            className="block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full mb-2 transition-all duration-300 ease-in-out"
          >
            Mark Your Attendance
          </button>
          {/* ... (repeat for other buttons) */}
        </div>
      )}
      {giveAttendance && <StudentAttendanceForm studentData={studentData} />}
      {reviewAttendance && <LiveClasses />}
      {reviewCourse && <ReviewCourses studentData={studentData} />}
      {addSemester && <AddNewSemester studentData={studentData} />}
      {/* {reviewCourse && <CustomCalendar />} */}
    </div>
  );
};

export default StudentDashboard;
