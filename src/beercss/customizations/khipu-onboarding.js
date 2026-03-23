/**
 * Khipu Onboarding Controller
 *
 * Manages multi-stage onboarding flow with validation, state management, and navigation.
 * Extracted from React implementation and converted to vanilla JavaScript.
 *
 * @version 1.0.0
 * @author Khipu Design System Team
 */

(function(window) {
    'use strict';

    /**
     * Main Onboarding Controller Class
     */
    class KhipuOnboarding {
        /**
         * Initialize onboarding controller
         * @param {Object} config - Configuration options
         * @param {number} config.totalStages - Total number of stages (default: 8)
         * @param {string} config.personType - Person type ('natural' | 'juridica')
         * @param {string} config.locale - Locale code (default: 'es-CL')
         * @param {string} config.apiEndpoint - API endpoint for data submission
         * @param {boolean} config.enableLocalStorage - Enable state persistence (default: true)
         */
        constructor(config = {}) {
            this.currentStage = 0;
            this.totalStages = config.totalStages || 8;
            this.personType = config.personType || null;
            this.locale = config.locale || 'es-CL';
            this.apiEndpoint = config.apiEndpoint || '/api/onboarding';
            this.enableLocalStorage = config.enableLocalStorage !== false;

            // Form data storage
            this.formData = {};

            // Stage completion tracking
            this.completedStages = new Set();

            // Validation errors
            this.errors = {};

            // Event listeners
            this.listeners = {
                stageChange: [],
                dataChange: [],
                error: []
            };

            // Initialize
            this.init();
        }

        /**
         * Initialize the onboarding flow
         */
        init() {
            // Load saved state from localStorage
            if (this.enableLocalStorage) {
                this.loadState();
            }

            // Set up event listeners
            this.setupEventListeners();

            // Update stepper UI
            this.updateStepper();
        }

        /**
         * Set up global event listeners
         */
        setupEventListeners() {
            // Next/Back button handlers
            document.addEventListener('click', (e) => {
                if (e.target.matches('[data-onboarding-next]')) {
                    e.preventDefault();
                    this.nextStage();
                }

                if (e.target.matches('[data-onboarding-prev]')) {
                    e.preventDefault();
                    this.prevStage();
                }

                if (e.target.matches('[data-onboarding-goto]')) {
                    e.preventDefault();
                    const stage = parseInt(e.target.dataset.onboardingGoto, 10);
                    this.goToStage(stage);
                }
            });

            // Form field change handlers
            document.addEventListener('input', (e) => {
                if (e.target.matches('[data-onboarding-field]')) {
                    this.handleFieldChange(e.target);
                }
            });

            // Form submission
            document.addEventListener('submit', (e) => {
                if (e.target.matches('[data-onboarding-form]')) {
                    e.preventDefault();
                    this.handleFormSubmit(e.target);
                }
            });

            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                // Enter on buttons triggers click
                if (e.key === 'Enter' && e.target.matches('button')) {
                    e.target.click();
                }

                // Escape closes modals
                if (e.key === 'Escape') {
                    this.closeAllModals();
                }
            });
        }

        /**
         * Navigate to specific stage
         * @param {number} index - Stage index (0-based)
         */
        goToStage(index) {
            if (index < 0 || index >= this.totalStages) {
                console.warn(`Invalid stage index: ${index}`);
                return;
            }

            // Validate current stage before moving
            if (index > this.currentStage && !this.validateStage()) {
                return;
            }

            const previousStage = this.currentStage;
            this.currentStage = index;

            // Emit stage change event
            this.emit('stageChange', {
                from: previousStage,
                to: index
            });

            // Update stepper UI
            this.updateStepper();

            // Save state
            this.saveState();

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        /**
         * Move to next stage
         */
        nextStage() {
            if (!this.validateStage()) {
                return;
            }

            this.completedStages.add(this.currentStage);

            if (this.currentStage < this.totalStages - 1) {
                this.goToStage(this.currentStage + 1);
            } else {
                // Final stage - submit
                this.submitOnboarding();
            }
        }

        /**
         * Move to previous stage
         */
        prevStage() {
            if (this.currentStage > 0) {
                this.goToStage(this.currentStage - 1);
            }
        }

        /**
         * Validate current stage
         * @returns {boolean} True if valid
         */
        validateStage() {
            const stageElement = document.querySelector(`[data-stage="${this.currentStage}"]`);
            if (!stageElement) return true;

            const form = stageElement.querySelector('form');
            if (!form) return true;

            // HTML5 validation
            if (!form.checkValidity()) {
                form.reportValidity();
                return false;
            }

            // Custom validation
            const fields = form.querySelectorAll('[data-onboarding-field]');
            let isValid = true;

            fields.forEach(field => {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            });

            return isValid;
        }

        /**
         * Validate individual field
         * @param {HTMLElement} field - Field element
         * @returns {boolean} True if valid
         */
        validateField(field) {
            const name = field.name || field.dataset.onboardingField;
            const value = field.value.trim();
            const validationType = field.dataset.validation;

            // Clear previous errors
            this.clearFieldError(field);

            // Required validation
            if (field.hasAttribute('required') && !value) {
                this.setFieldError(field, 'Este campo es obligatorio');
                return false;
            }

            // Custom validation types
            if (validationType && value) {
                const validator = KHIPU_VALIDATORS[validationType];
                if (validator && !validator.test(value)) {
                    this.setFieldError(field, validator.message);
                    return false;
                }
            }

            // Mark as valid
            const fieldWrapper = field.closest('.field');
            if (fieldWrapper) {
                fieldWrapper.classList.remove('invalid');
                fieldWrapper.classList.add('valid');
            }

            return true;
        }

        /**
         * Handle field change event
         * @param {HTMLElement} field - Changed field
         */
        handleFieldChange(field) {
            const name = field.name || field.dataset.onboardingField;
            const value = field.type === 'checkbox' ? field.checked : field.value;

            // Update form data
            this.setFormData(name, value);

            // Real-time validation
            if (field.dataset.validateOnChange !== 'false') {
                this.validateField(field);
            }
        }

        /**
         * Handle form submission
         * @param {HTMLFormElement} form - Form element
         */
        handleFormSubmit(form) {
            if (!this.validateStage()) {
                return;
            }

            // Collect form data
            const formData = new FormData(form);
            formData.forEach((value, key) => {
                this.setFormData(key, value);
            });

            // Move to next stage
            this.nextStage();
        }

        /**
         * Set form data value
         * @param {string} key - Data key
         * @param {any} value - Data value
         */
        setFormData(key, value) {
            this.formData[key] = value;

            // Emit data change event
            this.emit('dataChange', { key, value });

            // Save state
            if (this.enableLocalStorage) {
                this.saveState();
            }
        }

        /**
         * Get form data value
         * @param {string} key - Data key
         * @returns {any} Data value
         */
        getFormData(key) {
            return this.formData[key];
        }

        /**
         * Set field error
         * @param {HTMLElement} field - Field element
         * @param {string} message - Error message
         */
        setFieldError(field, message) {
            const fieldWrapper = field.closest('.field');
            if (!fieldWrapper) return;

            fieldWrapper.classList.add('invalid');
            fieldWrapper.classList.remove('valid');

            // Create or update error message
            let errorElement = fieldWrapper.querySelector('.error');
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error';
                fieldWrapper.appendChild(errorElement);
            }
            errorElement.textContent = message;

            // Store error
            const name = field.name || field.dataset.onboardingField;
            this.errors[name] = message;
        }

        /**
         * Clear field error
         * @param {HTMLElement} field - Field element
         */
        clearFieldError(field) {
            const fieldWrapper = field.closest('.field');
            if (!fieldWrapper) return;

            fieldWrapper.classList.remove('invalid');

            const errorElement = fieldWrapper.querySelector('.error');
            if (errorElement) {
                errorElement.remove();
            }

            // Remove from errors
            const name = field.name || field.dataset.onboardingField;
            delete this.errors[name];
        }

        /**
         * Update stepper UI
         */
        updateStepper() {
            const steps = document.querySelectorAll('.kds-step');

            steps.forEach((step, index) => {
                step.classList.remove('current', 'completed');

                if (index < this.currentStage || this.completedStages.has(index)) {
                    step.classList.add('completed');
                } else if (index === this.currentStage) {
                    step.classList.add('current');
                }
            });

            // Show/hide stages
            const stages = document.querySelectorAll('[data-stage]');
            stages.forEach((stage, index) => {
                stage.style.display = index === this.currentStage ? 'block' : 'none';
            });
        }

        /**
         * Save state to localStorage
         */
        saveState() {
            if (!this.enableLocalStorage) return;

            try {
                const state = {
                    currentStage: this.currentStage,
                    personType: this.personType,
                    formData: this.formData,
                    completedStages: Array.from(this.completedStages),
                    timestamp: Date.now()
                };

                localStorage.setItem('khipu_onboarding_state', JSON.stringify(state));
            } catch (error) {
                console.error('Error saving state:', error);
            }
        }

        /**
         * Load state from localStorage
         */
        loadState() {
            try {
                const stateJSON = localStorage.getItem('khipu_onboarding_state');
                if (!stateJSON) return;

                const state = JSON.parse(stateJSON);

                // Check if state is not too old (24 hours)
                const age = Date.now() - state.timestamp;
                if (age > 24 * 60 * 60 * 1000) {
                    this.clearState();
                    return;
                }

                // Restore state
                this.currentStage = state.currentStage || 0;
                this.personType = state.personType || null;
                this.formData = state.formData || {};
                this.completedStages = new Set(state.completedStages || []);

            } catch (error) {
                console.error('Error loading state:', error);
                this.clearState();
            }
        }

        /**
         * Clear saved state
         */
        clearState() {
            try {
                localStorage.removeItem('khipu_onboarding_state');
            } catch (error) {
                console.error('Error clearing state:', error);
            }

            // Reset state
            this.currentStage = 0;
            this.formData = {};
            this.completedStages.clear();
            this.errors = {};
        }

        /**
         * Submit onboarding data
         */
        async submitOnboarding() {
            try {
                const response = await fetch(this.apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.formData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // Clear state on success
                this.clearState();

                // Emit success event
                this.emit('success', data);

                // Show success message
                this.showSnackbar('¡Activación completada exitosamente!', 'success');

            } catch (error) {
                console.error('Error submitting onboarding:', error);
                this.emit('error', error);
                this.showSnackbar('Error al enviar datos. Por favor intenta nuevamente.', 'error');
            }
        }

        /**
         * Show snackbar notification
         * @param {string} message - Message to display
         * @param {string} type - Type (success, error, info)
         */
        showSnackbar(message, type = 'info') {
            const snackbar = document.createElement('div');
            snackbar.className = `snackbar ${type}`;
            snackbar.textContent = message;

            document.body.appendChild(snackbar);

            // Auto-remove after 3 seconds
            setTimeout(() => {
                snackbar.remove();
            }, 3000);
        }

        /**
         * Close all open modals
         */
        closeAllModals() {
            const modals = document.querySelectorAll('dialog[open]');
            modals.forEach(modal => modal.close());
        }

        /**
         * Event emitter
         * @param {string} event - Event name
         * @param {any} data - Event data
         */
        emit(event, data) {
            if (this.listeners[event]) {
                this.listeners[event].forEach(callback => callback(data));
            }
        }

        /**
         * Add event listener
         * @param {string} event - Event name
         * @param {Function} callback - Callback function
         */
        on(event, callback) {
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            this.listeners[event].push(callback);
        }

        /**
         * Remove event listener
         * @param {string} event - Event name
         * @param {Function} callback - Callback function
         */
        off(event, callback) {
            if (this.listeners[event]) {
                this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
            }
        }
    }

    /**
     * Validation Helpers
     */
    const KHIPU_VALIDATORS = {
        rut: {
            test: function(value) {
                // Chilean RUT validation
                value = value.replace(/[^0-9kK]/g, '');
                if (value.length < 2) return false;

                const body = value.slice(0, -1);
                const dv = value.slice(-1).toUpperCase();

                let sum = 0;
                let multiplier = 2;

                for (let i = body.length - 1; i >= 0; i--) {
                    sum += parseInt(body[i]) * multiplier;
                    multiplier = multiplier === 7 ? 2 : multiplier + 1;
                }

                const calculatedDV = 11 - (sum % 11);
                const expectedDV = calculatedDV === 11 ? '0' : calculatedDV === 10 ? 'K' : calculatedDV.toString();

                return dv === expectedDV;
            },
            message: 'RUT inválido'
        },

        email: {
            test: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Email inválido'
        },

        phone: {
            test: function(value) {
                // Chilean phone: +569 or 9 followed by 8 digits
                return /^(\+?56)?9\d{8}$/.test(value.replace(/\s/g, ''));
            },
            message: 'Teléfono inválido (ej: +56912345678)'
        },

        url: {
            test: function(value) {
                try {
                    new URL(value);
                    return true;
                } catch {
                    return false;
                }
            },
            message: 'URL inválida'
        }
    };

    /**
     * File Upload Handler
     */
    class FileUploadHandler {
        constructor(uploadZone) {
            this.uploadZone = uploadZone;
            this.fileInput = uploadZone.querySelector('input[type="file"]');
            this.preview = uploadZone.nextElementSibling;
            this.files = [];
            this.maxSize = 5 * 1024 * 1024; // 5MB
            this.acceptedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

            this.init();
        }

        init() {
            // Click to upload
            this.uploadZone.addEventListener('click', () => {
                this.fileInput.click();
            });

            // File input change
            this.fileInput.addEventListener('change', (e) => {
                this.handleFiles(Array.from(e.target.files));
            });

            // Drag and drop
            this.uploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                this.uploadZone.classList.add('dragover');
            });

            this.uploadZone.addEventListener('dragleave', () => {
                this.uploadZone.classList.remove('dragover');
            });

            this.uploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                this.uploadZone.classList.remove('dragover');
                this.handleFiles(Array.from(e.dataTransfer.files));
            });
        }

        handleFiles(newFiles) {
            newFiles.forEach(file => {
                // Validate file type
                if (!this.acceptedTypes.includes(file.type)) {
                    alert(`Tipo de archivo no permitido: ${file.name}`);
                    return;
                }

                // Validate file size
                if (file.size > this.maxSize) {
                    alert(`Archivo muy grande: ${file.name} (máx 5MB)`);
                    return;
                }

                this.files.push(file);
                this.addFileToPreview(file);
            });

            this.uploadZone.classList.add('success');
        }

        addFileToPreview(file) {
            const item = document.createElement('div');
            item.className = 'kds-file-upload-item';
            item.innerHTML = `
                <div class="kds-file-upload-item-icon">
                    <i class="material-symbols-outlined">description</i>
                </div>
                <div class="kds-file-upload-item-info">
                    <div class="kds-file-upload-item-name">${file.name}</div>
                    <div class="kds-file-upload-item-meta">${this.formatFileSize(file.size)}</div>
                </div>
                <div class="kds-file-upload-item-status success">
                    <i class="material-symbols-outlined">check_circle</i>
                </div>
                <button type="button" class="kds-file-upload-item-remove">
                    <i class="material-symbols-outlined">close</i>
                </button>
            `;

            // Remove button
            item.querySelector('.kds-file-upload-item-remove').addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeFile(file, item);
            });

            this.preview.appendChild(item);
        }

        removeFile(file, item) {
            this.files = this.files.filter(f => f !== file);
            item.remove();

            if (this.files.length === 0) {
                this.uploadZone.classList.remove('success');
            }
        }

        formatFileSize(bytes) {
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        }

        getFiles() {
            return this.files;
        }
    }

    /**
     * OTP Input Handler
     */
    class OTPInputHandler {
        constructor(container) {
            this.container = container;
            this.inputs = Array.from(container.querySelectorAll('.kds-otp-digit'));
            this.length = this.inputs.length;

            this.init();
        }

        init() {
            this.inputs.forEach((input, index) => {
                // Only allow numbers
                input.addEventListener('input', (e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    e.target.value = value.slice(0, 1);

                    // Auto-focus next input
                    if (value && index < this.length - 1) {
                        this.inputs[index + 1].focus();
                    }
                });

                // Handle backspace
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Backspace' && !e.target.value && index > 0) {
                        this.inputs[index - 1].focus();
                    }
                });

                // Handle paste
                input.addEventListener('paste', (e) => {
                    e.preventDefault();
                    const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '');

                    paste.split('').forEach((char, i) => {
                        if (index + i < this.length) {
                            this.inputs[index + i].value = char;
                        }
                    });

                    // Focus last filled input
                    const lastIndex = Math.min(index + paste.length, this.length - 1);
                    this.inputs[lastIndex].focus();
                });
            });
        }

        getValue() {
            return this.inputs.map(input => input.value).join('');
        }

        clear() {
            this.inputs.forEach(input => {
                input.value = '';
            });
            this.inputs[0].focus();
        }

        isComplete() {
            return this.inputs.every(input => input.value);
        }
    }

    // Expose to global scope
    window.KhipuOnboarding = KhipuOnboarding;
    window.FileUploadHandler = FileUploadHandler;
    window.OTPInputHandler = OTPInputHandler;

    // Auto-initialize if config exists
    if (window.KHIPU_ONBOARDING_CONFIG) {
        window.khipuOnboarding = new KhipuOnboarding(window.KHIPU_ONBOARDING_CONFIG);
    }

})(window);
