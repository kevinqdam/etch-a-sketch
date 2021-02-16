let gridSideCount = 16;
const grid = document.querySelector('.grid');
const resetButton = document.querySelector('.reset-btn');

let isDrawing = false;
document.addEventListener('mousedown', () => {
  isDrawing = true;
});
document.addEventListener('mouseup', () => {
  isDrawing = false;
});

function clearGrid() {
  const gridElements = Array.from(grid.childNodes);
  gridElements.forEach((gridElement) => {
    gridElement.remove();
  });
}

function isValidSize(userInput) {
  const num = Number.parseInt(userInput.trim(), 10);
  return (Number.isInteger(num, 10) && num <= 100 && num > 0);
}

function promptUserForGridSideCount() {
  // eslint-disable-next-line no-alert
  gridSideCount = prompt(
    'How many squares per side would you like to make the new grid (100 max)?',
  );
  while (!isValidSize(gridSideCount)) {
    // eslint-disable-next-line no-alert
    gridSideCount = prompt(
      'Please try again.\n\nHow many squares per side would you like to make the new grid (100 max)?',
    );
  }
  return gridSideCount;
}

function setGridSize() {
  grid.style.gridTemplateColumns = `repeat(${gridSideCount}, 1fr)`;
}

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function color(e) {
  e.target.style.backgroundColor = randomColor();
}

function generateGridElement() {
  const gridElement = document.createElement('div');
  gridElement.classList.add('grid-element');
  gridElement.addEventListener('mouseover', (e) => {
    if (isDrawing) {
      color(e);
    }
  });
  gridElement.addEventListener('mousedown', (e) => {
    color(e);
  });
  return gridElement;
}

function populateGrid() {
  for (let i = 0; i < gridSideCount ** 2; i += 1) {
    const gridElement = generateGridElement();
    grid.appendChild(gridElement);
  }
}

function generateGrid() {
  setGridSize();
  populateGrid();
}

function resetGrid() {
  promptUserForGridSideCount();
  clearGrid();
  generateGrid(gridSideCount);
}

window.addEventListener('load', () => {
  generateGrid(gridSideCount);
});
resetButton.addEventListener('click', (e) => {
  resetGrid(e);
});
