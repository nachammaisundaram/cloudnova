// Slide panel navigation
const menuToggle = document.getElementById('menuToggle');
const navPanel = document.getElementById('navPanel');
const backdrop = document.getElementById('backdrop');
const panelLinks = document.querySelectorAll('.panel-links a');
const panelItems = document.querySelectorAll('.panel-links li');

function toggleMenu() {
  const isOpen = navPanel.classList.toggle('open');
  backdrop.classList.toggle('open');
  menuToggle.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isOpen);
  navPanel.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);
backdrop.addEventListener('click', toggleMenu);

panelLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navPanel.classList.contains('open')) toggleMenu();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navPanel.classList.contains('open')) toggleMenu();
});

// Hover preview + drifting glow inside the panel
panelItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    panelItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const offsetPercent = (item.offsetTop / navPanel.clientHeight) * 100;
    navPanel.style.setProperty('--glow-y', offsetPercent + '%');
  });
});
navPanel.addEventListener('mouseleave', () => {
  panelItems.forEach(i => i.classList.remove('active'));
});

// Interactive logo: letters repel from cursor, "blast" apart on click and reassemble
const logoText = document.getElementById('logoText');
if (logoText) {
  // Preserve the "Nova" accent-colored span while splitting letters
  const accentSpan = logoText.querySelector('span');
  const accentText = accentSpan ? accentSpan.textContent : '';
  const plainText = logoText.childNodes[0] ? logoText.childNodes[0].textContent : logoText.textContent;

  logoText.innerHTML = '';
  [...plainText].forEach(ch => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = ch;
    logoText.appendChild(span);
  });
  [...accentText].forEach(ch => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.style.color = 'var(--accent-light)';
    span.textContent = ch;
    logoText.appendChild(span);
  });

  const letters = logoText.querySelectorAll('.letter');

  logoText.addEventListener('mousemove', (e) => {
    const rect = logoText.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    letters.forEach(letter => {
      const letterRect = letter.getBoundingClientRect();
      const letterX = letterRect.left - rect.left + letterRect.width / 2;
      const distance = mouseX - letterX;
      const strength = Math.max(0, 30 - Math.abs(distance)) / 30;
      const push = -distance * strength * 0.6;
      letter.style.transform = `translateY(${-Math.abs(push) * 0.4}px) translateX(${push}px)`;
    });
  });

  logoText.addEventListener('mouseleave', () => {
    letters.forEach(letter => { letter.style.transform = ''; });
  });

  // Click = "blast" apart then reassemble
  logoText.addEventListener('click', () => {
    letters.forEach(letter => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 18 + Math.random() * 14;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;
      const rot = (Math.random() - 0.5) * 60;
      letter.style.transition = 'transform 0.25s ease-out';
      letter.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
      setTimeout(() => {
        letter.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        letter.style.transform = '';
      }, 250);
    });
  });
}

// Hero illustration: gentle 3D tilt that follows the cursor
const heroIllustration = document.getElementById('heroIllustration');
if (heroIllustration) {
  heroIllustration.addEventListener('mousemove', (e) => {
    const rect = heroIllustration.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = -((y - centerY) / centerY) * 10;
    heroIllustration.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  heroIllustration.addEventListener('mouseleave', () => {
    heroIllustration.style.transform = '';
  });
}

// Contact form handling (demo only - no backend)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = 'Thank you! Your message has been received.';
  form.reset();
});

// Add shadow to navbar on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
