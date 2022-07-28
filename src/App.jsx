import React from "react";
import { Routes, Route } from "react-router-dom";
import { Access, Home } from "./pages";
import './App.scss';
import { PrivateRoute } from "./components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Access />}  />
        <Route path="/home" element={<PrivateRoute component={<Home />}/>}/>
      </Routes>
    </div>
  );
}

export default App;
