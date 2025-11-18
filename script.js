// Scroll Reveal Animation
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.chapter, .viz-item, .stat-card, .finding');
        this.init();
    }

    init() {
        // Criar observer para animações de scroll
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Aplicar animação inicial e observar elementos
        this.elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
}

// Smooth Scroll para links internos
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Contador animado para números
class AnimatedCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number, .big-number');
        this.init();
    }

    init() {
        const observerOptions = {
            root: null,
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateValue(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateValue(element) {
        const text = element.textContent;

        // Extrair número e sufixo (ex: "35,71%" -> numero: 35.71, sufixo: "%")
        const match = text.match(/([\d.,]+)(.*)$/);
        if (!match) return;

        const numberStr = match[1].replace(',', '.');
        const suffix = match[2] || '';
        const targetValue = parseFloat(numberStr);

        if (isNaN(targetValue)) return;

        const duration = 1500; // 1.5 segundos
        const steps = 60;
        const increment = targetValue / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            current += increment;
            step++;

            if (step >= steps) {
                current = targetValue;
                clearInterval(timer);
            }

            // Formatar o número de volta (com vírgula se tinha)
            let displayValue;
            if (text.includes(',')) {
                displayValue = current.toFixed(2).replace('.', ',');
            } else if (targetValue % 1 === 0) {
                displayValue = Math.round(current).toString();
            } else {
                displayValue = current.toFixed(2);
            }

            element.textContent = displayValue + suffix;
        }, duration / steps);
    }
}

// Gerenciador de Visualizações do Flourish
class FlourishManager {
    constructor() {
        this.embeds = document.querySelectorAll('.flourish-embed');
        this.init();
    }

    init() {
        // Log para debug
        console.log(`${this.embeds.length} visualizações Flourish encontradas`);

        // Aguardar um pouco para garantir que o Flourish carregou
        setTimeout(() => {
            console.log('Flourish embeds prontos para renderização');
        }, 1000);
    }
}

// Progress Bar de Leitura
class ReadingProgress {
    constructor() {
        this.createProgressBar();
        this.init();
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        this.progressBar = progressBar;
    }

    init() {
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            this.progressBar.style.width = scrollPercent + '%';
        });
    }
}

// Parallax suave no Hero
class HeroParallax {
    constructor() {
        this.hero = document.querySelector('.hero');
        if (this.hero) {
            this.init();
        }
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.1;

            if (scrolled < window.innerHeight) {
                this.hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                this.hero.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }
}

// Tooltip para pontos do gráfico
class ChartTooltips {
    constructor() {
        this.points = document.querySelectorAll('.chart-line .point');
        this.init();
    }

    init() {
        this.points.forEach(point => {
            point.style.cursor = 'help';

            const year = point.dataset.year;
            const value = point.dataset.value;

            if (year && value) {
                point.title = `Ano ${year}: ${value}%`;
            }
        });
    }
}

class KonamiCode {
    constructor() {
        this.pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.current = 0;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.pattern[this.current]) {
                this.current++;
                if (this.current === this.pattern.length) {
                    this.activate();
                    this.current = 0;
                }
            } else {
                this.current = 0;
            }
        });
    }

    activate() {
        // Modo festa!
        document.body.style.animation = 'rainbow 2s infinite';

        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 5000);
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos os módulos
    new ScrollReveal();
    new SmoothScroll();
    new AnimatedCounter();
    new FlourishManager();
    new ReadingProgress();
    new HeroParallax();
    new ChartTooltips();
    new KonamiCode();
});

// Adicionar classe quando a página está totalmente carregada
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Tratar redimensionamento da janela
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalcular alturas dos gráficos se necessário
        console.log('Janela redimensionada');
    }, 250);
});

// Exportar módulos para possível uso externo
window.CiclosPoliticosCE = {
    ScrollReveal,
    SmoothScroll,
    AnimatedCounter,
    FlourishManager,
    ReadingProgress,
    HeroParallax,
    ChartTooltips,
    KonamiCode
};