import { motion } from "framer-motion";
import './Dashboard.css'

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-slate-200 dashboard overflow-y-auto"
    >
      
    </motion.div>
  );
};

export default Dashboard;
