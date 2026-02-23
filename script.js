// Mobile nav toggle
const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav__links--open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      navLinks.classList.remove("nav__links--open");
    }
  });
}

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Dynamic animated background (parallax + floating orbs)
const bgGlow = document.querySelector(".background-glow");
const orbsContainer = document.querySelector(".background-orbs");

if (orbsContainer) {
  const orbCount = 10;
  const orbs = [];

  for (let i = 0; i < orbCount; i += 1) {
    const orb = document.createElement("div");
    orb.className = "background-orb";

    if (i % 3 === 0) {
      orb.classList.add("background-orb--accent-pink");
    } else if (i % 3 === 1) {
      orb.classList.add("background-orb--accent-green");
    }

    const size = 140 + Math.random() * 160; // 140px – 300px
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = 18 + Math.random() * 16; // 18s – 34s
    const delay = -Math.random() * 20;

    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.top = `${top}%`;
    orb.style.left = `${left}%`;
    orb.style.animationDuration = `${duration}s`;
    orb.style.animationDelay = `${delay}s`;

    orbsContainer.appendChild(orb);
    orbs.push(orb);
  }

  if (bgGlow) {
    let rafId;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener("mousemove", (e) => {
      const xNorm = e.clientX / window.innerWidth - 0.5;
      const yNorm = e.clientY / window.innerHeight - 0.5;

      targetX = xNorm * 40;
      targetY = yNorm * 40;

      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          bgGlow.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

          orbs.forEach((orb, index) => {
            const intensity = 0.3 + index * 0.03;
            const x = xNorm * 30 * intensity;
            const y = yNorm * 30 * intensity;
            orb.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          });

          rafId = null;
        });
      }
    });
  }
}

// Rotating hero text
const rotatingRole = document.getElementById("rotatingRole");
if (rotatingRole) {
  const words = [
    "fast web apps",
    "Python + Flask projects",
    "clean UI experiences",
    "Java fundamentals",
    "problem-solving tools",
  ];

  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    rotatingRole.style.opacity = "0";
    rotatingRole.style.transform = "translateY(4px)";

    window.setTimeout(() => {
      rotatingRole.textContent = words[i];
      rotatingRole.style.opacity = "1";
      rotatingRole.style.transform = "translateY(0)";
    }, 220);
  }, 2200);
}

// Card Spotlight Effect
const cards = document.querySelectorAll(".bento-item, .project-card, .cert-card");
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

// Starfield Background (Aurora Edition)
const starfield = document.getElementById("starfield");
if (starfield) {
  const canvas = document.createElement("canvas");
  starfield.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let w, h;
  const stars = [];
  const starCount = 100;

  const init = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars.length = 0;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.5,
        speed: 0.1 + Math.random() * 0.4,
        opacity: 0.2 + Math.random() * 0.8,
        color: Math.random() > 0.8 ? "var(--accent-alt)" : "white",
      });
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, w, h);
    stars.forEach((star) => {
      ctx.fillStyle = star.color === "white" ? `rgba(255, 255, 255, ${star.opacity})` : `rgba(6, 182, 212, ${star.opacity})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      // Slow drift
      star.y -= star.speed;
      star.x += Math.sin(star.y / 50) * 0.2;

      if (star.y < 0) {
        star.y = h;
        star.x = Math.random() * w;
      }
    });
    requestAnimationFrame(animate);
  };

  window.addEventListener("resize", init);
  init();
  animate();
}
