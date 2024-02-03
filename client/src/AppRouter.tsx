import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.tsx";
import { text } from "d3";
import Welcome from "./components/Welcome.tsx";
import PrevJournal from "./components/PrevJournal.tsx";

const AppRouter: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login username={"TEST"} />}></Route>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/prev_journal" element={<PrevJournal />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
