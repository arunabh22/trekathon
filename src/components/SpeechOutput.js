import React, { useEffect } from "react";

function SpeechOutput({ text }) {
  useEffect(() => {
    if (text) {
      speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  }, [text]);

  return null;
}

export default SpeechOutput;
