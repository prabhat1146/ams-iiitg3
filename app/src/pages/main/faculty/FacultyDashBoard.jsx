import React, { useEffect, useState } from 'react';
import MarkStudentsAttendance from './MarkStudentsAttendance'
import ReviewAttendance from './ReviewAttendance'
import Penalty from './Penalty'
import { useNavigate,useLocation } from 'react-router-dom';
import FacultyProfile from './FacultyProfile';

const FacultyDashBoard = () => {

    const [markAttendance, setMarkAttendance] = useState(false)
    const [reviewAttendance, setReviewAttendance] = useState(false)
    const [penalty, setPenalty] = useState(false)
    const [emails, setEmail] = useState('');
    const [name,setName]=useState()
    const [department,setDepartment]=useState()
    const [facultyProfileEnable,setFacultyProfileEnable]=useState(false);
    const [showProfileText,setShowProfileText]=useState('Show profile')
    const BASEURL = process.env.REACT_APP_BASEURL;


    const navigate = useNavigate()
    const location=useLocation()
    // const BASEURL=process.env.REACT_APP_BASEURL;

    useEffect(()=>{
        if(location && location.state){
            setEmail(location.state.userEmail)

            const url=`${BASEURL}/faculty/search?email=${emails}`
            fetch(url)
            .then((res)=>{
                if(res.ok){
                    return res.json()
                }
            })
            .then((res)=>{
                if(res.length>0){
                    setName(res[0].name)
                    setDepartment(res[0].department)
                }
            })
            .catch((error)=>{
                console.log(error)
            })

        }
    },[BASEURL, emails, location])

    const handleMarkAttendance = () => {
        setMarkAttendance(true)
        setReviewAttendance(false)
        setPenalty(false)

    }

    const handleReviewAttendance = () => {
        setReviewAttendance(true)
        setPenalty(false)
        setMarkAttendance(false)
    }

    const handlePenalty = () => {
        setPenalty(true)
        setMarkAttendance(false)
        setReviewAttendance(false)
    }


    const handleLogOut = () => {
        const email = `studentEmail=${emails}`

        if (email) {

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

    const handleShowProfile=()=>{
        setFacultyProfileEnable(!facultyProfileEnable);
        setMarkAttendance(false);
        setReviewAttendance(false);
        setPenalty(false);
        if(!facultyProfileEnable){
            setShowProfileText('Close profile')
        }else{
            setShowProfileText("Show profile")
        }
    }

    return (
        <div className='bg-gradient-to-r from-blue-500 to-purple-500  min-h-screen'>
            <div className="flex  items-center space-x-4 p-4 bg-gradient-to-r from-blue-500 to-purple-500">
                {/* <img
                    src="path/to/profile-image.jpg"
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                /> */}
                
                <div className='ml-7'>
                    <h3 className="text-xl font-semibold text-white">Name  {name}</h3>
                    <p className="text-white">Email : {emails}</p>
                    <p className="text-white">Department : {department}</p>
                    <button onClick={handleShowProfile} className='bg-green-500 hover:bg-green-600 text-white px-2 p-1 rounded-md'>{showProfileText}</button>
                </div>
                <button className='p-1 w-20 px-4 bg-red-400 hover:bg-red-600 text-md text-white rounded-md  sticky left-full'
                    onClick={handleLogOut}
                >
                    Logout
                </button>
            </div>

            <div className="flex space-x-4 justify-evenly p-4 bg-gradient-to-r from-blue-500 to-purple-500">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleMarkAttendance}
                >
                    Mark Attendance
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleReviewAttendance}
                >
                    Review Attendance
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handlePenalty}
                >
                    Penalty
                </button>
            </div>
            {facultyProfileEnable && 
            <FacultyProfile email={emails}/>
            }
            {markAttendance && <MarkStudentsAttendance facultyEmail={emails}/>}
            {reviewAttendance && <ReviewAttendance facultyEmail={emails} />}
            {penalty && <Penalty />}

            {/* <h1>hi</h1> */}

        </div>
    );
};

export default FacultyDashBoard;