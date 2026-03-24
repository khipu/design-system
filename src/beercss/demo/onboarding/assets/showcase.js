/**
 * Showcase Component Functionality
 * Handles copy-to-clipboard and navigation for the components showcase page
 */

// Copy code to clipboard
function copyCode(codeId) {
    const codeElement = document.getElementById(codeId);
    if (!codeElement) {
        console.error('Code element not found:', codeId);
        return;
    }

    const code = codeElement.textContent;
    const button = event.currentTarget;

    navigator.clipboard.writeText(code).then(() => {
        // Show success feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '✅ Copied!';
        button.classList.add('success');

        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('success');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        button.innerHTML = '❌ Failed';
        setTimeout(() => {
            button.innerHTML = '📋 Copy HTML';
        }, 2000);
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Update active pill
        document.querySelectorAll('.kds-nav-pill').forEach(pill => {
            pill.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    }
}

// Intersection Observer for auto-updating active navigation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.showcase-section');
    const navPills = document.querySelectorAll('.kds-nav-pill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navPills.forEach(pill => {
                    if (pill.getAttribute('onclick')?.includes(sectionId)) {
                        navPills.forEach(p => p.classList.remove('active'));
                        pill.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));

    // Initialize all interactive demos
    initOTPDemo();
    initSignatureDemo();
    initCardSelectorDemo();
    initBankGridDemo();
    initFileUploadDemo();
});

// ========================================
// OTP Input Demo
// ========================================
function initOTPDemo() {
    const otpInputs = document.querySelectorAll('#demo-otp .kds-otp-digit');
    if (!otpInputs.length) return;

    otpInputs.forEach((input, index) => {
        // Auto-focus next input on digit entry
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            // Only allow digits
            if (!/^\d$/.test(value)) {
                e.target.value = '';
                return;
            }
            // Move to next input if available
            if (value && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        // Handle backspace to move to previous input
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });

        // Handle paste - distribute digits across inputs
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
            const digits = pastedData.split('').slice(0, otpInputs.length);

            digits.forEach((digit, i) => {
                if (otpInputs[i]) {
                    otpInputs[i].value = digit;
                }
            });

            // Focus last filled input or next empty
            const lastIndex = Math.min(digits.length, otpInputs.length - 1);
            otpInputs[lastIndex].focus();
        });
    });
}

// ========================================
// Signature Pad Demo
// ========================================
function initSignatureDemo() {
    const canvas = document.getElementById('demo-signature');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Configure drawing style
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        isDrawing = true;
        lastX = touch.clientX - rect.left;
        lastY = touch.clientY - rect.top;
    }

    function handleTouchMove(e) {
        e.preventDefault();
        if (!isDrawing) return;

        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        [lastX, lastY] = [x, y];
    }
}

function clearDemoSignature() {
    const canvas = document.getElementById('demo-signature');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ========================================
// KYC Modal Demo
// ========================================
function showDemoKYCModal() {
    const modal = document.getElementById('demo-kyc-modal');
    if (modal) {
        modal.showModal();
    }
}

function closeDemoKYCModal() {
    const modal = document.getElementById('demo-kyc-modal');
    if (modal) {
        modal.close();
    }
}

// ========================================
// Card Selector Demo
// ========================================
function initCardSelectorDemo() {
    const cardSelectors = document.querySelectorAll('.component-demo .kds-card-selector');

    cardSelectors.forEach(card => {
        card.addEventListener('click', function() {
            // Get parent container to scope selection
            const container = this.closest('.component-demo');
            if (!container) return;

            // Remove selection from siblings
            container.querySelectorAll('.kds-card-selector').forEach(c => {
                c.classList.remove('selected');
            });

            // Add selection to clicked card
            this.classList.add('selected');
        });
    });
}

// ========================================
// Bank Grid Demo
// ========================================
function initBankGridDemo() {
    const bankItems = document.querySelectorAll('.component-demo .kds-bank-item');

    bankItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get parent container to scope selection
            const container = this.closest('.component-demo');
            if (!container) return;

            // Remove selection from siblings
            container.querySelectorAll('.kds-bank-item').forEach(b => {
                b.classList.remove('selected');
            });

            // Add selection to clicked item
            this.classList.add('selected');
        });
    });
}

// ========================================
// File Upload Demo
// ========================================
function initFileUploadDemo() {
    const uploadZones = document.querySelectorAll('.component-demo .kds-upload-zone');

    uploadZones.forEach(zone => {
        const input = zone.querySelector('input[type="file"]');
        if (!input) return;

        // Click zone to trigger file input
        zone.addEventListener('click', (e) => {
            if (e.target !== input) {
                input.click();
            }
        });

        // Drag and drop handlers
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-active');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-active');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-active');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                // Create a DataTransfer object to assign files to input
                const dataTransfer = new DataTransfer();
                Array.from(files).forEach(file => dataTransfer.items.add(file));
                input.files = dataTransfer.files;

                // Trigger change event
                const event = new Event('change', { bubbles: true });
                input.dispatchEvent(event);
            }
        });

        // File input change handler
        input.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length === 0) return;

            // Find or create upload list
            let uploadList = zone.parentElement.querySelector('.kds-upload-list');
            if (!uploadList) {
                uploadList = document.createElement('div');
                uploadList.className = 'kds-upload-list';
                zone.parentElement.appendChild(uploadList);
            }

            // Add file items
            Array.from(files).forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'kds-upload-item';
                fileItem.innerHTML = `
                    <div class="kds-upload-item-icon">
                        <i class="material-symbols-outlined">description</i>
                    </div>
                    <div class="kds-upload-item-info">
                        <div class="kds-upload-item-name">${file.name}</div>
                        <div class="kds-upload-item-size">${formatFileSize(file.size)}</div>
                    </div>
                    <button class="kds-upload-item-remove" onclick="removeUploadItem(this)">
                        <i class="material-symbols-outlined">close</i>
                    </button>
                `;
                uploadList.appendChild(fileItem);
            });

            // Clear input for future uploads
            input.value = '';
        });
    });
}

function removeUploadItem(button) {
    const item = button.closest('.kds-upload-item');
    if (item) {
        item.remove();
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
