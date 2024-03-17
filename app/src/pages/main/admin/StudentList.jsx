// CourseList.jsx

import React from 'react';
import {fetchData} from './SetFormData';
import { useState } from 'react';

const StudentList = ({ students }) => {
  const BASEURL=process.env.REACT_APP_BASEURL

  const [studentRollNoForSearch,setStudentRollNoForSearch]=useState();
  const [studentsList,setStudentList]=useState(students);
    function onDelete (email) {
       
        const url = `${BASEURL}student/remove`;
        try {
        //   console.log(courseData)
          fetchData(url,{studentEmail:email});
        } catch (error) {
          
        }
      };
    function onEdit (email) {
       
        // const url = 'http://localhost:5001/faculty/update';
        // try {
        // //   console.log(courseData)
        //   fetchData(url, email);
        // } catch (error) {
          
        // }
      };
      const findStudent=()=>{
        
        if(!studentRollNoForSearch){
          setStudentList(students)
          // alert(courseList)
        }
        
        const newStudent=students.filter(student => student.studentRoll === studentRollNoForSearch);
        setStudentList(newStudent);
      }
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">All Students ( {studentsList.length} )</h2>
      <div>
        <input type="text"
        value={studentRollNoForSearch}
        onChange={(e)=>setStudentRollNoForSearch(e.target.value)}
        className='rounded-l-sm mb-4'
        />
        <button className='bg-white rounded-r-sm pr-2'
        onClick={findStudent}
        >Search</button>
      </div>
      <div className=' rounded-sm grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {studentsList && studentsList?.map((student) => (
          <li key={student._id} className="rounded-lg border p-4 mb-4 flex justify-between items-center bg-slate-200 ">
            <div>
              <strong>Student Name: {student.studentName}</strong> 
              <h2>Email : {student.studentEmail}</h2>
              <h2>Department : {student.studentDepartment}</h2>
              <h2>Roll No : {student.studentRoll}</h2>
              <h2>Admission Year : {student.studentAdmisionYear}</h2>
            </div>
            <div>
              <div>
              <button
                onClick={() => onEdit(student.email)}
                className="bg-blue-500 text-white hover:bg-blue-700 px-8 py-1 m-2 rounded"
              >
                Edit
              </button>
              </div>
              <div>
              <button
                onClick={() => onDelete(student.email)}
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

export default StudentList;
