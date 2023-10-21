/* OLD OLD OLD
 *
 *
 * // Get references to the button and content area
const colorChangeButton = document.getElementById("colorChangeButton");
const contentArea = document.getElementById("contentArea");

// Add a click event listener to the button
colorChangeButton.addEventListener("click", function () {
    // Generate a random background color
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    
    // Change the background color of the content area
    contentArea.style.backgroundColor = randomColor;
}); 


OLD OLD OLD */

// Get references to the button, content area, color code elements, and lock button
const colorChangeButton = document.getElementById("colorChangeButton");
const lockColorsButtons = document.querySelectorAll(".lockColorsButton");
const contentAreas = document.querySelectorAll(".content-area");
const colorCodeElements = document.querySelectorAll(".colorCode");

const colorsLocked = Array(contentAreas.length).fill(false); // Array to track if colors are locked

// Function to generate a random hex color code
function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// Function to update the content area with a color and its hex code
function updateContentArea(index) {
    const randomColor = getRandomColor();

    // Change the background color of the content area
    contentAreas[index].style.backgroundColor = randomColor;

    // Display the hex color code in the content area
    colorCodeElements[index].textContent = "" + randomColor;
}

// Add a click event listener to the "Change Background Colors" button
colorChangeButton.addEventListener("click", function () {
    if (!colorsLocked.every(Boolean)) {
        contentAreas.forEach((contentArea, index) => {
            if (!colorsLocked[index]) {
                updateContentArea(index);
            }
        });
    }
});

// Add click event listeners to the "Lock Colors" buttons
lockColorsButtons.forEach((lockColorsButton, index) => {
    lockColorsButton.addEventListener("click", function () {
        colorsLocked[index] = !colorsLocked[index]; // Toggle the lock state

        // Change the text on the button to reflect the lock state
        lockColorsButton.textContent = colorsLocked[index] ? "Unlock Color" : "Lock Color";
    });
});

function saveColorCode(index) {
    const colorCode = colorCodeElements[index].textContent;
    const savedColorsList = document.getElementById("savedColorsList");
    const listItem = document.createElement("li");
    listItem.className = "savedColorItem";

    // Create a color thumbnail div
    const colorThumbnail = document.createElement("div");
    colorThumbnail.className = "colorThumbnail";
    colorThumbnail.style.backgroundColor = colorCode; // Use the full color code, including the "#"

    listItem.appendChild(colorThumbnail);

    // Create a span for the hex color code
    const colorCodeSpan = document.createElement("span");
    colorCodeSpan.textContent = colorCode;
    listItem.appendChild(colorCodeSpan);

    // Create a button to delete the saved color
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
        savedColorsList.removeChild(listItem);
    });
    listItem.appendChild(deleteButton);

    savedColorsList.appendChild(listItem);
}

// Add a click event listener to the "Save Color Code" button
colorCodeElements.forEach((colorCodeElement, index) => {
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Color Code";
    saveButton.addEventListener("click", function () {
        saveColorCode(index);
    });
    colorCodeElement.parentElement.appendChild(saveButton);
});

