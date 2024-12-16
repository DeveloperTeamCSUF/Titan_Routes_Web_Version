// Function to Speak Text
function speakText(text) {
  if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Set language
      utterance.rate = 1; // Normal speed
      utterance.pitch = 1; // Normal pitch
      window.speechSynthesis.speak(utterance);
  } else {
      alert('Your browser does not support voice synthesis.');
  }
}

// Function to Stop Speech
function stopSpeech() {
  if (speechSynthesis.speaking) {
      speechSynthesis.cancel(); // Stops ongoing speech
  }
}

//to ensure audio works on mobile browsers (Safari, Chrome, etc.)
document.addEventListener('touchend', function () {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  if (context.state === 'suspended') {
      context.resume().then(() => {
          console.log("AudioContext resumed on touch interaction.");
      });
  }
});


// Attach functions to global window object
window.speakText = speakText;
window.stopSpeech = stopSpeech;