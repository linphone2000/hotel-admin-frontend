import { useRef, useState } from "react";
import { useData } from "../../context/DataContext";
import axios from "axios";
import { useUIModal } from "../../context/UIModalContext";

const HotelAddForm = () => {
  // Context
  const { flaskAPI } = useData();
  const { showToast } = useUIModal();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
        showToast("success", "Hotel Created!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="p-6" onSubmit={handleSubmit}>
      <div className="flex gap-4">
        {/* Left */}
        <div className="w-1/2">
          <div className="mb-4">
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              ref={nameRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">City:</label>
            <input
              type="text"
              ref={cityRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Address:</label>
            <input
              type="text"
              ref={addressRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description:</label>
            <textarea
              ref={descriptionRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full h-32"
              required
            ></textarea>
          </div>
        </div>

        {/* Right */}
        <div className="w-1/2">
          <div className="mb-4">
            <label className="block mb-2">Rating:</label>
            <input
              type="number"
              ref={ratingRef}
              min="0"
              max="5"
              step="0.1"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Check-in Time:</label>
            <input
              type="time"
              ref={checkInTimeRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Check-out Time:</label>
            <input
              type="time"
              ref={checkOutTimeRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Hotel Email:</label>
            <input
              type="email"
              ref={hotelEmailRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Hotel Phone:</label>
            <input
              type="tel"
              ref={hotelPhoneRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required
            />
          </div>
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

      {/* Amenities */}
      <label className="block mb-2">Select Amenities:</label>
      <div className="mb-4 grid grid-cols-5">
        {predefinedAmenities.map((amenity, index) => (
          <button
            key={index}
            type="button"
            onClick={() => toggleAmenitySelection(amenity)}
            className={`border border-gray-300 px-4 py-2 rounded-md transition-colors hover:border-green-500 ${
              amenities.includes(amenity)
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {amenity}
          </button>
        ))}
      </div>

      {/* Add */}
      <button
        type="submit"
        className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md"
      >
        Add Hotel
      </button>
    </form>
  );
};

export default HotelAddForm;
