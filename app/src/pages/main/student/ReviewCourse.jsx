import React, { useState, useEffect } from 'react';
import { fetchDataFromCourse } from '../faculty/SearchFromCourse';

const ReviewCourses = (props) => {
  const [semesterType, setSemesterType] = useState('odd');
  const [courses, setCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [email, setEmail] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState();// contains id,name and sem
  const [studentAdmissionYear, setStudentAdmissionYear] = useState();
  const [attendanceData, setAttendanceData] = useState([])
  const [studentSection, setStudentSection] = useState();
  const [studentGroup, setStudentGroup] = useState();
  const [studentDegree,setStudentDegree]=useState();
  const [Alert, setAlert] = useState();

  useEffect(() => {
    setEmail(props.studentData.studentEmail)
  }, [props.studentData.studentEmail])

  const BASEURL = process.env.REACT_APP_BASEURL


  const oddSemesters = [1, 3, 5, 7];
  const evenSemesters = [2, 4, 6, 8];



  useEffect(() => {
    const url = `${BASEURL}/student/searchCourses?studentEmail=${email}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCourses((prevData) => [...prevData, ...data]);
        // console.log(data);
      })


      .catch((error) => {
        console.error('Error fetching or processing courses:', error);
        // Handle error state or display an error message to the user
      });
  }, [BASEURL, email, selectedSemester]);

  useEffect(() => {

    if (!props.studentData.studentEmail) {
      return;
    }

    let url = `${BASEURL}/student/find`
    let data = {
      studentEmail: props.studentData.studentEmail,
      // 'studentCourse.semester': selectedSemester
    }
    fetchDataFromCourse(url, data)

      .then((res) => {
        // console.log('r', res)
        if (res) {
          setStudentAdmissionYear(res[0].studentAdmissionYear)

        }

      })
      .catch((err) => {
        console.log(err)
      })


    //  console.log('a',attendance)

  }, [BASEURL, props.studentData.studentEmail, selectedSemester])

  useEffect(() => {
    
    const url = `${BASEURL}/attendance/attendanceTotalData`
    const attendance = selectedCourse?.map((course) => {
      let data1;
      if (studentDegree === 'M.Tech') {
        data1 = {
          studentEmail: email,
          studentAdmissionYear: studentAdmissionYear,
          courseID: course.courseID,
          // penalty: course.penalty
        };
      } else if (selectedSemester === 1 || selectedSemester=== 2) {
        if (course.courseName?.toLowerCase().includes('lab')) {
          data1 = {
            'studentAttendances.studentEmail': email,
            studentAdmissionYear: studentAdmissionYear,
            courseID: course.courseID,
            studentGroup: studentGroup
          }
        } else if (course.courseID?.toLowerCase().includes('hs')) {
          data1 = {
            'studentAttendances.studentEmail': email,
            studentAdmissionYear: studentAdmissionYear,
            courseID: course.courseID,
            // studentGroup: studentGroup
          }
        } else {
          data1 = {
            'studentAttendances.studentEmail': email,
            studentAdmissionYear: studentAdmissionYear,
            courseID: course.courseID,
            studentSection: studentSection
          }
        }
      } else {
        if(course.courseID?.toLowerCase().includes("hs")){
          data1 = {
            'studentAttendances.studentEmail': email,
            studentAdmissionYear: studentAdmissionYear,
            courseID: course.courseID
          }
        }else{
          if(course?.courseID.toLowerCase().includes('sc')){
            data1 = {
              'studentAttendances.studentEmail': email,
              studentAdmissionYear: studentAdmissionYear,
              courseID: course.courseID,
              studentSection: studentSection
    
            }
          }else{
            data1 = {
              'studentAttendances.studentEmail': email,
              studentAdmissionYear: studentAdmissionYear,
              courseID: course.courseID,
              studentGroup: studentGroup
            }
          }
        }
      }
      // console.log('d', course.courseID)
      fetchDataFromCourse(url, data1)
        .then((res) => {
          // console.log('dt', course.courseID)
          attendanceData.push({
            courseID: course.courseID,
            courseName: course.courseName,
            present: res.length,
            total: 0
          })

          // console.log('r', course.courseID, attendanceData)
        })
      return 0
    })
  }, [BASEURL, attendanceData, email, selectedCourse, selectedSemester, studentAdmissionYear, studentDegree, studentGroup, studentSection])


  useEffect(() => {
    const url = `${BASEURL}/attendance/attendanceTotalData`
    const attendance = selectedCourse?.map((course) => {

      

      //fetching total attendances
      let data2;
      if (studentDegree === 'M.Tech') {
        data2 = {
          // studentEmail: email,
          studentAdmissionYear: studentAdmissionYear,
          courseID: course.courseID,
          // penalty: course.penalty
        };
      } else if (selectedSemester === 1 || selectedSemester === 2) {
        if (course.courseName?.toLowerCase().includes('lab')) {
          data2 = {
            // 'studentAttendances.studentEmail': email,
            studentAdmissionYear: studentAdmissionYear,
            courseID: course.courseID,
            studentGroup: studentGroup
          }
        } else if (course.courseID?.toLowerCase().includes('hs')) {
          data2 = {
            // 'studentAttendances.studentEmail': email,
            studentAdmissionYear: studentAdmissionYear,
            courseID: course.courseID,
            // studentGroup: studentGroup
          }
        } else {
          data2 = {
            // 'studentAttendances.studentEmail': email,
            studentAdmissionYear: studentAdmissionYear,
            courseID: course.courseID,
            studentSection: studentSection
          }
        }
      } else {
        if(course.courseID?.toLowerCase().includes("hs")){
          data2 = {
            // 'studentAttendances.studentEmail': email,
            studentAdmissionYear: studentAdmissionYear,
            courseID: course.courseID
          }
        }else{
          if(course?.courseID.toLowerCase().includes('sc')){
            data2 = {
              // 'studentAttendances.studentEmail': email,
              studentAdmissionYear: studentAdmissionYear,
              courseID: course.courseID,
              studentSection: studentSection
    
            }
          }else{
            data2 = {
              // 'studentAttendances.studentEmail': email,
              studentAdmissionYear: studentAdmissionYear,
              courseID: course.courseID,
              studentGroup: studentGroup
            }
          }
        }
      }




      // console.log('d', course.courseID)
      fetchDataFromCourse(url, data2)
        .then((res) => {
          // console.log('dtx', res)
          setAttendanceData((prevData) => {
            const updatedData = prevData.map((courseData) => {
              if (courseData.courseID === course.courseID) {
                // console.log('dtxy', course.courseID)
                return {
                  ...courseData,
                  total: res.length, // Update the total based on your logic
                };
              }
              return courseData;
            });

            return updatedData;
          });


          // console.log('r',attendanceData)
        })
      return 0
      // }
    })

  }, [BASEURL, selectedCourse, selectedSemester, studentAdmissionYear, studentDegree, studentGroup, studentSection])

  

  const handleSemesterChange = (semester) => {
    // You can perform any action when a semester is selected
    setSelectedSemester(semester)
    setAttendanceData([])
    const cour = courses.find((course) => course.semester === `${semester}`)
    // courses.find
    // console.log('c', courses)
    if (cour) {
      setAlert();
      setSelectedCourse((cour.courses))
      setStudentGroup(cour.studentGroup)
      setStudentSection(cour.studentSection);
      // console.log((selectedCourse))
    } else {
      setSelectedCourse([])
      setAlert("Course not found !")
    }
    // console.log(semester)
  };

  const handleCourseClick = (courseId) => {
    // Handle the click event for a specific course
    // setSelectedCourseID(courseId)
    // console.log(`Course clicked with ID: ${courseId}`);
    // Add your navigation logic or any other action here
  };

  return (
    <div className="m-1 flex items-center flex-col justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        {/* <h1 className="text-2xl font-bold mb-4">Semester Selection</h1> */}
        <div className="flex items-center m-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="odd"
              checked={semesterType === 'odd'}
              onChange={() => setSemesterType('odd')}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <span className="ml-2">Odd Semester</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="radio"
              value="even"
              checked={semesterType === 'even'}
              onChange={() => setSemesterType('even')}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <span className="ml-2">Even Semester</span>
          </label>
        </div>
        <div className={`grid ${semesterType === 'odd' ? 'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2' : 'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2'} gap-2`}>
          {(semesterType === 'odd' ? oddSemesters : evenSemesters).map((semester) => (
            <div key={semester} className="bg-gray-100 p-2 rounded-md">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="semester"
                  value={semester}
                  onChange={() => handleSemesterChange(semester)}
                  className="form-radio h-5 w-5 text-blue-500"
                />
                <span className="ml-2">{`Semester ${semester}`}</span>
              </label>
            </div>
          ))}
        </div>

      </div>
      <div className="container  mx-auto w-full">
        <h1 className="text-3xl mx-auto font-bold mb-4">Course List ( {attendanceData.length} )</h1>
        <p className='mt-2 mb-2 text-white'>{Alert}</p>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {attendanceData?.map(course => (
            <div
              key={course.courseID}
              className={`p-4 rounded-md shadow-md cursor-pointer  ${(course.total === 0 ? 0 : course.present * 100 / course.total) >= 75 ? ('bg-green-600 text-white') : ('bg-red-600 text-white')} `}
              onClick={() => handleCourseClick(course.courseID)}
            >
              <h2>{course.courseName}( {course.courseID} )</h2>
              <h3>Attendance : </h3>
              <h4>Present : {course.present} </h4>
              <h4>Total : {course.total}</h4>
              <h4>Present % :  {course.total === 0 ? 0 : Math.round((course.present * 100) / course.total)}% </h4>
              {/* <h2 className="text-lg font-semibold mb-2">{course.courseName} <h1 className={`text-lg font-semibold mb-2 ${(course.total===0?0:course.present*100/course.total)>=75?('text-green-600'):('text-red-600')} `}>Attendance : {course.present}/{course.total} = {course.total===0?0:Math.round((course.present*100)/course.total)}%</h1></h2> */}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCourses;
