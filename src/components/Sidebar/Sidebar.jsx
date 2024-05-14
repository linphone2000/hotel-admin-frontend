// React
import { motion } from "framer-motion";
import { useUIModal } from "../../context/UIModalContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";

const Sidebar = () => {
  // Context
  const { selectedPage, setSelectedPage } = useUIModal();
  const { logout, currentAdmin } = useAuth();
  const { flaskAPI } = useData();

  // Handler
  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  // States
  const [adminImage, setAdminImage] = useState(null);

  // Effect to preload image
  useEffect(() => {
    if (currentAdmin) {
      const image = new Image();
      image.src = `${flaskAPI}/get_image/${currentAdmin.image}`;
      image.onload = () => {
        setAdminImage(image);
      };
    }
    return () => {
      setAdminImage(null);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "25%" }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ duration: 0.1 }}
      className={`min-h-screen max-h-screen -mb-12 bg-indigo-900 sticky top-0 `}
    >
      <div className="infomation-div flex flex-row w-full my-4 pl-4 gap-4">
        {/* Image */}
        {adminImage == null ? (
          <div className="animate-pulse">
            <img
              className="w-20 h-20 object-cover rounded-full"
              src="placeholder.png"
            />
          </div>
        ) : (
          <img
            className={`w-20 h-20 object-cover rounded-full`}
            src={`${adminImage.src}`}
            alt="Hotel Image"
          />
        )}

        {/* Text */}
        <div className="flex flex-col justify-center gap-2 text-slate-50">
          <h1 className="font-semibold">
            {currentAdmin ? currentAdmin.fullName : "Loading..."}
          </h1>
          <p className="relative text-xs">
            Admin{" "}
            <i className="absolute -top-2 text-green-400 animate-pulse text-xs fa-solid fa-circle"></i>
          </p>
        </div>
      </div>

      <hr className="mx-auto w-60"></hr>

      <div className="flex flex-col justify-between h-5/6">
        {/* Navs */}
        <div className="flex flex-col py-4 mt-4">
          <button
            onClick={() => handlePageChange("dashboard")}
            className={`pl-6 py-4 text-slate-50 flex gap-4 items-center ${
              selectedPage == "dashboard" ? "bg-indigo-50 text-slate-950" : ""
            }  hover:bg-indigo-50 hover:text-slate-950 transition-all`}
          >
            <i className="fa-solid fa-chart-line "></i>Dashboard
          </button>
          <button
            onClick={() => handlePageChange("hotel")}
            className={`pl-6 py-4 text-slate-50 flex gap-4 items-center ${
              selectedPage == "hotel" ? "bg-indigo-50 text-slate-950" : ""
            }  hover:bg-indigo-50 hover:text-slate-950 transition-all`}
          >
            <i className="fa-solid fa-hotel "></i>Hotels Management
          </button>
          <button
            onClick={() => handlePageChange("room")}
            className={`pl-6 py-4 text-slate-50 flex gap-4 items-center ${
              selectedPage == "room" ? "bg-indigo-50 text-slate-950" : ""
            }  hover:bg-indigo-50 hover:text-slate-950 transition-all`}
          >
            <i className="fa-solid fa-bed "></i>Rooms Management
          </button>
          <button
            onClick={() => handlePageChange("user")}
            className={`pl-6 py-4 text-slate-50 flex gap-4 items-center ${
              selectedPage == "user" ? "bg-indigo-50 text-slate-950" : ""
            }  hover:bg-indigo-50 hover:text-slate-950 transition-all`}
          >
            <i className="fa-solid fa-users "></i>Users Management
          </button>
          <button
            onClick={() => handlePageChange("booking")}
            className={`pl-6 py-4 text-slate-50 flex gap-4 items-center ${
              selectedPage == "booking" ? "bg-indigo-50 text-slate-950" : ""
            }  hover:bg-indigo-50 hover:text-slate-950 transition-all`}
          >
            <i className="fa-solid fa-address-book"></i>Booking Management
          </button>
        </div>
        {/* Logout */}
        <div className="p-4">
          <button
            className="border border-white w-full text-white font-light rounded-md p-2 text-sm hover:bg-white hover:text-indigo-900 transition"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
