const fetchDataFromCourse = async (url, queryParams) => {
    try {
        // console.log('Fetching data with URL:', queryParams);
      const response = await fetch(url +'?'+ new URLSearchParams(queryParams), {
        method: 'GET',  // Corrected to uppercase 'GET'
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        // console.log("data",response)
        return []
        // throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      // console.log("data",data)
      return data;
    //   console.log('Data fetched successfully:', data);
      // Handle the data as needed
    } catch (error) {
      // console.error('Fetch error:', error);
      // Handle the error as needed
    }
  };
  
  const SearchFromCourse = () => {
    // Your component logic goes here
  
    return (
      <div>
        {/* Your JSX content goes here */}
      </div>
    );
  };
  
  export default SearchFromCourse;
  export { fetchDataFromCourse };
  