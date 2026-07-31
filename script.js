/* MePython313 homepage — small, dependency-free JS */

/* ---------- typewriter tagline ---------- */
const TYPED_LINES = [
  "Chaotic but ships.",
  "Games, tools & experiments since 5th grade.",
  "Low-spec friendly. High-spec ideas.",
  "> ./ship_it --now",
];

const typeEl = document.getElementById("typed-text");

function typewriter(lines, el, speed = 55, pause = 1400) {
  let lineIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const line = lines[lineIdx];

    if (!deleting) {
      charIdx++;
      el.textContent = line.slice(0, charIdx);
      if (charIdx === line.length) {
        deleting = true;
        setTimeout(tick, pause);
        return;
      }
      setTimeout(tick, speed);
    } else {
      charIdx--;
      el.textContent = line.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 28);
    }
  }
  tick();
}

/* ---------- builds cards ---------- */
const BUILDS = [
  {
    tag: "ai",
    title: "RPS-ai",
    desc: "An AI that learns to beat you at rock-paper-scissors.",
    link: "https://github.com/MePython313/RPS-ai",
    linkText: "repo ↗",
  },
  {
    tag: "game",
    title: "element-game",
    desc: "Name as many elements as you can. Can you hit the leaderboard?",
    link: "https://github.com/MePython313/element-game",
    linkText: "repo ↗",
  },
  {
    tag: "music",
    title: "HyperPlayer-X",
    desc: "My music player project — built for speed and dark-mode vibes.",
    link: "https://github.com/MePython313/music-player",
    linkText: "repo ↗",
  },
  {
    tag: "video",
    title: "TubeXP",
    desc: "Ad-free YouTube player with a built-in AdBlocker engine and watch history.",
    link: "https://github.com/MePython313/ad-free",
    linkText: "repo ↗",
  },
  {
    tag: "os sim",
    title: "PGOS-sim",
    desc: "An OS simulator — my way of digging under the hood of how operating systems work.",
    link: "https://github.com/MePython313/PGOS-sim",
    linkText: "repo ↗",
  },
];

function renderBuilds() {
  const grid = document.getElementById("builds-grid");
  grid.innerHTML = BUILDS.map(
    (b) => `
      <article class="card reveal">
        <span class="card-tag">${b.tag}</span>
        <h3>${b.title}</h3>
        <p>${b.desc}</p>
        <a href="${b.link}" target="_blank" rel="noopener">${b.linkText}</a>
      </article>`
  ).join("");
}

/* ---------- scroll reveal ---------- */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* ---------- console easter egg ---------- */
function consoleEgg() {
  console.log(
    "%c🐍 MePython313 v2%c — thanks for peeking under the hood.\n%c> ./ship_it --now",
    "color:#3dff8b;font-size:16px;font-weight:bold",
    "color:#e6e6f0;font-size:13px",
    "color:#00f0ff;font-size:13px;font-family:monospace"
  );
}

/* ---------- secret button: confetti + big reveal ---------- */
const secretBtn = document.getElementById("secret-btn");
const secretOverlay = document.getElementById("secret-overlay");
const secretClose = document.getElementById("secret-close");
const confettiCanvas = document.getElementById("confetti-canvas");
const confettiCtx = confettiCanvas.getContext("2d");

const CONFETTI_COLORS = ["#00f0ff", "#ff2d78", "#a855f7", "#3dff8b", "#ffd166", "#ffffff"];
let confettiParticles = [];
let confettiRaf = null;

function sizeConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", sizeConfetti);
sizeConfetti();

function launchConfetti() {
  confettiParticles = [];
  const count = window.innerWidth < 640 ? 140 : 220;
  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 80,
      y: window.innerHeight / 2 + (Math.random() - 0.5) * 40,
      w: 6 + Math.random() * 8,
      h: 9 + Math.random() * 11,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 15 - 4,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.35,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      life: 1,
      decay: 0.007 + Math.random() * 0.006,
    });
  }
  if (confettiRaf) cancelAnimationFrame(confettiRaf);

  const step = () => {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles = confettiParticles.filter((p) => p.life > 0);
    confettiParticles.forEach((p) => {
      p.vy += 0.35; /* gravity */
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= p.decay;
      confettiCtx.save();
      confettiCtx.globalAlpha = Math.max(0, p.life);
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate(p.rot);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      confettiCtx.restore();
    });
    if (confettiParticles.length > 0) {
      confettiRaf = requestAnimationFrame(step);
    } else {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      confettiRaf = null;
    }
  };
  step();
}

function revealSecret() {
  launchConfetti();
  secretOverlay.classList.remove("hidden");
}

secretBtn.addEventListener("click", revealSecret);
secretOverlay.addEventListener("click", () => secretOverlay.classList.add("hidden"));
secretClose.addEventListener("click", (e) => {
  e.stopPropagation();
  secretOverlay.classList.add("hidden");
});

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  typewriter(TYPED_LINES, typeEl);
  renderBuilds();
  initReveal();
  consoleEgg();
});
