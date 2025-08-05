// Performance monitoring utilities
class PerformanceTracker {
    constructor() {
        this.metrics = {
            loadTime: 0,
            firstPaint: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            firstInputDelay: 0,
            cumulativeLayoutShift: 0
        };
        this.init();
    }

    init() {
        // Wait for page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.collectMetrics());
        } else {
            this.collectMetrics();
        }
    }

    collectMetrics() {
        // Navigation timing
        if (performance.getEntriesByType) {
            const navEntry = performance.getEntriesByType('navigation')[0];
            if (navEntry) {
                this.metrics.loadTime = navEntry.loadEventEnd - navEntry.loadEventStart;
            }
        }

        // Paint timing
        if (performance.getEntriesByType) {
            const paintEntries = performance.getEntriesByType('paint');
            paintEntries.forEach(entry => {
                if (entry.name === 'first-paint') {
                    this.metrics.firstPaint = entry.startTime;
                } else if (entry.name === 'first-contentful-paint') {
                    this.metrics.firstContentfulPaint = entry.startTime;
                }
            });
        }

        // Core Web Vitals
        this.observeLCP();
        this.observeFID();
        this.observeCLS();

        // Report after a delay to capture most metrics
        setTimeout(() => this.reportMetrics(), 3000);
    }

    observeLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.largestContentfulPaint = lastEntry.startTime;
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    observeFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const firstInput = list.getEntries()[0];
                if (firstInput) {
                    this.metrics.firstInputDelay = firstInput.processingStart - firstInput.startTime;
                }
            });
            observer.observe({ entryTypes: ['first-input'] });
        }
    }

    observeCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.metrics.cumulativeLayoutShift = clsValue;
            });
            observer.observe({ entryTypes: ['layout-shift'] });
        }
    }

    reportMetrics() {
        // In production, send to analytics service
        console.log('Performance Metrics:', this.metrics);
        
        // Store locally for debugging
        if (typeof Storage !== 'undefined') {
            localStorage.setItem('performanceMetrics', JSON.stringify(this.metrics));
        }

        // Trigger custom event for other scripts to listen to
        window.dispatchEvent(new CustomEvent('performanceMetricsReady', {
            detail: this.metrics
        }));
    }

    getMetrics() {
        return this.metrics;
    }

    // Get performance score based on Core Web Vitals
    getPerformanceScore() {
        let score = 100;
        
        // LCP should be < 2.5s for good score
        if (this.metrics.largestContentfulPaint > 2500) score -= 30;
        else if (this.metrics.largestContentfulPaint > 4000) score -= 50;
        
        // FID should be < 100ms for good score
        if (this.metrics.firstInputDelay > 100) score -= 20;
        else if (this.metrics.firstInputDelay > 300) score -= 40;
        
        // CLS should be < 0.1 for good score
        if (this.metrics.cumulativeLayoutShift > 0.1) score -= 20;
        else if (this.metrics.cumulativeLayoutShift > 0.25) score -= 40;

        return Math.max(score, 0);
    }
}

// Simple user interaction tracking
class InteractionTracker {
    constructor() {
        this.interactions = [];
        this.startTime = Date.now();
        this.init();
    }

    init() {
        // Track clicks
        document.addEventListener('click', (e) => {
            this.logInteraction('click', {
                element: e.target.tagName,
                classes: e.target.className,
                text: e.target.textContent?.substring(0, 50) || '',
                timestamp: Date.now() - this.startTime
            });
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll % 25 === 0) {
                    this.logInteraction('scroll', {
                        depth: maxScroll,
                        timestamp: Date.now() - this.startTime
                    });
                }
            }
        });

        // Track time on page
        window.addEventListener('beforeunload', () => {
            this.logInteraction('session_end', {
                duration: Date.now() - this.startTime,
                interactions: this.interactions.length
            });
        });
    }

    logInteraction(type, data) {
        this.interactions.push({
            type,
            ...data,
            timestamp: Date.now()
        });

        // In production, you might batch and send these to an analytics service
        console.log('Interaction:', type, data);
    }

    getInteractions() {
        return this.interactions;
    }
}

// Initialize tracking
const performanceTracker = new PerformanceTracker();
const interactionTracker = new InteractionTracker();

// Export for use in other scripts
window.performanceTracker = performanceTracker;
window.interactionTracker = interactionTracker;
