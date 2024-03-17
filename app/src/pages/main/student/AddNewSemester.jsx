import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchData } from '../admin/SetFormData';

const AddNewSemester = (props) => {
    const [semester, setSemester] = useState('');
    const [allCourses, setAllCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [studentGroup, setStudentGroup] = useState();
    const [studentSection, setStudentSection] = useState();
    const [newSemesterData, setNewSemesterData] = useState({
        semester: semester,
        courses: selectedCourses,
        studentSection: studentSection,
        studentGroup: studentGroup,
        studentDegree: '',
        studentDepartment: '',
        studentRoll: '',
        studentEmail: ''
    })


    useEffect(() => {
        setNewSemesterData((prevData) => ({
            ...prevData,
            semester: semester?.trim(),
            studentGroup: studentGroup?.trim(),
            studentSection: studentSection?.trim(),
            courses: selectedCourses,
            studentRoll: props.studentData.studentRollNumber?.trim(),
            studentEmail: props.studentData.studentEmail?.trim(),
            studentDegree: props.studentData.studentDegree?.trim(),
            studentDepartment: props.studentData.studentDepartment?.trim()
        }))

        // console.log(newSemesterData)
    }, [props.studentData.studentDegree, props.studentData.studentDepartment, props.studentData.studentEmail, props.studentData.studentRoll, props.studentData.studentRollNumber, selectedCourses, semester, studentGroup, studentSection])

    const BASEURL=process.env.REACT_APP_BASEURL
    useEffect(() => {
        // Replace the API endpoint with your actual API endpoint to fetch courses
        const apiUrl = `${BASEURL}/course/search?semester=${semester}`;

        // Fetch courses from the database
        axios.get(apiUrl)
            .then((response) => {
                const coursesData = response.data?.map(course => ({
                    courseID: course.courseID?.trim(),
                    courseName: course.courseName,
                    penalty:0
                }));

                setAllCourses(coursesData);
                // console.log(coursesData);
            })
            .catch(error => console.error('Error fetching courses:', error));
    }, [BASEURL, semester]);

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

    const handleSubmit = (e) => {
        // Perform any action on form submission, such as submitting attendance
        e.preventDefault();
        const url = `${BASEURL}/student/courseRegistrationForNewSemester`;
        try {
            // console.log(courseData)
            fetchData(url, newSemesterData, "Added", true);
        } catch (error) {

        }
        // console.log('Semester:', semester);
        // console.log('Selected Courses:', newSemesterData);
    };

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

    // const handleNewSemesterData = () => {

    // }
    const handleGroup = (e) => {
        setStudentGroup(e.target.value)
    }
    const handleSection = (e) => {
        setStudentSection(e.target.value)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
                <h1 className="text-2xl font-bold mb-4">Course registration form for new semester</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="semester">
                        Select Semester (1-8)
                    </label>
                    <input
                        type="number"
                        id="semester"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Enter semester (1-8)"
                        min="1"
                        max="8"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-sm mb-1">Select Section:</label>
                    <select
                        name="studentSection"
                        // onChange={(e) => handleSectionSelect(e.target.value)}
                        onChange={handleSection}
                        // value={handleStudent}
                        //   disabled={groupSelected}
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
                <div className="mb-2">
                    <label className="block text-sm mb-1">Select Group:</label>
                    <select
                        name="studentGroup"
                        // onChange={(e) => handleGroupSelect(e.target.value)}
                        onChange={handleGroup}
                        // value={handleStudent}
                        //   disabled={sectionSelected}
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

                <div className="mb-2 ">
                    <label className="block text-sm mb-1">
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
                            <option value={JSON.stringify(course)}>
                                {course.courseName}
                            </option>

                        ))}
                    </select>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Selected courses:</h3>
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
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
            <div className="absolute inset-0 z-[-1] bg-gradient-to-r from-blue-300 to-purple-300 animate-gradient"></div>
        </div>
    );
};

export default AddNewSemester;
