import { useState, useEffect } from "react";

export const useSpeechRecognition = (onSpeechComplete) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech Recognition is not supported in this browser.");
    }
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    
    if (!SpeechRecognition) {
      setError("Speech Recognition is not supported in this browser.");
      return;
    }

    try {
      setError(null);
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript; 
        onSpeechComplete(text);
      };

      recognition.onerror = (err) => {
        switch (err.error) {
          case "no-speech":
            setError("No speech detected. Please try again.");
            break;
          case "audio-capture":
            setError("Microphone not detected. Please check your microphone.");
            break;
          case "not-allowed":
            setError("Microphone access denied. Please allow permissions.");
            break;
          default:
            setError(`Error occurred: ${err.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false); 
      };

      recognition.start(); 
      setIsListening(true); 
    } catch (err) {
      setError("Speech Recognition failed to start.");
    }
  };

  return { startListening, isListening, error };
};
