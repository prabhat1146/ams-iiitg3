import React, { useState, useEffect, useRef } from 'react';
import { fetchDataFromCourse } from '../faculty/SearchFromCourse';



const ShowStudentAttendance = ({ email, semester }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentAdmissionYear, setStudentAdmissionYear] = useState();
  const [name, setName] = useState();
  const [Email, setEmail] = useState();
  const [studentSection, setStudentSection] = useState();
  const [studentGroup, setStudentGroup] = useState();
  const [studentDegree, setStudentDegree] = useState();


  const BASEURL = process.env.REACT_APP_BASEURL;
  //find all course of a student using email id
  useEffect(() => {
    const url = `${BASEURL}/student/searchCourses?studentEmail=${email}`;
    setEmail(email);

    fetch(url)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setCourses(data);
        console.log("d", data)
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
        setStudentDegree(res[0].studentDegree)
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





  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      {attendanceData.map((course) => (

        <div className={`p-2 rounded-md m-1 ${(course.total === 0 ? 0 : Math.round((course.present * 100) / course.total)) >= 75 ? ('bg-green-600') : ('bg-red-600 text-white')}`}>

          <p className='text-white text-sm'>{course.courseName} </p>
          <p className='text-white text-sm'>({course.courseID} ) Attendance : {course.total === 0 ? 0 : Math.round((course.present * 100) / course.total)} % </p>
        </div>

      ))}
    </div>
  );
};

export default ShowStudentAttendance;
