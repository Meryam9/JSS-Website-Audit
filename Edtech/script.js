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
    color: "#16c79a",
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
