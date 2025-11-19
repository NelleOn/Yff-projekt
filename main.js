
/**
 * @type HTMLCanvasElement
 */
const canvas = document.getElementById("canvas");
const guide = document.getElementById("guide");
const colorInput = document.getElementById("colorInput");
const clearButton = document.getElementById("clearButton");
const toggleGuide = document.getElementById("toggleGuide");
const drawingContext = canvas.getContext("2d");

const CELL_SIZE_COUNT = 6; // amount of cells per row/column
const cellPixelLength = canvas.width / CELL_SIZE_COUNT;
const colorHistory = {};

// set default color
colorInput.value = "#009578";

// Initialize the canvas background
drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, canvas.width, canvas.height);

// Handle mouse down events on the canvas
function handleCanvasMouseDown(e) {
    // Only proceed for left mouse button (0 = left)
    if (e.button !== 0) return;
    // Save the current canvas before drawing
lastImage = drawingContext.getImageData(0, 0, canvas.width, canvas.height);


    // Get canvas position on the page
    const canvasBoundingRect = canvas.getBoundingClientRect();
    console.log(canvasBoundingRect);

    // Convert page coordinates to canvas-local coordinates
    const x = e.clientX - canvasBoundingRect.left;
    const y = e.clientY - canvasBoundingRect.top;

    // Convert pixel coordinates into grid cell indices
    const cellX = Math.floor(x / cellPixelLength);
    const cellY = Math.floor(y / cellPixelLength);
    
    // Get color stored for this cell, or fall back to the currently selected color
    console.currentColor= colorHistory[`${cellX},${cellY}`] || colorInput.value;

    // If CTRL is held while clicking, attempt to pick the color from the cell
    if (e.ctrlKey) {
        if (currentColor) {
            // Set the color picker to the picked color
            colorInput.value = current.Color;
        } else {
            // If there's no stored color, call fillCell (intended behavior)
            fillCell
        }
    }

    // Fill the clicked cell with the current color
    fillCell(cellX, cellY);
    console.log("Clicked:", x, y);
}


// Clear button handler
function handleClearButtonClick() {

    const yes = confirm ("Are you sure you want to clear the canvas?");
    if (!yes) return;

    drawingContext.fillStyle = "#ffffff";
    drawingContext.fillRect(0, 0, canvas.width, canvas.height);
    console.log("Canvas cleared");
}
//undo feature
let lastImage = null;

// Toggle guide handler
function handleToggleGuideChange() {
    console.log("Guide toggled");
}

// Fill a cell at given coordinates
function fillCell(cellX, cellY) {
    const startX = cellX * cellPixelLength;
    const startY = cellY * cellPixelLength;

    drawingContext.fillStyle = colorInput.value;
    drawingContext.fillRect(startX, startY, cellPixelLength, cellPixelLength);

    // Save color in history (optional feature)
    colorHistory[`${cellX},${cellY}`] = colorInput.value;
}

// Event listeners
canvas.addEventListener("mousedown", handleCanvasMouseDown);
clearButton.addEventListener("click", handleClearButtonClick);
toggleGuide.addEventListener("change", handleToggleGuideChange);

// Undo function
function undoLastAction() {
    if (!lastImage) return;
    drawingContext.putImageData(lastImage, 0, 0);
    console.log("Undo complete!");
}
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "z") {
        undoLastAction();
    }
});

