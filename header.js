async function loadHeader() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  const topButtons = document.getElementById('topButtons');

  if (!topButtons) return;
  topButtons.innerHTML = '';

  if (user) {
    const { data: profile } = await supabaseClient
      .from('app_users')
      .select('first_name, avatar_url')
      .eq('id', user.id)
      .single();

    const dropdownDiv = document.createElement('div');
    dropdownDiv.className = 'dropdown';

    const avatarBtn = document.createElement('button');
    avatarBtn.className = 'btn btn-light dropdown-toggle p-0';
    avatarBtn.type = 'button';
    avatarBtn.setAttribute('data-bs-toggle', 'dropdown');

    const avatarImg = document.createElement('img');
    avatarImg.src =
      profile?.avatar_url ||
      'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    avatarImg.className = 'profile-icon';

    avatarBtn.appendChild(avatarImg);

    const dropdownMenu = document.createElement('ul');
    dropdownMenu.className = 'dropdown-menu dropdown-menu-end';

    dropdownMenu.innerHTML = `
      <li><a class="dropdown-item" href="profile.html">Profile</a></li>
      <li><button class="dropdown-item" id="logoutBtn">Log Out</button></li>
    `;

    dropdownDiv.appendChild(avatarBtn);
    dropdownDiv.appendChild(dropdownMenu);
    topButtons.appendChild(dropdownDiv);

    document.getElementById('logoutBtn').addEventListener('click', async () => {
      await supabaseClient.auth.signOut();
      window.location.href = 'index.html';
    });

  } else {
    const signInBtn = document.createElement('a');
    signInBtn.href = 'login.html';
    signInBtn.className = 'btn btn-primary';
    signInBtn.textContent = 'Sign In';
    topButtons.appendChild(signInBtn);
  }
}
