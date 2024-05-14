import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";

const HotelRow = ({ hotel, index, handleHotelEdit }) => {
  // Context
  const { flaskAPI } = useData();

  // States
  const [hotelImage, setHotelImage] = useState(null);

  // Effect to preload image
  useEffect(() => {
    if (hotel) {
      const image = new Image();
      image.src = `${flaskAPI}/get_image/${hotel.image}`;
      image.onload = () => {
        setHotelImage(image);
      };
    }
    return () => {
      setHotelImage(null);
    };
  }, []);

  return (
    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-center">
        {hotelImage == null ? (
          <div className="animate-pulse">
            <img
              className="rounded-md h-16 mx-auto w-24 -z-10"
              src="placeholder.png"
            />
          </div>
        ) : (
          <img
            className={`h-16 w-24 object-cover mx-auto rounded-md `}
            src={`${hotelImage.src}`}
            alt="Hotel Image"
          />
        )}
      </td>
      <td className="py-3 px-6 text-left whitespace-nowrap">{hotel.name}</td>
      <td className="py-3 px-6 text-left whitespace-nowrap">{hotel.city}</td>
      <td className="py-3 px-6 text-left whitespace-nowrap">{hotel.address}</td>
      <td className="py-3 px-6">
        <div className="flex justify-around">
          {/* Edit Hotel */}
          <button
            onClick={() => {
              handleHotelEdit(hotel._id);
            }}
            className="text-slate-950 py-2 px-3 rounded-xl border border-blue-500 transition-all hover:bg-blue-500 hover:text-white flex items-center gap-2"
          >
            <i className="fa-solid fa-pen-to-square hover:cursor-pointer"></i>
          </button>

          {/* Delete Hotel */}
          <button
            onClick={() => {
              handleRoomAdd(hotel._id, hotel.name);
            }}
            className="text-slate-950 py-2 px-3 rounded-xl border border-red-500 transition-all hover:bg-red-500 hover:text-white flex items-center gap-2"
          >
            <i className="fa-solid fa-trash hover:cursor-pointer"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default HotelRow;
