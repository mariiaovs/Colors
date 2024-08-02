const colorSections = document.querySelectorAll('[data-js="color"]');

const hexCodes = "0123456789ABCDEF";

function generateRandomColor() {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  console.log(Math.floor(Math.random() * hexCodes.length));
  return color;
}

function setRandomColors() {
  colorSections.forEach((colorSection) => {
    colorSection.style.background = generateRandomColor();
  });
}

setRandomColors();
