// React
import axios from "axios";
import { useRef, useState } from "react";
// Context
import { useData } from "../../context/DataContext";
import { useUIModal } from "../../context/UIModalContext";
// CSS
import "./HotelAddForm.css";

const HotelAddForm = () => {
  // Context
  const { flaskAPI, fetchHotels } = useData();
  const { showToast, handleCloseModal } = useUIModal();

  // States
  const [image, setImage] = useState(null);
  const [amenities, setAmenities] = useState([]);

  // Refs
  const nameRef = useRef(null);
  const cityRef = useRef(null);
  const addressRef = useRef(null);
  const descriptionRef = useRef(null);
  const ratingRef = useRef(null);
  const checkInTimeRef = useRef(null);
  const checkOutTimeRef = useRef(null);
  const hotelEmailRef = useRef(null);
  const hotelPhoneRef = useRef(null);
  const fileInputRef = useRef(null);

  // Predefined Data
  const predefinedAmenities = [
    "Pools",
    "Wifi",
    "Parking",
    "Gym",
    "Restaurant",
    "Spa",
    "Concierge",
    "Room Service",
    "Business Center",
    "Pet Friendly",
  ];

  // Handlers
  const toggleAmenitySelection = (amenity) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((item) => item !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleImageChange = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const resetForm = () => {
    nameRef.current.value = "";
    cityRef.current.value = "";
    addressRef.current.value = "";
    descriptionRef.current.value = "";
    ratingRef.current.value = "";
    checkInTimeRef.current.value = "";
    checkOutTimeRef.current.value = "";
    hotelEmailRef.current.value = "";
    hotelPhoneRef.current.value = "";
    setImage(null);
    setAmenities([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (amenities.length == 0) {
        showToast("info", "Amenities can't be none, choose at least two");
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append("name", nameRef.current.value);
        formDataToSend.append("city", cityRef.current.value);
        formDataToSend.append("address", addressRef.current.value);
        formDataToSend.append("description", descriptionRef.current.value);
        formDataToSend.append("rating", ratingRef.current.value);
        formDataToSend.append("checkInTime", checkInTimeRef.current.value);
        formDataToSend.append("checkOutTime", checkOutTimeRef.current.value);
        formDataToSend.append("hotelEmail", hotelEmailRef.current.value);
        formDataToSend.append("hotelPhone", hotelPhoneRef.current.value);
        formDataToSend.append("image", image);
        amenities.forEach((amenity) => {
          formDataToSend.append("amenities", amenity);
        });

        const response = await axios.post(flaskAPI + "/hotels", formDataToSend);
        if (response.status != 200) {
          showToast("error", "Hotel Already Exists!");
        } else {
          handleCloseModal();
          fetchHotels();
          resetForm();
          showToast("success", "Hotel Created!");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="text-center bg-indigo-800 py-6">
        <h1 className="text-3xl font-bold text-indigo-50">Add a New Hotel</h1>
      </div>
      <hr className="border-t border-gray-200 w-full" />
      <form
        className="px-8 py-6 bg-gray-50 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Name:</label>
            <input
              type="text"
              ref={nameRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">City:</label>
            <input
              type="text"
              ref={cityRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Address:</label>
            <input
              type="text"
              ref={addressRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Rating:</label>
            <input
              type="number"
              ref={ratingRef}
              min="0"
              max="5"
              step="0.1"
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Check-in Time:</label>
            <input
              type="time"
              ref={checkInTimeRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Check-out Time:</label>
            <input
              type="time"
              ref={checkOutTimeRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Hotel Email:</label>
            <input
              type="email"
              ref={hotelEmailRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Hotel Phone:</label>
            <input
              type="tel"
              ref={hotelPhoneRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="col-span-2 mb-4">
            <label className="block mb-1 text-gray-600">Description:</label>
            <textarea
              ref={descriptionRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
              required
            ></textarea>
          </div>
          <div className="col-span-2 mb-4 flex flex-col justify-center items-center">
            <label className="block mb-1 text-gray-600 text-lg font-semibold">
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
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Select Amenities:</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {predefinedAmenities.map((amenity, index) => (
              <button
                key={index}
                type="button"
                onClick={() => toggleAmenitySelection(amenity)}
                className={`border border-gray-300 px-4 py-2 rounded-md transition-colors hover:border-indigo-500 ${
                  amenities.includes(amenity)
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-gray-700"
                } focus:outline-none focus:border-indigo-500`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-md focus:outline-none focus:bg-indigo-600"
        >
          Add Hotel
        </button>
      </form>
    </>
  );
};

export default HotelAddForm;
