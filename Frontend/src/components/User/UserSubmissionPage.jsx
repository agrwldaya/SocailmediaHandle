import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function UserSubmissionForm() {
  const [name, setName] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [images, setImages] = useState([]);

  const { isAuthenticated } = useSelector((state) => state.authstore);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/welcome');
    }
  }, [isAuthenticated, navigate]);

  // Handle file input change with validation
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024  
    );

    if (validFiles.length < files.length) {
      toast.error('Some files were not valid (must be images under 5MB).');
    }
    setImages(validFiles);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', name);
    formData.append('socialMediaHandle', socialMedia);

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post(
        'https://socailmediahandle.onrender.com/api/post/createpost',
        formData,
        {headers: {token}}
      );

      if (response.data.success) {
        toast.success('Submission successful!', { position: 'top-right' });
        setName('');
        setSocialMedia('');
        setImages([]);
        navigate('/welcome');
      } else {
        toast.error('Submission failed. Please try again.', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred.', { position: 'top-right' });
      } else {
        toast.error('Network error. Please check your connection.', { position: 'top-right' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2 font-bold">Name:</label>
        <input
          type="text"
          id="name"
          aria-label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500"
        />
      </div>
      <div>
        <label htmlFor="socialMedia" className="block mb-2 font-bold">Social Media Handle:</label>
        <input
          type="text"
          id="socialMedia"
          aria-label="Social Media Handle"
          value={socialMedia}
          onChange={(e) => setSocialMedia(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500"
        />
      </div>
      <div>
        <label htmlFor="images" className="block mb-2 font-bold">Upload Images:</label>
        <input
          type="file"
          id="images"
          aria-label="Upload Images"
          onChange={handleImageChange}
          multiple
          accept="image/*"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default UserSubmissionForm;
