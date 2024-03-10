/**
 * Renders a list of profiles in a given container.
 * @param {Object[]} profiles - Array of profiles to render.
 */
const renderProfiles = (profiles) => {
    // Create a session element to contain profiles
    const session = document.createElement('div');
    session.className = "row justify-content-center align-items-center text-center pt-4 mt-4";

    // Iterate through each profile and create profile elements
    profiles.forEach(profile => {
        const profileDiv = document.createElement('div');
        profileDiv.className = "col-md-4 col-sm-4 col-xl-4 col-lg-2 pb-2 text-center profile";

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
 * Renders a list of playlist in a given container.
 * @param {Object[]} playlist - Array of playlist to render.
 */
const renderPlaylist = (playlist) => {
    // Create a session element to contain playlist
    const session = document.createElement('div');
    session.className = "row justify-content-center align-items-center pt-4 mt-4";

    // Iterate through each video and create video elements
    playlist.forEach(video => {
        const div = document.createElement('div');
        div.className = "col-md-4 col-sm-4 pb-2";

        const card = document.createElement('div');
        card.className = "card bg-dark text-light card-video";
        card.setAttribute("data-video-id", video._id);

        const link = document.createElement('a');
        link.href = video.url;
        link.className = 'btn-dark';
        
        const img = document.createElement('img');
        img.src = video.img;
        img.alt = "Miniatura del video";
        img.className = 'card-img-top';
        img.height = '180';

        link.appendChild(img);

        const nameVideo =  document.createElement('h4');
        nameVideo.className = "card-title nav-link mt-2 px-2 link-light";
        nameVideo.textContent = video.name;

        link.appendChild(nameVideo);
        card.appendChild(link);
        div.appendChild(card);

        session.appendChild(div);
    });
    // Append the session containing playlist to the main container
    container.appendChild(session);
}