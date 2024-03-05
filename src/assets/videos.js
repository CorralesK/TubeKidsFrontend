/**
 * Check if there is an active session token stored in sessionStorage. If not, redirect the user to the login page.
 */
if (sessionStorage.getItem("token") == null) {
    window.location.href = "../auth/login.html";
}

/**
 * 
 * @returns 
 */
const getContext = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get('context');
}

const context = getContext();
console.log(context);
if (context === "playlist") {
    /**
     * 
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
                    document.getElementById("message").style.display = 'block'
                        .textContent = "No hay videos registrados para esta cuenta";
                } else {
                    console.log(error)
                    errorContainer.innerHTML = '<div class="alert alert-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
                }
            });

    }
    showPlalist();
}