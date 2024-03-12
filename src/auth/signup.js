// Sign up
if (context == 's') {

    /**
     * Populates a dropdown list with country options fetched from a REST API.
     */
    const countries = () => {
        countriesJSON()
            .then((countryNames) => {
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
    document.getElementById("signup-form").addEventListener("submit", async (event) => {
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

        await register(data)
            .then(response => {
                document.location.href = "http://127.0.0.1:5500/html/index.html?c=1";
            })
            .catch(error);
    });

}