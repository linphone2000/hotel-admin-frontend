import { AnimatePresence } from "framer-motion";
import RightPanel from "../components/RightPanel/RightPanel";
import Sidebar from "../components/Sidebar/Sidebar";
import { useUIModal } from "../context/UIModalContext";
import HotelAddForm from "../components/HotelAddForm/HotelAddForm";
import Modal from "../components/Modal/Modal";

const Home = () => {
  const { modalForm, isSideBarOpen } = useUIModal();

  return (
    <div className="min-h-screen flex flex-row transition-all">
      <Modal>{modalForm == "hotel" && <HotelAddForm />}</Modal>
      {/* Left */}
      <AnimatePresence>{isSideBarOpen && <Sidebar />}</AnimatePresence>
      {/* Right */}
      <RightPanel></RightPanel>
    </div>
  );
};

export default Home;
