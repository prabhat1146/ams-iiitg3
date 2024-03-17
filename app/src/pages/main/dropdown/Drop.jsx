import React from 'react';
import { Link } from 'react-router-dom';
// import "./Drop.css"

const Drop = () => {
    return (
        <div class=" bg-slate-800  w-3/4 min-h-dvh ">
            <div class="w-full h-20 bg-gray-400 flex">
                <div class="h-full w-4/12 bg-slate-100 flex justify-center items-center">
                    <div class="w-20 h-20 rounded-full bg-lime-400 ">

                    </div>

                </div>
                <div class="w-8/12 h-full bg-slate-400 flex justify-center items-center flex-col">
                    <h3 class="flex-shrink-0">Name: Prabhat kumar</h3>
                    <h4 class="flex-shrink-0">Roll No: 2101146</h4>
                </div>


            </div>
            <hr />
            <div class="flex  gap-4  text-white flex-col justify-center items-center p-10 text-3xl ">
                <div class=" flex flex-col gap-4">
                    <div >
                        <h2><Link to="/" >Attendence</Link></h2>
                    </div>
                    <div>
                        <h2><Link to="/" >Courses</Link></h2>
                    </div>
                    <div>
                        <h2><Link to="/" >Calender</Link></h2>
                    </div>
                    <div>
                        <h2><Link to="/" >Time-Table</Link></h2>
                    </div>
                    <div>
                        <h2><Link to="/" >Assignment</Link></h2>
                    </div>
                    <div>
                        <h2><Link to="/" >Activities</Link></h2>
                    </div>
                    <div>
                        <h2><Link to="/" >Other</Link></h2>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Drop;