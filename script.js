const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const mobileNav = $('#mobile-nav');
const navToggle = $('.nav-toggle');

navToggle?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  mobileNav.setAttribute('aria-hidden', String(!open));
  navToggle.textContent = open ? 'close' : 'menu';
});

$$('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    if (navToggle) navToggle.textContent = 'menu';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

$$('.reveal').forEach(el => observer.observe(el));

const toast = $('#toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

$$('.copy-email').forEach(button => {
  button.addEventListener('click', async () => {
    const email = button.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      $('.copy-status', button.closest('.contact-actions')).textContent = 'copied to clipboard';
      showToast('email copied');
    } catch {
      $('.copy-status', button.closest('.contact-actions')).textContent = email;
      showToast(email);
    }
    setTimeout(() => {
      const status = $('.copy-status', button.closest('.contact-actions'));
      if (status) status.textContent = '';
    }, 2200);
  });
});

function confettiBurst(count = 90) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDuration = `${1.4 + Math.random() * 2.2}s`;
    piece.style.animationDelay = `${Math.random() * .3}s`;
    piece.style.background = `hsl(${Math.floor(Math.random() * 360)} 85% 70%)`;
    piece.style.transform = `translateY(-20px) rotate(${Math.random() * 360}deg)`;
    fragment.appendChild(piece);
  }
  document.body.appendChild(fragment);
  setTimeout(() => $$('.confetti').forEach(node => node.remove()), 4200);
}

$('#secret-button')?.addEventListener('click', () => {
  console.log('%cHey 👀', 'color:#68e4dc;font-size:18px;font-weight:700');
  console.log('%cYou found the console easter egg. chaotic but ships.', 'color:#8ca5aa');
  showToast('console easter egg unlocked');
  confettiBurst();
});

console.log('%cPrakshit — chaotic but ships', 'color:#68e4dc;font-size:16px;font-weight:700');
console.log('%cGitHub: https://github.com/MePython313/', 'color:#8ca5aa');
