// React
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import Home from "./pages/Home";
// Context
import { UIModalProvider } from "./context/UIModalContext";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";

function App() {
  return (
    <DataProvider>
      <UIModalProvider>
        <AuthProvider>
          <BookingProvider>
            <ToastContainer />
            <Home />
          </BookingProvider>
        </AuthProvider>
      </UIModalProvider>
    </DataProvider>
  );
}

export default App;
