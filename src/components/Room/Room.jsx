// React
import Select from "react-select";
import { motion } from "framer-motion";
// Context
import { useData } from "../../context/DataContext";
// Components
import Spinner from "../Spinner/Spinner";
import axios from "axios";
import RoomRow from "./RoomRow";
import { useUIModal } from "../../context/UIModalContext";

const Room = () => {
  // Context
  const {
    selectedHotel,
    setSelectedHotel,
    selectedHotelData,
    setSelectedRooms,
    selectedRooms,
    loading,
    hotels,
    flaskAPI,
  } = useData();
  const { handleSetModalForm, handleOpenModal } = useUIModal();

  // States

  // Handler
  const handleOptionChange = (selectedOption) => {
    const fetchRoomsByID = async () => {
      setSelectedHotel(selectedOption.value);
      const response = await axios.get(
        flaskAPI + "/rooms/" + selectedOption.value
      );
      setSelectedRooms(response.data);
    };
    if (selectedOption) {
      fetchRoomsByID();
    }
  };
  // Handle Room Add
  const handleRoomAdd = (hotelID) => {
    setSelectedHotel(hotelID);
    handleSetModalForm("roomadd");
    handleOpenModal();
  };

  // Test
  // console.log(selectedOption);
  // console.log(hotels);
  // Options for React Select

  const options = hotels.map((hotel) => ({
    value: hotel._id,
    label: hotel.name,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-indigo-50"
    >
      {/* Dropdown */}
      <div className="w-full flex flex-col gap-2 text-center p-4 bg-indigo-50">
        <p className="font-semibold text-lg">Hotel Selection</p>
        <div className="flex justify-center">
          <Select
            className="w-1/2"
            options={options}
            onChange={handleOptionChange}
          />{" "}
        </div>
      </div>

      {/* Room list */}
      <div className="">
        {/* Heading */}
        {selectedRooms.length > 0 && (
          <div className="text-xl flex items-center justify-between px-10 my-4">
            <p className="text-gray-600">
              Rooms Information of:{" "}
              <span className="font-semibold">
                {selectedHotelData && selectedHotelData.name}
              </span>
            </p>
            {/* Add room */}
            {selectedHotelData && (
              <button
                onClick={() => {
                  handleRoomAdd(selectedHotel);
                }}
                className="bg-indigo-500 text-slate-50 px-4 py-2 rounded-full border transition-all hover:bg-indigo-600 flex items-center gap-2"
              >
                <i className="fa-solid fa-plus hover:cursor-pointer"></i>
                <label className="hidden md:block hover:cursor-pointer">
                  Add Room
                </label>
              </button>
            )}
          </div>
        )}

        <hr className="my-4 bg-gray-300"></hr>

        {/* Rooms */}
        <div className="px-10 overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-300 text-gray-700 uppercase text-sm leading-normal">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Max Occupancy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reserved Dates
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <Spinner />
                  </td>
                </tr>
              ) : selectedRooms.length > 0 ? (
                selectedRooms.map((room) => (
                  <RoomRow key={room._id} room={room} />
                ))
              ) : selectedHotel && selectedRooms.length == 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 font-semibold text-center">
                    <p>No rooms in this hotel {}</p>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 font-semibold text-center">
                    <p>Please select a hotel</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Room;
