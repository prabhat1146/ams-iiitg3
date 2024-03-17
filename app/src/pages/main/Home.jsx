import React, { useEffect, useState } from 'react';
import "../../index.css"
import DeviceFingerPrint from '../deviceFingerPrint/DeviceFingerPrint';



const Home = () => {
  const BASEURL = process.env.REACT_APP_BASEURL;

  const [totalFaculty, setTotalFaculty] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0)
  const [totalCourses, setTotalCourses] = useState(0);






  useEffect(() => {
    const url = `${BASEURL}/faculty/find`
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return []
        }
      })
      .then((res) => {
        setTotalFaculty(res.length)
        let count = 0;
        const interval = setInterval(() => {
          if (count < res.length) {
            // Update the count and any other logic you want to perform
            count = count + 1;
            // Perform any action you want with the count
            // console.log("Count:", count);
            setTotalFaculty(count)
          } else {
            clearInterval(interval); // Stop the interval when count exceeds array length
          }
        }, 30);

        // Clean up function to clear the interval if component unmounts
        return () => clearInterval(interval);
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])



  useEffect(() => {
    const url = `${BASEURL}/student/find`
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return []
        }
      })
      .then((res) => {

        let count = 0;
        const interval = setInterval(() => {
          if (count < res.length) {
            // Update the count and any other logic you want to perform
            count = count + 1;
            // Perform any action you want with the count
            // console.log("Count:", count);
            setTotalStudents(count)
          } else {
            clearInterval(interval); // Stop the interval when count exceeds array length
          }
        }, 30);

        // Clean up function to clear the interval if component unmounts
        return () => clearInterval(interval);
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  useEffect(() => {
    const url = `${BASEURL}/course/find`
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return []
        }
      })
      .then((res) => {
        let count = 0;
        const interval = setInterval(() => {
          if (count < res.length) {
            // Update the count and any other logic you want to perform
            count = count + 1;
            // Perform any action you want with the count
            // console.log("Count:", count);
            setTotalCourses(pre => (count))
          } else {
            clearInterval(interval); // Stop the interval when count exceeds array length
          }
        }, 30);

        // Clean up function to clear the interval if component unmounts
        return () => clearInterval(interval);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className='h-screen bg-gradient-to-r from-blue-500 to-purple-500'>
      <DeviceFingerPrint />
      <div className='bg-home'>

      </div>
     
      <div className=" bg-bottom flex items-center justify-center">



        <div className='flex'>
          <div>
            <div>
              <img src="images/teachers.png" alt=" images"
                className='bg-white w-20 h-20 rounded-xl m-4'
              />
            </div>
            <div className='flex m-4 w-20 h-8 bg-white mt-2 rounded-lg justify-center'>
              <h2 className='flex text-xl items-center'>{totalFaculty}</h2>
            </div>
          </div>
          <div>
            <div>
              <img src="images/students.png" alt=" images"
                className='bg-white w-20 h-20 rounded-xl m-4'
              />
            </div>
            <div className='flex m-4 w-20 h-8 bg-white mt-2 rounded-lg justify-center'>
              <h2 className='flex text-xl items-center'>{totalStudents}</h2>
            </div>
          </div>
          <div>
            <div>
              <img src="images/course.png" alt=" images"
                className='bg-white w-20 h-20 rounded-xl m-4'
              />
            </div>
            <div className='flex m-4 w-20 h-8 bg-white mt-4 rounded-lg justify-center'>
              <h2 className='flex text-xl items-center'>{totalCourses}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
