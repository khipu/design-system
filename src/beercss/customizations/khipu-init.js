/**
 * Khipu Material Design 3 Initialization
 * Vanilla JavaScript initialization for BeerCSS components
 *
 * Provides initialization for:
 * - Mobile sidenav toggle
 * - Flash messages auto-dismiss
 * - Modal dialogs
 * - Programmatic snackbar API
 * - Expand toggle panels
 * - Clipboard copy rows
 * - Countdown timers
 * - Segmented tabs
 * - Sticky invoice card (collapse on scroll)
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

        // Initialize new Khipu Sidebar (if available)
        if (typeof window.KhipuSidebar !== 'undefined') {
            window.KhipuSidebar.init();
        }

        // Initialize sidenav toggle (legacy support)
        initSidenav();

        // Initialize flash messages auto-dismiss
        initFlashMessages();

        // Initialize modals
        initModals();

        // Initialize payment flow components
        initExpandToggle();
        initCopyRow();
        initCountdown();
        initSegmentedTabs();
        initStickyInvoice();

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
     * Initialize expand toggle panels
     * Delegated click on [data-expand-toggle] toggles aria-expanded and .open on target panel
     * @param {Element} root - Root element to scope listeners (default: document)
     */
    function initExpandToggle(root) {
        root = root || document;
        root.addEventListener('click', function(e) {
            var toggle = e.target.closest('[data-expand-toggle]');
            if (!toggle) return;

            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));

            var panelId = toggle.getAttribute('aria-controls');
            var panel = panelId
                ? document.getElementById(panelId)
                : toggle.parentElement.querySelector('[data-expand-panel]');

            if (panel) {
                if (expanded) {
                    panel.classList.remove('open');
                } else {
                    panel.classList.add('open');
                }
            }
        });
    }

    /**
     * Initialize clipboard copy rows
     * Delegated click on .kds-copy-row[data-copy] copies value and shows feedback
     * Delegated click on .kds-copy-all[data-copy-all] copies all values from target
     * @param {Element} root - Root element to scope listeners (default: document)
     */
    function initCopyRow(root) {
        root = root || document;

        root.addEventListener('click', function(e) {
            // Single copy row
            var row = e.target.closest('.kds-copy-row[data-copy]');
            if (row) {
                navigator.clipboard.writeText(row.dataset.copy).then(function() {
                    row.classList.add('copied');
                    setTimeout(function() {
                        row.classList.remove('copied');
                    }, 1200);
                });
                return;
            }

            // Copy all button
            var copyAll = e.target.closest('.kds-copy-all[data-copy-all]');
            if (copyAll) {
                var targetSelector = copyAll.dataset.copyAll;
                var container = targetSelector
                    ? document.querySelector(targetSelector)
                    : copyAll.closest('.kds-copy-header').nextElementSibling;
                if (!container) return;

                var rows = container.querySelectorAll('[data-copy]');
                var values = [];
                rows.forEach(function(r) { values.push(r.dataset.copy); });
                navigator.clipboard.writeText(values.join('\n')).then(function() {
                    rows.forEach(function(r) {
                        r.classList.add('copied');
                        setTimeout(function() {
                            r.classList.remove('copied');
                        }, 1200);
                    });
                });
            }
        });
    }

    /**
     * Initialize countdown timers
     * Selects .kds-countdown[data-deadline] and updates every second
     * Adds .urgent class when remaining < 5 minutes
     * Dispatches kds:countdown:expired when reaching 0
     * @param {Element} root - Root element to scope queries (default: document)
     */
    function initCountdown(root) {
        root = root || document;
        var countdowns = root.querySelectorAll('.kds-countdown[data-deadline]');

        countdowns.forEach(function(el) {
            var deadline = new Date(el.dataset.deadline).getTime();
            var serverNow = el.dataset.serverNow
                ? new Date(el.dataset.serverNow).getTime()
                : Date.now();
            var delta = Date.now() - serverNow;

            var hSpan = el.querySelector('[data-h]');
            var mSpan = el.querySelector('[data-m]');
            var sSpan = el.querySelector('[data-s]');

            function pad(n) { return n < 10 ? '0' + n : String(n); }

            function tick() {
                var now = Date.now() - delta;
                var remaining = Math.max(0, deadline - now);
                var totalSec = Math.floor(remaining / 1000);
                var h = Math.floor(totalSec / 3600);
                var m = Math.floor((totalSec % 3600) / 60);
                var s = totalSec % 60;

                if (hSpan) hSpan.textContent = pad(h);
                if (mSpan) mSpan.textContent = pad(m);
                if (sSpan) sSpan.textContent = pad(s);

                if (remaining < 300000) {
                    el.classList.add('urgent');
                }

                if (remaining <= 0) {
                    clearInterval(interval);
                    el.dispatchEvent(new CustomEvent('kds:countdown:expired', { bubbles: true }));
                }
            }

            tick();
            var interval = setInterval(tick, 1000);
        });
    }

    /**
     * Initialize segmented tabs
     * Delegated click on .kds-segmented-tabs button toggles .active and aria-selected
     * Dispatches kds:tab:change with { index, button }
     * @param {Element} root - Root element to scope listeners (default: document)
     */
    function initSegmentedTabs(root) {
        root = root || document;
        root.addEventListener('click', function(e) {
            var btn = e.target.closest('.kds-segmented-tabs button');
            if (!btn) return;

            var tabs = btn.closest('.kds-segmented-tabs');
            var buttons = tabs.querySelectorAll('button');

            buttons.forEach(function(b) {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            var index = Array.prototype.indexOf.call(buttons, btn);
            tabs.dispatchEvent(new CustomEvent('kds:tab:change', {
                bubbles: true,
                detail: { index: index, button: btn }
            }));
        });
    }

    /**
     * Initialize sticky invoice card collapse on scroll
     * Toggles .collapsed class on .kds-invoice-sticky when user scrolls past threshold
     * Works with multiple screens - targets sticky element in currently active screen
     * Uses hysteresis (different thresholds for collapse/expand) to prevent oscillation
     * @param {Element} root - Root element to scope queries (default: document)
     */
    function initStickyInvoice(root) {
        root = root || document;

        var collapseAt = 60;   // px scrolled to collapse
        var expandAt = 20;     // px scrolled to expand (lower = hysteresis)
        var collapsedStates = {}; // Track collapsed state per screen

        function onScroll() {
            // Find sticky element in currently active screen
            var activeScreen = root.querySelector('.kds-screen.active');
            if (!activeScreen) return;

            var sticky = activeScreen.querySelector('.kds-invoice-sticky');
            if (!sticky) return;

            var screenId = activeScreen.id || 'default';
            var isCollapsed = collapsedStates[screenId] || false;
            var scrollY = window.scrollY || window.pageYOffset;

            if (!isCollapsed && scrollY > collapseAt) {
                sticky.classList.add('collapsed');
                collapsedStates[screenId] = true;
            } else if (isCollapsed && scrollY < expandAt) {
                sticky.classList.remove('collapsed');
                collapsedStates[screenId] = false;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
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
    window.Khipu.initExpandToggle = initExpandToggle;
    window.Khipu.initCopyRow = initCopyRow;
    window.Khipu.initCountdown = initCountdown;
    window.Khipu.initSegmentedTabs = initSegmentedTabs;
    window.Khipu.initStickyInvoice = initStickyInvoice;

    // Also export showSnackbar to global scope for backward compatibility
    window.showSnackbar = showSnackbar;

})();
