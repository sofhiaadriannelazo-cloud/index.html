// GET CURRENT USER
const currentUser = localStorage.getItem("loggedUser");

if (!currentUser) {
    window.location.href = "login.html";
}



// CORE JOURNAL VARIABLES
let entries = JSON.parse(localStorage.getItem(`entries_${currentUser}`)) || [];
let currentEntryId = null;
let selectedMood = "";

// LOAD ON START
document.addEventListener("DOMContentLoaded", function () {
    loadEntries();
	 const greeting = document.getElementById("greeting");

    if (currentUser && greeting) {
        greeting.textContent = `Hi, ${currentUser}`;
    }
});


// SAVE ENTRY
function saveEntry() {
    const content = document.getElementById("journalEntry").value.trim();

    if (content === "") {
        alert("Please write something first!");
        return;
    }

    const entry = {
        id: currentEntryId || Date.now(),
        date: new Date().toISOString(),
        content: content,
        mood: customCheck.checked && customInput.value.trim() !== ""
            ? customInput.value.trim()
            : selectedMood
    };

    if (currentEntryId) {
        entries = entries.map(e => e.id === currentEntryId ? entry : e);
    } else {
        entries.push(entry);
    }

    localStorage.setItem(`entries_${currentUser}`, JSON.stringify(entries));

    showNewEntry();
    loadEntries();
}

// NEW ENTRY
function showNewEntry() {
    currentEntryId = null;
    document.getElementById("journalEntry").value = "";

    document.querySelectorAll(".mood-btn").forEach(btn =>
        btn.classList.remove("active")
    );

    // Remove highlight
    document.querySelectorAll(".entry-item").forEach(item =>
        item.classList.remove("selected")
    );

    selectedMood = "";
}


// LOAD ENTRIES
function loadEntries() {
    entries = JSON.parse(localStorage.getItem(`entries_${currentUser}`)) || [];

    entries.sort((a, b) => new Date(b.date) - new Date(a.date));

    displayEntries();
    updateStats();
}


// DISPLAY ENTRIES
function displayEntries() {
    const list = document.getElementById("entriesList");

    if (!list) return;

    if (entries.length === 0) {
        list.innerHTML = "<p>No entries yet.</p>";
        return;
    }

    list.innerHTML = entries.map(entry => {
        const date = new Date(entry.date);
        const preview = entry.content.substring(0, 40);

        return `
            <div class="entry-item" data-id="${entry.id}" onclick="viewEntry(${entry.id})">
                <div>${date.toLocaleDateString()}</div>
                <div>${preview}...</div>
                <div class="moodfont">${entry.mood || ""}</div>
            </div>
        `;
    }).join("");
}


// VIEW ENTRY
function viewEntry(id) {
    const entry = entries.find(e => e.id === id);
    if (!entry) return;

    currentEntryId = id;
    document.getElementById("journalEntry").value = entry.content;

    //Remove highlight from all
    document.querySelectorAll(".entry-item").forEach(item =>
        item.classList.remove("selected")
    );

    //Highlight clicked entry
    const selectedItem = document.querySelector(`.entry-item[data-id='${id}']`);
    if (selectedItem) {
        selectedItem.classList.add("selected");
    }
}


// DELETE ENTRY
function deleteEntry() {
    if (!currentEntryId) return;

    if (!confirm("Are you sure you want to delete this entry?")) return;

    entries = entries.filter(e => e.id !== currentEntryId);

    localStorage.setItem(`entries_${currentUser}`, JSON.stringify(entries));

    showNewEntry();
    loadEntries();
}

// MOOD SELECT
function selectMood(button, mood) {
    document.querySelectorAll(".mood-btn").forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");
    selectedMood = mood;

    if (customCheck && customInput) {
        customCheck.checked = false;
        customInput.disabled = true;
        customInput.value = "";
    }
}


// UPDATE STATS
function updateStats() {
    document.getElementById("totalEntries").textContent = entries.length;

    let totalWords = 0;
    entries.forEach(entry => {
        totalWords += entry.content.split(/\s+/).length;
    });

    document.getElementById("totalWords").textContent = totalWords;

    let streak = 0;
    let today = new Date();
    today.setHours(0,0,0,0);

    for (let i = 0; i < entries.length; i++) {
        let entryDate = new Date(entries[i].date);
        entryDate.setHours(0,0,0,0);

        if (entryDate.getTime() === today.getTime()) {
            streak++;
            today.setDate(today.getDate() - 1);
        } else {
            break;
        }
    }

    document.getElementById("currentStreak").textContent = streak;
}


// CUSTOM MOOD CHECKBOX
const customCheck = document.getElementById("customMoodCheck");
const customInput = document.getElementById("customMoodInput");

if (customCheck && customInput) {
    customCheck.addEventListener("change", function () {

        if (this.checked) {
            customInput.disabled = false;

            document.querySelectorAll(".mood-btn").forEach(btn =>
                btn.classList.remove("active")
            );

            selectedMood = "";
        } else {
            customInput.disabled = true;
            customInput.value = "";
        }
    });
}

// custom title //
const titleInput = document.getElementById("titleInput");
const saveBtn = document.getElementById("saveBtn");
const editBtn = document.getElementById("editBtn");

// Load saved title
	document.addEventListener("DOMContentLoaded", function () {

    const savedTitle = localStorage.getItem(`title_${currentUser}`);

    if (savedTitle) {
        titleInput.value = savedTitle;
        titleInput.setAttribute("readonly", true);
		autoResizeInput(titleInput);
        saveBtn.style.display = "none";
        editBtn.style.display = "inline-block";
    }
});

// Save button
saveBtn.addEventListener("click", function () {
    const titleText = titleInput.value.trim();

    if (titleText === "") {
        alert("Title can't be empty");
        return;
    }

    localStorage.setItem(`title_${currentUser}`, titleText);
	autoResizeInput(titleInput);

    titleInput.setAttribute("readonly", true);
    saveBtn.style.display = "none";
    editBtn.style.display = "inline-block";
});

// Edit button
editBtn.addEventListener("click", function () {
    titleInput.removeAttribute("readonly");
    titleInput.focus();

    saveBtn.style.display = "inline-block";
    editBtn.style.display = "none";
});
//resize shit
function autoResizeInput(input) {
    input.style.width = (input.value.length + 1) + "ch";
}

titleInput.addEventListener("input", function () {
    autoResizeInput(this);
});


document.addEventListener("DOMContentLoaded", () => {
    const backBtn = document.getElementById("backbtn");

	// back btn
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
});

