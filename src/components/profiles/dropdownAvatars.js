/**
 * Renders a dropdown menu with avatar options.
 * 
 * @param {Array} avatars - An array of avatar objects.
 */
const renderDropdownAvatar = (avatars) => {
    // Create the dropdown container
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropend');

    // Create the dropdown button
    const dropdownButton = document.createElement('button');
    dropdownButton.classList.add('btn', 'btn-dark');
    dropdownButton.type = 'button';
    dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
    dropdownButton.setAttribute('aria-haspopup', 'true');
    dropdownButton.setAttribute('aria-expanded', 'false');

    // Add content to the button
    const avatarWrapper = document.createElement('div');
    avatarWrapper.classList.add('avatar-wrapper');

    // Create and add the edit icon
    const editIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    editIcon.classList.add('edit-icon', 'bi', 'bi-pencil-square', 'text-secondary');
    editIcon.setAttribute('width', '25');
    editIcon.setAttribute('height', '25');
    editIcon.setAttribute('fill', 'currentColor');
    editIcon.setAttribute('viewBox', '0 0 16 16');

    const pencilPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pencilPath.setAttribute('d', 'M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z');
    editIcon.appendChild(pencilPath);

    const squarePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    squarePath.setAttribute('fill-rule', 'evenodd');
    squarePath.setAttribute('d', 'M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z');
    editIcon.appendChild(squarePath);

    avatarWrapper.appendChild(editIcon);

    // Create and add the avatar image
    const avatarImage = document.createElement('img');
    avatarImage.src = "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-w3lqr61qe57e9yt8.webp";
    avatarImage.classList.add('avatar-image');
    avatarImage.id = 'avatar-image';
    avatarImage.alt = 'Avatar';

    avatarWrapper.appendChild(avatarImage);

    dropdownButton.appendChild(avatarWrapper);
    dropdown.appendChild(dropdownButton);

    // Create and add the dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu', 'dropdown-menu-dark');
    dropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuButton');

    avatars.forEach(avatar => {
        const divider = document.createElement('div');
        divider.classList.add('dropdown-divider');
        dropdownMenu.appendChild(divider);

        const header = document.createElement('h6');
        header.classList.add('dropdown-header');
        header.textContent = avatar.category;
        dropdownMenu.appendChild(header);

        const div = document.createElement('div');
        div.className = 'd-flex justify-content-start';

        avatar.images.forEach(image => {
            const item = document.createElement('div');
            item.classList.add('dropdown-item');

            const avatarOption = document.createElement('div');
            avatarOption.classList.add('avatar-option');
            avatarOption.setAttribute('onclick', `avatarClicked('${image}')`);

            const img = document.createElement('img');
            img.src = image;
            img.alt = avatar.category;
            img.setAttribute('width', '100');
            img.setAttribute('height', '100');

            avatarOption.appendChild(img);
            item.appendChild(avatarOption);

            div.appendChild(item);
        });
        dropdownMenu.appendChild(div);
    });

    dropdown.appendChild(dropdownMenu);

    // Add the dropdown to the DOM container
    const avatarSection = document.getElementById('avatarSection');
    avatarSection.appendChild(dropdown);
}