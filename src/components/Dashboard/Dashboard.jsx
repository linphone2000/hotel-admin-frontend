import { motion } from "framer-motion";
import "./Dashboard.css";
import { useData } from "../../context/DataContext";
import { useBooking } from "../../context/BookingContext";
import Spinner from "../Spinner/Spinner";
import HotelsCountByCity from "../Charts/HotelsCountByCity";
import BookingsCountByHotel from "../Charts/BookingCountByHotel";

const Dashboard = () => {
  const { hotels, rooms, users } = useData();
  const { bookings } = useBooking();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-indigo-50 h-auto dashboard"
    >
      {/* Heading */}
      <div className="p-4 flex items-center gap-4">
        <hr className="w-full border-gray-300"></hr>
        <h1 className="font-semibold text-2xl text-gray-600">Dashboard</h1>
        <hr className="w-full border-gray-300"></hr>
      </div>

      {hotels.length > 0 && rooms.length > 0 && users.length > 0 ? (
        <>
          {/* Upper section */}
          <div className="flex gap-4 justify-center p-4 text-gray-100 text-lg">
            {/* Hotels */}
            <div className="bg-green-500 flex flex-col w-1/4 min-h-28 px-2 py-4 rounded-md hover:bg-green-600 transition">
              <h1 className="font-semibold">Hotels</h1>
              {hotels.length > 0 ? (
                <p>Total hotels: {hotels.length}</p>
              ) : (
                <p>Total hotels: 0</p>
              )}
            </div>

            {/* Rooms */}
            <div className="bg-indigo-500 flex flex-col w-1/4 min-h-28 px-2 py-4 rounded-md hover:bg-indigo-600 transition">
              <h1 className="font-semibold">Rooms</h1>
              {rooms.length > 0 ? (
                <p>Total rooms: {rooms.length}</p>
              ) : (
                <p>Total rooms: 0</p>
              )}
            </div>

            {/* Bookings */}
            <div className="bg-teal-500 flex flex-col w-1/4 min-h-28 px-2 py-4 rounded-md hover:bg-teal-600 transition">
              <h1 className="font-semibold">Bookings</h1>
              {bookings.length > 0 ? (
                <p>Total bookings: {bookings.length}</p>
              ) : (
                <p>Total bookings: 0</p>
              )}
            </div>

            {/* Users */}
            <div className="bg-orange-500 flex flex-col w-1/4 min-h-28 px-2 py-4 rounded-md hover:bg-orange-600 transition">
              <h1 className="font-semibold">Users</h1>
              {users.length > 0 ? (
                <p>Total users: {users.length}</p>
              ) : (
                <p>Total users: 0</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="h-52">
          <Spinner />
        </div>
      )}

      {/* Charts and graphs */}
      <div className="grid grid-cols-2 max-h-screen">
        <div className="">
          {hotels.length > 0 ? (
            <HotelsCountByCity hotels={hotels} />
          ) : (
            <div className="h-96">
              <Spinner />
            </div>
          )}
        </div>
        <div className="">
          {bookings.length > 0 ? (
            <BookingsCountByHotel bookings={bookings} hotels={hotels} />
          ) : (
            <div className="h-96">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
