async function getMembers() {
  try {
    const resp = await fetch('data/members.json');
    if (!resp.ok) throw new Error('Network response was not ok');
    const members = await resp.json();
    return members;
  } catch (err) {
    console.error('Failed to fetch members:', err);
    return [];
  }
}

function membershipBadge(level) {
  if (level === 3) return 'gold';
  if (level === 2) return 'silver';
  return 'member';
}

function renderMembers(members, view = 'grid') {
  const container = document.getElementById('membersContainer');
  if (!container) return;

  container.innerHTML = '';
  container.classList.toggle('list-view', view === 'list');

  if (members.length === 0) {
    container.innerHTML = '<p>No hay miembros para mostrar.</p>';
    return;
  }

  members.forEach(m => {
    const card = document.createElement('article');
    card.className = `member-card ${membershipBadge(m.membership)}`;
    card.innerHTML = `
      <img src="images/${m.image}" alt="Logo ${m.name}" loading="lazy" />
      <div class="member-info">
        <h3>${m.name}</h3>
        <p class="category">${m.category} • ${m.address}</p>
        <p class="phone">Tel: ${m.phone}</p>
        <p><a href="${m.website}" target="_blank" rel="noopener">Sitio web</a></p>
        <p class="email">${m.email}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function setupViewButtons() {
  const gridBtn = document.getElementById('viewGrid');
  const listBtn = document.getElementById('viewList');

  if (!gridBtn || !listBtn) return;

  gridBtn.addEventListener('click', () => {
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
    renderMembers(window._membersData || [], 'grid');
  });

  listBtn.addEventListener('click', () => {
    gridBtn.setAttribute('aria-pressed', 'false');
    listBtn.setAttribute('aria-pressed', 'true');
    renderMembers(window._membersData || [], 'list');
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  setupViewButtons();

  const members = await getMembers();
  window._membersData = members;
  renderMembers(members, 'grid');

  const levelSelect = document.getElementById('membershipFilter');
  if (levelSelect) {
    levelSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      const filtered = val === 'all'
        ? window._membersData
        : window._membersData.filter(m => String(m.membership) === val);
      const currentView = document.getElementById('viewList')?.getAttribute('aria-pressed') === 'true' ? 'list' : 'grid';
      renderMembers(filtered, currentView);
    });
  }
});
