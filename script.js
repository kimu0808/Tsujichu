(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const languageButton = document.querySelector('.lang-toggle');
  const search = document.querySelector('#product-search');
  const cards = [...document.querySelectorAll('.product-card')];
  let language = 'ja';

  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next;
    document.querySelectorAll('[data-ja][data-en]').forEach((el) => {
      const value = el.dataset[next];
      if (value !== undefined) el.innerHTML = value;
    });
    if (search) search.placeholder = (next === 'ja' ? search.dataset.placeholderJa : search.dataset.placeholderEn) || '';
    document.querySelector('.lang-ja').classList.toggle('active', next === 'ja');
    document.querySelector('.lang-en').classList.toggle('active', next === 'en');
    languageButton.setAttribute('aria-label', next === 'ja' ? 'Switch to English' : '日本語に切り替え');
  }

  languageButton.addEventListener('click', () => setLanguage(language === 'ja' ? 'en' : 'ja'));
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));

  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase();
    cards.forEach((card) => {
      const text = `${card.dataset.search} ${card.innerText}`.toLocaleLowerCase();
      card.hidden = !text.includes(query);
    });
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
  setLanguage('ja');
})();
