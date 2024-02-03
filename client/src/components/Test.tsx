import { useState, useEffect, FormEvent } from "react";

type Props = {
  name: string;
  num: number;
};

// function Test(props: Props) {
const Test: React.FC<Props> = (props) => {
  const [name, setName] = useState(props.name); // This is how to use the useState() React hook: think variables as "reactive" state
  const [num, setNum] = useState(props.num);

  useEffect(() => {
    // Think is how to use the useEffect() React hook
    console.log(name);
    console.log(num);
  }, [name, num]); // Dependency array

  function handleIncrementCounter(e: FormEvent<HTMLButtonElement>) {
    console.log("Button pressed");
    e.preventDefault();
    setNum((prevVal) => prevVal + 1);
  }

  function handleDecrementCounter(e: FormEvent<HTMLButtonElement>) {
    console.log("Button pressed");
    e.preventDefault();
    setNum((prevVal) => prevVal - 1);
  }

  return (
    <>
      <p>Name: {name}</p>
      <p>Age: {num}</p>
      <button type="submit" onClick={handleIncrementCounter}>
        Increment +
      </button>
      <button type="submit" onClick={handleDecrementCounter}>
        Decrement -
      </button>
    </>
  );
};

export default Test;
