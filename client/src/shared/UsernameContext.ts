import React from "react";

type UsernameType = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

const UsernameContext = React.createContext<UsernameType>({ username: "", setUsername: () => {} });

export default UsernameContext;
