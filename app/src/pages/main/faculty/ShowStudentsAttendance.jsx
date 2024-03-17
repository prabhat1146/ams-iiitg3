import React, { useState, useEffect, useRef } from 'react';
import { fetchDataFromCourse } from './SearchFromCourse';



const ShowStudentAttendance = ({ isOpen, onClose, email, semester }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentAdmissionYear, setStudentAdmissionYear] = useState();
  const [name, setName] = useState();
  const [Email, setEmail] = useState();
  const [studentSection, setStudentSection] = useState();
  const [studentGroup, setStudentGroup] = useState();
  const [studentDegree,setStudentDegree]=useState();

  const contentRef = useRef(null);

  const BASEURL = process.env.REACT_APP_BASEURL;
  //find all course of a student using email id
  useEffect(() => {
    const url = `${BASEURL}/student/searchCourses?studentEmail=${email}`;
    setEmail(email);

    fetch(url)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setCourses(data);
        // console.log("d", data)
      })
      .catch((error) => {
        console.error('Error fetching or processing courses:', error);
      });
  }, [email, BASEURL]);

  // select all courses for a particular semester
  useEffect(() => {
    const cour = courses.find((course) => {
      if (course.semester === `${semester}`) {
        setStudentSection(course.studentSection);
        setStudentGroup(course.studentGroup);
        return true;
      } else {
        return false;
      }
    });
    setSelectedCourse(cour ? cour.courses : []);
  }, [courses, semester]);

  useEffect(() => {
    const url = `${BASEURL}/student/find`;

    fetchDataFromCourse(url, { studentEmail: email })
      .then((res) => {
        setStudentAdmissionYear(res[0].studentAdmissionYear);
        setName(res[0].studentName);
        setStudentDegree(res[0].studentDegree);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, BASEURL]);

  useEffect(() => {
    if (selectedCourse.length === 0) return;

    const fetchDataForCourse = async (course) => {
      let data1;
      if (studentDegree === 'M.Tech') {
        data1 = {
          studentEmail: email,
          studentAdmissionYear: studentAdmissionYear,
          courseID: course.courseID,
          // penalty: course.penalty
        };
      } else if (semester === 1 || semester === 2) {
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
        if (course.courseID?.toLowerCase().includes("hs")) {
          data1 = {
            'studentAttendances.studentEmail': email,
            studentAdmissionYear: studentAdmissionYear,
            courseID: course.courseID
          }
        } else {
          if (course?.courseID.toLowerCase().includes('sc')) {
            data1 = {
              'studentAttendances.studentEmail': email,
              studentAdmissionYear: studentAdmissionYear,
              courseID: course.courseID,
              studentSection: studentSection

            }
          } else {
            data1 = {
              'studentAttendances.studentEmail': email,
              studentAdmissionYear: studentAdmissionYear,
              courseID: course.courseID,
              studentGroup: studentGroup
            }
          }
        }
      }

      //fetching total attendances
      let data2;
      if (studentDegree === 'M.Tech') {
        data2 = {
          // studentEmail: email,
          studentAdmissionYear: studentAdmissionYear,
          courseID: course.courseID,
          // penalty: course.penalty
        };
      } else if (semester === 1 || semester === 2) {
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
        if (course.courseID?.toLowerCase().includes("hs")) {
          data2 = {
            // 'studentAttendances.studentEmail': email,
            studentAdmissionYear: studentAdmissionYear,
            courseID: course.courseID
          }
        } else {
          if (course?.courseID.toLowerCase().includes('sc')) {
            data2 = {
              // 'studentAttendances.studentEmail': email,
              studentAdmissionYear: studentAdmissionYear,
              courseID: course.courseID,
              studentSection: studentSection

            }
          } else {
            data2 = {
              // 'studentAttendances.studentEmail': email,
              studentAdmissionYear: studentAdmissionYear,
              courseID: course.courseID,
              studentGroup: studentGroup
            }
          }
        }
      }


      return Promise.all([
        fetchDataFromCourse(`${BASEURL}/attendance/attendanceTotalData`, data1),
        fetchDataFromCourse(`${BASEURL}/attendance/attendanceTotalData`, data2),
      ]).then(([attendanceDataRes, totalDataRes]) => {
        return {
          courseID: course.courseID,
          penalty: course.penalty,
          courseName: course.courseName,
          present: attendanceDataRes.length,
          total: totalDataRes.length,
        };
      });
    };

    Promise.all(selectedCourse.map(fetchDataForCourse))
      .then((attendanceData) => {
        setAttendanceData(attendanceData);
      })
      .catch((error) => {
        console.error('Error fetching or processing attendance data:', error);
      });
  }, [BASEURL, email, selectedCourse, studentAdmissionYear, studentGroup, studentSection]);

  if (!isOpen) {
    return null;
  }

  const handlePrint = () => {

    const content = contentRef.current;

    window.print()

  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="absolute opacity-100 flex items-left ml-20 justify-center flex-col bg-white p-4 z-10 rounded-xl " ref={contentRef}>
        <div className='flex justify-between px-4'>
          <div>
            <h2>Name: {name}</h2>
            <h2>Email: {Email}</h2>
            <h2>Admission-Year: {studentAdmissionYear}</h2>
            <h2>Semester: {semester}</h2>
          </div>
          <div>
            <button
              className='bg-blue-600 text-white p-2 px-6 rounded-md'
              onClick={handlePrint}
            >Print</button>
          </div>
        </div>
        <div>
          <table className='table-fixed border border-collapse border-gray-300'>
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Courses</th>
                <th colSpan="3" className="border px-4 py-2">Attendance</th>
              </tr>
              <tr>
                <th className="border px-4 py-2"></th> {/* Empty header for "Courses" column */}
                <th className="border px-4 py-2">Penalty</th>
                <th className="border px-4 py-2">Present</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">%</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((course) => (
                <tr key={course.courseID}
                  className={`${(course.total === 0 ? 0 : Math.round((course.present * 100) / course.total)) >= 75 ? ('text-green-600') : ('text-red-600')}`}
                >

                  <td className="border px-4 py-2">{course.courseName} ({course.courseID} )</td>
                  <td className="border px-4 py-2">{course.penalty}</td>
                  <td className="border px-4 py-2">{course.present}</td>
                  <td className="border px-4 py-2">{course.total}</td>
                  <td className="border px-4 py-2">{course.total === 0 ? 0 : Math.round((course.present * 100) / course.total)}%</td>
                </tr>
              ))}
            </tbody>
          </table>


        </div>
        {/* {attendanceData.map((course) => (
          <div key={course.courseID}>
            
             <h2 className="text-md font-semibold mb-2">{course.courseName} <h1 className={`text-lg font-semibold mb-2 ${(course.total===0?0:Math.round((course.present*100)/course.total))>=75?('text-green-600'):('text-red-600')} `}>Attendance : {course.present}/{course.total} = {course.total===0?0:Math.round((course.present*100)/course.total)}%</h1></h2>
          </div>
        ))} */}
      </div>
      <button className="absolute text-white p-2 rounded-md top-0 right-0 m-4 bg-red-600" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ShowStudentAttendance;
