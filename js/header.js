// js/header.js
(async () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const closeMenu = document.getElementById('closeMenu');
  const navLinks = document.getElementById('navLinks');
  const accountDropdown = document.getElementById('accountDropdown');
  const accountMenu = document.getElementById('accountMenu');
  const mobileAccountDropdown = document.getElementById('mobileAccountDropdown');
  const mobileAccountMenu = document.getElementById('mobileAccountMenu');

  // -------------------- MOBILE MENU --------------------
  if (hamburger && mobileMenu && overlay && closeMenu) {
    const openMenu = () => {
  mobileMenu.classList.add('open');
  overlay.style.display = 'block';
  hamburger.classList.add('open');
  document.body.classList.add('menu-open'); // 👈 add
};

const closeMobileMenu = () => {
  mobileMenu.classList.remove('open');
  overlay.style.display = 'none';
  hamburger.classList.remove('open');
  document.body.classList.remove('menu-open'); // 👈 add
};

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMobileMenu() : openMenu();
    });
    closeMenu.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
  }

  // -------------------- DESKTOP ACCOUNT DROPDOWN --------------------
  if (accountDropdown) {
    const dropdownMenu = accountDropdown.querySelector('.dropdown-menu');
    accountDropdown.addEventListener('click', () => {
      dropdownMenu?.classList.toggle('show');
    });
  }

  // -------------------- AUTH LOGIC --------------------
  const { data: { user } } = await supabaseClient.auth.getUser();

  if (user) {
    // ------- LOGGED IN -------
    // Desktop
    if (accountMenu) {
      accountMenu.innerHTML = `<li><button class="dropdown-item" id="signOutBtn">Sign Out</button></li>`;
      document.getElementById('signOutBtn')?.addEventListener('click', async () => {
        await supabaseClient.auth.signOut();
        window.location.reload();
      });
    }

    // Mobile
if (mobileAccountMenu) {
  mobileAccountMenu.innerHTML = `
  <li class="list-unstyled">
    <button
      class="btn btn-dark mobile-login-btn"
      id="signOutMobileBtn"
      style="margin: 10px 18px; width: calc(100% - 36px);"
    >
      Sign Out
    </button>
  </li>
`;

  document
    .getElementById('signOutMobileBtn')
    ?.addEventListener('click', async () => {
      await supabaseClient.auth.signOut();
      window.location.reload();
    });
}
  } else {
    // ------- LOGGED OUT -------
    // Desktop: replace Account dropdown with Log In button
    if (navLinks) {
      const linksHTML = `
        <a href="index.html" style="margin-right: 20px;"><i class="fa-solid fa-house"></i>Dashboard</a>
        <a href="itineraries.html" style="margin-right: 10px;"><i class="fa-solid fa-map-location-dot"></i>Itineraries</a>
        <a href="login.html" class="btn btn-dark btn-sm nav-login-btn">Log In</a>
      `;
      navLinks.innerHTML = linksHTML;
    }

    // Mobile: hide account dropdown
    if (mobileAccountDropdown) mobileAccountDropdown.style.display = 'none';

    // Mobile: add login button
    if (mobileMenu) {
      const oldBtn = mobileMenu.querySelector('.mobile-login-btn');
      if (oldBtn) oldBtn.remove();

      const loginEl = document.createElement('a');
      loginEl.href = 'login.html';
      loginEl.textContent = 'Log In';
      loginEl.className = 'mobile-login-btn btn btn-dark';
      loginEl.style.display = 'block';
      loginEl.style.width = 'calc(100% - 36px)';
      loginEl.style.margin = '10px 18px';
      loginEl.style.textAlign = 'center';
      loginEl.addEventListener('mouseenter', () => loginEl.classList.add('btn-hover'));
      loginEl.addEventListener('mouseleave', () => loginEl.classList.remove('btn-hover'));

      mobileMenu.appendChild(loginEl);
    }
  }
})();