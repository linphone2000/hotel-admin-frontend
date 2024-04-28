import { motion } from "framer-motion";

const User = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-slate-400"
    >
      
    </motion.div>
  );
};

export default User;
