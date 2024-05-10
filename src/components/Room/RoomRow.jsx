import React, { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";

const RoomRow = ({ room }) => {
  // Context
  const { flaskAPI } = useData();

  // States
  const [roomImage, setRoomImage] = useState(null);

  // Effect to preload image
  useEffect(() => {
    if (room) {
      const image = new Image();
      image.src = `${flaskAPI}/get_image/${room.image}`;
      image.onload = () => {
        setRoomImage(image);
      };
    }
    return () => {
      setRoomImage(null);
    };
  }, []);

  // Function to format date as dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <tr key={room._id} className="hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap">{room.roomNumber}</td>
      <td className="px-6 py-4 whitespace-nowrap">{room.roomType}</td>
      <td className="px-6 py-4 whitespace-nowrap">{room.maxOccupancy}</td>
      <td className="px-6 py-4 whitespace-nowrap">${room.price}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {roomImage == null ? (
          <div className="animate-pulse">
            <img
              className="rounded-md h-16 mx-auto w-24 -z-10"
              src="placeholder.png"
            />
          </div>
        ) : (
          <img
            className={`h-16 w-24 object-cover mx-auto rounded-md `}
            src={`${flaskAPI}/get_image/${room.image}`}
            alt="Room Image"
          />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {room.unavailable_dates && room.unavailable_dates.length > 0 ? (
          <ul>
            {room.unavailable_dates.map((date, index) => (
              <li key={index}>{formatDate(date)}</li>
            ))}
          </ul>
        ) : (
          "No unavailable dates"
        )}
      </td>
    </tr>
  );
};

export default RoomRow;