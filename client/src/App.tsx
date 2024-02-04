import { useState } from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import UsernameContext from "./shared/UsernameContext";

const App: React.FC = () => {
  // Initial States of the React-Context's Shared Data
  const [username, setUsername] = useState("Tranquility");

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      <AppRouter />
    </UsernameContext.Provider>
  );
};

export default App;
