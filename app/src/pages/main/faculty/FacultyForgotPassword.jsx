import React, { useState} from 'react';
import {useNavigate } from 'react-router-dom'

const FacultyForgetPasswordPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
    });

    // const navigate = useNavigate();
    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        if(formData.email){
            // console.log('ver',formData.email,formData.name)
            // navigate('/verification', { state: { email:email,name:name}});
            // setIsLoading(false);
            navigate('/verification/emailVerificationLink', { state: {email:formData.email,name:formData.name}});
          }else{
            // setIsLoading(false);
            navigate('/error')
          }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <form
                className="bg-white p-8 rounded shadow-md max-w-md w-full"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6">Faculty Forget Password</h2>

                {submitted ? (
                    <p className="text-green-500">Password reset instructions sent to your email.</p>
                ) : (
                    <>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
                                Department
                            </label>
                            <select
                                id="department"
                                name="department"
                                className="w-full border border-gray-300 p-2 rounded"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Department</option>
                                <option value="CSE">Computer Science and Engineering (CSE)</option>
                                <option value="ECE">Electronics and Communication Engineering (ECE)</option>
                                <option value="MATHS">Mathematics and Science</option>
                                <option value="HSS">Humanities and Social Sciences (HSS)</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
                        >
                            Submit
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default FacultyForgetPasswordPage;
