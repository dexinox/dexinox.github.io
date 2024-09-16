// Smooth scroll for navigation links (menu)
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Smooth scroll for buttons (e.g., Email Me, Schedule a Call buttons)
document.querySelectorAll('.contact-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const target = document.querySelector('#contact'); // Example: scroll to contact section
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
