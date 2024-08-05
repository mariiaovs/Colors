const colorSections = document.querySelectorAll('[data-js="color"]');
const lockButtons = document.querySelectorAll('[data-js="lock-button"]');
const hexCodes = "0123456789ABCDEF";

document.addEventListener("keydown", (event) => {
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
  colorSections.forEach((colorSection) => {
    const color = generateRandomColor();
    const heading = colorSection.querySelector("h2");
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
    console.log(lockIcon);
    lockIcon.classList.toggle("fa-lock-open");
    lockIcon.classList.toggle("fa-lock");
  });
});
