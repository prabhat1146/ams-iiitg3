import React, { useEffect, useState,useCallback } from 'react';
import axios from 'axios';
import { fetchData } from '../admin/SetFormData';

const FacultyProfile = (props) => {
    const BASEURL = process.env.REACT_APP_BASEURL;
    const [facultyCourse, setFacultyCourse] = useState();
    const [allCourses, setAllCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [department, setDepartment] = useState();
    const [selectedYear, setSelectedYear] = useState('');
    const [remove,setRemove]=useState(false);
    const [facultyCurrentCourses, setFacultyCurrentCourses] = useState([]);
    const [updateFacultyCourse, setUpdateFacultyCourse] = useState({
        courses: selectedCourses,
        email: ''
    })


    useEffect(() => {
        setUpdateFacultyCourse((prevData) => ({
            ...prevData,

            courses: selectedCourses,

            email: props.email?.trim(),

        }))

        // console.log(newSemesterData)
    }, [props.email, selectedCourses])

    const handleRemoveCourse = useCallback((courseId) => {
        if (window.confirm("Are you sure to remove " + courseId + " ?")) {
            const url = `${BASEURL}/faculty/remove-faculty-courses`;

            try {
                const d = {
                    courseID: courseId,
                    email: props.email
                }
                // console.log('cou',d)
                fetchData(url, d, "Removed", true);
            } catch (error) {
                console.log(error)


            }

            setRemove(!remove)
        }
    },[BASEURL, props.email, remove])

    useEffect(() => {
        const url = `${BASEURL}/faculty/search?email=${props.email}`
        // alert('confirm ?')
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
                setDepartment(res[0].department)
                setFacultyCurrentCourses(res[0].facultyCourses)
                console.log(res[0].facultyCourses)
            })
            .catch((error) => {
                console.log(error);
            })

           
    }, [BASEURL, props.email,remove])

    useEffect(() => {
        // Replace the API endpoint with your actual API endpoint to fetch courses
        const apiUrl = `${BASEURL}/course/search?department=${department}`;

        // Fetch courses from the database
        axios.get(apiUrl)
            .then((response) => {
                const coursesData = response.data?.map(course => ({
                    courseID: course.courseID?.trim(),
                    courseName: course.courseName,
                    semester: course.semester,
                    degree: course.degree,
                    department: course.department
                }));

                setAllCourses(coursesData);
                // console.log(coursesData);
            })
            .catch(error => console.error('Error fetching courses:', error));
    }, [BASEURL, department]);

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
    const handleSubmit = (e) => {
        // Perform any action on form submission, such as submitting attendance
        e.preventDefault();
        const url = `${BASEURL}/faculty/add-faculty-courses`;
        try {
            // console.log('l',updateFacultyCourse)
            fetchData(url, updateFacultyCourse, "Added", true);
        } catch (error) {

        }
        setRemove(!remove)
        // console.log('Semester:', semester);
        // console.log('Selected Courses:', newSemesterData);
    };

    useEffect(() => {
        const url = `${BASEURL}/attendance/attendanceTotalData?facultyEmail=${props.email}&studentAdmissionYear=${selectedYear}`
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    // console.log(res)
                    if (res) {
                        return res.json();
                    } else {
                        return []
                    }
                }
            })
            .then((res) => {
                const courses = res?.map((course) => {
                    return (
                        [course.courseID, course.courseName]
                    )
                })
                setFacultyCourse((new Map(courses)))
                // console.log(new Set(res))
                // console.log(courses)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [BASEURL, props.email, selectedYear])


    const renderYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const yearOptions = [];

        for (let i = 2020; i <= currentYear; i++) {
            yearOptions.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }

        return yearOptions;
    };

    const handleAdmisssionYearChange = (e) => {
        setSelectedYear(e.target.value)
        // console.log(selectedYear)
        // console.log(attendanceData.studentAdmissionyear)
    }

   
    return (
        <div className='mt-8 w-full flex-col flex justify-center items-center'>
            <h1 className='text-white'>Teaching-Courses</h1>
            <div className='m-4'>
                <table className='table-fixed border border-collapse border-gray-300'>
                    <thead className="bg-gray-200">

                        <tr>
                            <th className="border px-4 py-2 ">Course-id</th>
                            <th className="border px-4 py-2">Course-name</th>
                            <th className="border px-4 py-2">Semester</th>
                            <th className="border px-4 py-2">Department</th>
                            <th className="border px-4 py-2">Degree</th>
                            <th className="border px-4 py-2">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {facultyCurrentCourses?.map((course) => (
                            <tr key={course.courseID}

                            >

                                <td className="border px-4 py-2 text-white">{course.courseID}</td>
                                <td className="border px-4 py-2 text-white">{course.courseName}</td>
                                <td className="border px-4 py-2 text-white">{course.semester}</td>
                                <td className="border px-4 py-2 text-white">{course.department}</td>
                                <td className="border px-4 py-2 text-white">{course.degree}</td>
                                <td className="border px-4 py-2 text-white"><button className='bg-red-400 px-2 p-1 rounded-md hover:bg-red-600' onClick={() => { handleRemoveCourse(course.courseID) }}>Remove</button></td>


                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>

            <div className="mb-2 ">
                <label className="block text-sm mb-1 text-white">
                    Select Courses:
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
                        <option value={JSON.stringify(course)} className='px-12'>
                            {course.courseName} ( {course.courseID} )
                        </option>

                    ))}
                </select>

                <div className="m-4">
                    <h3 className="text-lg font-semibold mb-2 text-white">Selected courses:</h3>
                    <ul className="list-disc pl-4">
                        {selectedCourses?.map((course, index) => (
                            <li className="flex items-center text-white">
                                <span>{course.courseName}</span>
                                <button
                                    className="ml-2  text-red-500"
                                    onClick={() => handleRemoveSelectedCourse(index)}
                                >
                                    &#10006;
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <button
                className="bg-blue-500 text-white mb-8 py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                onClick={handleSubmit}
            >
                Submit
            </button>
            <h1 className='text-white'>My previous year Courses</h1>
            <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
                <label className="block text-sm font-semibold text-white mb-1">Select Batch</label>
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

            <div className='w-4/5 md:w-1/2 lg:1/2 bg-white p-4 rounded-md'>
                {facultyCourse &&
                    Array.from(facultyCourse.entries()).map(([key, value], index) => (

                        <div key={index}>

                            {/* Render your course information here using {key} and {value} */}
                            <div>
                                <h1> {value} ( {key} )</h1>

                            </div>
                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default FacultyProfile;