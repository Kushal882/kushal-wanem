// Get elements
const noteInput = document.getElementById("note");
const saveBtn = document.getElementById("save");

// Load saved note when page opens
window.onload = function () {
    const savedNote = localStorage.getItem("quickNote");
    if (savedNote) {
        noteInput.value = savedNote;
    }
};

// Save note
saveBtn.addEventListener("click", function () {
    const noteText = noteInput.value;

    if (noteText.trim() === "") {
        alert("Note is empty!");
        return;
    }

    localStorage.setItem("quickNote", noteText);
    alert("Note saved!");
});