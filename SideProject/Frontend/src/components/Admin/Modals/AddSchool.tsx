import React, { useState, ChangeEvent, FormEvent } from "react";
import axiosInstance from "../../../../api/axiosConfig";
import axios from "axios";

interface AddSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSchoolModal: React.FC<AddSchoolModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    school_name: "",
    school_address: "",
    school_email: "",
    school_password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      console.log("Form Data being sent:", formData); // Log form data before sending
      const response = await axiosInstance.post("/api/school/register", formData);
      console.log("Response Data:", response.data); // Log the server response
      setSuccessMessage(response.data.message);
      
      // Clear form data after successful submission
      setFormData({
        school_name: "",
        school_address: "",
        school_email: "",
        school_password: "",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data); // Log detailed error response
        setError(error.response?.data?.error || "Something went wrong!");
      } else {
        console.error("Unexpected error:", error); // Log unexpected errors
        setError("An unexpected error occurred.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New School</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        {successMessage && <p className="text-green-500 mb-3">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="school_name" className="block text-sm font-medium text-gray-700">
              School Name
            </label>
            <input
              type="text"
              name="school_name"
              id="school_name"
              value={formData.school_name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="school_address" className="block text-sm font-medium text-gray-700">
              School Address
            </label>
            <input
              type="text"
              name="school_address"
              id="school_address"
              value={formData.school_address}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="school_email" className="block text-sm font-medium text-gray-700">
              School Email
            </label>
            <input
              type="email"
              name="school_email"
              id="school_email"
              value={formData.school_email}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="school_password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="school_password"
              id="school_password"
              value={formData.school_password}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add School
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchoolModal;
