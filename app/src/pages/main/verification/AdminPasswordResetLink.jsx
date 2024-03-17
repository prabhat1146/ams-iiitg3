import React, { useEffect, useState } from 'react';
import { fetchData } from '../admin/SetFormData';
import { useLocation } from 'react-router-dom';
import ReactLoading from 'react-loading';

function EmailVerificationLink() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    // console.log("rendering")

    useEffect(() => {
        if (location && location.state) {
            if (location.state.email && location.state.name) {
                setEmail(location.state.email);
                setName(location.state.name);
            } else {
                console.log('Email and name are required.');
            }
        } else {
            console.log('Props error.');
        }
    }, []);

    useEffect(() => {
        const BASEURL = process.env.REACT_APP_BASEURL;
        const url = `${BASEURL}/verification/admin-reset-password`;
       

        if (name && email) {
            try {
                setIsLoading(true)
                fetchData(url, { name: name, email: email })
                .then((res) => {
                    console.log(res)
                    if(res){
                        setStatus(res);
                        // alert('hi');
                        // console.log('SENT');
                        setIsSent(true);
                        setIsLoading(false);
                    }else{
                        setIsLoading(false)
                    }
                    
                })
                .catch((error)=>{
                    console.log(error)
                })
            } catch (error) {
                setIsLoading(false)
                console.log(error);
            }
        } else {
            setIsLoading(false)
            console.log('Missing name or email', name, email);
        }
    }, [email, name]); // Add name and email as dependencies

    if (isLoading) {
        return (
            <div className='flex h-screen justify-center items-center  bg-gradient-to-r from-blue-500 to-purple-500'>
                {isLoading && <ReactLoading type='spin' color='blue' />}
            </div>
        );
    }

    return (
        <div className=''>
            <strong className='font-bold'>{status}</strong>
            {isSent && (
                <div className=' text-white p-8 h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500'>
                    <h2>We've sent a verification link to your email address: {email}</h2>
                    <h2>Please check your email and click on the link to verify your account.</h2>
                </div>
            )}

            {!isSent && (
                <div className='h-screen flex p-8 justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500'>
                    <h2 className='text-white text-lg'>Something went wrong</h2>
                </div>
            )}
        </div>
    );
}

export default EmailVerificationLink;
