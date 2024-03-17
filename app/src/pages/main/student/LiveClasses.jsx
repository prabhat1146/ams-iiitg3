import React, { useState, useEffect } from 'react';

const LiveClasses = () => {
    const [liveClasses, setLiveClasses] = useState([]);
    const [date, setDate] = useState(new Date());
    const [currentDate,setCurrentDate]=useState(date.toLocaleDateString());
    const [timeSlot, setTimeSlot] = useState(
        `${String(date.getHours()).padStart(2, '0')}-${String(date.getHours() + 1).padStart(2, '0')}`
    );

    setTimeout(() => {
        setDate(new Date())
        let d = `${String(date.getHours()).padStart(2, '0')}-${String(date.getHours() + 1).padStart(2, '0')}`
        setTimeSlot(d)
        setCurrentDate(date.toLocaleDateString())
    }, 1000)

    const BASEURL=process.env.REACT_APP_BASEURL
    const DATE = currentDate

    useEffect(() => {
        const apiUrl = `${BASEURL}/attendance/liveClasses?date=${DATE}&timeSlot=${timeSlot}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                // Assuming data is an array, replace old data with new data
                setLiveClasses(data.map(item => ({
                    facultyName: item.facultyName,
                    courseName: item.courseName,
                    courseID: item.courseID,
                    classRoom: '',
                })));
            })
            .catch(error => console.error('Error fetching live classes:', error));
    }, [BASEURL, DATE, timeSlot]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl text-green-400 font-bold mb-4">Live Classes</h2>
            <p className="mb-2 text-white">Date: {currentDate}</p>
            <p className="mb-4 text-white">Time : {date.getHours().toString().padStart(2, '0')} : {date.getMinutes().toString().padStart(2, '0')} : {date.getSeconds().toString().padStart(2, '0')}</p>

            <ul>
                {liveClasses?.map((liveClass) => (
                    <li key={liveClass.id} className="mb-2 bg-gray-200 p-2 rounded">
                        <h2>Faculty Name: {liveClass.facultyName}</h2>
                        <h2>Course Name : {liveClass.courseName}</h2>
                        <h2>Course ID: {liveClass.courseID}</h2>
                        <h2>ClassRoom: {liveClass.classRoom}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LiveClasses;
