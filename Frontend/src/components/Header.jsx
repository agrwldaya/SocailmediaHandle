import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { AuthSliceActions } from '../store/authstore';
import toast from 'react-hot-toast';

function Header() {
    const token = localStorage.getItem("token")
     
    const {isAuthenticated}  = useSelector((state)=>state.authstore)
    const dispatch = useDispatch()
    const Navigate = useNavigate();
    

    const HandleLogout = ()=>{
        toast.success("Logout Successfully!");
        dispatch(AuthSliceActions.logout());
        localStorage.clear();
        Navigate('/')
    }
    
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">W3 Social Media</h1>
        {!isAuthenticated?
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/login-admin" className="hover:underline">Login as admin</Link></li>
            <li><Link to="/login-user" className="hover:underline">Login</Link></li>
            <li><Link to="/register" className="hover:underline">Registration</Link></li>
          </ul>
        </nav> :  
         <nav>
         <ul className="flex space-x-4">
            <FaUser />
            <button onClick={HandleLogout}>Logout</button>
         </ul>
       </nav>
    }
      </div>
    </header>
  );
}

export default Header;

