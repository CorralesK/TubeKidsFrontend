/**
 * Render a navigation bar for account management.
 */
const renderNavManager = () => {
    const navElement = document.createElement('ul');
    navElement.classList.add('nav', 'col-lg-auto', 'me-lg-auto', 'justify-content-center');

    // Create inicio link
    const homeLink = document.createElement('a');
    homeLink.href = 'http://127.0.0.1:5500/html/index.html?c=1';
    homeLink.classList.add('nav-link', 'px-2', 'link-light');
    homeLink.textContent = 'Inicio';

    const homeListItem = document.createElement('li');
    homeListItem.appendChild(homeLink);

    // Create video link
    const videoLink = document.createElement('a');
    videoLink.href = 'http://127.0.0.1:5500/html/videos/playlist.html?c=v';
    videoLink.classList.add('nav-link', 'px-2', 'link-light');
    videoLink.textContent = 'Video';

    const videoListItem = document.createElement('li');
    videoListItem.appendChild(videoLink);

    // Create profile link
    const profileLink = document.createElement('a');
    profileLink.href = 'http://127.0.0.1:5500/html/index.html?c=a';
    profileLink.classList.add('nav-link', 'px-2', 'link-light');
    profileLink.textContent = 'Perfiles';

    const profileListItem = document.createElement('li');
    profileListItem.appendChild(profileLink);

    // Add list items to navigation
    navElement.appendChild(homeListItem);
    navElement.appendChild(videoListItem);
    navElement.appendChild(profileListItem);

    // Create dropdown element (assuming basic structure)
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown', 'text-end', 'ms-5');
    dropdown.id = 'navbarNavDarkDropdown';

    const dropdownToggle = document.createElement('a');
    dropdownToggle.href = '#'; // Update with desired dropdown link (if applicable)
    dropdownToggle.classList.add('d-block', 'link-light', 'text-decoration-none', 'dropdown-toggle');
    dropdownToggle.setAttribute('data-bs-toggle', 'dropdown'); // Assuming Bootstrap usage
    dropdownToggle.setAttribute('aria-expanded', 'false');

    // Add user icon (replace with your image source)
    const userIcon = document.createElement('img');
    userIcon.src = 'https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-w3lqr61qe57e9yt8.webp';
    userIcon.alt = 'mdo';
    userIcon.width = 35;
    userIcon.height = 35;
    userIcon.classList.add('rounded-circle');

    dropdownToggle.appendChild(userIcon);
    dropdown.appendChild(dropdownToggle);

    // Create dropdown menu (basic structure)
    const dropdownMenu = document.createElement('ul');
    dropdownMenu.classList.add('dropdown-menu', 'dropdown-menu-dark', 'text-small');

    const disconnectItem = document.createElement('li');

    const disconnectLink = document.createElement('button');
    disconnectLink.classList.add('dropdown-item', 'text-white');
    disconnectLink.textContent = 'Desconectar';
    disconnectLink.setAttribute('onclick', 'logOut()')

    disconnectItem.appendChild(disconnectLink);
    dropdownMenu.appendChild(disconnectItem);

    dropdown.appendChild(dropdownMenu);

    const navContainer = document.getElementById('nav');
    navContainer.appendChild(navElement);
    navContainer.appendChild(dropdown);
}

const logOut = ()  => {
    sessionStorage.removeItem("token");
    window.location.href = "http://127.0.0.1:5500/html/auth/login.html";
}