document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupRevealOnScroll();
    setupContactForm();
    setupRoiCalculator();
    setupCookieBanner();
});

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) return;

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
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
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
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => observer.observe(element));
}

function setupContactForm() {
    const contactForm = document.querySelector('#contact-form');
    const formStatus = document.querySelector('#form-status');
    const submitButton = document.querySelector('#contact-submit');

    if (!(contactForm instanceof HTMLFormElement) || !formStatus || !(submitButton instanceof HTMLButtonElement)) {
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
            formStatus.textContent = 'Preencha todos os campos obrigatórios antes de enviar.';
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
        submitButton.textContent = 'Enviando...';
        formStatus.textContent = 'Enviando sua mensagem...';
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
            } catch (parseError) {
                result = {};
            }

            if (!response.ok) {
                throw new Error(result.message || 'Falha ao enviar contato.');
            }

            formStatus.textContent = 'Mensagem enviada com sucesso. Retornaremos em breve.';
            formStatus.setAttribute('data-state', 'success');
            contactForm.reset();
        } catch (error) {
            formStatus.textContent = error instanceof Error ? error.message : 'Erro inesperado ao enviar.';
            formStatus.setAttribute('data-state', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar briefing';
        }
    });
}

function setupRoiCalculator() {
    const calculatorForm = document.querySelector('#roi-calculator');
    const resultBox = document.querySelector('#roi-result');

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
        const potentialRecovery = monthlyTotalWaste * 0.4;

        resultBox.innerHTML = `
            <p><strong>Custo mensal estimado:</strong> ${currencyFormatter.format(monthlyTotalWaste)}</p>
            <p><strong>Custo anual estimado:</strong> ${currencyFormatter.format(annualWaste)}</p>
            <p><strong>Potencial de recuperação mensal (estimado em 40%):</strong> ${currencyFormatter.format(potentialRecovery)}</p>
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
            // Ignore storage errors and keep the banner hidden after interaction.
        }
    };
    const storedConsent = readConsent();

    if (storedConsent === 'accepted' || storedConsent === 'rejected') {
        return;
    }

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Consentimento de cookies');
    banner.innerHTML = `
        <div class="cookie-banner-content">
            <p>Usamos cookies essenciais para funcionamento do site e armazenamento da sua preferência. Leia a <a href="politica-de-privacidade.html">Política de Privacidade</a>.</p>
            <div class="cookie-banner-actions">
                <button type="button" class="btn btn-neon-outline" data-cookie-action="reject">Recusar</button>
                <button type="button" class="btn btn-neon" data-cookie-action="accept">Aceitar</button>
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
