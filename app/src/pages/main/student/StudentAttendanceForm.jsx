import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchDataFromCourse } from '../faculty/SearchFromCourse';
import { fetchData } from '../admin/SetFormData';
import FullscreenButton from './FullScreen';

const StudentAttendanceForm = (props) => {



const [isFullscreen,setIsFullScreen]=useState(false);
  const [selectedCourseID, setSelectedCourseID] = useState('');
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [studentGroup, setStudentGroup] = useState('');
  const [studentSection, setStudentSection] = useState('');
  const [sectionSelected, setSectionSelected] = useState();
  const [groupSelected, setGroupSelected] = useState();
  const [attendanceType, setAttendanceType] = useState()
  const [studentRollNo, setStudentRollNo] = useState(null);
  const [studentEmail, setStudentEmail] = useState(null);
  const [otp, setOtp] = useState();
  const [studentReadyForAttendance, setStudentReadyForAttendance] = useState();
  const [courses, setCourses] = useState([]);
  const [alert, setAlert] = useState()
  const [date, setDate] = useState(new Date())
  const [currentDate, setCurrentDate] = useState(date.toLocaleDateString());
  const [timeSlot, setTimeSlots] = useState(
    `${String(date.getHours()).padStart(2, '0')}-${String(date.getHours() + 1).padStart(2, '0')}`
  );

  const BASEURL = process.env.REACT_APP_BASEURL
  const [query, setQuery] = useState({
    degree: props.studentData.studentDegree,
    semester: 6,
    // department: props.studentData.studentDepartment
  });

  useEffect(() => {
    setStudentRollNo(props.studentData.studentRollNumber)
    setStudentEmail(props.studentData.studentEmail)
  }, [props.studentData.studentEmail, props.studentData.studentRollNumber])

  // console.log(query)

  useEffect(() => {
    setQuery((prevdata) => ({
      ...prevdata,
      degree: props.studentData.studentDegree,
      department: props.studentData.studentDepartment
    }))
  }, [props.studentData.studentDegree, props.studentData.studentDepartment])

  useEffect(() => {
    // const sem=`semester=${query.semester}`
    var url = `${BASEURL}/course/search`;
    const courseData = fetchDataFromCourse(url, query)
    courseData.then((res) => {
      // setCourses(res)

    })
  }, [BASEURL, query])


  useEffect(() => {
    if(!props.studentData.studentEmail){
      return ;
    }
    const url = `${BASEURL}/student/searchCourses?studentEmail=${props.studentData.studentEmail}`
    fetch(url)
      .then((res) => {
        if (res.ok) {
          if (res) {
            return res.json()
          } else {
            return []
          }
        }
      })
      .then((res) => {
        console.log(res)
        if (res?.length > 0) {
          setCourses(res[res.length-1].courses)
        }
      })
      .catch((error)=>{
        console.log(error)
      })
  }, [BASEURL, props.studentData.studentEmail])

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


  const handleCourseSelect = async (courseID) => {
    try {
      // Assuming courses is an array of objects with 'id' and 'name' properties
      const selectedCourse = courses.find(course => course.courseID === courseID);

      if (selectedCourse) {
        setSelectedCourseID(selectedCourse.courseID);
        setSelectedCourseName(selectedCourse.courseName);
        // Additional logic or validation if needed
      } else {
        console.error("Selected course not found");
      }
    } catch (error) {
      console.error("Error handling course selection:", error);
    }

  };

  const handleAttendaceForm = () => {
    if(!isFullscreen){
      setAlert("Full-screen is not enable")
      return
    }
    if (attendanceType === 'ByCourseID') {
      if (!selectedCourseID) {
        setAlert('Course is not selected !')
        return
      }
    }
    else if (attendanceType === 'ByGroupID') {
      if (!studentGroup) {
        console.log(attendanceType)
        setAlert('Group is not selected !')
        return
      }

    } else if (attendanceType === 'BySectionID') {
      if (!studentSection) {
        setAlert('Section is not selected !')
        return
      }
    }else{
      setAlert('Please select mendatory fields')
      return
    }

    setAlert('')
    // console.log('hi')



    let url = `${BASEURL}/student/find?studentEmail=${studentEmail}`
    fetch(url)
      .then((res) => {
        // console.log('d', res)
        if (res.ok) {
          return res.json()
        }
      })
      .then((res) => {
        // console.log('ss', res)
        if (res.length > 0) {
          // console.log('s', res)
          if (res[0].studentReadyForAttendance) {
            // console.log(res[0].studentReadyForAttendance)
            setStudentReadyForAttendance(true)
            setAlert('')
            if (attendanceType === 'ByCourseID') {
              let url = `${BASEURL}/attendance/makeAttendanceBycourseID`
              let data = {
                courseID: selectedCourseID,
                otp: otp,
                timeSlot: timeSlot,
                date: currentDate,
                // department: query.department,
                degree: query.degree,
                studentEmail: studentEmail,
                studentRollNo: studentRollNo
              }
              // console.log(data)
              fetchData(url, data, "", true)
            } else if (attendanceType === 'ByGroupID') {
              let url = `${BASEURL}/attendance/makeAttendanceByGroupID`
              let data = {
                // courseID: selectedCourseID,
                // otp: otp,
                // timeSlot: timeSlot,
                // date: date.toISOString().split('T')[0],
                courseID: selectedCourseID,
                otp: otp,
                timeSlot: timeSlot,
                date: currentDate,
                // department: query.department,
                degree: query.degree,
                studentEmail: studentEmail,
                studentRollNo: studentRollNo,
                studentGroup: studentGroup

              }

              fetchData(url, data, "", true)

            } else if (attendanceType === 'BySectionID') {
              let url = `${BASEURL}/attendance/makeAttendanceBySectionID`
              let data = {
                // courseID: selectedCourseID,
                // otp: otp,
                // timeSlot: timeSlot,
                // date: date.toISOString().split('T')[0],
                courseID: selectedCourseID,
                otp: otp,
                timeSlot: timeSlot,
                date: currentDate,
                // department: query.department,
                degree: query.degree,
                studentEmail: studentEmail,
                studentRollNo: studentRollNo,
                studentSection: studentSection

              }

              fetchData(url, data, "", true)

            }
          } else {
            setAlert("permission denied!")
            return
          }
        } else {
          // console.log('Not found')
          return
        }
      })
      .catch((error) => {
        console.log(error)
      })

    // console.log('atype')

  }

  const handleOtp = (e) => {
    setOtp(e.target.value)
  }

  return (
    <div className=' flex flex-col items-center m-4 '>
      <FullscreenButton fullScreen={setIsFullScreen}/>
      <h1 className='text-white'>{isFullscreen ? '':'Full screen is not enable'}</h1>
      {isFullscreen && <>
      <div className="mb-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        <h2 className='text-white '>Please record your attendance for today's class</h2>

        <div className="flex flex-wrap mt-4">
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
      <div className="mb-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        <label className="block text-sm mb-1 text-white">Select Section *</label>
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
      <div className="mb-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        <label className="block text-sm mb-1 text-white">Select Group *</label>
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
      <div className="mb-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        <label className="block text-sm mb-1 text-white">Select Course *</label>
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

      <div className="mt-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        <label className="block text-sm font-semibold text-white mb-1">Generated OTP *</label>
        <input
          type="Number"
          value={otp}
          onChange={handleOtp}
          className="w-full px-3 py-2 border rounded-md bg-gray-100"
        />
      </div>
      <h2 className='text-white mt-2'>{alert}</h2>
      <button
        className="bg-blue-500 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={handleAttendaceForm}
      >
        Submit
      </button>
      </>
}

    </div>
  );
};

export default StudentAttendanceForm;