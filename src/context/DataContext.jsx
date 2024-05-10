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
  const [selectedHotelData, setSelectedHotelData] = useState(); // Hotel object
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotelLoading, setHotelLoading] = useState(true); // All hotels
  const [hotelDataLoading, setHotelDataLoading] = useState(true); // Single Hotel

  // Fetch rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(flaskAPI + "/rooms");
        if (response.status == 200) {
          setRooms(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
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
        if (response.status == 200) {
          setHotels(response.data);
          setHotelLoading(false);
        }
      } catch (error) {
        console.error("Error fetching room:", error);
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
      if (response.status == 200) {
        setHotels(response.data);
        setHotelLoading(false);
      }
    } catch (error) {
      console.error("Error fetching room:", error);
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
          if (response.status == 200) {
            setSelectedRooms(response.data);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRoomsByHotelId();
  }, [selectedHotel]);

  // Fetch rooms by hotel ID manualy
  const fetchRoomsByHotelId = async () => {
    try {
      setLoading(true);
      if (selectedHotel) {
        const response = await axios.get(flaskAPI + "/rooms/" + selectedHotel);
        if (response.status == 200) {
          setSelectedRooms(response.data);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // Fetch hotel by hotel ID
  useEffect(() => {
    const fetchHotelDataBySelection = async (hotelID) => {
      try {
        setHotelDataLoading(true);
        const response = await axios.get(flaskAPI + "/hotels/" + hotelID);
        if (response.status == 200) {
          setSelectedHotelData(response.data);
          setHotelDataLoading(false);
        }
      } catch (error) {
        console.error("Error fetching hotel:", error);
      }
    };
    if (selectedHotel) {
      fetchHotelDataBySelection(selectedHotel);
    }
  }, [selectedHotel]);

  // Test logging
  // console.log("Selected hotel: " + selectedHotel);

  // Memo
  const dataContextValue = useMemo(
    () => ({
      rooms,
      hotels,
      fetchHotels,
      fetchRoomsByHotelId,
      selectedHotel,
      selectedHotelData,
      setSelectedHotel,
      selectedRooms,
      setSelectedRooms,
      loading,
      hotelLoading,
      hotelDataLoading,
      setLoading,
      flaskAPI,
    }),
    [
      rooms,
      hotels,
      selectedHotel,
      selectedHotelData,
      selectedRooms,
      hotelLoading,
      hotelDataLoading,
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
