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