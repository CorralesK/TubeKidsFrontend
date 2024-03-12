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
 * Function to handle errors.
 * @param {*} err - The error object.
 */
const error = (err) => {
    if (err.response && err.response.status === 401) {
        errorContainer.innerHTML = '<div class="alert alert-danger"> ¡Credenciales incorrectas! </div>';

    } else if (err.response && err.response.status === 404) {
        errorContainer.innerHTML = '<div class="alert alert-danger"> El usuario no se encuentra registrado. Debe registrase para iniciar sesion </div>';
    } else if (err.response && err.response.status === 400) {
        errorContainer.innerHTML = '<div class="alert alert-danger"> Debe completar los espacios requeridos.</div>';
    }
    else {
        console.error('Error:', err);
        errorContainer.innerHTML = '<div class="alert alert-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
    }
}