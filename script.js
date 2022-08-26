const grid = document.querySelector(".grid");
const slider = document.getElementById("slider");

function createGrid(num) {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${num}, 1fr)`;
  for (let i = 0; i < num * num; i++) {
    grid.innerHTML += "<div class='grid__box'></div>";
  }
  draw();
}

createGrid(15); // Grid will break over 35 x 35
slider.addEventListener("input", function () {
  createGrid(slider.value);
});

// Color Functionality
function draw() {
  const gridBox = document.querySelectorAll(".grid__box");

  function generateColor() {
    if (this.style.backgroundColor === "") {
      this.style.backgroundColor = `hsl(${Math.floor(
        Math.random() * 255
      )}, 100%, 90%)`;
    } else {
      this.style.backgroundColor = darken(this.style.backgroundColor);
    }
  }

  gridBox.forEach(function (el) {
    el.addEventListener("mouseover", generateColor);
  });
}

function darken(rgb) {
  if (rgb.length === 18) {
    let r = rgb.slice(4, 7);
    let g = rgb.slice(9, 12);
    let b = rgb.slice(14, 17);
    r <= 150 ? (r = 0) : (r *= 0.955);
    g <= 150 ? (g = 0) : (g *= 0.955);
    b <= 150 ? (b = 0) : (b *= 0.955);
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  } else {
    return `rgb(0, 0, 0)`;
  }
}

// Reset
const resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", function () {
  createGrid(15);
  slider.value = 15;
});
