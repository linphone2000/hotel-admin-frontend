import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const flaskAPI = "http://localhost:5001";
  // const flaskAPI = "http://192.168.10.3:5001";


  // States
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState();
  const [selectedHotelToDelete, setSelectedHotelToDelete] = useState();
  const [selectedHotelName, setSelectedHotelName] = useState();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotelLoading, setHotelLoading] = useState(true);

  // Fetch rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(flaskAPI + "/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    if (loading == true) {
      fetchRooms();
    }
  }, [loading]);

  // Fetch hotels on page load
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(flaskAPI + "/hotels");
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setHotelLoading(false);
      }
    };
    if (hotelLoading == true) {
      fetchHotels();
    }
  }, [hotelLoading]);

  // Fetch hotels manual
  const fetchHotels = async () => {
    try {
      const response = await axios.get(flaskAPI + "/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching room:", error);
    } finally {
      setHotelLoading(false);
    }
  };

  // Fetch rooms by hotel ID
  useEffect(() => {
    const fetchRoomsByHotelId = async () => {
      try {
        setLoading(true);
        if (selectedHotel) {
          const response = await axios.get(
            flaskAPI + "/rooms/" + selectedHotel
          );
          setSelectedRooms(response.data);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomsByHotelId();
  }, [selectedHotel]);

  // Test logging
  // useEffect(() => {
  //   console.log("Hotel to add room: " + selectedHotel);
  // }, [selectedHotel]);

  // Memo
  const dataContextValue = useMemo(
    () => ({
      rooms,
      hotels,
      fetchHotels,
      selectedHotel,
      setSelectedHotel,
      selectedHotelName,
      setSelectedHotelName,
      selectedHotelToDelete,
      setSelectedHotelToDelete,
      selectedRooms,
      setSelectedRooms,
      loading,
      hotelLoading,
      setLoading,
      flaskAPI,
    }),
    [
      rooms,
      hotels,
      selectedHotel,
      selectedHotelName,
      selectedRooms,
      selectedHotelToDelete,
      hotelLoading,
      loading,
    ]
  );

  return (
    <DataContext.Provider value={dataContextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
