import React, { useContext, useEffect, useState } from "react";
import UsernameContext from "../shared/UsernameContext";

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
    <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", width: "200px" }}>
      <p>Breathe to soothe yourself, {username}</p>
      <div>
        <p>Time remaining: {timer} seconds</p>
        <p>{breathMessage}</p>
      </div>
    </div>
  );
};

export default Breathing;
//need to add here some counter for how long to breath/exhale/hold
//i was thinking to create a count down timer
//counts down from 10 to inhale air
//counts down frm 10 to hold your breath
//counts down from 10 to exhaule your breath

//repeat this 30 second cycle 6 times to do a total of 3 mins of breath exercising
//have button th    at says "end and return" to just stop anytime you want
