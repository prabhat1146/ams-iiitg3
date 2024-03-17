import React, { useEffect, useState } from 'react';
import { useScroll } from 'react-spring';

function TotalPresent(props) {
    const BASEURL = process.env.REACT_APP_BASEURL
    // const [count,setCount]=useState(1);
    

    useEffect(() => {
        // console.log('p', props.presentData)
    })
    return (
        <div className=''>


            {!props.presentData?.length &&
                <h1 className='text-white mb-4'>Data not found !</h1>
            }
            {props.presentData?.length &&
                <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 m-8 '>
                    {props.presentData?.map((student,index) => {
                        // setCount(index+1)
                        return(
                            <div className='  bg-white p-2 rounded-md '>
                                {/* {setCount(count+1)} */}
                            <h1>SR.No : {index+1}</h1>
                            <h1>Roll No : {student.studentRollNo}</h1>
                            <h1>Email : {student.studentEmail}</h1>
                            {/* setCount(count++) */}
                        </div>
                        )

                    })}

                </div>
            }
        </div>
    );
}

export default TotalPresent;