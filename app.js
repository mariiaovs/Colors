const colorSections = document.querySelectorAll('[data-js="color"]');
const lockButtons = document.querySelectorAll('[data-js="lock-button"]');
const headings = document.querySelectorAll('[data-js="heading"]');

const hexCodes = "0123456789ABCDEF";

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code === "Space") {
    setRandomColors();
  }
});

function generateRandomColor() {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return color;
}

function setRandomColors() {
  const colors = [];
  colorSections.forEach((colorSection) => {
    const isLocked = colorSection
      .querySelector("i")
      .classList.contains("fa-lock");
    const heading = colorSection.querySelector("h2");
    if (isLocked) {
      colors.push(heading.textContent);
      return;
    }

    const color = generateRandomColor();
    colors.push(color);
    const lock = colorSection.querySelector("button");
    heading.textContent = color;
    heading.style.color = calculateLuminance(color) >= 0.5 ? "black" : "white";
    lock.style.color = calculateLuminance(color) >= 0.5 ? "black" : "white";
    colorSection.style.background = color;
  });
}

setRandomColors();

function calculateLuminance(hexColor) {
  let r = parseInt(hexColor.substring(1, 3), 16) / 255;
  let g = parseInt(hexColor.substring(3, 5), 16) / 255;
  let b = parseInt(hexColor.substring(5, 7), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

lockButtons.forEach((lockButton) => {
  lockButton.addEventListener("click", () => {
    const lockIcon = lockButton.querySelector("i");
    lockIcon.classList.toggle("fa-lock-open");
    lockIcon.classList.toggle("fa-lock");
  });
});

headings.forEach((heading) => {
  heading.addEventListener("click", () => {
    navigator.clipboard
      .writeText(heading.textContent)
      .then(() => {
        const messageElement = document.createElement("p");
        messageElement.textContent = "Text successfully copied to clipboard!";
        messageElement.className = "message success";
        messageElement.style.backgroundColor = heading.style.color;
        heading.insertAdjacentElement("afterend", messageElement);
        setTimeout(() => {
          messageElement.remove();
        }, 1000);
      })
      .catch((err) => {
        const messageElement = document.createElement("p");
        messageElement.textContent = "Failed to copy text: " + err.message;
        messageElement.className = "message error";
        messageElement.style.backgroundColor = heading.style.color;
        heading.insertAdjacentElement("afterend", messageElement);
        setTimeout(() => {
          messageElement.remove();
        }, 1000);
      });
  });
});
