const products = {
    dvp: {
        title: 'Деревоволокнисті плити (ДВП)',
        short: 'ДВП',
        description: 'Листовий матеріал з деревних волокон, що формуються у килим шляхом сушіння або гарячого пресування. Широко застосовується у меблевій промисловості та будівництві завдяки міцності й універсальності — плити можна різати, шліфувати, склеювати та фарбувати.'
    },
    dvpo: {
        title: 'ДВПО — пофарбована ДВП',
        short: 'ДВПО',
        description: 'Деревоволокниста плита з лакофарбовим покриттям, нанесеним вальцьово-ротаційним методом. Використовується для задніх стінок меблів, днищ ящиків, оздоблення транспортних засобів, а також стін і стель у будівництві та дизайні інтер\'єрів.'
    },
    fanera: {
        title: 'Фанера',
        short: 'фанеру',
        description: 'Фанера підвищеної водостійкості марки ФКМ з класом емісії Е1, а також березова фанера ФК. Продукція застосовується у меблевому виробництві, будівництві, автомобілебудуванні та інших галузях промисловості.'
    },
    pylomaterialy: {
        title: 'Пиломатеріали',
        short: 'пиломатеріали',
        description: 'Обрізні пиломатеріали хвойних порід загального призначення, у тому числі сухі, що відповідають вимогам національних стандартів. Використовуються у будівництві, столярстві та виробництві упаковки, постачаються в тому числі на експорт.'
    },
    dveri: {
        title: 'Двері',
        short: 'двері',
        description: 'Міжкімнатні двері торгової марки Gorgania — функціональні й сучасні рішення для житлових та комерційних приміщень. Повний каталог доступний на gorgania.com.ua.'
    },
    brykety: {
        title: 'Паливні брикети',
        short: 'паливні брикети',
        description: 'Альтернативний вид твердого палива (євродрова), виготовлений шляхом пресування деревних відходів. Висока щільність від 700 до 950 кг/м³ забезпечує триваліше горіння та меншу кількість золи порівняно з традиційними дровами.'
    }
};

// Contexts that support "виводити інформацію про конкретний продукт"
const productContexts = {
    sertyfikaty: {
        label: 'Сертифікати',
        sidebarTitle: 'Сертифікати продукту',
        titleTpl: 'Сертифікати на {product}',
        paragraphs: [
            'Продукт {product} виробляється у рамках сертифікованого FSC® CoC-ланцюжка постачання (ліцензія FSC-C112264, дійсна до 02.10.2027). Це підтверджує, що сировина походить з легальних і відповідально керованих лісів, а кожен етап виробництва підлягає аудиту.',
            '{ProductCap} відповідає вимогам українських стандартів ДСТУ, ГОСТ та УкрСЕПРО, супроводжується висновками санітарно-епідеміологічної служби та сертифікатом відповідності на готову продукцію.',
            'На запит клієнта до кожної партії {product} ми додаємо повний пакет документів: сертифікат якості, паспорт партії, протоколи лабораторних випробувань і радіологічні висновки. Усе прозоро, усе офіційно.'
        ]
    },
    foto: {
        label: 'Фото виробництва',
        sidebarTitle: 'Фото виробництва',
        titleTpl: 'Фото виробництва — {ProductCap}',
        paragraphs: [
            'На цій сторінці представлені фото ключових етапів виробництва {product}: від приймання сировини та підготовки щепи — до пресування, сушіння й фінішної обробки готової плити.',
            'Усі процеси контролюються оператором і заводською лабораторією якості. Обладнання — сучасне європейське, яке ми регулярно модернізуємо для підвищення продуктивності та зниження впливу на довкілля.',
            'Галерея постійно поповнюється новими фото з цеху. Незабаром ви зможете побачити повний виробничий цикл {product} у деталях.'
        ]
    },
    quality: {
        label: 'Система якості',
        sidebarTitle: 'Якість продукту',
        titleTpl: 'Система якості — {ProductCap}',
        paragraphs: [
            'Якість {product} контролюється за показниками ДСТУ, ГОСТ та УкрСЕПРО. Кожна партія проходить лабораторні випробування на щільність, міцність, вологість і клас емісії формальдегіду — без винятків.',
            'Виробництво {product} ведеться на сучасному європейському обладнанні, що забезпечує стабільність параметрів від партії до партії. Технологічні режими перевіряються в режимі реального часу.',
            'Ми не йдемо на компроміси там, де йдеться про безпеку. Кожна одиниця продукції, яка покидає наш цех, відповідає заявленим у паспорті характеристикам — інакше вона просто не виходить за ворота.'
        ]
    },
    syrovyna: {
        label: 'Сировина',
        sidebarTitle: 'Сировина продукту',
        titleTpl: 'Сировина для {product}',
        paragraphs: [
            'Для виготовлення {product} ми використовуємо виключно ліквідну деревину з легальних джерел. FSC® CoC-сертифікат підтверджує відповідальне походження сировини та контроль ланцюжка постачання на кожному етапі.',
            'Незаконно заготовлений лісоматеріал чи деревина без необхідних дозволів у наше виробництво не потрапляють. Ми працюємо лише з перевіреними постачальниками, з якими співпрацюємо роками.',
            'Уся сировина, що йде на {product}, додатково перевіряється на радіаційне забруднення та супроводжується відповідними сертифікатами. Безпека — це не опція, а базова вимога.'
        ]
    },
    bezpeka: {
        label: 'Безпека матеріалів',
        sidebarTitle: 'Безпека продукту',
        titleTpl: 'Безпека матеріалів — {ProductCap}',
        paragraphs: [
            '{ProductCap} дозволено Міністерством охорони здоров\'я України до використання в житлових, громадських і виробничих приміщеннях. У виробництві застосовуються виключно екологічно безпечні компоненти.',
            'Кожна партія {product} проходить вхідний лабораторний контроль і санітарно-епідеміологічний нагляд обласної СЕС. Це гарантує відповідність і українським, і європейським нормам безпеки.',
            'Ми орієнтуємось на вимоги директив ЄС щодо екологічності та безпеки продукції — це одночасно відкриває нам європейські ринки й забезпечує найвищий рівень захисту для українського споживача.'
        ]
    }
};

let currentContext = null;

const views = document.querySelectorAll('.view');
const menuLinks = document.querySelectorAll('.product-menu a');
const titleEl = document.getElementById('product-title');
const contentEl = document.getElementById('product-content');
const breadcrumbEl = document.getElementById('product-breadcrumb');
const sidebarTitleEl = document.getElementById('sidebar-title');

function updateSidebarTitle() {
    if (currentContext && productContexts[currentContext]?.sidebarTitle) {
        sidebarTitleEl.textContent = productContexts[currentContext].sidebarTitle;
    } else {
        sidebarTitleEl.textContent = 'Продукція';
    }
}

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

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function fillTemplate(str, product) {
    return str
        .replace(/{product}/g, product.short)
        .replace(/{ProductCap}/g, capitalize(product.short))
        .replace(/{title}/g, product.title);
}

function renderProduct(productKey) {
    const product = products[productKey];
    if (!product) return;

    const sidebarLink = document.querySelector(`.product-menu a[data-product="${productKey}"]`);

    if (currentContext && productContexts[currentContext]) {
        const ctx = productContexts[currentContext];
        titleEl.textContent = fillTemplate(ctx.titleTpl, product);
        breadcrumbEl.hidden = false;
        breadcrumbEl.innerHTML = `<a href="#" data-ctx-back="${currentContext}">${ctx.label}</a> <span class="breadcrumb-sep">›</span> <span>${product.title}</span>`;
        contentEl.innerHTML = ctx.paragraphs
            .map(p => `<p class="description">${fillTemplate(p, product)}</p>`)
            .join('');
    } else {
        titleEl.textContent = product.title;
        breadcrumbEl.hidden = true;
        breadcrumbEl.innerHTML = '';
        contentEl.innerHTML = `
            <p class="description">${product.description}</p>
            <div class="grid-placeholder">
                <div class="box"></div>
                <div class="box"></div>
            </div>
        `;
    }

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
            currentContext = null;
            updateSidebarTitle();
            showView(viewName);
            setActiveLink(link);
        }
    });
});

document.querySelectorAll('.top-nav a[data-view]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        currentContext = productContexts[view] ? view : null;
        updateSidebarTitle();
        showView(view);
        setActiveLink(null);
    });
});

document.querySelectorAll('[data-view="home"], .logo').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        currentContext = null;
        updateSidebarTitle();
        showView('home');
        setActiveLink(null);
    });
});

document.querySelectorAll('.inline-link[data-view]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const viewName = link.dataset.view;
        currentContext = productContexts[viewName] ? viewName : null;
        updateSidebarTitle();
        showView(viewName);
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
        currentContext = null;
        updateSidebarTitle();
        showView(btn.dataset.viewLink);
        setActiveLink(null);
    });
});

// Breadcrumb — click on context name returns to that context's general view
document.addEventListener('click', (e) => {
    const back = e.target.closest('[data-ctx-back]');
    if (!back) return;
    e.preventDefault();
    const ctx = back.dataset.ctxBack;
    showView(ctx);
    setActiveLink(null);
});
