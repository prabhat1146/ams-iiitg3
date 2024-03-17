
// StudentSignUp.js
import React, { useEffect, useState } from 'react';
import { fetchData } from '../admin/SetFormData';
import { Link, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading'
import { isMobileDevice, generateDeviceFingerprint } from '../../deviceFingerPrint/DeviceFingerPrint';
import axios from 'axios';

const StudentEditProfile = (props) => {
    const [name, setName] = useState(); //student name
    const [roll, setRoll] = useState();  //student roll
    const [email, setEmail] = useState(); //student email-id
    const [address, setAddress] = useState(); //atudent address
    const [phone, setPhone] = useState(); //student phone no
    const [yearOfAdmission, setYearOfAdmission] = useState();  //student admission year
    const [Department, setDepartment] = useState();  //student department
    const [degree, setDegree] = useState();  //student degree
    const [gender, setGender] = useState();   //student gender
    const [Alert, setAlert] = useState();   // alert message for invalid operation
    const [isLoading, setIsLoading] = useState(false);  // show loading icon
    const [studentCourses, setStudentCourses] = useState([]);  // student's all course
    const [semester, setSemester] = useState();  // student semeseter
    const [selectedCourse, setSelectedCourse] = useState([]); //student opted course
    const [allCourses, setAllCourses] = useState([]);    //courses from course section i.e offered courses 
    const [selectedCourses, setSelectedCourses] = useState([]);   //selected course that student has selected to add to his/her profile
    const [addNewCourse,setAddNewCourse]=useState([]);  // collection of course that student want to add to his profile
    const [nameEditButtonEnable,setNameEditButtonEnable]=useState(false);
    const [nameOKButtonText,setNameOKButtonText]=useState('OK');
    const [rollNoEditButtonEnable,setRollNoEditButtonEnable]=useState(false);
    const [rollNoOKButtonText,setRollNoOKButtonText]=useState('OK');
    const [phoneEditButtonEnable,setPhoneEditButtonEnable]=useState(false);
    const [phoneOKButtonText,setPhoneOKButtonText]=useState('OK');
    const [addressEditButtonEnable,setAddressEditButtonEnable]=useState(false);
    const [addressOKButtonText,setAddressOKButtonText]=useState('OK');
    



    const BASEURL = process.env.REACT_APP_BASEURL


    useEffect(() => {
        const url = `${BASEURL}/student/find?studentEmail=${props.email}`
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return []
                }
            })
            .then((res) => {
                if (res.length) {
                    setName(res[0].studentName)
                    setEmail(res[0].studentEmail)
                    setRoll(res[0].studentRoll)
                    setPhone(res[0].studentPhone)
                    setYearOfAdmission(res[0].studentAdmissionYear)
                    setDegree(res[0].studentDegree)
                    setDepartment(res[0].studentDepartment)
                    setGender(res[0].studentSex)
                    setAddress(res[0].studentAddress)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [BASEURL, props.email])

    useEffect(() => {
        const url = `${BASEURL}/student/searchCourses?studentEmail=${props.email}`
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    if (res) {
                        return res.json();
                    } else {
                        return []
                    }
                }
            })
            .then((res) => {
                if (res.length) {
                    setStudentCourses(res);
                    // console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [BASEURL, props.email])

    useEffect(() => {
        const semesterCourse = studentCourses.find((course) => {
            // console.log(typeof (course.semester))
            return (parseInt(course.semester) === (semester && parseInt(semester)))
        })
        if (semesterCourse) {
            setSelectedCourse(semesterCourse.courses)
        }

        // console.log(semesterCourse, semester)
    }, [semester, studentCourses])


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




    const renderYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const yearOptions = [];

        for (let i = currentYear - 4; i <= currentYear; i++) {
            yearOptions.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }

        return yearOptions;
    };

   


    useEffect(() => {
        // Replace the API endpoint with your actual API endpoint to fetch courses
        const apiUrl = `${BASEURL}/course/search?semester=${semester}&department=${Department}`;

        // Fetch courses from the database
        axios.get(apiUrl)
            .then((response) => {
                const coursesData = response.data?.map(course => ({
                    courseID: course.courseID?.trim(),
                    courseName: course.courseName,
                    penalty: 0
                }));

                setAllCourses(coursesData);
                // console.log(coursesData);
            })
            .catch(error => console.error('Error fetching courses:', error));
    }, [BASEURL, Department, semester]);


    // const handleCourseChange = (courseID) => {
    //     // Update the selected courses when a course is selected
    //     setSelectedCourses((prevCourses) => {
    //         if (prevCourses.includes(courseID)) {
    //             // If courseID already exists, remove it
    //             return prevCourses.filter(id => id !== courseID);
    //         } else {
    //             // Otherwise, add the courseID
    //             return [...prevCourses, courseID];
    //         }
    //     });
    // };

    const handleRemoveSelectedCourse = (index) => {
        // Create a new array without the course at the specified index
        const updatedCourses = [...selectedCourses.slice(0, index), ...selectedCourses.slice(index + 1)];
        setSelectedCourses(updatedCourses);
    };

    const handleCourseSelection = (e, semesterIndex) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => JSON.parse(option.value));

        // Check if the selected options are not already in the selectedCourses array
        const newSelectedCourses = selectedOptions.filter(option =>
            !selectedCourses.some(course => course.courseID === option.courseID)
        );

        // Update selectedCourses with the new courses
        setSelectedCourses((prevSelectedCourses) => [
            ...prevSelectedCourses,
            ...newSelectedCourses
        ]);

    };


    useEffect(() => {
        setAddNewCourse((prevData) => ({
            ...prevData,
            semester: semester?.trim(),
            courses: selectedCourses,
            studentRoll: roll?.trim(),
            studentEmail: email?.trim(),
            studentDegree: degree?.trim(),
            studentDepartment:Department?.trim()
        }))

        // console.log(newSemesterData)
    }, [Department, degree, email, roll, selectedCourses, semester])

    const handleAddCourse = (e) => {
        // Perform any action on form submission, such as submitting attendance
        e.preventDefault();
        if(window.confirm("Are you sure to add it?")){

        }else{
            return ;
        }
        const url = `${BASEURL}/student/addNewCourses`;
        try {
            // console.log(courseData)
            fetchData(url, addNewCourse, "Added", true);
        } catch (error) {

        }
        // console.log('Semester:', semester);
        // console.log('Selected Courses:', newSemesterData);
    };

    const handleRemoveCourse = (e) => {

        if(window.confirm("Are you sure to remove it? You will not be allowed to give attendance through this course!")){

        }else{
            return ;
        }
        const url = `${BASEURL}/student/removeCourse`;
        const data={
            semester:semester,
            courseID:e.target.value,
            studentEmail:email,
            studentRoll:roll
        }

        try {
           
            fetchData(url, data, "Removed", true);
        } catch (error) {

        }
        
    }

    const handleNameEdit=()=>{
        setNameEditButtonEnable(true);
        setNameOKButtonText("OK")
    }

    const handleNameOK=()=>{
        if(!nameEditButtonEnable){
            setAlert("Click edit button to edit name!")
            return ;
        }
        if(!name){
            setAlert("Name is required !")
            return ;
        }
        if(!window.confirm("Are you sure?")){
            return ;
        }
        const url=`${BASEURL}/student/update-profile`
        const data={
            studentEmail:email,
            studentRoll:roll,
            studentName:name
        }
       try {
        console.log('d',data)
        setIsLoading(true);
        fetchData(url,data,'You have successfully edited your name!',true)
        .then((res)=>{
            if(res){

            }
            setIsLoading(false);
        })
       } catch (error) {
        setIsLoading(false);
        console.log(error)
       }

       setNameEditButtonEnable(false);
       setNameOKButtonText('Success')
            
    }
    const handleRollNoEdit=()=>{
        setRollNoEditButtonEnable(true);
        setRollNoOKButtonText("OK")
    }

    const handleRollNoOK=()=>{
        if(!rollNoEditButtonEnable){
            setAlert("Click edit button to edit roll No!")
            return ;
        }
        if(!roll){
            setAlert("Roll No is required !")
            return ;
        }
        if(!window.confirm("Are you sure?")){
            return ;
        }
        const url=`${BASEURL}/student/update-profile`
        const data={
            studentEmail:email,
            studentRoll:roll,
            // studentName:name
        }
       try {
        // console.log('d',data)
        setIsLoading(true);
        fetchData(url,data,'You have successfully edited your name!',true)
        .then((res)=>{
            if(res){

            }
            setIsLoading(false);
        })
       } catch (error) {
        setIsLoading(false);
        console.log(error)
       }

       setRollNoEditButtonEnable(false);
       setRollNoOKButtonText('Success')
            
    }
    const handlePhoneEdit=()=>{
        setPhoneEditButtonEnable(true);
        setPhoneOKButtonText("OK")
    }

    const handlePhoneOK=()=>{
        if(!phoneEditButtonEnable){
            setAlert("Click edit button to edit Phone No!")
            return ;
        }
        if(!phone){
            setAlert("Phone No is required !")
            return ;
        }
        if(!window.confirm("Are you sure?")){
            return ;
        }
        const url=`${BASEURL}/student/update-profile`
        const data={
            studentEmail:email,
            studentRoll:roll,
            studentPhone:phone
        }
       try {
        // console.log('d',data)
        setIsLoading(true);
        fetchData(url,data,'You have successfully edited your phone No!',true)
        .then((res)=>{
            if(res){

            }
            setIsLoading(false);
        })
       } catch (error) {
        setIsLoading(false);
        console.log(error)
       }

       setPhoneEditButtonEnable(false);
       setPhoneOKButtonText('Success')
            
    }
    const handleAddressEdit=()=>{
        setAddressEditButtonEnable(true);
        setAddressOKButtonText("OK")
    }

    const handleAddressOK=()=>{
        if(!addressEditButtonEnable){
            setAlert("Click edit button to edit address!")
            return ;
        }
        if(!address){
            setAlert("Address is required !")
            return ;
        }
        if(!window.confirm("Are you sure?")){
            return ;
        }
        const url=`${BASEURL}/student/update-profile`
        const data={
            studentEmail:email,
            studentRoll:roll,
            studentAddress:address
        }
       try {
        // console.log('d',data)
        setIsLoading(true);
        fetchData(url,data,'You have successfully edited your address!',true)
        .then((res)=>{
            if(res){

            }
            setIsLoading(false);
        })
       } catch (error) {
        setIsLoading(false);
        console.log(error)
       }

       setAddressEditButtonEnable(false);
       setAddressOKButtonText('Success')
            
    }

    return (
        <div className="flex items-center justify-center h-5/6  bg-gradient-to-r from-blue-500 to-purple-500">
            <div className='flex justify-center items-center flex-col w-full lg:w-4/5 md:w-4/5'>
                <h2 className="text-2xl font-bold mx-8 text-white">Student profile</h2>
                <p className='m-2 text-white'>{Alert}</p>
                <div className="  p-4  w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  rounded-md  ">

                    <div className="md:m-4 lg:m-4  text-white lg:mx-8 border-2 rounded-md p-4 bg-blue-400 hover:bg-blue-500 ">
                        <label className="block  text-sm font-bold mb-2 " htmlFor="name">
                            Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            disabled={!nameEditButtonEnable}
                            className="w-full border p-2 rounded text-black"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button onClick={handleNameEdit} className='bg-blue-600 px-4 p-1 mt-1 mr-2 rounded-md '>Edit</button>
                        <button onClick={handleNameOK}  className='bg-green-600 px-4 p-1 mt-1 rounded-md '>{nameOKButtonText}</button>
                    </div>
                    <div className="mt-2 md:m-4 lg:m-4 text-white  lg:mx-8 border-2 rounded-md p-4 bg-blue-400 hover:bg-blue-500 ">
                        <label className="block  text-sm font-bold mb-2" htmlFor="roll">
                            Roll Number *
                        </label>
                        <input
                            type="text"
                            id="roll"
                            className="w-full border  p-2 rounded text-black"
                            placeholder="Enter your roll number"
                            value={roll}
                            disabled={!rollNoEditButtonEnable}
                            onChange={(e) => setRoll(e.target.value)}
                        />
                        <button onClick={handleRollNoEdit} className='bg-blue-600 px-4 p-1 mt-1 mr-2 rounded-md '>Edit</button>
                        <button onClick={handleRollNoOK} className='bg-green-600 px-4 p-1 mt-1 rounded-md '>{rollNoOKButtonText}</button>
                    </div>
                    <div className="mt-2 md:m-4 lg:m-4 text-white  lg:mx-8 border-2 rounded-md p-4 bg-blue-400 hover:bg-blue-500 ">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border  p-2 rounded text-black"
                            placeholder="Enter your email"
                            value={email}
                            disabled={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className='bg-blue-600 px-4 p-1 mt-1 mr-2 rounded-md '>Edit</button>
                        <button className='bg-green-600 px-4 p-1 mt-1 rounded-md '>OK</button>
                    </div>


                    <div className="mt-2 md:m-4 lg:m-4 text-white  lg:mx-8 border-2 rounded-md p-4 bg-blue-400 hover:bg-blue-500 ">
                        <label className="block  text-sm font-bold mb-2" htmlFor="phone">
                            Phone Number *
                        </label>
                        <input
                            type="text"
                            id="phone"
                            className="w-full border  p-2 rounded text-black"
                            placeholder="Enter your phone number"
                            value={phone}
                            disabled={!phoneEditButtonEnable}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button onClick={handlePhoneEdit} className='bg-blue-600 px-4 p-1 mt-1 mr-2 rounded-md '>Edit</button>
                        <button onClick={handlePhoneOK} className='bg-green-600 px-4 p-1 mt-1 rounded-md '>{phoneOKButtonText}</button>
                    </div>



                    <div className="mt-2 md:m-4 lg:m-4 text-white  lg:mx-8 border-2 rounded-md p-4 bg-blue-400 hover:bg-blue-500 ">
                        <label className="block text-sm font-bold mb-2" htmlFor="yearOfAdmission">
                            Year of Admission *
                        </label>
                        <select
                            id="yearOfAdmission"
                            className="w-full border text-gray-800  p-2 rounded"
                            value={yearOfAdmission}
                            disabled={true}
                            onChange={(e) => setYearOfAdmission(e.target.value)}
                        >
                            <option value="">Select Year of Admission</option>
                            {renderYearOptions()}
                        </select>
                        <button onClick={()=>{setAlert('Permission denied!')}} className='bg-blue-600 px-4 p-1 mt-1 mr-2 rounded-md '>Edit</button>
                        <button onClick={()=>{setAlert('Permission denied!')}} className='bg-green-600 px-4 p-1 mt-1 rounded-md '>OK</button>
                    </div>

                    <div className="mt-2 md:m-4 lg:m-4 text-white  lg:mx-8 border-2 rounded-md p-4 bg-blue-400 hover:bg-blue-500 ">
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
                        <button onClick={()=>{setAlert('Permission denied!')}} className='bg-blue-600 px-4 p-1 mt-1 mr-2 rounded-md '>Edit</button>
                        <button onClick={()=>{setAlert('Permission denied!')}} className='bg-green-600 px-4 p-1 mt-1 rounded-md '>OK</button>
                    </div>
                    <div className="mt-2 md:m-4 lg:m-4 lg:mx-8 border-2 rounded-md p-4 bg-blue-400 hover:bg-blue-500 ">
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
                        <button onClick={()=>{setAlert('Permission denied!')}} className='bg-blue-600 px-4 p-1 mt-1 mr-2 rounded-md '>Edit</button>
                        <button onClick={()=>{setAlert('Permission denied!')}} className='bg-green-600 px-4 p-1 mt-1 rounded-md '>OK</button>
                    </div>
                    <div className="mt-2 md:m-4 lg:m-4 lg:mx-8 border-2 rounded-md p-4 bg-blue-400 hover:bg-blue-500 ">
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
                        <button onClick={()=>{setAlert('Permission denied!')}} className='bg-blue-600 px-4 p-1 mt-1 mr-2 rounded-md '>Edit</button>
                        <button onClick={()=>{setAlert('Permission denied!')}} className='bg-green-600 px-4 p-1 mt-1 rounded-md '>OK</button>
                    </div>

                    <div className="mt-2 md:m-4 lg:m-4 text-white  lg:mx-8 border-2 rounded-md p-4 bg-blue-400 hover:bg-blue-500 ">
                        <label className="block  text-sm font-bold mb-2" htmlFor="address">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            className="w-full border  p-2 rounded text-black"
                            placeholder="Enter your address"
                            value={address}
                            disabled={!addressEditButtonEnable}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <button onClick={handleAddressEdit} className='bg-blue-600 px-4 p-1 mt-1 mr-2 rounded-md '>Edit</button>
                        <button onClick={handleAddressOK} className='bg-green-600 px-4 p-1 mt-1 rounded-md '>OK</button>
                    </div>
                </div>
                <div >
                    <label htmlFor="semester" className='text-white '>Semester</label>

                </div>
                <div className='mt-2 md:m-4 lg:m-2'>
                    <label htmlFor="semester1" className='text-white'>1</label>
                    <input
                        type="radio"
                        id='semester1'
                        name='semester'
                        value={1}
                        onChange={(e) => { setSemester(e.target.value) }}
                        className='ml-2 mr-4'
                    />
                    <label htmlFor="semester2" className='text-white'>2</label>
                    <input
                        type="radio"
                        id='semester2'
                        name='semester'
                        value={2}
                        onChange={(e) => { setSemester(e.target.value) }}
                        className='ml-2 mr-4'
                    />
                    <label htmlFor="semester3" className='text-white'>3</label>
                    <input
                        type="radio"
                        id='semester3'
                        name='semester'
                        value={3}
                        onChange={(e) => { setSemester(e.target.value) }}
                        className='ml-2 mr-4'
                    />
                    <label htmlFor="semester4" className='text-white'>4</label>
                    <input
                        type="radio"
                        id='semester4'
                        name='semester'
                        value={4}
                        onChange={(e) => { setSemester(e.target.value) }}
                        className='ml-2 mr-4'
                    />
                    <label htmlFor="semester5" className='text-white'>5</label>
                    <input
                        type="radio"
                        id='semester5'
                        name='semester'
                        value={5}
                        onChange={(e) => { setSemester(e.target.value) }}
                        className='ml-2 mr-4'
                    />
                    <label htmlFor="semester6" className='text-white'>6</label>
                    <input
                        type="radio"
                        id='semester6'
                        name='semester'
                        value={6}
                        onChange={(e) => { setSemester(e.target.value) }}
                        className='ml-2 mr-4'
                    />
                    <label htmlFor="semester7" className='text-white'>7</label>
                    <input
                        type="radio"
                        id='semester7'
                        name='semester'
                        value={7}
                        onChange={(e) => { setSemester(e.target.value) }}
                        className='ml-2 mr-4'
                    />
                    <label htmlFor="semester8" className='text-white'>8</label>
                    <input
                        type="radio"
                        id='semester8'
                        name='semester'
                        onChange={(e) => { setSemester(e.target.value) }}
                        value={8}
                        className='ml-2 mr-4'
                    />
                </div>
                <h1 className='text-white'>Your courses :</h1>
                <div className='w-full bg-white px-4 p-1  rounded-md mt-4'>
                    
                    {
                        selectedCourse?.length &&
                        selectedCourse?.map((course) => {
                            return (
                                <div className='bg-white w-full flex justify-between '>
                                    <div>
                                        <h1 className='w-full'>{course.courseName} ( {course.courseID} )</h1>
                                    </div>
                                    <div>
                                        <button value={course?.courseID} onClick={handleRemoveCourse} className='px-4 p-1 bg-red-600 hover:bg-red-800 text-white rounded-md m-1'>Remove</button>
                                    </div>


                                </div>
                            )
                        })
                    }
                </div>

                <div className="mb-2 w-full rounded-md ">
                    <label className="block text-sm mb-1 text-white">
                        Courses option :
                    </label>
                    <select
                        id="courseList"
                        multiple
                        onChange={(e) => handleCourseSelection(e)}
                        // value={selectedCourses}
                        className="w-full p-2 border block overflow-y-auto"
                    // style={{ height: '50px' }} // Set height for better UI
                    >
                        {allCourses?.map((course) => (
                            <option value={JSON.stringify(course)}>
                                {course.courseName}
                            </option>

                        ))}
                    </select>

                    <div className="mt-4 w-full">
                        <h3 className="text-lg font-semibold mb-2 text-white">Selected courses:</h3>
                        <ul className="list-disc pl-4">
                            {selectedCourses?.map((course, index) => (
                                <li className="flex items-center">
                                    <span>{course.courseName}</span>
                                    <button
                                        className="ml-2 text-red-500"
                                        onClick={() => handleRemoveSelectedCourse(index)}
                                    >
                                        &#10006;
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <button onClick={handleAddCourse}  className='px-4 p-1 bg-green-400 hover:bg-green-600 text-white rounded-md m-2'>Add</button>

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




export default StudentEditProfile;