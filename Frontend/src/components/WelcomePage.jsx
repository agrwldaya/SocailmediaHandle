import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const { isAuthenticated } = useSelector((state) => state.authstore);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  // Function to fetch posts
  const getPost = async () => {
    try {
      const response = await axios.get(
        "https://socailmediahandle.onrender.com/api/post/myallpost",{headers: {token}}
      );
      if (response.data.success) {
        setPosts(response.data.allpost);
          
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error); // Log error for debugging
      toast.error("Post fetching error...");
    }
  };

  // Use useEffect to avoid infinite loop
  useEffect(() => {
    if (isAuthenticated) {
      getPost();
    }else{
        setPosts([]);
    }
  }, [isAuthenticated]); // Only run when authentication status changes

  const handleUpload = () => {
    if (isAuthenticated) {
      navigate('/createpost');
    } else {
      navigate('/login-user');
      toast.success('Login Please!!');
    }
  };

  return (
    <div className=" flex flex-col  bg-gray-100">
        {isAuthenticated?<h1 className="text-3xl  text-center mt-5   px-4">
        Hello {username}!!
      </h1>:""}
       
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 px-4">
        Welcome to W3 Business Private Limited Social Media Page
      </h1>
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Post your Image
      </button>
      {/* Display posts if available */}
      <div className="mt-8  mx-4">

      <p className='mb-5 font-bold text-xl'>Your Posts</p>
      {posts.length === 0 ? (
        <p className="text-gray-600">No submissions yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-xl shadow-md   overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.name}</h3>
                <p className="text-gray-600 mb-4">{post.socialMediaHandle}</p>
                
                <div className="grid grid-cols-2 gap-2  ">
                  {post.images.map((image, index) => (
                    <div key={index} className="w-full aspect-square">
                      <img
                        src={image}
                        alt={`Upload by ${post.name}`}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-sm text-gray-500">
                  Submitted: {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
    </div>
  );
  
}

export default Welcome;
