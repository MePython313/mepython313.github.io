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
    tag: "music",
    title: "HyperPlayer-X",
    desc: "My music player project — built for speed and dark-mode vibes.",
    link: "https://github.com/MePython313/music-player",
    linkText: "repo ↗",
  },
  {
    tag: "os sim",
    title: "PGOS-sim",
    desc: "An OS simulator — my way of digging under the hood of how operating systems work.",
    link: "https://github.com/MePython313/PGOS-sim",
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
    tag: "ai",
    title: "RPS-ai",
    desc: "An AI that learns to beat you at rock-paper-scissors.",
    link: "https://github.com/MePython313/RPS-ai",
    linkText: "repo ↗",
  },
  {
    tag: "video",
    title: "TubeXP",
    desc: "Ad-free YouTube player with a built-in AdBlocker engine and watch history.",
    link: "https://github.com/MePython313/ad-free",
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

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  typewriter(TYPED_LINES, typeEl);
  renderBuilds();
  initReveal();
  consoleEgg();
});
