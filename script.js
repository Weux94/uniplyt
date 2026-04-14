const products = {
    dvp: {
        title: 'Деревоволокнисті плити (ДВП)',
        description: 'Листовий матеріал з деревних волокон, що формуються у килим шляхом сушіння або гарячого пресування. Широко застосовується у меблевій промисловості та будівництві завдяки міцності й універсальності — плити можна різати, шліфувати, склеювати та фарбувати.'
    },
    dvpo: {
        title: 'ДВПО — пофарбована ДВП',
        description: 'Деревоволокниста плита з лакофарбовим покриттям, нанесеним вальцьово-ротаційним методом. Використовується для задніх стінок меблів, днищ ящиків, оздоблення транспортних засобів, а також стін і стель у будівництві та дизайні інтер\'єрів.'
    },
    fanera: {
        title: 'Фанера',
        description: 'Фанера підвищеної водостійкості марки ФКМ з класом емісії Е1, а також березова фанера ФК. Продукція застосовується у меблевому виробництві, будівництві, автомобілебудуванні та інших галузях промисловості.'
    },
    pylomaterialy: {
        title: 'Пиломатеріали',
        description: 'Обрізні пиломатеріали хвойних порід загального призначення, у тому числі сухі, що відповідають вимогам національних стандартів. Використовуються у будівництві, столярстві та виробництві упаковки, постачаються в тому числі на експорт.'
    },
    dveri: {
        title: 'Двері',
        description: 'Міжкімнатні двері торгової марки Gorgania — функціональні й сучасні рішення для житлових та комерційних приміщень. Повний каталог доступний на gorgania.com.ua.'
    },
    brykety: {
        title: 'Паливні брикети',
        description: 'Альтернативний вид твердого палива (євродрова), виготовлений шляхом пресування деревних відходів. Висока щільність від 700 до 950 кг/м³ забезпечує триваліше горіння та меншу кількість золи порівняно з традиційними дровами.'
    }
};

const views = document.querySelectorAll('.view');
const menuLinks = document.querySelectorAll('.product-menu a');
const titleEl = document.getElementById('product-title');
const descEl = document.getElementById('product-description');

function showView(name) {
    views.forEach(v => {
        v.hidden = v.id !== `view-${name}`;
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function setActiveLink(link) {
    menuLinks.forEach(l => l.classList.remove('active'));
    if (link) link.classList.add('active');
}

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const productKey = link.dataset.product;
        const viewName = link.dataset.view;

        if (productKey && products[productKey]) {
            titleEl.textContent = products[productKey].title;
            descEl.textContent = products[productKey].description;
            showView('product');
            setActiveLink(link);
        } else if (viewName) {
            showView(viewName);
            setActiveLink(link);
        }
    });
});

document.querySelectorAll('[data-view="home"], .logo').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        showView('home');
        setActiveLink(null);
    });
});

document.querySelectorAll('.top-nav a[data-view]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showView(link.dataset.view);
        setActiveLink(null);
    });
});

document.querySelectorAll('.inline-link[data-view]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const viewName = link.dataset.view;
        showView(viewName);
        const sidebarLink = document.querySelector(`.product-menu a[data-view="${viewName}"]`);
        setActiveLink(sidebarLink);
    });
});

document.querySelectorAll('[data-product-link]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const key = btn.dataset.productLink;
        const data = products[key];
        if (!data) return;
        titleEl.textContent = data.title;
        descEl.textContent = data.description;
        showView('product');
        const sidebarLink = document.querySelector(`.product-menu a[data-product="${key}"]`);
        setActiveLink(sidebarLink);
    });
});

document.querySelectorAll('[data-view-link]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showView(btn.dataset.viewLink);
        setActiveLink(null);
    });
});
