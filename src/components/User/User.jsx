import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import UserRow from "./UserRow";

const User = () => {
  // Context
  const { userLoading, allUsers } = useAuth();

  //

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-indigo-50"
    >
      {/* Users */}
      <hr className="border-gray-300"></hr>
      <div className="text-center w-1/2 mx-auto my-4">
        <label className="font-bold my-2">All User List</label>
      </div>
      <div className="px-10 overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-300 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-center">Image</th>
            </tr>
          </thead>
          <tbody>
            {userLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  <Spinner />
                </td>
              </tr>
            ) : allUsers.length > 0 ? (
              allUsers.map((user, index) => <UserRow key={index} user={user} />)
            ) : (
              <div>No Users found</div>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default User;
