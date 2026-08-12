// ---------- "How it works" step tracker ----------
const stepData = [
  {
    color: "#2f7cf6",
    badge: "Step 1 of 5",
    title: "Choose a Program",
    subtitle: "Pick Your Track",
    desc: "Select from 8+ career-aligned certification programs designed for real IT jobs.",
    icon: "compass"
  },
  {
    color: "#8b5cf6",
    badge: "Step 2 of 5",
    title: "Follow the Roadmap",
    subtitle: "Structured Learning",
    desc: "Step-by-step course sequence ensures you build skills in the right order.",
    icon: "map"
  },
  {
    color: "#0bc2f0",
    badge: "Step 3 of 5",
    title: "Watch & Learn",
    subtitle: "Expert Instruction",
    desc: "Clear video lectures with practical demonstrations from industry professionals.",
    icon: "play"
  },
  {
    color: "#ec4899",
    badge: "Step 4 of 5",
    title: "Practice in Labs",
    subtitle: "Hands-On Training",
    desc: "Real-world simulations and browser-based labs for practical experience.",
    icon: "flask"
  },
  {
    color: "#1b2a4d",
    badge: "Step 5 of 5",
    title: "Anytime Access",
    subtitle: "Learn at Your Pace",
    desc: "24/7 access to all content. Learn when it works for you, repeat until mastered.",
    icon: "clock"
  }
];

const icons = {
  compass: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>',
  map: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>',
  play: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"></polygon></svg>',
  flask: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2v6L4 20a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2L15 8V2"></path><line x1="9" y1="2" x2="15" y2="2"></line><line x1="6.5" y1="15" x2="17.5" y2="15"></line></svg>',
  clock: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  check: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 11 15 16 9"></polyline></svg>'
};

function initStepTracker() {
  const tabs = document.querySelectorAll(".step-tab");
  const panel = document.getElementById("stepPanel");
  const progressFill = document.getElementById("progressFill");
  if (!tabs.length || !panel) return;

  let current = 0;

  function render(index) {
    current = index;
    const data = stepData[index];

    tabs.forEach((tab, i) => {
      tab.classList.remove("active", "done");
      tab.style.removeProperty("--step-color");
      if (i < index) {
        tab.classList.add("done");
        tab.querySelector(".step-icon-wrap").innerHTML = icons.check;
      } else {
        tab.querySelector(".step-icon-wrap").innerHTML = icons[stepData[i].icon];
        if (i === index) {
          tab.classList.add("active");
          tab.style.setProperty("--step-color", data.color);
        }
      }
    });

    panel.style.background = hexToTint(data.color);
    panel.style.setProperty("--step-color", data.color);
    panel.querySelector(".step-panel-icon").innerHTML = icons[data.icon];
    panel.querySelector(".step-badge").textContent = data.badge;
    panel.querySelector("h3").textContent = data.title;
    panel.querySelector(".step-subtitle").textContent = data.subtitle;
    panel.querySelector(".step-desc").textContent = data.desc;

    const nextBtn = panel.querySelector(".step-next-btn");
    const isLast = index === stepData.length - 1;
    nextBtn.innerHTML = isLast
      ? 'Start <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>'
      : 'Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';

    progressFill.style.width = `${((index + 1) / stepData.length) * 100}%`;
  }

  function hexToTint(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.10)`;
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => render(i));
  });

  panel.querySelector(".step-next-btn").addEventListener("click", () => {
    if (current === stepData.length - 1) {
      window.location.href = "login.html";
    } else {
      render(current + 1);
    }
  });

  render(0);
}

function initClickableCards() {
  const cards = document.querySelectorAll(".faq-card, .program-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    card.classList.add("clickable-card");
    if (!card.hasAttribute("tabindex")) {
      card.setAttribute("tabindex", "0");
    }

    card.addEventListener("click", () => {
      const groupSelector = card.classList.contains("faq-card") ? ".faq-card" : ".program-card";
      document.querySelectorAll(groupSelector).forEach((item) => item.classList.remove("card-selected"));
      card.classList.add("card-selected");
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initStepTracker);
document.addEventListener("DOMContentLoaded", initClickableCards);

// ---------- Testimonials carousel (homepage) ----------
const testimonialData = [
  { name: "Alex Rivera", rating: 5, course: "AI Engineering Certificate Program", quote: "The AI Engineering program gave me real project experience, not just theory." },
  { name: "Priya Nair", rating: 5, course: "AWS Cloud Engineer Certificate Program", quote: "The labs made AWS concepts finally click for me." },
  { name: "Daniel Osei", rating: 5, course: "Azure Cloud Engineer Certificate Program", quote: "Clear roadmap and hands-on labs helped me pass my Azure exam." },
  { name: "Maria Gomez", rating: 5, course: "Become a Freelancer - Skills-to-Income Program", quote: "I landed my first freelance client within a month of finishing this program." },
  { name: "James Whitfield", rating: 5, course: "Cisco Network Engineer Certificate Program", quote: "Packet Tracer labs made networking concepts so much easier to understand." },
  { name: "Sara Ahmed", rating: 4, course: "Cybersecurity Analyst Certificate Program", quote: "This program built my confidence to start applying for SOC analyst roles." },
  { name: "Tom Becker", rating: 5, course: "Data Analytics Certificate Program", quote: "Practical projects helped me build a portfolio I could actually show employers." },
  { name: "Wei Zhang", rating: 5, course: "Data Science Certificate Program", quote: "The step-by-step roadmap kept me consistent and motivated." },
  { name: "Linda Foster", rating: 5, course: "IT Support Certificate Program", quote: "Perfect for beginners — I had zero IT background and still kept up." },
  { name: "Michael Torres", rating: 5, course: "Systems Engineer Certificate Program", quote: "The hands-on labs are what set this apart from other courses I've tried." },
  { name: "Grace Kim", rating: 4, course: "Working as an IT Support Technician - Free", quote: "Great free starting point before committing to a full program." },
  { name: "Ryan Patel", rating: 5, course: "Cisco CCNA (200-301) Networking Skills", quote: "Well-paced lessons and labs made CCNA topics click quickly." },
  { name: "Olivia Chen", rating: 5, course: "AWS DevOps Engineer Certificate", quote: "Docker, Terraform, and Jenkins finally made sense with the guided labs." },
  { name: "Ben Carter", rating: 5, course: "Python Fundamentals for Data Science Beginners", quote: "A great intro course — clear explanations and easy to follow." }
];

const starIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';

function initTestimonials() {
  const quoteEl = document.getElementById("testimonialQuote");
  const starsEl = document.getElementById("testimonialStars");
  const avatarEl = document.getElementById("testimonialAvatar");
  const nameEl = document.getElementById("testimonialName");
  const courseEl = document.getElementById("testimonialCourse");
  const counterEl = document.getElementById("testimonialCounter");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");
  if (!quoteEl || !prevBtn || !nextBtn) return;

  let index = 0;

  function render(i) {
    index = (i + testimonialData.length) % testimonialData.length;
    const data = testimonialData[index];
    quoteEl.textContent = `"${data.quote}"`;
    starsEl.innerHTML = starIcon.repeat(data.rating);
    avatarEl.textContent = data.name.charAt(0);
    nameEl.textContent = data.name;
    courseEl.textContent = data.course;
    counterEl.textContent = `${index + 1} / ${testimonialData.length}`;
  }

  prevBtn.addEventListener("click", () => render(index - 1));
  nextBtn.addEventListener("click", () => render(index + 1));

  render(0);
}

document.addEventListener("DOMContentLoaded", initTestimonials);

// ---------- Testimonials carousel (program detail pages) ----------
// Program pages render their reviews as a stack of static .testimonial-card
// elements inside #reviews (all but the first marked `hidden`), followed by
// a .testimonial-nav with prev/next arrows. This wires those controls up so
// only one card shows at a time, matching the homepage carousel.
function initProgramTestimonialCarousels() {
  document.querySelectorAll("#reviews").forEach((section) => {
    const cards = Array.from(section.querySelectorAll(":scope > .testimonial-card"));
    const nav = section.querySelector(":scope > .testimonial-nav");
    if (cards.length <= 1 || !nav) return;

    const prevBtn = nav.querySelector("[data-testimonial-prev]");
    const nextBtn = nav.querySelector("[data-testimonial-next]");
    const counterEl = nav.querySelector("[data-testimonial-counter]");

    let index = 0;

    function render(i) {
      index = (i + cards.length) % cards.length;
      cards.forEach((card, n) => {
        card.hidden = n !== index;
      });
      if (counterEl) counterEl.textContent = `${index + 1} / ${cards.length}`;
    }

    if (prevBtn) prevBtn.addEventListener("click", () => render(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => render(index + 1));

    render(0);
  });
}

document.addEventListener("DOMContentLoaded", initProgramTestimonialCarousels);
