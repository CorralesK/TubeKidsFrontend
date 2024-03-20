/**
 * Renders a list of playlist in a given container.
 * @param {Object[]} playlist - Array of playlist to render.
 */
const renderPlaylist = (playlist) => {
    // Create a section element to contain playlist
    const section = document.createElement('div');
    section.className = "row justify-content-start align-items-center pt-4 mt-4";

    // Iterate through each video and create video elements
    playlist.forEach(video => {
        const div = document.createElement('div');
        div.className = "col-md-4 col-sm-4 pb-2 mt-5";

        const card = document.createElement('div');
        card.className = "card bg-transparent text-light card-video";
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

        const nameVideo =  document.createElement('h3');
        nameVideo.className = "card-title nav-link mt-2 mb-3 px-2 link-light";
        nameVideo.textContent = video.name;

        link.appendChild(nameVideo);
        card.appendChild(link);
        div.appendChild(card);

        section.appendChild(div);
    });
    // Append the section containing playlist to the main container
    container.appendChild(section);
}