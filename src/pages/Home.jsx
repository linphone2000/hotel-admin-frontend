import { AnimatePresence } from "framer-motion";
import RightPanel from "../components/RightPanel/RightPanel";
import Sidebar from "../components/Sidebar/Sidebar";
import { useUIModal } from "../context/UIModalContext";
import HotelAddForm from "../components/HotelAddForm/HotelAddForm";
import Modal from "../components/Modal/Modal";
import RoomAddForm from "../components/RoomAddForm/RoomAddForm";
import HotelEditForm from "../components/HotelEditForm/HotelEditForm";

const Home = () => {
  const { modalForm, isSideBarOpen } = useUIModal();

  return (
    <div className="min-h-screen flex flex-row transition-all">
      {modalForm === "hoteladd" ? (
        <Modal>
          <HotelAddForm />
        </Modal>
      ) : modalForm === "roomadd" ? (
        <Modal>
          <RoomAddForm />
        </Modal>
      ) : modalForm === "hoteledit" ? (
        <Modal>
          <HotelEditForm />
        </Modal>
      ) : null}
      {/* Left */}
      <AnimatePresence>{isSideBarOpen && <Sidebar />}</AnimatePresence>
      {/* Right */}
      <RightPanel></RightPanel>
    </div>
  );
};

export default Home;
