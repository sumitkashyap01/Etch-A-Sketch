const container = document.querySelector(".container");
const slider = document.querySelector("#slider");
const sizeH = document.querySelector(".box-size-h");
const sizeW = document.querySelector(".box-size-w");
const color = document.querySelector("#color");
const colorBtn = document.querySelector(".color-btn");
const eraseBtn = document.querySelector(".erase");
const resetBtn = document.querySelector(".reset");
const rainbowBtn = document.querySelector(".rainbow");
const menu = document.querySelector(".openbtn");
const Closemenu = document.querySelector(".closebtn");
const header = document.querySelector("header");
const option = document.querySelector(".options");

const createGrids = (val) => {
  container.innerHTML = "";

  sizeH.textContent = val;
  sizeW.textContent = val;

  const Area = Number(val) * Number(val);
  container.style.gridTemplateColumns = `repeat(${Number(val)}, 1fr)`;

  // Create grid squares
  for (let i = 1; i <= Area; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.border = "1px solid black";
    container.appendChild(square);
  }

  let isDrawing = false;
  let isErase = false;
  let isRainbow = false;
  let hue = 0;

  eraseBtn.addEventListener("click", () => {
    isErase = !isErase;
    eraseBtn.classList.toggle("active", isErase);
  });

  rainbowBtn.addEventListener("click", () => {
    isRainbow = !isRainbow;
    rainbowBtn.classList.toggle("rainbowbtn", isRainbow);
  });

  container.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("square")) {
      isDrawing = true;
      if (isErase) {
        e.target.style.backgroundColor = "white";
        e.target.style.border = "1px solid black";
      } else if (isRainbow) {
        hue = (hue + 20) % 360;
        e.target.style.border = "1px solid black";
        e.target.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        3;
      } else {
        e.target.style.backgroundColor = color.value;
        e.target.style.border = `1px solid ${color.value}`;
      }
    }
  });

  container.addEventListener("mousemove", (e) => {
    if (isDrawing && e.target.classList.contains("square")) {
      if (isErase) {
        e.target.style.border = "1px solid black";
        e.target.style.backgroundColor = "white";
      } else if (isRainbow) {
        hue = (hue + 20) % 360;
        e.target.style.border = "1px solid black";
        e.target.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
      } else {
        e.target.style.backgroundColor = color.value;
        e.target.style.border = `1px solid ${color.value}`;
      }
    }
  });

  container.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  container.addEventListener("mouseleave", () => {
    isDrawing = false;
  });
};

createGrids(16);

resetBtn.addEventListener("click", () => {
  const square = document.querySelectorAll(".square");
  square.forEach((s) => {
    s.style.backgroundColor = "white";
  });
});

//creates squares Dynamically
slider.addEventListener("input", (e) => {
  createGrids(e.target.value);
});

colorBtn.addEventListener("click", () => {
  color.click();
});

menu.addEventListener("click", () => {
  // Toggle visibility of the header and options
  header.classList.toggle("opened");
  option.classList.toggle("options-visible");

  // Hide the menu button and show the close button
  menu.classList.add("openbtn-hidden");
  Closemenu.classList.remove("openbtn-hidden");
});

Closemenu.addEventListener("click", () => {
  // Toggle visibility of the header and options
  header.classList.toggle("opened");
  option.classList.toggle("options-visible");

  // Show the menu button and hide the close button
  menu.classList.remove("openbtn-hidden");
  Closemenu.classList.add("openbtn-hidden");
});
