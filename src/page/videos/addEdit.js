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
     * Event listener for validating URL input.
     */
    document.getElementById("url").addEventListener("keyup", () => {
        let urlField = document.getElementById("url").value;
        const urlError = document.getElementById("urlError");

        const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
        
        if (!urlRegex.test(urlField)) {
            urlError.style.display = "block";
            document.getElementById("save-btn").disabled = true;
        } else {
            urlError.style.display = "none";
            document.getElementById("save-btn").disabled = false;
        }
    });

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

        console.log(data);

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
                errorContainer.innerHTML = '<div class="alert text-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
            });
    });
}