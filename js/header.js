(async () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const closeMenu = document.getElementById('closeMenu');

  const navItineraries = document.getElementById('navItineraries');
  const accountDropdown = document.getElementById('accountDropdown');
  const accountMenu = document.getElementById('accountMenu');
  const loginDesktopBtn = document.getElementById('loginDesktopBtn');

  const mobileItineraries = document.getElementById('mobileItineraries');
  const mobileAccountDropdown = document.getElementById('mobileAccountDropdown');
  const mobileAccountToggle = document.getElementById('mobileAccountToggle');
  const mobileAccountMenu = document.getElementById('mobileAccountMenu');
  const signOutMobileBtn = document.getElementById('signOutMobileBtn');
  const loginMobileBtn = document.getElementById('loginMobileBtn');

  /* ---------------- Mobile Menu ---------------- */
  const openMenu = () => {
    mobileMenu.classList.add('open');
    overlay.style.display = 'block';
    document.body.classList.add('menu-open');
  };

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('open');
    overlay.style.display = 'none';
    document.body.classList.remove('menu-open');
  };

  hamburger?.addEventListener('click', () =>
    mobileMenu.classList.contains('open') ? closeMobileMenu() : openMenu()
  );
  closeMenu?.addEventListener('click', closeMobileMenu);
  overlay?.addEventListener('click', closeMobileMenu);

  /* ---------------- Desktop Dropdown ---------------- */
  if (accountDropdown) {
    const dropdownMenu = accountDropdown.querySelector('.dropdown-menu');
    accountDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!accountDropdown.contains(e.target)) {
        dropdownMenu.classList.remove('show');
      }
    });
  }

  /* ---------------- Auth ---------------- */
  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) {
    /* LOGGED OUT */
    navItineraries.style.display = 'none';
    accountDropdown.style.display = 'none';
    loginDesktopBtn.style.display = 'inline-flex';

    mobileItineraries.style.display = 'none';
    mobileAccountDropdown.style.display = 'none';
    signOutMobileBtn.style.display = 'none';
    loginMobileBtn.style.display = 'block';
    return;
  }

  /* LOGGED IN */
  navItineraries.style.display = 'inline-flex';
  accountDropdown.style.display = 'block';
  loginDesktopBtn.style.display = 'none';

  mobileItineraries.style.display = 'block';
  mobileAccountDropdown.style.display = 'block';
  signOutMobileBtn.style.display = 'block';
  loginMobileBtn.style.display = 'none';

  /* Desktop account menu */
  accountMenu.innerHTML = `
    <li>
      <a class="dropdown-item d-flex align-items-center" href="account-dashboard.html">
        <i class="fa-solid fa-gear"></i> Account Management
      </a>
    </li>
    <li class="px-3 py-1">
      <button class="btn btn-dark w-100" id="desktopSignOutBtn">Sign Out</button>
    </li>
  `;

  document.getElementById('desktopSignOutBtn').addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    window.location.href = 'login.html';
  });

  /* Mobile account submenu */
  mobileAccountMenu.innerHTML = `
    <li>
      <a href="account-dashboard.html">
        <i class="fa-solid fa-gear"></i>
        <span>Account Management</span>
      </a>
    </li>
  `;

  mobileAccountToggle.addEventListener('click', () => {
    mobileAccountMenu.classList.toggle('expanded');
    mobileAccountToggle.classList.toggle('expanded');
  });

  signOutMobileBtn.addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    window.location.href = 'login.html';
  });
})();