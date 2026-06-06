const text = "Hello world";
const titleEl = document.getElementById("title");
const quti = document.getElementById("quti");
const particlesEl = document.getElementById("particles");
const hint = document.getElementById("hint");
const scoreBadge = document.getElementById("scoreBadge");
const modeBtn = document.getElementById("modeBtn");

const palettes = [
  ["#7F77DD", "#1D9E75", "#D85A30", "#D4537E", "#378ADD"],
  ["#EF9F27", "#63C459", "#E24B4A", "#7F77DD", "#1D9E75"],
  ["#D4537E", "#378ADD", "#EF9F27", "#D85A30", "#1D9E75"],
];
let paletteIdx = 0;
let clicks = 0;

function getColors() {
  return palettes[paletteIdx];
}

titleEl.innerHTML = text
  .split("")
  .map((ch, i) => {
    if (ch === " ") return `<span>&nbsp;</span>`;
    return `<span style="animation-delay:${i * 60}ms" data-i="${i}">${ch}</span>`;
  })
  .join("");

const spans = titleEl.querySelectorAll("span");

function colorizeAll() {
  const colors = getColors();
  spans.forEach((s, i) => {
    s.style.color = colors[i % colors.length];
  });
}
colorizeAll();

function bounce(span) {
  span.animate(
    [
      { transform: "translateY(0) rotate(0deg)" },
      { transform: "translateY(-22px) rotate(-8deg)" },
      { transform: "translateY(6px) rotate(4deg)" },
      { transform: "translateY(-10px) rotate(-3deg)" },
      { transform: "translateY(0) rotate(0deg)" },
    ],
    { duration: 500, easing: "cubic-bezier(.34,1.56,.64,1)" },
  );
}

function wave() {
  spans.forEach((s, i) => {
    setTimeout(() => bounce(s), i * 60);
  });
}

function spawnParticle(x, y, color) {
  const p = document.createElement("div");
  p.className = "particle";
  const size = 6 + Math.random() * 10;
  const left = (x / quti.offsetWidth) * 100 + (Math.random() - 0.5) * 20;
  p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${color};
      left:${left}%;
      bottom:0;
      animation-duration:${1.2 + Math.random()}s;
      animation-delay:${Math.random() * 0.3}s;
    `;
  particlesEl.appendChild(p);
  setTimeout(() => p.remove(), 2600);
}

function spawnRipple(x, y, color) {
  const r = document.createElement("div");
  r.className = "ripple";
  const size = 60;
  r.style.cssText = `
      width:${size}px; height:${size}px;
      left:${x - size / 2}px; top:${y - size / 2}px;
      background:${color}44;
    `;
  quti.appendChild(r);
  setTimeout(() => r.remove(), 700);
}

quti.addEventListener("click", (e) => {
  if (e.target === modeBtn) return;
  const rect = quti.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const colors = getColors();
  const color = colors[clicks % colors.length];

  clicks++;
  scoreBadge.textContent = `×${clicks}`;

  wave();
  for (let i = 0; i < 7; i++) spawnParticle(x, y, colors[i % colors.length]);
  spawnRipple(x, y, color);
  hint.style.opacity = "0";
  setTimeout(() => {
    hint.style.opacity = "1";
  }, 1000);
});

spans.forEach((s) => {
  s.addEventListener("mouseenter", () => bounce(s));
});

modeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  paletteIdx = (paletteIdx + 1) % palettes.length;
  colorizeAll();
});




console.log("Hello wolrd");


