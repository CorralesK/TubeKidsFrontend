/**
 * Render a button to manage the main account.
 */
const renderManagerButton = () => {
    // Create a section element for the manager button
    const section = document.createElement('div');
    section.className = "row justify-content-center align-items-center text-center pt-5 mt-5";

    // Create an inner div for the content
    const innerDiv = document.createElement('div');
    innerDiv.className = "col-md-6";

    // Create the manager button and add it to inner div
    const button = document.createElement('button');
    button.className = "btn btn-outline-success";
    button.id = "manager-account";
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#staticBackdrop');
    button.setAttribute("onclick", "setAction('admin')");
    button.textContent = "Administrar cuenta";
    innerDiv.appendChild(button);

    // Append inner div to section
    section.appendChild(innerDiv);

    // Append section to the main container
    container.appendChild(section);
}

/**
 * Render the button for edit and delete 
 * 
 * @param {string} id - Id of the video or profile.
 */
const renderEditDeleteButtons = (id) => {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = "col-md-4 col-sm-4 pb-2 ps-2 d-flex";

    // Create Edit Button
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'btn btn-outline-info edit-btn me-1';
    editButton.setAttribute('data-bs-toggle', 'tooltip');
    editButton.setAttribute('data-bs-placement', 'top');
    editButton.setAttribute('data-bs-title', 'Editar');
    editButton.setAttribute('onclick', `redirectEdit('${id}')`);

    const editIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    editIcon.setAttribute('width', '16');
    editIcon.setAttribute('height', '16');
    editIcon.setAttribute('fill', 'currentColor');
    editIcon.classList.add('bi', 'bi-pencil');

    const editPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    editPath.setAttribute('d', 'M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325');

    editIcon.appendChild(editPath);
    editButton.appendChild(editIcon);

    // Create Delete Button (similarly)
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-outline-danger delete-btn';
    deleteButton.setAttribute('data-bs-toggle', 'tooltip');
    deleteButton.setAttribute('data-bs-placement', 'top');
    deleteButton.setAttribute('data-bs-title', 'Eliminar');
    deleteButton.setAttribute('onclick', `deleteElement('${id}')`);

    const deleteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    deleteIcon.setAttribute('width', '16');
    deleteIcon.setAttribute('height', '16');
    deleteIcon.setAttribute('fill', 'currentColor');
    deleteIcon.classList.add('bi', 'bi-trash3');

    const deletePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    deletePath.setAttribute('d', "M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5");

    // Append buttons to card footer
    deleteIcon.appendChild(deletePath);
    deleteButton.appendChild(deleteIcon);

    // Append inner div to section
    buttonContainer.append(editButton, deleteButton);

    return buttonContainer;
}

/**
 * Creates and appends a button to add a video.
 */
const renderAddVideoButton = () => {
    // Create a section element for the manager button
    const section = document.createElement('div');
    section.className = "d-flex justify-content-end";

    // Create the add button
    const button = document.createElement('a');
    button.className = "btn btn-outline-success";
    button.id = "add-btn";
    button.href = "http://127.0.0.1:5500/html/videos/playlist.html?c=f";
    button.textContent = "Añadir  video";

    // Append button to section
    section.appendChild(button);

    // Append section to the main container
    container.appendChild(section);
}

const renderAddProfileButton = () => {
    //Create container
    const profileDiv = document.createElement('div');
    profileDiv.className = "col-md-4 col-sm-4 col-xl-2 col-lg-2 pb-2 text-center justify-content-center add-btn-container";

    //Create button
    const button = document.createElement('a');
    button.className = "btn btn-outline-success add-btn mb-1 pt-1";
    button.href = "http://127.0.0.1:5500/html/index.html?c=f";
    button.setAttribute('data-bs-toggle', 'tooltip');
    button.setAttribute('data-bs-placement', 'top');
    button.setAttribute('data-bs-title', 'Añadir');

    //Create icon and add to button
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('width', '100');
    icon.setAttribute('height', '100');
    icon.setAttribute('fill', 'currentColor');
    icon.setAttribute('viewBox', '0 0 16 16');
    icon.classList.add('bi', 'bi-plus-square-fill', 'mb-4');

    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    iconPath.setAttribute('d', "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z");

    // Append buttons to card footer
    icon.appendChild(iconPath);
    button.appendChild(icon);

    profileDiv.appendChild(button);

    const text = document.createElement('h4');
    text.textContent = "Añadir";

    profileDiv.appendChild(text);

    const section = document.getElementById('profile-container');
    if (section == null) {
        const section = document.createElement('div');
        section.className = "row justify-content-center align-items-center text-center pt-4 mt-4";
        section.id =  "profile-container";

        section.appendChild(profileDiv);
        container.appendChild(section);
        console.log("no");
        return;
    }

    console.log("se");
    section.appendChild(profileDiv);
    container.appendChild(section);
}