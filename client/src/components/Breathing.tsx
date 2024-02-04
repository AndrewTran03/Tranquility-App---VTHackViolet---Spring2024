import React, { useContext, useEffect, useState } from "react";
import UsernameContext from "../shared/UsernameContext";
import WhaleImage from "../assets/images/whale.jpg";
import CardMedia from "@mui/material/CardMedia";

const Breathing: React.FC = () => {
  const { username } = useContext(UsernameContext);
  const [timer, setTimer] = useState(10);
  const [loopCount, setLoopCount] = useState(0);

  const breathMessage = loopCount % 3 === 1 ? "Breathe in" : loopCount % 3 === 0 ? "Breathe out" : "Hold your breath";

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    if (timer === 0) {
      setLoopCount((prevCount) => prevCount + 1);
      setTimer(10);
    }

    if (loopCount === 18) {
      console.log("Breathing exercise completed 18 times.");
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer, loopCount]);

  return (
    <>
      <CardMedia
        component="img"
        style={{ width: "50%", margin: "auto", border: "30px solid black", marginLeft: "50px" }}
        image={WhaleImage}
        alt="whale tranquility image"
      />
      <div style={{ position: "fixed", top: "50%", right: "140px", transform: "translateY(-50%)" }}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            width: "200px",
            marginBottom: "10px"
          }}
        >
          <p>Breathe to soothe yourself, {username}!</p>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            width: "200px",
            marginBottom: "10px"
          }}
        >
          <p>Time remaining: {timer} seconds</p>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", width: "200px" }}>
          <p>{breathMessage}</p>
        </div>
      </div>
    </>
  );
};

export default Breathing;
