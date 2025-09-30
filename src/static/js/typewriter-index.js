document.addEventListener("DOMContentLoaded", () => {
  const phrases = [
    "Making an impact.",
    "Creating STEM opportunities.",
    "Building the future.",
  ];

  const typingSpeed = 80;   // ms 
  const erasingSpeed = 50;  // ms 
  const pause = 2000;       // pause between phrases
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typedText = document.getElementById("typed-text");
  const cursor = document.getElementById("cursor");

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      typedText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, pause);
        return;
      }
    } else {
      typedText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
  }

  // Blink cursor
  setInterval(() => {
    cursor.style.visibility =
      cursor.style.visibility === "hidden" ? "visible" : "hidden";
  }, 500);

  type();
});
