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
 * - Bank modal (search and selection)
 * - Sticky invoice card (collapse on scroll)
 * - Brand inner (logo inside sticky card on mobile)
 * - Secure footer (moved inside last card per screen)
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
        initBrandInner();
        initSecureFooterInside();
        initExpandToggle();
        initCopyRow();
        initCopyableTable();
        initCopyAllBtn();
        initInfoTip();
        initCountdown();
        initSegmentedTabs();
        initStickyInvoice();
        initBankModal();

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
     * Inject .kds-brand-inner logo into each .kds-invoice-sticky card
     * On mobile the external .kds-brand-row is hidden via CSS; the inner brand
     * keeps the logo visible inside the sticky card as the user scrolls.
     * Clones the SVG from the nearest preceding .kds-brand-row so the logo
     * markup is defined once in HTML (single source of truth).
     * @param {Element} root - Root element to scope queries (default: document)
     */
    function initBrandInner(root) {
        root = root || document;
        var cards = root.querySelectorAll('.kds-invoice-sticky');

        cards.forEach(function(card) {
            // Skip if already injected
            if (card.querySelector('.kds-brand-inner')) return;

            // Find the brand-row logo for this screen (sibling before the sticky wrap)
            var screen = card.closest('.kds-screen') || card.parentElement;
            var brandRow = screen ? screen.querySelector('.kds-brand-row') : null;
            var logoSource = brandRow ? brandRow.querySelector('svg, img') : null;

            if (!logoSource) return;

            var inner = document.createElement('div');
            inner.className = 'kds-brand-inner';
            inner.appendChild(logoSource.cloneNode(true));
            card.insertBefore(inner, card.firstChild);
        });
    }

    /**
     * Move .kds-secure-footer inside the last card of each screen
     * In the design, the "Pago seguro procesado por Khipu" line lives
     * inside the bottom card, not as a standalone element.
     * @param {Element} root - Root element to scope queries (default: document)
     */
    function initSecureFooterInside(root) {
        root = root || document;
        var screens = root.querySelectorAll('.kds-screen');

        screens.forEach(function(screen) {
            var footer = screen.querySelector('.kds-secure-footer');
            if (!footer) return;

            // Find the last non-sticky card in the screen
            var cards = screen.querySelectorAll('.kds-card-elevated:not(.kds-invoice-sticky)');
            if (!cards.length) return;

            var lastCard = cards[cards.length - 1];

            // Move (not clone) the footer inside the last card
            footer.classList.add('inside');
            lastCard.appendChild(footer);
        });
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
     * Sets --_active-idx and --_tab-count CSS custom properties for sliding pill animation
     * Auto-manages tab panels via data-kds-tab-panel attributes on sibling elements
     * Dispatches kds:tab:change with { index, button }
     * @param {Element} root - Root element to scope listeners (default: document)
     */
    function initSegmentedTabs(root) {
        root = root || document;

        /* Set initial CSS vars and panel visibility on all segmented-tab containers */
        root.querySelectorAll('.kds-segmented-tabs').forEach(function(tabs) {
            var buttons = tabs.querySelectorAll('button');
            tabs.style.setProperty('--_tab-count', buttons.length);
            var activeIdx = 0;
            buttons.forEach(function(b, i) {
                if (b.classList.contains('active') || b.getAttribute('aria-selected') === 'true') activeIdx = i;
            });
            tabs.style.setProperty('--_active-idx', activeIdx);

            /* Auto-bind panels: find sibling elements with data-kds-tab-panel */
            var parent = tabs.parentElement;
            if (parent) {
                var panels = parent.querySelectorAll('[data-kds-tab-panel]');
                panels.forEach(function(panel, i) {
                    panel.hidden = i !== activeIdx;
                });
            }
        });

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
            tabs.style.setProperty('--_active-idx', index);

            /* Auto-toggle panels */
            var parent = tabs.parentElement;
            if (parent) {
                parent.querySelectorAll('[data-kds-tab-panel]').forEach(function(panel, i) {
                    panel.hidden = i !== index;
                });
            }

            tabs.dispatchEvent(new CustomEvent('kds:tab:change', {
                bubbles: true,
                detail: { index: index, button: btn }
            }));
        });
    }

    /**
     * Initialize bank modal
     * Handles opening, closing, search, and selection of banks
     * Delegated events for [data-open-bank-modal], [data-close-bank-modal], and bank selection
     * @param {Element} root - Root element to scope listeners (default: document)
     */
    function initBankModal(root) {
        root = root || document;

        var modal = root.querySelector('#bankModal');
        var searchInput = root.querySelector('#bankSearch');
        var bankList = root.querySelector('#bankModalList');
        var noResults = root.querySelector('#bankNoResults');

        if (!modal) return;

        /**
         * Filter banks by search query
         * @param {string} query - Search term
         */
        function filterBanks(query) {
            if (!bankList) return;

            var q = query.toLowerCase().trim();
            var rows = bankList.querySelectorAll('.kds-bank-row');
            var visible = 0;

            rows.forEach(function(row) {
                var nameEl = row.querySelector('.kds-bank-row-name');
                if (!nameEl) return;

                var name = nameEl.textContent.toLowerCase();
                var match = !q || name.indexOf(q) !== -1;
                row.style.display = match ? '' : 'none';
                if (match) visible++;
            });

            if (noResults) {
                noResults.classList.toggle('visible', visible === 0);
            }
        }

        // Open modal
        root.addEventListener('click', function(e) {
            var opener = e.target.closest('[data-open-bank-modal]');
            if (opener) {
                modal.classList.add('open');
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.focus();
                }
                filterBanks('');
            }
        });

        // Close modal
        root.addEventListener('click', function(e) {
            var closer = e.target.closest('[data-close-bank-modal]');
            if (closer) {
                modal.classList.remove('open');
            }
        });

        // Select bank (closes modal and dispatches event)
        if (bankList) {
            bankList.addEventListener('click', function(e) {
                var bankRow = e.target.closest('.kds-bank-row');
                if (bankRow) {
                    var bankId = bankRow.dataset.bankId || bankRow.dataset.bank || '';
                    var bankName = bankRow.querySelector('.kds-bank-row-name');

                    // Dispatch custom event with bank data
                    modal.dispatchEvent(new CustomEvent('kds:bank:selected', {
                        bubbles: true,
                        detail: {
                            id: bankId,
                            name: bankName ? bankName.textContent : '',
                            element: bankRow
                        }
                    }));

                    // Close modal
                    modal.classList.remove('open');
                }
            });
        }

        // Search input
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                filterBanks(e.target.value);
            });
        }

        // Export filterBanks for manual use if needed
        if (!window.Khipu) window.Khipu = {};
        window.Khipu.filterBanks = filterBanks;
    }

    /**
     * Initialize sticky invoice card progressive collapse on scroll
     * MOBILE ONLY - Desktop mantiene cajitas normales
     * Uses scroll-linked animation (0-150px) for smooth collapse/expand
     * Updates CSS custom property --collapse-progress (0 to 1) for GPU-accelerated animations
     * Works with multiple screens - targets sticky element in currently active screen
     * Safari-compatible: uses native CSS custom properties, calc(), and requestAnimationFrame
     * @param {Element} root - Root element to scope queries (default: document)
     */
    function initStickyInvoice(root) {
        root = root || document;

        // Progressive collapse range: 0px (expanded) to 150px (collapsed)
        var COLLAPSE_START = 0;
        var COLLAPSE_END = 150;

        var lastScrollY = 0;
        var ticking = false;
        var MOBILE_BREAKPOINT = 768;

        function isMobile() {
            return window.innerWidth < MOBILE_BREAKPOINT;
        }

        function onScroll() {
            // Find active screen first (needed for both desktop and mobile)
            var activeScreen = root.querySelector('.kds-screen.active');
            if (!activeScreen) return;

            var sticky = activeScreen.querySelector('.kds-invoice-sticky');
            if (!sticky) return;

            // Desktop: Sin animación, siempre expandido
            if (!isMobile()) {
                activeScreen.style.removeProperty('--collapse-progress');
                activeScreen.style.removeProperty('--collapse-collapsible-h');
                return;
            }

            // Mobile: Animación progresiva scroll-linked
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(function() {
                ticking = false;

                // Re-query inside rAF (screen may have changed)
                var currentScreen = root.querySelector('.kds-screen.active');
                if (!currentScreen) return;
                var currentSticky = currentScreen.querySelector('.kds-invoice-sticky');
                if (!currentSticky) return;

                var scrollY = window.scrollY || window.pageYOffset;

                // Calcular progress: 0 (inicio) a 1 (totalmente colapsado)
                var progress = Math.min(Math.max((scrollY - COLLAPSE_START) / (COLLAPSE_END - COLLAPSE_START), 0), 1);

                // Cache collapsible height once for clip-path + translateY calculations
                // Set on screen so both sticky card and its siblings can access the variable
                if (!currentScreen.style.getPropertyValue('--collapse-collapsible-h')) {
                    var collapsible = currentSticky.querySelector('.kds-invoice-collapsible');
                    if (collapsible) {
                        currentScreen.style.setProperty('--collapse-collapsible-h', collapsible.offsetHeight + 'px');
                    }
                }

                // Single DOM write per frame — set on screen (parent) so it cascades to sticky + siblings
                currentScreen.style.setProperty('--collapse-progress', progress);

                lastScrollY = scrollY;
            });
        }

        // Handle resize - cleanup on desktop
        window.addEventListener('resize', function() {
            if (!isMobile()) {
                // Desktop: cleanup all collapsed state from screen elements
                var screens = root.querySelectorAll('.kds-screen');
                screens.forEach(function(screen) {
                    screen.style.removeProperty('--collapse-progress');
                    screen.style.removeProperty('--collapse-collapsible-h');
                });
            }
        });

        window.addEventListener('scroll', onScroll, { passive: true });

        // Init: Set initial state on page load
        onScroll();
    }

    /**
     * Initialize copyable table rows
     * Delegated click on .kds-copyable-table-row[data-copy] copies value and shows feedback
     * @param {Element} root - Root element to scope listeners (default: document)
     */
    function initCopyableTable(root) {
        root = root || document;

        root.addEventListener('click', function(e) {
            var row = e.target.closest('.kds-copyable-table-row[data-copy]');
            if (!row) return;

            navigator.clipboard.writeText(row.dataset.copy).then(function() {
                row.classList.add('copied');
                setTimeout(function() {
                    row.classList.remove('copied');
                }, 1200);
            });
        });
    }

    /**
     * Initialize copy-all buttons
     * Delegated click on .kds-copy-all-btn[data-copy-all] copies all values from sibling table
     * @param {Element} root - Root element to scope listeners (default: document)
     */
    function initCopyAllBtn(root) {
        root = root || document;

        root.addEventListener('click', function(e) {
            var btn = e.target.closest('.kds-copy-all-btn[data-copy-all]');
            if (!btn) return;

            var targetSelector = btn.dataset.copyAll;
            var container = targetSelector
                ? document.querySelector(targetSelector)
                : btn.previousElementSibling;
            if (!container) return;

            var rows = container.querySelectorAll('.kds-copyable-table-row[data-copy]');
            var values = [];
            rows.forEach(function(r) {
                var key = r.querySelector('.k');
                var val = r.dataset.copy;
                if (key) {
                    values.push(key.textContent.trim() + ': ' + val);
                } else {
                    values.push(val);
                }
            });

            navigator.clipboard.writeText(values.join('\n')).then(function() {
                btn.classList.add('copied');
                var label = btn.querySelector('span:not(.kds-icon)');
                var origText = label ? label.textContent : '';
                if (label) label.textContent = 'Copiado';

                rows.forEach(function(r) {
                    r.classList.add('copied');
                });

                setTimeout(function() {
                    btn.classList.remove('copied');
                    if (label) label.textContent = origText;
                    rows.forEach(function(r) {
                        r.classList.remove('copied');
                    });
                }, 1400);
            });
        });
    }

    /**
     * Initialize info tooltip toggle
     * Delegated click on .kds-info-tip toggles aria-expanded and injects bubble if needed
     * @param {Element} root - Root element to scope listeners (default: document)
     */
    function initInfoTip(root) {
        root = root || document;

        // Inject bubble elements upfront so CSS :hover can show them
        root.querySelectorAll('.kds-info-tip[data-tip]').forEach(function(tip) {
            if (tip.querySelector('.kds-tip-bubble')) return;
            var bubble = document.createElement('span');
            bubble.className = 'kds-tip-bubble';
            bubble.setAttribute('role', 'tooltip');
            bubble.textContent = tip.dataset.tip;
            tip.appendChild(bubble);
        });

        // Click toggles aria-expanded (for mobile tap support)
        root.addEventListener('click', function(e) {
            var tip = e.target.closest('.kds-info-tip');
            if (tip) {
                e.preventDefault();
                e.stopPropagation();

                var isOpen = tip.getAttribute('aria-expanded') === 'true';

                // Close all other tooltips first
                document.querySelectorAll('.kds-info-tip[aria-expanded="true"]').forEach(function(t) {
                    t.setAttribute('aria-expanded', 'false');
                });

                tip.setAttribute('aria-expanded', String(!isOpen));
                return;
            }

            // Click outside any tooltip closes them
            document.querySelectorAll('.kds-info-tip[aria-expanded="true"]').forEach(function(t) {
                t.setAttribute('aria-expanded', 'false');
            });
        });
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
    window.Khipu.initBrandInner = initBrandInner;
    window.Khipu.initSecureFooterInside = initSecureFooterInside;
    window.Khipu.initExpandToggle = initExpandToggle;
    window.Khipu.initCopyRow = initCopyRow;
    window.Khipu.initCountdown = initCountdown;
    window.Khipu.initSegmentedTabs = initSegmentedTabs;
    window.Khipu.initCopyableTable = initCopyableTable;
    window.Khipu.initCopyAllBtn = initCopyAllBtn;
    window.Khipu.initInfoTip = initInfoTip;
    window.Khipu.initBankModal = initBankModal;
    window.Khipu.initStickyInvoice = initStickyInvoice;

    // Also export showSnackbar to global scope for backward compatibility
    window.showSnackbar = showSnackbar;

})();
