import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axiosInstance from '../../../api/axiosConfig';
import axios from 'axios';

interface Room {
  _id: string;
  roomName: string;
  type: string;
  price: number;
  roomSize: number;
  maxGuests: number;
  description: string;
  amenities: string[];
  available: boolean;
}

const Rooms: React.FC = () => {
  const [formData, setFormData] = useState({
    roomName: '',
    type: '',
    price: '',
    roomSize: '', 
    maxGuests: '',
    description: '',
    amenities: [] as string[],
    available: false,
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axiosInstance.post('/api/room/register', formData);
      setSuccessMessage(response.data.message);
      
      setFormData({
        roomName: '',
        type: '',
        price: '',
        roomSize: '', 
        maxGuests: '',
        description: '',
        amenities: [],
        available: false,
      });
      setShowModal(false); 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || 'Something went wrong!');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get('/api/room/');
        setRooms(response.data.rooms);
      } catch (err) {
        setError('Failed to load rooms');
      }
    };

    fetchRooms();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Manage Rooms</h2>

      <button 
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all">
        Add New Room
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Add a New Room</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Room Name</label>
                <input
                  type="text"
                  name="roomName"
                  value={formData.roomName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Enter room name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Type</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                  <option value="Family">Family</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Enter price"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Room Size</label>
                <input
                  type="text"
                  name="roomSize"
                  value={formData.roomSize}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Enter room size"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Max Guests</label>
                <input
                  type="text"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Enter max guests"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Enter description"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Amenities</label>
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities.join(', ')}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      amenities: e.target.value.split(',').map((item) => item.trim()),
                    });
                  }}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Enter amenities separated by commas"
                />
              </div>

              <div className="mb-4 flex items-center">
                <label className="mr-2 text-sm font-medium text-gray-700">Available</label>
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleInputChange}
                  className="h-4 w-4 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>

            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
          </div>
        </div>
      )}

<div className="mt-6">
  <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
    <thead className="bg-gray-100">
      <tr>
        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Room Name</th>
        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Type</th>
        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Price</th>
        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Size</th>
        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Max Guests</th>
        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Availability</th>
        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Action</th>
      </tr>
    </thead>
    <tbody>
      {rooms.map((room) => (
        <tr key={room._id} className="border-t">
          <td className="py-3 px-4">{room.roomName}</td>
          <td className="py-3 px-4">{room.type}</td>
          <td className="py-3 px-4">{room.price}</td>
          <td className="py-3 px-4">{room.roomSize}</td>
          <td className="py-3 px-4">{room.maxGuests}</td>
          <td className="py-3 px-4">{room.available ? 'Available' : 'Not Available'}</td>
          <td className="py-3 px-4">
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"

              >
                View
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"

              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"

              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default Rooms;