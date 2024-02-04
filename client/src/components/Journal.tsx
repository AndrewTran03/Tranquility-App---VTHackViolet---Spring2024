import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/journalbg1.jpg";
import "../styles/JournalStyles.css";

const Journal: React.FC = () => {
  const [inputTitleText, setInputTitleText] = useState("");
  const [inputBodyText, setInputBodyText] = useState("");
  const [currentDate] = useState(new Date());
  const navigate = useNavigate();

  function handleInputTitleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setInputTitleText(e.target.value);
  }

  function handleInputBodyChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setInputBodyText(e.target.value);
  }

  function handleNavigateToWelcome() {
    if (inputTitleText.length === 0 || inputTitleText.length === 0) {
      alert("Please do not leave either the title or body text input field blank!");
    } else {
      // Axios Post Call (Goes Here)
      navigate(-1);
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        height: "100vh", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: '#333', marginTop: '-10px'}}>My Journal</h1>
      <p style={{ color: '#333', fontSize: '2em', textAlign: 'center', marginTop: '-25px' }}>
        Current Date: {currentDate.toLocaleDateString()}
      </p>
      
      <textarea
      value={inputTitleText}
      onChange={handleInputTitleChange}
      placeholder={'Add title here'}
      style={{
          width: '1200px',
          height: '50',
          background: 'rgba(255, 192, 203, 0.01)',
          border: '0px solid #ccc',
          padding: '10px',
          color: '#333',
          fontFamily: 'Helvetica, sans-serif',
          fontSize: '2em',
        }}
      />

      <textarea
        value={inputBodyText}
        onChange={handleInputBodyChange}
        placeholder={'Add text here'}
        style={{
          width: '1200px',
          height: '450px',
          background: 'rgba(255, 192, 203, 0.01)',
          border: '0px solid #ccc',
          padding: '10px',
          color: '#333',
          fontFamily: 'Helvetica, sans-serif',
          fontSize: '2em',
        }}
      />

      <button
        onClick={handleNavigateToWelcome}
        style={{ padding: '6px', marginTop: "10px", marginBottom: '20px', border: '0 px solid #ccc', fontSize: "20px" }}
        >
        Go Back
      </button>
    </div>
  );
};

export default Journal;
