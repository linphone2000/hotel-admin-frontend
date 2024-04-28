import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { useState } from "react";
import { useUIModal } from "../../context/UIModalContext";

const Hotel = () => {
  // Consumer
  const { hotels, setSelectedHotel, hotelLoading, flaskAPI } = useData();
  const { handleOpenModal, handleSetModalForm } = useUIModal();

  // State
  const [imageLoading, setImageLoading] = useState(true);

  // Handler
  const handleLoad = () => {
    setImageLoading(false);
  };
  const handleAdd = () => {
    handleSetModalForm("hotel");
    handleOpenModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-slate-300"
    >
      {/* Add hotel */}
      <div className="flex justify-end">
        <button
          onClick={handleAdd}
          className="bg-stone-300 px-4 py-2 rounded-md border border-slate-400 transition-all hover:bg-stone-400 hover:text-white"
        >
          Add Hotel
        </button>
      </div>

      {/* Hotels */}
      <div className="hotels mt-10 grid grid-cols-1">
        {/* Loading */}
        {hotelLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          // Loaded
          hotels.map((hotel, index) => (
            <div
              className="text-center transition duration-300 ease-in-out"
              key={index}
            >
              <div className="flex justify-between px-52">
                <div className="flex flex-col text-left justify-center">
                  <p className="text-lg">{hotel.name}</p>
                  <p>{hotel.city}</p>
                </div>
                <div className="hotel-image-container">
                  {imageLoading && (
                    <div className="animate-pulse my-2">
                      <img
                        className="rounded-md mx-auto h-32 w-52 -z-10"
                        src="placeholder.png"
                      />
                    </div>
                  )}{" "}
                  <img
                    className={`h-32 w-52 my-2 object-cover mx-auto rounded-md ${
                      imageLoading ? "hidden" : ""
                    }`}
                    src={`${flaskAPI}/get_image/${hotel.image}`}
                    alt="Hotel Image"
                    onLoad={handleLoad}
                  />
                </div>
              </div>
              <hr className="bg-slate-500 my-4"></hr>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Hotel;
