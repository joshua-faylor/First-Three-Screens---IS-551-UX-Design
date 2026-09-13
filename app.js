const STORAGE_KEY = "mealloop.saved.v1";
const FILTERS = {
  all: "all",
  quick: "quick",
  cheap: "cheap",
  favorites: "favorites",
};

const mealDeck = [
  {
    id: "quesadilla",
    name: "Chicken quesadillas",
    time: 15,
    difficulty: "Easy",
    ingredients: 7,
    cost: "$",
    image: "",
    note: "Crispy, filling, and easy to make with leftovers.",
    tags: ["quick", "cheap"],
  },
  {
    id: "teriyaki",
    name: "Teriyaki rice bowl",
    time: 20,
    difficulty: "Easy",
    ingredients: 8,
    cost: "$$",
    image: "",
    note: "A fast bowl meal that feels like takeout without the price.",
    tags: ["quick"],
  },
  {
    id: "pesto",
    name: "Pesto pasta",
    time: 15,
    difficulty: "Easy",
    ingredients: 6,
    cost: "$",
    image: "",
    note: "Pantry-friendly and easy to scale for leftovers.",
    tags: ["quick", "cheap"],
  },
  {
    id: "breakfast-burrito",
    name: "Breakfast burritos",
    time: 12,
    difficulty: "Easy",
    ingredients: 7,
    cost: "$",
    image: "",
    note: "A solid anytime meal when you need something fast.",
    tags: ["quick", "cheap"],
  },
  {
    id: "sheet-pan",
    name: "Sheet pan chicken and vegetables",
    time: 30,
    difficulty: "Easy",
    ingredients: 9,
    cost: "$$",
    image: "",
    note: "One pan, minimal cleanup, and easy to portion.",
    tags: [],
  },
  {
    id: "grilled-cheese",
    name: "Grilled cheese and tomato soup",
    time: 10,
    difficulty: "Easy",
    ingredients: 5,
    cost: "$",
    image: "",
    note: "Comfort food with almost no prep overhead.",
    tags: ["quick", "cheap"],
  },
  {
    id: "street-tacos",
    name: "Chickpea street tacos",
    time: 18,
    difficulty: "Easy",
    ingredients: 9,
    cost: "$",
    image: "",
    note: "Cheap, customizable, and easy to keep interesting.",
    tags: ["quick", "cheap"],
  },
  {
    id: "sweet-potato",
    name: "Loaded sweet potato bowls",
    time: 25,
    difficulty: "Medium",
    ingredients: 8,
    cost: "$",
    image: "",
    note: "Budget-friendly comfort with a little more variety.",
    tags: ["cheap"],
  },
];

function svgDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createMealArt(meal) {
  const themes = {
    quesadilla: ["#f0c88b", "#df8f52", "#8b5d3b"],
    teriyaki: ["#9fb9ca", "#607d8e", "#31414f"],
    pesto: ["#bec9ae", "#7f9870", "#405a40"],
    "breakfast-burrito": ["#e6c49d", "#cb8a5e", "#7b4f35"],
    "sheet-pan": ["#dbb38a", "#b46d47", "#5d4333"],
    "grilled-cheese": ["#ead6a8", "#d1834f", "#87603e"],
    "street-tacos": ["#f0b87d", "#c76b52", "#6d4a36"],
    "sweet-potato": ["#e4bd8f", "#b66d4e", "#58403a"],
  };

  const [background, accent, shadow] = themes[meal.id] || [
    "#e9d9c5",
    "#c9895a",
    "#6f5442",
  ];

  const common = `
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="${background}" />
        <stop offset="100%" stop-color="#f8f2ea" />
      </linearGradient>
      <radialGradient id="glow" cx="35%" cy="24%" r="68%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </radialGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#4f3c2f" flood-opacity="0.18" />
      </filter>
    </defs>
    <rect width="1200" height="900" fill="url(#bg)" />
    <circle cx="960" cy="120" r="210" fill="${accent}" opacity="0.12" />
    <circle cx="180" cy="740" r="240" fill="#ffffff" opacity="0.18" />
    <circle cx="840" cy="720" r="240" fill="url(#glow)" />
  `;

  const plate = `
    <g filter="url(#softShadow)">
      <ellipse cx="600" cy="510" rx="308" ry="212" fill="#e9dfd2" opacity="0.5" />
      <ellipse cx="600" cy="498" rx="286" ry="194" fill="#ffffff" />
      <ellipse cx="600" cy="494" rx="246" ry="154" fill="#f8f0e2" />
    </g>
  `;

  const sparkles = `
    <circle cx="214" cy="224" r="12" fill="#ffffff" opacity="0.5" />
    <circle cx="270" cy="176" r="6" fill="#ffffff" opacity="0.45" />
    <circle cx="888" cy="224" r="10" fill="#ffffff" opacity="0.5" />
  `;

  const scenes = {
    quesadilla: `
      ${plate}
      <g transform="translate(600 500) rotate(-12)">
        <path d="M -120 -20 L -30 -150 L 70 -40 Z" fill="#e3a05b" />
        <path d="M -85 16 L 5 -118 L 104 -8 Z" fill="#cf7d47" />
        <path d="M -28 55 L 62 -80 L 164 8 Z" fill="#e8b26f" />
        <path d="M -145 34 L -50 -108 L 20 10 Z" fill="#a65831" opacity="0.45" />
        <circle cx="118" cy="90" r="38" fill="#cf5f47" />
        <circle cx="118" cy="90" r="16" fill="#ffcfaa" />
        <rect x="-170" y="-155" width="46" height="300" rx="23" fill="#fff6dd" opacity="0.8" />
      </g>
      <path d="M360 640c56-28 138-38 240-28 66 6 122 20 178 44" stroke="${shadow}" stroke-width="16" stroke-linecap="round" opacity="0.12" fill="none" />
    `,
    teriyaki: `
      <ellipse cx="600" cy="530" rx="270" ry="172" fill="#d8cab8" opacity="0.48" filter="url(#softShadow)" />
      <ellipse cx="600" cy="500" rx="250" ry="146" fill="#2d4451" />
      <ellipse cx="600" cy="497" rx="214" ry="110" fill="#f4f0e7" />
      <path d="M470 474c72-68 188-70 270 0-44 46-76 70-135 72-58 0-88-20-135-72Z" fill="#efe8d8" />
      <g opacity="0.95">
        <circle cx="492" cy="458" r="28" fill="#d98b54" />
        <circle cx="540" cy="440" r="24" fill="#86a4b7" />
        <circle cx="642" cy="443" r="22" fill="#7e9f64" />
        <circle cx="697" cy="466" r="27" fill="#d3a25c" />
        <circle cx="572" cy="472" r="19" fill="#7bb08a" />
      </g>
      <rect x="806" y="366" width="18" height="220" rx="9" transform="rotate(20 815 476)" fill="#6f4e38" />
      <rect x="832" y="346" width="18" height="246" rx="9" transform="rotate(20 841 469)" fill="#8a634a" />
    `,
    pesto: `
      ${plate}
      <g transform="translate(600 510)">
        <circle r="150" fill="#e9ddc9" opacity="0.75" />
        <path d="M -112 -18c20-46 76-72 128-58 46 12 82 50 98 95" fill="none" stroke="#f0d9a9" stroke-width="24" stroke-linecap="round" />
        <path d="M -100 34c32-60 96-86 153-66 38 12 68 36 86 76" fill="none" stroke="#f5e3b9" stroke-width="24" stroke-linecap="round" />
        <path d="M -58 82c20-42 64-62 106-54 33 8 60 30 80 62" fill="none" stroke="#edd097" stroke-width="24" stroke-linecap="round" />
        <path d="M -126 -6c36-22 96-20 138 8" fill="none" stroke="#c8d885" stroke-width="18" stroke-linecap="round" />
        <path d="M -46 100c36-20 96-18 140 12" fill="none" stroke="#c8d885" stroke-width="18" stroke-linecap="round" />
        <circle cx="-146" cy="-38" r="16" fill="#7d9f5d" />
        <circle cx="116" cy="-42" r="16" fill="#7d9f5d" />
        <circle cx="136" cy="80" r="16" fill="#7d9f5d" />
      </g>
    `,
    "breakfast-burrito": `
      ${plate}
      <g transform="translate(600 500) rotate(-7)">
        <rect x="-166" y="-58" width="332" height="116" rx="58" fill="#e1b07b" />
        <path d="M -146 -2c60-38 152-38 240 0-44 40-156 56-240 0Z" fill="#c9764f" opacity="0.36" />
        <circle cx="-80" cy="-4" r="32" fill="#f4d66d" />
        <circle cx="-20" cy="-16" r="30" fill="#d97b50" />
        <circle cx="42" cy="-1" r="30" fill="#88a86a" />
        <circle cx="108" cy="12" r="34" fill="#ede5cf" />
        <path d="M 138 -42c24 18 38 44 34 68-14 18-42 28-72 24" stroke="#b56e47" stroke-width="16" fill="none" stroke-linecap="round" />
      </g>
      <g opacity="0.9">
        <rect x="250" y="678" width="150" height="48" rx="24" fill="#ddaa62" />
        <rect x="330" y="646" width="160" height="48" rx="24" fill="#88a86a" />
      </g>
    `,
    "sheet-pan": `
      <rect x="238" y="314" width="724" height="412" rx="38" fill="#6c4b38" opacity="0.18" />
      <rect x="256" y="292" width="688" height="376" rx="32" fill="#3f2e24" />
      <rect x="290" y="324" width="620" height="312" rx="24" fill="#5d4333" />
      <g>
        <circle cx="392" cy="416" r="42" fill="#d7864f" />
        <circle cx="512" cy="402" r="44" fill="#9bb36c" />
        <circle cx="632" cy="434" r="42" fill="#d8a05f" />
        <circle cx="756" cy="408" r="44" fill="#be6d45" />
        <circle cx="444" cy="520" r="40" fill="#a76b4a" />
        <circle cx="576" cy="532" r="40" fill="#95ad67" />
        <circle cx="708" cy="532" r="42" fill="#d3b171" />
      </g>
      <g opacity="0.3" fill="#f4d9b3">
        <circle cx="392" cy="416" r="14" />
        <circle cx="512" cy="402" r="14" />
        <circle cx="632" cy="434" r="14" />
        <circle cx="756" cy="408" r="14" />
        <circle cx="444" cy="520" r="14" />
        <circle cx="576" cy="532" r="14" />
        <circle cx="708" cy="532" r="14" />
      </g>
    `,
    "grilled-cheese": `
      ${plate}
      <g transform="translate(600 498) rotate(-10)">
        <path d="M -158 -26L -22 -126L 110 -32L -24 70Z" fill="#d68a49" />
        <path d="M -116 -10L -10 -86L 74 -26L -32 50Z" fill="#f1d18e" />
        <path d="M -22 -126L 110 -32L 84 -4L -52 -88Z" fill="#b8643e" opacity="0.55" />
        <path d="M -162 20L -18 114L 116 16L -28 -62Z" fill="#e7bd7a" opacity="0.9" />
        <path d="M 180 46c0-54 44-98 98-98s98 44 98 98-44 98-98 98-98-44-98-98Z" fill="#d76c3e" />
        <path d="M 210 50c0-31 25-56 56-56s56 25 56 56-25 56-56 56-56-25-56-56Z" fill="#f7e6c6" />
        <path d="M 242 12v76" stroke="#cf915d" stroke-width="10" stroke-linecap="round" opacity="0.8" />
      </g>
    `,
    "street-tacos": `
      <rect x="220" y="324" width="760" height="296" rx="42" fill="#5b4032" opacity="0.15" />
      <rect x="240" y="306" width="720" height="272" rx="34" fill="#ecdcbf" />
      <g transform="translate(600 470)">
        <g transform="translate(-190 20) rotate(-12)">
          <path d="M -82 40C -50 -92 54 -92 86 40Z" fill="#e7b56d" />
          <path d="M -66 36C -38 -30 42 -30 70 36Z" fill="#8a5a3e" opacity="0.38" />
        </g>
        <g transform="translate(0 -6)">
          <path d="M -82 40C -50 -92 54 -92 86 40Z" fill="#d18a4a" />
          <path d="M -66 36C -38 -30 42 -30 70 36Z" fill="#8aa768" opacity="0.34" />
        </g>
        <g transform="translate(190 20) rotate(12)">
          <path d="M -82 40C -50 -92 54 -92 86 40Z" fill="#e9b975" />
          <path d="M -66 36C -38 -30 42 -30 70 36Z" fill="#c76b52" opacity="0.35" />
        </g>
      </g>
      <circle cx="454" cy="472" r="11" fill="#d96f53" />
      <circle cx="512" cy="412" r="11" fill="#8aa768" />
      <circle cx="694" cy="418" r="11" fill="#d96f53" />
      <circle cx="758" cy="474" r="11" fill="#8aa768" />
    `,
    "sweet-potato": `
      ${plate}
      <g transform="translate(600 520)">
        <path d="M -172 -10c0-74 80-126 172-126s172 52 172 126-80 126-172 126S-172 64-172-10Z" fill="#3e2d25" opacity="0.08" />
        <path d="M -138 -6c0-56 62-96 138-96s138 40 138 96-62 96-138 96S-138 50-138-6Z" fill="#ede5d8" />
        <circle cx="-76" cy="-30" r="40" fill="#cc8c54" />
        <circle cx="-2" cy="-46" r="42" fill="#dfb16e" />
        <circle cx="72" cy="-22" r="40" fill="#b9684c" />
        <circle cx="-28" cy="40" r="32" fill="#7c9c67" />
        <circle cx="50" cy="52" r="30" fill="#d57e51" />
        <circle cx="-102" cy="40" r="26" fill="#c6d0a4" />
      </g>
    `,
  };

  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${meal.name}">
      ${common}
      ${sparkles}
      ${scenes[meal.id] || plate}
    </svg>
  `);
}

function applyArtwork() {
  mealDeck.forEach((meal) => {
    meal.image = createMealArt(meal);
  });

  document.querySelectorAll("[data-art-for]").forEach((image) => {
    if (!(image instanceof HTMLImageElement)) {
      return;
    }

    const meal = mealDeck.find((entry) => entry.id === image.dataset.artFor);
    if (meal) {
      image.src = meal.image;
    }
  });
}

const state = {
  view: "home",
  currentIndex: 0,
  savedMeals: loadSavedMeals(),
  filter: FILTERS.all,
  drag: {
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  },
  toastTimer: null,
};

const elements = {
  screens: document.querySelectorAll(".screen"),
  navItems: document.querySelectorAll("[data-nav]"),
  navButtons: document.querySelectorAll(".nav-item"),
  discoverButtons: document.querySelectorAll('[data-nav="discover"]'),
  savedButtons: document.querySelectorAll('[data-nav="saved"]'),
  homeButtons: document.querySelectorAll('[data-nav="home"]'),
  cardStack: document.getElementById("card-stack"),
  skipButton: document.getElementById("skip-button"),
  saveButton: document.getElementById("save-button"),
  savedResults: document.getElementById("saved-results"),
  savedEmpty: document.getElementById("saved-empty"),
  savedBadge: document.getElementById("saved-badge"),
  deckCount: document.getElementById("deck-count"),
  toast: document.getElementById("toast"),
  filterChips: document.querySelectorAll(".filter-chip"),
};

function loadSavedMeals() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((meal) => meal && meal.id);
  } catch {
    return [];
  }
}

function persistSavedMeals() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.savedMeals));
}

function mealById(id) {
  return mealDeck.find((meal) => meal.id === id);
}

function getCurrentMeal() {
  return mealDeck[state.currentIndex] || null;
}

function nextMealIndex() {
  state.currentIndex += 1;
  if (state.currentIndex >= mealDeck.length) {
    state.currentIndex = mealDeck.length;
  }
  renderDiscover();
}

function openView(view) {
  state.view = view;

  elements.screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === view);
  });

  elements.navButtons.forEach((button) => {
    const isActive = button.dataset.nav === view;
    button.classList.toggle("active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  if (view === "discover") {
    renderDiscover();
  }

  if (view === "saved") {
    renderSaved();
  }
}

function showToast(message) {
  clearTimeout(state.toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");

  state.toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 1700);
}

function isSaved(id) {
  return state.savedMeals.some((meal) => meal.id === id);
}

function saveMeal(meal) {
  if (!meal) {
    return;
  }

  const alreadySaved = isSaved(meal.id);
  if (!alreadySaved) {
    state.savedMeals = [
      {
        ...meal,
        favorite: false,
        savedAt: Date.now(),
      },
      ...state.savedMeals,
    ];
    persistSavedMeals();
    updateSavedBadge();
  }

  renderSaved();
  showToast(
    alreadySaved ? `${meal.name} is already saved.` : `Saved ${meal.name}.`,
  );
}

function skipMeal(meal) {
  if (!meal) {
    return;
  }

  showToast(`Skipped ${meal.name}.`);
}

function advanceDeck(action) {
  const currentMeal = getCurrentMeal();
  if (!currentMeal) {
    return;
  }

  const card = elements.cardStack.querySelector(".card-face.top");
  if (!card) {
    return;
  }

  card.classList.remove("swiping-save", "swiping-skip", "dragging");
  card.style.transition = "transform 240ms ease, opacity 240ms ease";
  card.style.transform =
    action === "save"
      ? "translateX(125%) rotate(14deg)"
      : "translateX(-125%) rotate(-14deg)";
  card.style.opacity = "0";

  window.setTimeout(() => {
    if (action === "save") {
      saveMeal(currentMeal);
    } else {
      skipMeal(currentMeal);
    }

    nextMealIndex();
  }, 180);
}

function renderDiscover() {
  const currentMeal = getCurrentMeal();
  const upcomingMeals = mealDeck.slice(
    state.currentIndex,
    state.currentIndex + 2,
  );
  elements.deckCount.textContent = Math.max(
    mealDeck.length - state.currentIndex,
    0,
  );
  elements.cardStack.innerHTML = "";

  if (!currentMeal) {
    const endCard = document.createElement("article");
    endCard.className = "card-face top";
    endCard.innerHTML = `
      <div class="card-body" style="justify-content:center; gap:16px; min-height: 100%; text-align: left;">
        <div>
          <p class="section-label">All caught up</p>
          <h3 style="margin-top:12px; max-width: 10ch;">You've seen today's picks.</h3>
        </div>
        <p class="card-note" style="max-width: 24ch;">Your saved meals are ready whenever you want to come back later.</p>
        <div class="hero-actions" style="margin-top: 4px;">
          <button class="primary-button" type="button" data-nav="saved">Saved Meals</button>
          <button class="secondary-button" type="button" id="restart-discovery">Start Over</button>
        </div>
      </div>
    `;
    elements.cardStack.appendChild(endCard);
    const restartButton = endCard.querySelector("#restart-discovery");
    restartButton?.addEventListener("click", () => {
      state.currentIndex = 0;
      renderDiscover();
    });
    return;
  }

  upcomingMeals.slice(1).forEach((meal) => {
    const backCard = createMealCard(meal, false);
    backCard.classList.add("back");
    elements.cardStack.appendChild(backCard);
  });

  const topCard = createMealCard(upcomingMeals[0], true);
  topCard.classList.add("top");
  elements.cardStack.appendChild(topCard);

  if (upcomingMeals.length === 1) {
    const ghostCard = document.createElement("article");
    ghostCard.className = "card-face back";
    ghostCard.innerHTML = `
      <div class="card-body" style="justify-content:center; gap:12px; min-height: 100%;">
        <p class="section-label">Next up</p>
        <h3 style="margin:0; max-width: 8ch;">More meals are on the way.</h3>
      </div>
    `;
    elements.cardStack.appendChild(ghostCard);
  }

  elements.cardStack
    .querySelectorAll(".card-face.top")
    .forEach((card) => attachDragHandlers(card));
}

function createMealCard(meal, isInteractive) {
  const card = document.createElement("article");
  card.className = "card-face card-interactive";
  card.dataset.mealId = meal.id;
  card.setAttribute("tabindex", isInteractive ? "0" : "-1");
  card.setAttribute("role", isInteractive ? "button" : "presentation");
  card.setAttribute(
    "aria-label",
    `${meal.name}, ${meal.time} minutes, ${meal.difficulty}`,
  );

  card.innerHTML = `
    <div class="card-media">
      <img src="${meal.image}" alt="${meal.name}" />
      <div class="card-overlay">
        <div class="card-ribbon skip"><span></span> Skip</div>
        <div class="card-ribbon save"><span></span> Save</div>
      </div>
      <div class="swipe-state" data-state="skip"></div>
      <div class="swipe-state" data-state="save"></div>
    </div>
    <div class="card-body">
      <div class="card-heading">
        <div>
          <p class="section-label">Meal idea</p>
          <h3>${meal.name}</h3>
        </div>
        <span class="badge">${meal.cost} Budget</span>
      </div>
      <div class="card-badges">
        <span class="meta-pill">${meal.time} min</span>
        <span class="meta-pill">${meal.difficulty}</span>
        <span class="meta-pill">${meal.ingredients} ingredients</span>
      </div>
      <p class="card-note">${meal.note}</p>
    </div>
  `;

  card.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      return;
    }
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      advanceDeck("skip");
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      advanceDeck("save");
    }
  });

  return card;
}

function attachDragHandlers(card) {
  card.addEventListener("pointerdown", onCardPointerDown);
  card.addEventListener("pointermove", onCardPointerMove);
  card.addEventListener("pointerup", onCardPointerUp);
  card.addEventListener("pointercancel", onCardPointerUp);
}

function onCardPointerDown(event) {
  const card = event.currentTarget;
  if (!(card instanceof HTMLElement)) {
    return;
  }

  card.setPointerCapture(event.pointerId);
  state.drag.active = true;
  state.drag.pointerId = event.pointerId;
  state.drag.startX = event.clientX;
  state.drag.startY = event.clientY;
  state.drag.currentX = 0;
  state.drag.currentY = 0;
  card.classList.add("dragging");
}

function onCardPointerMove(event) {
  if (!state.drag.active || event.pointerId !== state.drag.pointerId) {
    return;
  }

  const card = event.currentTarget;
  if (!(card instanceof HTMLElement)) {
    return;
  }

  const deltaX = event.clientX - state.drag.startX;
  const deltaY = event.clientY - state.drag.startY;
  state.drag.currentX = deltaX;
  state.drag.currentY = deltaY;

  const rotation = Math.max(Math.min(deltaX / 15, 14), -14);
  card.style.transition = "none";
  card.style.transform = `translate(${deltaX}px, ${deltaY * 0.25}px) rotate(${rotation}deg)`;

  card.classList.toggle("swiping-save", deltaX > 18);
  card.classList.toggle("swiping-skip", deltaX < -18);
}

function onCardPointerUp(event) {
  if (!state.drag.active || event.pointerId !== state.drag.pointerId) {
    return;
  }

  const card = event.currentTarget;
  if (!(card instanceof HTMLElement)) {
    return;
  }

  const deltaX = state.drag.currentX;
  const threshold = 104;

  state.drag.active = false;
  state.drag.pointerId = null;

  if (deltaX > threshold) {
    advanceDeck("save");
    return;
  }

  if (deltaX < -threshold) {
    advanceDeck("skip");
    return;
  }

  card.style.transition = "transform 240ms ease, opacity 240ms ease";
  card.style.transform = "translate(0, 0) rotate(0deg)";
  card.classList.remove("dragging", "swiping-save", "swiping-skip");
}

function updateSavedBadge() {
  elements.savedBadge.textContent = String(state.savedMeals.length);
}

function toggleFavorite(id) {
  let nextFavorite = false;
  state.savedMeals = state.savedMeals.map((meal) => {
    if (meal.id !== id) {
      return meal;
    }

    nextFavorite = !meal.favorite;
    return {
      ...meal,
      favorite: nextFavorite,
    };
  });

  persistSavedMeals();
  renderSaved();
  return nextFavorite;
}

function setFilter(filter) {
  state.filter = filter;
  elements.filterChips.forEach((chip) =>
    chip.classList.toggle("active", chip.dataset.filter === filter),
  );
  renderSaved();
}

function matchesFilter(meal) {
  if (state.filter === FILTERS.quick) {
    return meal.time <= 20;
  }

  if (state.filter === FILTERS.cheap) {
    return meal.cost === "$";
  }

  if (state.filter === FILTERS.favorites) {
    return Boolean(meal.favorite);
  }

  return true;
}

function renderSaved() {
  updateSavedBadge();
  const visibleMeals = state.savedMeals.filter(matchesFilter);
  elements.savedResults.innerHTML = "";

  const hasAnySaved = state.savedMeals.length > 0;
  elements.savedEmpty.classList.toggle("hidden", hasAnySaved);
  elements.savedResults.classList.toggle("hidden", !hasAnySaved);

  if (!hasAnySaved) {
    return;
  }

  if (visibleMeals.length === 0) {
    const emptyFilter = document.createElement("article");
    emptyFilter.className = "empty-state";
    emptyFilter.innerHTML = `
      <div class="empty-visual" aria-hidden="true">
        <svg viewBox="0 0 120 120">
          <rect x="26" y="18" width="68" height="84" rx="18" fill="#5f748d" opacity="0.14" />
          <path d="M37 45c0-12 10-22 23-22s23 10 23 22v31c0 4-3 7-7 7H44c-4 0-7-3-7-7V45Z" fill="#fff" stroke="#d6c7b3" stroke-width="2" />
          <path d="M47 44h26" stroke="#8a684f" stroke-width="3" stroke-linecap="round" />
          <path d="M47 54h18" stroke="#8a684f" stroke-width="3" stroke-linecap="round" opacity="0.85" />
        </svg>
      </div>
      <h3>No meals in this filter.</h3>
      <p>Try another filter or save more meals from Discover.</p>
      <button class="primary-button" type="button" data-nav="discover">Explore Meals</button>
    `;
    elements.savedResults.appendChild(emptyFilter);
    return;
  }

  visibleMeals.forEach((meal) => {
    const card = document.createElement("article");
    card.className = "saved-card";
    card.innerHTML = `
      <img src="${meal.image}" alt="${meal.name}" />
      <div class="saved-card-body">
        <div class="saved-card-head">
          <div>
            <h3>${meal.name}</h3>
            <p class="saved-meta">${meal.time} min · ${meal.difficulty}</p>
          </div>
          <button class="favorite-toggle" type="button" aria-label="Toggle favorite for ${meal.name}" data-active="${meal.favorite ? "true" : "false"}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-9.2-8.4C1 8 2.9 4.5 6.5 4.2c2.1-.2 3.9 1 5 2.4 1.1-1.4 2.9-2.6 5-2.4 3.6.3 5.5 3.8 3.7 7.4C19 15.6 12 20 12 20Z" /></svg>
          </button>
        </div>
        <div class="meta-row">
          <span class="meta-pill">${meal.cost} Budget</span>
          <span class="meta-pill">${meal.ingredients} ingredients</span>
          <span class="meta-pill">${meal.favorite ? "Favorited" : "Saved"}</span>
        </div>
      </div>
    `;

    card.querySelector(".favorite-toggle")?.addEventListener("click", () => {
      const nextFavorite = toggleFavorite(meal.id);
      showToast(
        nextFavorite
          ? `${meal.name} added to favorites.`
          : `${meal.name} removed from favorites.`,
      );
    });

    elements.savedResults.appendChild(card);
  });
}

function bindNavigation() {
  document.addEventListener("click", (event) => {
    const navTarget = event.target.closest("[data-nav]");
    if (navTarget instanceof HTMLElement) {
      const view = navTarget.dataset.nav;
      if (view) {
        openView(view);
      }
    }
  });

  elements.skipButton.addEventListener("click", () => advanceDeck("skip"));
  elements.saveButton.addEventListener("click", () => advanceDeck("save"));

  elements.filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      if (chip.dataset.filter) {
        setFilter(chip.dataset.filter);
      }
    });
  });
}

function init() {
  bindNavigation();
  applyArtwork();
  updateSavedBadge();
  renderDiscover();
  renderSaved();
  openView("home");
}

init();
