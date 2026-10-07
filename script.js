const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});
