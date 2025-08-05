// Chart management module
class ChartManager {
    constructor() {
        this.chartInstances = {};
        this.chartData = {
            leadership: {
                labels: [['Team', 'Leadership'], ['Agile', 'Methodologies'], ['Stakeholder', 'Management'], ['Talent', 'Development'], 'Strategy'],
                data: [9, 8, 9, 10, 9],
                backgroundColor: 'rgba(0, 167, 161, 0.2)',
                borderColor: 'rgb(0, 167, 161)',
                pointBackgroundColor: 'rgb(0, 167, 161)'
            },
            data: {
                labels: [['Data', 'Strategy'], ['Data', 'Engineering'], 'Databricks', 'AI/LLMs', 'Experimentation', ['Data', 'Governance']],
                data: [9, 8, 7, 7, 9, 7],
                backgroundColor: 'rgba(0, 135, 129, 0.2)',
                borderColor: 'rgb(0, 135, 129)',
                pointBackgroundColor: 'rgb(0, 135, 129)'
            },
            technical: {
                labels: [['Cloud', '(AWS/GCP)'], 'Automation', ['Docker', '/K8s'], 'SQL', 'Python', 'Databases', 'CI/CD'],
                data: [7, 9, 6, 8, 6, 7, 7],
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderColor: 'rgb(16, 185, 129)',
                pointBackgroundColor: 'rgb(16, 185, 129)'
            }
        };
    }

    getChartOptions() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#f3f4f6' : '#374151';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
        const backdropColor = isDark ? 'rgba(77, 77, 77, 0.8)' : 'rgba(255, 255, 255, 0.75)';
        
        return {
            maintainAspectRatio: false,
            responsive: true,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            scales: {
                r: {
                    angleLines: { color: gridColor },
                    grid: { color: gridColor },
                    pointLabels: {
                        font: { size: 12, family: 'Inter' },
                        color: textColor
                    },
                    ticks: {
                        backdropColor: backdropColor,
                        stepSize: 2,
                        display: false,
                        color: textColor
                    },
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}/10`;
                        }
                    }
                }
            }
        };
    }

    createChart(canvasId, chartType) {
        try {
            if (typeof Chart === 'undefined') {
                console.warn('Chart.js not loaded');
                return null;
            }

            const canvas = document.getElementById(canvasId);
            if (!canvas) {
                console.warn(`Canvas ${canvasId} not found`);
                return null;
            }

            const config = this.chartData[chartType];
            if (!config) {
                console.warn(`Chart config for ${chartType} not found`);
                return null;
            }

            const chart = new Chart(canvas, {
                type: 'radar',
                data: {
                    labels: config.labels,
                    datasets: [{
                        label: chartType.charAt(0).toUpperCase() + chartType.slice(1),
                        data: new Array(config.data.length).fill(0), // Start with 0 values
                        fill: true,
                        backgroundColor: config.backgroundColor,
                        borderColor: config.borderColor,
                        pointBackgroundColor: config.pointBackgroundColor,
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: config.borderColor
                    }]
                },
                options: this.getChartOptions()
            });

            this.chartInstances[chartType] = chart;
            return chart;
        } catch (error) {
            console.error(`Error creating chart ${chartType}:`, error);
            return null;
        }
    }

    animateChart(chartType, delay = 0) {
        setTimeout(() => {
            const chart = this.chartInstances[chartType];
            const config = this.chartData[chartType];
            
            if (chart && config) {
                chart.data.datasets[0].data = config.data;
                chart.update();
            }
        }, delay);
    }

    resetCharts() {
        Object.keys(this.chartInstances).forEach(chartType => {
            const chart = this.chartInstances[chartType];
            const config = this.chartData[chartType];
            
            if (chart && config) {
                chart.data.datasets[0].data = new Array(config.data.length).fill(0);
                chart.update('none');
            }
        });
    }

    destroyCharts() {
        Object.values(this.chartInstances).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.chartInstances = {};
    }

    recreateCharts() {
        this.destroyCharts();
        this.initializeCharts();
    }

    initializeCharts() {
        this.createChart('leadershipChart', 'leadership');
        this.createChart('dataChart', 'data');
        this.createChart('techChart', 'technical');
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        const skillsSection = document.getElementById('skills');
        
        if (!skillsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateChart('leadership', 100);
                    this.animateChart('data', 300);
                    this.animateChart('technical', 500);
                } else {
                    this.resetCharts();
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '-10% 0px -10% 0px'
        });

        observer.observe(skillsSection);
    }
}

// Export for global use
window.ChartManager = ChartManager;
