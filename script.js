document.getElementById('year').textContent = new Date().getFullYear();

/* Loader */
window.addEventListener('load', () => setTimeout(() => document.getElementById('loader').classList.add('hide'), 500));

/* Theme toggle */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
function setTheme(t) {
    root.setAttribute('data-theme', t);
    themeToggle.textContent = t === 'light' ? '☀️' : '🌙';
    localStorage.setItem('theme', t);
}
setTheme(localStorage.getItem('theme') || 'dark');
themeToggle.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'));

/* Mobile nav */
const navlinks = document.getElementById('navlinks');
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
    navlinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navlinks.classList.contains('open'));
});
navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));

/* Scroll progress */
window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    document.getElementById('progress').style.width = pct + '%';
});

/* Reveal on scroll */
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('show');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* Typing effect */
const roles = ["Power BI Developer", "Machine Learning Engineer", "Cloud Computing Engineer", "Data Analyst", "Python Developer"];
let rIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');
function typeLoop() {
    const word = roles[rIdx];
    typedEl.textContent = deleting ? word.substring(0, cIdx--) : word.substring(0, cIdx++);
    let speed = deleting ? 40 : 75;
    if (!deleting && cIdx === word.length + 1) {
        deleting = true;
        speed = 1400;
    } else if (deleting && cIdx === 0) {
        deleting = false;
        rIdx = (rIdx + 1) % roles.length;
        speed = 300;
    }
    setTimeout(typeLoop, speed);
}
typeLoop();

/* Skill bars animate on view */
const skillIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            document.querySelectorAll('.skillbar').forEach(el => {
                if (el.dataset.built) return;
                el.dataset.built = "1";
                const row = document.createElement('div');
                row.className = 'skillbar-row';
                row.innerHTML = `<div class="name">${el.dataset.name}</div><div class="skillbar-track"><div class="skillbar-fill"></div></div><div class="pct mono">${el.dataset.pct}%</div>`;
                el.replaceWith(row);
                setTimeout(() => row.querySelector('.skillbar-fill').style.width = el.dataset.pct + '%', 100);
            });
        }
    });
});
document.querySelectorAll('#skills').forEach(el => skillIO.observe(el));

/* Animated counters */
function animateCounter(el, target) {
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const iv = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(iv); }
        el.textContent = cur;
    }, 25);
}
const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            document.querySelectorAll('.cnum').forEach(el => animateCounter(el, parseInt(el.dataset.count) || 0));
            counterIO.disconnect();
        }
    });
});
const statsSection = document.getElementById('stats');
if (statsSection) counterIO.observe(statsSection);

/* Contact form -> mailto */
document.getElementById('contactForm').addEventListener('submit', function (ev) {
    ev.preventDefault();
    const name = document.getElementById('cf-name').value;
    const email = document.getElementById('cf-email').value;
    const subject = document.getElementById('cf-subject').value;
    const message = document.getElementById('cf-message').value;
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:prd247757@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
});

/* ---------- Dashboard placeholders ---------- */
const dashboards = [
    { name: "Sales Dashboard", desc: "Regional sales trends, product mix and target-vs-actual tracking.", color: "#4f7cff" },
    { name: "Financial Dashboard", desc: "P&L summary, cash flow and expense breakdown by department.", color: "#22d3b0" },
    { name: "HR Analytics Dashboard", desc: "Headcount, attrition rate and hiring funnel visualizations.", color: "#a78bfa" },
    { name: "Student Performance Dashboard", desc: "Grade distribution, attendance and subject-wise performance.", color: "#f59e0b" },
    { name: "Hospital Dashboard", desc: "Patient inflow, bed occupancy and department-wise load.", color: "#ef4444" },
    { name: "Inventory Dashboard", desc: "Stock levels, reorder points and warehouse turnover.", color: "#0ea5e9" },
];
const dashGrid = document.getElementById('dashGrid');
dashboards.forEach(d => {
    const card = document.createElement('div');
    card.className = 'card dash-card reveal';
    card.innerHTML = `<div class="dash-thumb"><svg viewBox="0 0 100 60"><rect x="5" y="30" width="10" height="25" fill="${d.color}" opacity="0.85"/><rect x="20" y="15" width="10" height="40" fill="${d.color}" opacity="0.65"/><rect x="35" y="24" width="10" height="31" fill="${d.color}" opacity="0.9"/><rect x="50" y="8" width="10" height="47" fill="${d.color}" opacity="0.5"/><rect x="65" y="20" width="10" height="35" fill="${d.color}" opacity="0.8"/><polyline points="10,28 25,13 40,22 55,6 70,18 85,10" fill="none" stroke="${d.color}" stroke-width="2"/></svg></div><div class="dash-info"><h4>${d.name}</h4><p>Click for details</p></div>`;
    card.addEventListener('click', () => {
        document.getElementById('modalTitle').textContent = d.name;
        document.getElementById('modalDesc').textContent = d.desc + " — add your real screenshot and Power BI publish link here.";
        document.getElementById('modalOverlay').classList.add('open');
    });
    dashGrid.appendChild(card);
    io.observe(card);
});
document.getElementById('modalClose').addEventListener('click', () => document.getElementById('modalOverlay').classList.remove('open'));
document.getElementById('modalOverlay').addEventListener('click', (e) => { if (e.target.id === 'modalOverlay') e.target.classList.remove('open'); });

/* ---------- ML showcase ---------- */
const mlModels = [
    { n: "01", t: "Classification Models", d: "Predicting categorical outcomes — e.g. spam detection, churn prediction — using logistic regression, decision trees and ensembles." },
    { n: "02", t: "Regression Models", d: "Forecasting continuous values like prices or demand using linear and regularized regression techniques." },
    { n: "03", t: "Recommendation Systems", d: "Content-based and collaborative filtering to suggest relevant items to users." },
    { n: "04", t: "Computer Vision", d: "Image classification and object detection pipelines using CNNs." },
    { n: "05", t: "Natural Language Processing", d: "Text classification, sentiment analysis and embeddings for language tasks." },
    { n: "06", t: "Speech Recognition", d: "Converting audio to text using signal processing and sequence models." },
];
const mlGrid = document.getElementById('mlGrid');
mlModels.forEach(m => {
    const card = document.createElement('div');
    card.className = 'card ml-card reveal';
    card.innerHTML = `<span class="num">${m.n}</span><h4 style="font-size:16px;margin-bottom:8px;">${m.t}</h4><p style="font-size:13.5px;color:var(--text-muted);line-height:1.6;">${m.d}</p>`;
    mlGrid.appendChild(card);
    io.observe(card);
});

/* ---------- Cloud section ---------- */
const cloudItems = [
    { i: "☁️", t: "AWS, Azure & GCP", d: "Core services across the big three — compute, storage and managed databases." },
    { i: "🖥️", t: "Virtual Machines", d: "Provisioning and configuring VMs for hosting apps and running experiments." },
    { i: "🗄️", t: "Storage & Databases", d: "Object storage, blob storage and managed relational/NoSQL databases." },
    { i: "📦", t: "Docker", d: "Containerizing applications for consistent, portable deployment." },
    { i: "🚀", t: "Deployment & CI/CD", d: "Automated build-test-deploy pipelines for faster, safer releases." },
    { i: "🏗️", t: "Cloud Architecture", d: "Designing scalable, cost-aware architectures for data & ML workloads." },
];
const cloudGrid = document.getElementById('cloudGrid');
cloudItems.forEach(c => {
    const card = document.createElement('div');
    card.className = 'card cloud-item reveal';
    card.innerHTML = `<div class="cloud-icon" style="font-size:20px;">${c.i}</div><div><h4 style="font-size:15.5px;margin-bottom:6px;">${c.t}</h4><p style="font-size:13.5px;color:var(--text-muted);">${c.d}</p></div>`;
    cloudGrid.appendChild(card);
    io.observe(card);
});

/* ---------- GitHub live data: profile + repos ---------- */
const GH_USER = "dvs2121";
const langColors = {
    JavaScript: "#f1e05a", Python: "#3572A5", HTML: "#e34c26", CSS: "#563d7c",
    TypeScript: "#3178c6", "Jupyter Notebook": "#DA5B0B", Java: "#b07219", Shell: "#89e051", default: "#8a94a6"
};

async function loadGitHub() {
    const statusEl = document.getElementById('projects-status');
    const grid = document.getElementById('projectsGrid');
    try {
        const [profileRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${GH_USER}`),
            fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=100`)
        ]);
        if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub API request failed');
        
        const profile = await profileRes.json();
        const repos = await reposRes.json();
        
        document.getElementById('stat-repos').textContent = profile.public_repos ?? repos.length;
        document.getElementById('stat-followers').textContent = profile.followers ?? '–';
        const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
        document.getElementById('stat-stars').textContent = totalStars;
        
        document.getElementById('c1').dataset.count = repos.length;
        document.getElementById('c4').dataset.count = totalStars;
        
        if (!repos.length) {
            statusEl.textContent = "No public repositories found yet.";
            return;
        }
        
        statusEl.textContent = `${repos.length} public repositories synced from GitHub.`;
        const sorted = repos.filter(r => !r.fork).sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)));
        
        const languages = new Set(['all']);
        sorted.forEach(r => { if (r.language) languages.add(r.language); });
        
        const filterRow = document.getElementById('filterRow');
        filterRow.style.display = 'flex';
        [...languages].forEach(lang => {
            if (lang === 'all') return;
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.filter = lang;
            btn.textContent = lang;
            filterRow.appendChild(btn);
        });
        
        function render(filter) {
            grid.innerHTML = '';
            const list = filter === 'all' ? sorted : sorted.filter(r => r.language === filter);
            if (!list.length) {
                grid.innerHTML = '<p class="mono" style="color:var(--text-muted);">No repositories match this filter.</p>';
                return;
            }
            list.slice(0, 12).forEach(r => {
                const card = document.createElement('div');
                card.className = 'card proj-card reveal';
                const color = langColors[r.language] || langColors.default;
                card.innerHTML = `
                    <div class="proj-top">
                        <div class="proj-name">${r.name}</div>
                        <div class="proj-stats">
                            <span>★ ${r.stargazers_count}</span><span>⑂ ${r.forks_count}</span>
                        </div>
                    </div>
                    <p class="proj-desc">${r.description ? r.description : 'No description provided — add one on GitHub to feature it here.'}</p>
                    ${r.language ? `<div class="proj-lang"><span class="lang-dot" style="background:${color}"></span>${r.language}</div>` : ''}
                    <div class="proj-links">
                        <a href="${r.html_url}" target="_blank">GitHub ↗</a>
                        ${r.homepage ? `<a href="${r.homepage}" target="_blank">Live Demo ↗</a>` : ''}
                    </div>`;
                grid.appendChild(card);
                io.observe(card);
            });
        }
        
        render('all');
        filterRow.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filterRow.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                render(e.target.dataset.filter);
            }
        });
    } catch (err) {
        statusEl.textContent = "Couldn't reach the GitHub API right now (rate limit or network) — showing profile link instead.";
        grid.innerHTML = `<div class="card"><p style="color:var(--text-muted);">Visit <a href="https://github.com/${GH_USER}" target="_blank" style="color:var(--accent);">github.com/${GH_USER}</a> directly to browse all repositories.</p></div>`;
    }
}
loadGitHub();