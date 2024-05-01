import { useEffect, useRef, useState } from "react";
import { useData } from "../../context/DataContext";
import axios from "axios";
import { useUIModal } from "../../context/UIModalContext";

const RoomAddForm = () => {
  // Context
  const { selectedHotel, selectedHotelName, flaskAPI } = useData();
  const { showToast, handleCloseModal } = useUIModal();

  // States
  const [image, setImage] = useState(null);

  // Refs
  const roomNumber = useRef(null);
  const roomType = useRef(null);
  const description = useRef(null);
  const maxOccupancy = useRef(null);
  const price = useRef(null);
  const fileInputRef = useRef(null);

  // Handler
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const route = flaskAPI + "/rooms/";
      const formData = new FormData();
      formData.append("hotelID", selectedHotel);
      formData.append("roomNumber", roomNumber.current.value);
      formData.append("roomType", roomType.current.value);
      formData.append("description", description.current.value);
      formData.append("maxOccupancy", maxOccupancy.current.value);
      formData.append("price", price.current.value);
      formData.append("image", image);
      const response = await axios.post(route, formData);
      showToast("success", response.data.message);
      handleCloseModal();
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    roomNumber.current.value = "";
    roomType.current.value = "";
    description.current.value = "";
    maxOccupancy.current.value = "";
    price.current.value = "";
    setImage(null);
  };

  return (
    <div className="h-full">
      {/* Heading */}
      <h1 className="py-4 px-10 text-lg">
        Add room to <span className="font-bold">{selectedHotelName}</span>
      </h1>
      <hr className=""></hr>
      <form onSubmit={handleSubmit} className="px-10 py-5 w-full">
        {/* Room Number and Type */}
        <div className="flex gap-2">
          <div className="mb-4">
            <label className="block mb-2">Room Number:</label>
            <input
              type="text"
              ref={roomNumber}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4 w-2/4">
            <label className="block mb-2">Room Type:</label>
            <select
              ref={roomType}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required
            >
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
              <option value="deluxe">Deluxe</option>
              <option value="standard">Standard</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <textarea
            ref={description}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            required
          ></textarea>
        </div>

        {/* Numbers */}
        <div className="flex gap-2">
          <div className="mb-4">
            <label className="block mb-2">Max Occupancy:</label>
            <input
              type="number"
              ref={maxOccupancy}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price:</label>
            <input
              type="number"
              ref={price}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required
            />
          </div>
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold">
            Upload Image:
          </label>
          <div className="flex items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="opacity-0 w-0"
              name="hotalImage"
              required
            />
            <button
              onClick={handleFileUpload}
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-md mr-2"
            >
              Choose File
            </button>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Selected File"
                className="w-24 h-12 rounded-md object-cover"
              />
            ) : (
              <span className="text-gray-500">No file chosen</span>
            )}
          </div>
        </div>

        {/* Submit Room */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-md"
          >
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomAddForm;
