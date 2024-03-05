const container = document.getElementById('container');

/**
 * Renders a list of profiles in a given container.
 * @param {Object[]} profiles - Array of profiles to render.
 */
const renderList = (profiles) => {
    // Create a session element to contain profiles
    const session = document.createElement('div');
    session.className = "row justify-content-center align-items-center text-center pt-4 mt-4 profiles";

    // Iterate through each profile and create profile elements
    profiles.forEach(profile => {
        const profileDiv = document.createElement('div');
        profileDiv.className = "col-md-4 col-sm-4 col-xl-4 col-lg-2 pb-2 text-center";

        const button = document.createElement('button');
        button.className = "btn";
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#staticBackdrop');
        button.setAttribute("data-action", "profile");
        button.setAttribute("data-profile-id", profile._id);

        const img = document.createElement('img');
        img.src = profile.avatar;
        img.alt = "profile";
        img.width = 150;
        img.height = 160;

        button.appendChild(img);

        const nameProfile = document.createElement('h4');
        nameProfile.textContent = profile.name;

        profileDiv.appendChild(button);
        profileDiv.appendChild(nameProfile);

        session.appendChild(profileDiv);
    });

    // Append the session containing profiles to the main container
    container.appendChild(session);
}

/**
 * Renders a session with a title and an optional message.
 * @param {string} title - Title of the session.
 */
const renderHeader = (title) => {
    // Create a session element for the header
    const session = document.createElement('div');
    session.className = "row justify-content-center align-items-center text-center pt-5 mt-5";
    session.id = "headerSession";

    // Create an inner div for the content
    const innerDiv = document.createElement('div');
    innerDiv.className = "col-md-6";

    // Create title element and add it to inner div
    const titleSession = document.createElement('h2');
    titleSession.textContent = title;
    innerDiv.appendChild(titleSession);

    // Create message paragraph if applicable and add it to inner div
    const messageParagraph = document.createElement('p');
    messageParagraph.className = 'text-info';
    messageParagraph.id = 'message';
    messageParagraph.textContent = "No hay perfiles registrados para esta cuenta, para comenzar registre uno!!!";
    messageParagraph.style.display = 'none'; // Initially hidden
    innerDiv.appendChild(messageParagraph);

    // Append inner div to session
    session.appendChild(innerDiv);

    // Append session to the main container
    container.appendChild(session);
}