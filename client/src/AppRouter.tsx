import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.tsx";
import Welcome from "./components/Welcome.tsx";
import PrevJournal from "./components/PrevJournal.tsx";
import Breathing from "./components/Breathing.tsx";

const AppRouter: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/prev_journal" element={<PrevJournal />}></Route>
          <Route path="/breathing" element={<Breathing />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
