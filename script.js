document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
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

    const contactForm = document.querySelector('#contact-form');
    const formStatus = document.querySelector('#form-status');
    const submitButton = document.querySelector('#contact-submit');

    if (contactForm instanceof HTMLFormElement && formStatus && submitButton instanceof HTMLButtonElement) {
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
});
