import React from "react";
import { NavBar } from "./components/NavBar";
import { Login } from "./components/Pages/Login/Login";
import Homepage from "./components/Pages/Homepage/Homepage";
import MapHomePage from "./components/Pages/Map/MapHomePage";
import { Signup } from "./components/Pages/Login/Signup";
import About from "./components/Pages/About/About";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div>
      <DataProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Map" element={<MapHomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
