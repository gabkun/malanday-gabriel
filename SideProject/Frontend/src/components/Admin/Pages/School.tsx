import React, { useState } from "react";
import Sidebar from "../Sidebar";
import AddSchoolModal from "../Modals/AddSchool";

const School = () => {
    const [isAddSchoolModalOpen, setIsAddSchoolModalOpen] = useState(false);

    const openModal = () => setIsAddSchoolModalOpen(true);
    const closeModal = () => setIsAddSchoolModalOpen(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      
      {/* Modal Integration */}
      <AddSchoolModal isOpen={isAddSchoolModalOpen} onClose={closeModal} />
      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">School Dashboard</h1>
        <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add New School
      </button>

      </div>
    </div>
  );
};

export default School;
