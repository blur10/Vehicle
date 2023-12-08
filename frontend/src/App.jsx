import { Route, Routes } from "react-router-dom";
import VehicleForm from "./pages/VehivcleForm";
import LogIn from "./pages/LogIn";
import { createContext, useState } from "react";
import "./App.css";
// import PrivateRouting from "./components/PrivateRouting";

export const UserContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Routes>
          <Route
            path="/"
            element={
              // <PrivateRouting>
                <VehicleForm />
              // </PrivateRouting>
            }
          />
          <Route path="login" element={<LogIn />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
