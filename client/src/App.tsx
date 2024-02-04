import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import AppRouter from "./AppRouter";
import UsernameContext from "./shared/UsernameContext";

const App: React.FC = () => {
  // Initial States of the React-Context's Shared Data
  const [username, setUsername] = useState("");

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      <AppRouter />
    </UsernameContext.Provider>
  );
};

export default App;
