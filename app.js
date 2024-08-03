const colorSections = document.querySelectorAll('[data-js="color"]');

const hexCodes = "0123456789ABCDEF";

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
    heading.textContent = color;
    heading.style.color = calculateLuminance(color) >= 0.18 ? "black" : "white";
    console.log(calculateLuminance(color));
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
