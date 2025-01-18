 import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import UserSubmissionForm from './components/User/UserSubmissionPage'
import AdminDashboard from './components/Admin/AdminDashboard'
import toast, { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Registration';
import Welcome from './components/WelcomePage';
import { useDispatch } from 'react-redux';
import { AuthSliceActions } from './store/authstore';
 export default function App() {
  const dispatch = useDispatch()
  const token =  localStorage.getItem("token")
  const role =  localStorage.getItem("role")
  const navigate = useNavigate();

  useEffect(()=>{
    if(token){
      dispatch(AuthSliceActions.login());
     }else{
       dispatch(AuthSliceActions.logout())
       navigate('/welcome');
     }
  },[])

   return (
      <div>
      <Header/>
      <div className="container mx-auto p-4">
      <Toaster/>
       <Routes>
        <Route path='/createpost' element=<UserSubmissionForm/> /> 
        <Route path='/login-user' element={<Login role="user" />} /> 
        <Route path="/login-admin" element={<Login role="admin" />} />
        <Route path='/register' element=<Register/> /> 
        <Route path='/welcome' element=<Welcome/> />
        <Route path='/' element=<Welcome/> />
        <Route path='/admin' element=<AdminDashboard/> /> 
       </Routes>
     </div>
     </div>
   )
 }
 