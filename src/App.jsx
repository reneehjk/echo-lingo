import { useState } from "react";
import EL_logo from "./assets/EL_logo.svg";
import playIcon from "./assets/start.svg";

function App() {
  const [inputValue, setInputValue] = useState(""); // State to store the input value
  const [isRunning, setIsRunning] = useState(false); // State to track if speech is running

  const handleToggleButton = () => {
    if (inputValue && !isRunning) {
      // Speak the input text
      const utterance = new SpeechSynthesisUtterance(inputValue);
      utterance.onend = () => setIsRunning(false); // Set isRunning to false when speech ends
      window.speechSynthesis.speak(utterance);
      setIsRunning(true); // Set isRunning to true when speech starts

      // Store the input value in localStorage
      localStorage.setItem("inputValue", inputValue);
    } else {
      // Stop speaking
      window.speechSynthesis.cancel();
      setIsRunning(false); // Set isRunning to false when speech is stopped
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (e.g., new line in textarea)
      handleToggleButton();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-700 text-white py-5 w-80 h-auto">
      <div className="flex flex-col items-center">
        <div className="text-[44px] text-center font-semibold">Echo-Lingo</div>
        <h1 className="text-[16px] text-center">Highlight. Listen. Learn.</h1>
        <img src={EL_logo} alt="EL Logo" className="w-30 h-30 object-contain mb-6" />
      </div>
      <div className="flex flex-col items-left mb-4 text-[20px] w-[255px]">
        <div className="mb-2 text-left w-full font-medium">Enter Text:</div>
        {/* Replace input with textarea */}
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter text here..."
          rows={4} // Set the number of visible lines
          className="py-2 px-2 rounded-sm border-2 border-gray-300 text-white text-[12px] mb-4 w-full max-w-xs bg-black resize-none"
        />

        <button
          onClick={handleToggleButton}
          className={`py-2 w-full rounded-full font-medium border-2 transition-all flex items-center justify-center
              bg-green-600 text-white border-green-800
          `}
        >
          Speak
        </button>
      </div>
    </div>
  );
}

export default App;