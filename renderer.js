// Get elements
const noteInput = document.getElementById("note");
const saveBtn = document.getElementById("save");
const clearBtn = document.getElementById("clear");
const newBtn = document.getElementById("new");
const statusDiv = document.getElementById("status");
const saveIndicator = document.getElementById("save-indicator");

// Load saved note when page opens
async function loadNote() {
    try {
        const result = await window.electronAPI.loadNote();
        if (result.success) {
            noteInput.value = result.note;
            updateStatus("Note loaded from file.");
            updateSaveIndicator(true);
        } else {
            updateStatus("No saved note found.");
            updateSaveIndicator(false);
        }
    } catch (error) {
        updateStatus("Error loading note.", "error");
        updateSaveIndicator(false);
    }
}

loadNote();

// Auto-save functionality
let autoSaveTimeout;
noteInput.addEventListener("input", function () {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(autoSave, 1000); // Auto-save after 1 second of inactivity
    updateSaveIndicator(false); // Mark as not saved when typing
});

async function autoSave() {
    const noteText = noteInput.value;
    try {
        const result = await window.electronAPI.saveNote(noteText);
        if (result.success) {
            updateStatus("Auto-saved.");
            updateSaveIndicator(true);
        } else {
            updateStatus("Auto-save failed.", "error");
            updateSaveIndicator(false);
        }
    } catch (error) {
        updateStatus("Error during auto-save.", "error");
        updateSaveIndicator(false);
    }
}

// Manual save
saveBtn.addEventListener("click", async function () {
    const noteText = noteInput.value;

    if (noteText.trim() === "") {
        updateStatus("Note is empty! Nothing to save.", "error");
        return;
    }

    try {
        const result = await window.electronAPI.saveNote(noteText);
        if (result.success) {
            updateStatus("Note saved successfully!");
            updateSaveIndicator(true);
        } else {
            updateStatus("Save failed.", "error");
            updateSaveIndicator(false);
        }
    } catch (error) {
        updateStatus("Error saving note.", "error");
        updateSaveIndicator(false);
    }
});

// Clear note
clearBtn.addEventListener("click", async function () {
    if (confirm("Are you sure you want to clear the note?")) {
        noteInput.value = "";
        try {
            const result = await window.electronAPI.clearNote();
            if (result.success) {
                updateStatus("Note cleared.");
                updateSaveIndicator(false);
            } else {
                updateStatus("Clear failed.", "error");
            }
        } catch (error) {
            updateStatus("Error clearing note.", "error");
        }
    }
});

// Update status message
function updateStatus(message, type = "success") {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    setTimeout(() => {
        statusDiv.textContent = "";
    }, 3000);
}

// Update save indicator
function updateSaveIndicator(saved) {
    const indicator = document.getElementById("save-indicator");
    if (saved) {
        indicator.textContent = "Saved";
        indicator.classList.add("saved");
    } else {
        indicator.textContent = "Not saved";
        indicator.classList.remove("saved");
    }
}

// New note
newBtn.addEventListener("click", function () {
    if (noteInput.value.trim() !== "") {
        if (confirm("You have unsaved changes. Create a new note anyway?")) {
            noteInput.value = "";
            updateStatus("New note started.");
            updateSaveIndicator(false);
        }
    } else {
        noteInput.value = "";
        updateStatus("New note started.");
        updateSaveIndicator(false);
    }
});