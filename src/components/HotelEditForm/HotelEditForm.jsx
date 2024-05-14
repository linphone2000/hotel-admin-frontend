import { useEffect, useRef, useState } from "react";
import { useData } from "../../context/DataContext";
import { useUIModal } from "../../context/UIModalContext";
import Spinner from "../Spinner/Spinner";
import axios from "axios";

const HotelEditForm = () => {
  // Context
  const { selectedHotelData, setSelectedHotel, hotelDataLoading, fetchHotels } =
    useData();
  const { flaskAPI } = useData();
  const { showToast, handleCloseModal } = useUIModal();

  // States
  const [image, setImage] = useState(null); // New image to be updated
  const [amenities, setAmenities] = useState([]);
  const [hotelImage, setHotelImage] = useState(null); // Previous image

  // Refs
  const nameRef = useRef("");
  const cityRef = useRef("");
  const addressRef = useRef("");
  const descriptionRef = useRef("");
  const ratingRef = useRef("");
  const checkInTimeRef = useRef("");
  const checkOutTimeRef = useRef("");
  const hotelEmailRef = useRef("");
  const hotelPhoneRef = useRef("");
  const fileInputRef = useRef(null);

  // Effect to preload image
  useEffect(() => {
    if (selectedHotelData) {
      const image = new Image();
      image.src = `${flaskAPI}/get_image/${selectedHotelData.image}`;
      image.onload = () => {
        setHotelImage(image);
      };
    }
    return () => {
      setHotelImage(null);
    };
  }, [selectedHotelData]);

  // Setting amenities
  useEffect(() => {
    if (selectedHotelData) {
      setAmenities(selectedHotelData.amenities);
    }
  }, [selectedHotelData]);

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

  // Set image to be changed
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Input hidden, to capture click event on input
  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (amenities.length == 0) {
        showToast("info", "Amenities can't be none, choose at least two");
      } else {
        if (condition) {
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

          const response = await axios.post(
            flaskAPI + "/hotels_edit/" + selectedHotelData._id,
            formDataToSend
          );
          if (response.status != 200) {
            showToast("error", "Hotel update failed!");
          } else {
            showToast("success", "Hotel updated!");
            handleCloseModal();
            setSelectedHotel(null);
            fetchHotels();
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Test
  // console.log("Rendered");

  return (
    <>
      <div className="text-center bg-indigo-800 py-6">
        <h1 className="text-3xl font-bold text-indigo-50">Edit Hotel</h1>
      </div>
      {hotelDataLoading ? (
        <div className="h-5/6">
          <Spinner />
        </div>
      ) : selectedHotelData ? (
        <>
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
                  defaultValue={selectedHotelData.name}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-600">City:</label>
                <input
                  type="text"
                  ref={cityRef}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
                  required
                  defaultValue={selectedHotelData.city}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-600">Address:</label>
                <input
                  type="text"
                  ref={addressRef}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
                  required
                  defaultValue={selectedHotelData.address}
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
                  defaultValue={selectedHotelData.rating}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-600">
                  Check-in Time:
                </label>
                <input
                  type="time"
                  ref={checkInTimeRef}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
                  required
                  defaultValue={selectedHotelData.checkInTime}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-600">
                  Check-out Time:
                </label>
                <input
                  type="time"
                  ref={checkOutTimeRef}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
                  required
                  defaultValue={selectedHotelData.checkOutTime}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-600">Hotel Email:</label>
                <input
                  type="email"
                  ref={hotelEmailRef}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
                  required
                  defaultValue={selectedHotelData.hotelEmail}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-600">Hotel Phone:</label>
                <input
                  type="tel"
                  ref={hotelPhoneRef}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
                  required
                  defaultValue={selectedHotelData.hotelPhone}
                />
              </div>
              <div className="col-span-2 mb-4">
                <label className="block mb-1 text-gray-600">Description:</label>
                <textarea
                  ref={descriptionRef}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
                  required
                  defaultValue={selectedHotelData.description}
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
                  ) : hotelImage == null ? (
                    <Spinner />
                  ) : (
                    <img
                      src={`${hotelImage.src}`}
                      alt="Selected File"
                      className="w-24 h-12 rounded-md object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-600">
                Select Amenities:
              </label>
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
              onClick={handleSubmit}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-md focus:outline-none focus:bg-indigo-600"
            >
              Update Hotel
            </button>
          </form>
        </>
      ) : (
        <div>No Hotel</div>
      )}
    </>
  );
};

export default HotelEditForm;
