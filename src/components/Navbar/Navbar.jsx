import { useUIModal } from "../../context/UIModalContext";
import "./Navbar.css";

const Navbar = () => {
  const { setIsSideBarOpen } = useUIModal();

  const handleClick = () => {
    setIsSideBarOpen((prev) => !prev);
  };
  return (
    <nav className="w-full h-14 z-10 sticky top-0 bg-indigo-900 text-slate-50 flex items-center navbar px-4">
      <button
        className="text-xs transition-colors hover:text-slate-900"
        onClick={handleClick}
      >
        <i className="fa-solid fa-bars text-lg"></i>
      </button>
    </nav>
  );
};

export default Navbar;
