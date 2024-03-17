// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import {Error,Home,Layout, AdminLogin, FacultyLogin, StudentLogin, StudentSignUp,FacultyForgetPasswordPage,StudentForgotPassword,ForgotPassword,ResetPassword, FacultyDashBoard, VerifyEmail, ChangePasswordForAdmin, AdminPasswordResetLink} from './AllPages';
import {AdminProfile,StudentDashboard,StudentsPrivateRoutes,AdminPrivateRoutes, EmailVerificationLink,VerifyAndSetPassword,AdminSignUp} from './AllPages';
import FacultyPrivateRoutes from './pages/main/faculty/facultyPrivateRoutes/FacultyPrivateRoutes';

const router=createBrowserRouter(
   
   createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
         <Route path='' element={<Home/>}></Route>
         <Route path='verification/emailVerificationLink' element={<EmailVerificationLink/>}/>
         <Route path='verification/verifyAndSetpassword' element={<VerifyAndSetPassword/>}/>
         <Route path='admin/login' element={<AdminLogin/>}></Route>
         <Route path='admin/signup' element={<AdminSignUp/>}></Route>
         
         <Route path='admin' element={<AdminPrivateRoutes/>}>
            <Route path='profile' element={<AdminProfile/>}/>

         </Route>
         <Route path='admin/profile' element={<AdminProfile/>}></Route>
         <Route path='admin/forgot-password' element={<ForgotPassword/>}></Route>
         <Route path='admin/verification/reset-password' element={<ResetPassword/>}></Route>
         <Route path='admin/verification/change-password' element={<ChangePasswordForAdmin/>}></Route>
         <Route path='admin/verification/admin-password-reset-link' element={<AdminPasswordResetLink/>}></Route>
         <Route path='student/login' element={<StudentLogin/>}></Route>
         <Route path='student/signup' element={<StudentSignUp/>}></Route>
         <Route path='student' element={<StudentsPrivateRoutes/>}>
            <Route path='profile' element={<StudentDashboard/>}/>
          </Route>
         {/* <Route path='student/profile' element={<StudentDashboard/>}></Route> */}
         <Route path='student/forgot-password' element={<StudentForgotPassword/>}></Route>
         <Route path='student/reset-password' element={<ResetPassword/>}></Route>
         <Route path='student/verification/verifyEmailpAndSetPassword' element={<VerifyEmail/>}></Route>
         <Route path='faculty/login' element={<FacultyLogin/>}></Route>
         {/* <Route path='faculty/login' element={<FacultyManagement/>}></Route> */}
         <Route path='faculty' element={<FacultyPrivateRoutes/>}>
            <Route path='profile' element={<FacultyDashBoard/>}></Route>
         </Route>
         <Route path='faculty/forgot-password' element={<FacultyForgetPasswordPage/>}></Route>
         <Route path='faculty/reset-password' element={<ResetPassword/>}></Route>
         <Route path='faculty/verification/verifyEmailpAndSetPassword' element={<VerifyEmail/>}></Route>
         <Route path='/error' element={<Error/>}></Route>
         <Route path='*' element={<Error/>}></Route>

      </Route>
   )
)

// const router=createBrowserRouter([{
//    path:"/",
//    element:<Layout/>,
//    children:[{
//       path:"",
//       element:<Home/>
//    },{
//       path:"user",
//       // element:<User/>,
//       children:[{
//          path:"signup",
//          element:<SignUp/>
//       },{
//          path:"login",
//          element:<Login/>
//       }]
//    },{
//       path:"About",
//       element:<About/>
//    },{
//       path:"contact",
//       element:<Contact/>
//    }]
// }])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode >
   <RouterProvider router={router}/>
 </React.StrictMode>
//  <React.StrictMode basename={'https://prabhat1146.github.io/iiitg'}>
//    <RouterProvider router={router}/>
//  </React.StrictMode>
);