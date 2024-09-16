// Smooth scroll for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Smooth scroll for buttons (e.g., in contact section)
document.querySelectorAll('.contact-btns button').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#contact'); // Assuming you want to scroll to #contact section
    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});
