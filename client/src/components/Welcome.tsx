import React, { FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UsernameContext from "../shared/UsernameContext";

const Welcome: React.FC = () => {
  const { username } = useContext(UsernameContext);
  const navigate = useNavigate();

  function handleEnterBreathing(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Button pressed");
    navigate("/breathing", { state: { username: username } });
  }

  return (
    <>
      <p>Welcome To Tranquility,</p> {username}
      <button type="submit" onClick={handleEnterBreathing}>
        Go To Breathing
      </button>
    </>
  );
};

export default Welcome;
