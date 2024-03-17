import React, { useEffect, useState } from 'react';
import { fetchDataFromCourse } from '../faculty/SearchFromCourse';
import { fetchData } from './SetFormData';
import StudentAttendanceData from '../faculty/StudentAttendanceData';
import ShowStudentAttendance from '../faculty/ShowStudentsAttendance';
import AttendanceCalculator from './AttendanceCalculator'

const ReviewAttendance = (props) => {
    const [selectedDegree, setSelectedDegree] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedCourseID, setSelectedCourseID] = useState('');
    const [selectedCourseName, setSelectedCourseName] = useState('');
    const [courses, setCourses] = useState([]);
    const [studentGroup, setStudentGroup] = useState('');
    const [studentSection, setStudentSection] = useState('');
    const [sectionSelected, setSectionSelected] = useState(false);
    const [groupSelected, setGroupSelected] = useState(false);
    const [semesterType, setsemesterType] = useState();
    const [facultyEmail, setFacultyEmail] = useState()
    const [facultyDepartment, setFacultyDepartment] = useState([])
    const [allStudents, setAllStudents] = useState([])
    const [date, setDate] = useState(new Date())
    const [currentDate, setCurrentDate] = useState((new Date().toLocaleDateString()));
    const [isDateSelected, setIsDateSelected] = useState(false)
    const [studentsCount, setStudentCount] = useState(0)
    const [studentRollNoForSearch, setStudentRollNoForSearch] = useState();
    const [studentsList, setStudentList] = useState(allStudents);
    const [studentListByDate, setStudentListByDate] = useState([]);
    const [alert, setAlert] = useState()
    const [query, setQuery] = useState({
        degree: '',
        semester: '',
        department: '',

    });

    const [currentEmail, setCurrentEmail] = useState(); //student email to show their attendance
    // const [currentSemester,setCurrentSemester]=useState();
    // const [currentYear,setCurrentYear]=useState();

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = (email, year) => {
        if (!query.semester) {
            setAlert('Semester is not selected')
            return
        } else {
            setAlert('')
        }
        setModalOpen(true);
        // alert(email,year)
        setCurrentEmail(email)
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const BASEURL = process.env.REACT_APP_BASEURL

    useEffect(() => {
        setFacultyEmail(props.facultyEmail)
        const url = `${BASEURL}/faculty/find?email=${facultyEmail}`
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then((res) => {
                setFacultyDepartment(res[0].department)
            })
    }, [BASEURL, facultyEmail, props.facultyEmail])

    useEffect(() => {
        // setAllStudents([])
        const degree = `studentDegree=${query.degree}`
        const dep = `studentDepartment=${query.department.toString().trim()}`
        const cou = `studentCourse.courses.courseID=${selectedCourseID.toString().trim()}`
        const admiYear = `studentAdmissionYear=${selectedYear.toString().trim()}`
        const semester = `studentCourse.semester=${query.semester}`
        const sGroup = `studentCourse.studentGroup=${studentGroup.toString().trim()}`
        const sSection = `studentCourse.studentSection=${studentSection.toString().trim()}`
        const miniurl = `${dep}&${admiYear}&${degree}&${semester}&${sGroup}&${cou}&${sSection}`
        if (isDateSelected) {
            const degree = `degree=${query.degree}`
            const dep = `department=${facultyDepartment.toString().trim()}`
            const admiYear = `studentAdmissionYear=${selectedYear.toString().trim()}`
            const semester = `semester=${query.semester}`
            const sGroup = `studentGroup=${studentGroup.toString().trim()}`
            const sSection = `studentSection=${studentSection.toString().trim()}`
            const Date = `date=${currentDate}`
            const cou = `studentCourse.courses.courseID=${selectedCourseID.trim()}`
            const miniurl2 = `${dep}&${admiYear}&${degree}&${semester}&${sGroup}&${sSection}&${cou}&${Date}`

            const url = `${BASEURL}/attendance/find?${miniurl2}`
            fetch(url)
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        console.log('error while fetching attendace data')
                        return []
                    }
                })
                .then((res) => {
                    console.log('r2', res, selectedCourseID)
                    // setAllStudents(res)

                    if (res.length === 0) {
                        setStudentCount(0)
                        setStudentListByDate([])
                    } else if (!res[0].studentAttendances?.length) {
                        setStudentCount(0)
                        setStudentListByDate([])
                    } else if (res[0].studentAttendances?.length) {
                        setStudentCount(res[0].studentAttendances?.length)
                        setStudentListByDate(res[0].studentAttendances)
                    }
                    // console.log('c',res[0].studentAttendances?.length)


                })
                .catch((error) => {
                    console.log(error)
                })

            return
        }

        console.log(miniurl)

        const url = `${BASEURL}/student/find?${miniurl}`
        fetch(url)
            .then((res) => (res.ok ? res.json() : []))
            .then((newStudents) => {
                // console.log('s',newStudents)
                setAllStudents(newStudents)
                setStudentList(newStudents)
                //   setAllStudents((prevStudents) => {
                //     const uniqueStudents = newStudents.filter(
                //       (newStudent) => !prevStudents.some((existingStudent) => existingStudent.id === newStudent.id)
                //     );
                //     return [...prevStudents, ...uniqueStudents];
                //   });
            })
            .catch((error) => {
                console.log(error)
            })


    }, [BASEURL, currentDate, facultyDepartment, isDateSelected, query.degree, query.department, query.semester, selectedCourseID, selectedYear, studentGroup, studentSection])




    const handleQueryChange = (e) => {
        const { name, value } = e.target;
        setQuery((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    useEffect(() => {
        var url = `${BASEURL}/course/find`;
        // console.log("hi",selectedDegree)
        if (query.degree !== '' || query.department !== '' || query.semester !== '') {
            // setQuery({ 'degree': selectedDegree })
            // setQuery("hi")
            url = `${BASEURL}/course/search`;
            // console.log("hi", selectedDegree)
            console.log("hi2", query)
            const courseData = fetchDataFromCourse(url, query)
            courseData.then((res) => {
                // return (res.json())
                // console.log(res)
                setCourses(res)
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
                        setCourses(data);
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
                // Additional logic or validation if needed
            } else {
                console.error("Selected course not found");
            }
        } catch (error) {
            console.error("Error handling course selection:", error);
        }

    };





    // const renderSemesterOptions = () => {
    //     const semesterOptions = [];
    //     for (let i = 1; i <= (selectedDegree === 'phd' ? 1 : 8); i++) {
    //         semesterOptions.push(
    //             <option key={i} value={i}>
    //                 {i}
    //             </option>
    //         );
    //     }
    //     return semesterOptions;
    // };

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

    }

    const handleGroupSelect = (groupID) => {
        setStudentGroup(groupID)

    }
    const handleSectionSelect = (sectionID) => {
        setStudentSection(sectionID)

    }

    const handleStudentClick = (email) => {
        alert(email)
    }

    const handleDate = (e) => {
        console.log(e.target.value)
        setDate(e.target.value);
        setCurrentDate((new Date(e.target.value)).toLocaleDateString())
    }
    const handleDateSelect = (e) => {
        setIsDateSelected(!isDateSelected)
    }

    const findStudent = () => {

        if (!studentRollNoForSearch) {
            setStudentList(allStudents)
            //   alert('h')
            // console.log('h',allStudents)
        }

        const newStudent = allStudents.filter(student => student.studentRoll === studentRollNoForSearch);
        setStudentList(newStudent);
    }

    return (
        <div className='flex flex-col w-full items-center bg-gradient-to-r from-blue-500 to-purple-500'>

            <div className="mb-4 w-full sm:w-11/12 md:w-3/4 lg:w-1/2">
                <label className="block text-sm font-semibold text-white mb-1">Select Degree</label>

                <div className="flex items-center w-1/2">
                    <input
                        type="radio"
                        id="btech"
                        value="B.Tech"
                        checked={query.degree === "B.Tech"}
                        onChange={handleQueryChange}
                        name="degree"
                        className="mr-2"
                    />
                    <label htmlFor="btech " className='text-white'>B.Tech</label>

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

                    {/* <input
                        type="radio"
                        id="phd"
                        value="PhD"
                        checked={query.degree === "PhD"}
                        onChange={handleQueryChange}
                        name="degree"
                        className="ml-4 mr-2"
                    />
                    <label htmlFor="phd" className='text-white'>Ph.D</label> */}
                </div>

                <div className='mt-4'>
                    <input
                        type="radio"
                        className=''
                        name='department'
                        id='std1'
                        value={'CSE'}
                        onChange={handleQueryChange}
                    />
                    <label htmlFor="std1" className='text-white mx-2'>CSE</label>


                    <input
                        type="radio"
                        className=''
                        name='department'
                        id='std2'
                        value={'ECE'}
                        onChange={handleQueryChange}
                    />
                    <label htmlFor="std2" className='text-white mx-2'>ECE</label>
                    <input
                        type="radio"
                        className=''
                        name='department'
                        id='std3'
                        value={'HSS'}
                        onChange={handleQueryChange}
                    />
                    <label htmlFor="std3" className='text-white mx-2'>HSS</label>
                    <input
                        type="radio"
                        className=''
                        name='department'
                        id='std4'
                        value={'MATHS&SCIENCE'}
                        onChange={handleQueryChange}
                    />
                    <label htmlFor="std4" className='text-white mx-2'>MATHS&SCIENCE</label>
                </div>
            </div>



            <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
                <label className="block text-sm font-semibold text-white mb-1">Select Admission Year</label>
                <select
                    onChange={handleAdmisssionYearChange}
                    value={selectedYear}
                    name='year'
                    className="w-full px-3 py-2 border rounded-md"
                >
                    <option value={''}>Select Year</option>
                    {renderYearOptions()}
                </select>

            </div>

            <div className="mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2">
                <label className="block text-sm font-semibold text-white mb-1">Select Semester</label>

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
                    {courses.map((course) => (
                        <option key={course.id} value={course.courseID}>
                            {course.courseName}{` ( ${course.courseID} )`}
                        </option>
                    ))}
                </select>
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
            <div className='mb-4 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2'>
                <input type="radio" className='mr-2'
                    checked={isDateSelected}
                    onClick={handleDateSelect}
                />
                <input type="Date"
                    className='rounded-xl px-3'
                    id='date'
                    // value={date.toISOString().split('T')[0]}
                    value={date}
                    // checked={today}
                    onChange={handleDate} />
                <label htmlFor="date" className='text-white ml-2'>Date</label>
            </div>

            <div className="container  mx-auto w-11/12 p-4">
                <h1 className="text-3xl mx-auto font-bold mb-4 text-white">Total Students ( {!isDateSelected ? allStudents?.length : studentsCount} )</h1>
                <div>
                    <input type="text"
                        value={studentRollNoForSearch}
                        onChange={(e) => setStudentRollNoForSearch(e.target.value)}
                        className='rounded-l-sm mb-4'
                    />
                    <button className='bg-white rounded-r-sm pr-2'
                        onClick={findStudent}
                    >Search</button>
                </div>
                <h2 className='mb-2 text-white'>{alert}</h2>
                
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:mx-8">
                    {!isDateSelected && studentsList?.map(student => (
                        <div
                            key={student.studentEmail}
                            className=" bg-white  p-2 rounded-md shadow-md cursor-pointer grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
                            value={student.studentEmail}
                            onClick={() => handleOpenModal(student.studentEmail, student.studentAdmissionYear)}
                        // onClick={()=>handleStudentClick(student.studentEmail)}
                        >

                            <div className='bg-blue-400 p-2 mb-2 rounded-md text-white grid grid-cols-2'>
                                <div>
                                <h2>Name : {student.studentName}</h2>
                                <h2>Roll No : {student.studentRoll}</h2>
                                <h2>Degree : {student.studentDegree}</h2>
                                <h2>Department : {student.studentDepartment}</h2>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <button className='bg-blue-800 rounded-md px-2 p-1 '>Details</button>
                                </div>
                            </div>
                            <div>
                                <AttendanceCalculator email={student.studentEmail} semester={query.semester}/>
                            </div>

                        </div>
                    ))}

                    {isDateSelected && studentListByDate?.map(student => (
                        <div
                            // key={student.studentEmail}
                            className="bg-white p-4 rounded-md shadow-md cursor-pointer"
                            value={student.studentEmail}
                            onClick={() => handleOpenModal(student.studentEmail)}
                        // onClick={()=>handleStudentClick(student.studentEmail)}
                        >



                            <h2>Roll No : {student.studentRollNo}</h2>
                            <h2>Email : {student.studentEmail}</h2>
                            {/* <h2>Department : {student.studentDepartment}</h2> */}
                            {/* <h2>student.studentDegree</h2> */}

                        </div>

                    ))}
                </div>

            <ShowStudentAttendance
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                email={currentEmail}
                semester={query.semester}
            />



        </div>
    );
};

export default ReviewAttendance;
