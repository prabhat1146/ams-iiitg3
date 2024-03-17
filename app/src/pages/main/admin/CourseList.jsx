// CourseList.jsx
// import env from "react-dotenv";
import React, { useEffect } from 'react';
import {fetchData} from './SetFormData';
import { useState } from 'react';

const CourseList = ({ courses }) => {

  const [courseIdForSearch,setCourseIDForSearch]=useState();
  const [courseList,setCourseList]=useState(courses);

  // useEffect(()=>{
  //   setCourseList(courses)
  // })

  const BASEURL=process.env.REACT_APP_BASEURL
    function onDelete (courseId) {
      
      const url = `${BASEURL}/course/remove`;
      if(window.confirm("Are you confirm ?")){
        try {
          const d={courseID:courseId}
          // console.log('cou',d)
          fetchData(url, d, "Removed", true);
        } catch (error) {
          console.log(error)
        }
      }else{

      }
      };
    function onEdit (courseId) {
      //  console.log(process.env.REACT_APP_BASEURL);
        // const url = 'http://localhost:5001/course/updat';
        // try {
        // //   console.log(courseData)
        //   fetchData(url, courseId);
        // } catch (error) {
          
        // }
      };

      const findCourseID=()=>{

        if(!courseIdForSearch){
          setCourseList(courses)
          // alert(courseList)
        }
        
        const newCourse=courses.filter(course => course.courseID === courseIdForSearch);
        setCourseList(newCourse);
        
      }

     

  return (
    <div className="mt-8 w-full  grid sm-grid">
      <h2 className="text-2xl font-bold mb-4">All Courses ( {courseList.length} )</h2>
      <div>
        <input type="text"
        value={courseIdForSearch}
        onChange={(e)=>setCourseIDForSearch(e.target.value)}
        className='rounded-l-sm mb-4'
        />
        <button className='bg-white rounded-r-sm pr-2'
        onClick={findCourseID}
        >Search</button>
      </div>
      <div className=' rounded-sm grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {courseList.map((course) => (
          
          <li key={course._id} className=" rounded-lg border p-4 mb-4 flex justify-between items-center bg-slate-200  ">
            <div>
              <strong>Course Name: {course.courseName}</strong> 
              <h2>Course ID : {course.courseID}</h2>
              <h2>Department : {course.department}</h2>
              <h2>Degree : {course.degree}</h2>
              <h2>Semester : {course.semester}</h2>
            </div>
            <div className='flex flex-col'>
              <div>
              <button
                onClick={() => onEdit(course.courseID)}
                className="bg-blue-500 text-white hover:bg-blue-700 px-8 py-1 m-2 rounded"
              >
                Edit
              </button>
              </div>
              <div>
              <button
                onClick={() => onDelete(course.courseID)}
                className="bg-red-500 text-white  hover:bg-red-700 px-6 py-1 m-2 rounded"
              >
                Delete
              </button>
              </div>
            </div>
          </li>
        ))}
     </div>
    </div>
  );
};

export default CourseList;
