/**
 * Renders a list of profiles in a given container.
 * @param {Object[]} profiles - Array of profiles to render.
 */
const renderProfiles = (profiles) => {
    // Create a section element to contain profiles
    const section = document.createElement('div');
    section.className = "row justify-content-center align-items-center text-center pt-4 mt-4";
    section.id  = 'profile-container';

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

        section.appendChild(profileDiv);
    });

    // Append the section containing profiles to the main container
    container.appendChild(section);
}