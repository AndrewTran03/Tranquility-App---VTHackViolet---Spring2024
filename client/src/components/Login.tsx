import { useState, useEffect, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  username: string;
};
const Login: React.FC<Props> = (props) => {
  const [username, setUsername] = useState(props.username);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Think is how to use the useEffect() React hook
    console.log(username);
  }, [username]); // Dependency array

  function handleEnter(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Button pressed");
    setUsername(usernameRef.current!.value);
    console.log(usernameRef.current!.value);
    if (usernameRef.current!.value.length === 0) {
      alert("Please enter a valid username!");
    } else {
      navigate("/welcome", { state: { username: usernameRef.current!.value || username } });
    }
  }

  return (
    <>
      <p>Enter Username:</p>
      <input ref={usernameRef} type="text" />
      <button type="submit" onClick={handleEnter}>
        Log In
      </button>
    </>
  );
};

export default Login;
