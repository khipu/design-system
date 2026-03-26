/**
 * Khipu Sidebar Navigation - Internal Interactions
 *
 * Maneja la interactividad interna del sidebar:
 * - Dropdown del header
 * - Cambio de nav item activo
 */

(function(global) {
    'use strict';

    /**
     * Toggle dropdown menu del header
     * @param {HTMLElement} sidebar - El sidebar element
     */
    function initHeaderDropdown(sidebar) {
        if (!sidebar) return;

        const header = sidebar.querySelector('.kds-sidebar-header');
        const dropdown = sidebar.querySelector('.kds-sidebar-header-dropdown');

        if (!header || !dropdown) return;

        // Toggle dropdown on header click
        header.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('kds-dropdown-open');

            // Rotate arrow icon
            const arrow = header.querySelector('.kds-sidebar-dropdown-icon');
            if (arrow) {
                arrow.style.transform = dropdown.classList.contains('kds-dropdown-open')
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target)) {
                dropdown.classList.remove('kds-dropdown-open');
                const arrow = header.querySelector('.kds-sidebar-dropdown-icon');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
            }
        });

        // Close dropdown when clicking on a dropdown option
        const dropdownOptions = dropdown.querySelectorAll('a');
        dropdownOptions.forEach(option => {
            option.addEventListener('click', function() {
                dropdown.classList.remove('kds-dropdown-open');
                const arrow = header.querySelector('.kds-sidebar-dropdown-icon');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    /**
     * Maneja cambio de nav item activo
     * @param {HTMLElement} sidebar - El sidebar element
     */
    function initNavItems(sidebar) {
        if (!sidebar) return;

        const navItems = sidebar.querySelectorAll('.kds-sidebar-nav-item');

        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Si tiene href="#", prevenir navegación
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }

                // Remove active class from all items
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });

                // Add active class to clicked item
                this.classList.add('active');

                // Dispatch custom event
                const event = new CustomEvent('kds-sidebar-nav-change', {
                    detail: {
                        item: this,
                        text: this.querySelector('span')?.textContent || ''
                    },
                    bubbles: true
                });
                sidebar.dispatchEvent(event);
            });
        });
    }

    /**
     * Mobile hamburger toggle
     */
    function initMobileMenu() {
        const hamburger = document.querySelector('.kds-hamburger-btn');
        const closeBtn = document.querySelector('.kds-sidebar-close-btn');
        const sidebar = document.querySelector('.kds-sidebar');

        if (!hamburger || !sidebar) return;

        // Toggle sidebar con hamburger
        hamburger.addEventListener('click', function() {
            sidebar.classList.toggle('kds-sidebar-open');
        });

        // Cerrar sidebar con botón close
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                sidebar.classList.remove('kds-sidebar-open');
            });
        }

        // Cerrar con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('kds-sidebar-open')) {
                sidebar.classList.remove('kds-sidebar-open');
            }
        });
    }

    /**
     * Initialize sidebar internal interactions
     * @param {Object} options - Configuration options
     * @param {string} options.sidebarSelector - CSS selector for sidebar element
     */
    function init(options = {}) {
        const config = {
            sidebarSelector: options.sidebarSelector || '.kds-sidebar'
        };

        const sidebar = document.querySelector(config.sidebarSelector);
        if (!sidebar) {
            console.warn('[Khipu Sidebar] Sidebar not found with selector:', config.sidebarSelector);
            return;
        }

        // Initialize header dropdown
        initHeaderDropdown(sidebar);

        // Initialize nav items
        initNavItems(sidebar);

        // Initialize mobile menu
        initMobileMenu();

        console.log('[Khipu Sidebar] Initialized successfully');
    }

    // Export module
    const KhipuSidebar = {
        init: init
    };

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return KhipuSidebar;
        });
    }
    // CommonJS support
    else if (typeof module === 'object' && module.exports) {
        module.exports = KhipuSidebar;
    }
    // Browser global
    else {
        global.KhipuSidebar = KhipuSidebar;
    }

})(typeof window !== 'undefined' ? window : this);
