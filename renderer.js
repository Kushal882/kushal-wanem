// Get elements
const noteInput = document.getElementById("note");
const saveBtn = document.getElementById("save");
const clearBtn = document.getElementById("clear");
const statusDiv = document.getElementById("status");

// Load saved note when page opens
async function loadNote() {
    try {
        const result = await window.electronAPI.loadNote();
        if (result.success) {
            noteInput.value = result.note;
            updateStatus("Note loaded from file.");
        } else {
            updateStatus("No saved note found.");
        }
    } catch (error) {
        updateStatus("Error loading note.", "error");
    }
}

loadNote();

// Auto-save functionality
let autoSaveTimeout;
noteInput.addEventListener("input", function () {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(autoSave, 1000); // Auto-save after 1 second of inactivity
});

async function autoSave() {
    const noteText = noteInput.value;
    try {
        const result = await window.electronAPI.saveNote(noteText);
        if (result.success) {
            updateStatus("Auto-saved.");
        } else {
            updateStatus("Auto-save failed.", "error");
        }
    } catch (error) {
        updateStatus("Error during auto-save.", "error");
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
        } else {
            updateStatus("Save failed.", "error");
        }
    } catch (error) {
        updateStatus("Error saving note.", "error");
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