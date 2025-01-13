import React from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

function SpeechInput({ onSpeechComplete }) {
  const { startListening, isListening, error } = useSpeechRecognition(onSpeechComplete);

  return (
    <div className="speech-input-container">
      <button onClick={startListening} disabled={isListening} className="speech-button">
        {isListening ? "Listening..." : "🎙 Start Speaking"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SpeechInput;
