import { AnimatePresence } from "framer-motion";
import { useUIModal } from "../../context/UIModalContext";
import Dashboard from "../Dashboard/Dashboard";
import Hotel from "../Hotel/Hotel";
import Room from "../Room/Room";
import User from "../User/User";
import "./RightPanel.css";
import Navbar from "../Navbar/Navbar";

const RightPanel = () => {
  const { selectedPage } = useUIModal();

  return (
    <div
      className={`min-h-screen
      w-screen
      right-panel`}
    >
      <Navbar />
      <AnimatePresence>
        {selectedPage === "dashboard" ? (
          <Dashboard />
        ) : selectedPage === "hotel" ? (
          <Hotel />
        ) : selectedPage === "room" ? (
          <Room />
        ) : selectedPage === "user" ? (
          <User />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default RightPanel;
