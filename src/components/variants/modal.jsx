import React, { useState, useRef } from "react";
import { Modal } from "antd";

const ModalComponent = ({ isVisible, onClose, handleGetValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputData, setData] = useState({
    yearold: "",
    gender: "",
    allergy: "",
    disease: "",
  });

  const inputRef = useRef(null);

  const handleInput = (e) => {
    setData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGetValue(inputData); // Truyền dữ liệu lên parent
    setIsOpen(false)
    onClose();
    setData({ // Reset state
      yearold: "",
      gender: "",
      allergy: "",
      disease: "",
    });
     // Đóng modal
  };


  return (
    <Modal
      title="Provide your health information"
      open={isVisible}
      onOk={onClose}
      onCancel={onClose}
      width={600}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
         
            id="age"
            type="number"
            placeholder="Enter your age"
            value={inputData.yearold} // Liên kết với state
            onChange={handleInput}
            name="yearold"
            ref={inputRef}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="disease" className="block text-sm font-medium text-gray-700">
            Disease
          </label>
          <input
            id="disease"
            type="text"
            placeholder="Enter your disease"
            value={inputData.disease} // Liên kết với state
            onChange={handleInput}
            name="disease"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Gender<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6">
            {["Male", "Female", "Other"].map((gender) => (
              <div className="flex items-center" key={gender}>
                <input
                  type="radio"
                  id={gender}
                  name="gender"
                  value={gender}
                  checked={inputData.gender === gender} // Kiểm tra trạng thái
                  onChange={handleInput}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor={gender} className="ml-2 text-sm text-gray-700">
                  {gender}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Do you have any allergies?
          </label>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
              onClick={() => setIsOpen(true)}
            >
              Yes
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              No
            </button>
          </div>

          {isOpen && (
            <textarea
              placeholder="Please describe your allergies"
              value={inputData.allergy} // Liên kết với state
              onChange={handleInput}
              name="allergy"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-24"
            />
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalComponent;
