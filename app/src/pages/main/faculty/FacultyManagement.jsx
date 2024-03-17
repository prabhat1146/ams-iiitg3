import React, { useState } from 'react';

const ManageAttendancePage = () => {
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [attendanceRollNo, setAttendanceRollNo] = useState('');
  const [editAttendanceRollNo, setEditAttendanceRollNo] = useState('');
  const [penaltyRollNo, setPenaltyRollNo] = useState('');
  const [otp, setOtp] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleDegreeSelect = (degree) => {
    setSelectedDegree(degree);
    setSelectedYear('');
    setSelectedSemester('');
    setSelectedCourse('');
    setAttendanceRollNo('');
    setEditAttendanceRollNo('');
    setPenaltyRollNo('');
    setOtp('');
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    validateFields();
  };

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester);
    validateFields();
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    validateFields();
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    validateFields();
  };

  const handleFeedbackChange = (e) => {
    setFeedbackText(e.target.value);
    validateFields();
  };

  const handleAttendanceRollNoChange = (e) => {
    setAttendanceRollNo(e.target.value);
    validateFields();
  };

  const handleEditAttendanceRollNoChange = (e) => {
    setEditAttendanceRollNo(e.target.value);
    validateFields();
  };

  const handlePenaltyRollNoChange = (e) => {
    setPenaltyRollNo(e.target.value);
    validateFields();
  };

  const handleGenerateOtp = () => {
    // Generate OTP logic (Replace with your OTP generation code)
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp);
  };

  // ... (previous code)

  const validateFields = () => {
    // Check if all required fields are filled
    const isFieldsFilled =
      selectedYear &&
      selectedSemester &&
      selectedCourse &&
      ((selectedOption === 'reviewAttendance' && attendanceRollNo !== '') ||
        (selectedOption === 'editAttendance' && editAttendanceRollNo !== '') ||
        (selectedOption === 'givePenalty' && penaltyRollNo !== ''));

    // Enable or disable submit button based on field validation
    setIsSubmitEnabled(isFieldsFilled);
  };

  // ... (remaining code)


  const handleSubmit = () => {
    // Perform action based on the selected option and entered data
    if (selectedOption === 'takeAttendance') {
      // Handle Take Attendance action
      // ...
    } else if (selectedOption === 'reviewAttendance') {
      // Handle Review Attendance action
      // ...
    } else if (selectedOption === 'editAttendance') {
      // Handle Edit Attendance action
      // ...
    } else if (selectedOption === 'givePenalty') {
      // Handle Give Penalty action
      // ...
    } else if (selectedOption === 'feedback') {
      // Handle Feedback action
      // ...
    }

    // Clear input fields after submission
    setSelectedYear('');
    setSelectedSemester('');
    setSelectedCourse('');
    setFeedbackText('');
    setAttendanceRollNo('');
    setEditAttendanceRollNo('');
    setPenaltyRollNo('');
    setOtp('');
  };

  const renderSemesterOptions = () => {
    const semesterOptions = [];
    for (let i = 1; i <= (selectedDegree === 'phd' ? 1 : 8); i++) {
      semesterOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return semesterOptions;
  };

  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let i = 2013; i <= 2024; i++) {
      yearOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return yearOptions;
  };

  const courses = [
    { id: 1, name: 'Course A' },
    { id: 2, name: 'Course B' },
    { id: 3, name: 'Course C' },
    // Add more courses as needed
  ];

  // Assuming you have a state to hold the selected course
  // const [selectedCourse, setSelectedCourse] = useState('');

  // Function to handle course selection
  const handleCourseSelect1 = (e) => {
    const selectedCourseId = e.target.value;
    // Find the selected course based on the ID
    const selectedCourseObject = courses.find(course => course.id === parseInt(selectedCourseId, 10));
    // Handle the selected course as needed
    console.log('Selected Course:', selectedCourseObject);
    // Update the state if needed
    setSelectedCourse(selectedCourseObject);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto mt-8 bg-gradient-to-r ">
      <h2 className="text-2xl font-bold mb-6">Manage Attendance</h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-1">Select Degree</label>
        <select
          onChange={(e) => handleDegreeSelect(e.target.value)}
          value={selectedDegree}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select Degree</option>
          <option value="btech">B.Tech (8 Semesters)</option>
          <option value="mtech">M.Tech (4 Semesters)</option>
          <option value="phd">Ph.D (No Semesters)</option>
        </select>
      </div>

      {selectedDegree && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-1">Select Admission Year</label>
            <select
              onChange={(e) => handleYearSelect(e.target.value)}
              value={selectedYear}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Year</option>
              {renderYearOptions()}
            </select>
          </div>

          {!selectedDegree.includes('phd') && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">Select Semester</label>
              <select
                onChange={(e) => handleSemesterSelect(e.target.value)}
                value={selectedSemester}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Semester</option>
                {renderSemesterOptions()}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-1">Select Department</label>
            <select
              onChange={(e) => handleCourseSelect(e.target.value)}
              value={selectedCourse}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science (CSE)</option>
              <option value="ECE">Electronics and Communication (ECE)</option>
              <option value="HSS">Humanities & Social Science  (HSS)</option>
              <option value="Math">Mathematics</option>
              <option value="Science">Science</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm mb-1">Select Course:</label>
            <select
              name="selectedCourseId"
              onChange={handleCourseSelect}
              value={selectedCourse ? selectedCourse.id : ''}
              className="p-2 border block w-full"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>


          {selectedOption === 'takeAttendance' && (
            <div className="mb-4">
              <button
                onClick={handleGenerateOtp}
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:border-blue-300"
              >
                Generate OTP
              </button>
              {otp && (
                <div className="mt-2">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Generated OTP</label>
                  <input
                    type="text"
                    value={otp}
                    readOnly
                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex space-x-4 mb-4">
            {selectedOption === 'reviewAttendance' ||
              selectedOption === 'editAttendance' ||
              selectedOption === 'givePenalty' ? (
              <button
                onClick={handleSubmit}
                disabled={!isSubmitEnabled}
                className={`bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:border-blue-300 ${!isSubmitEnabled && 'opacity-50 cursor-not-allowed'
                  }`}
              >
                Submit
              </button>
            ) : null}

            <button
              onClick={() => handleOptionSelect('takeAttendance')}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Take Attendance
            </button>

            <button
              onClick={() => handleOptionSelect('reviewAttendance')}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Review Attendance
            </button>

            <button
              onClick={() => handleOptionSelect('editAttendance')}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Edit Attendance
            </button>

            <button
              onClick={() => handleOptionSelect('givePenalty')}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Give Penalty
            </button>
          </div>
        </>
      )}

      {selectedOption === 'reviewAttendance' && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-1">Enter Roll No</label>
          <input
            type="text"
            value={attendanceRollNo}
            onChange={handleAttendanceRollNoChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter roll number for review"
          />
        </div>
      )}

      {selectedOption === 'editAttendance' && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-1">Enter Roll No</label>
          <input
            type="text"
            value={editAttendanceRollNo}
            onChange={handleEditAttendanceRollNoChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter roll number for editing"
          />
        </div>
      )}

      {selectedOption === 'givePenalty' && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-1">Enter Roll No</label>
          <input
            type="text"
            value={penaltyRollNo}
            onChange={handlePenaltyRollNoChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter roll number for penalty"
          />
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={() => handleOptionSelect('feedback')}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Feedback
        </button>
      </div>

      {selectedOption === 'feedback' && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-1">Feedback</label>
          <textarea
            value={feedbackText}
            onChange={handleFeedbackChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your feedback..."
          />
        </div>
      )}
    </div>
  );
};

export default ManageAttendancePage;
