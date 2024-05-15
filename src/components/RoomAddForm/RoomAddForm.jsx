import { useRef, useState } from "react";
import { useData } from "../../context/DataContext";
import axios from "axios";
import { useUIModal } from "../../context/UIModalContext";

const RoomAddForm = () => {
  // Context
  const { selectedHotel, fetchRoomsByHotelId, selectedHotelData, flaskAPI } =
    useData();
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

  const handleFileUpload = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !roomNumber.current.value ||
        !roomType.current.value ||
        !description.current.value ||
        !maxOccupancy.current.value ||
        !price.current.value
      ) {
        showToast("error", "One or more field missing.");
      } else {
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
        if (response.status == 200) {
          fetchRoomsByHotelId();
          showToast("success", response.data.message);
          handleCloseModal();
          resetForm();
        } else {
          showToast("error", "Error adding room");
        }
      }
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
      <h1 className="py-4 px-8 text-2xl bg-indigo-800 font-semibold text-indigo-50">
        Add a Room to{" "}
        <span className="font-bold">
          {selectedHotelData && selectedHotelData.name}
        </span>
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="px-8 py-6 bg-white rounded-lg shadow-md"
      >
        {/* Room Number and Type */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label className="block mb-1 text-gray-700">Room Number:</label>
            <input
              type="text"
              ref={roomNumber}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 text-gray-700">Room Type:</label>
            <select
              ref={roomType}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
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
        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Description:</label>
          <textarea
            ref={description}
            className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
            required
          ></textarea>
        </div>

        {/* Numbers */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label className="block mb-1 text-gray-700">Max Occupancy:</label>
            <input
              type="number"
              ref={maxOccupancy}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 text-gray-700">Price:</label>
            <input
              type="number"
              ref={price}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
        </div>

        {/* Image */}
        <div className="mb-6">
          <label className="block mb-1 text-lg font-semibold text-gray-700">
            Upload Image:
          </label>
          <div className="flex items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="opacity-0 w-0"
              name="hotelImage"
              required
            />
            <button
              onClick={handleFileUpload}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md mr-2 focus:outline-none focus:bg-indigo-600"
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
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-indigo-600"
          >
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomAddForm;
