import axios from "axios";
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
  const [currentUser, setCurrentUser] = useState(null);
  const { flaskAPI } = useData();
  const { showToast, handleCloseModal } = useUIModal();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      // console.log(JSON.parse(storedUser));
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      handleCloseModal();
    }
  }, [currentUser]);

  // Handlers
  // Register
  const register = async (userData) => {
    const username = userData.username;
    const password = userData.password;
    const fullName = userData.fullName;
    const phone = userData.phone;
    const address = userData.address;
    const response = await axios.post(flaskAPI + "/register", {
      username,
      password,
      fullName,
      phone,
      address,
    });
    return response;
  };
  // Login
  const login = async (username, password) => {
    const response = await axios.post(flaskAPI + "/login", {
      username,
      password,
    });
    if (response.data.user) {
      setCurrentUser(response.data.user);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      showToast("success", response.data.message);
    } else {
      showToast("error", response.data.message);
    }
  };
  // Logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    showToast("info", "Loggout out!");
  };

  // Memo
  const authContextValue = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      register,
      login,
      logout,
    }),
    [currentUser]
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
