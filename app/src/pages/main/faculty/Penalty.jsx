import React, { useState } from 'react';
import { fetchData } from '../admin/SetFormData';
import ReactLoading from 'react-loading'

const Penalty = () => {
    const [rollNo, setRollNo] = useState('');
    const [courseId, setCourseId] = useState('');
    const [penalty, setPenalty] = useState('');
    const [isLoading,setIsLoading]=useState(false);
    // const [totalPenalty, seTotalPenalty] = useState(0)
    const [Alert, setAlert] = useState()
    const BASEURL = process.env.REACT_APP_BASEURL
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let url = `${BASEURL}/student/find?studentRoll=${rollNo}`;
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return []
                }
            })
            .then((student) => {
                // console.log(student)
                // console.log(student[0].studentCourse)
                student[0].studentCourse?.forEach(semester => {
                    // console.log('hi')
                    semester.courses.forEach(course => {
                        if (course.courseID.trim() === courseId.trim()) {
                            if (course.penalty) {

                                var totalPenalty = (parseInt(course.penalty) + parseInt(penalty))
                            } else {
                                totalPenalty = penalty;
                            }
                            console.log(totalPenalty)

                            url = `${BASEURL}/student/addPenalty`;
                            const data = {
                                studentRoll: rollNo,
                                courseID: courseId,
                                penalty: totalPenalty
                            }
                            console.log(data)
                            fetchData(url, data)
                                .then((res) => {
                                    console.log(res)
                                    if (res) {
                                        setIsLoading(false);
                                        setAlert("Penalty Added")
                                    } else {
                                        setIsLoading(false);
                                        setAlert("Error")
                                    }
                                })

                            // console.log('Submitted:', { rollNo, courseId, penalty });


                        } else {
                            // console.log('hi')
                        }
                        //   console.log(course.courseID,courseID, typeof(course.courseID))
                    });
                });
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error)
                return
            })


    };

    return (
        <div className="flex flex-col items-center justify-center w-full bg-full bg-gradient-to-r from-blue-500 to-purple-500">
            <h1 className="text-2xl font-bold my-4 text-white">Student Informations</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-64">
                <input
                    type="text"
                    placeholder="Roll No"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="my-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Course ID"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="my-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="Number"
                    placeholder="Penalty"
                    value={penalty}
                    onChange={(e) => setPenalty(e.target.value)}
                    className="my-2 p-2 border border-gray-300 rounded"
                />
                <p className='m-2'>{Alert}</p>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>

            <div className='flex fixed top-2/4'>
                {
                    isLoading && <ReactLoading type='spin' color='blue' />
                }
            </div>
        </div>
    );
};

export default Penalty;
