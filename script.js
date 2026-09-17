const root = document.documentElement;
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const projects = [
  { name: 'HotFlamee / Deeksha Caterers', repo: 'hotinflame', category: 'Full Stack', tags: ['Full Stack', 'Cloud'], description: 'A modern catering-services platform with menu browsing, guest quotation requests, contact workflows and an admin management surface.', problem: 'Catering businesses need a clear digital menu and a reliable way to turn event requirements into structured quote requests.', solution: 'A static frontend connected to an Express and MongoDB Atlas backend, with public customer workflows and protected admin operations.', features: ['Menu and category management', 'Guest quotation workflow', 'Admin authentication and uploads', 'Live deployment'], color: 'amber', live: 'https://hotinflamee.vercel.app/' },
  { name: 'SmartML Data Cleaner', repo: 'SmartML_DataCleaner', category: 'Data Analytics', tags: ['Python', 'Data Analytics'], description: 'A beginner-friendly web app to clean, profile and preprocess CSV datasets for machine learning.', problem: 'Messy datasets slow down the modeling workflow and make early mistakes hard to see.', solution: 'A guided application for profiling, cleaning and preparing CSV data before modeling.', features: ['CSV profiling', 'Data preprocessing', 'ML-ready exports'], color: 'cyan' },
  { name: 'Fraud Transaction Detection', repo: 'fraud_transaction_detection', category: 'AI/ML', tags: ['AI/ML', 'Python'], description: 'An end-to-end machine learning pipeline for detecting fraudulent financial transactions with anomaly detection.', problem: 'Financial transaction data can hide rare, high-impact anomalies.', solution: 'A focused detection workflow that treats fraud as an anomaly detection problem.', features: ['Transaction analysis', 'Anomaly detection', 'End-to-end workflow'], color: 'lime' },
  { name: 'Handwritten Character Recognition', repo: 'handwrittem_chaeacter_recognition', category: 'AI/ML', tags: ['AI/ML', 'Python'], description: 'A machine learning application recognizing handwritten alphabets and characters with multiple classifiers.', problem: 'Handwritten input varies widely in shape, scale and quality.', solution: 'Compare classification approaches in a user-facing recognition application.', features: ['Character recognition', 'Logistic Regression', 'SVM and Random Forest'], color: 'violet' },
  { name: 'Speech Emotion Detection', repo: 'emmotion_detection_system', category: 'AI/ML', tags: ['AI/ML', 'Python'], description: 'A speech emotion recognition system identifying human emotions from audio recordings using deep learning.', problem: 'Human emotion is a subtle signal carried through voice and audio patterns.', solution: 'Use audio recordings and deep learning to classify a set of emotional states.', features: ['Audio input', 'Emotion classes', 'Deep learning'], color: 'amber' },
  { name: 'Cloud Based Bus Pass', repo: 'cloud_based_bus_pass', category: 'Cloud', tags: ['Cloud', 'Full Stack', 'Python'], description: 'A cloud-native bus ticketing system designed for reliable, accurate ticketing at scale.', problem: 'Ticketing systems need dependable pricing and protection against ticket loss.', solution: 'A cloud-oriented application for ticket management and accurate fare handling.', features: ['Ticket management', 'Cloud architecture', 'Accurate pricing'], color: 'blue' },
  { name: 'Disease Detection System', repo: 'disease_detectio_system', category: 'Full Stack', tags: ['Full Stack', 'AI/ML', 'Python'], description: 'A full-stack machine learning application that predicts the risk of heart disease, diabetes and breast cancer.', problem: 'Health risk screening benefits from accessible, structured prediction tools.', solution: 'Bring multiple predictive models into one application experience.', features: ['Multi-condition prediction', 'Full-stack interface', 'ML integration'], color: 'rose' }
];

function setTheme(theme) {
  root.dataset.theme = theme;
  const toggle = $('#themeToggle');
  toggle.textContent = theme === 'light' ? '☼' : '◐';
  toggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  localStorage.setItem('theme', theme);
}
function escapeHtml(value) { return String(value).replace(/[&<>'\"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '\"': '&quot;' }[character])); }
function renderProjects(filter = 'all') {
  const grid = $('#projectsGrid');
  const visible = filter === 'all' ? projects : projects.filter(project => project.tags.includes(filter));
  grid.innerHTML = visible.map((project, index) => `<article class="project-card reveal" style="--delay:${index * 45}ms"><button class="project-art art-${project.color}" data-project="${project.repo}" type="button" aria-label="Open details for ${escapeHtml(project.name)}"><span class="art-grid"></span><span class="art-code mono">${String(index + 1).padStart(2, '0')}</span><strong>${escapeHtml(project.category)}</strong><span class="art-line"></span></button><div class="project-card-body"><div class="project-meta"><span class="card-kicker mono">${escapeHtml(project.category)}</span><span class="mono">${String(index + 1).padStart(2, '0')}</span></div><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.description)}</p><div class="project-tags">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div><div class="project-links"><button class="text-link" data-project="${project.repo}" type="button">Case study <span>↗</span></button><a class="text-link" href="https://github.com/dvs2121/${project.repo}" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a></div></div></article>`).join('');
  observeReveals();
}
function openProject(repo) {
  const project = projects.find(item => item.repo === repo);
  if (!project) return;
  const modal = $('#modalOverlay');
  $('#modalContent').innerHTML = `<p class="eyebrow">${escapeHtml(project.category)}</p><h2 id="modalTitle">${escapeHtml(project.name)}</h2><p id="modalDesc" class="modal-lede">${escapeHtml(project.description)}</p><div class="modal-grid"><div><span class="card-kicker mono">Problem</span><p>${escapeHtml(project.problem)}</p></div><div><span class="card-kicker mono">Solution</span><p>${escapeHtml(project.solution)}</p></div></div><div class="modal-features"><span class="card-kicker mono">Key features</span><ul>${project.features.map(feature => `<li>${escapeHtml(feature)}</li>`).join('')}</ul></div><div class="modal-actions"><a class="btn btn-primary" href="https://github.com/dvs2121/${project.repo}" target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>${project.live ? `<a class="btn btn-ghost" href="${project.live}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>` : ''}<button class="btn btn-ghost" id="modalDone" type="button">Close</button></div>`;
  modal.classList.add('open'); document.body.classList.add('modal-open'); $('#modalClose').focus();
}
function closeModal() { $('#modalOverlay').classList.remove('open'); document.body.classList.remove('modal-open'); }
function observeReveals() {
  if (!('IntersectionObserver' in window)) { $$('.reveal').forEach(element => element.classList.add('show')); return; }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
  $$('.reveal:not(.show)').forEach(element => observer.observe(element));
}
async function enrichGitHubStats() {
  try { const response = await fetch('https://api.github.com/users/dvs2121', { headers: { Accept: 'application/vnd.github+json' } }); if (!response.ok) throw new Error('GitHub request failed'); const profile = await response.json(); if (Number.isFinite(profile.public_repos) && profile.public_repos > 0) $('#stat-repos').textContent = profile.public_repos; } catch { /* Local project data remains the visitor-facing fallback. */ }
}
document.addEventListener('DOMContentLoaded', () => {
  setTheme(localStorage.getItem('theme') || 'dark'); $('#year').textContent = new Date().getFullYear(); setTimeout(() => $('#loader').classList.add('hide'), 350); observeReveals(); renderProjects(); enrichGitHubStats();
  $('#themeToggle').addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));
  $('#hamburger').addEventListener('click', () => { const links = $('#navlinks'); const open = links.classList.toggle('open'); $('#hamburger').setAttribute('aria-expanded', String(open)); });
  $$('#navlinks a').forEach(link => link.addEventListener('click', () => { $('#navlinks').classList.remove('open'); $('#hamburger').setAttribute('aria-expanded', 'false'); }));
  $('#filterRow').addEventListener('click', event => { const button = event.target.closest('.filter-btn'); if (!button) return; $$('.filter-btn').forEach(item => item.classList.remove('active')); button.classList.add('active'); renderProjects(button.dataset.filter); });
  $('#projectsGrid').addEventListener('click', event => { const trigger = event.target.closest('[data-project]'); if (trigger) openProject(trigger.dataset.project); });
  $('#modalClose').addEventListener('click', closeModal); $('#modalOverlay').addEventListener('click', event => { if (event.target === $('#modalOverlay')) closeModal(); }); document.addEventListener('click', event => { if (event.target.id === 'modalDone') closeModal(); }); document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
  $('#printResume').addEventListener('click', () => window.print());
  $('.github-chart img').addEventListener('error', event => { const chart = event.currentTarget.closest('.github-chart'); event.currentTarget.remove(); chart.textContent = 'Contribution activity is available on GitHub.'; });
  const sections = $$('main section[id]'); const navObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) $$('#navlinks a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)); }), { rootMargin: '-30% 0px -60% 0px' }); sections.forEach(section => navObserver.observe(section));
  window.addEventListener('scroll', () => { const page = document.documentElement; $('#progress').style.width = `${(page.scrollTop / (page.scrollHeight - page.clientHeight)) * 100}%`; }, { passive: true });
});