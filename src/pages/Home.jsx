import { AnimatePresence } from "framer-motion";
import RightPanel from "../components/RightPanel/RightPanel";
import Sidebar from "../components/Sidebar/Sidebar";
import { useUIModal } from "../context/UIModalContext";
import HotelAddForm from "../components/HotelAddForm/HotelAddForm";
import Modal from "../components/Modal/Modal";
import RoomAddForm from "../components/RoomAddForm/RoomAddForm";
import HotelEditForm from "../components/HotelEditForm/HotelEditForm";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm/AuthForm";
import RoomEdit from "./RoomEdit";
import RoomDeleteForm from "../components/RoomDeleteForm/RoomDeleteForm";
import HotelDeleteForm from "../components/HotelDeleteForm/HotelDeleteForm";

const Home = () => {
  const { modalForm, isSideBarOpen } = useUIModal();
  const { currentAdmin } = useAuth();

  return (
    <div className="min-h-screen flex flex-row transition-all">
      {/* Modals */}
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
      ) : modalForm === "roomedit" ? (
        <Modal>
          <RoomEdit />
        </Modal>
      ) : modalForm === "roomdelete" ? (
        <Modal>
          <RoomDeleteForm />
        </Modal>
      ) : modalForm === "hoteldelete" ? (
        <Modal>
          <HotelDeleteForm />
        </Modal>
      ) : null}

      {currentAdmin ? (
        <>
          {/* Left */}
          <AnimatePresence>{isSideBarOpen && <Sidebar />}</AnimatePresence>
          {/* Right */}
          <RightPanel></RightPanel>
        </>
      ) : (
        <>
          <AuthForm />
        </>
      )}
    </div>
  );
};

export default Home;
