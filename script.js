document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) {
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

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
});
