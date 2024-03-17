import React, { useEffect, useState } from 'react';
import { fetchDataFromCourse } from './SearchFromCourse';
import { fetchData } from '../admin/SetFormData';
import ReactLoading from 'react-loading'
import TotalPresent from './TotalPresent'
// import StudentAttendanceData from './StudentAttendanceData';

const MarkStudentsAttendance = (props) => {
  const [showText,setShowText]=useState('Show');
  const [attendanceCount, setAttendancecount] = useState(0);
  const [currentTimeSlotPresentStudents, setCurrentTimeSlotPresentStudents] = useState()
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState('x');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCourseID, setSelectedCourseID] = useState('');
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [courses, setCourses] = useState([]);
  const [studentGroup, setStudentGroup] = useState('');
  const [studentSection, setStudentSection] = useState('');
  const [sectionSelected, setSectionSelected] = useState(false);
  const [groupSelected, setGroupSelected] = useState(false);
  // const [semesterType, setsemesterType] = useState();
  const [attendanceType, setAttendanceType] = useState()
  const [selectedOption, setSelectedOption] = useState('');
 
  const [OTP, setOtp] = useState();
  const [otpButtonEnable, setOtpButtonEnable] = useState(true);
  // const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [AttendanceSubmitEnable, setAttendanceSubmitEnable] = useState(false);
  const [timer, setTimer] = useState(10);
  const [currentTimer, setCurrentTimer] = useState(10)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [Alert, setAlert] = useState()
  const [date, setDate] = useState(new Date())
  const [currentDate, setCurrentDate] = useState(date.toLocaleDateString());
  const [timeSlot, setTimeSlots] = useState(
    `${String(date.getHours()).padStart(2, '0')}-${String(date.getHours() + 1).padStart(2, '0')}`
  );

  // console.log('redering')
  useEffect(() => {
    const int = setInterval(() => {
      const DATE = new Date()

      const slot = `${String(DATE.getHours()).padStart(2, '0')}-${String(DATE.getHours() + 1).padStart(2, '0')}`
      if (slot === timeSlot) {

      } else {
        setTimeSlots(slot)
        setDate(DATE)
        setCurrentDate(date.toLocaleDateString())
      }



      return int;

    }, 1000);

    // console.log('date', date.toLocaleDateString())

  }, [date, timeSlot])

  const [facultyName, setFacultyName] = useState()
  const [facultyEmail, setFacultyEmail] = useState()
  const [query, setQuery] = useState({
    degree: '',
    semesterType:'',
    semester: '',
    department: '',

  });

  const BASEURL = process.env.REACT_APP_BASEURL

  useEffect(() => {
    setFacultyEmail(props.facultyEmail)
    const url = `${BASEURL}/faculty/search?email=${props.facultyEmail}`
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return []
        }
      })
      .then((res) => {
        if (res) {
          setFacultyName(res[0].name)
          handleQueryChange('department',res[0].department)
          setCourses(res[0]?.facultyCourses)
          console.log('query',res[0].department)
          // res[0]?.facultyCourses.map((res)=>{
          //   console.log('k',res.courseID)
          // })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [BASEURL, props.facultyEmail])





  const [attendanceData, setAttendanceData] = useState({
    degree: query.degree,
    studentAdmissionyear: selectedYear,
    semester: query.semester,
    department: query.department,
    courseID: selectedCourseID,
    courseName: selectedCourseName,
    facultyEmail: facultyEmail,
    facultyName: facultyName,
    date: currentDate,
    timeSlot: timeSlot,
    studentGroup: studentGroup,
    studentSection: studentSection,
    // semesterType: semesterType
    // otp:OTP

  });

  useEffect(() => {

    setAttendanceData((prevData) => ({
      ...prevData,
      degree: query.degree,
      studentAdmissionyear: selectedYear,
      semester: query.semester,
      department: query.department,
      courseID: selectedCourseID,
      courseName: selectedCourseName,
      facultyEmail: facultyEmail,
      facultyName: facultyName,
      date: currentDate,
      timeSlot: timeSlot,
      studentGroup: studentGroup,
      studentSection: studentSection,
      // semesterType: semesterType

    }));
    // console.log(query.semester)

  }, [query, selectedYear, facultyEmail, facultyName, date, timeSlot, selectedCourseID, selectedCourseName, studentGroup, studentSection, currentDate]);




  useEffect(() => {
    const intervalId = setInterval(() => {
      const data = {
        facultyEmail: facultyEmail.trim(),
        date: currentDate,
        timeSlot: timeSlot
      }
      // console.log(data)
      fetchDataFromCourse(`${BASEURL}/attendance/attendanceTotalData`, data)
        .then((res) => {
          if (res) {
            // console.log('l', res)
            // console.log('ll', res[0].studentAttendances)
            // setAttendancecount(res[0]?.studentAttendances?.length);
            if (res.length === 0) {
              setAttendancecount(0);
            } else if (!res[0].studentAttendances?.length) {
              setAttendancecount(0);
            } else if (res[0].studentAttendances?.length) {
              setAttendancecount(res[0].studentAttendances.length);
              setCurrentTimeSlotPresentStudents(res[0].studentAttendances)
              // console.log('lll', res[0].studentAttendances)
            }
          } else {
            setAttendancecount(0);
          }

          // setAttendancecount(3)
        })
    }, 2000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [BASEURL, currentDate, date, facultyEmail, timeSlot]);


  const handleQueryChange = (name,value) => {
   
    setQuery((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  useEffect(() => {
    var url = `${BASEURL}/course/fin`;
    // console.log("hi",selectedDegree)
    if (query.degree !== '' || query.department !== '' || query.semester !== '') {
      // setQuery({ 'degree': selectedDegree })
      // setQuery("hi")
      url = `${BASEURL}/course/sea`;
      // console.log("hi", selectedDegree)
      // console.log("hi2", query)
      const courseData = fetchDataFromCourse(url, query)
      courseData.then((res) => {
        if (res) {
          // setCourses(res)
        } else {
          // setCourses([])
        }

      })



    } else {
      try {
        fetch(url)
          .then((res) => {
            // Check if the response is successful
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            // Parse the JSON response
            return res.json();
          })
          .then((data) => {
            // Assuming the response is an array of courses
            // Update the state with the fetched courses
            // setCourses(data);
          })
          .catch((error) => {
            // Handle fetch or parsing errors
            console.error('Error fetching courses:', error);
          });
      } catch (error) {

      }
    }

  }, [BASEURL, query, selectedDegree])


  const handleCourseSelect = async (courseID) => {
    try {
      // Assuming courses is an array of objects with 'id' and 'name' properties
      const selectedCourse = courses.find(course => course.courseID === courseID);

      if (selectedCourse) {
        setSelectedCourseID(selectedCourse.courseID);
        setSelectedCourseName(selectedCourse.courseName);
        handleQueryChange('semester',selectedCourse.semester)
        handleQueryChange('degree',selectedCourse.degree)
        console.log(selectedCourse.semester)
        console.log(selectedCourse.degree)
        // Additional logic or validation if needed
      } else {
        console.error("Selected course not found");
      }
    } catch (error) {
      console.error("Error handling course selection:", error);
    }

  };




  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === 'takeAttendance') {
      setAttendanceSubmitEnable(true)
    }
  };


  const handletimer = (value) => {
    setTimer(value)
    setCurrentTimer(value)
  }


  const stopTimer = async (time) => {
    // alert('h')

    if (time > 0) {
      setTimeout(() => {
        time = time - 1;
        setCurrentTimer(time)
        if (time > 0) {
          stopTimer(time)
        }
        else if (time === 0) {

          if (attendanceType === 'ByCourseID') {
            let url = `${BASEURL}/student/readyForAttendanceByCourseID`;
            let data = {
              studentReadyForAttendance: false,
              courseID: selectedCourseID,
              studentAdmissionYear: attendanceData.studentAdmissionyear,
              // studentDepartment: attendanceData.department,
              studentDegree: attendanceData.degree,
              // studentGroup: studentGroup
            }
            console.log(data)

            // if(attendanceData.department==='HSS' || attendanceData.department ==='MATHS&SCIENCE'){
            //    data = {
            //     studentReadyForAttendance: false,
            //     courseID: selectedCourseID,
            //     studentAdmissionYear: attendanceData.studentAdmissionyear,
            //     studentDepartment: attendanceData.department,
            //     studentDegree: attendanceData.degree,
            //     // studentGroup: studentGroup
            //   }
            // }
            // console.log(data)

            fetchData(url, data, "Students are not allowed now !", true)
            // alert('h')
          } else if (attendanceType === 'ByGroupID') {
            let url = `${BASEURL}/student/readyForAttendanceByGroupID`;
            let data = {
              studentReadyForAttendance: false,
              courseID: selectedCourseID,
              studentAdmissionYear: attendanceData.studentAdmissionyear,
              // studentDepartment: attendanceData.department,
              studentDegree: attendanceData.degree,
              studentGroup: studentGroup
            }

            fetchData(url, data, "Students are not allowed now !", true)
          } else if (attendanceType === 'BySectionID') {
            let url = `${BASEURL}/student/readyForAttendanceBySectionID`;
            let data = {
              studentReadyForAttendance: false,
              courseID: selectedCourseID,
              studentAdmissionYear: attendanceData.studentAdmissionyear,
              // studentDepartment: attendanceData.department,
              studentDegree: attendanceData.degree,
              studentSection: studentSection
            }

            fetchData(url, data, "Students are not allowed now !", true)
          }

          setIsTimerRunning(false);
        }
      }, 1000)
    }

  }


  const handleGenerateOtp = async () => {

    if (isTimerRunning) {
      setAlert("Timer is Already Running")
      return
    }
    setCurrentTimer(timer)
    stopTimer(timer);
    setIsTimerRunning(true);
    setAlert()

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();



    setOtp(generatedOtp);



    if (attendanceType === 'ByCourseID') {


      // setTimeout(() => {
      //   url = `${BASEURL}/student/readyForAttendanceByCourseID`;
      //   data = {
      //     studentReadyForAttendance: false,
      //     courseID: selectedCourseID,
      //     studentAdmissionYear: attendanceData.studentAdmissionyear,
      //     studentDepartment: attendanceData.department,
      //     studentDegree: attendanceData.degree,
      //     // studentGroup: studentGroup
      //   }

      //   fetchData(url, data, "close ", true)

      // }, 10000);

      // otp setup by selecting courseID
      let url = `${BASEURL}/attendance/setOtpByCourseID`;
      let data = {
        otp: generatedOtp,
        courseID: selectedCourseID,
        date: currentDate,
        facultyEmail: facultyEmail,
        timeSlot: timeSlot,
        studentAdmissionyear: attendanceData.studentAdmissionyear
      }



      setIsLoading(true);
      fetchData(url, data, "OTP is generated !", true)
        .then((res) => {
          // if(res){

          // }

          setIsLoading(false);
        })


      url = `${BASEURL}/student/readyForAttendanceByCourseID`;
      data = {
        studentReadyForAttendance: true,
        courseID: selectedCourseID,
        studentAdmissionYear: attendanceData.studentAdmissionyear,
        // studentDepartment: attendanceData.department,
        studentDegree: attendanceData.degree,
        // studentGroup: studentGroup
      }
      setIsLoading(true);
      fetchData(url, data, "Students are allowed !", true)
        .then((res) => {
          // if(res){

          // }

          setIsLoading(false);
        })



    } else if (attendanceType === 'ByGroupID') {


      // setTimeout(() => {
      //   url = `${BASEURL}/student/readyForAttendanceByGroupID`;
      //   data = {
      //     studentReadyForAttendance: false,
      //     courseID: selectedCourseID,
      //     studentAdmissionYear: attendanceData.studentAdmissionyear,
      //     studentDepartment: attendanceData.department,
      //     studentDegree: attendanceData.degree,
      //     studentGroup: studentGroup
      //   }

      //   fetchData(url, data, "success", true)
      // }, 10000);


      let url = `${BASEURL}/attendance/setOtpByGroupID`;
      let data = {
        otp: generatedOtp,
        studentGroup: studentGroup,
        courseID: selectedCourseID,
        date: currentDate,
        facultyEmail: facultyEmail,
        timeSlot: timeSlot,
        semester: attendanceData.semester,
        studentAdmissionyear: attendanceData.studentAdmissionyear,


      }
      setIsLoading(true);
      fetchData(url, data, "OTP is generated !", true)
        .then((res) => {
          // if(res){

          // }

          setIsLoading(false);
        })

      url = `${BASEURL}/student/readyForAttendanceByGroupID`;
      data = {
        studentReadyForAttendance: true,
        courseID: selectedCourseID,
        studentAdmissionYear: attendanceData.studentAdmissionyear,
        // studentDepartment: attendanceData.department,
        studentDegree: attendanceData.degree,
        studentGroup: studentGroup
      }
      setIsLoading(true);
      fetchData(url, data, "Students are allowed", true)
        .then((res) => {
          // if(res){

          // }

          setIsLoading(false);
        })




    } else if (attendanceType === 'BySectionID') {

      // setTimeout(() => {
      //   url = `${BASEURL}/student/readyForAttendanceBySectionID`;
      //   data = {
      //     studentReadyForAttendance: false,
      //     courseID: selectedCourseID,
      //     studentAdmissionYear: attendanceData.studentAdmissionyear,
      //     studentDepartment: attendanceData.department,
      //     studentDegree: attendanceData.degree,
      //     studentSection: studentSection
      //   }

      //   fetchData(url, data, " close", true)

      // }, 10000)


      let url = `${BASEURL}/attendance/setOtpBySectionID`;
      let data = {
        otp: generatedOtp,
        courseID: selectedCourseID,
        studentSection: studentSection,
        date: currentDate,
        facultyEmail: facultyEmail,
        timeSlot: timeSlot,
        semester: attendanceData.semester,
        studentAdmissionyear: attendanceData.studentAdmissionyear

      }

      console.log(data)
      setIsLoading(true);
      fetchData(url, data, "OTP is generated !", true)
        .then((res) => {
          // if(res){

          // }

          setIsLoading(false);
        })


      url = `${BASEURL}/student/readyForAttendanceBySectionID`;
      data = {
        studentReadyForAttendance: true,
        courseID: selectedCourseID,
        studentAdmissionYear: attendanceData.studentAdmissionyear,
        // studentDepartment: attendanceData.department,
        studentDegree: attendanceData.degree,
        studentSection: studentSection
      }
      setIsLoading(true);
      fetchData(url, data, "Students are allowed !", true)
        .then((res) => {
          // if(res){

          // }

          setIsLoading(false);
        })



    }

  };




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


  const handleAttendaceForm = () => {
    try {
      const url = `${BASEURL}/attendance/initiate`
      fetchData(url, attendanceData)
      console.log(attendanceData)
      setOtpButtonEnable(false)
      // console.log("hio", otpButtonEnable)
    } catch (error) {

    }
    setAttendanceSubmitEnable(false)
  }


  const handleAttendaceFormClose = () => {
    setAttendanceSubmitEnable(false)
  }


  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setDate(selectedDate);
  }

  const handleAdmisssionYearChange = (e) => {
    setSelectedYear(e.target.value)
    // console.log(selectedYear)
    // console.log(attendanceData.studentAdmissionyear)
  }

  const handleGroupSelect = (groupID) => {
    setStudentGroup(groupID)
    setGroupSelected(true)
  }
  const handleSectionSelect = (sectionID) => {
    setStudentSection(sectionID)
    setSectionSelected(true)
  }

  const handleAttendanceTypeSelect = (attendanceType) => {
    setAttendanceType(attendanceType)
    if (attendanceType === 'ByCourseID') {
      setStudentGroup('')
      setGroupSelected(true)
      setStudentSection('')
      setSectionSelected(true)
    }
    else if (attendanceType === 'ByGroupID') {
      setGroupSelected(true)

      // setAttendanceData(attendanceData.studentSection='')
      setStudentSection('')
      setSectionSelected(false)
    }
    else if (attendanceType === 'BySectionID') {
      // setAttendanceData(attendanceData.studentGroup='')
      setStudentGroup('')
      setGroupSelected(false)
      setSectionSelected(true)
    }
  }

  const handleShow = () => {
    setShow(!show)
    if(!show){
      setShowText('Hide')
    }else{
      setShowText('Show')
    }
  }

  return (
    <div className=" flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-500 ">
     

      <h1 className='text-3xl font-bold text-white'>Welcome To</h1>
      <h2 className="text-xl font-bold mb-6 text-white">Attendance Management Page</h2>
      {/* <ReactLoading type='spin' color='blue' /> */}
      <div className='flex fixed top-2/4'>
        {
          isLoading && <ReactLoading type='spin' color='blue' />
        }
      </div>

      <div className='m-4 flex'>
        <h1 className='text-white'>Total Present : {attendanceCount}</h1>
        <button
          className='mx-4 bg-blue-400 rounded-md px-3 p-1'
          onClick={handleShow}
        >{showText}</button>
      </div>

      <div>
        {show && <TotalPresent presentData={currentTimeSlotPresentStudents} />}
      </div>

      <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
        {/* <label className="block text-white text-sm font-semibold  mb-1">Select Degree</label> */}

        {/* <div className="flex items-center">
          <input
            type="radio"
            id="btech"
            value="B.Tech"
            checked={query.degree === "B.Tech"}
            onChange={handleQueryChange}
            name="degree"
            className="mr-2"
          />
          <label htmlFor="btech" className='text-white'>B.Tech</label>

          <input
            type="radio"
            id="mtech"
            value="M.Tech"
            checked={query.degree === "M.Tech"}
            onChange={handleQueryChange}
            name="degree"
            className="ml-4 mr-2"
          />
          <label htmlFor="mtech" className='text-white'>M.Tech</label>

          
        </div> */}
      </div>



      <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
        <label className="block text-sm font-semibold text-white mb-1">Select Admission Year</label>
        <select
          onChange={handleAdmisssionYearChange}
          value={selectedYear}
          name='year'
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value={2012}>Select Year</option>
          {renderYearOptions()}
        </select>

      </div>

      {/* <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
        <label className="block text-sm font-semibold mb-1 text-white">Select Semester</label>

        <div className="flex items-center">
          <input
            type="radio"
            id="even"
            value="even"
            checked={query.semesterType === "even"}
            onChange={handleQueryChange}
            name="semesterType"
            className="mr-2"
          />
          <label htmlFor="even" className='text-white'>Even Semesters</label>

          <input
            type="radio"
            id="odd"
            value="odd"
            checked={query.semesterType === "odd"}
            onChange={handleQueryChange}
            name="semesterType"
            className="ml-4 mr-2"
          />
          <label htmlFor="odd" className='text-white'>Odd Semesters</label>
        </div>

        {query.semesterType && (
          <div className="flex items-center mt-2">
            {Array.from({ length: 8 }, (_, index) => (
              <React.Fragment key={index}>
                {query.semesterType === "even" && (index + 1) % 2 === 0 && (
                  <React.Fragment>
                    {index > 0 && <span className="mx-2"></span>}
                    <input
                      type="radio"
                      id={`${index + 1}`}
                      value={index + 1}
                      checked={Number(query.semester) === (index + 1)}
                      onChange={handleQueryChange}
                      name="semester"
                      className="ml-2"
                    />
                    <label htmlFor={`${index + 1}`}>{` ${index + 1}`}</label>
                  </React.Fragment>
                )}

                {query.semesterType === "odd" && (index + 1) % 2 !== 0 && (
                  <React.Fragment>
                    {index > 0 && <span className="mx-2"></span>}
                    <input
                      type="radio"
                      id={`${index + 1}`}
                      value={index + 1}
                      checked={Number(query.semester) === (index + 1)}
                      onChange={handleQueryChange}
                      name="semester"
                      className="ml-2"
                    />
                    <label htmlFor={`${index + 1}`}>{`${index + 1}`}</label>
                  </React.Fragment>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div> */}



      <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
        {/* <label className="block text-sm font-semibold  mb-1 text-white">Select Department</label> */}

        {/* <div className="flex flex-wrap">
          <div className="flex items-center mb-2 mr-4">
            <input
              type="radio"
              id="cse"
              value="CSE"
              checked={query.department === "CSE"}
              onChange={handleQueryChange}
              name="department"
            />
            <label htmlFor="cse" className="ml-2 text-white">CSE</label>
          </div>

          <div className="flex items-center mb-2 mr-4">
            <input
              type="radio"
              id="ece"
              value="ECE"
              checked={query.department === "ECE"}
              onChange={handleQueryChange}
              name="department"
            />
            <label htmlFor="ece" className="ml-2 text-white">ECE</label>
          </div>

          <div className="flex items-center mb-2 mr-4">
            <input
              type="radio"
              id="hss"
              value="HSS"
              checked={query.department === "HSS"}
              onChange={handleQueryChange}
              name="department"
            />
            <label htmlFor="hss" className="ml-2 text-white">HSS</label>
          </div>

          <div className="flex items-center mb-2 mr-4">
            <input
              type="radio"
              id="mathsScience"
              value="MATHS&SCIENCE"
              checked={query.department === "MATHS&SCIENCE"}
              onChange={handleQueryChange}
              name="department"
            />
            <label htmlFor="mathsScience" className="ml-2 text-white">Maths & Science</label>
          </div>
        </div> */}
      </div>


      <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
        <label className="block text-sm mb-1 text-white">Select Course:</label>
        <select
          name="selectedCourseId"
          onChange={(e) => handleCourseSelect(e.target.value)}
          value={selectedCourseID}
          className="p-2 border block w-full"
        >
          <option value="">Select Course</option>
          {/* console.log("ty",typeof course) */}
          {courses?.map((course) => (
            <option key={course.id} value={course.courseID}>
              {course.courseName}{` ( ${course.courseID} )`}
            </option>
            
          ))}
        </select>
      </div>

      <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
        <label className="block text-sm mb-1 text-white">Mark attendance by:</label>

        <div className="flex flex-wrap">
          <div className="flex items-center mb-2 mr-4">
            <input
              type="radio"
              id="byCourseID"
              value="ByCourseID"
              checked={attendanceType === "ByCourseID"}
              onChange={() => handleAttendanceTypeSelect("ByCourseID")}
              name="selectedAttendanceType"
            />
            <label htmlFor="byCourseID" className="ml-2 text-white">By Course ID</label>
          </div>

          <div className="flex items-center mb-2 mr-4">
            <input
              type="radio"
              id="byGroupID"
              value="ByGroupID"
              checked={attendanceType === "ByGroupID"}
              onChange={() => handleAttendanceTypeSelect("ByGroupID")}
              name="selectedAttendanceType"
            />
            <label htmlFor="byGroupID" className="ml-2 text-white">By Group ID</label>
          </div>

          <div className="flex items-center mb-2 mr-4">
            <input
              type="radio"
              id="bySectionID"
              value="BySectionID"
              checked={attendanceType === "BySectionID"}
              onChange={() => handleAttendanceTypeSelect("BySectionID")}
              name="selectedAttendanceType"
            />
            <label htmlFor="bySectionID" className="ml-2 text-white">By Section ID</label>
          </div>
        </div>
      </div>

      <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
        <label className="block text-sm mb-1 text-white">Select Section:</label>
        <select
          name="selectedStudentSection"
          onChange={(e) => handleSectionSelect(e.target.value)}
          value={studentSection}
          disabled={groupSelected}
          className="p-2 border block w-full"
        >
          <option value="">Select Section</option>
          <option value="S11">Section S11</option>
          <option value="S12">Section S12</option>
          <option value="S13">Section S13</option>
          <option value="S21">Section S21</option>
          <option value="S22">Section S22</option>
          <option value="S23">Section S23</option>
          <option value="S31">Section S31</option>
          <option value="S32">Section S32</option>
          <option value="S33">Section S33</option>


        </select>
      </div>
      <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
        <label className="block text-sm mb-1 text-white">Select Group:</label>
        <select
          name="selectedStudentGroup"
          onChange={(e) => handleGroupSelect(e.target.value)}
          value={studentGroup}
          disabled={sectionSelected}
          className="p-2 border block w-full"
        >
          <option value="">Select Group</option>
          <option value="G11">Group G11</option>
          <option value="G12">Group G12</option>
          <option value="G13">Group G13</option>
          <option value="G14">Group G14</option>
          <option value="CS21">Group CS21</option>
          <option value="CS22">Group CS22</option>
          <option value="EC21">Group EC21</option>
          <option value="EC22">Group EC22</option>
          <option value="CS31">Group CS31</option>
          <option value="CS32">Group CS32</option>
          <option value="EC31">Group EC31</option>
          <option value="EC32">Group EC32</option>
        </select>
      </div>



      <div className="m-4 flex flex-col md:flex-row  lg:flex-row">
        {/* <label className=" mb-1 text-white">Select time</label> */}
        <select
          name="timer"
          onChange={(e) => handletimer(e.target.value)}
          value={timer}
          // disabled={sectionSelected}
          className="p-2 mb-2 rounded-md"
        >
          <option value="10">10 s</option>
          <option value="5"> 05 s</option>
          <option value="10">10 s</option>
          <option value="12">12 s</option>
          <option value="14">14 s</option>
          <option value="16">16 s</option>
          <option value="18">18 s</option>
          <option value="20">20 s</option>
          <option value="22">22 s</option>
          <option value="24">24 s</option>
          <option value="26">26 s</option>
          <option value="28">28 s</option>
          <option value="30">30 s</option>
        </select>

        <p className='m-1 text-white'>{Alert}</p>
        <button
          onClick={handleGenerateOtp}
          disabled={otpButtonEnable}
          className={`bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:border-blue-300 ${otpButtonEnable && 'opacity-50 cursor-not-allowed'}`}
        >
          Generate OTP
        </button>
        {OTP && (
          <div className="mt-2">
            <label className="block text-sm font-semibold text-white mb-1">Generated OTP</label>
            <input
              type="Number"
              value={OTP}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>
        )}
        <p className='text-white p-2'>Timer: {currentTimer} Seconds</p>
      </div>


      <div className="m-4">


        <button
          onClick={() => handleOptionSelect('takeAttendance')}
          disabled={AttendanceSubmitEnable}
          className={`bg-blue-500 text-white px-6 py-3 mb-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300  ${AttendanceSubmitEnable && 'opacity-50 cursor-not-allowed'}`}
        >
          Take Attendance
        </button>
      </div>



      {AttendanceSubmitEnable &&
        <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">Faculty Email:</label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="facultyEmail"
            value={facultyEmail}
            disabled={true}
          // onChange={0}
          />
        </div>
      }


      {AttendanceSubmitEnable &&
        <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
          <label className=" text-gray-700 text-sm font-bold mb-2">Date:</label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            // type="Date(dd-mm-yyyy)"
            disabled={true}
            name="Date"
            value={currentDate}
            onChange={handleDateChange}
          />
        </div>
      }

      {
        AttendanceSubmitEnable &&
        <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
          <label className=" text-gray-700 text-sm font-bold mb-2">Time Slot:</label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="timeSlot"
            value={timeSlot}
            disabled={true}
          />
        </div>
      }
      <div className='grid grid-cols-2'>
        {AttendanceSubmitEnable &&
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleAttendaceForm}
          >
            Submit
          </button>}
        {AttendanceSubmitEnable &&
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline "
            type="submit"
            onClick={handleAttendaceFormClose}
          >
            Close
          </button>}
      </div>
    </div>
    // <div></div>
  );
};

export default MarkStudentsAttendance;
