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

// Formulaire de contact (démonstration : rien n'est envoyé)
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
  formSuccess.textContent = `Merci ${name} ! Dans un vrai site, votre message serait maintenant transmis à la boutique.`;
  formSuccess.hidden = false;
  contactForm.reset();
});
