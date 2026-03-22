const header = document.querySelector("header");

window.addEventListener("scroll", function() {
  header.classList.toggle("stickey", window.scrollY > 0);
});

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginbtn");
    const logoutBtn = document.getElementById("logoutbtn");
    const journalBtn = document.getElementById("journalbtn");
    const userIcon = document.getElementById("userIcon");
    const guestIcon = document.getElementById("guestIcon");
    const userEmailDisplay = document.getElementById("userEmailDisplay");

    const loggedUser = localStorage.getItem("loggedUser");

    // Function to update UI based on login state
    const updateUI = (isLoggedIn) => {
        if (isLoggedIn) {
            // --- LOGGED IN STATE ---
            if (userIcon) userIcon.style.display = "flex";
            if (userEmailDisplay) userEmailDisplay.textContent = loggedUser; // Use the retrieved loggedUser value
            
            if (logoutBtn) logoutBtn.style.display = "block";
            if (loginBtn) loginBtn.style.display = "none";
            if (guestIcon) guestIcon.style.display = "none";
        } else {
            // --- GUEST STATE ---
            if (userIcon) userIcon.style.display = "none";
            if (guestIcon) guestIcon.style.display = "flex";
            
            if (logoutBtn) logoutBtn.style.display = "none";
            if (loginBtn) loginBtn.style.display = "block";
        }
    };

    // Initial UI update based on localStorage
    updateUI(!!loggedUser); // Convert loggedUser to a boolean

    // Logout Logic
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedUser");
            window.location.reload(); 
        });
    }
    
    // Login btn
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }
    // journal btn
    if (journalBtn) {
        journalBtn.addEventListener("click", () => {
            window.location.href = "journal.html";
        });
    }
});