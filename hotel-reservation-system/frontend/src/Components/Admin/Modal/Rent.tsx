import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../api/axiosConfig';

interface Guest {
  _id: string;
  name: string;
  contactNumber: string;
}

interface Room {
  _id: string;
  roomName: string;
  type: string;
  price: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Rental {
  _id: string;
  userId: User;
  roomId: Room;
  checkInTime: string;
  checkOutTime: string;
  status: string;
  totalPrice: number;
  guests: Guest[];
}

const Rent: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axiosInstance.get('/api/rent'); // Replace with your API endpoint
        setRentals(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching rentals:', err);
        setError('Failed to fetch rentals. Please try again.');
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  const handleViewRenter = async (roomId: string) => {
    try {
      const response = await axiosInstance.get(`/api/rent/${roomId}`);
      if (response.data) {
        setSelectedRental(response.data);
      } else {
        setSelectedRental(null);
      }
      setModalVisible(true);
    } catch (err) {
      console.error('Error fetching renter details:', err);
      setSelectedRental(null);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRental(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="ml-64 mt-16 p-6">
      <h1 className="text-2xl font-bold">Rents</h1>
      <p>Manage all Rents here.</p>

      {rentals.length > 0 ? (
        <table className="table-auto w-full mt-6 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Room</th>
              <th className="border border-gray-300 px-4 py-2">Check-In</th>
              <th className="border border-gray-300 px-4 py-2">Check-Out</th>
              <th className="border border-gray-300 px-4 py-2">Guests</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental._id}>
                <td className="border border-gray-300 px-4 py-2">{rental.userId?.name || 'Unknown'}</td>
                <td className="border border-gray-300 px-4 py-2">{rental.roomId?.roomName || 'Unknown'}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(rental.checkInTime).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(rental.checkOutTime).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {rental.guests.map((guest) => guest.name).join(', ')}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ₱{rental.totalPrice.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {rental.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleViewRenter(rental._id)}
                  >
                    View Renter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rentals found.</p>
      )}

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-bold mb-4">Renter Details</h2>
            {selectedRental ? (
              <div>
                <p><strong>User:</strong> {selectedRental.userId.name}</p>
                <p><strong>Email:</strong> {selectedRental.userId.email}</p>
                <p><strong>Guests:</strong> {selectedRental.guests.map((guest) => guest.name).join(', ')}</p>
              </div>
            ) : (
              <p className="text-gray-700">No Renter Available at the moment</p>
            )}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rent;
