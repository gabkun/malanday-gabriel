import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axiosInstance from "../../../../api/axiosConfig";
import axios from "axios";

interface AddClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddClassroomModal: React.FC<AddClassroomModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    school_id: "",
    classroom_number: "",
    subject: "",
    teacher: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [schools, setSchools] = useState<any[]>([]); // List of schools for the select dropdown

  useEffect(() => {
    // Fetch schools from the backend
    const fetchSchools = async () => {
      try {
        const response = await axiosInstance.get("/api/school/schools"); // Adjust endpoint to your API
        setSchools(response.data.schools);
      } catch (error) {
        console.error("Error fetching schools:", error);
        setError("Failed to load schools.");
      }
    };
    fetchSchools();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      console.log("Form Data being sent:", formData);
      const response = await axiosInstance.post("/api/classrooms", formData); // Adjust endpoint to your API
      console.log("Response Data:", response.data);
      setSuccessMessage(response.data.message);

      // Clear form data after successful submission
      setFormData({
        school_id: "",
        classroom_number: "",
        subject: "",
        teacher: "",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
        setError(error.response?.data?.error || "Something went wrong!");
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Classroom</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        {successMessage && <p className="text-green-500 mb-3">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="school_id" className="block text-sm font-medium text-gray-700">
              School
            </label>
            <select
              name="school_id"
              id="school_id"
              value={formData.school_id}
              onChange={handleSelectChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a School</option>
              {schools.map((school) => (
                <option key={school._id} value={school._id}>
                  {school.school_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="classroom_number" className="block text-sm font-medium text-gray-700">
              Classroom Number
            </label>
            <input
              type="text"
              name="classroom_number"
              id="classroom_number"
              value={formData.classroom_number}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">
              Teacher (Optional)
            </label>
            <input
              type="text"
              name="teacher"
              id="teacher"
              value={formData.teacher}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Classroom
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

export default AddClassroomModal;
