/* ================================================
   SCRIPT.JS - Portfolio Raphaël
   ================================================
   Table of Contents:
   1. Translations (i18n)
   2. Translation Functions
   3. DOM Ready - Main Logic
      - Language Toggle
      - Navigation
      - Music Player
      - Progress Slider
      - Contact Form
      - Project Modal
      - Passion Modal
      - Typewriter
   4. Helper Functions
   5. TypeWriter Class
   ================================================ */

// ================================================
// 1. TRANSLATIONS (i18n)
// ================================================
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.music": "Music",
    "nav.contact": "Contact",
    // Home
    "home.title": "Hey, I'm Raphaël",
    "home.description": "I'm a computer science student based in Paris, passionate about <strong>technology, Music</strong> and <strong>Motorsports</strong>",
    "home.cta": "View Projects",
    // About
    "about.title": "About Me",
    "about.journey.title": "My Journey",
    "about.journey.description": "I'm a computer science student based in Paris with a strong interest in development, networking, cybersecurity and data. <br>I enjoy understanding how systems work. Outside of tech, I'm passionate about cars, sports and new technologies.",
    "about.journey.degree": "Bachelor in Computer Engineering",
    "about.journey.school": "SUPINFO Paris • Network & Dev Engineering.",
    "about.skills.title": "Technical Skills",
    "about.passions.title": "Some Passions",
    "about.languages.title": "Languages",
    "about.languages.french": "French",
    "about.languages.english": "English",
    "about.languages.spanish": "Spanish",
    "about.languages.native": "Native",
    "about.languages.fluent": "Fluent",
    "about.languages.intermediate": "Intermediate",
    "about.cv.label": "Detailed Resume",
    "about.cv.button": "Download PDF",
    // Passions
    "passion.cars.name": "Cars",
    "passion.cars.title": "Cars / Motorsports",
    "passion.cars.description": "Passionate about motorsports and cars. I follow Formula 1, Endurance racing (24h of Le Mans), and Rally. The engineering and speed fascinate me.",
    "passion.music.name": "Music Prod",
    "passion.music.title": "Music Production",
    "passion.music.description": "Creating beats on Logic Pro is my creative outlet. I love experimenting with sounds, from hip-hop to house music.",
    "passion.sports.name": "Sports",
    "passion.sports.title": "Sports",
    "passion.sports.description": "Boxing keeps me disciplined and focused, while the gym helps me build strength. Both teach me perseverance and discipline.",
    "passion.travel.name": "Travel",
    "passion.travel.title": "Travel",
    "passion.travel.description": "Exploring new cultures across the world. From Lisbon to Punta Cana, traveling opens my mind and inspires creativity.",
    "passion.watches.name": "Watches",
    "passion.watches.title": "Watchmaking",
    "passion.watches.description": "Fascinated by horology. From Rolex to Audemars Piguet. I'm working on creating my own custom timepieces.",
    // Projects
    "projects.title": "Recent Projects",
    "project.grass.title": "Laying Grass Game",
    "project.grass.description": "High-performance game engine built in C++ with optimized inventory system and real-time resource tracking.",
    "project.grass.short": "High-performance game engine with optimized inventory system.",
    "project.seo.title": "SEO Website",
    "project.seo.description": "SEO-optimized website with keyword analysis, site audit, and Google referencing integration.",
    "project.seo.short": "SEO Website with keyword analysis and Google referencing.",
    "project.imdb.title": "Internet Movies DataBase",
    "project.imdb.description": "Movie discovery platform with PHP/SQL, real-time analytics and advanced filtering.",
    "project.imdb.short": "Movie discovery platform with real-time analytics.",
    "project.rail.title": "SupRailRoad App",
    "project.rail.description": "Modern transportation app design in Figma with intuitive UI and real-time booking.",
    "project.rail.short": "Modern transportation app design with intuitive UI.",
    // Music
    "music.title": "My Playlist",
    "music.description": "Music is a huge part of my life. This playlist reflects my vibe — a mix of hip-hop, rap, and chill beats that keep me focused while coding.",
    // Contact
    "contact.title": "Contact Me",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send"
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.about": "Profil",
    "nav.projects": "Projets",
    "nav.music": "Music",
    "nav.contact": "Contact",
    // Home
    "home.title": "Hey, je suis Raphaël",
    "home.description": "Je suis étudiant en informatique basé à Paris, passionné par la <strong>technologie, la Musique</strong> et le <strong>Motorsport</strong>",
    "home.cta": "Voir les Projets",
    // About
    "about.title": "À propos",
    "about.journey.title": "Mon Parcours",
    "about.journey.description": "Je suis étudiant en informatique basé à Paris avec un fort intérêt pour le développement, les réseaux, la cybersécurité et la data. <br>J'aime comprendre comment fonctionnent les systèmes. En dehors de la tech, je suis passionné par les voitures, le sport et les nouvelles technologies.",
    "about.journey.degree": "Bachelor en Ingénierie Informatique",
    "about.journey.school": "SUPINFO Paris • Réseaux & Développement.",
    "about.skills.title": "Compétences",
    "about.passions.title": "Passions",
    "about.languages.title": "Langues",
    "about.languages.french": "Français",
    "about.languages.english": "Anglais",
    "about.languages.spanish": "Espagnol",
    "about.languages.native": "Natif",
    "about.languages.fluent": "Courant",
    "about.languages.intermediate": "Intermédiaire",
    "about.cv.label": "CV Détaillé",
    "about.cv.button": "Télécharger",
    // Passions
    "passion.cars.name": "Voitures",
    "passion.cars.title": "Voitures / Motorsport",
    "passion.cars.description": "Passionné de sport automobile. Je suis la F1, l'Endurance (24h du Mans) et le Rallye. L'ingénierie et la vitesse me fascinent.",
    "passion.music.name": "Prod",
    "passion.music.title": "Production Musicale",
    "passion.music.description": "Créer des beats sur Logic Pro est mon exutoire créatif. J'aime expérimenter les sons, du hip-hop à la house.",
    "passion.sports.name": "Sports",
    "passion.sports.title": "Sports",
    "passion.sports.description": "La boxe me garde discipliné et concentré, la salle m'aide à développer ma force. Les deux m'enseignent la persévérance.",
    "passion.travel.name": "Voyage",
    "passion.travel.title": "Voyage",
    "passion.travel.description": "Explorer de nouvelles cultures. De Lisbonne à Punta Cana, voyager ouvre mon esprit et inspire ma créativité.",
    "passion.watches.name": "Montres",
    "passion.watches.title": "Horlogerie",
    "passion.watches.description": "Fasciné par l'horlogerie. De Rolex à Audemars Piguet. Je travaille sur la création de mes propres montres.",
    // Projects
    "projects.title": "Projets Récents",
    "project.grass.title": "Jeu Laying Grass",
    "project.grass.description": "Moteur de jeu haute performance en C++ avec système d'inventaire optimisé et suivi des ressources.",
    "project.grass.short": "Moteur de jeu haute performance avec système d'inventaire.",
    "project.seo.title": "Site Web SEO",
    "project.seo.description": "Site web optimisé SEO avec analyse de mots-clés, audit de site et référencement Google.",
    "project.seo.short": "Site web SEO avec analyse de mots-clés et référencement.",
    "project.imdb.title": "Base de Données Films",
    "project.imdb.description": "Plateforme de découverte de films en PHP/SQL avec analyses en temps réel et filtrage avancé.",
    "project.imdb.short": "Plateforme de films avec analyses en temps réel.",
    "project.rail.title": "App SupRailRoad",
    "project.rail.description": "Design d'application de transport sur Figma avec UI intuitive et réservation en temps réel.",
    "project.rail.short": "Design d'app transport avec UI intuitive.",
    // Music
    "music.title": "Ma Playlist",
    "music.description": "La musique fait partie de ma vie. Cette playlist reflète mon ambiance — un mélange de hip-hop, rap et beats chill qui me gardent concentré.",
    // Contact
    "contact.title": "Me Contacter",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Envoyer"
  }
};

// ================================================
// 2. TRANSLATION FUNCTIONS
// ================================================

// Get saved language or default to English
let currentLang = localStorage.getItem("lang") || "en";
if (!localStorage.getItem("lang")) localStorage.setItem("lang", "en");

// Apply translations to all elements with data-i18n
function applyTranslations(lang) {
  const t = translations[lang];
  
  // Text content
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.innerHTML = t[key];
  });
  
  // Placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) el.placeholder = t[key];
  });

  // Passions
  document.querySelectorAll(".passion-item").forEach(item => {
    const key = item.dataset.passion;
    if (!key) return;
    const nameEl = item.querySelector(".passion-name");
    if (nameEl && t[`passion.${key}.name`]) nameEl.textContent = t[`passion.${key}.name`];
    if (t[`passion.${key}.title`]) item.dataset.title = t[`passion.${key}.title`];
    if (t[`passion.${key}.description`]) item.dataset.description = t[`passion.${key}.description`];
  });

  // Projects
  document.querySelectorAll(".project-card").forEach(item => {
    const key = item.dataset.project;
    if (!key) return;
    const titleEl = item.querySelector("h3");
    const descEl = item.querySelector("p");
    if (titleEl && t[`project.${key}.title`]) titleEl.textContent = t[`project.${key}.title`];
    if (descEl && t[`project.${key}.short`]) descEl.textContent = t[`project.${key}.short`];
    if (t[`project.${key}.title`]) item.dataset.title = t[`project.${key}.title`];
    if (t[`project.${key}.description`]) item.dataset.description = t[`project.${key}.description`];
  });

  // Typewriter
  const txtElement = document.querySelector(".txt-type");
  if (txtElement) {
    const wordsAttr = lang === "fr" ? "data-words-fr" : "data-words-en";
    const words = txtElement.getAttribute(wordsAttr);
    if (words) {
      txtElement.setAttribute("data-words", words);
      if (window.currentTypeWriter) {
        window.currentTypeWriter.words = JSON.parse(words);
        window.currentTypeWriter.txt = "";
        window.currentTypeWriter.wordIndex = 0;
        window.currentTypeWriter.isDeleting = false;
      }
    }
  }

  // Update UI
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) langToggle.textContent = lang === "en" ? "FR" : "EN";
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
  currentLang = lang;
}

// ================================================
// 3. DOM READY - MAIN LOGIC
// ================================================
document.addEventListener("DOMContentLoaded", () => {
  
  // Elements
  const navItems = document.querySelectorAll(".nav-item");
  const glider = document.querySelector(".nav-glider");
  const sections = document.querySelectorAll(".tab-content");
  const pillNav = document.querySelector(".pill-nav");

  // Apply saved language
  applyTranslations(currentLang);

  // --- LANGUAGE TOGGLE ---
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      applyTranslations(currentLang === "en" ? "fr" : "en");
    });
  }

  // --- NAVIGATION ---
  function moveGlider(element) {
    if (!element || !glider || !pillNav) return;
    const padding = 8;
    glider.style.width = `${element.offsetWidth}px`;
    glider.style.transform = `translateX(${element.offsetLeft - padding}px)`;
    glider.style.opacity = "1";
  }

  function switchTab(targetId) {
    sections.forEach(s => s.classList.remove("active"));
    const target = document.getElementById(targetId);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Init glider
  setTimeout(() => moveGlider(document.querySelector(".nav-item.active")), 50);

  navItems.forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      navItems.forEach(n => n.classList.remove("active"));
      item.classList.add("active");
      moveGlider(item);
      switchTab(item.dataset.target);
    });
  });

  window.addEventListener("resize", () => moveGlider(document.querySelector(".nav-item.active")));

  // --- MUSIC PLAYER ---
  const musicCards = document.querySelectorAll(".music-card");
  const miniPlayer = document.getElementById("mini-player");
  const miniPlayerCollapsed = document.getElementById("mini-player-collapsed");
  const miniCoverCollapsed = document.getElementById("mini-cover-collapsed");
  const miniCover = document.getElementById("mini-cover");
  const miniTitle = document.getElementById("mini-title");
  const miniArtist = document.getElementById("mini-artist");
  const miniPlayBtn = document.getElementById("mini-play");
  const miniPrevBtn = document.getElementById("mini-prev");
  const miniNextBtn = document.getElementById("mini-next");
  const miniCloseBtn = document.getElementById("mini-close");
  const miniMinimizeBtn = document.getElementById("mini-minimize");

  let currentTrackIndex = -1;
  let isPlaying = false;
  let isMinimized = false;
  const allAudios = document.querySelectorAll(".music-card audio");

  // Track data
  const tracks = [
    { title: "Girls Want Girls", artist: "Drake feat. Lil Baby", cover: "assets/images/Cover/CLB.webp" },
    { title: "Dumbo", artist: "Travis Scott", cover: "assets/images/Cover/Jackboys.webp" },
    { title: "Joli", artist: "Zed", cover: "assets/images/Cover/Joli.webp" },
    { title: "Broski", artist: "Timar", cover: "assets/images/Cover/Broski.webp" }
  ];

  // Pause all except current
  function pauseAllExcept(exceptIndex) {
    allAudios.forEach((audio, i) => {
      if (i !== exceptIndex) {
        audio.pause();
        audio.currentTime = 0;
        const card = audio.closest(".music-card");
        if (card) {
          card.classList.remove("playing");
          const btn = card.querySelector(".play-btn");
          if (btn) btn.textContent = "▶";
        }
      }
    });
  }

  // Update play/pause icons
  function updateMiniPlayerIcon(playing) {
    const playIcon = miniPlayBtn.querySelector(".play-icon");
    const pauseIcon = miniPlayBtn.querySelector(".pause-icon");
    if (playIcon && pauseIcon) {
      playIcon.style.display = playing ? "none" : "block";
      pauseIcon.style.display = playing ? "block" : "none";
    }
  }

  // Play track
  function playTrack(index) {
    if (index < 0 || index >= allAudios.length) return;
    pauseAllExcept(index);
    currentTrackIndex = index;

    const audio = allAudios[index];
    const card = musicCards[index];
    const track = tracks[index];

    // Update mini player
    miniCover.src = track.cover;
    miniCoverCollapsed.src = track.cover;
    miniTitle.textContent = track.title;
    miniArtist.textContent = track.artist;

    // Show player
    if (isMinimized) {
      miniPlayerCollapsed.classList.remove("hidden", "paused");
    } else {
      miniPlayer.classList.remove("hidden");
    }

    audio.play();
    isPlaying = true;
    card.classList.add("playing");
    card.querySelector(".play-btn").textContent = "⏸";
    updateMiniPlayerIcon(true);
    miniPlayerCollapsed.classList.remove("paused");
  }

  // Pause current
  function pauseCurrentTrack() {
    if (currentTrackIndex < 0) return;
    const audio = allAudios[currentTrackIndex];
    const card = musicCards[currentTrackIndex];

    audio.pause();
    isPlaying = false;
    card.classList.remove("playing");
    card.querySelector(".play-btn").textContent = "▶";
    updateMiniPlayerIcon(false);
    miniPlayerCollapsed.classList.add("paused");
  }

  // Toggle play/pause
  function togglePlay() {
    if (currentTrackIndex < 0) { playTrack(0); return; }
    isPlaying ? pauseCurrentTrack() : playTrack(currentTrackIndex);
  }

  // Next/Prev
  function nextTrack() { playTrack((currentTrackIndex + 1) % allAudios.length); }
  function prevTrack() { playTrack(currentTrackIndex <= 0 ? allAudios.length - 1 : currentTrackIndex - 1); }

  // Close player
  function closeMiniPlayer() {
    pauseCurrentTrack();
    miniPlayer.classList.add("hidden");
    miniPlayerCollapsed.classList.add("hidden");
    isMinimized = false;
    currentTrackIndex = -1;
  }

  // Minimize/Expand
  function minimizePlayer() {
    miniPlayer.classList.add("hidden");
    miniPlayerCollapsed.classList.remove("hidden");
    if (!isPlaying) miniPlayerCollapsed.classList.add("paused");
    isMinimized = true;
  }

  function expandPlayer() {
    miniPlayerCollapsed.classList.add("hidden");
    miniPlayer.classList.remove("hidden");
    isMinimized = false;
  }

  // Music card events
  musicCards.forEach((card, i) => {
    const playBtn = card.querySelector(".play-btn");
    playBtn.addEventListener("click", e => {
      e.stopPropagation();
      currentTrackIndex === i && isPlaying ? pauseCurrentTrack() : playTrack(i);
    });
    card.addEventListener("click", () => {
      currentTrackIndex === i && isPlaying ? pauseCurrentTrack() : playTrack(i);
    });
  });

  // Mini player events
  miniPlayBtn.addEventListener("click", togglePlay);
  miniNextBtn.addEventListener("click", nextTrack);
  miniPrevBtn.addEventListener("click", prevTrack);
  miniCloseBtn.addEventListener("click", closeMiniPlayer);
  miniMinimizeBtn.addEventListener("click", minimizePlayer);
  miniPlayerCollapsed.addEventListener("click", expandPlayer);

  // --- PROGRESS SLIDER ---
  const progressSlider = document.getElementById("progress-slider");
  const currentTimeEl = document.getElementById("current-time");
  const durationTimeEl = document.getElementById("duration-time");

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  allAudios.forEach(audio => {
    audio.addEventListener("timeupdate", () => {
      if (audio === allAudios[currentTrackIndex] && !progressSlider.dataset.dragging) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressSlider.value = percent || 0;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationTimeEl.textContent = "-" + formatTime(audio.duration - audio.currentTime);
      }
    });

    audio.addEventListener("loadedmetadata", () => {
      if (audio === allAudios[currentTrackIndex]) {
        durationTimeEl.textContent = "-" + formatTime(audio.duration);
      }
    });

    audio.addEventListener("ended", nextTrack);
  });

  progressSlider.addEventListener("input", () => {
    progressSlider.dataset.dragging = "true";
    if (currentTrackIndex >= 0) {
      const time = (progressSlider.value / 100) * allAudios[currentTrackIndex].duration;
      currentTimeEl.textContent = formatTime(time);
    }
  });

  progressSlider.addEventListener("change", () => {
    if (currentTrackIndex >= 0) {
      allAudios[currentTrackIndex].currentTime = (progressSlider.value / 100) * allAudios[currentTrackIndex].duration;
    }
    delete progressSlider.dataset.dragging;
  });

  // --- CONTACT FORM ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async e => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Envoi...";
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message")
          })
        });
        alert(response.ok ? "Message envoyé !" : "Erreur lors de l'envoi.");
        if (response.ok) contactForm.reset();
      } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur est survenue.");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // --- PROJECT MODAL ---
  const projectCards = document.querySelectorAll(".project-card");
  const projectModal = document.getElementById("project-modal");
  const modalImage = document.getElementById("modal-image");
  const modalImage2 = document.getElementById("modal-image2");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalTags = document.getElementById("modal-tags");
  const modalLink = document.getElementById("modal-link");

  function openProjectModal(card) {
    const { title, description, tags, image, image2, link } = card.dataset;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalImage.src = image;
    modalImage2.src = image2 || "";
    modalImage2.style.display = image2 ? "block" : "none";
    modalTags.innerHTML = tags.split(",").map(t => `<span>${t.trim()}</span>`).join("");
    modalLink.href = link || "";
    modalLink.style.display = link ? "inline-flex" : "none";
    projectModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    projectModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  projectCards.forEach(card => card.addEventListener("click", () => openProjectModal(card)));
  projectModal.querySelector(".modal-overlay").addEventListener("click", closeProjectModal);
  projectModal.querySelector(".modal-close").addEventListener("click", closeProjectModal);

  // --- PASSION MODAL ---
  const passionModal = document.getElementById("passion-modal");
  const passionItems = document.querySelectorAll(".passion-item");
  const passionImage = document.getElementById("passion-image");
  const passionTitle = document.getElementById("passion-title");
  const passionDescription = document.getElementById("passion-description");

  function openPassionModal(item) {
    passionImage.src = item.dataset.image;
    passionTitle.textContent = item.dataset.title;
    passionDescription.textContent = item.dataset.description;
    passionModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closePassionModal() {
    passionModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  passionItems.forEach(item => item.addEventListener("click", () => openPassionModal(item)));
  passionModal.querySelector(".modal-overlay").addEventListener("click", closePassionModal);
  passionModal.querySelector(".modal-close").addEventListener("click", closePassionModal);

  // Close modals on Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (projectModal.classList.contains("active")) closeProjectModal();
      if (passionModal.classList.contains("active")) closePassionModal();
    }
  });

  // --- TYPEWRITER ---
  const txtElement = document.querySelector(".txt-type");
  if (txtElement) {
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    window.currentTypeWriter = new TypeWriter(txtElement, words, wait);
  }
});

// ================================================
// 4. HELPER FUNCTIONS
// ================================================

// Global function for hero button
window.switchTab = function(targetId) {
  const link = document.querySelector(`.nav-item[data-target="${targetId}"]`);
  if (link) link.click();
};

// ================================================
// 5. TYPEWRITER CLASS
// ================================================
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.isDeleting = false;
    this.type();
  }

  type() {
    const fullTxt = this.words[this.wordIndex % this.words.length];
    this.txt = this.isDeleting
      ? fullTxt.substring(0, this.txt.length - 1)
      : fullTxt.substring(0, this.txt.length + 1);

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}