// React
import { motion } from "framer-motion";
import { useUIModal } from "../../context/UIModalContext";

const Sidebar = () => {
  // Context
  const { selectedPage, setSelectedPage } = useUIModal();

  // Handler
  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "25%" }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ duration: 0.1 }}
      className={`min-h-screen max-h-screen -mb-12 bg-cyan-900 sticky top-0 `}
    >
      <div className="infomation-div flex flex-row w-full my-4 pl-4 gap-4">
        <img
          className="w-20 h-20 object-cover rounded-full"
          src="profile.jpeg"
        />
        <div className="flex flex-col justify-center gap-2 text-slate-50">
          <h1 className="font-semibold">U Thein Kyaw</h1>
          <p className="relative text-xs">
            Admin{" "}
            <i className="absolute -top-2 text-green-400 animate-pulse text-xs fa-solid fa-circle"></i>
          </p>
        </div>
      </div>

      <hr className="mx-auto w-60"></hr>

      <div className="flex flex-col  py-4 mt-4">
        <button
          onClick={() => handlePageChange("dashboard")}
          className={`pl-6 py-4 text-slate-50 flex gap-4 items-center ${
            selectedPage == "dashboard" ? "bg-slate-200 text-slate-950" : ""
          }  hover:bg-slate-200 hover:text-slate-950 transition-all`}
        >
          <i className="fa-solid fa-chart-line "></i>Dashboard
        </button>
        <button
          onClick={() => handlePageChange("hotel")}
          className={`pl-6 py-4 text-slate-50 flex gap-4 items-center ${
            selectedPage == "hotel" ? "bg-slate-200 text-slate-950" : ""
          }  hover:bg-slate-200 hover:text-slate-950 transition-all`}
        >
          <i className="fa-solid fa-hotel "></i>Hotels Management
        </button>
        <button
          onClick={() => handlePageChange("room")}
          className={`pl-6 py-4 text-slate-50 flex gap-4 items-center ${
            selectedPage == "room" ? "bg-slate-200 text-slate-950" : ""
          }  hover:bg-slate-200 hover:text-slate-950 transition-all`}
        >
          <i className="fa-solid fa-bed "></i>Rooms Management
        </button>
        <button
          onClick={() => handlePageChange("user")}
          className={`pl-6 py-4 text-slate-50 flex gap-4 items-center ${
            selectedPage == "user" ? "bg-slate-200 text-slate-950" : ""
          }  hover:bg-slate-200 hover:text-slate-950 transition-all`}
        >
          <i className="fa-solid fa-users "></i>Users Management
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
