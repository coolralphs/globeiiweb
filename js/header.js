(async () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const closeMenu = document.getElementById('closeMenu');
  const navLinks = document.getElementById('navLinks');
  const accountDropdown = document.getElementById('accountDropdown');
  const accountMenu = document.getElementById('accountMenu');
  const mobileAccountToggle = document.getElementById('mobileAccountToggle');
  const mobileAccountMenu = document.getElementById('mobileAccountMenu');

  // Mobile menu open/close
  if (hamburger && mobileMenu && overlay && closeMenu) {
    const openMenu = () => {
      mobileMenu.classList.add('open');
      overlay.style.display = 'block';
      hamburger.classList.add('open');
      document.body.classList.add('menu-open');
    };
    const closeMobileMenu = () => {
      mobileMenu.classList.remove('open');
      overlay.style.display = 'none';
      hamburger.classList.remove('open');
      document.body.classList.remove('menu-open');
    };
    hamburger.addEventListener('click', () =>
      mobileMenu.classList.contains('open') ? closeMobileMenu() : openMenu()
    );
    closeMenu.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
  }

  // Desktop account dropdown
  if (accountDropdown) {
    const dropdownMenu = accountDropdown.querySelector('.dropdown-menu');
    accountDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
    });
    document.addEventListener('click', (e) => {
      if (!accountDropdown.contains(e.target)) dropdownMenu.classList.remove('show');
    });
  }

  // Auth logic
  const { data: { user } } = await supabaseClient.auth.getUser();

  if (user) {
    // Desktop
    if (accountMenu) {
      accountMenu.innerHTML = `
        <li>
          <a class="dropdown-item d-flex align-items-center" href="account-dashboard.html">
            <i class="fa-solid fa-gear me-2"></i> Account Management
          </a>
        </li>
        <li class="px-3 py-1">
          <button class="btn btn-dark w-100" id="desktopSignOutBtn">Sign Out</button>
        </li>
      `;
      document.getElementById('desktopSignOutBtn')?.addEventListener('click', async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) alert('Sign out failed: ' + error.message);
        else window.location.href = 'login.html';
      });
    }

    // Mobile
    if (mobileAccountMenu && mobileAccountToggle) {
      mobileAccountMenu.innerHTML = `
        <li>
          <a href="account-dashboard.html"><i class="fa-solid fa-gear"></i> Account Management</a>
        </li>
      `;
      mobileAccountToggle.addEventListener('click', () => {
        mobileAccountMenu.classList.toggle('expanded');
        mobileAccountToggle.classList.toggle('expanded');
      });

      const signOutBtn = document.getElementById('signOutMobileBtn');
      signOutBtn.style.display = 'block';
      signOutBtn.addEventListener('click', async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) alert('Sign out failed: ' + error.message);
        else window.location.href = 'login.html';
      });

      document.getElementById('loginMobileBtn').style.display = 'none';
      document.getElementById('loginDesktopBtn').style.display = 'none';
    }
  } else {
    // Logged out
    document.getElementById('signOutMobileBtn').style.display = 'none';
    document.getElementById('loginMobileBtn').style.display = 'block';
    document.getElementById('loginDesktopBtn').style.display = 'block';
  }
})();