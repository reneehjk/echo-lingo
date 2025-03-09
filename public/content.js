document.getElementById("speak-button").addEventListener("click", () => {
    const text = document.getElementById("text-input").value;
    if (text) {
      chrome.tts.speak(text, {
        rate: 1.0, 
        pitch: 2.0,
        volume: 1.0, 
        onEvent: (event) => {
          if (event.type === "end") {
            console.log("Speech finished.");
          }
        },
      });
    } else {
      alert("Please enter some text to speak.");
    }
  });