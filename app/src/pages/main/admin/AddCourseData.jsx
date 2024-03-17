

const fetchCourseData = async (url, formData) => {
  try {
    // alert("fetching");
    // const url = '/faculty/add';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    // console.log(' course added successfully. Inserted ID:', responseData.insertedId);

  } catch (error) {
    console.error('Error adding course:', error);
    // Handle error as needed
  }
};

const AddCourseData = (props) => {
   

  return (
    <div>
      
    </div>
  );
};

export default AddCourseData;
export { fetchCourseData };
