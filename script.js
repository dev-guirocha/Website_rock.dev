const SITE_LANGUAGE_KEY = 'rockdev_site_language_v1';
const LANGUAGE_OPTIONS = ['pt', 'en', 'es'];

const UI_TEXT = {
    pt: {
        ariaLanguageSelector: 'Selecionar idioma',
        carouselDot: 'Ir para projeto {index}',
        processNext: 'Ver próxima etapa <i class="fas fa-arrow-right" aria-hidden="true"></i>',
        processRestart: 'Reiniciar ciclo <i class="fas fa-rotate-right" aria-hidden="true"></i>',
        contactRequired: 'Preencha os campos obrigatórios.',
        contactSendingButton: 'Enviando...',
        contactSendingStatus: 'Enviando seu briefing...',
        contactSuccess: 'Mensagem enviada com sucesso. Retornamos em até 48h úteis.',
        contactFallbackError: 'Erro inesperado ao enviar.',
        contactSubmitDefault: 'Enviar briefing',
        roiMonthlyCost: 'Custo mensal estimado:',
        roiAnnualCost: 'Custo anual estimado:',
        roiRecovery: 'Potencial de recuperação mensal (estimado em 40%):',
        cookieAria: 'Consentimento de cookies',
        cookieText: 'Usamos cookies essenciais para melhorar a experiência e salvar preferências. Leia nossa <a href="politica-de-privacidade.html">Política de Privacidade</a>.',
        cookieReject: 'Recusar',
        cookieAccept: 'Aceitar'
    },
    en: {
        ariaLanguageSelector: 'Select language',
        carouselDot: 'Go to project {index}',
        processNext: 'View next step <i class="fas fa-arrow-right" aria-hidden="true"></i>',
        processRestart: 'Restart cycle <i class="fas fa-rotate-right" aria-hidden="true"></i>',
        contactRequired: 'Fill in the required fields.',
        contactSendingButton: 'Sending...',
        contactSendingStatus: 'Sending your brief...',
        contactSuccess: 'Message sent successfully. We will reply within 48 business hours.',
        contactFallbackError: 'Unexpected error while sending.',
        contactSubmitDefault: 'Send brief',
        roiMonthlyCost: 'Estimated monthly cost:',
        roiAnnualCost: 'Estimated annual cost:',
        roiRecovery: 'Estimated monthly recovery potential (40%):',
        cookieAria: 'Cookie consent',
        cookieText: 'We use essential cookies to improve experience and save preferences. Read our <a href="politica-de-privacidade.html">Privacy Policy</a>.',
        cookieReject: 'Decline',
        cookieAccept: 'Accept'
    },
    es: {
        ariaLanguageSelector: 'Seleccionar idioma',
        carouselDot: 'Ir al proyecto {index}',
        processNext: 'Ver siguiente etapa <i class="fas fa-arrow-right" aria-hidden="true"></i>',
        processRestart: 'Reiniciar ciclo <i class="fas fa-rotate-right" aria-hidden="true"></i>',
        contactRequired: 'Completa los campos obligatorios.',
        contactSendingButton: 'Enviando...',
        contactSendingStatus: 'Enviando tu briefing...',
        contactSuccess: 'Mensaje enviado con éxito. Respondemos en hasta 48 horas hábiles.',
        contactFallbackError: 'Error inesperado al enviar.',
        contactSubmitDefault: 'Enviar briefing',
        roiMonthlyCost: 'Costo mensual estimado:',
        roiAnnualCost: 'Costo anual estimado:',
        roiRecovery: 'Potencial de recuperación mensual (estimado en 40%):',
        cookieAria: 'Consentimiento de cookies',
        cookieText: 'Usamos cookies esenciales para mejorar la experiencia y guardar preferencias. Lee nuestra <a href="politica-de-privacidade.html">Política de Privacidad</a>.',
        cookieReject: 'Rechazar',
        cookieAccept: 'Aceptar'
    }
};

const STATIC_TEXT = {
    en: {
        'Pular para o conteúdo principal': 'Skip to main content',
        'Início': 'Home',
        'Sobre': 'About',
        'Serviços': 'Services',
        'Portfólio': 'Portfolio',
        'Diagnóstico': 'Diagnostic',
        'Solicitar diagnóstico': 'Request diagnostic',
        'Começar diagnóstico': 'Start diagnostic',
        'Ver projetos': 'View projects',
        'Ver projeto': 'View projects',
        'Ver detalhes': 'View details',
        'Ver estudo de caso': 'View case study',
        'Abrir case': 'Open case',
        'Contato': 'Contact',
        'Sobre a Rock .dev': 'About Rock .dev',
        'Tecnologia com propósito': 'Technology with purpose',
        'Como eu trabalho': 'How I work',
        'About me': 'About me',
        'O que você percebe trabalhando comigo': 'What you get when working with me',
        'Como o projeto permanece sob controle do início ao fim.': 'How the project stays under control from start to finish.',
        'Como eu construo sistemas confiáveis': 'How I build reliable systems',
        'Garantias de projeto': 'Project guarantees',
        'Ao final de cada etapa você recebe': 'At the end of each stage you receive',
        'Quer construir com esse nível de rigor?': 'Want to build with this level of rigor?',
        'Engenharia de software para operação real': 'Software engineering for real operations',
        'Sistemas que trocam retrabalho por previsibilidade.': 'Systems that replace rework with predictability.',
        'Resposta 48h': '48h response',
        'Visibilidade total': 'Total visibility',
        'Entrega previsível': 'Predictable delivery',
        'Onde empresas perdem dinheiro com processo manual': 'Where companies lose money with manual processes',
        'Retrabalho': 'Rework',
        'Falhas de comunicação': 'Communication failures',
        'Dados espalhados': 'Scattered data',
        'Falta de visibilidade': 'Lack of visibility',
        'O que entregamos': 'What we deliver',
        'Serviços estruturados por impacto operacional.': 'Services structured by operational impact.',
        'Automação Operacional': 'Operational Automation',
        'Sistemas Internos': 'Internal Systems',
        'Plataformas de Receita': 'Revenue Platforms',
        'Caso real': 'Real case',
        'Projetos em produção': 'Projects in production',
        'Como trabalhamos': 'How we work',
        'Etapa atual': 'Current stage',
        'Credenciais': 'Credentials',
        'Pronto para trocar improviso por sistema?': 'Ready to replace improvisation with system?',
        'Resume': 'Resume',
        'Política de Privacidade': 'Privacy Policy',
        'Todos os direitos reservados.': 'All rights reserved.',
        'Sistemas para negócios que não podem depender de improviso': 'Systems for businesses that cannot rely on improvisation',
        'Cada serviço resolve um tipo comum de caos operacional.': 'Each service solves a common type of operational chaos.',
        'Como começamos o projeto': 'How we start the project',
        'Como o projeto evolui sem sair do trilho': 'How the project evolves without going off track',
        'Projetos entregues com foco em resultado': 'Delivered projects focused on outcomes',
        'Conteúdo': 'Content',
        'Contato direto': 'Direct contact',
        'Vamos montar seu diagnóstico técnico': "Let's build your technical diagnostic",
        'o que você recebe em 48h': 'what you receive in 48h',
        'Nome': 'Name',
        'E-mail': 'Email',
        'Empresa (opcional)': 'Company (optional)',
        'Mensagem': 'Message',
        'Enviar briefing': 'Send brief',
        'Diagnóstico Técnico': 'Technical Diagnostic'
    },
    es: {
        'Pular para o conteúdo principal': 'Saltar al contenido principal',
        'Início': 'Inicio',
        'Sobre': 'Sobre mí',
        'Serviços': 'Servicios',
        'Portfólio': 'Portafolio',
        'Diagnóstico': 'Diagnóstico',
        'Solicitar diagnóstico': 'Solicitar diagnóstico',
        'Começar diagnóstico': 'Comenzar diagnóstico',
        'Ver projetos': 'Ver proyectos',
        'Ver projeto': 'Ver proyecto',
        'Ver detalhes': 'Ver detalles',
        'Ver estudo de caso': 'Ver caso de estudio',
        'Abrir case': 'Abrir caso',
        'Contato': 'Contacto',
        'Sobre a Rock .dev': 'Sobre Rock .dev',
        'Tecnologia com propósito': 'Tecnología con propósito',
        'Como eu trabalho': 'Cómo trabajo',
        'About me': 'Sobre mí',
        'O que você percebe trabalhando comigo': 'Lo que percibes al trabajar conmigo',
        'Como o projeto permanece sob controle do início ao fim.': 'Cómo el proyecto se mantiene bajo control de principio a fin.',
        'Como eu construo sistemas confiáveis': 'Cómo construyo sistemas confiables',
        'Garantias de projeto': 'Garantías del proyecto',
        'Ao final de cada etapa você recebe': 'Al final de cada etapa recibes',
        'Quer construir com esse nível de rigor?': '¿Quieres construir con este nivel de rigor?',
        'Engenharia de software para operação real': 'Ingeniería de software para operación real',
        'Sistemas que trocam retrabalho por previsibilidade.': 'Sistemas que cambian retrabajo por previsibilidad.',
        'Resposta 48h': 'Respuesta en 48h',
        'Visibilidade total': 'Visibilidad total',
        'Entrega previsível': 'Entrega predecible',
        'Onde empresas perdem dinheiro com processo manual': 'Dónde las empresas pierden dinero con procesos manuales',
        'Retrabalho': 'Retrabajo',
        'Falhas de comunicação': 'Fallos de comunicación',
        'Dados espalhados': 'Datos dispersos',
        'Falta de visibilidade': 'Falta de visibilidad',
        'O que entregamos': 'Qué entregamos',
        'Serviços estruturados por impacto operacional.': 'Servicios estructurados por impacto operativo.',
        'Automação Operacional': 'Automatización Operativa',
        'Sistemas Internos': 'Sistemas Internos',
        'Plataformas de Receita': 'Plataformas de Ingresos',
        'Caso real': 'Caso real',
        'Projetos em produção': 'Proyectos en producción',
        'Como trabalhamos': 'Cómo trabajamos',
        'Etapa atual': 'Etapa actual',
        'Credenciais': 'Credenciales',
        'Pronto para trocar improviso por sistema?': '¿Listo para cambiar improvisación por sistema?',
        'Resume': 'Resume',
        'Política de Privacidade': 'Política de Privacidad',
        'Todos os direitos reservados.': 'Todos los derechos reservados.',
        'Sistemas para negócios que não podem depender de improviso': 'Sistemas para negocios que no pueden depender de la improvisación',
        'Cada serviço resolve um tipo comum de caos operacional.': 'Cada servicio resuelve un tipo común de caos operativo.',
        'Como começamos o projeto': 'Cómo empezamos el proyecto',
        'Como o projeto evolui sem sair do trilho': 'Cómo evoluciona el proyecto sin salirse del camino',
        'Projetos entregues com foco em resultado': 'Proyectos entregados con foco en resultados',
        'Conteúdo': 'Contenido',
        'Contato direto': 'Contacto directo',
        'Vamos montar seu diagnóstico técnico': 'Vamos a montar tu diagnóstico técnico',
        'o que você recebe em 48h': 'lo que recibes en 48h',
        'Nome': 'Nombre',
        'E-mail': 'Correo',
        'Empresa (opcional)': 'Empresa (opcional)',
        'Mensagem': 'Mensaje',
        'Enviar briefing': 'Enviar briefing',
        'Diagnóstico Técnico': 'Diagnóstico Técnico'
    }
};

const CONTACT_PAGE_TEXT = {
    en: {
        title: 'Contact - Rock .dev',
        kicker: 'Contact',
        pageTitle: "Let's build your technical diagnostic",
        pageSubtitle: 'Fill in the brief and receive an initial read of your scenario with risks and practical next steps.',
        formTitle: 'Briefing form',
        stepContact: '1. Contact details',
        stepContext: '2. Project context',
        stepGoals: '3. Goals and bottlenecks',
        labelName: 'Full name',
        labelEmail: 'Email',
        labelCompany: 'Company (optional)',
        labelService: 'Project type',
        labelBudget: 'Investment range',
        labelTimeline: 'Desired timeline',
        labelMessage: 'Project summary',
        messagePlaceholder: 'Describe current pains, expected objective and desired impact...',
        servicePlaceholder: 'Select a service...',
        serviceAutomation: 'Operational Automation',
        serviceInternal: 'Internal Systems for Teams',
        servicePlatform: 'Revenue and Scale Platforms',
        serviceDiagnostic: 'Technical Diagnostic',
        serviceOther: 'Other',
        budgetPlaceholder: 'Select a range...',
        budgetUpTo15: 'Up to BRL 15k',
        budget15To40: 'BRL 15k to BRL 40k',
        budget40To80: 'BRL 40k to BRL 80k',
        budget80Plus: 'Above BRL 80k',
        timelinePlaceholder: 'Select a timeline...',
        timelineUrgent: 'Up to 30 days',
        timelineShort: '1 to 3 months',
        timelineMedium: '3 to 6 months',
        timelineLong: 'Above 6 months',
        consentPrefix: 'I agree with the use of my data for commercial follow-up.',
        privacyPolicy: 'Privacy Policy',
        privacyNote: 'Privacy: your data is used only for analysis and follow-up regarding this contact.',
        submitButton: 'Send brief',
        whatsappButton: 'Talk on WhatsApp (soon)',
        receiveTitle: 'What you receive in 48h',
        receive1: 'Initial scope with priorities.',
        receive2: 'Main technical risks mapped.',
        receive3: 'Next implementation steps.',
        directContact: 'Direct contact',
        remoteSupport: 'Remote support across Brazil.'
    },
    es: {
        title: 'Contacto - Rock .dev',
        kicker: 'Contacto',
        pageTitle: 'Vamos a montar tu diagnóstico técnico',
        pageSubtitle: 'Completa el briefing y recibe una lectura inicial de tu escenario con riesgos y próximos pasos prácticos.',
        formTitle: 'Formulario de briefing',
        stepContact: '1. Datos de contacto',
        stepContext: '2. Contexto del proyecto',
        stepGoals: '3. Objetivo y cuellos de botella',
        labelName: 'Nombre completo',
        labelEmail: 'Correo',
        labelCompany: 'Empresa (opcional)',
        labelService: 'Tipo de proyecto',
        labelBudget: 'Rango de inversión',
        labelTimeline: 'Plazo deseado',
        labelMessage: 'Resumen del proyecto',
        messagePlaceholder: 'Describe dolores actuales, objetivo esperado e impacto deseado...',
        servicePlaceholder: 'Selecciona un servicio...',
        serviceAutomation: 'Automatización Operativa',
        serviceInternal: 'Sistemas Internos para Equipos',
        servicePlatform: 'Plataformas de Ingresos y Escala',
        serviceDiagnostic: 'Diagnóstico Técnico',
        serviceOther: 'Otro',
        budgetPlaceholder: 'Selecciona un rango...',
        budgetUpTo15: 'Hasta R$ 15 mil',
        budget15To40: 'R$ 15 mil a R$ 40 mil',
        budget40To80: 'R$ 40 mil a R$ 80 mil',
        budget80Plus: 'Más de R$ 80 mil',
        timelinePlaceholder: 'Selecciona un plazo...',
        timelineUrgent: 'Hasta 30 días',
        timelineShort: '1 a 3 meses',
        timelineMedium: '3 a 6 meses',
        timelineLong: 'Más de 6 meses',
        consentPrefix: 'Acepto el uso de mis datos para retorno comercial.',
        privacyPolicy: 'Política de Privacidad',
        privacyNote: 'Privacidad: tus datos se usan solo para análisis y retorno sobre este contacto.',
        submitButton: 'Enviar briefing',
        whatsappButton: 'Hablar por WhatsApp (próximamente)',
        receiveTitle: 'Lo que recibes en 48h',
        receive1: 'Alcance inicial con prioridades.',
        receive2: 'Principales riesgos técnicos mapeados.',
        receive3: 'Próximos pasos de implementación.',
        directContact: 'Contacto directo',
        remoteSupport: 'Atención remota en Brasil.'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setupLanguageSystem();
    setupMobileMenu();
    setupRevealOnScroll();
    setupDragCarousels();
    setupProjectFilters();
    setupProjectCarousels();
    setupProcessFlow();
    setupServiceTabs();
    setupContactForm();
    setupRoiCalculator();
    setupCookieBanner();
});

function normalizeLanguage(value) {
    if (typeof value !== 'string') return 'pt';
    const language = value.trim().toLowerCase();
    if (language.startsWith('en')) return 'en';
    if (language.startsWith('es')) return 'es';
    return 'pt';
}

function readStoredLanguage() {
    try {
        const rawValue = window.localStorage.getItem(SITE_LANGUAGE_KEY);
        if (!rawValue) return null;
        return normalizeLanguage(rawValue);
    } catch (error) {
        return null;
    }
}

function saveStoredLanguage(language) {
    try {
        window.localStorage.setItem(SITE_LANGUAGE_KEY, normalizeLanguage(language));
    } catch (error) {
        // ignore storage errors
    }
}

function getCurrentLanguage() {
    const stored = readStoredLanguage();
    if (stored) return stored;

    return normalizeLanguage(window.navigator.language || 'pt');
}

function getUIText() {
    const currentLanguage = getCurrentLanguage();
    return UI_TEXT[currentLanguage] || UI_TEXT.pt;
}

function formatTemplate(template, params = {}) {
    return String(template).replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ''));
}

function renderLanguageSwitcher(activeLanguage) {
    const navMenu = document.querySelector('.nav-menu');
    if (!(navMenu instanceof HTMLElement)) return;

    const existingSwitcher = navMenu.querySelector('.nav-language');
    if (existingSwitcher) existingSwitcher.remove();

    const labels = getUIText();
    const container = document.createElement('li');
    container.className = 'nav-language';

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', labels.ariaLanguageSelector);

    LANGUAGE_OPTIONS.forEach((language) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'lang-btn';
        button.setAttribute('data-lang', language);
        button.setAttribute('aria-pressed', String(language === activeLanguage));
        button.textContent = language.toUpperCase();

        if (language === activeLanguage) {
            button.classList.add('is-active');
        }

        button.addEventListener('click', () => {
            const nextLanguage = normalizeLanguage(language);
            if (nextLanguage === getCurrentLanguage()) return;

            saveStoredLanguage(nextLanguage);
            window.location.reload();
        });

        switcher.appendChild(button);
    });

    container.appendChild(switcher);

    const ctaItem = navMenu.querySelector('.nav-cta');
    if (ctaItem instanceof HTMLElement) {
        navMenu.insertBefore(container, ctaItem);
    } else {
        navMenu.appendChild(container);
    }
}

function normalizeTextKey(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
}

function applyStaticTranslations(language) {
    if (language === 'pt') return;
    const dictionary = STATIC_TEXT[language];
    if (!dictionary) return;

    const ignoredTags = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'TEXTAREA']);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];

    while (walker.nextNode()) {
        const node = walker.currentNode;
        const parent = node.parentElement;
        if (!parent || ignoredTags.has(parent.tagName)) continue;

        const raw = node.nodeValue || '';
        const key = normalizeTextKey(raw);
        if (!key || !dictionary[key]) continue;
        nodes.push(node);
    }

    nodes.forEach((node) => {
        const raw = node.nodeValue || '';
        const key = normalizeTextKey(raw);
        const translated = dictionary[key];
        if (!translated) return;
        const leading = (raw.match(/^\s*/) || [''])[0];
        const trailing = (raw.match(/\s*$/) || [''])[0];
        node.nodeValue = `${leading}${translated}${trailing}`;
    });

    const translatableAttrs = ['placeholder', 'aria-label', 'title', 'value'];
    document.querySelectorAll('[placeholder], [aria-label], [title], input[type="submit"], input[type="button"]').forEach((element) => {
        translatableAttrs.forEach((attr) => {
            const currentValue = element.getAttribute(attr);
            if (!currentValue) return;
            const key = normalizeTextKey(currentValue);
            const translated = dictionary[key];
            if (translated) {
                element.setAttribute(attr, translated);
            }
        });
    });
}

function applyContactPageTranslations(language) {
    const text = CONTACT_PAGE_TEXT[language];
    if (!text) return;

    const contactForm = document.querySelector('#contact-form');
    if (!(contactForm instanceof HTMLFormElement)) return;

    const setText = (selector, value) => {
        const element = document.querySelector(selector);
        if (element instanceof HTMLElement) {
            element.textContent = value;
        }
    };

    const setAttr = (selector, attr, value) => {
        const element = document.querySelector(selector);
        if (element instanceof HTMLElement) {
            element.setAttribute(attr, value);
        }
    };

    const setOptionText = (selectId, optionValue, value) => {
        const select = document.getElementById(selectId);
        if (!(select instanceof HTMLSelectElement)) return;
        const option = Array.from(select.options).find((item) => item.value === optionValue);
        if (option) option.textContent = value;
    };

    document.title = text.title;
    setText('.page-header .kicker', text.kicker);
    setText('.page-header .page-title', text.pageTitle);
    setText('.page-header .page-subtitle', text.pageSubtitle);
    setText('.form-card h2', text.formTitle);

    const stepTitles = document.querySelectorAll('.form-step > h3');
    if (stepTitles[0] instanceof HTMLElement) stepTitles[0].textContent = text.stepContact;
    if (stepTitles[1] instanceof HTMLElement) stepTitles[1].textContent = text.stepContext;
    if (stepTitles[2] instanceof HTMLElement) stepTitles[2].textContent = text.stepGoals;

    setText('label[for="name"]', text.labelName);
    setText('label[for="email"]', text.labelEmail);
    setText('label[for="company"]', text.labelCompany);
    setText('label[for="service"]', text.labelService);
    setText('label[for="budget"]', text.labelBudget);
    setText('label[for="timeline"]', text.labelTimeline);
    setText('label[for="message"]', text.labelMessage);
    setAttr('#message', 'placeholder', text.messagePlaceholder);

    setOptionText('service', '', text.servicePlaceholder);
    setOptionText('service', 'automacao', text.serviceAutomation);
    setOptionText('service', 'sistemas-internos', text.serviceInternal);
    setOptionText('service', 'plataformas', text.servicePlatform);
    setOptionText('service', 'diagnostico', text.serviceDiagnostic);
    setOptionText('service', 'outro', text.serviceOther);

    setOptionText('budget', '', text.budgetPlaceholder);
    setOptionText('budget', 'ate-15k', text.budgetUpTo15);
    setOptionText('budget', '15k-40k', text.budget15To40);
    setOptionText('budget', '40k-80k', text.budget40To80);
    setOptionText('budget', '80k-plus', text.budget80Plus);

    setOptionText('timeline', '', text.timelinePlaceholder);
    setOptionText('timeline', 'urgente', text.timelineUrgent);
    setOptionText('timeline', 'curto', text.timelineShort);
    setOptionText('timeline', 'medio', text.timelineMedium);
    setOptionText('timeline', 'longo', text.timelineLong);

    const consentLabel = document.querySelector('label[for="consent"]');
    if (consentLabel instanceof HTMLLabelElement) {
        consentLabel.innerHTML = `${text.consentPrefix} <a href="politica-de-privacidade.html">${text.privacyPolicy}</a>.`;
    }

    const privacyNote = document.querySelector('.checkbox-group + p');
    if (privacyNote instanceof HTMLElement) {
        privacyNote.textContent = text.privacyNote;
    }

    setText('#contact-submit', text.submitButton);
    setText('.hero-actions a.btn.btn-ghost', text.whatsappButton);

    setText('.contact-card h3', text.receiveTitle);
    const receiveItems = document.querySelectorAll('.contact-card .project-list li');
    if (receiveItems[0] instanceof HTMLElement) receiveItems[0].textContent = text.receive1;
    if (receiveItems[1] instanceof HTMLElement) receiveItems[1].textContent = text.receive2;
    if (receiveItems[2] instanceof HTMLElement) receiveItems[2].textContent = text.receive3;

    setText('.sidebar-card h3', text.directContact);
    const sidebarParagraphs = document.querySelectorAll('.sidebar-card p');
    if (sidebarParagraphs[2] instanceof HTMLParagraphElement) {
        sidebarParagraphs[2].innerHTML = '<i class="fas fa-globe"></i> ' + text.remoteSupport;
    }
}

function setupLanguageSystem() {
    const savedLanguage = readStoredLanguage();
    const browserLanguage = normalizeLanguage(window.navigator.language || 'pt');
    const activeLanguage = savedLanguage || browserLanguage;

    saveStoredLanguage(activeLanguage);
    document.documentElement.lang = activeLanguage === 'pt' ? 'pt-BR' : activeLanguage;

    renderLanguageSwitcher(activeLanguage);
    applyStaticTranslations(activeLanguage);
    applyContactPageTranslations(activeLanguage);
}

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!(menuToggle instanceof HTMLButtonElement) || !(navMenu instanceof HTMLElement)) {
        return;
    }

    const closeMenu = () => {
        menuToggle.classList.remove('is-open');
        navMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
        menuToggle.classList.add('is-open');
        navMenu.classList.add('is-open');
        menuToggle.setAttribute('aria-expanded', 'true');
    };

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navMenu.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.closest('a')) {
            closeMenu();
        }
    });

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Node)) return;

        const clickInsideMenu = navMenu.contains(target);
        const clickOnButton = menuToggle.contains(target);
        if (!clickInsideMenu && !clickOnButton) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
            menuToggle.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
}

function setupRevealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-on-scroll');
    if (!revealElements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => observer.observe(element));
}

function setupDragCarousels() {
    const tracks = document.querySelectorAll('[data-drag-carousel-track]');
    if (!tracks.length || !('PointerEvent' in window)) return;

    tracks.forEach((track) => {
        if (!(track instanceof HTMLElement)) return;

        let pointerId = null;
        let startX = 0;
        let startScroll = 0;
        let moved = false;
        const dragThreshold = 6;

        const onPointerDown = (event) => {
            if (event.button !== 0 && event.pointerType === 'mouse') return;
            pointerId = event.pointerId;
            startX = event.clientX;
            startScroll = track.scrollLeft;
            moved = false;
        };

        const onPointerMove = (event) => {
            if (pointerId !== event.pointerId) return;

            const deltaX = event.clientX - startX;
            if (!moved && Math.abs(deltaX) >= dragThreshold) {
                moved = true;
                track.classList.add('is-dragging');
            }

            if (!moved) return;
            track.scrollLeft = startScroll - deltaX;
        };

        const onPointerEnd = (event) => {
            if (pointerId !== event.pointerId) return;
            track.classList.remove('is-dragging');
            pointerId = null;
            moved = false;
        };

        track.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerEnd);
        window.addEventListener('pointercancel', onPointerEnd);
    });
}

function setupProjectFilters() {
    const filterScopes = document.querySelectorAll('[data-filter-scope]');
    if (!filterScopes.length) return;

    filterScopes.forEach((scope) => {
        const chips = scope.querySelectorAll('[data-filter]');
        const cards = scope.querySelectorAll('[data-category]');
        if (!chips.length || !cards.length) return;

        const applyFilter = (filterValue) => {
            cards.forEach((card) => {
                const categories = (card.getAttribute('data-category') || '')
                    .split(',')
                    .map((item) => item.trim().toLowerCase())
                    .filter(Boolean);
                const shouldShow = filterValue === 'all' || categories.includes(filterValue);
                card.hidden = !shouldShow;
            });
        };

        chips.forEach((chip) => {
            chip.addEventListener('click', () => {
                chips.forEach((button) => {
                    button.classList.remove('is-active');
                    button.setAttribute('aria-pressed', 'false');
                });
                chip.classList.add('is-active');
                chip.setAttribute('aria-pressed', 'true');

                const value = (chip.getAttribute('data-filter') || 'all').toLowerCase();
                applyFilter(value);
                scope.querySelectorAll('[data-carousel]').forEach((carousel) => {
                    carousel.dispatchEvent(new Event('carousel-refresh'));
                });
            });
        });
    });
}

function setupProjectCarousels() {
    const carousels = document.querySelectorAll('[data-carousel]');
    if (!carousels.length) return;
    const uiText = getUIText();

    carousels.forEach((carousel) => {
        const track = carousel.querySelector('[data-carousel-track]');
        const prevButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');
        const dotsContainer = carousel.querySelector('[data-carousel-dots]');

        if (!(track instanceof HTMLElement) || !(prevButton instanceof HTMLButtonElement) || !(nextButton instanceof HTMLButtonElement) || !(dotsContainer instanceof HTMLElement)) {
            return;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let dots = [];
        let scrollTicking = false;
        let activeIndex = 0;
        let dragPointerId = null;
        let dragStartX = 0;
        let dragStartScroll = 0;
        let dragMoved = false;
        let suppressClickUntil = 0;
        const DRAG_THRESHOLD = 6;

        const getVisibleSlides = () =>
            Array.from(track.querySelectorAll('.project-card-v2')).filter((slide) => !slide.hidden);

        const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

        const getMaxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);

        const getSlideTarget = (slide) => {
            if (!(slide instanceof HTMLElement)) return 0;
            const centeredOffset = slide.offsetLeft + (slide.offsetWidth / 2) - (track.clientWidth / 2);
            return clamp(centeredOffset, 0, getMaxScroll());
        };

        const clearCenterState = () => {
            Array.from(track.querySelectorAll('.project-card-v2')).forEach((slide) => {
                slide.classList.remove('is-center');
                slide.removeAttribute('aria-current');
            });
        };

        const getNearestSlideIndex = () => {
            const slides = getVisibleSlides();
            if (!slides.length) return -1;

            let closestIndex = 0;
            let shortestDistance = Number.POSITIVE_INFINITY;
            const currentPosition = track.scrollLeft;

            slides.forEach((slide, index) => {
                const distance = Math.abs(getSlideTarget(slide) - currentPosition);
                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    closestIndex = index;
                }
            });

            return closestIndex;
        };

        const setCenterSlide = (index) => {
            const slides = getVisibleSlides();
            clearCenterState();
            if (!slides.length) {
                activeIndex = 0;
                return;
            }

            const safeIndex = clamp(index, 0, slides.length - 1);
            const activeSlide = slides[safeIndex];
            activeSlide.classList.add('is-center');
            activeSlide.setAttribute('aria-current', 'true');
            activeIndex = safeIndex;
        };

        const updateDots = () => {
            if (!dots.length) return;
            dots.forEach((dot, index) => {
                const isActive = index === activeIndex;
                dot.classList.toggle('is-active', isActive);
                dot.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        };

        const updateControls = () => {
            const slides = getVisibleSlides();
            const canScroll = slides.length > 1 && getMaxScroll() > 6;
            carousel.classList.toggle('is-static', !canScroll);
            prevButton.disabled = !canScroll || activeIndex <= 0;
            nextButton.disabled = !canScroll || activeIndex >= slides.length - 1;
        };

        const syncCenterState = () => {
            const nearestIndex = getNearestSlideIndex();
            if (nearestIndex < 0) {
                clearCenterState();
                updateControls();
                updateDots();
                return;
            }

            setCenterSlide(nearestIndex);
            updateControls();
            updateDots();
        };

        const scrollToSlide = (index, behavior = 'smooth') => {
            const slides = getVisibleSlides();
            if (!slides.length) return;

            const safeIndex = clamp(index, 0, slides.length - 1);
            const targetSlide = slides[safeIndex];
            const finalBehavior = prefersReducedMotion ? 'auto' : behavior;

            track.scrollTo({
                left: getSlideTarget(targetSlide),
                behavior: finalBehavior
            });

            setCenterSlide(safeIndex);
            updateControls();
            updateDots();
        };

        const buildDots = () => {
            dotsContainer.innerHTML = '';
            dots = [];

            const visibleSlides = getVisibleSlides();
            if (visibleSlides.length <= 1) return;

            Array.from({ length: visibleSlides.length }).forEach((_, index) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'carousel-dot';
                dot.setAttribute('aria-label', formatTemplate(uiText.carouselDot, { index: index + 1 }));
                dot.addEventListener('click', () => scrollToSlide(index));
                dotsContainer.appendChild(dot);
                dots.push(dot);
            });
        };

        const refreshCarousel = (resetPosition = true) => {
            const slides = getVisibleSlides();
            buildDots();

            if (!slides.length) {
                clearCenterState();
                updateControls();
                return;
            }

            const initialIndex = resetPosition ? 0 : clamp(activeIndex, 0, slides.length - 1);
            scrollToSlide(initialIndex, 'auto');
            syncCenterState();
        };

        prevButton.addEventListener('click', () => {
            syncCenterState();
            scrollToSlide(activeIndex - 1);
        });

        nextButton.addEventListener('click', () => {
            syncCenterState();
            scrollToSlide(activeIndex + 1);
        });

        track.addEventListener('scroll', () => {
            if (scrollTicking) return;
            scrollTicking = true;
            window.requestAnimationFrame(() => {
                syncCenterState();
                scrollTicking = false;
            });
        });

        track.addEventListener(
            'click',
            (event) => {
                if (Date.now() < suppressClickUntil) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            },
            true
        );

        if ('PointerEvent' in window) {
            const onPointerDown = (event) => {
                if (event.button !== 0 && event.pointerType === 'mouse') return;
                if (getVisibleSlides().length <= 1) return;

                dragPointerId = event.pointerId;
                dragStartX = event.clientX;
                dragStartScroll = track.scrollLeft;
                dragMoved = false;
            };

            const onPointerMove = (event) => {
                if (dragPointerId !== event.pointerId) return;
                const deltaX = event.clientX - dragStartX;

                if (!dragMoved && Math.abs(deltaX) >= DRAG_THRESHOLD) {
                    dragMoved = true;
                    track.classList.add('is-dragging');
                }

                if (!dragMoved) {
                    return;
                }

                track.scrollLeft = dragStartScroll - deltaX;
            };

            const onPointerEnd = (event) => {
                if (dragPointerId !== event.pointerId) return;

                track.classList.remove('is-dragging');

                if (dragMoved) {
                    suppressClickUntil = Date.now() + 220;
                    scrollToSlide(getNearestSlideIndex());
                }

                dragPointerId = null;
                dragMoved = false;
            };

            track.addEventListener('pointerdown', onPointerDown);
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerEnd);
            window.addEventListener('pointercancel', onPointerEnd);
        }

        window.addEventListener('resize', () => refreshCarousel(false));
        carousel.addEventListener('carousel-refresh', () => refreshCarousel(true));

        refreshCarousel(false);
    });
}

function setupProcessFlow() {
    const flows = document.querySelectorAll('[data-process-flow]');
    if (!flows.length) return;
    const uiText = getUIText();

    flows.forEach((flow) => {
        const buttons = flow.querySelectorAll('[data-process-step]');
        const panels = flow.querySelectorAll('[data-process-panel]');
        const track = flow.querySelector('[data-process-track]');
        const prevButton = flow.querySelector('[data-process-prev]');
        const nextButton = flow.querySelector('[data-process-next]');
        const indexMarker = flow.querySelector('[data-process-index]');

        if (
            !(track instanceof HTMLElement) ||
            !panels.length ||
            !(prevButton instanceof HTMLButtonElement) ||
            !(nextButton instanceof HTMLButtonElement) ||
            !(indexMarker instanceof HTMLElement)
        ) {
            return;
        }

        const maxIndex = panels.length - 1;
        let activeStep = 0;

        const setStep = (stepIndex) => {
            const safeIndex = Math.min(Math.max(stepIndex, 0), maxIndex);
            activeStep = safeIndex;

            if (buttons.length) {
                buttons.forEach((button) => {
                    const index = Number.parseInt(button.getAttribute('data-process-step') || '0', 10);
                    const isActive = index === safeIndex;
                    button.classList.toggle('is-active', isActive);
                    button.setAttribute('aria-selected', String(isActive));
                });
            }

            panels.forEach((panel) => {
                const index = Number.parseInt(panel.getAttribute('data-process-panel') || '-1', 10);
                const isActive = index === safeIndex;
                panel.setAttribute('aria-hidden', String(!isActive));
                panel.tabIndex = isActive ? 0 : -1;
            });

            track.style.transform = `translateX(-${safeIndex * 100}%)`;
            indexMarker.textContent = String(safeIndex + 1);
            prevButton.disabled = safeIndex === 0;
            nextButton.innerHTML = safeIndex >= maxIndex
                ? uiText.processRestart
                : uiText.processNext;
        };

        if (buttons.length) {
            buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    const index = Number.parseInt(button.getAttribute('data-process-step') || '0', 10);
                    setStep(index);
                });
            });
        }

        prevButton.addEventListener('click', () => {
            const previous = activeStep <= 0 ? 0 : activeStep - 1;
            setStep(previous);
        });

        nextButton.addEventListener('click', () => {
            const next = activeStep >= maxIndex ? 0 : activeStep + 1;
            setStep(next);
        });

        setStep(0);
    });
}

function setupServiceTabs() {
    const tabGroups = document.querySelectorAll('[data-tab-group]');
    if (!tabGroups.length) return;

    tabGroups.forEach((group) => {
        const tabButtons = group.querySelectorAll('[data-tab]');
        const panels = group.querySelectorAll('[data-tab-panel]');
        if (!tabButtons.length || !panels.length) return;

        const setTab = (tabId) => {
            tabButtons.forEach((button) => {
                const isActive = button.getAttribute('data-tab') === tabId;
                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-selected', String(isActive));
            });

            panels.forEach((panel) => {
                const isActive = panel.getAttribute('data-tab-panel') === tabId;
                panel.hidden = !isActive;
            });
        };

        tabButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                if (!tabId) return;
                setTab(tabId);
            });
        });
    });
}

function setupContactForm() {
    const contactForm = document.querySelector('#contact-form');
    const formStatus = document.querySelector('#form-status');
    const submitButton = document.querySelector('#contact-submit');
    const uiText = getUIText();

    if (!(contactForm instanceof HTMLFormElement) || !(formStatus instanceof HTMLElement) || !(submitButton instanceof HTMLButtonElement)) {
        return;
    }

    const endpointFromAttr = contactForm.dataset.endpoint;
    const endpoint = window.location.protocol === 'file:'
        ? 'http://localhost:8787/api/contact'
        : (
            endpointFromAttr && endpointFromAttr.trim().length > 0
                ? endpointFromAttr
                : 'http://localhost:8787/api/contact'
        );

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            formStatus.textContent = uiText.contactRequired;
            formStatus.setAttribute('data-state', 'error');
            contactForm.reportValidity();
            return;
        }

        const formData = new FormData(contactForm);
        const payload = {};
        formData.forEach((value, key) => {
            payload[key] = typeof value === 'string' ? value.trim() : value;
        });
        payload.consent = formData.get('consent') === 'on';

        submitButton.disabled = true;
        submitButton.textContent = uiText.contactSendingButton;
        formStatus.textContent = uiText.contactSendingStatus;
        formStatus.removeAttribute('data-state');

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            let result = {};
            try {
                result = await response.json();
            } catch (error) {
                result = {};
            }

            if (!response.ok) {
                throw new Error(result.message || 'Falha ao enviar contato.');
            }

            formStatus.textContent = uiText.contactSuccess;
            formStatus.setAttribute('data-state', 'success');
            contactForm.reset();
        } catch (error) {
            formStatus.textContent = error instanceof Error ? error.message : uiText.contactFallbackError;
            formStatus.setAttribute('data-state', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = uiText.contactSubmitDefault;
        }
    });
}

function setupRoiCalculator() {
    const calculatorForm = document.querySelector('#roi-calculator');
    const resultBox = document.querySelector('#roi-result');
    const uiText = getUIText();

    if (!(calculatorForm instanceof HTMLFormElement) || !(resultBox instanceof HTMLElement)) {
        return;
    }

    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
    });

    const readNumber = (id) => {
        const input = calculatorForm.querySelector(`#${id}`);
        if (!(input instanceof HTMLInputElement)) return 0;
        const numericValue = Number(input.value);
        return Number.isFinite(numericValue) && numericValue >= 0 ? numericValue : 0;
    };

    const calculate = () => {
        const people = readNumber('people');
        const hourlyCost = readNumber('hourlyCost');
        const hoursLost = readNumber('hoursLost');
        const errorCost = readNumber('errorCost');

        const monthlyHoursLost = people * hoursLost * 4.33;
        const monthlyWasteWithTime = monthlyHoursLost * hourlyCost;
        const monthlyTotalWaste = monthlyWasteWithTime + errorCost;
        const annualWaste = monthlyTotalWaste * 12;

        resultBox.innerHTML = `
            <p><strong>${uiText.roiMonthlyCost}</strong> ${currencyFormatter.format(monthlyTotalWaste)}</p>
            <p><strong>${uiText.roiAnnualCost}</strong> ${currencyFormatter.format(annualWaste)}</p>
            <p><strong>${uiText.roiRecovery}</strong> ${currencyFormatter.format(monthlyTotalWaste * 0.4)}</p>
        `;
    };

    calculatorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!calculatorForm.checkValidity()) {
            calculatorForm.reportValidity();
            return;
        }
        calculate();
    });

    calculate();
}

function setupCookieBanner() {
    const consentKey = 'rockdev_cookie_consent_v1';
    const uiText = getUIText();

    const readConsent = () => {
        try {
            return window.localStorage.getItem(consentKey);
        } catch (error) {
            return null;
        }
    };

    const writeConsent = (value) => {
        try {
            window.localStorage.setItem(consentKey, value);
        } catch (error) {
            // ignore storage errors
        }
    };

    if (readConsent() === 'accepted' || readConsent() === 'rejected') {
        return;
    }

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', uiText.cookieAria);
    banner.innerHTML = `
        <div class="cookie-banner-content">
            <p>${uiText.cookieText}</p>
            <div class="cookie-banner-actions">
                <button type="button" class="btn btn-neon-outline" data-cookie-action="reject">${uiText.cookieReject}</button>
                <button type="button" class="btn btn-neon" data-cookie-action="accept">${uiText.cookieAccept}</button>
            </div>
        </div>
    `;

    document.body.appendChild(banner);

    const acceptButton = banner.querySelector('[data-cookie-action="accept"]');
    const rejectButton = banner.querySelector('[data-cookie-action="reject"]');

    const setConsent = (value) => {
        writeConsent(value);
        banner.classList.remove('is-visible');
        window.setTimeout(() => banner.remove(), 180);
    };

    if (acceptButton instanceof HTMLButtonElement) {
        acceptButton.addEventListener('click', () => setConsent('accepted'));
    }

    if (rejectButton instanceof HTMLButtonElement) {
        rejectButton.addEventListener('click', () => setConsent('rejected'));
    }

    window.requestAnimationFrame(() => {
        banner.classList.add('is-visible');
    });
}
