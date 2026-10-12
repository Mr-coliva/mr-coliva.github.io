
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");

const languageMenu = document.querySelector(".language-menu");
const languageToggle = document.querySelector(".language-toggle");
const languageButtons = document.querySelectorAll("[data-lang]");
const themeToggle = document.querySelector(".theme-toggle");

// MOBILE NAVIGATION
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// CLOSE MOBILE MENU WHEN A NAVIGATION LINK IS CLICKED
navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        if (languageMenu) {
            languageMenu.classList.remove("open");
        }

        if (languageToggle) {
            languageToggle.setAttribute("aria-expanded", "false");
        }
    });
});

// LANGUAGE MENU
if (languageToggle && languageMenu) {
    languageToggle.addEventListener("click", () => {
        const isOpen = languageMenu.classList.toggle("open");

        languageToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });
}

// SAVE SELECTED LANGUAGE
languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedLanguage = button.dataset.lang;

        document.documentElement.lang = selectedLanguage;

        try {
            localStorage.setItem("preferred-language", selectedLanguage);
        } catch (error) {
            // The site still works if browser storage is unavailable.
        }

        if (languageMenu) {
            languageMenu.classList.remove("open");
        }

        if (languageToggle) {
            languageToggle.setAttribute("aria-expanded", "false");
        }

        if (navLinks) {
            navLinks.classList.remove("active");
        }
    });
});

// LIGHT / DARK THEME
function setTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);

    if (themeToggle) {
        themeToggle.textContent = isDark ? "☀ Claro" : "☾ Oscuro";
        themeToggle.setAttribute("aria-pressed", String(isDark));
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-theme");

        setTheme(isDark);

        try {
            localStorage.setItem("preferred-theme", isDark ? "dark" : "light");
        } catch (error) {
            // The theme still works if browser storage is unavailable.
        }
    });
}

// RESTORE SAVED THEME AND LANGUAGE
try {
    const savedTheme = localStorage.getItem("preferred-theme");
    const savedLanguage = localStorage.getItem("preferred-language");

    setTheme(savedTheme === "dark");

    if (savedLanguage) {
        document.documentElement.lang = savedLanguage;
    }
} catch (error) {
    setTheme(false);
}
