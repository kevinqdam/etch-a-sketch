/* Constants */
const gridSideLengthInPx = 960;
const gridElementBorderWidthInPx = 1;
const defaultGridElementBorderWidth = 
    gridElementBorderWidthInPx.toString() + "px";
const doubleGridElementBorderWidth = 
    (2 * gridElementBorderWidthInPx).toString() + "px";

/* DOM Elements */
const grid = document.querySelector(".grid");
const resetButton = document.querySelector(".reset-btn");
generateGrid(16);

/* Click to draw */
let isDrawing = false;
document.addEventListener("mousedown", () => { isDrawing = true; });
document.addEventListener("mouseup", () => { isDrawing = false; });

/* Reset Button */
resetButton.addEventListener("click", e => { resetGrid(e) });

function generateGrid(gridSideCount) {
  let gridElementSideLengthInPx = 
      calculateGridElementSideLengthInPx(gridSideCount);
  populateGrid(gridElementSideLengthInPx, gridSideCount);
}

function calculateGridElementSideLengthInPx(gridSideCount) {
  let availableLength = gridSideLengthInPx - 
      ((gridElementBorderWidthInPx * gridSideCount) + 1);
  if (gridSideCount < 15) {
    return Math.floor(availableLength / gridSideCount);
  }
  return Math.round(availableLength / gridSideCount);
}

function populateGrid(gridElementSideLengthInPx, gridSideCount) {
  for (let i = 0; i < Math.pow(gridSideCount, 2); i++) {
    let gridElement = 
        generateGridElement(gridElementSideLengthInPx, gridSideCount, i);
    grid.appendChild(gridElement);
  }
}

function generateGridElement(gridElementSideLengthInPx, gridSideCount, i) {
  let gridElement = document.createElement("div");
  gridElement.classList.add("grid-element");
  gridElement.style.height = gridElementSideLengthInPx.toString() + "px";
  gridElement.style.width = gridElementSideLengthInPx.toString() + "px";
  gridElement.addEventListener("mouseover", e => { shade(e); });
  return gridElement;
}

function shade(e) {
  if (isDrawing) {
    e.target.style.backgroundColor = "#" + randomColor();
  }
}

function randomColor() {
  return Math.floor(Math.random()*16777215).toString(16);
}

function resetGrid(e) {
  let gridSideCount = promptUserForGridSideCount();
  clearGrid();
  generateGrid(gridSideCount);
}

function promptUserForGridSideCount() {
  let gridSideCount = 
      prompt("How many squares per side would you like to make the new grid?");
  while (!isValidInteger(gridSideCount)) {
    gridSideCount = prompt("Please try again.\n\n" + 
        "How many squares per side would you like to make the new grid?");
  }
  return gridSideCount;
}

function isValidInteger(userInput) {
  userInput = Number.parseInt(userInput.trim());
  return Number.isInteger(userInput);
}

function clearGrid() {
  let gridElements = Array.from(grid.childNodes);
  gridElements.forEach(gridElement => {
    gridElement.remove();
  })
}
