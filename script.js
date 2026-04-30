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

function showView(name) {
    views.forEach(v => {
        v.hidden = v.id !== `view-${name}`;
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (name === 'home') animateHeroStats();
}

function animateHeroStats() {
    const nums = document.querySelectorAll('.hero-stat-num');
    nums.forEach(el => {
        if (el.dataset.target === undefined) {
            const raw = el.textContent.trim();
            const match = raw.match(/^(\d+)(\D*)$/);
            if (!match) return;
            el.dataset.target = match[1];
            el.dataset.suffix = match[2];
        }
        const target = Number(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        el.textContent = '0' + suffix;
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const value = Math.round(target * eased);
            el.textContent = value + suffix;
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

animateHeroStats();

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
