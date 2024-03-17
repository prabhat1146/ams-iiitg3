import React, { useState } from 'react';
const BASEURL = process.env.REACT_APP_BASEURL;
const RemoveAdmin = (props) => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRemoveClick = () => {
    if(props.accessType!=='Full Access'){
      setAlert('Permission Denied !')
      return ;
    }
    setAlert()
    if(!email){
      setAlert("Email id is required !")
      return ;
    }
    const url=`${BASEURL}/admin/remove?email=${email}`
    fetch(url)
    .then((res)=>{
        if(res.ok){
            setAlert("Removed")
        }else{
            setAlert("Error")
        }
      
      
    })
    .then(()=>{

    })
    .catch((error)=>{
      console.log(error)
    })
  };

  return (
    <div className="max-w-md w-1/2 mx-auto mt-10 p-4 bg-gray-100 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Remove Admin</h1>
      <h2 className="text-lg text-red-600 font-bold mb-4">{alert}</h2>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <p className='mt-2 mb-2'>{alert}</p>
      <button
        type="button"
        onClick={handleRemoveClick}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default RemoveAdmin;
