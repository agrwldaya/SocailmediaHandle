import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AuthSliceActions } from '../store/authstore';
import { useNavigate } from 'react-router';

function Login({role}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const  navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted', { email, password });
   
    try {
        const response = await axios.post("https://socailmediahandle.onrender.com/api/auth/login",{email, password,role})
        if(response.data.success){
             console.log(response.data)
            toast.success(response.data.message);
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("role",response.data.role)
            localStorage.setItem("username",response.data.username)
            localStorage.setItem("email",response.data.email)
            dispatch(AuthSliceActions.login());

            if(role == "admin"){
                navigate('/admin');
            }else{
                navigate('/welcome');
            }
            
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        console.log(error)
        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error('An error occurred during login');
          }
    }

  };

  return (
    <div className="container mx-auto mt-8 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login as {role}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

