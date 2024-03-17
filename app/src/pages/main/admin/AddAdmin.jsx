import React, { useState } from 'react';
import { fetchData } from './SetFormData';
const BASEURL = process.env.REACT_APP_BASEURL;
const AddAdmin = (props) => {
  const[Alert,setAlert]=useState();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    accessType: 'Full Access', // Default value for accessType
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    if(props.accessType!=='Full Access'){
      setAlert('Permission Denied !')
      return ;
    }
    setAlert()
    // console.log("access",props.accessType)
    if(!formData.name || !formData.email  || !formData.password){
        setAlert("Mendatory fields are required")
        return ;
    }

    if(!formData.email.endsWith("@iiitg.ac.in")){
      setAlert("IIITG email is required !")
      return ;
    }
    const url=`${BASEURL}/admin/add`
    fetchData(url,formData,'Added',true)
    .then((res)=>{
      // console.log('reee',res)
      
    })
    .then(()=>{

    })
    .catch((error)=>{
      console.log(error)
    })
  };

  return (
    <div className="max-w-md w-11/12 lg:1/2 mx-auto mt-10 p-4 bg-gray-100 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Add New Admin</h1>
      <form className=''>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Access Type </label>
          <select
            name="accessType"
            value={formData.accessType}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="Full Access">Full Access</option>
            <option value="NO">No</option>
            {/* Add more options if needed */}
          </select>
        </div>
        <p className='mt-2 mb-2 text-red-600'>{Alert}</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
        
      </form>
    </div>
  );
};

export default AddAdmin;
