// Error handling and debugging utilities
class ErrorHandler {
    constructor() {
        this.errors = [];
        this.init();
    }

    init() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.logError('javascript', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error?.stack
            });
        });

        // Promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.logError('promise', {
                message: event.reason?.message || 'Unhandled promise rejection',
                reason: event.reason
            });
        });

        // Resource loading errors
        document.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.logError('resource', {
                    type: event.target.tagName,
                    source: event.target.src || event.target.href,
                    message: 'Failed to load resource'
                });
            }
        }, true);
    }

    logError(type, details) {
        const error = {
            type,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            ...details
        };

        this.errors.push(error);
        
        // Log to console in development
        console.error('Error logged:', error);

        // In production, you could send to error tracking service
        // this.sendToErrorService(error);
    }

    getErrors() {
        return this.errors;
    }

    sendToErrorService(error) {
        // Placeholder for error reporting service (Sentry, LogRocket, etc.)
        fetch('/api/errors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(error)
        }).catch(() => {
            // Silently fail if error reporting fails
        });
    }
}

// Debug utilities for development
class DebugUtils {
    static logPerformance() {
        if (window.performanceTracker) {
            console.table(window.performanceTracker.getMetrics());
            console.log('Performance Score:', window.performanceTracker.getPerformanceScore());
        }
    }

    static logInteractions() {
        if (window.interactionTracker) {
            console.table(window.interactionTracker.getInteractions());
        }
    }

    static logErrors() {
        if (window.errorHandler) {
            console.table(window.errorHandler.getErrors());
        }
    }

    static exportData() {
        const data = {
            performance: window.performanceTracker?.getMetrics() || {},
            interactions: window.interactionTracker?.getInteractions() || [],
            errors: window.errorHandler?.getErrors() || [],
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'website-debug-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    static addDebugConsole() {
        // Add debug commands to console
        console.log('%c🔧 Debug Commands Available:', 'color: #00A7A1; font-weight: bold; font-size: 14px;');
        console.log('%cDebugUtils.logPerformance() - Show performance metrics', 'color: #666;');
        console.log('%cDebugUtils.logInteractions() - Show user interactions', 'color: #666;');
        console.log('%cDebugUtils.logErrors() - Show logged errors', 'color: #666;');
        console.log('%cDebugUtils.exportData() - Export all debug data', 'color: #666;');
    }
}

// Initialize error handling
const errorHandler = new ErrorHandler();
window.errorHandler = errorHandler;

// Make debug utils available globally
window.DebugUtils = DebugUtils;

// Add debug console in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    setTimeout(() => DebugUtils.addDebugConsole(), 1000);
}
