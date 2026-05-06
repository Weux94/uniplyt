/* Uniplyt — клієнтський скрипт для всіх сторінок MPA.
   Сайт побудований як набір окремих HTML-файлів, тож тут немає
   жодного роутингу — тільки інтерактивні віджети. */

/* ==================== Бургер-меню (на всіх сторінках) ==================== */
const burger = document.getElementById('burger-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function setMobileMenuOpen(isOpen) {
    if (!burger || !mobileMenu) return;
    mobileMenu.classList.toggle('open', isOpen);
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
}

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        setMobileMenuOpen(!mobileMenu.classList.contains('open'));
    });

    /* Клік по будь-якому посиланню всередині меню — це реальна навігація.
       Браузер сам перейде на нову сторінку, тут лише закриваємо меню,
       щоб фон не лишався темним поки сторінка завантажується. */
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.closest('a')) setMobileMenuOpen(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            setMobileMenuOpen(false);
        }
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenu.classList.contains('open')) return;
        if (e.target.closest('#mobile-menu') || e.target.closest('#burger-toggle')) return;
        setMobileMenuOpen(false);
    });
}

/* ==================== Лічильники в hero-stats (лише головна) ====================
   Стартують з "0+", анімуються коли користувач доскролив до полоски.
   Один раз на сесію. */
const heroStatsStrip = document.querySelector('.hero-stats-strip');

if (heroStatsStrip) {
    let heroStatsAnimated = false;

    document.querySelectorAll('.hero-stat-num').forEach(el => {
        const match = el.textContent.trim().match(/^(\d+)(\D*)$/);
        if (!match) return;
        el.dataset.target = match[1];
        el.dataset.suffix = match[2];
        el.textContent = '0' + match[2];
    });

    const animateHeroStats = () => {
        if (heroStatsAnimated) return;
        heroStatsAnimated = true;

        document.querySelectorAll('.hero-stat-num').forEach(el => {
            const target = Number(el.dataset.target);
            if (!Number.isFinite(target)) return;
            const suffix = el.dataset.suffix || '';
            const duration = 2200;
            const start = performance.now();
            const tick = (now) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                el.textContent = Math.round(target * eased) + suffix;
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateHeroStats();
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        observer.observe(heroStatsStrip);
    } else {
        animateHeroStats();
    }
}

/* ==================== Hero-слайдер (лише головна) ====================
   Авто-перехід що 10 секунд, ручне керування через стрілки/точки/свайп.
   Пауза при наведенні мишею. Перший слайд preload-нутий через <link> у head. */
(() => {
    const heroSlider = document.getElementById('hero-slider');
    if (!heroSlider) return;

    const slides = heroSlider.querySelectorAll('.slide');
    if (slides.length < 2) return;

    const dotsContainer = heroSlider.querySelector('.slider-dots');
    const prevBtn = heroSlider.querySelector('.slider-prev');
    const nextBtn = heroSlider.querySelector('.slider-next');

    const AUTOPLAY_MS = 10000;
    let current = 0;
    let timer = null;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slider-dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', `Слайд ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });
    const dots = heroSlider.querySelectorAll('.slider-dot');

    function goTo(target) {
        const next = ((target % slides.length) + slides.length) % slides.length;
        if (next === current) return;
        slides[current].classList.remove('is-active');
        dots[current].classList.remove('is-active');
        slides[next].classList.add('is-active');
        dots[next].classList.add('is-active');
        current = next;
        startTimer();
    }

    function startTimer() {
        stopTimer();
        timer = setInterval(() => goTo(current + 1), AUTOPLAY_MS);
    }

    function stopTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    heroSlider.addEventListener('mouseenter', stopTimer);
    heroSlider.addEventListener('mouseleave', startTimer);

    let touchStartX = 0;
    heroSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopTimer();
    }, { passive: true });
    heroSlider.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
        else startTimer();
    });

    startTimer();
})();

/* ==================== Антифрод-модалка (на всіх сторінках) ====================
   Клас .show-fraud-modal на <html> вже виставлений inline-скриптом у <head>,
   якщо модалку треба показати. Тут — лише обробка закриття. */
(() => {
    if (!document.documentElement.classList.contains('show-fraud-modal')) return;

    const modal = document.getElementById('fraud-modal');
    const btn = document.getElementById('fraud-modal-btn');
    if (!modal || !btn) return;

    const KEY = 'uniplyt_fraud_notice_v1';

    const close = () => {
        try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
        document.documentElement.classList.remove('show-fraud-modal');
    };

    btn.addEventListener('click', close);
    btn.focus({ preventScroll: true });
})();
