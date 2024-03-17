import React, { useState } from 'react';
import ReactLoading from 'react-loading'
import { fetchData } from './SetFormData';

const VerifyDevice = () => {

    const [email, setEmail] = useState("");
    const [Alert, setAlert] = useState();
    const [device, setDevice] = useState('Mobile');
    const [isLoading, setIsLoading] = useState(false);

    const BASEURL = process.env.REACT_APP_BASEURL

    const handleSubmit = () => {
        if (!email) {
            setAlert("Email is required !")
            return ;
        } else if (!email.endsWith('iiitg.ac.in')) {
            // console.log(email)
            setAlert("IIITG Email is required !");
            return ;
        }
        setAlert();
        const url = `${BASEURL}/student/changeDeviceFingerPrint`
        const data={
            studentEmail:email,
            device:device
        }
        console.log(data)
        setIsLoading(true);
        fetchData(url,data)
        .then((res)=>{
            if(res){
                

            }
            setIsLoading(false);
        })
        .catch((error)=>{
            setIsLoading(false);
            // console.log('bad')
            console.log(error)
        })
    }

    const handleDeviceChange = (e) => {
        setDevice(e.target.value)
    }


    return (
        <div className='max-w-md w-11/12 lg:1/2 mx-auto mt-10 p-4 bg-gray-100 rounded-md flex flex-col items-center'>
            <p className='m-2 text-lg text-red-600'>{Alert}</p>
            <div className='flex flex-col w-full'>
                <label for="selectOption">Select Device</label>
                <select
                    id="selectOption"
                    name="verifyDevice"
                    className='mt-2 p-1'
                    onChange={handleDeviceChange}
                >

                    <option selected value="Mobile" >Mobile</option>
                    <option value="Laptop">Laptop</option>


                </select>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    className='mt-4 rounded-sm p-1'


                />


            </div>

            <button
                className='mt-8 bg-green-500 w-24 p-1 rounded-md'
                onClick={handleSubmit}
            >Submit</button>


            <div className='relative bottom-40'>
                {
                    isLoading && <ReactLoading type='spin' color='blue' />
                }
            </div>

        </div>
    );
};

export default VerifyDevice;