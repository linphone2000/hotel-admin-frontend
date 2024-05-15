import axios from "axios";
import { useData } from "../../context/DataContext";
import { useUIModal } from "../../context/UIModalContext";
import { useBooking } from "../../context/BookingContext";

const RoomDeleteForm = () => {
  // Context
  const { flaskAPI, selectedRoom, fetchRoomsByHotelId } = useData();
  const { showToast } = useUIModal();
  const { handleCloseModal } = useUIModal();
  const { getBookings } = useBooking();

  // Handle Delete
  const handleDelete = async () => {
    const response = await axios.post(
      flaskAPI + "/room_delete/" + selectedRoom
    );
    if (response.status == 200) {
      getBookings();
      fetchRoomsByHotelId();
      handleCloseModal();
      showToast("success", "Room deleted successfully");
    } else {
      showToast("error", "Error in room deletion");
    }
  };

  // Close Model
  const handleNo = () => {
    handleCloseModal();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-64">
      <p className="text-md font-semibold mb-3 text-center">
        Are you sure you want to delete this room?
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          Yes
        </button>
        <button
          onClick={handleNo}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default RoomDeleteForm;
