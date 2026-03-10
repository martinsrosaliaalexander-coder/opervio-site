const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

const serviceSelect = document.getElementById('serviceSelect');
const urgencySelect = document.getElementById('urgencySelect');
const moduleInput = document.getElementById('moduleInput');
const moduleValue = document.getElementById('moduleValue');
const estimateTotal = document.getElementById('estimateTotal');

function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function updateEstimate() {
  const base = Number(serviceSelect.value);
  const urgency = Number(urgencySelect.value);
  const modules = Number(moduleInput.value);
  const extra = (modules - 1) * Math.max(120, Math.round(base * 0.18));
  const total = base + urgency + extra;
  moduleValue.textContent = `${modules} ${modules === 1 ? 'unidade' : 'unidades'}`;
  estimateTotal.textContent = formatBRL(total);
}

[serviceSelect, urgencySelect, moduleInput].forEach(el => el && el.addEventListener('input', updateEstimate));
updateEstimate();
