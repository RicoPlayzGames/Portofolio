// script.js

// Scroll to Projects section when button is clicked
document.getElementById("viewWorkBtn").addEventListener("click", function () {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('::before').style.opacity = '1'; // Show first snake
        card.querySelector('::after').style.opacity = '1'; // Show second snake
    });

    card.addEventListener('mouseleave', () => {
        card.querySelector('::before').style.opacity = '0'; // Hide first snake
        card.querySelector('::after').style.opacity = '0'; // Hide second snake
    });
});