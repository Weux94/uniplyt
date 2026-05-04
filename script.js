const products = {
    dvp: {
        title: 'Деревоволокнисті плити (ДВП)',
        short: 'ДВП',
        image: 'image/dvp.jpg',
        description: 'Листовий матеріал з деревних волокон, що формуються у килим шляхом сушіння або гарячого пресування. Широко застосовується у меблевій промисловості та будівництві завдяки міцності й універсальності — плити можна різати, шліфувати, склеювати та фарбувати.'
    },
    dvpo: {
        title: 'ДВПО — пофарбована ДВП',
        short: 'ДВПО',
        image: 'image/dvpo.jpg',
        description: 'Деревоволокниста плита з лакофарбовим покриттям, нанесеним вальцьово-ротаційним методом. Використовується для задніх стінок меблів, днищ ящиків, оздоблення транспортних засобів, а також стін і стель у будівництві та дизайні інтер\'єрів.'
    },
    fanera: {
        title: 'Фанера',
        short: 'фанеру',
        image: 'image/fanera.jpg',
        description: 'Фанера підвищеної водостійкості марки ФКМ з класом емісії Е1, а також березова фанера ФК. Продукція застосовується у меблевому виробництві, будівництві, автомобілебудуванні та інших галузях промисловості.'
    },
    pylomaterialy: {
        title: 'Пиломатеріали',
        short: 'пиломатеріали',
        image: 'image/pilomat.jpg',
        description: 'Обрізні пиломатеріали хвойних порід загального призначення, у тому числі сухі, що відповідають вимогам національних стандартів. Використовуються у будівництві, столярстві та виробництві упаковки, постачаються в тому числі на експорт.'
    },
    dveri: {
        title: 'Двері',
        short: 'двері',
        image: 'image/gorgania/photo_1.jpg',
        description: 'Міжкімнатні двері торгової марки Gorgania — функціональні й сучасні рішення для житлових та комерційних приміщень. Повний каталог доступний на gorgania.com.ua.'
    },
    brykety: {
        title: 'Паливні брикети',
        short: 'паливні брикети',
        image: 'image/ruf.jpg',
        description: 'Альтернативний вид твердого палива (євродрова), виготовлений шляхом пресування деревних відходів. Висока щільність від 700 до 950 кг/м³ забезпечує триваліше горіння та меншу кількість золи порівняно з традиційними дровами.'
    }
};

const views = document.querySelectorAll('.view');
const menuLinks = document.querySelectorAll('.product-menu a');
const titleEl = document.getElementById('product-title');
const contentEl = document.getElementById('product-content');

const heroSlider = document.getElementById('hero-slider');

function showView(name) {
    views.forEach(v => {
        v.hidden = v.id !== `view-${name}`;
    });
    if (heroSlider) {
        heroSlider.hidden = name !== 'home';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
}

/* Лічильники в hero-stats-strip — стартують з "0+" і анімуються лише коли користувач
   доскролив до полоски (через IntersectionObserver). Один раз на сесію. */
let heroStatsAnimated = false;

function initHeroStats() {
    document.querySelectorAll('.hero-stat-num').forEach(el => {
        if (el.dataset.target !== undefined) return;
        const match = el.textContent.trim().match(/^(\d+)(\D*)$/);
        if (!match) return;
        el.dataset.target = match[1];
        el.dataset.suffix = match[2];
        el.textContent = '0' + match[2];
    });
}

function animateHeroStats() {
    if (heroStatsAnimated) return;
    heroStatsAnimated = true;

    document.querySelectorAll('.hero-stat-num').forEach(el => {
        const target = Number(el.dataset.target);
        if (!Number.isFinite(target)) return;
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

initHeroStats();

const heroStatsStrip = document.querySelector('.hero-stats-strip');
if (heroStatsStrip && 'IntersectionObserver' in window) {
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
    /* Старі браузери без IntersectionObserver — просто стартуємо одразу */
    animateHeroStats();
}

function setActiveLink(link) {
    menuLinks.forEach(l => l.classList.remove('active'));
    if (link) link.classList.add('active');
}

function renderProduct(productKey) {
    const product = products[productKey];
    if (!product) return;

    const sidebarLink = document.querySelector(`.product-menu a[data-product="${productKey}"]`);

    titleEl.textContent = product.title;
    const imageHtml = product.image
        ? `<figure class="product-figure"><img src="${product.image}" alt="${product.title}" loading="lazy"></figure>`
        : '';
    contentEl.innerHTML = `
        <p class="description">${product.description}</p>
        ${imageHtml}
    `;

    showView('product');
    setActiveLink(sidebarLink);
}

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const productKey = link.dataset.product;
        const viewName = link.dataset.view;

        if (productKey && products[productKey]) {
            renderProduct(productKey);
        } else if (viewName) {
            showView(viewName);
            setActiveLink(link);
        }
    });
});

document.querySelectorAll('.top-nav a[data-view]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showView(link.dataset.view);
        setActiveLink(null);
    });
});

/* Дропдаун "Продукція" в хедері — пункти ведуть на конкретний товар */
document.querySelectorAll('.top-nav a[data-product]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const productKey = link.dataset.product;
        if (products[productKey]) renderProduct(productKey);
    });
});

document.querySelectorAll('[data-view="home"], .logo').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        showView('home');
        setActiveLink(null);
    });
});

document.querySelectorAll('.inline-link[data-view]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showView(link.dataset.view);
        setActiveLink(null);
    });
});

document.querySelectorAll('[data-product-link]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        renderProduct(btn.dataset.productLink);
    });
});

document.querySelectorAll('[data-view-link]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showView(btn.dataset.viewLink);
        setActiveLink(null);
    });
});

/* Mobile burger menu */
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

    mobileMenu.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const productKey = link.dataset.product;
        const productLink = link.dataset.productLink;
        const viewName = link.dataset.view;

        if (productKey && products[productKey]) {
            e.preventDefault();
            renderProduct(productKey);
        } else if (productLink) {
            e.preventDefault();
            renderProduct(productLink);
        } else if (viewName) {
            e.preventDefault();
            showView(viewName);
            setActiveLink(null);
        }
        setMobileMenuOpen(false);
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

/* ========== Hero slider ==========
   Авто-перехід що 6 секунд, ручне керування через стрілки/точки/свайп.
   Пауза при наведенні мишею. Перший слайд preload-нутий через <link> у head. */
(() => {
    if (!heroSlider) return;

    const slides = heroSlider.querySelectorAll('.slide');
    if (slides.length < 2) return;

    const dotsContainer = heroSlider.querySelector('.slider-dots');
    const prevBtn = heroSlider.querySelector('.slider-prev');
    const nextBtn = heroSlider.querySelector('.slider-next');

    const AUTOPLAY_MS = 6000;
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
