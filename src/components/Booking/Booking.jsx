import { motion } from "framer-motion";
import BookingRow from "./BookingRow";
import { useBooking } from "../../context/BookingContext";
import Spinner from "../Spinner/Spinner";

const Bookings = () => {
  // Context
  const { bookingLoading, bookings } = useBooking();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-indigo-50"
    >
      {/* Bookings */}
      <hr className="border-gray-300"></hr>
      <div className="text-center w-1/2 mx-auto my-4">
        <label className="font-bold my-2">All Booking List</label>
      </div>
      <div className="px-10 overflow-x-auto">
        <table className="bg-white shadow-lg rounded-lg w-full">
          <thead className="">
            <tr className="bg-gray-300 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-2 px-4 text-left">User ID</th>
              <th className="py-2 px-4 text-left">Room ID</th>
              <th className="py-2 px-4 text-left">Hotel ID</th>
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
            ) : bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <BookingRow key={index} booking={booking} />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No Bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Bookings;
