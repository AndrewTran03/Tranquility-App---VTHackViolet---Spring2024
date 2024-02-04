import React from "react";
import { useNavigate } from "react-router-dom";

const Journal: React.FC = () => {
  const [inputText, setInputText] = React.useState('');
  const [currentDate] = React.useState(new Date());
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleNavigateToWelcome = () => {
    navigate("/welcome");
  };

  return (
    <div style={{ background: '#f0f0f0', padding: '50px' }}>
      <h1 style={{ color: '#333'}}>My Journal</h1>
      <p style={{ color: '#333'}}>Current Date: {currentDate.toLocaleDateString()}</p>
      <textarea
        value={ inputText}
        onChange={handleInputChange}
        style={{ width: '300px', height: '150px', background: '#ffc0cb', border: '1px solid #ccc', padding: '10px', color: '#333' }}
      />
      <button onClick={handleNavigateToWelcome}
        style={{ position: 'absolute', top: '540px', right: '730px', padding: '8px' }}>
        Go back
      </button>
    </div>
  );
};

export default Journal;
