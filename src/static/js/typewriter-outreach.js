document.addEventListener("DOMContentLoaded", () => {
  const phrases = [
    "Building our diverse community with",
    "Innovating for equality with",
    "Increasing inclusivity with",
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

  // Blink cursor using CSS animation instead of setInterval to avoid memory leaks
  cursor.classList.add("blink");
  // Dynamically inject CSS for blinking if not already present
  if (!document.getElementById("typewriter-blink-style")) {
    const style = document.createElement("style");
    style.id = "typewriter-blink-style";
    style.textContent = `
      @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
      }
      .blink {
        animation: blink 1s step-end infinite;
      }
    `;
    document.head.appendChild(style);
  }

  type();
});
