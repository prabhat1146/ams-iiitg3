// src/components/EditOptions.jsx
import React, { useState } from 'react';
import { fetchData } from './SetFormData';
import CourseList from './CourseList';
import FacultyList from './FacultyList';
import { useEffect, useCallback } from 'react';
// import StudentDashboard from '../student/StudentDashBoard';
import StudentList from './StudentList';
import UploadCourses from './UploadCourses'
import UploadAllFaculty from './UploadAllFaculty';
import ReviewAttendance from '../faculty/ReviewAttendance';
import ViewStudentsAttendance from './ViewStudentsAttendance'


const EditOptions = ({ section }) => {
  const [removeCourseID, setRemoveCourseID] = useState();
  const [viewButtonText, setViewButtonText] = useState('Show');
  const [facultyData, setFacultyData] = useState({});
  const [addCousreFlag, setAddCourseFlag] = useState(false);
  const [removeCourseFlag, setRemoveCourseFlag] = useState(false);
  const [addFacultyFlag, setAddFacultyFlag] = useState(false);
  const [removeFacultyFlag, setRemoveFacultyFlag] = useState(false);
  const [gender, setGender] = useState('');
  const [viewAllFaculty, setViewAllFaculty] = useState(false);
  const [allFaculty, setFaculty] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [courses, setCourses] = useState([]);
  const [viewAllcourses, setViewAllCourses] = useState(false);
  // const [sectionSelected, setSectionSelected] = useState();
  // const [groupSelected, setGroupSelected] = useState();
  const [semesterValue, setSemesterValue] = useState(1);
  const [viewAllStudents, setViewAllStudents] = useState(false);
  const [allStudents, setAllStudents] = useState(false);
  // const [selectedCourses, setSelectedCourses] = useState([]);
  // const [allCourses, setAllCourses] = useState(
  //   [
  //     {
  //       courseID: '',
  //       courseName: ''
  //     }
  //   ]
  // );


  // const [studentData, setStudentData] = useState({
  //   studentName: '',
  //   studentRoll: '',
  //   studentEmail: '',
  //   studentDepartment: '',
  //   studentDegree: '',
  //   studentAdmisionYear: '',
  //   studentPhone: '',
  //   studentPassword: '',

  //   studentCourse: [
  //     {
  //       semester: 0,
  //       courses: [
  //         {
  //           courseID: '',
  //           courseName: '',
  //           penalty: 0,
  //         },
  //       ],
  //       studentGroup: '',
  //       studentSection: '',
  //     },
  //   ],

  // });


  const BASEURL = process.env.REACT_APP_BASEURL
  // console.log(BASEURL)

  // useEffect(() => {
  //   setStudentData((prevStudentData) => ({
  //     ...prevStudentData,
  //     studentCourse: [
  //       {
  //         semester: semesterValue,
  //         courses: selectedCourses,
  //         studentGroup: groupSelected,
  //         studentSection: sectionSelected
  //       },
  //     ],
  //   }));
  //   // console.log(studentData)
  // }, [groupSelected, sectionSelected, selectedCourses, semesterValue]);


  // useEffect(() => {
  //   const url = `${BASEURL}/course/find`;
  //   // console.log(BASEURL, url)
  //   try {
  //     fetch(url)
  //       .then((res) => {
  //         // Check if the response is successful
  //         if (!res.ok) {
  //           throw new Error(`HTTP error! Status: ${res.status}`);
  //         }
  //         // Parse the JSON response
  //         return res.json();
  //       })
  //       .then((data) => {

  //         const uniqueCourses = data.map((item) => ({
  //           courseName: item.courseName + " ( " + item.courseID + " )",
  //           courseID: item.courseID,
  //         }));

  //         setAllCourses([...new Set(uniqueCourses)]);


  //       })
  //       .catch((error) => {
  //         // Handle fetch or parsing errors
  //         console.error('Error while fetching courses:', error);
  //       });
  //   } catch (error) {

  //   }
  // }, [BASEURL])





  const handleFacultyChange = (e) => {
    const { name, value } = e.target;
    setFacultyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleAddFaculty = (e) => {
    e.preventDefault();
    const url = `${BASEURL}/faculty/add`;
    try {
      fetchData(url, facultyData, "Faculty Added success !", true);

    } catch (error) {

    }
  };

  // const handleUpdateFaculty = (e) => {
  //   e.preventDefault();
  //   const url = `${BASEURL}/faculty/update`;
  //   try {
  //     fetchData(url, facultyData, "updated", true);

  //   } catch (error) {

  //   }
  // };

  const handleRemoveFaculty = (e) => {
    e.preventDefault();
    const url = `${BASEURL}/faculty/remove`;
    try {
      fetchData(url, facultyData, "Removed", true);

    } catch (error) {

    }
  };

  const handleViewAllFaculty = (e) => {
    setViewAllFaculty(!viewAllFaculty)
    setAddFacultyFlag(false)
    setRemoveFacultyFlag(false)
  }


  //student

  // const handleStudent = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "semester") {

  //     if (value < 1) {
  //       setSemesterValue(1)
  //     } else if (value > 8) {
  //       setSemesterValue(8)
  //     } else {
  //       setSemesterValue(value)
  //     }

  //   }
  //   setStudentData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };


  // const handleAddStudent = (e) => {
  //   e.preventDefault();
  //   const url = `${BASEURL}/student/add`;
  //   try {
  //     fetchData(url, studentData, "Added", true);

  //   } catch (error) {

  //   }
  // }
  // const handleRemoveStudent = (e) => {
  //   e.preventDefault();
  //   const url = `${BASEURL}/student/remove`;
  //   try {
  //     fetchData(url, studentData, "Removed", true);

  //   } catch (error) {

  //   }
  // }
  // const handleUpdateStudent = (e) => {
  //   e.preventDefault();
  //   const url = `${BASEURL}/student/update`;
  //   try {
  //     fetchData(url, studentData, "updated", true);

  //   } catch (error) {

  //   }
  // }

  const handleViewAllStudents = () => {
    setViewAllStudents(!viewAllStudents)
    if (!viewAllStudents) {
      setViewButtonText('Hide')
    } else {
      setViewButtonText('Show')
    }
  };


  useEffect(() => {
    const url = `${BASEURL}/student/find?`


    try {
      fetch(url)
        .then((res) => {
          // Check if the response is successful
          if (!res.ok) {
            // throw new Error(`HTTP error! Status: ${res.status}`);
          }
          // Parse the JSON response
          return res.json();
        })
        .then((data) => {
          // Assuming the response is an array of courses
          // Update the state with the fetched courses
          if (data == null) {
            setAllStudents([])
            // console.log(data,'jii')
          }
          else {
            setAllStudents(data);
            // console.log(data,'hiii')
          }
          console.log(data)
        })
        .catch((error) => {
          // Handle fetch or parsing errors
          console.error('Error fetching courses:', error);
        });
    } catch (error) {

    }

  }, [BASEURL]);

  const handleCourseChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is "semester" and the value is a number
    if (name === "semester") {
      // Convert the value to a number and ensure it's within the range 1 to 8
      // alert(value)
      if (value < 1) {
        setSemesterValue(1)
      } else if (value > 8) {
        setSemesterValue(8)
      } else {
        setSemesterValue(value)
      }

      setCourseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      // For other fields or non-numeric values, set the value directly
      setCourseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };



  useEffect(() => {

    const url = `${BASEURL}/faculty/find`;
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
          setFaculty(data);
        })
        .catch((error) => {
          // Handle fetch or parsing errors
          console.error('Error fetching courses:', error);
        });
    } catch (error) {

    }

  }, [BASEURL, allFaculty]);




  const handleAddCourse = useCallback((e) => {
    e.preventDefault();
    const url = `${BASEURL}/course/add`;
    try {
      // console.log(courseData)
      fetchData(url, courseData, "Added", true);
    } catch (error) {

    }
  }, [BASEURL, courseData]);


  const handleUpdateCourse = useCallback((e) => {
    e.preventDefault();
    const url = `${BASEURL}/course/update`;
    try {
      // console.log(courseData)
      fetchData(url, courseData, "updated", true);
    } catch (error) {
      console.log(error)

    }
  }, [BASEURL, courseData]);

  const handleRemoveCourse = useCallback((e) => {
    e.preventDefault();
    if (!removeCourseID) {
      alert("Course-id is required !")
      return;
    }
    if (window.confirm("Are you confirm to remove ?")) {
      const url = `${BASEURL}/course/remove`;
      try {
        // console.log(courseData)
        fetchData(url, {courseID:removeCourseID}, "Removed", true);
      } catch (error) {
        console.log(error)
      }
    }

  }, [BASEURL, removeCourseID]);


  const handleAllCourse = (e) => {
    setViewAllCourses(!viewAllcourses)
    setAddCourseFlag(false);
    setRemoveCourseFlag(false);
  }
  // const renderAdmissionYearOptions = () => {
  //   const yearOptions = [];
  //   for (let year = 2013; year <= 2024; year++) {
  //     yearOptions.push(
  //       <option key={year} value={year}>
  //         {year}
  //       </option>
  //     );
  //   }
  //   return yearOptions;
  // };

  useEffect(() => {

    const url = `${BASEURL}/course/find`;
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
          setCourses(data);
        })
        .catch((error) => {
          // Handle fetch or parsing errors
          console.error('Error fetching courses:', error);
        });
    } catch (error) {
      console.log(error)
    }

  }, [BASEURL]);

  // const handleRemoveSelectedCourse = (index) => {
  //   // Create a new array without the course at the specified index
  //   const updatedCourses = [...selectedCourses.courseID.slice(0, index), ...selectedCourses.courseID.slice(index + 1)];
  //   setSelectedCourses({ ...selectedCourses, courseID: updatedCourses });
  // };



  // const handleRemoveSelectedCourse = (index) => {
  //   // Create a new array without the course at the specified index
  //   const updatedCourses = [...selectedCourses.slice(0, index), ...selectedCourses.slice(index + 1)];
  //   setSelectedCourses(updatedCourses);
  // };

  // const handleCourseSelection = (e, semesterIndex) => {
  //   const selectedOptions = Array.from(e.target.selectedOptions).map(option => JSON.parse(option.value));

  //   // Check if the selected options are not already in the selectedCourses array
  //   const newSelectedCourses = selectedOptions.filter(option =>
  //     !selectedCourses.some(course => course.courseID === option.courseID)
  //   );

  //   // Update selectedCourses with the new courses
  //   setSelectedCourses((prevSelectedCourses) => [
  //     ...prevSelectedCourses,
  //     ...newSelectedCourses
  //   ]);

  // };

  const handleAddCourseFlag = () => {
    setAddCourseFlag(true);
    setViewAllCourses(false);
    setRemoveCourseFlag(false);
  }




  const handleRemoveCourseFlag = () => {
    setAddCourseFlag(false);
    setViewAllCourses(false);
    setRemoveCourseFlag(true);
  }


  const handleRemoveFacultyFlag = () => {
    setAddFacultyFlag(false);
    setViewAllFaculty(false)
    setRemoveFacultyFlag(true);
  }
  const handleAddFacultyFlag = () => {
    setAddFacultyFlag(true);
    setViewAllFaculty(false)
    setRemoveFacultyFlag(false);
  }

  return (
    // <div className='w-11/12 flex flex-col items-center'>
    <div className="w-full">
      {section === 'faculty' && (

        <div className='flex flex-col items-center w-full '>

          <div className='grid grid-cols-3 '>
            <button
              className='bg-green-400 rounded-md p-2 mx-2 hover:bg-green-600'
              onClick={handleAddFacultyFlag}
            >
              Add Faculty
            </button>
            <button onClick={handleViewAllFaculty} className="bg-blue-500 rounded-md p-2 mx-2 hover:bg-blue-700">
              View Faculty
            </button>
            <button
              className='bg-red-400 rounded-md p-2 mx-2 hover:bg-red-600'
              onClick={handleRemoveFacultyFlag}
            >
              Remove Faculty
            </button>

          </div>

          {addFacultyFlag &&
            <div className='mt-8 w-full lg:w-1/2 md:3/4 flex flex-col justify-center items-center'>
              <div className="mb-2 w-11/12  flex flex-col ">
                <label className="block text-white text-sm mb-1 ">Name *</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleFacultyChange}
                  placeholder="Enter name"
                  className="p-2 border block w-full"
                />
              </div>
              <div className="mb-2 w-11/12  flex flex-col">
                <label className="block text-white text-sm mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleFacultyChange}
                  placeholder="Enter email"
                  className="p-2 border block w-full"
                />
              </div>
              <div className="mb-4 w-11/12  flex flex-col">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="gender">
                  Gender *
                </label>
                <div className="flex space-x-4 ">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      id="male"
                      value="Male"
                      checked={gender === 'Male'}
                      onChange={() => setGender('Male')}
                      className="form-radio h-5 w-5 text-blue-500"
                    />
                    <span className="ml-2 text-white">Male</span>
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
                    <span className="ml-2 text-white">Female</span>
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
                    <span className="ml-2 text-white">Third Gender</span>
                  </label>
                </div>
              </div>
              <div className="mb-2 w-11/12  flex flex-col">
                <label className="block text-sm mb-1 text-white">Phone </label>
                <input
                  type="Number"
                  name="phone"
                  onChange={handleFacultyChange}
                  placeholder="Enter phone"
                  className="p-2 border block w-full"
                />
              </div>
              <div className="mb-2 w-11/12  flex flex-col">
                <label className="block text-sm mb-1 text-white">Department *</label>
                <select
                  name="department"
                  onChange={handleFacultyChange}
                  placeholder="Select department"
                  className="p-2 border block "
                >
                  <option value="">Select Department</option>
                  <option value="CSE">Computer Science and Engineering(CSE)</option>
                  <option value="ECE">Electronics and Communication Engineering(ECE)</option>
                  <option value="MATHS&SCIENCE">Maths & Science</option>
                  <option value="HSS"> Humanities and Social Sciences (HSS)</option>
                  {/* <option value="science">Science</option> */}
                </select>
              </div>
              <button onClick={handleAddFaculty} className="bg-green-500 text-white hover:bg-green-700 px-4 p-1  rounded-md m-2">
                Submit
              </button>
              <h1 className='text-white'>OR</h1>
              <div className='mt-4'>
                <UploadAllFaculty />
              </div>
            </div>
          }

          {removeFacultyFlag &&
            <div className='mt-8'>
              <label className="w-full text-white text-sm mb-1">Email *</label>
              <input
                type="email"
                name="email"
                onChange={handleFacultyChange}
                placeholder="Enter email"
                className="p-2 border w-full"
              />

              <button onClick={handleRemoveFaculty} className="bg-red-500 text-white hover:bg-red-700 p-2 px-5 rounded-md m-4">
                Remove
              </button>
            </div>
          }

          {viewAllFaculty &&
            <FacultyList faculty={allFaculty} />
          }
          {/* <h2 className="text-xl font-bold mb-4">Faculty Management</h2> */}

        </div>
      )}

      {section === 'student' && (
        <div className='flex flex-col items-center w-full'>

          {/* <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>

            <button onClick={handleViewAllStudents} className="bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md m-2 px-8">
              {viewButtonText}
            </button>
          </div>
          {viewAllStudents && (
            <StudentList students={allStudents} />
          )} */}

          <ViewStudentsAttendance />

        </div>
      )}

      {section === 'courses' && (
        <div className=' flex flex-col justify-center items-center lg:mx-4'>
          {/* <h2 className="text-xl font-bold mb-4">Courses Management</h2> */}
          <div className='grid grid-cols-3 '>
            <button
              className='bg-green-400 rounded-md p-2 mx-2 hover:bg-green-600'
              onClick={handleAddCourseFlag}
            >
              Add Course
            </button>
            <button onClick={handleAllCourse} className="bg-blue-500 rounded-md p-2 mx-2 hover:bg-blue-700">
              View all Courses
            </button>
            <button
              className='bg-red-400 rounded-md p-2 mx-2 hover:bg-red-600'
              onClick={handleRemoveCourseFlag}
            >
              Remove Course
            </button>

          </div>

          {addCousreFlag &&
            <div className='mt-8 w-1/2 '>
              <div className="mb-2">
                <label className="block text-sm mb-1 text-white">Course ID *</label>
                <input
                  type="text"
                  name="courseID"
                  onChange={handleCourseChange}
                  placeholder="Enter course ID"
                  className="p-2 border block w-full"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm mb-1 text-white">Course Name *</label>
                <input
                  type="text"
                  name="courseName"
                  onChange={handleCourseChange}
                  placeholder="Enter course name"
                  className="p-2 border block w-full"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm mb-1 text-white">Department *</label>
                <select
                  name="department"
                  onChange={handleCourseChange}
                  placeholder="Select department"
                  className="p-2 border block w-full"
                >
                  <option value="">Select Department</option>
                  <option value="CSE">Computer Science and Engineering(CSE)</option>
                  <option value="ECE">Electronics and Communication Engineering(ECE)</option>
                  <option value="MATHS&SCIENCE">Maths & Science</option>
                  <option value="HSS"> Humanities and Social Sciences (HSS)</option>
                  {/* <option value="science">Science</option> */}
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm mb-1 text-white">Degree *</label>
                <select
                  name="degree"
                  onChange={handleCourseChange}
                  placeholder="Select degree"
                  className="p-2 border block w-full"
                >
                  <option value="">Select Degree</option>
                  <option value="B.Tech">Bachelor of Technology(B.Tech)</option>
                  <option value="M.Tech">Master of Technology(M.Tech)</option>
                  <option value="PhD">Doctor of Philosophy(PhD)</option>
                  {/* <option value="hss"> Humanities and Social Sciences (HSS)</option> */}
                  {/* <option value="science">Science</option> */}
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm mb-1 text-white">Semester *</label>
                <input
                  type="Number"
                  name="semester"
                  // defaultValue={semesterValue}
                  value={semesterValue}
                  onChange={handleCourseChange}
                  placeholder="semester"
                  className="p-2 border block w-full"
                />
              </div>
              <button onClick={handleAddCourse} className="bg-green-500 text-white hover:bg-green-700 p-2 px-6 rounded-md mb-2 mr-8">
                Submit
              </button>

              <div className='mt-4 '>
                <UploadCourses />
              </div>
            </div>
          }

          {removeCourseFlag &&
            <div className='mt-8'>
              <div className="mb-2">
                <label className="block text-sm mb-1 text-white">Course ID *</label>
                <input
                  type="text"
                  name="courseID"
                  onChange={(e) => { setRemoveCourseID(e.target.value) }}
                  placeholder="Enter course ID"
                  className="p-2 border block w-full"
                />
              </div>

              <button onClick={handleRemoveCourse} className="bg-red-500 text-white hover:bg-red-700 p-2 rounded-md">
                Submit
              </button>
            </div>
          }

          {viewAllcourses &&
            <CourseList onDelete={handleRemoveCourse} onEdit={handleUpdateCourse} courses={courses} />
          }


        </div>
      )}
    </div>
    // </div>
  );
};

export default EditOptions;
