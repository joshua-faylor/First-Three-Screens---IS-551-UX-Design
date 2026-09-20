const STORAGE_KEY = "mealmatch.saved.v1";
const FILTERS = {
  all: "all",
  quick: "quick",
  cheap: "cheap",
};

// One catalog keeps saved IDs, recommendation metadata, and artwork consistent.
// Rows: ID, name, minutes, ingredients, price, illustration scene, food color.
const mealDeck = [
  ["quesadilla", "Chicken Quesadillas", 15, 7, "$", "quesadilla", "#df9b50"],
  ["teriyaki", "Teriyaki Chicken Bowl", 20, 8, "$$", "teriyaki", "#945833"],
  ["pesto", "Chicken Pesto Pasta", 20, 8, "$$", "pesto", "#7c9855"],
  ["breakfast-burrito", "Breakfast Burritos", 12, 7, "$", "breakfast-burrito", "#e2b852"],
  ["sheet-pan", "Sheet Pan Chicken and Vegetables", 30, 9, "$$", "sheet-pan", "#c98049"],
  ["grilled-cheese", "Grilled Cheese and Tomato Soup", 10, 5, "$", "grilled-cheese", "#e5b45c"],
  ["street-tacos", "Chickpea Street Tacos", 18, 9, "$", "street-tacos", "#c99557"],
  ["sweet-potato", "Loaded Sweet Potato Bowls", 25, 8, "$", "sweet-potato", "#d07b3c"],
  ["alfredo", "Chicken Alfredo", 25, 8, "$$", "pasta", "#e8d5ac"],
  ["parmesan", "Chicken Parmesan Pasta", 30, 9, "$$", "pasta", "#bc5940"],
  ["tomato-pasta", "Tomato Basil Pasta", 20, 6, "$", "pasta", "#d96d4c"],
  ["tuscan", "Creamy Tuscan Chicken", 30, 10, "$$", "skillet", "#dcbf8d"],
  ["tikka", "Chicken Tikka Masala", 35, 12, "$$", "curry", "#cc7142"],
  ["chicken-tacos", "Chicken Tacos", 15, 7, "$", "street-tacos", "#d1a16b"],
  ["enchiladas", "Chicken Enchiladas", 30, 9, "$$", "baked", "#bd5944"],
  ["southwest", "Southwest Chicken Bowl", 20, 9, "$$", "salad", "#d5a45b"],
  ["shawarma", "Chicken Shawarma Wrap", 25, 10, "$$", "wrap", "#c29761"],
  ["fried-rice", "Chicken Fried Rice", 20, 8, "$", "rice", "#d7b769"],
  ["beef-broccoli", "Beef and Broccoli Rice Bowl", 25, 9, "$$", "rice", "#885941"],
  ["korean-beef", "Korean Beef Rice Bowl", 25, 10, "$$", "rice", "#a96540"],
  ["peanut-noodles", "Thai Peanut Noodles", 20, 10, "$$", "noodles", "#bc915d"],
  ["turkey-melt", "Turkey Pesto Melt", 15, 7, "$$", "sandwich", "#90a167"],
  ["tomato-soup", "Tomato Basil Soup with Toast", 25, 7, "$", "soup", "#c96043"],
  ["flatbread", "BBQ Chicken Flatbread", 20, 8, "$$", "flatbread", "#9b593f"],
  ["baked-potato", "Loaded Baked Potatoes", 30, 7, "$", "potato", "#dfc681"],
  ["breakfast-tacos", "Breakfast Tacos", 15, 7, "$", "street-tacos", "#edc957"],
  ["lentil-curry", "Coconut Lentil Curry", 30, 10, "$", "curry", "#d5ac52"],
  ["chickpea-salad", "Mediterranean Chickpea Salad", 15, 9, "$", "salad", "#b6bd7b"],
].map(([id, name, time, ingredients, cost, artId, foodColor]) => ({
  id, name, time, ingredients, cost, artId, foodColor,
  difficulty: time > 30 ? "Medium" : "Easy", image: "",
}));
const mealsById = new Map(mealDeck.map((meal) => [meal.id, meal]));
const familiarityLabels = ["Very Familiar", "A Little Different", "Something New", "Adventurous"];

// Each reference has four curated groups, from close swaps to new cuisines.
// Explicit links also let a saved adventurous meal become a sensible new starting point.
const remixFamilies = {
  quesadilla: ["chicken-tacos breakfast-burrito", "enchiladas breakfast-tacos", "southwest flatbread", "shawarma tikka"],
  teriyaki: ["fried-rice beef-broccoli", "korean-beef southwest", "peanut-noodles sheet-pan", "tikka shawarma"],
  pesto: ["alfredo tomato-pasta", "parmesan tuscan", "turkey-melt flatbread", "peanut-noodles tikka"],
  "breakfast-burrito": ["breakfast-tacos quesadilla", "chicken-tacos street-tacos", "baked-potato southwest", "shawarma korean-beef"],
  "sheet-pan": ["tuscan southwest", "shawarma chicken-tacos", "parmesan enchiladas", "tikka korean-beef"],
  "grilled-cheese": ["turkey-melt tomato-soup", "flatbread tomato-pasta", "baked-potato parmesan", "lentil-curry shawarma"],
  "street-tacos": ["chicken-tacos breakfast-tacos", "quesadilla breakfast-burrito", "chickpea-salad sweet-potato", "lentil-curry shawarma"],
  "sweet-potato": ["baked-potato southwest", "chickpea-salad sheet-pan", "street-tacos breakfast-burrito", "lentil-curry tikka"],
  alfredo: ["parmesan tomato-pasta", "pesto tuscan", "sheet-pan turkey-melt", "tikka peanut-noodles"],
  parmesan: ["tomato-pasta alfredo", "pesto tuscan", "flatbread sheet-pan", "tikka shawarma"],
  "tomato-pasta": ["pesto parmesan", "alfredo tomato-soup", "flatbread grilled-cheese", "lentil-curry tikka"],
  tuscan: ["sheet-pan alfredo", "pesto parmesan", "shawarma flatbread", "tikka teriyaki"],
  tikka: ["lentil-curry tuscan", "shawarma sheet-pan", "teriyaki korean-beef", "enchiladas parmesan"],
  "chicken-tacos": ["quesadilla street-tacos", "enchiladas breakfast-burrito", "southwest flatbread", "shawarma korean-beef"],
  enchiladas: ["quesadilla chicken-tacos", "breakfast-burrito southwest", "flatbread sheet-pan", "tikka shawarma"],
  southwest: ["sweet-potato fried-rice", "chicken-tacos quesadilla", "enchiladas sheet-pan", "korean-beef shawarma"],
  shawarma: ["chickpea-salad sheet-pan", "turkey-melt chicken-tacos", "tuscan southwest", "tikka korean-beef"],
  "fried-rice": ["teriyaki beef-broccoli", "korean-beef southwest", "peanut-noodles breakfast-burrito", "tikka lentil-curry"],
  "beef-broccoli": ["korean-beef teriyaki", "fried-rice southwest", "peanut-noodles sheet-pan", "shawarma tikka"],
  "korean-beef": ["beef-broccoli teriyaki", "fried-rice peanut-noodles", "southwest chicken-tacos", "shawarma tikka"],
  "peanut-noodles": ["teriyaki fried-rice", "beef-broccoli korean-beef", "pesto lentil-curry", "shawarma parmesan"],
  "turkey-melt": ["grilled-cheese flatbread", "shawarma quesadilla", "pesto tomato-soup", "chicken-tacos tikka"],
  "tomato-soup": ["grilled-cheese tomato-pasta", "parmesan flatbread", "tuscan baked-potato", "lentil-curry tikka"],
  flatbread: ["turkey-melt grilled-cheese", "quesadilla parmesan", "enchiladas southwest", "shawarma tikka"],
  "baked-potato": ["sweet-potato sheet-pan", "southwest grilled-cheese", "breakfast-burrito tomato-soup", "lentil-curry tikka"],
  "breakfast-tacos": ["breakfast-burrito chicken-tacos", "quesadilla street-tacos", "fried-rice baked-potato", "shawarma korean-beef"],
  "lentil-curry": ["tikka tomato-soup", "sweet-potato chickpea-salad", "peanut-noodles tuscan", "street-tacos enchiladas"],
  "chickpea-salad": ["shawarma street-tacos", "sweet-potato southwest", "pesto sheet-pan", "lentil-curry peanut-noodles"],
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
}

function referenceIdFor(meal) {
  if (mealsById.has(meal.id)) return meal.id;
  // Older generated variants retain their artwork/family, so they remain remixable.
  if (mealsById.has(meal.artId)) return meal.artId;
  return { wraps: "quesadilla", bowls: "teriyaki", pasta: "pesto", chicken: "sheet-pan", toast: "grilled-cheese" }[meal.family] || "teriyaki";
}

function recommendationsFor(reference, level) {
  return remixFamilies[referenceIdFor(reference)][level].split(" ")
    .map((id) => mealsById.get(id))
    .filter((meal) => meal.id !== reference.id)
    .map((meal, index) => {
      const familiarIngredients = Math.max(0, Math.min(reference.ingredients, meal.ingredients - [1, 2, 4, 6][level]));
      return {
        ...meal, image: meal.image || createMealArt(meal),
        // Illustrative change estimates; time and price compare the actual reference.
        familiarity: [92, 78, 58, 35][level] - index * 3,
        familiarIngredients, newIngredients: meal.ingredients - familiarIngredients,
        timeDifference: meal.time - reference.time,
        priceDifference: meal.cost.length === reference.cost.length ? "Similar price" : meal.cost.length > reference.cost.length ? "Higher price" : "Lower price",
        remixOf: reference.name, noveltyLevel: level,
      };
    });
}

function resetRecommendations(reference = state.remixMeal, level = state.familiarityLevel) {
  clearTimeout(state.advanceTimer);
  state.animating = false;
  state.drag.active = false;
  state.remixMeal = reference;
  state.familiarityLevel = level;
  state.currentIndex = 0;
  state.lastAction = null;
  clearToast();
  // Normal Explore assumes a small student meal rotation; no history is inferred.
  const usualMeals = ["quesadilla", "teriyaki", "alfredo", "grilled-cheese", "sweet-potato", "breakfast-burrito", "street-tacos"];
  state.recommendations = (reference ? [reference] : usualMeals.map((id) => mealsById.get(id)))
    .flatMap((meal) => recommendationsFor(meal, level))
    .filter((meal, index, meals) => meals.findIndex((other) => other.id === meal.id) === index);
  elements.dial.value = String(level);
  elements.dial.setAttribute("aria-valuetext", familiarityLabels[level]);
  elements.dialLabel.textContent = familiarityLabels[level];
  elements.remixContext.textContent = reference ? `Remixing ${reference.name}` : "Based on your usual meals";
  renderDiscover();
}

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

  const [background, accent, shadow] = themes[meal.artId || meal.id] || [
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

  const sceneId = meal.artId || meal.id;
  const food = meal.foodColor || accent;
  const garnish = `<g fill="#6f9256"><ellipse cx="530" cy="440" rx="28" ry="12" transform="rotate(-25 530 440)"/><ellipse cx="685" cy="545" rx="25" ry="11"/></g>`;
  const bowl = `<ellipse cx="600" cy="520" rx="265" ry="175" fill="#4a6170" filter="url(#softShadow)"/><ellipse cx="600" cy="490" rx="238" ry="140" fill="#f4e8d3"/>`;
  const chunks = Array.from({ length: 9 }, (_, i) => `<rect x="${440 + (i % 3) * 105}" y="${405 + Math.floor(i / 3) * 62}" width="65" height="40" rx="15" fill="${food}" transform="rotate(${i % 2 ? 12 : -12} ${470 + (i % 3) * 105} ${425 + Math.floor(i / 3) * 62})"/>`).join("");
  const noodles = Array.from({ length: 5 }, (_, i) => `<path d="M440 ${420 + i * 30}q70-70 150 0t170 0" fill="none" stroke="${food}" stroke-width="19" stroke-linecap="round"/>`).join("");
  const extraScenes = {
    pasta: `${plate}${noodles}${garnish}<circle cx="720" cy="450" r="22" fill="#b84f3d"/>`,
    noodles: `${bowl}${noodles}<path d="M430 460l310 70M475 550l210-130" stroke="#85a46b" stroke-width="13"/>`,
    rice: `${bowl}${chunks}<g fill="#76965c"><circle cx="450" cy="480" r="28"/><circle cx="735" cy="435" r="31"/><circle cx="720" cy="560" r="26"/></g>`,
    curry: `${bowl}<ellipse cx="600" cy="495" rx="205" ry="115" fill="${food}"/><path d="M485 485q100-75 220 20t-130 45" fill="none" stroke="#f4dbac" stroke-width="12"/>${garnish}`,
    soup: `${bowl}<ellipse cx="600" cy="495" rx="205" ry="115" fill="${food}"/><ellipse cx="600" cy="490" rx="90" ry="45" fill="none" stroke="#f3d6ae" stroke-width="10"/><rect x="825" y="480" width="95" height="160" rx="30" fill="#d4a369" transform="rotate(20 870 550)"/>${garnish}`,
    skillet: `<circle cx="600" cy="490" r="225" fill="#3e3933"/><rect x="790" y="460" width="180" height="48" rx="22" fill="#3e3933"/><ellipse cx="600" cy="490" rx="198" ry="177" fill="#f3e3bd"/>${chunks}${garnish}`,
    baked: `<rect x="285" y="325" width="630" height="335" rx="45" fill="#667e8c"/><rect x="315" y="350" width="570" height="280" rx="25" fill="${food}"/>${[0,1,2,3].map(i => `<rect x="${355+i*125}" y="380" width="95" height="220" rx="40" fill="#e9b879"/>`).join("")}<path d="M340 430h510m-510 85h510m-510 60h510" stroke="#b45840" stroke-width="18"/>${garnish}`,
    wrap: `${plate}<g transform="rotate(-18 600 490)"><rect x="420" y="395" width="350" height="180" rx="85" fill="#e3c192"/><ellipse cx="735" cy="485" rx="45" ry="80" fill="${food}"/><path d="M460 420l50 135m25-140l50 145" stroke="#c39865" stroke-width="9"/><circle cx="735" cy="460" r="22" fill="#809961"/></g>`,
    sandwich: `${plate}<path d="M410 500l190-150 195 150-190 130Z" fill="#be7d46"/><path d="M420 485l180-125 175 125-170 110Z" fill="${food}"/><path d="M410 455l190-150 195 150-190 115Z" fill="#e0b675"/><path d="M520 395l130 100m-75-140l135 100" stroke="#aa743e" stroke-width="12"/>`,
    flatbread: `${plate}<ellipse cx="600" cy="490" rx="235" ry="135" fill="#d7aa6e"/><ellipse cx="600" cy="490" rx="205" ry="108" fill="${food}"/>${chunks}<path d="M435 465l330 55m-290 45l230-140" stroke="#ebd3a0" stroke-width="12"/>${garnish}`,
    potato: `${plate}<ellipse cx="600" cy="490" rx="205" ry="115" fill="#a8784e"/><path d="M430 490q170-155 340 0-170 125-340 0" fill="${food}"/><path d="M470 475l230 45m-205 25l170-100" stroke="#f4e4b4" stroke-width="16"/>${garnish}`,
    salad: `${bowl}<ellipse cx="600" cy="490" rx="215" ry="118" fill="#8fa46e"/>${chunks}<g fill="#c35e47"><circle cx="480" cy="445" r="24"/><circle cx="720" cy="530" r="26"/></g><g fill="#efe4c8"><rect x="580" y="430" width="30" height="28"/><rect x="535" y="520" width="30" height="28"/></g>`,
  };
  let scene = extraScenes[sceneId] || scenes[sceneId] || scenes.teriyaki;
  // Shared structures receive distinct food colors and toppings, not just a new label.
  if (meal.foodColor && scenes[sceneId]) {
    scene = scene.replace(/#e9b975|#c76b52|#d98b54|#c8d885/g, meal.foodColor);
  }
  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${escapeHtml(meal.name || "Meal illustration")}">
      ${common}
      ${sparkles}
      ${scene}
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
  familiarityLevel: 1,
  remixMeal: null,
  recommendations: [],
  animating: false,
  advanceTimer: null,
  currentIndex: 0,
  savedMeals: loadSavedMeals(),
  filter: FILTERS.all,
  lastAction: null,
  drag: {
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  },
  pendingRemoval: null,
  removalTrigger: null,
  toastTimer: null,
  toastUndoHandler: null,
};

const elements = {
  removeDialog: document.getElementById("remove-dialog"),
  removeDescription: document.getElementById("remove-description"),
  removeError: document.getElementById("remove-error"),
  cancelRemove: document.getElementById("cancel-remove"),
  confirmRemove: document.getElementById("confirm-remove"),
  dial: document.getElementById("familiarity-dial"),
  dialLabel: document.getElementById("familiarity-label"),
  remixContext: document.getElementById("remix-context"),
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
  toastMessage: document.getElementById("toast-message"),
  toastAction: document.getElementById("toast-action"),
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

    return parsed.filter((meal) => meal && typeof meal.id === "string").map((meal) => {
      const original = mealDeck.find((entry) => entry.id === meal.id);
      const base = original || { name: "Saved meal", time: 20, ingredients: 8, cost: "$", difficulty: "Easy" };
      return {
        ...meal,
        name: typeof meal.name === "string" && meal.name ? meal.name : base.name,
        time: Number.isFinite(meal.time) && meal.time > 0 ? meal.time : base.time,
        ingredients: Number.isInteger(meal.ingredients) && meal.ingredients > 0 ? meal.ingredients : base.ingredients,
        cost: ["$", "$$", "$$$"].includes(meal.cost) ? meal.cost : base.cost,
        difficulty: ["Easy", "Medium", "Hard"].includes(meal.difficulty) ? meal.difficulty : base.difficulty,
        image: createMealArt(original || { ...meal, id: meal.artId || meal.id }),
      };
    });
  } catch {
    return [];
  }
}

function persistSavedMeals() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.savedMeals));
    return true;
  } catch {
    return false;
  }
}

function getCurrentMeal() {
  return state.recommendations[state.currentIndex] || null;
}

function nextMealIndex() {
  state.currentIndex += 1;
  if (state.currentIndex >= state.recommendations.length) {
    state.currentIndex = state.recommendations.length;
  }
  renderDiscover();
}

function openView(view) {
  if (state.animating) {
    clearTimeout(state.advanceTimer);
    state.animating = false;
  }
  clearToast();
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
  elements.toastMessage.textContent = message;
  elements.toastAction.hidden = true;
  elements.toast.classList.add("visible");

  state.toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 1700);
}

function showUndoToast(message, undoHandler) {
  clearTimeout(state.toastTimer);
  state.toastUndoHandler = undoHandler;
  elements.toastMessage.textContent = message;
  elements.toastAction.hidden = false;
  elements.toast.classList.add("visible");

  state.toastTimer = window.setTimeout(() => {
    clearToast();
  }, 2200);
}

function clearToast() {
  clearTimeout(state.toastTimer);
  state.toastTimer = null;
  state.toastUndoHandler = null;
  elements.toast.classList.remove("visible");
  elements.toastAction.hidden = true;
}

function isSaved(id) {
  return state.savedMeals.some((meal) => meal.id === id);
}

function saveMeal(meal) {
  if (!meal) {
    return false;
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
    state.storageAvailable = persistSavedMeals();
    updateSavedBadge();
  }

  return !alreadySaved;
}

function skipMeal(meal) {
  if (!meal) {
    return;
  }
}

function removeSavedMeal(id) {
  state.savedMeals = state.savedMeals.filter((meal) => meal.id !== id);
  persistSavedMeals();
  updateSavedBadge();
}

function requestRemoval(meal, trigger) {
  clearToast();
  state.pendingRemoval = meal;
  state.removalTrigger = trigger;
  elements.removeDescription.textContent = `${meal.name} will be removed from your saved meals.`;
  elements.removeError.classList.add("hidden");
  elements.removeDialog.showModal();
  elements.cancelRemove.focus();
}

function confirmRemoval() {
  const meal = state.pendingRemoval;
  if (!meal) return;
  const previousMeals = state.savedMeals;
  state.savedMeals = state.savedMeals.filter((entry) => entry.id !== meal.id);
  if (!persistSavedMeals()) {
    state.savedMeals = previousMeals;
    elements.removeError.textContent = "Couldn't update saved meals. Please try again.";
    elements.removeError.classList.remove("hidden");
    return;
  }
  if (state.remixMeal?.id === meal.id) resetRecommendations(null, 1);
  state.lastAction = null;
  renderSaved();
  elements.removeDialog.close();
  showToast("Meal removed.");
}

function undoLastAction() {
  const action = state.lastAction;
  if (!action) {
    return;
  }

  if (action.type === "save" && action.addedToSaved) {
    removeSavedMeal(action.meal.id);
  }

  state.currentIndex = action.prevIndex;
  state.lastAction = null;
  window.__mealMatchLastAction = state.lastAction;
  clearToast();
  renderSaved();
  renderDiscover();
}

function advanceDeck(action) {
  if (state.animating || state.view !== "discover") return;
  const currentMeal = getCurrentMeal();
  if (!currentMeal) {
    return;
  }

  const card = elements.cardStack.querySelector(".card-face.top");
  if (!card) {
    return;
  }

  state.animating = true;
  const restoreCardFocus = document.activeElement === card;
  const previousIndex = state.currentIndex;
  card.classList.remove("swiping-save", "swiping-skip", "dragging");
  card.style.transition = "transform 240ms ease, opacity 240ms ease";
  card.style.transform =
    action === "save"
      ? "translateX(125%) rotate(14deg)"
      : "translateX(-125%) rotate(-14deg)";
  card.style.opacity = "0";

  state.advanceTimer = window.setTimeout(() => {
    state.animating = false;
    let addedToSaved = false;

    if (action === "save") {
      addedToSaved = saveMeal(currentMeal);
    } else {
      skipMeal(currentMeal);
    }

    state.lastAction = {
      type: action,
      meal: currentMeal,
      prevIndex: previousIndex,
      addedToSaved,
    };
    window.__mealMatchLastAction = state.lastAction;

    showUndoToast(action === "save" ? (state.storageAvailable === false ? "Saved for this visit only. Storage unavailable." : addedToSaved ? "Saved." : "Already saved.") : "Skipped.", undoLastAction);

    nextMealIndex();
    if (restoreCardFocus) elements.cardStack.querySelector(".top")?.focus();
  }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260);
}

function renderDiscover() {
  const currentMeal = getCurrentMeal();
  elements.skipButton.disabled = !currentMeal;
  elements.saveButton.disabled = !currentMeal;
  const upcomingMeals = state.recommendations.slice(
    state.currentIndex,
    state.currentIndex + 2,
  );
  window.__mealMatchCurrentIndex = state.currentIndex;
  elements.cardStack.innerHTML = "";

  if (!currentMeal) {
    const endCard = document.createElement("article");
    endCard.className = "card-face top";
    endCard.innerHTML = `
      <div class="card-body card-empty-state">
        <h3>You're caught up.</h3>
        <p>Try another dial setting or revisit these ideas.</p>
        <div class="hero-actions" style="margin-top: 4px;">
          <button class="primary-button" type="button" data-nav="saved">Saved Meals</button>
          <button class="secondary-button" type="button" id="restart-discovery">Start Over</button>
        </div>
      </div>
    `;
    elements.cardStack.appendChild(endCard);
    const restartButton = endCard.querySelector("#restart-discovery");
    restartButton?.addEventListener("click", () => {
      resetRecommendations();
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
    ghostCard.setAttribute("aria-hidden", "true");
    ghostCard.innerHTML = `
      <div class="card-body card-empty-state">
        <h3>More meals are on the way.</h3>
        <p>Keep swiping for the full set.</p>
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
  if (!isInteractive) card.setAttribute("aria-hidden", "true");
  card.setAttribute(
    "aria-label",
    `${meal.name}, ${meal.time} minutes, ${meal.difficulty}. ${meal.familiarity}% familiar. Use left arrow to skip, right arrow to save.`,
  );

  card.innerHTML = `
    <div class="card-media">
      <img src="${meal.image}" alt="${escapeHtml(meal.name)}" />
    </div>
    <div class="card-body">
      <p class="card-context">Remixed from ${escapeHtml(meal.remixOf)}</p>
      <h3>${escapeHtml(meal.name)}</h3>
      <p class="meta-band" aria-label="Meal details">${meal.time} min | ${meal.difficulty} | ${meal.ingredients} ingredients | ${meal.cost}</p>
      <div class="familiarity-panel">
        <div class="familiarity-heading"><strong>${meal.familiarity}% familiar</strong><span>Sample estimate</span></div>
        <p>${meal.familiarIngredients} familiar ingredients · ${meal.newIngredients} new</p>
        <p>${meal.timeDifference === 0 ? "Same cooking time" : `${meal.timeDifference > 0 ? "+" : "−"}${Math.abs(meal.timeDifference)} min`} · ${meal.priceDifference}</p>
      </div>
    </div>
  `;

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
  card.addEventListener("pointercancel", (event) => {
    state.drag.currentX = 0;
    onCardPointerUp(event);
  });
}

function onCardPointerDown(event) {
  if (state.animating || !event.isPrimary || event.button !== 0) return;
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

function setFilter(filter) {
  state.filter = filter;
  elements.filterChips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.filter === filter);
    chip.setAttribute("aria-pressed", String(chip.dataset.filter === filter));
  });
  renderSaved();
}

function matchesFilter(meal) {
  if (state.filter === FILTERS.quick) {
    return meal.time <= 20;
  }

  if (state.filter === FILTERS.cheap) {
    return meal.cost === "$";
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
      <p>Try another filter or save more meals.</p>
    `;
    elements.savedResults.appendChild(emptyFilter);
    return;
  }

  visibleMeals.forEach((meal) => {
    const card = document.createElement("article");
    card.className = "saved-card";
    card.innerHTML = `
      <img src="${meal.image}" alt="${escapeHtml(meal.name)}" />
      <div class="saved-card-body">
        <h3>${escapeHtml(meal.name)}</h3>
        <p class="saved-meta">${meal.time} min · ${meal.difficulty}</p>
        <div class="meta-row">
          <span class="meta-pill">${meal.ingredients} ingredients</span>
          <span class="meta-pill">${meal.cost}</span>
        </div>
      </div>
    `;

    const remixButton = document.createElement("button");
    remixButton.className = "text-button remix-button";
    remixButton.type = "button";
    remixButton.textContent = "Remix";
    remixButton.setAttribute("aria-label", `Remix ${meal.name}`);
    remixButton.addEventListener("click", () => {
      resetRecommendations(meal, 1);
      openView("discover");
      elements.dial.focus();
      window.scrollTo({ top: 0 });
    });
    const actions = document.createElement("div");
    actions.className = "saved-card-actions";
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    removeButton.setAttribute("aria-label", `Remove ${meal.name}`);
    removeButton.addEventListener("click", () => requestRemoval(meal, removeButton));
    actions.append(remixButton, removeButton);
    card.querySelector(".saved-card-body").appendChild(actions);
    elements.savedResults.appendChild(card);
  });
}

function bindNavigation() {
  elements.cancelRemove.addEventListener("click", () => elements.removeDialog.close());
  elements.confirmRemove.addEventListener("click", confirmRemoval);
  // Native dialog provides focus containment, an inert backdrop, and Escape handling.
  elements.removeDialog.addEventListener("close", () => {
    const trigger = state.removalTrigger;
    state.pendingRemoval = null;
    state.removalTrigger = null;
    if (trigger?.isConnected) trigger.focus();
    else (elements.savedResults.querySelector(".remix-button") || document.querySelector(".filter-chip.active"))?.focus();
  });
  elements.dial.addEventListener("input", () => resetRecommendations(state.remixMeal, Number(elements.dial.value)));
  document.addEventListener("click", (event) => {
    const navTarget = event.target.closest("[data-nav]");
    if (navTarget instanceof HTMLElement) {
      const view = navTarget.dataset.nav;
      if (view) {
        if (view === "discover" && navTarget.closest("#home-screen")) resetRecommendations(null, 1);
        openView(view);
      }
    }
  });

  elements.skipButton.addEventListener("click", () => advanceDeck("skip"));
  elements.saveButton.addEventListener("click", () => advanceDeck("save"));

  elements.toastAction.addEventListener("click", () => {
    if (state.toastUndoHandler) {
      state.toastUndoHandler();
    }
  });

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
  elements.toastAction.hidden = true;
  window.__mealMatchUndoLastAction = undoLastAction;
  updateSavedBadge();
  resetRecommendations(null, 1);
  renderSaved();
  openView("home");
}

init();
