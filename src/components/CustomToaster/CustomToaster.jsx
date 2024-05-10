import { motion } from "framer-motion";

const CustomToaster = ({ handleClear, searchRef }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -1 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -1 }}
      transition={{ duration: 0.25 }}
      className="mytoaster z-10 flex absolute transition-all p-4 justify-center items-center w-1/3 bg-indigo-50 shadow-lg rounded-lg"
    >
      <label className="">
        <i className="fa-solid fa-exclamation mx-2 text-lg text-red-500"></i>
        No hotel found with name "
        <span className="font-bold">{searchRef.current?.value}</span>"
      </label>
      <button
        onClick={handleClear}
        className="absolute top-0 right-2 ml-2 transition-colors hover:text-slate-400"
      >
        <i className="fa-solid fa-xmark text-lg"></i>
      </button>
    </motion.div>
  );
};

export default CustomToaster;
