import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function UserSubmissionForm() {
  const [name, setName] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [images, setImages] = useState([]);

  const { isAuthenticated } = useSelector((state) => state.authstore);
  const navigate = useNavigate();

  const token = localStorage.getItem("token")
  
  if(!isAuthenticated){
    navigate('/welcome')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialMediaHandle', socialMedia);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await axios.post('http://localhost:4000/api/post/createpost', formData ,{headers:{token}});
      console.log(response)
      if (response.data.success) {
        toast.success('Submission successful!');
        setName('');
        setSocialMedia('');
        setImages([]);
        navigate('/welcome');
      } else {
        toast.error('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2 font-bold">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="socialMedia" className="block mb-2 font-bold">Social Media Handle:</label>
        <input
          type="text"
          id="socialMedia"
          value={socialMedia}
          onChange={(e) => setSocialMedia(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="images" className="block mb-2 font-bold">Upload Images:</label>
        <input
          type="file"
          id="images"
          onChange={(e) => setImages(e.target.files)}
          multiple
          accept="image/*"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
       
    </form>
  );
}

export default UserSubmissionForm;

