import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 const token = localStorage.getItem("token")
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/post/getallpost'  ,{headers:{token}});
   
      setUsers(response.data.allpost);
      setError('');
    } catch (err) {
      setError('Error fetching users');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <h2 className="text-2xl text-center  font-semibold mb-6">All Posts</h2>
      <hr />
      {users.length === 0 ? (
        <p className="text-gray-600">No submissions yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  mt-5  lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                <p className="text-gray-600 mb-4">{user.socialMediaHandle}</p>
                
                <div className="grid grid-cols-2 gap-2">
                  {user.images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={image}
                        alt={`Upload by ${user.name}`}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-sm text-gray-500">
                  Submitted: {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;