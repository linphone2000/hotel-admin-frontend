import axios, { all } from "axios";
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { useData } from "./DataContext";
import { useUIModal } from "./UIModalContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // States
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  // Context
  const { flaskAPI } = useData();
  const { showToast } = useUIModal();

  // Fetching for logged in admin
  useEffect(() => {
    const storedUser = localStorage.getItem("currentAdmin");
    if (storedUser) {
      setCurrentAdmin(JSON.parse(storedUser));
    }
  }, []);

  // Handlers
  // Register
  const register = async (userData) => {
    try {
      const { email, password, fullName, phone, address } = userData;
      // Form Data
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("fullName", fullName);
      formData.append("phone", phone);
      formData.append("address", address);

      const response = await axios.post(`${flaskAPI}/adminregister`, formData);
      return response;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  // Login
  const login = async (userData) => {
    const { email, password } = userData;
    console.log(userData);
    // Form Data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const response = await axios.post(flaskAPI + "/adminlogin", formData);
    if (response.data.user) {
      const user = response.data.user;
      setCurrentAdmin(user);
      localStorage.setItem("currentAdmin", JSON.stringify(user));
      showToast("success", response.data.message);
    } else if (response.status == 204) {
      showToast("error", "User doesn't exists");
    } else {
      showToast("error", response.data.message);
    }
  };

  // Logout
  const logout = () => {
    setCurrentAdmin(null);
    localStorage.removeItem("currentAdmin");
    showToast("info", "Loggout out!");
  };

  // Get all users
  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get(flaskAPI + "/users");
      if (response.status == 200) {
        setAllUsers(response.data);
        setUserLoading(false);
      } else {
        setAllUsers([]);
        setUserLoading(false);
      }
    };
    getAllUsers();
  }, []);

  // Test
  // if (allUsers.length > 0) {
  //   console.log(allUsers);
  // }

  // Memo
  const authContextValue = useMemo(
    () => ({
      currentAdmin,
      allUsers,
      userLoading,
      setCurrentAdmin,
      register,
      login,
      logout,
    }),
    [currentAdmin, userLoading, allUsers]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
