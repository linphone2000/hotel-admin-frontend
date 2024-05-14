import { AnimatePresence, motion } from "framer-motion";
import BookingRow from "./BookingRow";
import { useBooking } from "../../context/BookingContext";
import Spinner from "../Spinner/Spinner";
import CustomToaster from "../CustomToaster/CustomToaster";
import { useRef, useState } from "react";

const Bookings = () => {
  // Context
  const { bookingLoading, bookings } = useBooking();

  // Refs
  const searchRef = useRef("");

  // State
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isToasterOpen, setIsToasterOpen] = useState(false);

  // Handlers
  const handleSearch = () => {
    if (searchRef.current.value !== "") {
      const query = searchRef.current.value.toLowerCase();
      const filteredBookings = bookings.filter((booking) =>
        booking.userFullName.toLowerCase().includes(query)
      );
      setFilteredBookings(filteredBookings);
      if (filteredBookings.length == 0) {
        setIsToasterOpen(true);
      }
    }
  };
  const handleClear = () => {
    searchRef.current.value = "";
    setFilteredBookings([]);
    setIsToasterOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-indigo-50 relative"
    >
      {/* Custom Toaster */}
      <AnimatePresence>
        {isToasterOpen && (
          <CustomToaster searchRef={searchRef} handleClear={handleClear} />
        )}
      </AnimatePresence>

      {/* Search box */}
      <div className="px-10 pt-4 relative items-center mb-4 flex justify-between">
        <div className="flex items-center relative">
          <input
            type="text"
            ref={searchRef}
            placeholder="Search by name ..."
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
      </div>

      {/* Bookings */}
      <hr className="border-gray-300"></hr>
      <div className="text-center w-1/2 mx-auto my-4">
        <label className="font-bold my-2">All Booking List</label>
      </div>
      <div className="px-10 overflow-x-auto">
        <table className="bg-white shadow-lg rounded-lg w-full">
          <thead className="">
            <tr className="bg-gray-300 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-2 px-4 text-left">User Fullname</th>
              <th className="py-2 px-4 text-left">Room Number</th>
              <th className="py-2 px-4 text-left">Hotel Name</th>
              <th className="py-2 px-4 text-left">Stay Dates</th>
              <th className="py-2 px-4 text-left">Total Price</th>
              <th className="py-2 px-4 text-left">Creation Date</th>
            </tr>
          </thead>
          <tbody className="">
            {bookingLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <Spinner />
                </td>
              </tr>
            ) : filteredBookings.length === 0 ? (
              bookings.map((booking, index) => (
                <BookingRow key={index} booking={booking} />
              ))
            ) : (
              filteredBookings.map((booking, index) => (
                <BookingRow key={index} booking={booking} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Bookings;
