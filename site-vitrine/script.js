// Questions fréquentes : affichées dans la section FAQ et utilisées par l'assistant.
// Les mots-clés sont comparés au début des mots de la question (sans accents).
const FAQ = [
  {
    question: "Livrez-vous en dehors de Nabeul ?",
    answer: "Oui, nous livrons partout en Tunisie sous 3 à 5 jours ouvrés. La vaisselle est emballée pièce par pièce pour éviter la casse.",
    keywords: ["livr", "envoi", "envoy", "expedi", "tunis", "sousse", "sfax", "colis", "transport", "delai"]
  },
  {
    question: "La vaisselle passe-t-elle au lave-vaisselle et au micro-ondes ?",
    answer: "La vaisselle en grès passe au lave-vaisselle et au micro-ondes. Seules les pièces à liseré argenté ou doré ne vont pas au micro-ondes.",
    keywords: ["lave", "vaisselle", "micro", "entretien", "laver", "nettoy", "gres", "argent", "dore"]
  },
  {
    question: "Vos casseroles sont-elles compatibles avec l'induction ?",
    answer: "Oui, nos batteries de cuisine et cocottes fonctionnent sur tous les feux, induction comprise. Les couvercles en verre vont au four jusqu'à 180 °C.",
    keywords: ["induction", "casserol", "poele", "faitout", "cocotte", "feu", "gaz", "four", "plaque", "cuisson", "batterie"]
  },
  {
    question: "Comment fonctionne la liste de mariage ?",
    answer: "Nous composons la liste avec vous en boutique, puis vous partagez un lien avec vos invités. Tout est livré en une fois après la fête. Le service est gratuit.",
    keywords: ["mariage", "liste", "invite", "cadeau", "fete", "fiance", "trousseau", "jhez"]
  },
  {
    question: "Proposez-vous des tarifs pour les cafés, restaurants et hôtels ?",
    answer: "Oui, nous proposons des tarifs selon les volumes, des échantillons avant commande et des gammes suivies pour le réassort. Demandez un devis via le formulaire.",
    keywords: ["restaurant", "cafe", "hotel", "professionnel", "pro", "volume", "devis", "quantite", "etablissement", "gros"]
  },
  {
    question: "Peut-on acheter les pièces à l'unité ?",
    answer: "Oui, toutes les pièces de nos collections sont vendues à l'unité, ce qui permet de compléter ou remplacer un service à tout moment.",
    keywords: ["unite", "piece", "remplac", "complet", "casse", "assiette", "bol", "tasse", "mug"]
  },
  {
    question: "Puis-je échanger un article ?",
    answer: "Les articles non utilisés peuvent être échangés sous 14 jours, avec le ticket de caisse, dans leur emballage d'origine.",
    keywords: ["echang", "retour", "rembours", "rendre", "garantie", "abime", "defaut"]
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer: "Espèces, carte bancaire et virement. Pour un trousseau complet, le paiement peut se faire en plusieurs fois.",
    keywords: ["pai", "payer", "carte", "virement", "espece", "plusieurs", "facilit", "prix", "tarif", "cout", "combien"]
  },
  {
    question: "Quels sont vos horaires ?",
    answer: "La boutique est ouverte du mardi au samedi, de 9 h à 19 h. Elle est fermée le dimanche et le lundi.",
    keywords: ["horaire", "heure", "ouvert", "ferme", "dimanche", "lundi", "samedi", "visite", "venir", "adresse", "boutique"]
  }
];

const SUGGESTIONS = ["Livrez-vous à Tunis ?", "Liste de mariage ?", "Compatible induction ?"];

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");
}

function findAnswer(text) {
  const words = normalize(text).split(/\s+/).filter(Boolean);
  let best = null;
  let bestScore = 0;
  for (const item of FAQ) {
    const score = item.keywords.filter((key) =>
      words.some((word) => word.startsWith(key))
    ).length;
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }
  return best;
}

// Fiches produits : ouvertes au clic sur une photo des collections ou des inspirations.
const PRODUCTS = {
  "gres-gris": {
    category: "Vaisselle",
    name: "Grès gris, liseré argent",
    price: "Service 6 personnes · 290 TND",
    presentation: "Un service élégant et sobre qui passe du quotidien aux dîners plus habillés.",
    description: "Assiettes plates, creuses et bols en grès émaillé gris-bleu, rehaussés d'un fin liseré argenté. Les formes empilables font gagner de la place dans les placards.",
    photo: "Assiettes plates et creuses, bols de plusieurs tailles et petits ramequins gris à liseré argenté, disposés sur une table blanche, avec un accessoire en métal brossé au premier plan.",
    details: [["Matière", "Grès émaillé"], ["Contenu", "24 pièces : 6 assiettes plates, 6 creuses, 6 à dessert, 6 bols"], ["Entretien", "Lave-vaisselle ; pas de micro-ondes (liseré métallique)"]]
  },
  "noir-mat": {
    category: "Vaisselle",
    name: "Noir mat",
    price: "Service 6 personnes · 340 TND",
    presentation: "Une table graphique et contemporaine, qui met les couleurs des plats en valeur.",
    description: "Assiettes, bols et tasses en grès à l'émail noir mat. Associés à des couverts dorés et des sets tressés, ils composent une table chic et chaleureuse.",
    photo: "Une table dressée de vaisselle noire mate : grandes assiettes plates, bols, tasses et mugs, accompagnés de couverts dorés posés sur un set de table tressé, dans une pièce claire.",
    details: [["Matière", "Grès émaillé mat"], ["Contenu", "6 assiettes plates, 6 creuses, 6 bols, 6 tasses"], ["Entretien", "Lave-vaisselle et micro-ondes"]]
  },
  "beige-rotin": {
    category: "Vaisselle",
    name: "Naturel & tressé",
    price: "Assiette dès 18 TND",
    presentation: "Des tons sable et des matières naturelles pour une table douce et accueillante.",
    description: "Vaisselle crème aux bords arrondis, à associer à nos sets de table ronds en fibres tressées. Chaque pièce est vendue à l'unité pour composer votre service librement.",
    photo: "Une grande assiette plate, une assiette creuse et un bol crème empilés sur un set de table rond en fibres tressées ; en arrière-plan, un saladier sur pied et un vase sombre.",
    details: [["Matière", "Grès émaillé, set en fibres naturelles"], ["Vente", "À l'unité"], ["Entretien", "Vaisselle : lave-vaisselle ; set : à épousseter"]]
  },
  "the-pois": {
    category: "Thé & café",
    name: "Thé & café à pois",
    price: "Coffret 6 tasses · 120 TND",
    presentation: "Un service gai et raffiné pour le thé de l'après-midi ou les réceptions.",
    description: "Porcelaine blanche à pois noirs, anses et poignées dorées. La collection comprend tasses et soucoupes, présentoir à deux étages, boîte et sucrier assortis.",
    photo: "Un service blanc à pois noirs : tasses à anses dorées sur leurs soucoupes, présentoir à gâteaux à deux étages avec poignée dorée, boîte ronde à couvercle, sucrier et assiettes.",
    details: [["Matière", "Porcelaine, décor doré"], ["Contenu du coffret", "6 tasses et 6 soucoupes"], ["Entretien", "Lavage à la main conseillé ; pas de micro-ondes"]]
  },
  "cuisine-casseroles": {
    category: "Cuisine",
    name: "Batterie de cuisine",
    price: "7 pièces · 450 TND",
    presentation: "Une batterie complète et assortie, pour cuisiner tous les jours.",
    description: "Faitouts et poêle à revêtement antiadhésif noir, couvercles en verre et poignées effet bois qui restent froides. Compatible avec tous les feux, induction comprise.",
    photo: "Sur un plan de travail en marbre clair : quatre faitouts noirs avec couvercles en verre et boutons effet bois, une poêle, une spatule et une louche noires à manche bois ; un bol de citrons en arrière-plan.",
    details: [["Contenu", "4 faitouts avec couvercles, 1 poêle, 2 ustensiles"], ["Feux", "Tous feux, dont induction"], ["Entretien", "Lavage à la main conseillé"]]
  },
  "faitouts": {
    category: "Cuisine",
    name: "Cocottes & plats",
    price: "Dès 85 TND",
    presentation: "Des cocottes assorties et un plat à four, à choisir à l'unité ou en ensemble.",
    description: "Faitouts et plat rectangulaire noirs, couvercles en verre avec boutons et poignées effet bois. Idéals pour mijoter, gratiner et servir directement à table.",
    photo: "Sur fond blanc : quatre faitouts noirs de tailles différentes et un plat rectangulaire, tous avec couvercle en verre, bouton et poignées effet bois.",
    details: [["Vente", "À l'unité ou en ensemble"], ["Feux", "Tous feux, dont induction ; four jusqu'à 180 °C"], ["Entretien", "Lavage à la main conseillé"]]
  },
  "table-beige": {
    category: "Inspiration",
    name: "Dîner tout en douceur",
    price: "Assiettes dès 18 TND · Verres dès 9 TND",
    presentation: "Une table claire et apaisante pour les repas en famille.",
    description: "Des assiettes et bols crème aux formes organiques, associés à des verres simples et des dessous de verre en bois. Toutes les pièces sont disponibles à l'unité.",
    photo: "Une table ronde couverte d'une nappe en lin gris clair, dressée d'assiettes et de bols crème aux bords irréguliers, de verres sur dessous de verre en bois, avec un présentoir en bois et des carafes au centre.",
    details: [["Pièces utilisées", "Assiettes et bols Naturel, verres, dessous de verre"], ["Pour", "6 à 8 personnes"]]
  },
  "service-bleu": {
    category: "Inspiration",
    name: "Bleu et crème, motif végétal",
    price: "Service 6 personnes · 310 TND",
    presentation: "Un service frais et champêtre, aux bleus doux et aux motifs de branches.",
    description: "Assiettes, bols et mugs bicolores bleu et crème, décorés de branches et de feuilles. Les mugs striés et les coupelles assorties complètent la collection.",
    photo: "Un ensemble de vaisselle bleue et crème : grandes assiettes à motif de branche, bols, mugs striés, petites coupelles à motif de feuilles et une cuillère, sur fond bleu clair.",
    details: [["Matière", "Grès émaillé"], ["Contenu", "6 assiettes plates, 6 bols, 6 mugs"], ["Entretien", "Lave-vaisselle et micro-ondes"]]
  },
  "buffet-reception": {
    category: "Inspiration",
    name: "Buffet de réception",
    price: "Sur devis",
    presentation: "Tout pour présenter un buffet de mariage, de fête ou d'hôtel.",
    description: "Plats de service, ramequins, saucières et plateaux en bois : nous composons avec vous l'ensemble adapté au nombre d'invités, à l'achat ou en commande professionnelle.",
    photo: "Une longue table en bois avec un chemin de table noir, couverte de plats, ramequins, bols et saucières blancs, de plateaux en bois et d'assiettes dressées de chaque côté.",
    details: [["Pour", "Mariages, réceptions, hôtels et restaurants"], ["Service", "Devis selon le nombre d'invités"]]
  }
};

const productDialog = document.getElementById("product-dialog");
let currentProduct = null;

function openProduct(id, trigger) {
  const product = PRODUCTS[id];
  if (!product) return;
  currentProduct = product;
  const image = trigger.querySelector("img");
  const dialogImage = document.getElementById("product-image");
  dialogImage.src = image.currentSrc || image.src;
  dialogImage.alt = image.alt;
  document.getElementById("product-category").textContent = product.category;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = product.price;
  document.getElementById("product-presentation").textContent = product.presentation;
  document.getElementById("product-description").textContent = product.description;
  document.getElementById("product-photo").textContent = product.photo;
  const details = document.getElementById("product-details");
  details.replaceChildren();
  for (const [label, value] of product.details) {
    const term = document.createElement("dt");
    const definition = document.createElement("dd");
    term.textContent = label;
    definition.textContent = value;
    details.append(term, definition);
  }
  productDialog.showModal();
  productDialog.querySelector(".dialog-body").scrollTop = 0;
  productDialog.querySelector(".dialog-inner").scrollTop = 0;
}

document.querySelectorAll(".product-media").forEach((trigger) => {
  trigger.addEventListener("click", () => openProduct(trigger.dataset.product, trigger));
});

document.getElementById("dialog-close").addEventListener("click", () => productDialog.close());
document.getElementById("product-back").addEventListener("click", () => productDialog.close());

// Clic sur le fond assombri : ferme la fiche
productDialog.addEventListener("click", (event) => {
  if (event.target === productDialog) productDialog.close();
});

document.getElementById("product-request").addEventListener("click", () => {
  const form = document.getElementById("contact-form");
  form.elements.sujet.value = currentProduct.category === "Inspiration" && currentProduct.price === "Sur devis" ? "Devis professionnel" : "Commande";
  form.elements.message.value = `Bonjour, je souhaite des informations sur : ${currentProduct.name} (${currentProduct.price}).`;
  productDialog.close();
  document.getElementById("contact").scrollIntoView();
  form.elements.nom.focus({ preventScroll: true });
});

// Menu mobile
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.querySelector(".sr-only").textContent = open ? "Fermer le menu" : "Ouvrir le menu";
});

menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// Section FAQ
const faqList = document.getElementById("faq-list");
for (const item of FAQ) {
  const details = document.createElement("details");
  const summary = document.createElement("summary");
  const answer = document.createElement("p");
  summary.textContent = item.question;
  answer.textContent = item.answer;
  details.append(summary, answer);
  faqList.append(details);
}

// Assistant FAQ
const assistantToggle = document.getElementById("assistant-toggle");
const assistantPanel = document.getElementById("assistant-panel");
const assistantClose = document.getElementById("assistant-close");
const assistantMessages = document.getElementById("assistant-messages");
const assistantSuggestions = document.getElementById("assistant-suggestions");
const assistantForm = document.getElementById("assistant-form");
const assistantInput = document.getElementById("assistant-input");
let assistantStarted = false;

function addMessage(text, from, withContactLink = false) {
  const bubble = document.createElement("div");
  bubble.className = `msg msg-${from}`;
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  bubble.append(paragraph);
  if (withContactLink) {
    const link = document.createElement("a");
    link.href = "#contact";
    link.textContent = "Aller au formulaire de contact";
    link.addEventListener("click", () => setAssistantOpen(false));
    const linkLine = document.createElement("p");
    linkLine.append(link);
    bubble.append(linkLine);
  }
  assistantMessages.append(bubble);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function reply(question) {
  assistantSuggestions.hidden = true;
  addMessage(question, "user");
  const normalized = normalize(question).trim();
  if (/^(bonjour|salut|bonsoir|salam|hello|aslema)\b/.test(normalized) && normalized.split(/\s+/).length <= 3) {
    addMessage("Bonjour ! Posez-moi votre question sur les collections, la livraison ou la liste de mariage.", "bot");
    return;
  }
  if (/^(merci|super|parfait|ok)\b/.test(normalized)) {
    addMessage("Avec plaisir ! Une autre question ?", "bot");
    return;
  }
  const match = findAnswer(question);
  if (match) {
    addMessage(match.answer, "bot");
  } else {
    addMessage("Je n'ai pas trouvé de réponse à cette question. L'équipe de la boutique peut vous répondre directement :", "bot", true);
  }
}

function setAssistantOpen(open) {
  assistantPanel.hidden = !open;
  assistantToggle.setAttribute("aria-expanded", String(open));
  if (open) {
    if (!assistantStarted) {
      addMessage("Bonjour ! Je réponds aux questions fréquentes sur la boutique. Que souhaitez-vous savoir ?", "bot");
      for (const suggestion of SUGGESTIONS) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = suggestion;
        button.addEventListener("click", () => reply(suggestion));
        assistantSuggestions.append(button);
      }
      assistantStarted = true;
    }
    assistantInput.focus();
  } else {
    assistantToggle.focus();
  }
}

assistantToggle.addEventListener("click", () => setAssistantOpen(assistantPanel.hidden));
assistantClose.addEventListener("click", () => setAssistantOpen(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !assistantPanel.hidden) setAssistantOpen(false);
});

assistantForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = assistantInput.value.trim();
  if (!question) return;
  assistantInput.value = "";
  reply(question);
});

// Formulaire de contact (pas encore relié à une messagerie : rien n'est envoyé)
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

const rules = {
  nom: (value) => value.trim().length >= 2 || "Indiquez votre nom.",
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Indiquez une adresse e-mail valide.",
  message: (value) => value.trim().length >= 10 || "Votre message doit faire au moins 10 caractères."
};

function validateField(name) {
  const field = contactForm.elements[name];
  const result = rules[name](field.value);
  const error = document.getElementById(`${name}-error`);
  const valid = result === true;
  error.textContent = valid ? "" : result;
  field.setAttribute("aria-invalid", String(!valid));
  if (valid) field.removeAttribute("aria-describedby");
  else field.setAttribute("aria-describedby", error.id);
  return valid;
}

for (const name of Object.keys(rules)) {
  contactForm.elements[name].addEventListener("blur", () => validateField(name));
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formSuccess.hidden = true;
  const results = Object.keys(rules).map(validateField);
  if (results.includes(false)) {
    const firstInvalid = Object.keys(rules)[results.indexOf(false)];
    contactForm.elements[firstInvalid].focus();
    return;
  }
  const name = contactForm.elements.nom.value.trim();
  formSuccess.textContent = `Merci ${name} ! Ce formulaire n'est pas encore relié à une messagerie : votre message n'a pas été transmis.`;
  formSuccess.hidden = false;
  contactForm.reset();
});
