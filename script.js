
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");
const languageSwitch = document.querySelector(".language-switch");
const languageButtons = document.querySelectorAll(".language-switch [data-lang]");
const themeToggle = document.querySelector(".theme-toggle");

let currentLanguage = "en";
const originalTexts = new WeakMap();
// English originals of attributes listed in data-i18n-attr, per element.
const originalAttributes = new WeakMap();

const translations = {
    es: {
        // Head, attributes and controls
        "Carles Oliva | Maritime Professional": "Carles Oliva | Profesional marítimo",
        "Professional portfolio and CV of Carles Oliva.": "Portafolio profesional y CV de Carles Oliva.",
        "Carles Oliva - Maritime Professional": "Carles Oliva - Profesional marítimo",
        "Skip to content": "Saltar al contenido",
        "Menu": "Menú",
        "Open navigation menu": "Abrir menú de navegación",
        "Close navigation menu": "Cerrar menú de navegación",
        "Language": "Idioma",
        "Dark theme": "Tema oscuro",
        "(opens in a new tab)": "(se abre en una pestaña nueva)",

        // Navigation
        "Profile": "Perfil",
        "Qualifications": "Titulaciones",
        "Experience": "Experiencia",
        "Gallery": "Galería",
        "CV": "CV",
        "Contact": "Contacto",

        // Hero
        "Junior Deckhand": "Marinero de cubierta júnior",
        "Maritime professional with STCW training and lifesaving experience, ready to join a yacht crew.": "Profesional marítimo con formación STCW y experiencia en salvamento, preparado para formar parte de la tripulación de un yate.",
        "Certified": "Titulado",
        "STCW Basic Training, RFPNW, RFPEW": "Formación básica STCW, RFPNW, RFPEW",
        "Based in": "Con base en",
        "Available for": "Disponible para",
        "Yacht crew and maritime positions": "Tripulación de yates y puestos marítimos",
        "Download CV": "Descargar CV",
        "Contact Me": "Contactar conmigo",

        // Profile
        "What I bring on board": "Lo que aporto a bordo",
        "Based in Barcelona, I combine maritime training with lifesaving and customer-facing experience. Lifeguard work has taught me to stay calm under pressure, act quickly and work as part of a team. I am looking for a junior deckhand position where I can keep developing practical seamanship.": "Afincado en Barcelona, combino formación marítima con experiencia en salvamento y atención al público. El trabajo de socorrista me ha enseñado a mantener la calma bajo presión, actuar con rapidez y trabajar en equipo. Busco un puesto de marinero de cubierta júnior donde seguir desarrollando mis habilidades marineras prácticas.",
        "Safety and emergency response": "Seguridad y respuesta ante emergencias",
        "Lifeguard on a demanding coastline: prevention, vigilance and composure under pressure.": "Socorrista en una costa exigente: prevención, vigilancia y calma bajo presión.",
        "Deck operations": "Operaciones de cubierta",
        "Trained in navigational watchkeeping, seamanship fundamentals and on-board safety procedures.": "Formación en guardia de navegación, fundamentos de marinería y procedimientos de seguridad a bordo.",
        "Seamanship": "Marinería",
        "Merchant Navy watchkeeping certificates, a recreational skipper licence and ongoing professional training.": "Certificados de guardia de la Marina Mercante, titulación de Patrón de Embarcaciones de Recreo y formación profesional continua.",
        "Tenders and water activities": "Embarcaciones auxiliares y actividades acuáticas",
        "Jet ski and RWC operator and instructor, open water diver, with a strong understanding of aquatic safety.": "Operador e instructor de moto acuática (RWC), buceador Open Water y sólido conocimiento de la seguridad acuática.",
        "Practical and adaptable": "Práctico y adaptable",
        "Comfortable with physical work, learning and following procedures, and adapting quickly to operational needs.": "Cómodo con el trabajo físico, capaz de aprender y seguir procedimientos y de adaptarme rápido a las necesidades operativas.",
        "Crew and guest service": "Servicio a tripulación e invitados",
        "Experience as a professional tour guide, working in teams and with an international clientele.": "Experiencia como guía turístico profesional, trabajando en equipo y con una clientela internacional.",
        "Lifeguard: vigilance and composure under pressure.": "Socorrista: vigilancia y calma bajo presión.",
        "Watchkeeping, seamanship and on-board safety training.": "Formación en guardia, marinería y seguridad a bordo.",
        "STCW deck and engine rating certificates and recreational skipper licence (PER).": "Certificados STCW de Marinero de puente y Marinero de máquinas, y titulación de patrón de recreo (PER).",
        "Jet ski instructor and open water diver.": "Instructor de moto acuática y buceador Open Water.",
        "Physical work, procedures and quick adaptation.": "Trabajo físico, procedimientos y adaptación rápida.",
        "Tour guide with an international clientele.": "Guía turístico con una clientela internacional.",

        // Qualifications
        "Certified in navigational watchkeeping, engineering watchkeeping, basic safety and medical first aid.": "Titulado en guardia de navegación, guardia de máquinas, seguridad básica y primeros auxilios médicos.",
        "STCW certificates": "Certificados STCW",
        "Rating Forming Part of a Navigational Watch": "Marinero de puente de la Marina Mercante",
        "Rating Forming Part of an Engineering Watch": "Marinero de máquinas de la Marina Mercante",
        "Basic Safety Training": "Formación básica en seguridad marítima",
        "STCW Basic Training": "Formación básica STCW",
        "Initial Specific Medical Training": "Formación sanitaria específica inicial",
        "Medical Training": "Formación sanitaria",
        "First aid and medical assistance on board": "Primeros auxilios y asistencia médica a bordo",
        "Issued by Instituto Social de la Marina (ISM)": "Expedidos por el Instituto Social de la Marina (ISM)",
        "In progress": "En curso",
        "Passenger Ship Training": "Formación básica en buques de pasaje",
        "Passenger safety, emergency procedures and crowd management": "Seguridad de los pasajeros, procedimientos de emergencia y gestión de multitudes",
        "Restricted Operator's Certificate — GMDSS": "Certificado de operador restringido — SMSSM",
        "Global Maritime Distress and Safety System": "Sistema Mundial de Socorro y Seguridad Marítima",
        "Port Operations Skipper": "Patrón portuario",
        "Additional qualifications": "Otras titulaciones",
        "Recreational Craft Skipper (PER)": "Patrón de embarcaciones de recreo (PER)",
        "Navigation and seamanship": "Navegación y marinería",
        "Jet Ski / RWC Operator & Instructor": "Operador e instructor de moto acuática / RWC",
        "Open Water Diver": "Open Water Diver (buceador de aguas abiertas)",
        "Recreational scuba diving": "Buceo recreativo",
        "Automated External Defibrillator (AED)": "Desfibrilador externo automatizado (DEA)",
        "Natural Waters Lifeguard": "Socorrista en espacios acuáticos naturales",
        "Supporting certificates and documentation are available upon request.": "Los certificados y la documentación acreditativa están disponibles previa solicitud.",

        // Experience
        "2026 – present": "2026 – actualidad",
        "Volunteer": "Voluntario",
        "Rescue Boat Crew": "Tripulante de embarcación de salvamento",
        "Spanish Red Cross · Salvamar-type rescue boat, approx. 10 m": "Cruz Roja Española · Embarcación de salvamento tipo Salvamar, aprox. 10 m",
        "Helming the rescue boat: practical boat handling and manoeuvring.": "Gobierno de la embarcación de salvamento: manejo práctico y maniobras.",
        "Towing assistance and real-world maritime assistance and rescue operations as part of the crew.": "Remolque de embarcaciones y operaciones reales de asistencia y salvamento marítimo, como parte de la tripulación.",
        "Drills and joint exercises with Salvamento Marítimo, Spain's maritime search and rescue service.": "Simulacros y ejercicios conjuntos con Salvamento Marítimo.",
        "Two seasons": "Dos temporadas",
        "Lifeguard": "Socorrista",
        "Castelldefels Beach": "Playa de Castelldefels",
        "Constant surveillance and prevention in a demanding coastal environment.": "Vigilancia constante y prevención en un entorno costero exigente.",
        "Emergency response as part of a coordinated team.": "Respuesta ante emergencias como parte de un equipo coordinado.",
        "Public safety in a high-responsibility role, working effectively under pressure.": "Seguridad pública en un puesto de alta responsabilidad, trabajando con eficacia bajo presión.",
        "Next step": "Próximo paso",
        "Joining a yacht crew to apply my maritime training and keep growing in the yachting industry.": "Incorporarme a la tripulación de un yate para aplicar mi formación marítima y seguir creciendo en el sector de los yates.",

        // CV and cover letter
        "CV and cover letter": "CV y carta de presentación",
        "Curriculum Vitae": "Currículum vitae",
        "My complete professional CV includes my maritime qualifications, professional experience, training and additional skills.": "Mi CV profesional completo incluye mis titulaciones marítimas, experiencia profesional, formación y competencias adicionales.",
        "Cover Letter": "Carta de presentación",
        "Dear Captain,": "Estimado capitán:",
        "I am seeking the opportunity to begin and develop my professional career within the yachting industry as a junior deckhand.": "Busco la oportunidad de iniciar y desarrollar mi carrera profesional en el sector de los yates como marinero de cubierta júnior.",
        "Read full cover letter": "Leer la carta de presentación completa",
        "Available in English, Spanish and Catalan.": "Disponibles en inglés, español y catalán.",

        // Contact and footer
        "Available for yacht crew opportunities and maritime positions": "Disponible para oportunidades en tripulaciones de yates y puestos marítimos",
        "Email": "Correo electrónico",
        "Send an email": "Enviar un correo",
        "Message on Telegram": "Escribir por Telegram",
        "View Instagram profile": "Ver perfil de Instagram",
        "Maritime Professional": "Profesional marítimo",

        // Media: reel, carousel and contact background (attributes and controls)
        "Video: life at sea": "Vídeo: vida en el mar",
        "Video: sailing, view from the bow": "Vídeo: navegando a vela, vista desde la proa",
        "Video: riding a jet ski along the coast": "Vídeo: navegando en moto de agua junto a la costa",
        "At work on the water": "Trabajando en el mar",
        "Carles Oliva at the helm of a Red Cross rescue boat": "Carles Oliva al timón de una embarcación de salvamento de Cruz Roja",
        "Carles Oliva on lifeguard duty, sitting on a beach patrol quad": "Carles Oliva de servicio como socorrista, sentado en un quad de vigilancia de playa",
        "Video: on board a Red Cross rescue boat off the coast": "Vídeo: a bordo de una embarcación de salvamento de Cruz Roja frente a la costa",
        "Pause video": "Pausar vídeo",
        "Play video": "Reproducir vídeo",
        "Previous": "Anterior",
        "Next": "Siguiente"
    },

    ca: {
        // Head, attributes and controls
        "Carles Oliva | Maritime Professional": "Carles Oliva | Professional marítim",
        "Professional portfolio and CV of Carles Oliva.": "Portafolis professional i CV de Carles Oliva.",
        "Carles Oliva - Maritime Professional": "Carles Oliva - Professional marítim",
        "Skip to content": "Saltar al contingut",
        "Menu": "Menú",
        "Open navigation menu": "Obrir menú de navegació",
        "Close navigation menu": "Tancar menú de navegació",
        "Language": "Idioma",
        "Dark theme": "Tema fosc",
        "(opens in a new tab)": "(s'obre en una pestanya nova)",

        // Navigation
        "Profile": "Perfil",
        "Qualifications": "Titulacions",
        "Experience": "Experiència",
        "Gallery": "Galeria",
        "CV": "CV",
        "Contact": "Contacte",

        // Hero
        "Junior Deckhand": "Mariner de coberta júnior",
        "Maritime professional with STCW training and lifesaving experience, ready to join a yacht crew.": "Professional marítim amb formació STCW i experiència en salvament, preparat per formar part de la tripulació d'un iot.",
        "Certified": "Titulat",
        "STCW Basic Training, RFPNW, RFPEW": "Formació bàsica STCW, RFPNW, RFPEW",
        "Based in": "Amb base a",
        "Available for": "Disponible per a",
        "Yacht crew and maritime positions": "Tripulació de iots i llocs marítims",
        "Download CV": "Descarregar CV",
        "Contact Me": "Contacta amb mi",

        // Profile
        "What I bring on board": "El que aporto a bord",
        "Based in Barcelona, I combine maritime training with lifesaving and customer-facing experience. Lifeguard work has taught me to stay calm under pressure, act quickly and work as part of a team. I am looking for a junior deckhand position where I can keep developing practical seamanship.": "Establert a Barcelona, combino formació marítima amb experiència en salvament i atenció al públic. La feina de socorrista m'ha ensenyat a mantenir la calma sota pressió, actuar amb rapidesa i treballar en equip. Busco un lloc de mariner de coberta júnior on continuar desenvolupant les meves habilitats pràctiques de marineria.",
        "Safety and emergency response": "Seguretat i resposta davant d'emergències",
        "Lifeguard on a demanding coastline: prevention, vigilance and composure under pressure.": "Socorrista en una costa exigent: prevenció, vigilància i calma sota pressió.",
        "Deck operations": "Operacions de coberta",
        "Trained in navigational watchkeeping, seamanship fundamentals and on-board safety procedures.": "Formació en guàrdia de navegació, fonaments de marineria i procediments de seguretat a bord.",
        "Seamanship": "Marineria",
        "Merchant Navy watchkeeping certificates, a recreational skipper licence and ongoing professional training.": "Certificats de guàrdia de la Marina Mercant, titulació de Patró d'Embarcacions d'Esbarjo i formació professional contínua.",
        "Tenders and water activities": "Embarcacions auxiliars i activitats aquàtiques",
        "Jet ski and RWC operator and instructor, open water diver, with a strong understanding of aquatic safety.": "Operador i instructor de moto aquàtica (RWC), submarinista Open Water i un coneixement sòlid de la seguretat aquàtica.",
        "Practical and adaptable": "Pràctic i adaptable",
        "Comfortable with physical work, learning and following procedures, and adapting quickly to operational needs.": "Còmode amb la feina física, capaç d'aprendre i seguir procediments i d'adaptar-me ràpidament a les necessitats operatives.",
        "Crew and guest service": "Servei a tripulació i convidats",
        "Experience as a professional tour guide, working in teams and with an international clientele.": "Experiència com a guia turístic professional, treballant en equip i amb una clientela internacional.",
        "Lifeguard: vigilance and composure under pressure.": "Socorrista: vigilància i calma sota pressió.",
        "Watchkeeping, seamanship and on-board safety training.": "Formació en guàrdia, marineria i seguretat a bord.",
        "STCW deck and engine rating certificates and recreational skipper licence (PER).": "Certificats STCW de Mariner de pont i Mariner de màquines, i titulació de patró d'esbarjo (PER).",
        "Jet ski instructor and open water diver.": "Instructor de moto aquàtica i submarinista Open Water.",
        "Physical work, procedures and quick adaptation.": "Feina física, procediments i adaptació ràpida.",
        "Tour guide with an international clientele.": "Guia turístic amb una clientela internacional.",

        // Qualifications
        "Certified in navigational watchkeeping, engineering watchkeeping, basic safety and medical first aid.": "Titulat en guàrdia de navegació, guàrdia de màquines, seguretat bàsica i primers auxilis mèdics.",
        "STCW certificates": "Certificats STCW",
        "Rating Forming Part of a Navigational Watch": "Mariner de pont de la Marina Mercant",
        "Rating Forming Part of an Engineering Watch": "Mariner de màquines de la Marina Mercant",
        "Basic Safety Training": "Formació bàsica en seguretat marítima",
        "STCW Basic Training": "Formació bàsica STCW",
        "Initial Specific Medical Training": "Formació sanitària específica inicial",
        "Medical Training": "Formació sanitària",
        "First aid and medical assistance on board": "Primers auxilis i assistència mèdica a bord",
        "Issued by Instituto Social de la Marina (ISM)": "Expedits per l'Instituto Social de la Marina (ISM)",
        "In progress": "En curs",
        "Passenger Ship Training": "Formació bàsica en vaixells de passatge",
        "Passenger safety, emergency procedures and crowd management": "Seguretat dels passatgers, procediments d'emergència i gestió de multituds",
        "Restricted Operator's Certificate — GMDSS": "Certificat d'operador restringit — SMSSM",
        "Global Maritime Distress and Safety System": "Sistema Mundial de Socors i Seguretat Marítima",
        "Port Operations Skipper": "Patró portuari",
        "Additional qualifications": "Altres titulacions",
        "Recreational Craft Skipper (PER)": "Patró d'embarcacions d'esbarjo (PER)",
        "Navigation and seamanship": "Navegació i marineria",
        "Jet Ski / RWC Operator & Instructor": "Operador i instructor de moto aquàtica / RWC",
        "Open Water Diver": "Open Water Diver (bussejador d'aigües obertes)",
        "Recreational scuba diving": "Busseig recreatiu",
        "Automated External Defibrillator (AED)": "Desfibril·lador extern automatitzat (DEA)",
        "Natural Waters Lifeguard": "Socorrista en espais aquàtics naturals",
        "Supporting certificates and documentation are available upon request.": "Els certificats i la documentació acreditativa estan disponibles a petició.",

        // Experience
        "2026 – present": "2026 – actualitat",
        "Volunteer": "Voluntari",
        "Rescue Boat Crew": "Tripulant d'embarcació de salvament",
        "Spanish Red Cross · Salvamar-type rescue boat, approx. 10 m": "Creu Roja · Embarcació de salvament tipus Salvamar, aprox. 10 m",
        "Helming the rescue boat: practical boat handling and manoeuvring.": "Govern de l'embarcació de salvament: maneig pràctic i maniobres.",
        "Towing assistance and real-world maritime assistance and rescue operations as part of the crew.": "Remolc d'embarcacions i operacions reals d'assistència i salvament marítim, com a part de la tripulació.",
        "Drills and joint exercises with Salvamento Marítimo, Spain's maritime search and rescue service.": "Simulacres i exercicis conjunts amb Salvamento Marítimo.",
        "Two seasons": "Dues temporades",
        "Lifeguard": "Socorrista",
        "Castelldefels Beach": "Platja de Castelldefels",
        "Constant surveillance and prevention in a demanding coastal environment.": "Vigilància constant i prevenció en un entorn costaner exigent.",
        "Emergency response as part of a coordinated team.": "Resposta davant d'emergències com a part d'un equip coordinat.",
        "Public safety in a high-responsibility role, working effectively under pressure.": "Seguretat pública en un lloc d'alta responsabilitat, treballant amb eficàcia sota pressió.",
        "Next step": "Proper pas",
        "Joining a yacht crew to apply my maritime training and keep growing in the yachting industry.": "Incorporar-me a la tripulació d'un iot per aplicar la meva formació marítima i continuar creixent en el sector dels iots.",

        // CV and cover letter
        "CV and cover letter": "CV i carta de presentació",
        "Curriculum Vitae": "Currículum vitae",
        "My complete professional CV includes my maritime qualifications, professional experience, training and additional skills.": "El meu CV professional complet inclou les meves titulacions marítimes, experiència professional, formació i competències addicionals.",
        "Cover Letter": "Carta de presentació",
        "Dear Captain,": "Benvolgut capità,",
        "I am seeking the opportunity to begin and develop my professional career within the yachting industry as a junior deckhand.": "Busco l'oportunitat d'iniciar i desenvolupar la meva carrera professional en el sector dels iots com a mariner de coberta júnior.",
        "Read full cover letter": "Llegir la carta de presentació completa",
        "Available in English, Spanish and Catalan.": "Disponibles en anglès, castellà i català.",

        // Contact and footer
        "Available for yacht crew opportunities and maritime positions": "Disponible per a oportunitats en tripulacions de iots i llocs de treball marítims",
        "Email": "Correu electrònic",
        "Send an email": "Enviar un correu",
        "Message on Telegram": "Escriure per Telegram",
        "View Instagram profile": "Veure el perfil d'Instagram",
        "Maritime Professional": "Professional marítim",

        // Media: reel, carousel and contact background (attributes and controls)
        "Video: life at sea": "Vídeo: vida al mar",
        "Video: sailing, view from the bow": "Vídeo: navegant a vela, vista des de la proa",
        "Video: riding a jet ski along the coast": "Vídeo: navegant amb moto d'aigua vora la costa",
        "At work on the water": "Treballant al mar",
        "Carles Oliva at the helm of a Red Cross rescue boat": "Carles Oliva al timó d'una embarcació de salvament de Creu Roja",
        "Carles Oliva on lifeguard duty, sitting on a beach patrol quad": "Carles Oliva de servei com a socorrista, assegut en un quad de vigilància de platja",
        "Video: on board a Red Cross rescue boat off the coast": "Vídeo: a bord d'una embarcació de salvament de Creu Roja davant la costa",
        "Pause video": "Pausa el vídeo",
        "Play video": "Reprodueix el vídeo",
        "Previous": "Anterior",
        "Next": "Següent"
    }
};

function normalizeText(value) {
    return value.replace(/\s+/g, " ").trim();
}

// Translate an English source string into the current language.
// Falls back to the English text when a key is missing.
function translate(text) {
    if (currentLanguage === "en") return text;

    const dictionary = translations[currentLanguage] || {};

    return dictionary[text] || text;
}

function applyLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;

    const dictionary = translations[language] || {};

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
    );

    let node;

    while ((node = walker.nextNode())) {
        const parent = node.parentElement;

        // Language names stay in their own language; icons have no text to translate.
        // The carousel counter ("1 / 3") is language-neutral and rewritten by script.
        if (!parent || parent.closest(".language-switch, .theme-toggle-icon, .showcase__counter, svg, script, style")) {
            continue;
        }

        if (!originalTexts.has(node)) {
            originalTexts.set(node, node.nodeValue);
        }

        const original = originalTexts.get(node);
        const key = normalizeText(original);
        const translated = language === "en" ? null : dictionary[key];

        if (translated) {
            const leading = original.match(/^\s*/)?.[0] || "";
            const trailing = original.match(/\s*$/)?.[0] || "";

            node.nodeValue = leading + translated + trailing;
        } else {
            // English, or no translation available: restore the English original.
            node.nodeValue = original;
        }
    }

    // Attributes are keyed by their English text in the same dictionaries.
    document.title = translate("Carles Oliva | Maritime Professional");

    const description = document.querySelector('meta[name="description"]');

    if (description) {
        description.setAttribute(
            "content",
            translate("Professional portfolio and CV of Carles Oliva.")
        );
    }

    const profileImage = document.querySelector(".hero__portrait img");

    if (profileImage) {
        profileImage.alt = translate("Carles Oliva - Maritime Professional");
    }

    if (languageSwitch) {
        languageSwitch.setAttribute("aria-label", translate("Language"));
    }

    languageButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.lang === language));
    });

    // Generic attribute translation: data-i18n-attr="aria-label" (or "alt", or a
    // space-separated list). The English value in the markup is kept as the key.
    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
        let originals = originalAttributes.get(element);

        if (!originals) {
            originals = {};
            originalAttributes.set(element, originals);
        }

        element.dataset.i18nAttr.split(/\s+/).filter(Boolean).forEach((name) => {
            if (!(name in originals)) {
                originals[name] = element.getAttribute(name);
            }

            if (originals[name] !== null) {
                element.setAttribute(name, translate(normalizeText(originals[name])));
            }
        });
    });

    updateMenuLabel();
    updateThemeLabel();
    updateMediaToggleLabels();

    try {
        localStorage.setItem("preferred-language", language);
    } catch (error) {
        // Language switching remains available without browser storage.
    }

    updateDocumentLinks(language);
}

// MOBILE NAVIGATION
function isMenuOpen() {
    return Boolean(navLinks && navLinks.classList.contains("active"));
}

function isMenuToggleVisible() {
    return Boolean(menuToggle && menuToggle.getClientRects().length > 0);
}

function updateMenuLabel() {
    if (!menuToggle) return;

    menuToggle.setAttribute(
        "aria-label",
        translate(isMenuOpen() ? "Close navigation menu" : "Open navigation menu")
    );
}

function getMenuFocusables() {
    if (!navLinks) return [];

    return Array.from(
        navLinks.querySelectorAll("a[href], button:not([disabled])")
    ).filter((element) => element.getClientRects().length > 0);
}

function setMenuOpen(open, options = {}) {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.toggle("active", open);
    document.body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    updateMenuLabel();

    // Content behind the open sheet is removed from focus and the accessibility tree.
    document.querySelectorAll("main, .site-footer").forEach((region) => {
        region.toggleAttribute("inert", open);
    });

    if (open) {
        const [firstItem] = getMenuFocusables();

        if (firstItem) {
            firstItem.focus();
        }
    } else if (options.returnFocus) {
        menuToggle.focus();
    }
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        setMenuOpen(!isMenuOpen());
    });

    // Esc closes the menu and returns focus to the toggle; Tab stays inside the open menu.
    document.addEventListener("keydown", (event) => {
        if (!isMenuOpen()) return;

        if (event.key === "Escape") {
            event.preventDefault();
            setMenuOpen(false, { returnFocus: true });
            return;
        }

        if (event.key !== "Tab" || !isMenuToggleVisible()) return;

        const focusables = [menuToggle, ...getMenuFocusables()];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;

        if (!focusables.includes(active)) {
            event.preventDefault();
            first.focus();
        } else if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
        }
    });

    // A click outside the menu and its toggle closes the menu.
    document.addEventListener("click", (event) => {
        if (!isMenuOpen()) return;

        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            setMenuOpen(false);
        }
    });

    // Crossing to the inline-nav layout (>= 64rem) with the sheet open resets the menu state.
    const desktopNavQuery = window.matchMedia("(min-width: 64rem)");
    const closeMenuOnDesktop = (event) => {
        if (event.matches && isMenuOpen()) {
            setMenuOpen(false);
        }
    };

    if (typeof desktopNavQuery.addEventListener === "function") {
        desktopNavQuery.addEventListener("change", closeMenuOnDesktop);
    } else if (typeof desktopNavQuery.addListener === "function") {
        desktopNavQuery.addListener(closeMenuOnDesktop);
    }
}

// CLOSE MOBILE MENU WHEN A NAVIGATION LINK IS CLICKED
navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (isMenuOpen()) {
            setMenuOpen(false);
        }
    });
});

// SELECT LANGUAGE (segmented control: applies immediately, nothing to close)
languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedLanguage = button.dataset.lang;

        if (["en", "es", "ca"].includes(selectedLanguage)) {
            applyLanguage(selectedLanguage);
        }
    });
});

// LIGHT / DARK THEME
// The accessible name stays "Dark theme" (its text is translated by applyLanguage);
// aria-pressed carries the state. Both SVG icons (moon/sun) are in the markup and
// CSS shows the right one from html.dark-theme, so no icon text is set here.
function updateThemeLabel() {
    if (!themeToggle) return;

    const isDark = document.body.classList.contains("dark-theme");

    themeToggle.setAttribute("aria-pressed", String(isDark));
}

function setTheme(isDark) {
    document.documentElement.classList.toggle("dark-theme", isDark);
    document.body.classList.toggle("dark-theme", isDark);
    updateThemeLabel();
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-theme");

        setTheme(isDark);

        try {
            localStorage.setItem("preferred-theme", isDark ? "dark" : "light");
        } catch (error) {
            // Theme switching remains available without browser storage.
        }
    });
}

// GALLERY: stays hidden (section and nav item) until it contains at least one item.
if (document.querySelector("#gallery .media-item")) {
    document.querySelectorAll("#gallery, .nav-gallery").forEach((element) => {
        element.hidden = false;
    });
}

// CAPABILITIES ACCORDION (mobile only, < 40rem; progressive enhancement)
// Each title's existing text node is MOVED (never cloned) into the toggle button and
// back, so originalTexts keeps tracking it and applyLanguage translates it in both modes.
const capabilityList = document.querySelector(".capabilities");

if (capabilityList) {
    const capabilityItems = Array.from(capabilityList.querySelectorAll(".capability"));
    const capabilityMobileQuery = window.matchMedia("(max-width: 39.99rem)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const siteHeader = document.querySelector(".site-header");
    const chevronMarkup =
        '<svg class="capability__chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" ' +
        'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ' +
        'aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6"/></svg>';

    capabilityList.classList.add("is-enhanced");

    const setCapabilityOpen = (item, open) => {
        item.classList.toggle("is-open", open);

        const toggle = item.querySelector(".capability__toggle");

        if (toggle) {
            toggle.setAttribute("aria-expanded", String(open));
        }
    };

    const makeCollapsible = () => {
        capabilityItems.forEach((item) => {
            const title = item.querySelector(".capability__title");
            const detail = item.querySelector(".capability__detail");

            if (!title || !detail || title.querySelector(".capability__toggle")) return;

            const toggle = document.createElement("button");
            toggle.type = "button";
            toggle.className = "capability__toggle";
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-controls", detail.id);

            const label = document.createElement("span");
            label.className = "capability__label";

            while (title.firstChild) {
                label.appendChild(title.firstChild);
            }

            toggle.appendChild(label);
            toggle.insertAdjacentHTML("beforeend", chevronMarkup);
            title.appendChild(toggle);
            item.classList.remove("is-open");
        });

        capabilityList.classList.add("is-collapsible");
    };

    const makeStatic = () => {
        capabilityItems.forEach((item) => {
            const title = item.querySelector(".capability__title");
            const toggle = title && title.querySelector(".capability__toggle");

            if (toggle) {
                const label = toggle.querySelector(".capability__label");

                while (label && label.firstChild) {
                    title.insertBefore(label.firstChild, toggle);
                }

                toggle.remove();
            }

            item.classList.remove("is-open");
        });

        capabilityList.classList.remove("is-collapsible");
    };

    const syncCapabilityMode = () => {
        if (capabilityMobileQuery.matches) {
            makeCollapsible();
        } else {
            makeStatic();
        }
    };

    capabilityList.addEventListener("click", (event) => {
        const toggle = event.target.closest(".capability__toggle");

        if (!toggle || !capabilityList.classList.contains("is-collapsible")) return;

        const item = toggle.closest(".capability");
        const willOpen = !item.classList.contains("is-open");

        capabilityItems.forEach((other) => {
            if (other !== item) setCapabilityOpen(other, false);
        });

        setCapabilityOpen(item, willOpen);

        if (!willOpen) return;

        // Wait for a previously open item above to finish collapsing, then make sure
        // the opened item is not hidden under the sticky header.
        const reduced = reducedMotionQuery.matches;

        window.setTimeout(() => {
            const headerBottom = siteHeader ? siteHeader.getBoundingClientRect().bottom : 0;

            if (item.classList.contains("is-open") && item.getBoundingClientRect().top < headerBottom) {
                item.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
            }
        }, reduced ? 0 : 280);
    });

    syncCapabilityMode();

    if (typeof capabilityMobileQuery.addEventListener === "function") {
        capabilityMobileQuery.addEventListener("change", syncCapabilityMode);
    } else if (typeof capabilityMobileQuery.addListener === "function") {
        capabilityMobileQuery.addListener(syncCapabilityMode);
    }

    // Desktop hover mode (>= 64rem with a fine hover pointer): the CSS reveals each
    // description on :hover / :focus-within, so make every item keyboard-focusable.
    const capabilityDesktopHoverQuery = window.matchMedia(
        "(min-width: 64rem) and (hover: hover) and (pointer: fine)"
    );

    const syncCapabilityDesktopHover = () => {
        capabilityItems.forEach((item) => {
            if (capabilityDesktopHoverQuery.matches) {
                item.setAttribute("tabindex", "0");
            } else {
                item.removeAttribute("tabindex");
            }
        });
    };

    syncCapabilityDesktopHover();

    if (typeof capabilityDesktopHoverQuery.addEventListener === "function") {
        capabilityDesktopHoverQuery.addEventListener("change", syncCapabilityDesktopHover);
    } else if (typeof capabilityDesktopHoverQuery.addListener === "function") {
        capabilityDesktopHoverQuery.addListener(syncCapabilityDesktopHover);
    }
}

/* ========================================
   MEDIA: REEL, CAROUSEL, CONTACT BACKGROUND
   All clips are silent. They only play while their section is on screen,
   never autoplay under prefers-reduced-motion, and can always be paused.
======================================== */

const mediaReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

// Pause / play buttons: data-state drives the icon (CSS) and the translated label.
function setMediaToggleState(button, playing) {
    if (!button) return;

    button.dataset.state = playing ? "playing" : "paused";
    button.setAttribute("aria-label", translate(playing ? "Pause video" : "Play video"));
}

// Called by applyLanguage() so the dynamic labels follow the language.
function updateMediaToggleLabels() {
    document.querySelectorAll(".media-toggle").forEach((button) => {
        setMediaToggleState(button, button.dataset.state === "playing");
    });
}

// play() returns a promise that rejects when autoplay is blocked.
function playVideo(video, onRejected) {
    const rejected = () => {
        if (typeof onRejected === "function") onRejected();
    };

    try {
        const result = video.play();

        if (result && typeof result.catch === "function") {
            result.catch(rejected);
        }
    } catch (error) {
        rejected();
    }
}

// Reports whether `element` is on screen: at least `ratio` of it is visible, or
// it fills half the viewport (for sections taller than the screen).
function observeVisibility(element, ratio, callback) {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const visible = entry.isIntersecting && (
                entry.intersectionRatio >= ratio ||
                entry.intersectionRect.height >= window.innerHeight * 0.5
            );

            callback(visible);
        });
    }, { threshold: [0, ratio / 2, ratio, 0.6, 0.9] });

    observer.observe(element);
}

// REEL: two looping clips side by side, played and paused together by one button.
const reel = document.querySelector(".reel");

if (reel) {
    const reelVideos = Array.from(reel.querySelectorAll(".reel__video"));
    const reelToggle = reel.querySelector(".reel__toggle");

    if (reelVideos.length > 0) {
        let reelInView = false;
        // A user pause persists; reduced motion starts in the paused state.
        let reelUserPaused = mediaReducedMotionQuery.matches;

        const isReelPlaying = () => reelVideos.some((video) => !video.paused);

        const refreshReelToggle = () => {
            setMediaToggleState(reelToggle, isReelPlaying());
        };

        const playReel = () => {
            reelVideos.forEach((video) => {
                if (video.paused) playVideo(video, refreshReelToggle);
            });
        };

        const pauseReel = () => {
            reelVideos.forEach((video) => {
                if (!video.paused) video.pause();
            });
        };

        const syncReel = () => {
            if (reelInView && !reelUserPaused) {
                playReel();
            } else {
                pauseReel();
            }
        };

        reelVideos.forEach((video) => {
            video.addEventListener("play", refreshReelToggle);
            video.addEventListener("pause", refreshReelToggle);
        });

        if (reelToggle) {
            reelToggle.hidden = false;

            reelToggle.addEventListener("click", () => {
                if (isReelPlaying()) {
                    reelUserPaused = true;
                    pauseReel();
                } else {
                    reelUserPaused = false;
                    playReel();
                }
            });
        }

        observeVisibility(reel, 0.4, (visible) => {
            reelInView = visible;
            syncReel();
        });
    }
}

// SHOWCASE: photo - video - photo. From 40rem it is a static triptych; below
// 40rem a scroll-snap carousel with Previous / Next and a counter.
const showcase = document.querySelector(".showcase");

if (showcase) {
    const showcaseTrack = showcase.querySelector(".showcase__track");
    const showcaseSlides = Array.from(showcase.querySelectorAll(".showcase__slide"));
    const showcaseControls = showcase.querySelector(".showcase__controls");
    const showcasePrev = showcase.querySelector(".showcase__button--prev");
    const showcaseNext = showcase.querySelector(".showcase__button--next");
    const showcaseCounter = showcase.querySelector(".showcase__counter");
    const showcaseVideo = showcase.querySelector(".showcase__video");
    const showcaseToggle = showcase.querySelector(".showcase__toggle");

    if (showcaseTrack && showcaseSlides.length > 0) {
        const lastIndex = showcaseSlides.length - 1;
        const middleIndex = Math.floor(lastIndex / 2);
        const videoIndex = showcaseSlides.findIndex(
            (slide) => showcaseVideo && slide.contains(showcaseVideo)
        );
        const showcaseCarouselQuery = window.matchMedia("(max-width: 39.99rem)");

        let showcaseIndex = middleIndex;
        let showcaseTarget = null;      // slide a Previous / Next scroll is heading to
        let showcaseInView = false;
        // A user pause persists; reduced motion starts in the paused state.
        let showcaseUserPaused = mediaReducedMotionQuery.matches;
        let showcaseFrame = 0;

        const isCarousel = () => showcaseCarouselQuery.matches;

        const refreshShowcaseToggle = () => {
            if (showcaseVideo) setMediaToggleState(showcaseToggle, !showcaseVideo.paused);
        };

        // Triptych: plays while the section is on screen. Carousel: also needs the
        // video slide to be the centred one. Otherwise it is paused.
        const syncShowcaseVideo = () => {
            if (!showcaseVideo) return;

            const onStage = showcaseInView && (!isCarousel() || showcaseIndex === videoIndex);

            if (onStage && !showcaseUserPaused) {
                if (showcaseVideo.paused) playVideo(showcaseVideo, refreshShowcaseToggle);
            } else if (!showcaseVideo.paused) {
                showcaseVideo.pause();
            }
        };

        const slideScrollLeft = (index) => {
            const slide = showcaseSlides[index];

            return slide.offsetLeft - (showcaseTrack.clientWidth - slide.offsetWidth) / 2;
        };

        const setShowcaseCounter = () => {
            if (!showcaseCounter) return;

            const text = (showcaseIndex + 1) + " / " + showcaseSlides.length;

            // Only touch the live region when the text really changes.
            if (showcaseCounter.textContent.trim() !== text) {
                showcaseCounter.textContent = text;
            }
        };

        const setShowcaseButtons = () => {
            const settings = [
                [showcasePrev, showcaseIndex === 0, showcaseNext],
                [showcaseNext, showcaseIndex === lastIndex, showcasePrev]
            ];

            settings.forEach(([button, disable, other]) => {
                if (!button) return;

                // A button that is about to be disabled hands its focus to the other one.
                if (disable && document.activeElement === button && other) {
                    other.disabled = false;
                    other.focus();
                }

                button.disabled = disable;
            });
        };

        const updateShowcase = () => {
            showcaseFrame = 0;

            // Static triptych: nothing scrolls, there is no active slide to track.
            if (!isCarousel()) {
                syncShowcaseVideo();
                return;
            }

            const center = showcaseTrack.scrollLeft + showcaseTrack.clientWidth / 2;
            let closest = 0;
            let smallest = Infinity;

            showcaseSlides.forEach((slide, index) => {
                const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);

                if (distance < smallest) {
                    smallest = distance;
                    closest = index;
                }
            });

            if (closest === showcaseTarget) {
                showcaseTarget = null;
            }

            showcaseIndex = closest;

            setShowcaseCounter();
            setShowcaseButtons();
            syncShowcaseVideo();
        };

        // Applies the layout mode on load and whenever the 40rem breakpoint is crossed.
        const applyShowcaseMode = () => {
            showcaseTarget = null;
            showcaseIndex = middleIndex;

            if (isCarousel()) {
                showcase.setAttribute("aria-roledescription", "carousel");
                showcaseTrack.setAttribute("tabindex", "0");

                // Open on the middle slide: set the offset directly and instantly
                // (no smooth scroll, no scrollIntoView, so the page never moves).
                showcaseTrack.style.scrollBehavior = "auto";
                showcaseTrack.scrollLeft = slideScrollLeft(middleIndex);
                showcaseTrack.style.scrollBehavior = "";
            } else {
                // Triptych: not a scroll container, so no tab stop and no offset.
                showcase.removeAttribute("aria-roledescription");
                showcaseTrack.removeAttribute("tabindex");
                showcaseTrack.scrollLeft = 0;
            }

            updateShowcase();
        };

        const requestShowcaseUpdate = () => {
            if (showcaseFrame) return;

            showcaseFrame = window.requestAnimationFrame(updateShowcase);
        };

        const goToSlide = (index) => {
            if (!isCarousel()) return;

            const target = Math.max(0, Math.min(lastIndex, index));
            const left = slideScrollLeft(target);

            showcaseTarget = target;

            try {
                showcaseTrack.scrollTo({
                    left,
                    behavior: mediaReducedMotionQuery.matches ? "auto" : "smooth"
                });
            } catch (error) {
                showcaseTrack.scrollLeft = left;
            }
        };

        // Repeated presses during a smooth scroll continue from the slide being scrolled to.
        const stepShowcase = (direction) => {
            const from = showcaseTarget === null ? showcaseIndex : showcaseTarget;

            goToSlide(from + direction);
        };

        if (showcasePrev) {
            showcasePrev.addEventListener("click", () => stepShowcase(-1));
        }

        if (showcaseNext) {
            showcaseNext.addEventListener("click", () => stepShowcase(1));
        }

        if (showcaseControls && showcasePrev && showcaseNext) {
            showcaseControls.hidden = false;
        }

        showcaseTrack.addEventListener("scroll", requestShowcaseUpdate, { passive: true });
        window.addEventListener("resize", requestShowcaseUpdate);

        // A direct gesture on the track cancels any pending Previous / Next target.
        ["pointerdown", "touchstart", "wheel"].forEach((type) => {
            showcaseTrack.addEventListener(type, () => {
                showcaseTarget = null;
            }, { passive: true });
        });

        // Arrow keys move one slide when the track itself has focus (carousel mode only).
        showcaseTrack.addEventListener("keydown", (event) => {
            if (event.target !== showcaseTrack || !isCarousel()) return;

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                stepShowcase(-1);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                stepShowcase(1);
            }
        });

        if (showcaseVideo) {
            showcaseVideo.addEventListener("play", refreshShowcaseToggle);
            showcaseVideo.addEventListener("pause", refreshShowcaseToggle);

            if (showcaseToggle) {
                showcaseToggle.hidden = false;

                showcaseToggle.addEventListener("click", () => {
                    if (showcaseVideo.paused) {
                        showcaseUserPaused = false;
                        playVideo(showcaseVideo, refreshShowcaseToggle);
                    } else {
                        showcaseUserPaused = true;
                        showcaseVideo.pause();
                    }
                });
            }
        }

        observeVisibility(showcase, 0.25, (visible) => {
            showcaseInView = visible;
            syncShowcaseVideo();
        });

        if (typeof showcaseCarouselQuery.addEventListener === "function") {
            showcaseCarouselQuery.addEventListener("change", applyShowcaseMode);
        } else if (typeof showcaseCarouselQuery.addListener === "function") {
            showcaseCarouselQuery.addListener(applyShowcaseMode);
        }

        applyShowcaseMode();
    }
}

// CONTACT: decorative looping background video behind the contact rows.
const contactVideo = document.querySelector(".contact__bg");

if (contactVideo) {
    const contactSection = contactVideo.closest(".contact");
    const contactToggle = contactSection && contactSection.querySelector(".contact__toggle");

    let contactInView = false;
    let contactUserPaused = mediaReducedMotionQuery.matches;

    const refreshContactToggle = () => {
        setMediaToggleState(contactToggle, !contactVideo.paused);
    };

    const syncContactVideo = () => {
        if (contactInView && !contactUserPaused) {
            if (contactVideo.paused) playVideo(contactVideo, refreshContactToggle);
        } else if (!contactVideo.paused) {
            contactVideo.pause();
        }
    };

    contactVideo.addEventListener("play", refreshContactToggle);
    contactVideo.addEventListener("pause", refreshContactToggle);

    if (contactToggle) {
        contactToggle.hidden = false;

        contactToggle.addEventListener("click", () => {
            if (contactVideo.paused) {
                contactUserPaused = false;
                playVideo(contactVideo, refreshContactToggle);
            } else {
                contactUserPaused = true;
                contactVideo.pause();
            }
        });
    }

    if (contactSection) {
        observeVisibility(contactSection, 0.25, (visible) => {
            contactInView = visible;
            syncContactVideo();
        });
    }
}

// RESTORE SAVED PREFERENCES
try {
    const savedLanguage = localStorage.getItem("preferred-language");
    const savedTheme = localStorage.getItem("preferred-theme");

    setTheme(savedTheme === "dark");
    applyLanguage(["en", "es", "ca"].includes(savedLanguage) ? savedLanguage : "en");
} catch (error) {
    setTheme(false);
    applyLanguage("en");
}


/* ========================================
   LANGUAGE-SPECIFIC DOCUMENT DOWNLOADS
======================================== */

function updateDocumentLinks(language) {
    const documents = {
        en: {
            cv: "documents/CV.pdf",
            "cover-letter": "documents/Cover-Letter.pdf"
        },
        es: {
            cv: "documents/CV-ES.pdf",
            "cover-letter": "documents/Cover-Letter-ES.pdf"
        },
        ca: {
            cv: "documents/CV-CA.pdf",
            "cover-letter": "documents/Cover-Letter-CA.pdf"
        }
    };

    document.querySelectorAll("[data-document]").forEach(link => {
        const documentType = link.dataset.document;
        const file = documents[language]?.[documentType];

        if (file) {
            link.href = file;
        }
    });
}
