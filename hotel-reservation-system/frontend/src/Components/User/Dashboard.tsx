import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosConfig';

interface Room {
  _id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  maxGuests: number;
}

interface Guest {
  name: string;
  contactNumber: string;
}

const UserHomepage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({
    userId: '',
    checkInTime: '',
    checkOutTime: '',
    guests: [{ name: '', contactNumber: '' }] as Guest[],
    totalPrice: 0,
    status: 'Reserved', 
  });
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get<{ rooms: Room[] }>('/api/room/');
        const availableRooms = response.data.rooms.filter((room) => room.available);
        setRooms(availableRooms);
      } catch (err) {
        setError('Failed to fetch rooms.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const fetchUserData = async () => {
        try {
          const response = await axiosInstance.get(`/api/auth/${storedUserId}`);
          setFormData((prev) => ({ ...prev, userId: response.data.user.id }));
        } catch (err) {
          setError('Failed to fetch user data. Please try again later.');
        }
      };
      fetchUserData();
    } else {
      console.error('No user ID found in localStorage.');
      setError('No user ID found. Please log in again.');
    }
  }, []);

  const openModal = (room: Room) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRoom(null);
    setFormData((prev) => ({
      ...prev,
      checkInTime: '',
      checkOutTime: '',
      guests: [{ name: '', contactNumber: '' }],
    }));
    setBookingError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const updatedGuests = [...formData.guests];
      updatedGuests[index] = { ...updatedGuests[index], [name]: value };
      setFormData((prev) => ({ ...prev, guests: updatedGuests }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitBooking = async () => {
    if (!selectedRoom) return;

    const payload = {
      ...formData,
      roomId: selectedRoom._id,
      totalPrice: selectedRoom.price * formData.guests.length, 
    };

    try {
      const response = await axiosInstance.post('/api/rent/register', payload);
      alert('Booking successful: ' + response.data.message);
      closeModal();
    } catch (err: any) {
      setBookingError(err.response?.data?.error || 'Failed to book the room.');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center">Loading rooms...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Available Rooms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow"
          >
            <h2 className="text-lg font-semibold">{room.name}</h2>
            <p className="text-gray-600">{room.description}</p>
            <p className="text-blue-600 font-bold mt-2">₱{room.price.toLocaleString()}</p>
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={() => openModal(room)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Book {selectedRoom.name}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">User ID</label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Check-In Time</label>
              <input
                type="datetime-local"
                name="checkInTime"
                value={formData.checkInTime}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Check-Out Time</label>
              <input
                type="datetime-local"
                name="checkOutTime"
                value={formData.checkOutTime}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Guests</label>
              {formData.guests.map((guest, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Guest Name"
                    value={guest.name}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={guest.contactNumber}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full border p-2 rounded mt-2"
                  />
                </div>
              ))}
              <button
                className="text-blue-500"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    guests: [...prev.guests, { name: '', contactNumber: '' }],
                  }))
                }
              >
                Add Another Guest
              </button>
            </div>
            {bookingError && <p className="text-red-500 text-sm mb-4">{bookingError}</p>}
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={submitBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHomepage;