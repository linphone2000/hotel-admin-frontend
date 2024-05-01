import { AnimatePresence, motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { useEffect, useRef, useState } from "react";
import { useUIModal } from "../../context/UIModalContext";
import "./Hotel.css";

const Hotel = () => {
  // Consumer
  const {
    hotels,
    setSelectedHotel,
    setSelectedHotelName,
    hotelLoading,
    flaskAPI,
  } = useData();
  const { handleOpenModal, handleSetModalForm } = useUIModal();

  // Refs
  const searchRef = useRef("");

  // State
  const [imageLoading, setImageLoading] = useState(true);
  const [filteredHotels, setFilteredHotels] = useState([]);

  // Handler
  const handleLoad = () => {
    setImageLoading(false);
  };
  const handleHotelAdd = () => {
    handleSetModalForm("hoteladd");
    handleOpenModal();
  };
  const handleRoomAdd = (hotelID, hotelName) => {
    setSelectedHotel(hotelID);
    setSelectedHotelName(hotelName);
    handleSetModalForm("roomadd");
    handleOpenModal();
  };
  const handleSearch = () => {
    if (searchRef.current.value !== "") {
      const query = searchRef.current.value.toLowerCase();
      const filteredHotels = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(query)
      );
      setFilteredHotels(filteredHotels);
    }
  };
  const handleClear = () => {
    searchRef.current.value = "";
    setFilteredHotels([]);
  };

  // Test logging
  useEffect(() => {
    console.log(filteredHotels);
  }, [filteredHotels]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full relative overflow-x-auto bg-slate-200 transition-all"
    >
      <AnimatePresence>
        {filteredHotels.length === 0 && searchRef.current.value !== "" && (
          <motion.div
            initial={{ opacity: 0, y: -1 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -1 }}
            transition={{ duration: 0.25 }}
            className="mytoaster z-10 flex absolute transition-all p-4 justify-center items-center w-1/3 bg-slate-50 shadow-lg rounded-lg"
          >
            <label className="">
              <i className="fa-solid fa-exclamation mx-2 text-lg text-red-500"></i>
              No hotel found with name "
              <span className="font-bold">{searchRef.current.value}</span>"
            </label>
            <button onClick={handleClear} className="absolute top-0 right-2 ml-2 transition-colors hover:text-slate-400">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Add hotel and search */}
      <div className="px-10 pt-4 relative flex justify-between">
        {/* Search box */}
        <div className="flex items-center mb-4 relative">
          <input
            type="text"
            ref={searchRef}
            placeholder="Search by hotel ..."
            className="py-2 px-4 h-full text-gray-700 leading-tight focus:outline-none rounded-l-full"
          />
          <button
            onClick={handleSearch}
            className="py-2 px-4 bg-blue-400 text-white rounded-r-full hover:bg-blue-500 focus:outline-none"
          >
            Search
          </button>
          {searchRef.current.value !== "" && (
            <button
              className="absolute right-24 hover:text-red-500 transition-all"
              onClick={handleClear}
            >
              <i className="fa-regular fa-circle-xmark hover:cursor-pointer"></i>
            </button>
          )}
        </div>
        {/* Add hotel button */}
        <div>
          <button
            onClick={handleHotelAdd}
            className="bg-green-500 text-slate-50 px-4 py-2 rounded-full border transition-all hover:bg-green-600 flex items-center gap-2"
          >
            <i className="fa-solid fa-plus hover:cursor-pointer"></i>
            <label className="hover:cursor-pointer">Add Hotel</label>
          </button>
        </div>
      </div>
      {/* Hotels */}
      <hr className="border-gray-300"></hr>
      <div className="text-center w-1/2 mx-auto my-4">
        <label className="font-bold my-2">All Hotel List</label>
      </div>
      <div className="px-10">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-300 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">City</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotelLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                  </div>
                </td>
              </tr>
            ) : (
              (filteredHotels.length === 0 ? hotels : filteredHotels).map(
                (hotel, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-center">
                      {imageLoading && (
                        <div className="animate-pulse my-2">
                          <img
                            className="rounded-md h-16 w-24 -z-10"
                            src="placeholder.png"
                          />
                        </div>
                      )}
                      <img
                        className={`h-16 w-24 object-cover mx-auto rounded-md ${
                          imageLoading ? "hidden" : ""
                        }`}
                        src={`${flaskAPI}/get_image/${hotel.image}`}
                        alt="Hotel Image"
                        onLoad={handleLoad}
                      />
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {hotel.name}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {hotel.city}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {hotel.address}
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex justify-around">
                        <button
                          onClick={() => {
                            handleRoomAdd(hotel._id, hotel.name);
                          }}
                          className="text-slate-950 px-4 py-2 rounded-full border border-green-500 transition-all hover:bg-green-500 flex items-center gap-2"
                        >
                          <i className="fa-solid fa-plus hover:cursor-pointer"></i>
                          <label className="hover:cursor-pointer">
                            Add Room
                          </label>
                        </button>
                        <button
                          onClick={() => {
                            handleRoomAdd(hotel._id, hotel.name);
                          }}
                          className="text-slate-950 px-4 py-2 rounded-full border border-red-500 transition-all hover:bg-red-500 flex items-center gap-2"
                        >
                          <i className="fa-solid fa-trash hover:cursor-pointer"></i>
                          <label className="hover:cursor-pointer">
                            Delete Hotel
                          </label>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Hotel;
