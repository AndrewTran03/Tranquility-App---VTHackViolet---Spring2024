import { useRef, FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UsernameContext from "../shared/UsernameContext";
import LoginImage from "../assets/images/login.jpg";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Login: React.FC = () => {
  const { setUsername } = useContext(UsernameContext);
  const usernameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function handleEnter(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setUsername(usernameRef.current!.value);
    console.log(usernameRef.current!.value);
    if (usernameRef.current!.value.length === 0) {
      alert("Please enter a valid username!");
    } else {
      navigate("/welcome");
    }
  }

  return (
    <>
      <CardMedia
        component="img"
        style={{ width: "70%", margin: "auto", border: "30px solid black" }}
        image={LoginImage}
        alt="boat in water"
      />
      <Typography style={{ margin: "15px auto", fontSize: "20px" }}>
        <b>Enter Username:</b>
      </Typography>
      <input ref={usernameRef} type="text" style={{ fontSize: "20px" }} />
      <button type="submit" onClick={handleEnter} style={{ fontSize: "20px" }}>
        Log In
      </button>
    </>
  );
};

export default Login;
