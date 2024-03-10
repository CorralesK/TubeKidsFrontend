const URLUSER = "http://localhost:3001/api";

const errorContainer = document.getElementById('error-container');

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

// Sign up
if (context == 's') {
    /**
    * Fetches the list of all countries from the API, sorts them alphabetically, and populates them in the select dropdown.
    */
    const countries = () => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((res) => {
                const countriesData = res.data;
                const countryNames = countriesData.map(country => country.name.common);
                countryNames.sort();
                const optionsHtml = countryNames.map(countryName => `<option value="${countryName}">${countryName}</option>`).join('');
                document.getElementById("country").innerHTML = optionsHtml;
            })
            .catch(error => {
                console.error('Error al obtener la lista de países:', error);
            });
    };

    countries();

    /**
     * Event listener for checking if passwords match on keyup.
     */
    document.getElementById("confirm-password").addEventListener("keyup", () => {
        let confirmPasswordField = document.getElementById("confirm-password");
        let passwordField = document.getElementById("r-password");
        const passwordError = document.getElementById("passwordError");

        if (passwordField.value !== confirmPasswordField.value) {
            passwordError.style.display = "block";
            document.getElementById("btn-register").disabled = true;
        } else {
            passwordError.style.display = "none";
            document.getElementById("btn-register").disabled = false;
        }
    });

    /**
     * Event listener for validating PIN input.
     */
    document.getElementById("pin").addEventListener("keyup", () => {
        let pinField = document.getElementById("pin");
        const pinError = document.getElementById("pinError");

        if (!/^\d*$/.test(pinField.value) || pinField.value.length !== 6) {
            pinError.style.display = "block";
            document.getElementById("btn-register").disabled = true;
        } else {
            pinError.style.display = "none";
            document.getElementById("btn-register").disabled = false;
        }
    });

    /**
     * Event listener for verifying age eligibility based on date of birth.
     */
    document.getElementById("date-birth").addEventListener("change", () => {

        const dateOfBirthField = document.getElementById("date-birth");
        let birthDate = new Date(dateOfBirthField.value);
        const today = new Date();
        const minAge = 18;

        if (today.getFullYear() - birthDate.getFullYear() < minAge) {
            document.getElementById("btn-register").disabled = true;
            dateOfBirthField.disabled = true;
            errorContainer.innerHTML = '<div class="alert alert-danger"> Debe ser mayor de edad para registrarse. </div>';
        }
    });

    /**
     * Event listener for registering a user.
     */
    document.getElementById("signup-form").addEventListener("submit", (event) => {
        event.preventDefault();

        const data = {
            email: document.getElementById('r-email').value,
            password: document.getElementById('r-password').value,
            pin: parseInt(document.getElementById('pin').value),
            name: document.getElementById('name').value,
            lastName: document.getElementById('last-name').value,
            country: document.getElementById('country').value,
            dateOfBirth: document.getElementById('date-birth').value,
        };

        const url = URLUSER + '/users';

        axios({
            method: "POST",
            url: url,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                sessionStorage.setItem('token', response.data);
                document.location.href = "http://127.0.0.1:5500/html/index.html?c=1";
            })
            .catch(error);
    });

}

// Login
if (!context) {
    /**
     *  Event listener for user login.
     */
    document.getElementById("login-form").addEventListener("submit", (event) => {
        event.preventDefault();

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        const url = URLUSER + "/session"

        axios({
            method: "POST",
            url: url,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                sessionStorage.setItem('token', response.data);
                document.location.href = "http://127.0.0.1:5500/html/index.html?c=1";
            })
            .catch(error);
    });
}

const verifyPinAdmin = (pin) => {
    return new Promise((resolve, reject) => {
        const uri = `http://localhost:3001/api/users/pin?pin=${pin}`;

        axios({
            method: 'GET',
            url: uri,
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${TOKEN}`
            }
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response);
            });
    });
}


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