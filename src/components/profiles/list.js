/**
 * Renders a list of profiles in a given container.
 * @param {Object[]} profiles - Array of profiles to render.
 */
const renderProfiles = (profiles) => {
    // Create a session element to contain profiles
    const session = document.createElement('div');
    session.className = "row justify-content-center align-items-center text-center pt-4 mt-4";
    session.id  = 'profile-container';

    // Iterate through each profile and create profile elements
    profiles.forEach(profile => {
        const profileDiv = document.createElement('div');
        profileDiv.className = "col-md-4 col-sm-4 col-xl-2 col-lg-2 pb-2 text-center justify-content-center profile";
        profileDiv.setAttribute("data-profile-id", profile._id);

        const button = document.createElement('button');
        button.className = "btn";
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#staticBackdrop');
        button.setAttribute("data-profile-id", profile._id);
        button.setAttribute("onclick", `setAction('profile', '${profile._id}')`);

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