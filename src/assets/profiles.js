/**
 * Check if there is an active session token stored in sessionStorage. If not, redirect the user to the login page.
 */
if (sessionStorage.getItem("token") == null) {
    window.location.href = "http://127.0.0.1:5500/html/auth/login.html";
}

/**
 * If the current context is the home page:
 */
if (context == "1") {

    /**
     * Function to display the home page content, including profiles selection and modal rendering.
     */
    const showHomePage = async () => {
        container.innerHTML = "";
        renderHeader("¿Quién eres? Elige tu perfil");
        renderModal();
        await get()
            .then(profiles => {
                renderProfiles(profiles);
            })
            .catch(error => {
                if (error.status == 404) {
                    document.getElementById("message").style.display = 'block';
                    document.getElementById("message").textContent = "No hay perfiles registrados para esta cuenta, para comenzar registre uno!!!";
                } else {
                    errorContainer.innerHTML = '<div class="alert alert-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
                }
            });
        renderManagerButton();
    }

    showHomePage();

    /**
     * Event listener for the submission of the PIN modal form, handling PIN verification for profile or admin actions.
     */
    document.getElementById("modal-pin").addEventListener('submit', (event) => {
        event.preventDefault();
        const pin = parseInt(document.getElementById("pin").value);
        const target = document.querySelector('[data-bs-target="#staticBackdrop"]');
        const action = target.getAttribute('data-action');

        const handleError = () => document.getElementById('error-pin').style.display = 'block';
        const redirectToPlaylist = "http://127.0.0.1:5500/html/videos/playlist.html";

        //Error que arreglar
        if (action === 'profile') {
            const profileId = target.getAttribute('data-profile-id');
            verifyPin(profileId, pin)
                .then(() => {
                    document.location.href = redirectToPlaylist + "?c=p";
                })
                .catch(handleError);
        } else if (action === 'admin') {
            verifyPinAdmin(pin)
                .then(() => {
                    document.location.href = redirectToPlaylist + "?c=v";
                })
                .catch((error) => {
                    console.log(error);
                    handleError();
                });
        }
    });
}