import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./components/Test";

const AppRouter: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Test name={"Hi, guys! We are learning React"} num={20} />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
