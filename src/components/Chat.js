import React, { useState } from "react";
import SpeechInput from "./SpeechInput";
import SpeechOutput from "./SpeechOutput";
import TranscriptionView from "./TranscriptionView";
import { getAIResponse } from "../api/geminiApi";

function Chat() {
    const [transcriptions, setTranscriptions] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [error, setError] = useState(null);
    const [isMuted, setIsMuted] = useState(false); 
    const [synth, setSynth] = useState(null); 

    const handleUserSpeech = async (text) => {
        setError(null);
        console.log("User said:", text); 
        setTranscriptions((prev) => [...prev, { user: true, text }]);
        setIsSpeaking(true);
    
        try {
            const response = await getAIResponse(text);
            console.log("AI Response:", response); 
            
            
            const cleanedResponse = response.replace(/\*{1,2}/g, '');  // Remove '*' and '**' symbols
    
            setTranscriptions((prev) => [...prev, { user: false, text: cleanedResponse }]);
    
            if (!isMuted) {
               
                const utterance = new SpeechSynthesisUtterance(cleanedResponse);
                utterance.lang = "en-US";
                utterance.onend = () => {
                    setIsSpeaking(false); 
                };
                speechSynthesis.speak(utterance);
                setSynth(utterance);
            }
        } catch (err) {
            console.error("Error in AI response:", err);
            setError("Failed to fetch a response. Please try again.");
        }
    };
    

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (isMuted) {
            speechSynthesis.resume(); 
        } else {
            speechSynthesis.pause(); 
        }
    };

   
    const stopSpeaking = () => {
        if (synth) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    return (
        <div className="chat-container">
            <SpeechInput onSpeechComplete={handleUserSpeech} />
            {error && <div className="error-message">{error}</div>}
            <TranscriptionView transcriptions={transcriptions} />
            {isSpeaking && (
                <SpeechOutput text={transcriptions[transcriptions.length - 1]?.text || ""} />
            )}
            <div className="controls">
                <button onClick={toggleMute} className="mute-button">
                    {isMuted ? "Unmute" : "Mute"}
                </button>
                <button onClick={stopSpeaking} className="stop-button">
                    Stop Speaking
                </button>
            </div>
        </div>
    );
}

export default Chat;
