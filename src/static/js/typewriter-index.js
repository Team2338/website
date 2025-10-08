document.addEventListener("DOMContentLoaded", () => {
  // Reusable typewriter function
  function initTypewriter(container, typedText, cursor) {
    // Read configuration from data attributes
    const phrases = JSON.parse(container.getAttribute('data-phrases') || '["Making an impact.","Creating STEM opportunities.","Building the future."]');
    const typingSpeed = parseInt(container.getAttribute('data-typing-speed'), 10) || 80;
    const erasingSpeed = parseInt(container.getAttribute('data-erasing-speed'), 10) || 50;
    const pause = parseInt(container.getAttribute('data-pause'), 10) || 2000;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

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
  }

  // Find the container and elements
  const container = document.getElementById("typewriter-container") || document.body;
  const typedText = document.getElementById("typed-text");
  const cursor = document.getElementById("cursor");

  if (typedText && cursor) {
    initTypewriter(container, typedText, cursor);
  }
});
