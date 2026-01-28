async function loadHeader() {
  const { data: { user } } = await supabaseClient.auth.getUser();

  // Desktop dropdown
  const accountMenu = document.getElementById('accountMenu');
  // Mobile dropdown
  const mobileAccountMenu = document.getElementById('mobileAccountMenu');

  if (user) {
    // Inject Sign Out in desktop dropdown
    accountMenu.innerHTML = `<li><button class="dropdown-item" id="signOutBtn">Sign Out</button></li>`;
    mobileAccountMenu.innerHTML = `<li><a href="#" id="mobileSignOut">Sign Out</a></li>`;

    document.getElementById('signOutBtn').onclick = async () => {
      await supabaseClient.auth.signOut();
      window.location.href = 'index.html';
    };

    document.getElementById('mobileSignOut').onclick = async (e) => {
      e.preventDefault();
      await supabaseClient.auth.signOut();
      window.location.href = 'index.html';
    };
  } else {
    accountMenu.innerHTML = '';
    mobileAccountMenu.innerHTML = '';
  }

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const closeMenu = document.getElementById('closeMenu');

  hamburger.onclick = () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    overlay.style.display = 'block';
  };

  closeMenu.onclick = overlay.onclick = () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    overlay.style.display = 'none';
  };
}