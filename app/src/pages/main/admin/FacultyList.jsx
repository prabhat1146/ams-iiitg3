// CourseList.jsx

import React from 'react';
import { useState } from 'react';
import {fetchData} from './SetFormData';

const FacultyList = ({ faculty }) => {
  const BASEURL=process.env.REACT_APP_BASEURL

  const [facultyEmailForSearch,setFacultyEmailForSearch]=useState();
  const [facultyList,setFacultyList]=useState(faculty);
  
    function onDelete (email) {
       
        const url = `${BASEURL}/faculty/remove`;
       if(window.confirm("Are you confirm to delete ?")){
        try {
          //   console.log(courseData)
            fetchData(url, {email:email},'Removed',true);
          } catch (error) {
            console.log(error)
          }
       }
      };
    function onEdit (email) {
       
        // const url = 'http://localhost:5001/course/update';
        // try {
        // //   console.log(courseData)
        //   fetchData(url, email);
        // } catch (error) {
          
        // }
      };

      const findFaculty=()=>{
        
        if(!facultyEmailForSearch){
          setFacultyList(faculty)
          // alert(courseList)
        }
        
        const newFaculty=faculty.filter(faculty => faculty.email === facultyEmailForSearch);
        setFacultyList(newFaculty);
      }


  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">All Faculties ( {facultyList.length} )</h2>
      <div>
        <input type="text"
        value={facultyEmailForSearch}
        onChange={(e)=>setFacultyEmailForSearch(e.target.value)}
        className='rounded-l-sm mb-4'
        />
        <button className='bg-white rounded-r-sm pr-2'
        onClick={findFaculty}
        >Search</button>
      </div>
      <div>
        
      </div>
      <div className='rounded-sm grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {facultyList.map((faculty) => (
          <li key={faculty._id} className="rounded-lg border p-4 mb-4 flex justify-between items-center bg-slate-200 ">
            <div>
              <strong>Faculty Name: {faculty.name}</strong> 
              <h2>Email : {faculty.email}</h2>
              <h2>Department : {faculty.department}</h2>
              <h2>Phone : {faculty.phone}</h2>
            </div>
            <div>
              <div>
              <button
                onClick={() => onEdit(faculty.email)}
                className="bg-blue-500 text-white hover:bg-blue-700 px-8 py-1 m-2 rounded"
              >
                Edit
              </button>
              </div>
              <div>
              <button
                onClick={() => onDelete(faculty.email)}
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

export default FacultyList;
