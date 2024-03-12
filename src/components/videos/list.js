/**
 * Renders a list of playlist in a given container.
 * @param {Object[]} playlist - Array of playlist to render.
 */
const renderPlaylist = (playlist) => {
    // Create a session element to contain playlist
    const session = document.createElement('div');
    session.className = "row justify-content-start align-items-center pt-4 mt-4";

    // Iterate through each video and create video elements
    playlist.forEach(video => {
        const div = document.createElement('div');
        div.className = "col-md-4 col-sm-4 pb-2";

        const card = document.createElement('div');
        card.className = "card bg-black text-light card-video";
        card.setAttribute("data-video-id", video._id);

        const link = document.createElement('a');
        link.href = video.url;
        link.className = 'btn-dark text-decoration-none';
        
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