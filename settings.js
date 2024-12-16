document.addEventListener("DOMContentLoaded", function () {
    console.log("settings.js is loaded.");

    // Add CSS styles dynamically
    const style = document.createElement("style");
    style.textContent = `
        /* Overlay styling */
        .overlay {
            background-color: rgba(0, 0, 0, 0.7);
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 1000;
        }

        /* Modal styling */
        .modal {
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            padding: 20px;
            width: 90%;
            max-width: 400px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1001;
            animation: fadeIn 0.3s ease-in-out;
        }

        /* Title */
        .modal-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 20px;
            color: #333333;
        }

        /* Input fields and dropdowns */
        .modal-input,
        .modal-textarea,
        #languageSelector {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            font-size: 1rem;
            border: 1px solid #dddddd;
            border-radius: 5px;
            appearance: none;
            background: #f9f9f9;
            color: #333;
            cursor: pointer;
            outline: none;
            transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .modal-input:focus,
        .modal-textarea:focus,
        #languageSelector:focus {
            border-color: #0066cc;
            background: #ffffff;
        }

        /* Buttons */
        .modal-button {
            display: block;
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            background: #0066cc;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .modal-button:hover {
            background: #005bb5;
        }

        .modal-back {
            background: #cccccc;
        }

        .modal-logout {
            background: #ff4c4c;
        }

        .modal-logout:hover {
            background: #e64545;
        }

        /* Fade-in animation */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translate(-50%, -45%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
    `;
    document.head.appendChild(style);

    const auth = firebase.auth();

    // Create overlay and modal elements for settings
    const overlay = document.createElement("div");
    overlay.id = "settings-overlay";
    overlay.classList.add("overlay");
    overlay.style.display = "none";
    document.body.appendChild(overlay);

    const settingsModal = document.createElement("div");
    settingsModal.id = "settings-modal";
    settingsModal.classList.add("modal");
    settingsModal.style.display = "none";
    document.body.appendChild(settingsModal);

    // Event listener for the settings button
    const settingsBtn = document.getElementById("settingsBtn");
    settingsBtn.addEventListener("click", () => {
        overlay.style.display = "block";
        settingsModal.style.display = "block";
        showMainSettings();
    });

    // Hide modal when clicking on overlay
    overlay.addEventListener("click", () => {
        overlay.style.display = "none";
        settingsModal.style.display = "none";
    });

    function showMainSettings() {
        settingsModal.innerHTML = `
            <h3 class="modal-title">Settings</h3>
            <button id="languageSettingsBtn" class="modal-button" data-translate="languageSettings">Language Settings</button>
            <button class="modal-button" id="editProfileBtn">Edit Profile</button>
            <button class="modal-button" id="changePasswordBtn">Change Password</button>
            <button class="modal-button" id="reportProblemBtn">Report a Problem</button>
            <button class="modal-button" id="mapLocationRequestBtn">Map Location Request</button>
            <button class="modal-button modal-logout" id="logoutBtn">Log Out</button>
        `;

        document.getElementById("languageSettingsBtn").addEventListener("click", showLanguageSettings);
        document.getElementById("editProfileBtn").addEventListener("click", showEditProfile);
        document.getElementById("changePasswordBtn").addEventListener("click", showChangePassword);
        document.getElementById("reportProblemBtn").addEventListener("click", showReportProblem);
        document.getElementById("mapLocationRequestBtn").addEventListener("click", showMapLocationRequest);
        document.getElementById("logoutBtn").addEventListener("click", () => {
            auth.signOut()
                .then(() => {
                    alert("Logged out successfully!");
                    window.location.href = 'login.html';
                })
                .catch((error) => {
                    alert("Error logging out: " + error.message);
                });
        });
    }

    function showMapLocationRequest() {
        settingsModal.innerHTML = `
            <h3 class="modal-title">Map Location Request</h3>
            <form action="https://formspree.io/f/mzzbqbvd" method="POST">
                <label>
                    Your email:
                    <input type="email" name="email" class="modal-input" placeholder="Your Email" required>
                </label>
                <label>
                    Your message:
                    <textarea name="message" class="modal-textarea" placeholder="Describe the location you want to request..." required></textarea>
                </label>
                <button type="submit" class="modal-button">Send</button>
            </form>
            <button id="backToSettingsBtn" class="modal-button modal-back">Back</button>
        `;
        document.getElementById("backToSettingsBtn").addEventListener("click", showMainSettings);
    }

    function showLanguageSettings() {
        settingsModal.innerHTML = `
            <h3 class="modal-title">Language Settings</h3>
            <select id="languageSelector">
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
                <option value="es">Spanish</option>
            </select>
            <button id="saveLanguageBtn" class="modal-button">Save</button>
            <button id="backBtn" class="modal-button modal-back">Back</button>
        `;

        const savedLanguage = localStorage.getItem("language") || "en";
        document.getElementById("languageSelector").value = savedLanguage;

        document.getElementById("saveLanguageBtn").addEventListener("click", () => {
            const selectedLanguage = document.getElementById("languageSelector").value;
            updateLanguage(selectedLanguage);
        });

        document.getElementById("backBtn").addEventListener("click", showMainSettings);
    }

    function showEditProfile() {
        settingsModal.innerHTML = `
            <h3 class="modal-title">Edit Profile</h3>
            <input type="text" id="profileName" class="modal-input" placeholder="Name">
            <input type="email" id="profileEmail" class="modal-input" placeholder="Email">
            <button id="saveProfileBtn" class="modal-button">Save</button>
            <button id="backToSettingsBtn" class="modal-button modal-back">Back</button>
        `;

        const user = auth.currentUser;
        if (user) {
            document.getElementById("profileName").value = user.displayName || "";
            document.getElementById("profileEmail").value = user.email || "";
        }

        document.getElementById("saveProfileBtn").addEventListener("click", () => {
            const name = document.getElementById("profileName").value;
            const email = document.getElementById("profileEmail").value;
            const user = auth.currentUser;
            if (user) {
                user.updateProfile({ displayName: name })
                    .then(() => alert("Profile updated successfully!"))
                    .catch((error) => alert("Error updating profile: " + error.message));
            }
        });

        document.getElementById("backToSettingsBtn").addEventListener("click", showMainSettings);
    }

    function showChangePassword() {
        settingsModal.innerHTML = `
            <h3 class="modal-title">Change Password</h3>
            <input type="password" id="newPassword" class="modal-input" placeholder="New Password">
            <button id="savePasswordBtn" class="modal-button">Save</button>
            <button id="backToSettingsBtn" class="modal-button modal-back">Back</button>
        `;

        document.getElementById("savePasswordBtn").addEventListener("click", () => {
            const newPassword = document.getElementById("newPassword").value;
            const user = auth.currentUser;
            if (!user) {
                alert("You must be signed in to change password.");
                return;
            }
            user.updatePassword(newPassword)
                .then(() => alert("Password updated successfully!"))
                .catch((error) => alert("Error updating password: " + error.message));
        });

        document.getElementById("backToSettingsBtn").addEventListener("click", showMainSettings);
    }

    function showReportProblem() {
        settingsModal.innerHTML = `
            <h3 class="modal-title">Report a Problem</h3>
            <textarea id="problemDescription" class="modal-textarea" placeholder="Describe the problem..."></textarea>
            <button id="submitProblemBtn" class="modal-button">Submit</button>
            <button id="backToSettingsBtn" class="modal-button modal-back">Back</button>
        `;

        document.getElementById("submitProblemBtn").addEventListener("click", () => {
            const description = document.getElementById("problemDescription").value;
            if (!description.trim()) {
                alert("Please describe the problem.");
                return;
            }
            alert("Problem submitted: " + description);
            showMainSettings();
        });

        document.getElementById("backToSettingsBtn").addEventListener("click", showMainSettings);
    }

    function updateLanguage(lang) {
        const LanguageChangeEvent = new CustomEvent("languageChange", { detail: { language: lang } });
        document.dispatchEvent(LanguageChangeEvent);
        localStorage.setItem("language", lang);
        location.reload(); 
    }

    // Update modal translations dynamically
    const savedLang = localStorage.getItem("language") || "en";
    // Ensure setLanguage is defined in language.js, loaded before this script
    if (typeof setLanguage === 'function') {
        setLanguage(savedLang);
    }
});
