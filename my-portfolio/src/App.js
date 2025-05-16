import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

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

// Add click event for project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
      window.open(card.dataset.url, '_blank');
  });
});


