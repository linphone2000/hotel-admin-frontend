import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";

const UserRow = ({ user }) => {
  // States
  const [userImage, setUserImage] = useState(null);

  // Context
  const { flaskAPI } = useData();

  // Effect to preload image
  useEffect(() => {
    if (user) {
      const image = new Image();
      image.src = `${flaskAPI}/get_image/${user.image}`;
      image.onload = () => {
        setUserImage(image);
      };
    }
    return () => {
      setUserImage(null);
    };
  }, []);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left">{user.email}</td>
      <td className="py-3 px-6 text-left">{user.fullName}</td>
      <td className="py-3 px-6 text-left">{user.phone}</td>
      <td className="py-3 px-6 text-left">{user.address}</td>
      <td className="py-3 px-6 text-center">
        {userImage == null ? (
          <div className="animate-pulse">
            <img
              className="rounded-md h-16 mx-auto w-24 -z-10"
              src="placeholder.png"
            />
          </div>
        ) : (
          <img
            className={`h-16 w-16 rounded-sm object-contain  mx-auto`}
            src={`${flaskAPI}/get_image/${user.image}`}
            alt="User Image"
          />
        )}
      </td>
    </tr>
  );
};

export default UserRow;
