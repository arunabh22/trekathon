import React from "react";

function TranscriptionView({ transcriptions }) {
    return (
      <div className="transcription-view">
        {transcriptions.map((item, index) => (
          <div
            key={index}
            className={item.user ? "user-message" : "ai-message"}
          >
            {item.text}
          </div>
        ))}
      </div>
    );
  }

export default TranscriptionView;