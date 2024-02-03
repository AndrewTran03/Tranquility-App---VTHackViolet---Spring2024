import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  username?: string;
};

const Welcome: React.FC<Props> = (props) => {
  const [username, setUsername] = useState(props.username || "");
  const location = useLocation();

  // Link Props: useState() Change and Management
  useEffect(() => {
    console.log(location.state.username);
    if (location.state && !Object.values(location.state).includes(undefined)) {
      const newUsername = location.state.username;
      setUsername(newUsername);
    }
  }, [location.state]);

  useEffect(() => {
    console.log(`New username: ${username}`);
  }, [username]);

  return <>Hello {username}</>;
};

export default Welcome;
