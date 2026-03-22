let db;
let isLoginMode = true;

// OPEN DATABASE
const request = indexedDB.open("appDB", 1);

request.onupgradeneeded = function (e) {
    db = e.target.result;

    if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "email" });
    }
};

request.onsuccess = function (e) {
    db = e.target.result;
};


// TOGGLE LOGIN / SIGNUP
function toggleMode() {
    isLoginMode = !isLoginMode;

    document.getElementById("formTitle").textContent =
        isLoginMode ? "Login" : "Sign Up";

    document.getElementById("authBtn").textContent =
        isLoginMode ? "Login" : "Create Account";

    document.getElementById("toggleText").innerHTML =
        isLoginMode
            ? 'No account? <a href="#" onclick="toggleMode()">Sign up</a>'
            : 'Already have an account? <a href="#" onclick="toggleMode()">Login</a>';
}


// HANDLE LOGIN OR SIGNUP
function handleAuth() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Fill all fields.");
        return;
    }

    if (isLoginMode) {
        loginUser(email, password);
    } else {
        signupUser(email, password);
    }
}


// SIGN UP
function signupUser(email, password) {
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");

    const request = store.add({ email, password });

    request.onsuccess = function () {
        // Initialize empty journal for this user
        localStorage.setItem(`entries_${email}`, JSON.stringify([]));

        alert("Account created! You can now login.");
        toggleMode();
    };

    request.onerror = function () {
        alert("User already exists.");
    };
}


// LOGIN
function loginUser(email, password) {
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");

    const request = store.get(email);

    request.onsuccess = function () {
        const user = request.result;

        if (!user || user.password !== password) {
            alert("Invalid email or password.");
            return;
        }

        localStorage.setItem("loggedUser", email);
        window.location.href = "index.html";
    };
}


// REQUIRE LOGIN 
function requireLogin() {
    if (!localStorage.getItem("loggedUser")) {
        window.location.href = "login.html";
    }
}


// LOGOUT
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {

    const exitBtn = document.getElementById("exitlog");
    if (exitBtn) {
        exitBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

});

document.addEventListener("DOMContentLoaded", () => {
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            const isPassword = passwordInput.type === "password";
            
            // Toggle input type
            passwordInput.type = isPassword ? "text" : "password";
            
            // Toggle icon
            togglePassword.innerHTML = isPassword
                ? '<i class="fa-solid fa-eye"></i>'
                : '<i class="fa-solid fa-eye-slash"></i>';
        });
    }
});