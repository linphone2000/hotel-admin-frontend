import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useData } from "../context/DataContext";
import { useUIModal } from "../context/UIModalContext";
import Spinner from "../components/Spinner/Spinner";

const RoomEdit = () => {
  // Context
  const {
    selectedRoomData,
    selectedHotelData,
    flaskAPI,
    roomDataLoading,
    fetchRoomsByHotelId,
  } = useData();
  const { showToast, handleCloseModal } = useUIModal();

  // States
  const [image, setImage] = useState(null); // New
  const [roomImage, setRoomImage] = useState(null); // Previous

  // Refs
  const roomNumber = useRef(null);
  const roomType = useRef(null);
  const description = useRef(null);
  const maxOccupancy = useRef(null);
  const price = useRef(null);
  const fileInputRef = useRef(null);

  // Effect to preload image
  useEffect(() => {
    if (selectedRoomData) {
      const image = new Image();
      image.src = `${flaskAPI}/get_image/${selectedRoomData.image}`;
      image.onload = () => {
        setRoomImage(image);
      };
    }
    return () => {
      setRoomImage(null);
    };
  }, [selectedRoomData]);

  // Handler
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    try {
      const roomID = selectedRoomData._id;
      const route = flaskAPI + "/room_edit/" + roomID;
      if (
        !roomNumber.current.value ||
        !roomType.current.value ||
        !description.current.value ||
        !maxOccupancy.current.value ||
        !price.current.value
      ) {
        showToast("info", "One or more fields are empty");
      } else {
        const formData = new FormData();
        formData.append("roomNumber", roomNumber.current.value);
        formData.append("roomType", roomType.current.value);
        formData.append("description", description.current.value);
        formData.append("maxOccupancy", maxOccupancy.current.value);
        formData.append("price", price.current.value);
        formData.append("image", image);
        const response = await axios.post(route, formData);
        if (response.status == 200) {
          showToast("success", response.data);
          handleCloseModal();
          fetchRoomsByHotelId();
        } else {
          showToast("error", "Error editing room");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (selectedRoomData) {
      // console.log(selectedRoomData);
    }
  }, [selectedRoomData]);

  return (
    <div className="h-full">
      {roomDataLoading ? (
        <Spinner />
      ) : selectedRoomData ? (
        <>
          {/* Heading */}
          <h1 className="py-4 px-8 text-2xl bg-indigo-800 text-indigo-50">
            Edit Room Number{" "}
            <span className="font-semibold">{selectedRoomData.roomNumber}</span>
            <span className="">
              {" "}
              from {selectedHotelData && selectedHotelData.name}
            </span>
          </h1>

          {/* Form */}
          <form className="px-8 py-6 bg-white rounded-lg shadow-md">
            {/* Room Number and Type */}
            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                <label className="block mb-1 text-gray-700">Room Number:</label>
                <input
                  type="text"
                  ref={roomNumber}
                  defaultValue={selectedRoomData.roomNumber}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-gray-700">Room Type:</label>
                <select
                  ref={roomType}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
                  defaultValue={selectedRoomData.roomType}
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
                defaultValue={selectedRoomData.description}
                required
              ></textarea>
            </div>

            {/* Numbers */}
            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                <label className="block mb-1 text-gray-700">
                  Max Occupancy:
                </label>
                <input
                  type="number"
                  ref={maxOccupancy}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
                  defaultValue={selectedRoomData.maxOccupancy}
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-gray-700">Price:</label>
                <input
                  type="number"
                  ref={price}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
                  defaultValue={selectedRoomData.price}
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
                  name="roomImage"
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
                ) : roomImage == null ? (
                  <Spinner />
                ) : (
                  <img
                    src={`${roomImage.src}`}
                    alt="Selected File"
                    className="w-24 h-12 rounded-md object-cover"
                  />
                )}
              </div>
            </div>

            {/* Submit Room */}
            <div className="text-center">
              <button
                type="submit"
                onClick={() => {
                  handleSubmit();
                }}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-indigo-600"
              >
                Edit Room
              </button>
            </div>
          </form>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default RoomEdit;
