import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Display success message
const handleSuccess = (message) => {
  toast.success(`Success: ${message}`, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

function handleError(errorMessage) {
  toast.error(`Error: ${errorMessage}`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
const fetchData = async (url, formData,message,showToast) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("success")
      
      if(showToast)
      {
        handleSuccess(message);
      }
      return true
    } else {
      if(showToast){
        handleError("failed");
      }
      return false
      // throw new Error(`HTTP error! Status: ${response.status}`);
      
    }
  } catch (error) {
    console.error('Error:', error);
    handleError("Exception ocuur");
  }
};

const SetFormData = (props) => {
  return (
    <div>
      {/* Your component JSX goes here */}
    </div>
  );
};

export default SetFormData;
export { fetchData };
