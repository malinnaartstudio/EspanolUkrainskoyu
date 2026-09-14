const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const filters = document.querySelectorAll('[data-filter]');
const products = document.querySelectorAll('[data-category]');
const dialog = document.querySelector('[data-dialog]');
const dialogTitle = document.querySelector('[data-dialog-title]');
const dialogClose = document.querySelector('[data-dialog-close]');
const dialogDesc = document.querySelector('[data-dialog-desc]');
const dialogLink = document.querySelector('[data-dialog-link]');

const toggleHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
toggleHeader();
window.addEventListener('scroll', toggleHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

function applyFilter(category) {
  filters.forEach((filter) => {
    const selected = filter.dataset.filter === category;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-selected', String(selected));
  });
  products.forEach((product) => {
    product.classList.toggle('hide', category !== 'all' && product.dataset.category !== category);
  });
}

filters.forEach((filter) => filter.addEventListener('click', () => applyFilter(filter.dataset.filter)));
document.querySelectorAll('[data-filter-link]').forEach((link) => link.addEventListener('click', () => applyFilter(link.dataset.filterLink)));

document.querySelectorAll('[data-product]').forEach((button) => button.addEventListener('click', () => {
  const productName = button.dataset.product;
  dialogTitle.textContent = productName;
  dialogDesc.textContent = button.dataset.desc || '';
  if (button.dataset.link) { dialogLink.href = button.dataset.link; dialogLink.hidden = false; } else { dialogLink.hidden = true; }
  dialog.showModal();
}));

dialogClose?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
document.querySelector('[data-dialog-cta]')?.addEventListener('click', () => dialog.close());

document.querySelector('[data-year]').textContent = new Date().getFullYear();
