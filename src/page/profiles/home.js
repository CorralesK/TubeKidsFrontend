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

    // Event listener para el envío del formulario del modal
    document.getElementById("modal-pin").addEventListener('submit', (event) => {
        event.preventDefault();
        const pin = parseInt(document.getElementById("pin").value);

        const handleError = () => document.getElementById('error-pin').style.display = 'block';
        const redirectToPlaylist = "http://127.0.0.1:5500/html/videos/playlist.html";

        if (ACTION === 'profile') {
            verifyPin(PROFILE_ID, pin)
                .then(() => {
                    document.location.href = redirectToPlaylist + "?c=p";
                })
                .catch(handleError);
        } else if (ACTION === 'admin') {
            verifyPinAdmin(pin)
                .then(() => {
                    document.location.href = redirectToPlaylist + "?c=v";
                })
                .catch((error) => {
                    console.log(error);
                    handleError();
                });
        }
        document.getElementById("pin").value = "";
    });
}

//
let ACTION;
let PROFILE_ID;

const setAction = (action,  profileId) => {
    ACTION = action;
    PROFILE_ID = profileId;
}