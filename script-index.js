function closeAll(){
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
}

function openCourse(){
  document.getElementById('courseModal').style.display = 'flex';
}

function openExpress(){
  document.getElementById('expressModal').style.display = 'flex';
}

function openProject(){
  document.getElementById('projectModal').style.display = 'flex';
}

document.querySelectorAll('[data-link]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    window.open(btn.dataset.link,'_blank');
  });
});

window.onclick = function(e){
  if(e.target.classList.contains('modal')) closeAll();
};
/* side bar logic */

const menuBtn = document.getElementById("menuBtn");
const overlay = document.getElementById("overlay");
const sideNav = document.getElementById("sideNav");

function closeMenu() {
  document.body.classList.remove("menu-open");
}

menuBtn.onclick = () => {
  document.body.classList.toggle("menu-open");
};

overlay.onclick = closeMenu;

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeMenu();
});

/* Smooth scroll for in-page section */
sideNav.querySelectorAll('[data-scroll]').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});


/* Typing logic starts here */

const lines = document.querySelectorAll(".typing-container span");
const speed = 45;
let lineIndex = 0;
let charIndex = 0;

function type() {
  if (lineIndex >= lines.length) return;

  const el = lines[lineIndex];
  const text = el.dataset.text;
  const isStrong = el.dataset.strong === "true";

  el.classList.add("typing");

  if (charIndex < text.length) {
    const content = text.slice(0, ++charIndex);
    el.innerHTML = isStrong ? `<strong>${content}</strong>` : content;
    setTimeout(type, speed);
  } else {
    el.classList.remove("typing");
    charIndex = 0;
    lineIndex++;
    setTimeout(type, 250);
  }
}

type();


/* ===============================
   REUSABLE CAROUSEL ENGINE
   =============================== */

class Carousel {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector(".carousel-track");
    this.slides = root.querySelectorAll(".carousel-slide");
    this.prevBtn = root.querySelector(".carousel-btn.prev");
    this.nextBtn = root.querySelector(".carousel-btn.next");

    this.index = 0;
    this.total = this.slides.length;

    this.autoplay = root.dataset.autoplay === "true";
    this.intervalTime = Number(root.dataset.interval) || 5000;
    this.timer = null;

    this.init();
  }

  init() {
    if (!this.track || this.total === 0) return;

    this.update();

    this.prevBtn?.addEventListener("click", () => this.prev());
    this.nextBtn?.addEventListener("click", () => this.next());

    if (this.autoplay) {
      this.startAutoplay();
      this.root.addEventListener("mouseenter", () => this.stopAutoplay());
      this.root.addEventListener("mouseleave", () => this.startAutoplay());
    }
  }

  update() {
    this.track.style.transform = `translateX(-${this.index * 100}%)`;
  }

  next() {
    this.index = (this.index + 1) % this.total;
    this.update();
  }

  prev() {
    this.index = (this.index - 1 + this.total) % this.total;
    this.update();
  }

  startAutoplay() {
    this.stopAutoplay();
    this.timer = setInterval(() => this.next(), this.intervalTime);
  }

  stopAutoplay() {
    if (this.timer) clearInterval(this.timer);
  }
}

/* Auto-initialize all carousels on page */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel").forEach(carouselEl => {
    new Carousel(carouselEl);
  });
});



