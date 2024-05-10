import { AnimatePresence, motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { useEffect, useRef, useState } from "react";
import { useUIModal } from "../../context/UIModalContext";
import "./Hotel.css";
import CustomToaster from "../CustomToaster/CustomToaster";
import HotelRow from "./HotelRow";
import Spinner from "../Spinner/Spinner";

const Hotel = () => {
  // Context
  const { hotels, setSelectedHotel, hotelLoading } =
    useData();
  const { handleOpenModal, handleSetModalForm } = useUIModal();

  // Refs
  const searchRef = useRef("");

  // State
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [isToasterOpen, setIsToasterOpen] = useState(false);

  // Handler
  const handleHotelAdd = () => {
    handleSetModalForm("hoteladd");
    handleOpenModal();
  };
  const handleHotelEdit = (hotelID) => {
    setSelectedHotel(hotelID);
    handleSetModalForm("hoteledit");
    handleOpenModal();
  };
  const handleSearch = () => {
    if (searchRef.current.value !== "") {
      const query = searchRef.current.value.toLowerCase();
      const filteredHotels = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(query)
      );
      setFilteredHotels(filteredHotels);
      if (filteredHotels.length == 0) {
        setIsToasterOpen(true);
      }
    }
  };
  const handleClear = () => {
    searchRef.current.value = "";
    setFilteredHotels([]);
    setIsToasterOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full relative overflow-x-auto bg-indigo-50 transition-all"
    >
      {/* Custom Toaster */}
      <AnimatePresence>
        {isToasterOpen && (
          <CustomToaster searchRef={searchRef} handleClear={handleClear} />
        )}
      </AnimatePresence>

      {/* Add hotel and search */}
      <div className="px-10 pt-4 relative items-center mb-4 flex justify-between">
        {/* Search box */}
        <div className="flex items-center relative">
          <input
            type="text"
            ref={searchRef}
            placeholder="Search by hotel ..."
            className="py-2 px-4 h-10 text-gray-700 leading-tight focus:outline-none rounded-l-full"
          />
          <button
            onClick={handleSearch}
            className="py-2 px-4 h-10 bg-indigo-500 text-white rounded-r-full transition hover:bg-indigo-600 focus:outline-none"
          >
            Search
          </button>
          {searchRef.current.value && (
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
            className="bg-indigo-500 text-slate-50 px-4 py-2 rounded-full border transition-all hover:bg-indigo-600 flex items-center gap-2"
          >
            <i className="fa-solid fa-plus hover:cursor-pointer"></i>
            <label className="hover:cursor-pointer">Add Hotel</label>
          </button>
        </div>
      </div>
      <hr className="border-gray-300"></hr>

      {/* Hotels */}
      <div className="text-center w-1/2 mx-auto my-4">
        <label className="font-bold my-2">All Hotel List</label>
      </div>
      <div className="px-10 overflow-x-auto">
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
                <td colSpan="5" className="text-center py-4">
                  <Spinner />
                </td>
              </tr>
            ) : (
              (filteredHotels.length === 0 ? hotels : filteredHotels).map(
                (hotel, index) => (
                  <HotelRow
                    key={index}
                    handleHotelEdit={handleHotelEdit}
                    hotel={hotel}
                    index={index}
                  />
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
