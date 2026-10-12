
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");
const languageMenu = document.querySelector(".language-menu");
const languageToggle = document.querySelector(".language-toggle");
const languageButtons = document.querySelectorAll("[data-lang]");
const themeToggle = document.querySelector(".theme-toggle");

let currentLanguage = "en";
const originalTexts = new WeakMap();

const translations = {
    es: {
        "Open navigation menu": "Abrir menú de navegación",
        "Carles Oliva | Maritime Professional": "Carles Oliva | Profesional marítimo",
        "Professional portfolio and CV of Carles Oliva.": "Portafolio profesional y CV de Carles Oliva.",
        "About": "Sobre mí",
        "Why Me": "¿Por qué yo?",
        "Profile": "Perfil",
        "Experience": "Experiencia",
        "Qualifications": "Titulaciones",
        "Cover Letter": "Carta de presentación",
        "CV": "CV",
        "Contact": "Contacto",
        "Language": "Idioma",
        "YACHT CREW • MARITIME PROFESSIONAL": "TRIPULACIÓN DE YATES • PROFESIONAL MARÍTIMO",
        "Junior Deckhand": "Marinero de cubierta júnior",
        "Maritime professional with a strong passion for the sea, safety and professional development within the yachting industry.": "Profesional marítimo con una gran pasión por el mar, la seguridad y el desarrollo profesional en el sector de los yates.",
        "View My CV": "Ver mi CV",
        "Contact Me": "Contactar conmigo",
        "Carles Oliva - Maritime Professional": "Carles Oliva - Profesional marítimo",
        "PROFILE": "PERFIL",
        "About Me": "Sobre mí",
        "I am a maritime professional based in Barcelona, with a strong vocation for the sea and a clear goal of developing my career within the yachting industry.": "Soy un profesional marítimo afincado en Barcelona, con una gran vocación por el mar y el objetivo claro de desarrollar mi carrera en el sector de los yates.",
        "My professional background combines maritime experience, lifesaving responsibilities and customer-facing roles. Working as a lifeguard has strengthened my ability to remain calm under pressure, act quickly and work effectively as part of a team.": "Mi trayectoria profesional combina experiencia marítima, responsabilidades de salvamento y puestos de atención al público. Mi trabajo como socorrista ha reforzado mi capacidad para mantener la calma bajo presión, actuar con rapidez y trabajar eficazmente en equipo.",
        "I am particularly interested in junior deckhand positions, where I can contribute with a strong work ethic, adaptability and willingness to learn while continuing to develop my practical seamanship skills.": "Estoy especialmente interesado en puestos de marinero de cubierta júnior, en los que pueda aportar una sólida ética de trabajo, capacidad de adaptación y disposición para aprender mientras sigo desarrollando mis habilidades prácticas marineras.",
        "PROFESSIONAL PROFILE": "PERFIL PROFESIONAL",
        "Why Me?": "¿Por qué yo?",
        "Safety & Responsibility": "Seguridad y responsabilidad",
        "Strong safety awareness developed through maritime training and professional lifeguard experience in demanding coastal environments.": "Sólida conciencia de la seguridad desarrollada mediante formación marítima y experiencia profesional como socorrista en entornos costeros exigentes.",
        "Maritime Training": "Formación marítima",
        "STCW qualifications combined with ongoing maritime training and a clear commitment to developing a professional career at sea.": "Titulaciones STCW, formación marítima continua y un compromiso claro con el desarrollo de una carrera profesional en el mar.",
        "Adaptability": "Adaptabilidad",
        "Comfortable working in demanding environments, learning new procedures and adapting to operational requirements.": "Capacidad para trabajar en entornos exigentes, aprender nuevos procedimientos y adaptarme a los requisitos operativos.",
        "Teamwork & Service": "Trabajo en equipo y atención al público",
        "Experience working closely with teams and interacting with the public in safety-critical and customer-facing environments.": "Experiencia trabajando en estrecha colaboración con equipos y tratando con el público en entornos donde la seguridad y la atención al cliente son fundamentales.",
        "DECKHAND PROFILE": "PERFIL DE MARINERO DE CUBIERTA",
        "What I Bring On Board": "Qué puedo aportar a bordo",
        "A practical foundation built around safety, maritime training, adaptability and a strong willingness to learn and contribute as part of a professional crew.": "Una base práctica centrada en la seguridad, la formación marítima, la adaptabilidad y una gran disposición para aprender y contribuir como parte de una tripulación profesional.",
        "Safety & Emergency Response": "Seguridad y respuesta ante emergencias",
        "Professional lifeguard experience in a demanding coastal environment, with a strong focus on prevention, vigilance, emergency response and maintaining composure under pressure.": "Experiencia profesional como socorrista en un entorno costero exigente, con especial atención a la prevención, vigilancia, respuesta ante emergencias y capacidad para mantener la calma bajo presión.",
        "Deck Operations": "Operaciones de cubierta",
        "Maritime training covering navigational watchkeeping, seamanship fundamentals, safety procedures and the responsibilities associated with professional deck operations.": "Formación marítima en guardia de navegación, fundamentos marineros, procedimientos de seguridad y responsabilidades asociadas a las operaciones profesionales de cubierta.",
        "Seamanship & Maritime Skills": "Marinería y competencias marítimas",
        "Merchant Navy watchkeeping qualifications combined with recreational boating experience and ongoing professional maritime training.": "Titulaciones de guardia en la Marina Mercante, experiencia en navegación recreativa y formación marítima profesional continua.",
        "Tender & Water Activities": "Embarcaciones auxiliares y actividades acuáticas",
        "Training and experience related to RWC and Jet Ski operations, diving and water-based activities, supported by a strong understanding of aquatic safety.": "Formación y experiencia relacionadas con la operación de motos de agua, buceo y actividades acuáticas, respaldadas por un sólido conocimiento de la seguridad en el agua.",
        "Practical & Adaptable": "Práctico y adaptable",
        "Comfortable working in physically demanding environments, following procedures and adapting quickly to operational requirements while continuing to develop practical seamanship.": "Capacidad para trabajar en entornos físicamente exigentes, seguir procedimientos y adaptarme rápidamente a los requisitos operativos mientras continúo desarrollando habilidades marineras prácticas.",
        "Crew & Guest Service": "Tripulación y atención a los huéspedes",
        "Customer-facing experience as a professional tour guide, combined with a team-oriented approach and the ability to communicate effectively with an international clientele.": "Experiencia de atención al público como guía turístico profesional, con orientación al trabajo en equipo y capacidad para comunicarme eficazmente con clientes internacionales.",
        "CORE APPROACH": "ENFOQUE PRINCIPAL",
        "Safety first · Learn fast · Work hard · Support the crew": "Seguridad primero · Aprender rápido · Trabajar duro · Apoyar a la tripulación",
        "EXPERIENCE & PROGRESSION": "EXPERIENCIA Y PROGRESIÓN",
        "Maritime Journey": "Trayectoria marítima",
        "A progressive path combining professional responsibility, maritime training and a clear commitment to the yachting industry.": "Una trayectoria progresiva que combina responsabilidad profesional, formación marítima y un compromiso claro con el sector de los yates.",
        "PROFESSIONAL EXPERIENCE": "EXPERIENCIA PROFESIONAL",
        "Lifeguard — Castelldefels Beach": "Socorrista — Playa de Castelldefels",
        "Seasonal lifeguard position in a demanding coastal environment, focused on public safety, constant surveillance, prevention and emergency response.": "Puesto estacional de socorrista en un entorno costero exigente, centrado en la seguridad pública, la vigilancia constante, la prevención y la respuesta ante emergencias.",
        "Safety": "Seguridad",
        "Emergency Response": "Respuesta ante emergencias",
        "Teamwork": "Trabajo en equipo",
        "Continued professional lifeguard experience in a high-responsibility coastal environment, working as part of a coordinated emergency response team and operating effectively under pressure.": "Continuación de la experiencia profesional como socorrista en un entorno costero de alta responsabilidad, trabajando dentro de un equipo coordinado de respuesta ante emergencias y actuando eficazmente bajo presión.",
        "Public Safety": "Seguridad pública",
        "High Responsibility": "Alta responsabilidad",
        "MARITIME TRAINING": "FORMACIÓN MARÍTIMA",
        "Merchant Navy & STCW Training": "Formación STCW y de Marina Mercante",
        "Completed STCW training and merchant navy qualifications covering navigational watchkeeping, engineering watchkeeping, basic safety and medical first aid.": "Formación STCW y titulaciones de Marina Mercante completadas en guardia de navegación, guardia de máquinas, seguridad básica y primeros auxilios médicos.",
        "Deck": "Puente",
        "Engineering": "Máquinas",
        "CURRENT DEVELOPMENT": "FORMACIÓN ACTUAL",
        "Continuing Maritime Education": "Formación marítima continua",
        "Currently expanding my maritime qualifications through Passenger Ship Training, Restricted GMDSS training and Port Operations Skipper studies.": "Actualmente estoy ampliando mis titulaciones marítimas mediante la formación de buques de pasaje, el curso de operador restringido del SMSSM y los estudios de patrón portuario.",
        "Passenger Ships": "Buques de pasaje",
        "GMDSS": "SMSSM",
        "Port Operations": "Operaciones portuarias",
        "CAREER GOAL": "OBJETIVO PROFESIONAL",
        "Yacht Crew — Junior Deckhand": "Tripulación de yate — Marinero de cubierta júnior",
        "My next professional step is to join a yacht crew where I can apply my maritime training, develop practical seamanship skills and continue growing within the yachting industry.": "Mi próximo paso profesional es incorporarme a la tripulación de un yate donde pueda aplicar mi formación marítima, desarrollar habilidades marineras prácticas y seguir creciendo en el sector.",
        "Yachting": "Sector de los yates",
        "Deckhand": "Marinero de cubierta",
        "Seamanship": "Marinería",
        "MARITIME QUALIFICATIONS": "TITULACIONES MARÍTIMAS",
        "PROFESSIONAL MARITIME TRAINING": "FORMACIÓN MARÍTIMA PROFESIONAL",
        "STCW Certificates — Completed": "Certificados STCW — Completados",
        "Rating Forming Part of a Navigational Watch": "Marinero de puente de la Marina Mercante",
        "Professional maritime qualification for navigational watchkeeping duties.": "Titulación marítima profesional para desempeñar funciones de guardia de navegación.",
        "Rating Forming Part of an Engineering Watch": "Marinero de máquinas de la Marina Mercante",
        "Professional maritime qualification for engineering watchkeeping duties.": "Titulación marítima profesional para desempeñar funciones de guardia de máquinas.",
        "Basic Safety Training": "Formación básica en seguridad marítima",
        "STCW Basic Training": "Formación básica STCW",
        "Fundamental safety training for professional seafarers working on board.": "Formación fundamental en seguridad para profesionales que trabajan a bordo.",
        "Initial Specific Medical Training": "Formación sanitaria específica inicial",
        "Medical Training": "Formación sanitaria",
        "Maritime medical training covering first aid and medical assistance on board.": "Formación sanitaria marítima sobre primeros auxilios y asistencia médica a bordo.",
        "Instituto Social de la Marina (ISM)": "Instituto Social de la Marina (ISM)",
        "STCW PROFILE": "PERFIL STCW",
        "Certified in navigational watchkeeping, engineering watchkeeping, basic safety and medical first aid.": "Titulado en guardia de navegación, guardia de máquinas, seguridad básica y primeros auxilios médicos.",
        "CURRENT TRAINING": "FORMACIÓN ACTUAL",
        "STCW Training in Progress": "Formación STCW en curso",
        "CURRENTLY STUDYING": "EN CURSO",
        "Passenger Ship Training": "Formación de buques de pasaje",
        "Training focused on passenger safety, emergency procedures and crowd management.": "Formación centrada en la seguridad de los pasajeros, los procedimientos de emergencia y la gestión de multitudes.",
        "In progress": "En curso",
        "IN PROGRESS": "EN CURSO",
        "Restricted Operator's Certificate — GMDSS": "Certificado de operador restringido — SMSSM",
        "Global Maritime Distress and Safety System": "Sistema Mundial de Socorro y Seguridad Marítima",
        "Training for restricted radio operation within the Global Maritime Distress and Safety System.": "Formación para la operación restringida de equipos de radiocomunicaciones dentro del Sistema Mundial de Socorro y Seguridad Marítima.",
        "ADDITIONAL TRAINING": "FORMACIÓN ADICIONAL",
        "Other Maritime & Professional Qualifications": "Otras titulaciones marítimas y profesionales",
        "MARITIME": "MARÍTIMO",
        "Recreational Craft Skipper": "Patrón de embarcaciones de recreo",
        "Recreational boating qualification covering navigation and seamanship.": "Titulación de navegación recreativa que abarca navegación y marinería.",
        "IN PROGRESS": "EN CURSO",
        "Port Operations Skipper": "Patrón portuario",
        "Professional maritime qualification currently being studied.": "Titulación marítima profesional que estoy cursando actualmente.",
        "Escola de Capacitació Nàuticopesquera (ENPC)": "Escola de Capacitació Nàuticopesquera (ENPC)",
        "WATERCRAFT": "MOTO DE AGUA",
        "Jet Ski / RWC Operator & Instructor": "Operador e instructor de moto de agua / RWC",
        "Training in personal watercraft operation and instruction.": "Formación en el manejo e instrucción de motos de agua.",
        "DIVING": "BUCEO",
        "Open Water Diver": "Open Water Diver (buceador de aguas abiertas)",
        "Recreational scuba diving certification.": "Certificación de buceo recreativo.",
        "MEDICAL": "SANITARIO",
        "Automated External Defibrillator": "Desfibrilador externo automatizado",
        "AED": "DEA",
        "Training in the use of automated external defibrillation equipment.": "Formación en el uso de equipos de desfibrilación externa automatizada.",
        "LIFESAVING": "SALVAMENTO",
        "Natural Waters Lifeguard": "Socorrista de espacios naturales",
        "Professional lifeguard qualification for natural aquatic environments.": "Titulación profesional de socorrismo en entornos acuáticos naturales.",
        "Supporting certificates and documentation are available upon request.": "Los certificados y la documentación acreditativa están disponibles previa solicitud.",
        "Dear Captain,": "Estimado capitán:",
        "I am seeking the opportunity to begin and develop my professional career within the yachting industry as a junior deckhand.": "Busco la oportunidad de iniciar y desarrollar mi carrera profesional en el sector de los yates como marinero de cubierta júnior.",
        "My maritime training, experience in lifesaving and strong motivation to work at sea have prepared me to contribute with responsibility, adaptability and a strong willingness to learn.": "Mi formación marítima, mi experiencia en salvamento y mi gran motivación por trabajar en el mar me han preparado para contribuir con responsabilidad, adaptabilidad y una firme disposición para aprender.",
        "I am particularly interested in joining a professional crew where I can continue developing my practical seamanship skills and contribute positively to the operation of the vessel.": "Estoy especialmente interesado en incorporarme a una tripulación profesional donde pueda seguir desarrollando mis habilidades marineras prácticas y contribuir positivamente a la operativa del buque.",
        "Read Full Cover Letter": "Leer la carta de presentación completa",
        "PROFESSIONAL DOCUMENT": "DOCUMENTO PROFESIONAL",
        "Curriculum Vitae": "Currículum vitae",
        "My complete professional CV includes my maritime qualifications, professional experience, training and additional skills.": "Mi CV profesional completo incluye mis titulaciones marítimas, experiencia profesional, formación y competencias adicionales.",
        "Download CV": "Descargar CV",
        "Let's Get In Touch": "Ponte en contacto conmigo",
        "For yacht crew opportunities, maritime positions or professional enquiries, I would be pleased to hear from you.": "Estaré encantado de recibir noticias tuyas para oportunidades en tripulaciones de yates, puestos marítimos o consultas profesionales.",
        "EMAIL": "CORREO ELECTRÓNICO",
        "Send me an email for professional enquiries, opportunities or further information.": "Envíame un correo electrónico para consultas profesionales, oportunidades o más información.",
        "SEND EMAIL →": "ENVIAR CORREO →",
        "TELEGRAM": "TELEGRAM",
        "You can also contact me directly through Telegram.": "También puedes contactar conmigo directamente a través de Telegram.",
        "OPEN TELEGRAM →": "ABRIR TELEGRAM →",
        "PROFESSIONAL CONTACT": "CONTACTO PROFESIONAL",
        "Available for yacht crew opportunities and maritime positions": "Disponible para oportunidades en tripulaciones de yates y puestos marítimos",
        "Maritime Professional": "Profesional marítimo"
    },

    ca: {
        "Open navigation menu": "Obrir menú de navegació",
        "Carles Oliva | Maritime Professional": "Carles Oliva | Professional marítim",
        "Professional portfolio and CV of Carles Oliva.": "Portafolis professional i CV de Carles Oliva.",
        "About": "Sobre mi",
        "Why Me": "Per què jo?",
        "Profile": "Perfil",
        "Experience": "Experiència",
        "Qualifications": "Titulacions",
        "Cover Letter": "Carta de presentació",
        "CV": "CV",
        "Contact": "Contacte",
        "Language": "Idioma",
        "YACHT CREW • MARITIME PROFESSIONAL": "TRIPULACIÓ DE IOTS • PROFESSIONAL MARÍTIM",
        "Junior Deckhand": "Mariner de coberta júnior",
        "Maritime professional with a strong passion for the sea, safety and professional development within the yachting industry.": "Professional marítim amb una gran passió pel mar, la seguretat i el desenvolupament professional en el sector dels iots.",
        "View My CV": "Veure el meu CV",
        "Contact Me": "Contacta amb mi",
        "Carles Oliva - Maritime Professional": "Carles Oliva - Professional marítim",
        "PROFILE": "PERFIL",
        "About Me": "Sobre mi",
        "I am a maritime professional based in Barcelona, with a strong vocation for the sea and a clear goal of developing my career within the yachting industry.": "Soc un professional marítim establert a Barcelona, amb una gran vocació pel mar i l'objectiu clar de desenvolupar la meva carrera en el sector dels iots.",
        "My professional background combines maritime experience, lifesaving responsibilities and customer-facing roles. Working as a lifeguard has strengthened my ability to remain calm under pressure, act quickly and work effectively as part of a team.": "La meva trajectòria professional combina experiència marítima, responsabilitats de salvament i tasques d'atenció al públic. Treballar com a socorrista ha reforçat la meva capacitat per mantenir la calma sota pressió, actuar ràpidament i treballar eficaçment en equip.",
        "I am particularly interested in junior deckhand positions, where I can contribute with a strong work ethic, adaptability and willingness to learn while continuing to develop my practical seamanship skills.": "Estic especialment interessat en llocs de mariner de coberta júnior, on pugui aportar una sòlida ètica de treball, capacitat d'adaptació i voluntat d'aprendre mentre continuo desenvolupant les meves habilitats pràctiques de marineria.",
        "PROFESSIONAL PROFILE": "PERFIL PROFESSIONAL",
        "Why Me?": "Per què jo?",
        "Safety & Responsibility": "Seguretat i responsabilitat",
        "Strong safety awareness developed through maritime training and professional lifeguard experience in demanding coastal environments.": "Sòlida consciència de la seguretat desenvolupada mitjançant formació marítima i experiència professional com a socorrista en entorns costaners exigents.",
        "Maritime Training": "Formació marítima",
        "STCW qualifications combined with ongoing maritime training and a clear commitment to developing a professional career at sea.": "Titulacions STCW, formació marítima contínua i un compromís clar amb el desenvolupament d'una carrera professional al mar.",
        "Adaptability": "Adaptabilitat",
        "Comfortable working in demanding environments, learning new procedures and adapting to operational requirements.": "Capacitat per treballar en entorns exigents, aprendre procediments nous i adaptar-me als requisits operatius.",
        "Teamwork & Service": "Treball en equip i atenció al públic",
        "Experience working closely with teams and interacting with the public in safety-critical and customer-facing environments.": "Experiència treballant estretament amb equips i tractant amb el públic en entorns on la seguretat i l'atenció al client són fonamentals.",
        "DECKHAND PROFILE": "PERFIL DE MARINER DE COBERTA",
        "What I Bring On Board": "Què puc aportar a bord",
        "A practical foundation built around safety, maritime training, adaptability and a strong willingness to learn and contribute as part of a professional crew.": "Una base pràctica centrada en la seguretat, la formació marítima, l'adaptabilitat i una gran voluntat d'aprendre i contribuir com a part d'una tripulació professional.",
        "Safety & Emergency Response": "Seguretat i resposta davant d'emergències",
        "Professional lifeguard experience in a demanding coastal environment, with a strong focus on prevention, vigilance, emergency response and maintaining composure under pressure.": "Experiència professional com a socorrista en un entorn costaner exigent, amb especial atenció a la prevenció, la vigilància, la resposta davant d'emergències i la capacitat de mantenir la calma sota pressió.",
        "Deck Operations": "Operacions de coberta",
        "Maritime training covering navigational watchkeeping, seamanship fundamentals, safety procedures and the responsibilities associated with professional deck operations.": "Formació marítima en guàrdia de navegació, fonaments de marineria, procediments de seguretat i responsabilitats associades a les operacions professionals de coberta.",
        "Seamanship & Maritime Skills": "Marineria i competències marítimes",
        "Merchant Navy watchkeeping qualifications combined with recreational boating experience and ongoing professional maritime training.": "Titulacions de guàrdia a la Marina Mercant, experiència en navegació recreativa i formació marítima professional contínua.",
        "Tender & Water Activities": "Embarcacions auxiliars i activitats aquàtiques",
        "Training and experience related to RWC and Jet Ski operations, diving and water-based activities, supported by a strong understanding of aquatic safety.": "Formació i experiència relacionades amb l'operació de motos d'aigua, el busseig i les activitats aquàtiques, amb un coneixement sòlid de la seguretat a l'aigua.",
        "Practical & Adaptable": "Pràctic i adaptable",
        "Comfortable working in physically demanding environments, following procedures and adapting quickly to operational requirements while continuing to develop practical seamanship.": "Capacitat per treballar en entorns físicament exigents, seguir procediments i adaptar-me ràpidament als requisits operatius mentre continuo desenvolupant habilitats pràctiques de marineria.",
        "Crew & Guest Service": "Tripulació i atenció als hostes",
        "Customer-facing experience as a professional tour guide, combined with a team-oriented approach and the ability to communicate effectively with an international clientele.": "Experiència d'atenció al públic com a guia turístic professional, amb orientació al treball en equip i capacitat per comunicar-me eficaçment amb una clientela internacional.",
        "CORE APPROACH": "ENFOCAMENT PRINCIPAL",
        "Safety first · Learn fast · Work hard · Support the crew": "Seguretat primer · Aprendre ràpid · Treballar de valent · Donar suport a la tripulació",
        "EXPERIENCE & PROGRESSION": "EXPERIÈNCIA I PROGRESSIÓ",
        "Maritime Journey": "Trajectòria marítima",
        "A progressive path combining professional responsibility, maritime training and a clear commitment to the yachting industry.": "Una trajectòria progressiva que combina responsabilitat professional, formació marítima i un compromís clar amb el sector dels iots.",
        "PROFESSIONAL EXPERIENCE": "EXPERIÈNCIA PROFESSIONAL",
        "Lifeguard — Castelldefels Beach": "Socorrista — Platja de Castelldefels",
        "Seasonal lifeguard position in a demanding coastal environment, focused on public safety, constant surveillance, prevention and emergency response.": "Lloc estacional de socorrista en un entorn costaner exigent, centrat en la seguretat pública, la vigilància constant, la prevenció i la resposta davant d'emergències.",
        "Safety": "Seguretat",
        "Emergency Response": "Resposta davant d'emergències",
        "Teamwork": "Treball en equip",
        "Continued professional lifeguard experience in a high-responsibility coastal environment, working as part of a coordinated emergency response team and operating effectively under pressure.": "Continuació de l'experiència professional com a socorrista en un entorn costaner d'alta responsabilitat, treballant dins d'un equip coordinat de resposta davant d'emergències i actuant eficaçment sota pressió.",
        "Public Safety": "Seguretat pública",
        "High Responsibility": "Alta responsabilitat",
        "MARITIME TRAINING": "FORMACIÓ MARÍTIMA",
        "Merchant Navy & STCW Training": "Formació STCW i de Marina Mercant",
        "Completed STCW training and merchant navy qualifications covering navigational watchkeeping, engineering watchkeeping, basic safety and medical first aid.": "Formació STCW i titulacions de Marina Mercant completades en guàrdia de navegació, guàrdia de màquines, seguretat bàsica i primers auxilis mèdics.",
        "Deck": "Pont",
        "Engineering": "Màquines",
        "CURRENT DEVELOPMENT": "FORMACIÓ ACTUAL",
        "Continuing Maritime Education": "Formació marítima contínua",
        "Currently expanding my maritime qualifications through Passenger Ship Training, Restricted GMDSS training and Port Operations Skipper studies.": "Actualment estic ampliant les meves titulacions marítimes mitjançant la formació de vaixells de passatge, el curs d'operador restringit del SMSSM i els estudis de patró portuari.",
        "Passenger Ships": "Vaixells de passatge",
        "GMDSS": "SMSSM",
        "Port Operations": "Operacions portuàries",
        "CAREER GOAL": "OBJECTIU PROFESSIONAL",
        "Yacht Crew — Junior Deckhand": "Tripulació de iot — Mariner de coberta júnior",
        "My next professional step is to join a yacht crew where I can apply my maritime training, develop practical seamanship skills and continue growing within the yachting industry.": "El meu proper pas professional és incorporar-me a la tripulació d'un iot on pugui aplicar la meva formació marítima, desenvolupar habilitats pràctiques de marineria i continuar creixent en el sector.",
        "Yachting": "Sector dels iots",
        "Deckhand": "Mariner de coberta",
        "Seamanship": "Marineria",
        "MARITIME QUALIFICATIONS": "TITULACIONS MARÍTIMES",
        "PROFESSIONAL MARITIME TRAINING": "FORMACIÓ MARÍTIMA PROFESSIONAL",
        "STCW Certificates — Completed": "Certificats STCW — Completats",
        "Rating Forming Part of a Navigational Watch": "Mariner de pont de la Marina Mercant",
        "Professional maritime qualification for navigational watchkeeping duties.": "Titulació marítima professional per exercir funcions de guàrdia de navegació.",
        "Rating Forming Part of an Engineering Watch": "Mariner de màquines de la Marina Mercant",
        "Professional maritime qualification for engineering watchkeeping duties.": "Titulació marítima professional per exercir funcions de guàrdia de màquines.",
        "Basic Safety Training": "Formació bàsica en seguretat marítima",
        "STCW Basic Training": "Formació bàsica STCW",
        "Fundamental safety training for professional seafarers working on board.": "Formació fonamental en seguretat per a professionals que treballen a bord.",
        "Initial Specific Medical Training": "Formació sanitària específica inicial",
        "Medical Training": "Formació sanitària",
        "Maritime medical training covering first aid and medical assistance on board.": "Formació sanitària marítima sobre primers auxilis i assistència mèdica a bord.",
        "Instituto Social de la Marina (ISM)": "Instituto Social de la Marina (ISM)",
        "STCW PROFILE": "PERFIL STCW",
        "Certified in navigational watchkeeping, engineering watchkeeping, basic safety and medical first aid.": "Titulat en guàrdia de navegació, guàrdia de màquines, seguretat bàsica i primers auxilis mèdics.",
        "CURRENT TRAINING": "FORMACIÓ ACTUAL",
        "STCW Training in Progress": "Formació STCW en curs",
        "CURRENTLY STUDYING": "EN CURS",
        "Passenger Ship Training": "Formació de vaixells de passatge",
        "Training focused on passenger safety, emergency procedures and crowd management.": "Formació centrada en la seguretat dels passatgers, els procediments d'emergència i la gestió de multituds.",
        "In progress": "En curs",
        "Restricted Operator's Certificate — GMDSS": "Certificat d'operador restringit — SMSSM",
        "Global Maritime Distress and Safety System": "Sistema Mundial de Socors i Seguretat Marítima",
        "Training for restricted radio operation within the Global Maritime Distress and Safety System.": "Formació per a l'operació restringida d'equips de radiocomunicacions dins del Sistema Mundial de Socors i Seguretat Marítima.",
        "ADDITIONAL TRAINING": "FORMACIÓ ADDICIONAL",
        "Other Maritime & Professional Qualifications": "Altres titulacions marítimes i professionals",
        "MARITIME": "MARÍTIM",
        "Recreational Craft Skipper": "Patró d'embarcacions d'esbarjo",
        "Recreational boating qualification covering navigation and seamanship.": "Titulació de navegació d'esbarjo que inclou navegació i marineria.",
        "Port Operations Skipper": "Patró portuari",
        "Professional maritime qualification currently being studied.": "Titulació marítima professional que estic cursant actualment.",
        "Escola de Capacitació Nàuticopesquera (ENPC)": "Escola de Capacitació Nàuticopesquera (ENPC)",
        "WATERCRAFT": "MOTO D'AIGUA",
        "Jet Ski / RWC Operator & Instructor": "Operador i instructor de moto d'aigua / RWC",
        "Training in personal watercraft operation and instruction.": "Formació en el maneig i la instrucció de motos d'aigua.",
        "DIVING": "BUSSEIG",
        "Open Water Diver": "Open Water Diver (bussejador d'aigües obertes)",
        "Recreational scuba diving certification.": "Certificació de busseig recreatiu.",
        "MEDICAL": "SANITARI",
        "Automated External Defibrillator": "Desfibril·lador extern automatitzat",
        "AED": "DEA",
        "Training in the use of automated external defibrillation equipment.": "Formació en l'ús d'equips de desfibril·lació externa automatitzada.",
        "LIFESAVING": "SALVAMENT",
        "Natural Waters Lifeguard": "Socorrista d'espais naturals",
        "Professional lifeguard qualification for natural aquatic environments.": "Titulació professional de socorrisme en entorns aquàtics naturals.",
        "Supporting certificates and documentation are available upon request.": "Els certificats i la documentació acreditativa estan disponibles a petició.",
        "Dear Captain,": "Benvolgut capità,",
        "I am seeking the opportunity to begin and develop my professional career within the yachting industry as a junior deckhand.": "Busco l'oportunitat d'iniciar i desenvolupar la meva carrera professional en el sector dels iots com a mariner de coberta júnior.",
        "My maritime training, experience in lifesaving and strong motivation to work at sea have prepared me to contribute with responsibility, adaptability and a strong willingness to learn.": "La meva formació marítima, l'experiència en salvament i la gran motivació per treballar al mar m'han preparat per contribuir amb responsabilitat, adaptabilitat i una ferma voluntat d'aprendre.",
        "I am particularly interested in joining a professional crew where I can continue developing my practical seamanship skills and contribute positively to the operation of the vessel.": "Estic especialment interessat a incorporar-me a una tripulació professional on pugui continuar desenvolupant les meves habilitats pràctiques de marineria i contribuir positivament a les operacions de l'embarcació.",
        "Read Full Cover Letter": "Llegir la carta de presentació completa",
        "PROFESSIONAL DOCUMENT": "DOCUMENT PROFESSIONAL",
        "Curriculum Vitae": "Currículum vitae",
        "My complete professional CV includes my maritime qualifications, professional experience, training and additional skills.": "El meu CV professional complet inclou les meves titulacions marítimes, experiència professional, formació i competències addicionals.",
        "Download CV": "Descarregar CV",
        "Let's Get In Touch": "Posem-nos en contacte",
        "For yacht crew opportunities, maritime positions or professional enquiries, I would be pleased to hear from you.": "Estaré encantat de rebre notícies teves per a oportunitats en tripulacions de iots, llocs de treball marítims o consultes professionals.",
        "EMAIL": "CORREU ELECTRÒNIC",
        "Send me an email for professional enquiries, opportunities or further information.": "Envia'm un correu electrònic per a consultes professionals, oportunitats o més informació.",
        "SEND EMAIL →": "ENVIAR CORREU →",
        "TELEGRAM": "TELEGRAM",
        "You can also contact me directly through Telegram.": "També pots contactar amb mi directament a través de Telegram.",
        "OPEN TELEGRAM →": "OBRIR TELEGRAM →",
        "PROFESSIONAL CONTACT": "CONTACTE PROFESSIONAL",
        "Available for yacht crew opportunities and maritime positions": "Disponible per a oportunitats en tripulacions de iots i llocs de treball marítims",
        "Maritime Professional": "Professional marítim"
    }
};

function normalizeText(value) {
    return value.replace(/\s+/g, " ").trim();
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

        if (!parent || parent.closest(".language-toggle, .theme-toggle, script, style")) {
            continue;
        }

        if (!originalTexts.has(node)) {
            originalTexts.set(node, node.nodeValue);
        }

        const original = originalTexts.get(node);
        const key = normalizeText(original);

        if (language === "en") {
            node.nodeValue = original;
        } else if (dictionary[key]) {
            const leading = original.match(/^\s*/)?.[0] || "";
            const trailing = original.match(/\s*$/)?.[0] || "";

            node.nodeValue = leading + dictionary[key] + trailing;
        }
    }

    const languageLabels = {
        en: "Language",
        es: "Idioma",
        ca: "Idioma"
    };

    if (languageToggle) {
        languageToggle.textContent = languageLabels[language] || "Language";
    }

    const pageTitles = {
        en: "Carles Oliva | Maritime Professional",
        es: "Carles Oliva | Profesional marítimo",
        ca: "Carles Oliva | Professional marítim"
    };

    document.title = pageTitles[language] || pageTitles.en;

    const description = document.querySelector('meta[name="description"]');

    if (description) {
        const descriptions = {
            en: "Professional portfolio and CV of Carles Oliva.",
            es: "Portafolio profesional y CV de Carles Oliva.",
            ca: "Portafolis professional i CV de Carles Oliva."
        };

        description.setAttribute("content", descriptions[language] || descriptions.en);
    }

    const profileImage = document.querySelector(".hero-image img");

    if (profileImage) {
        const altTexts = {
            en: "Carles Oliva - Maritime Professional",
            es: "Carles Oliva - Profesional marítimo",
            ca: "Carles Oliva - Professional marítim"
        };

        profileImage.alt = altTexts[language] || altTexts.en;
    }

    if (menuToggle) {
        const menuLabels = {
            en: "Open navigation menu",
            es: "Abrir menú de navegación",
            ca: "Obrir menú de navegació"
        };

        menuToggle.setAttribute(
            "aria-label",
            menuLabels[language] || menuLabels.en
        );
    }

    updateThemeLabel();

    try {
        localStorage.setItem("preferred-language", language);
    } catch (error) {
        // Language switching remains available without browser storage.
    }
}

// MOBILE NAVIGATION
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// CLOSE MOBILE MENU WHEN A NAVIGATION LINK IS CLICKED
navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        if (languageMenu) {
            languageMenu.classList.remove("open");
        }

        if (languageToggle) {
            languageToggle.setAttribute("aria-expanded", "false");
        }
    });
});

// LANGUAGE MENU
if (languageToggle && languageMenu) {
    languageToggle.addEventListener("click", () => {
        const isOpen = languageMenu.classList.toggle("open");

        languageToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

// SELECT LANGUAGE
languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedLanguage = button.dataset.lang;

        if (["en", "es", "ca"].includes(selectedLanguage)) {
            applyLanguage(selectedLanguage);
        }

        if (languageMenu) {
            languageMenu.classList.remove("open");
        }

        if (languageToggle) {
            languageToggle.setAttribute("aria-expanded", "false");
        }

        if (navLinks) {
            navLinks.classList.remove("active");
        }
    });
});

// LIGHT / DARK THEME
function updateThemeLabel() {
    if (!themeToggle) return;

    const isDark = document.body.classList.contains("dark-theme");

    const labels = {
        en: {
            light: "☀ Light",
            dark: "☾ Dark"
        },
        es: {
            light: "☀ Claro",
            dark: "☾ Oscuro"
        },
        ca: {
            light: "☀ Clar",
            dark: "☾ Fosc"
        }
    };

    const languageLabels = labels[currentLanguage] || labels.en;

    themeToggle.textContent = isDark ? languageLabels.light : languageLabels.dark;
    themeToggle.setAttribute("aria-pressed", String(isDark));
}

function setTheme(isDark) {
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
