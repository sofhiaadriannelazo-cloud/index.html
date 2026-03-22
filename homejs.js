// dito nakalagay js ng home

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginbtn");
    const logoutBtn = document.getElementById("logoutbtn");
	const journalBtn = document.getElementById("journalbtn");
    const userIcon = document.getElementById("userIcon");
    const guestIcon = document.getElementById("guestIcon");
    const userEmailDisplay = document.getElementById("userEmailDisplay");

    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser) {
        // --- LOGGED IN STATE ---
        userIcon.style.display = "flex";
        userEmailDisplay.textContent = loggedUser;
        
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";
        guestIcon.style.display = "none";
    } else {
        // --- GUEST STATE ---
        userIcon.style.display = "none";
        guestIcon.style.display = "flex";
        
        logoutBtn.style.display = "none";
        loginBtn.style.display = "block";
    }

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

