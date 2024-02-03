import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.tsx";
import { text } from "d3";
import Welcome from "./components/Welcome.tsx";

const AppRouter: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login username={"TEST"} />}></Route>
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
