/* Set this to the verified payment provider URL before enabling direct checkout. */
const CONVORIA_MSP_CHECKOUT_URL = '';
const THEME_STORAGE_KEY = 'convoria-theme';

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch (error) { /* Storage can be unavailable. */ }
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    const isDark = theme === 'dark';
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    button.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    button.querySelector('[data-theme-icon]').textContent = isDark ? '☀' : '☾';
  });
}

function updateActiveNavigation() {
  const path = window.location.pathname.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
  let active = path === '/msp-billing-toolkit' ? 'toolkit' : path === '/' ? 'home' : '';
  if (path === '/' && window.location.hash) {
    const hash = window.location.hash.slice(1);
    if (['solutions', 'about', 'contact'].includes(hash)) active = hash;
  }
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-site-nav]');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const savedTheme = document.documentElement.dataset.theme || 'light';
  setTheme(savedTheme);
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
  });

  updateActiveNavigation();
  window.addEventListener('hashchange', updateActiveNavigation);

  document.querySelectorAll('[data-checkout]').forEach((element) => {
    if (CONVORIA_MSP_CHECKOUT_URL) {
      element.href = CONVORIA_MSP_CHECKOUT_URL;
      element.removeAttribute('aria-disabled');
      element.textContent = 'Get early access for £49';
    }
  });
});
