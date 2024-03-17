import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePasswordForAdmin from '../verification/ChangePasswordForAdmin';
import ReactLoading from 'react-loading'
import { fetchData } from './SetFormData';

function EditProfile(props) {

    const BASEURL = process.env.REACT_APP_BASEURL

    const [adminID, setAdminID] = useState();
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState();
    const [isAdminIDEditable, setIsAdminIDEditable] = useState(false)
    const [isEmailEditable, setIsEmailEditable] = useState()
    const [isPhoneEditable, setIsPhoneEditable] = useState(false)
    const [isGenderEditable, setIsGenderEditable] = useState(false)
    const [isNameEditable, setIsNameEditable] = useState(false);
    const [changePassword, setChangePassword] = useState(false)
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();
    const [Alert, setAlert] = useState();
    const [isLoading, setIsLoading] = useState();
    const [submitButtonText, setSubmitButtonText] = useState('Submit')
    const [nameOkButtonText,setNameOkButtonText]=useState('OK');
    const [emailOkButtonText,setEmailOkButtonText]=useState('OK');
    const [adminIDOkButtonText,setAdminIDOkButtonText]=useState('OK');
    const [PhoneOkButtonText,setPhoneOkButtonText]=useState('OK');
    const [genderOkButtonText,setGenderOkButtonText]=useState('OK');
    const navigate = useNavigate();



    useEffect(() => {
        const url = `${BASEURL}/admin/find?adminID=${props.adminID}`
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return []
                }
            })
            .then((res) => {
                setAdminID(res[0].adminID)
                setEmail(res[0].email)
                setPhone(res[0].phone)
                setGender(res[0].gender);
                setName(res[0].name);
            })
            .catch((error) => {
                console.log(error);
            })
    },[])

    const handleEditableAdminID = () => {
        setIsAdminIDEditable(true);
        setAdminIDOkButtonText('OK')
    }

    const handleUpdateAdminID = () => {
        setIsAdminIDEditable(false);
        if(!adminID){
            setAlert("Admin id is required !")
            return ;
        }
        const url = `${BASEURL}/admin/update-adminid`
        const data = {
            adminID: adminID,
           
        }
        setIsLoading(true)
        fetchData(url, data)
            .then((res) => {
                console.log(res)
                if (res) {
                    setIsLoading(false)
                    setAlert("")
                    setAdminIDOkButtonText("Success !")
                } else {
                    setIsLoading(false)
                    setAlert("Failed !")
                }
            }).catch((error) => {
                setIsLoading(false)
                setAlert('Error !')
                console.log(error)
            })
        

    }
    const handleEditableName = () => {
        setIsNameEditable(true);
        setNameOkButtonText('OK')
    }

    const handleUpdateName = () => {
        setIsNameEditable(false);
        if(!name){
            setAlert("Name is required !")
            return ;
        }
        const url = `${BASEURL}/admin/update`
        const data = {
            adminID: adminID,
           name:name
        }
        setIsLoading(true)
        fetchData(url, data)
            .then((res) => {
                console.log(res)
                if (res) {
                    setIsLoading(false)
                    setAlert("")
                    setNameOkButtonText("Success !")
                } else {
                    setIsLoading(false)
                    setAlert("Failed !")
                }
            }).catch((error) => {
                setIsLoading(false)
                setAlert('Error !')
                console.log(error)
            })
    }
    const handleEditableEmail = () => {
        setIsEmailEditable(true);
        setEmailOkButtonText('OK')
    }

    const handleUpdateEmail = () => {
        setIsEmailEditable(false);
        if(!email){
            setAlert("Email is required !")
            return ;
        }
        if(!email.endsWith('@iiitg.ac.in')){
            setAlert("IIITG email-id is required !")
        }
        const url = `${BASEURL}/admin/update`
        const data = {
            adminID: adminID,
           email:email
        }
        setIsLoading(true)
        fetchData(url, data)
            .then((res) => {
                console.log(res)
                if (res) {
                    setIsLoading(false)
                    setAlert("")
                    setEmailOkButtonText("Success !")
                } else {
                    setIsLoading(false)
                    setAlert("Failed !")
                }
            }).catch((error) => {
                setIsLoading(false)
                setAlert('Error !')
                console.log(error)
            })

    }
    const handleEditablePhone = () => {
        setIsPhoneEditable(true);
        setPhoneOkButtonText('OK')
    }

    const handleUpdatePhone = () => {
        setIsPhoneEditable(false);
        if(!phone){
            setAlert("Phone No is required !")
            return ;
        }
        const url = `${BASEURL}/admin/update`
        const data = {
            adminID: adminID,
           phone:phone
        }
        setIsLoading(true)
        fetchData(url, data)
            .then((res) => {
                console.log(res)
                if (res) {
                    setIsLoading(false)
                    setAlert("")
                    setPhoneOkButtonText("Success !")
                } else {
                    setIsLoading(false)
                    setAlert("Failed !")
                }
            }).catch((error) => {
                setIsLoading(false)
                setAlert('Error !')
                console.log(error)
            })
    }
    const handleEditableGender = () => {
        setIsGenderEditable(true);
        setGenderOkButtonText('OK')
        
    }

    const handleUpdateGender = () => {
        setIsGenderEditable(false);
        if(!gender){
            setAlert("Gender  is required !")
            return ;
        }
        console.log(gender)
        if(gender!=='Male' || gender !=='Female' || gender!=='Third Gender'){
           
        }else{
            setAlert("Choose from this only ! Male,Female,Third Gender")
            return ;
        }
        const url = `${BASEURL}/admin/update`
        const data = {
            adminID: adminID,
           name:name
        }
        setIsLoading(true)
        fetchData(url, data)
            .then((res) => {
                console.log(res)
                if (res) {
                    setIsLoading(false)
                    setAlert("")
                    setGenderOkButtonText("Success !")
                } else {
                    setIsLoading(false)
                    setAlert("Failed !")
                }
            }).catch((error) => {
                setIsLoading(false)
                setAlert('Error !')
                console.log(error)
            })
    }

    const handleChangePassword = () => {
        setChangePassword(true)

    }

    const handleSubmit = () => {
        if (!oldPassword) {
            setAlert('Old password is required !')
            return;
        }
        if (!newPassword) {
            setAlert("New password is required !")
            return;
        }
        if (!confirmNewPassword) {
            setAlert("Confirm new password is required !")
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setAlert("new password and confirm new password is not same !")
            return;
        }
        const url = `${BASEURL}/admin/update-password`
        const data = {
            adminID: adminID,
            oldPassword: oldPassword,
            password: newPassword,
        }
        setIsLoading(true)
        fetchData(url, data)
            .then((res) => {
                console.log(res)
                if (res) {
                    setIsLoading(false)
                    setAlert("")
                    setSubmitButtonText("Success")
                } else {
                    setIsLoading(false)
                    setAlert("Failed !")
                }
            }).catch((error) => {
                setIsLoading(false)
                setAlert('Error !')
                console.log(error)
            })

    }

    const handleOldPassword=(e)=>{
        setOldPassword(e.target.value);
        setSubmitButtonText("Submit")
    }
    const handleNewPassword=(e)=>{
        setNewPassword(e.target.value);
        setSubmitButtonText("Submit")
    }
    const handleConfirmNewPassword=(e)=>{
        setConfirmNewPassword(e.target.value);
        setSubmitButtonText("Submit")
    }
    return (
        <div className=' w-full  flex flex-col justify-center items-center mt-8'>
            {changePassword &&


                <div className=''>
                    <div className='flex fixed top-2/4'>
                        {
                            isLoading && <ReactLoading type='spin' color='blue' />
                        }
                    </div>
                    <div className=" mx-4 px-4 w-11/12 sm:w-11/12 md:7/12 lg:1/2">
                        <label className="block text-white  ">Old Password *</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={handleOldPassword}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className=" mx-4 px-4 w-11/12 sm:w-11/12 md:7/12 lg:1/2">
                        <label className="block text-white  ">New Password *</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={handleNewPassword}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mx-4 px-4 w-11/12 sm:w-11/12 md:7/12 lg:1/2">
                        <label className="block text-white ">Confirm New Password *</label>
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={handleConfirmNewPassword}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <p className='mt-2 mb-2'>{Alert}</p>

                        <button className='bg-green-600 px-2 p-1 rounded-md mt-4' onClick={handleSubmit}>{submitButtonText}</button>
                    </div>

                </div>


            }

            {!changePassword &&
                <div className='lg:w-3/4 flex flex-col justify-center items-center '>
                    <div className='text-white lg:w-3/4'>
                        <p className='my-2'>{Alert}</p>
                        <h1>Admin ID</h1>
                        <div className='w-full'>
                            <input
                                type="text"
                                className={`lg:w-1/2 rounded-md px-4 p-1 ${isAdminIDEditable ? 'text-black' : 'text-white'}`}
                                name='adminID'
                                value={adminID}
                                disabled={!isAdminIDEditable}
                                onChange={(e) => setAdminID(e.target.value)}
                            />
                            <button onClick={handleEditableAdminID} className='bg-blue-600 m-2 px-2 p-1 rounded-md text-white'>Edit</button>
                            <button onClick={handleUpdateAdminID} className='bg-green-600 m-2 px-2 p-1 rounded-md text-white'>{adminIDOkButtonText}</button>
                        </div>
                    </div>
                    <div className='lg:w-3/4'>
                        <h2 className='text-white'>Email</h2>
                        <div className='text-white'>
                            <input
                                type="text"
                                className={`lg:w-1/2 rounded-md px-4 p-1 ${isEmailEditable ? 'text-black' : 'text-white'}`}
                                name='adminID'
                                value={email}
                                disabled={!isEmailEditable}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button onClick={handleEditableEmail} className='bg-blue-600 m-2 px-2 p-1 rounded-md text-white'>Edit</button>
                            <button onClick={handleUpdateEmail} className='bg-green-600 m-2 px-2 p-1 rounded-md text-white'>{emailOkButtonText}</button>
                        </div>
                    </div>
                    <div className='text-white lg:w-3/4'>
                        <h2>Name</h2>
                        <input
                            type="text"
                            className={`lg:w-1/2  rounded-md px-4 p-1 ${isNameEditable ? 'text-black' : 'text-white'}`}
                            name='adminName'
                            value={name}
                            disabled={!isNameEditable}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button onClick={handleEditableName} className='bg-blue-600 m-2 px-2 p-1 rounded-md text-white'>Edit</button>
                        <button onClick={handleUpdateName} className='bg-green-600 m-2 px-2 p-1 rounded-md text-white'>{nameOkButtonText}</button>
                    </div>
                    <div className='text-white lg:w-3/4'>
                        <h2>Phone</h2>
                        <input
                            type="text"
                            className={`lg:w-1/2  rounded-md px-4 p-1 ${isPhoneEditable ? 'text-black' : 'text-white'}`}
                            name='adminID'
                            value={phone}
                            disabled={!isPhoneEditable}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button onClick={handleEditablePhone} className='bg-blue-600 m-2 px-2 p-1 rounded-md text-white'>Edit</button>
                        <button onClick={handleUpdatePhone} className='bg-green-600 m-2 px-2 p-1 rounded-md text-white'>{PhoneOkButtonText}</button>
                    </div>
                    <div className='text-white lg:w-3/4'>
                        <h2>Gender</h2>
                        <input
                            type="text"
                            className={`lg:w-1/2 rounded-md px-4 p-1 ${isGenderEditable ? 'text-black' : 'text-white'}`}
                            name='adminID'
                            value={gender}
                            disabled={!isGenderEditable}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <button onClick={handleEditableGender} className='bg-blue-600 m-2 px-2 p-1 rounded-md text-white'>Edit</button>
                        <button onClick={handleUpdateGender} className='bg-green-600 m-2 px-2 p-1 rounded-md text-white'>{genderOkButtonText}</button>
                    </div>

                    <div className='mt-8 text-white lg:w-3/4'>
                        {/* <h1>hi</h1> */}
                        <div>
                            <button className='bg-blue-600 rounded-md px-2 p-1 ' onClick={handleChangePassword}>Change Password</button>
                        </div>
                    </div>

                </div>
            }

        </div>
    );
}

export default EditProfile;