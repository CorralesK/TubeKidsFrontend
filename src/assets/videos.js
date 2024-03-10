const errorContainer = document.getElementById('error-container');

/**
 * Check if there is an active session token stored in sessionStorage. If not, redirect the user to the login page.
 */
if (sessionStorage.getItem("token") == null) {
    window.location.href = "http://127.0.0.1:5500/html/auth/login.html";
}

/**
 * Extracts the context identifier ('c') from the query parameters of the current URL.
 *
 * @returns {string|null} The context identifier ('c') or `null` if not found.
 */
const getContext = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get('c');
}

const context = getContext();

// Playlist Page
if (context === "p") {
    /**
     * Fetches and displays user playlist.
     *  - Clears container, renders header.
     *  - Renders playlist on success, error messages otherwise.
     */
    const showPlalist = async () => {
        container.innerHTML = "";
        renderHeader("Bienvenido!");

        await get()
            .then(playlist => {
                renderPlaylist(playlist);
            })
            .catch(error => {
                if (error.status == 404) {
                    document.getElementById("message").style.display = 'block';
                    document.getElementById("message").textContent = "No hay videos registrados para esta cuenta";
                } else {
                    console.log(error)
                    errorContainer.innerHTML = '<div class="alert alert-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
                }
            });
    }
    showPlalist();
}
// Videos manager page
if (context == "v") {
    /**
     * Displays the user's video playlist.
     */
    const showVideos = async () => {
        container.innerHTML = "";
        renderNavManager();
        renderHeader("Playlist General");
        renderAddVideoButton();

        await get()
            .then(playlist => {
                renderPlaylist(playlist);
                const videos = document.querySelectorAll('.card-video');
                videos.forEach(cardVideo => {
                    const buttons = renderEditDeleteButtons(cardVideo.getAttribute('data-video-id'));
                    cardVideo.appendChild(buttons.cloneNode(true));
                });
            })
            .catch(error => {
                if (error.status == 404) {
                    document.getElementById("message").style.display = 'block';
                    document.getElementById("message").textContent = "No hay videos registrados para esta cuenta";
                } else {
                    console.log(error)
                    errorContainer.innerHTML = '<div class="alert alert-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
                }
            });
    }

    showVideos();

    /**
     * Handles "Add Video" button click, redirects to playlist creation page.
     */
    document.getElementById('add-btn').addEventListener('click', e => {
        window.location.href = "http://127.0.0.1:5500/html/videos/playlist.html?c=f";
    });
}
if (context == "f") {
    /**
     * Extracts video ID from current URL parameters.
     * @returns {string} Extracted video ID or null if not found.
     */
    const getID = () => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        return params.get('id');
    }

    /**
     * Displays the form to add or edit a video.
     */
    const showForm = async () => {
        container.innerHTML = "";
        renderNavManager();
        renderHeader("Añadir  Video");
        renderFormVideo();

        if (getID()) {
            await get(getID()).then(video => {
                loadVideo(video);
            })
                .catch(error => {
                    if (error.status == 404) {
                        errorContainer.innerHTML = '<div class="alert text-danger"> El video no fue encontrado. Vuelva a intentarlo más tarde. </div>';
                    }
                    errorContainer.innerHTML = '<div class="alert text-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
                });
        }
    }

    showForm();

    /**
     * Handles video form submission, saves data, redirects on success.
     */
    document.getElementById('video-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const data = {
            id: document.getElementById('save-btn').getAttribute('data-id'),
            name: document.getElementById('name').value,
            url: document.getElementById('url').value
        }

        save(data)
            .then(() => {
                window.location.href = "http://127.0.0.1:5500/html/videos/playlist.html?c=v";
            })
            .catch(error => {
                if (error.status == 404) {
                    errorContainer.innerHTML = '<div class="alert text-danger"> No se ha encontrado el video. </div>';
                } else if (error.status == 422) {
                    errorContainer.innerHTML = '<div class="alert text-danger"> Ha ocurrido un error al guardar los cambios. </div>';
                }
                console.log(error)
                errorContainer.innerHTML = '<div class="alert text-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
            });
    });
}

/**
 * Redirects user to video edit form with provided ID.
 * 
 * @param {string} id Video ID for editing.
 */
const redirectEdit = (id) => {
    window.location.href = "http://127.0.0.1:5500/html/videos/playlist.html?c=f&id=" + id;
}

/**
 * Deletes a video and displays a success or error message.
 * 
 * @param {string} videoId ID of the video to delete.
 */
const deleteElement = async (videoId) => {
    await deleteVideo(videoId).then(() => {
        errorContainer.innerHTML = '<div class="alert text-success"> Se ha eliminado el video correctamente. </div>';
        location.reload();
    }).catch((err) => {
        if (err.response.status == 404) {
            errorContainer.innerHTML = '<div class="alert text-danger"> No se ha encontrado el video. Vuelva a intentarlo más tarde. </div>';
        }
        if (err.response.status == 422) {
            errorContainer.innerHTML = '<div class="alert text-danger"> Ha ocurrido un error al intentar eliminar el video. Vuelva a intentarlo más tarde. </div>';
        }
        errorContainer.innerHTML = '<div class="alert text-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
    });
}