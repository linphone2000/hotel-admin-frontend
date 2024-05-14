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

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // Context
  const { flaskAPI } = useData();
  const { showToast } = useUIModal();

  // States
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingLoading] = useState(true);

  // Fetch bookings
  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get(flaskAPI + "/bookings");
        if (response.status == 200) {
          setBookings(response.data);
        } else {
          setBookings([]);
        }
      } catch (error) {
        showToast("error", "Error fetching bookings");
      } finally {
        setBookingLoading(false);
      }
    };
    getBookings();
  }, []);

  // Handlers
  // console.log("Rendered");

  // Memo
  const BookingContextValue = useMemo(
    () => ({ bookings, bookingsLoading }),
    [bookings, bookingsLoading]
  );

  return (
    <BookingContext.Provider value={BookingContextValue}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  return useContext(BookingContext);
};
