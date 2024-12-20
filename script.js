// script.js

// Scroll to Projects section when button is clicked
document.getElementById("viewWorkBtn").addEventListener("click", function () {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

// Add mouse enter and leave events for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)'; // Slightly enlarge the card
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)'; // Reset the card size
    });
});