/**
 * Khipu Material Design 3 Initialization
 * Vanilla JavaScript initialization for BeerCSS components
 *
 * Provides initialization for:
 * - Mobile sidenav toggle
 * - Flash messages auto-dismiss
 * - Modal dialogs
 * - Programmatic snackbar API
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initKhipuMaterial);
    } else {
        initKhipuMaterial();
    }

    /**
     * Main initialization function
     */
    function initKhipuMaterial() {
        console.log('Initializing Khipu Material Design components...');

        // Initialize sidenav toggle
        initSidenav();

        // Initialize flash messages auto-dismiss
        initFlashMessages();

        // Initialize modals
        initModals();

        console.log('Material Design initialization complete!');
    }

    /**
     * Initialize sidenav for mobile navigation
     */
    function initSidenav() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidenav = document.getElementById('material-sidenav');

        if (menuToggle && sidenav) {
            menuToggle.addEventListener('click', function() {
                // Beer CSS uses 'active' class to show/hide drawer
                sidenav.classList.toggle('active');
            });

            // Close sidenav when clicking outside
            document.addEventListener('click', function(event) {
                if (sidenav.classList.contains('active')) {
                    const isClickInside = sidenav.contains(event.target) || menuToggle.contains(event.target);
                    if (!isClickInside) {
                        sidenav.classList.remove('active');
                    }
                }
            });
        }
    }

    /**
     * Initialize flash messages with auto-dismiss
     */
    function initFlashMessages() {
        const snackbars = document.querySelectorAll('.snackbar[data-auto-dismiss="true"]');

        snackbars.forEach(function(snackbar) {
            // Auto-dismiss after 5 seconds
            setTimeout(function() {
                snackbar.classList.remove('active');
            }, 5000);
        });
    }

    /**
     * Initialize modal dialogs
     */
    function initModals() {
        // Beer CSS modals are activated via onclick="ui('#modal-id')"
        // Additional custom initialization can go here if needed
        window.closeModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
            }
        };
    }

    /**
     * Utility: Show a snackbar programmatically
     * @param {string} message - The message to display
     * @param {string} type - The type: 'info', 'success', 'error'
     * @param {number} duration - Duration in milliseconds (default: 5000)
     */
    function showSnackbar(message, type, duration) {
        type = type || 'info';
        duration = duration || 5000;

        const snackbar = document.createElement('div');
        snackbar.className = 'snackbar active ' + type;

        const icon = document.createElement('i');
        icon.className = 'material-symbols-outlined';
        icon.textContent = type === 'success' ? 'check_circle' : (type === 'error' ? 'error' : 'info');

        const span = document.createElement('span');
        span.textContent = message;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'transparent circle';
        closeBtn.innerHTML = '<i class="material-symbols-outlined">close</i>';
        closeBtn.onclick = function() {
            snackbar.classList.remove('active');
            setTimeout(function() {
                snackbar.remove();
            }, 300);
        };

        snackbar.appendChild(icon);
        snackbar.appendChild(span);
        snackbar.appendChild(closeBtn);

        document.body.appendChild(snackbar);

        setTimeout(function() {
            snackbar.classList.remove('active');
            setTimeout(function() {
                snackbar.remove();
            }, 300);
        }, duration);
    }

    // Export utilities to window for backward compatibility
    if (!window.Khipu) {
        window.Khipu = {};
    }
    window.Khipu.showSnackbar = showSnackbar;
    window.Khipu.closeModal = window.closeModal;

    // Also export showSnackbar to global scope for backward compatibility
    window.showSnackbar = showSnackbar;

})();
