if (context === "f") {
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
        renderHeader("Añadir  Profile");
        renderFormProfile();

        // get avatars
        await avatarJSON()
            .then(avatars => {
                renderDropdownAvatar(avatars);
            })
            .catch(err => {
                window.location.href = "";
                errorContainer.innerHTML = '<div class="alert text-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
            });

        if (getID()) {
            await get(getID()).then(profile => {
                loadProfile(profile);
            })
                .catch(error => {
                    if (error.status == 404) {
                        errorContainer.innerHTML = '<div class="alert text-danger"> El perfil no fue encontrado. Vuelva a intentarlo más tarde. </div>';
                    }
                    console.log(error);
                    errorContainer.innerHTML = '<div class="alert text-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
                });
        }
    }
    showForm();

    
    /**
     * Event listener for validating PIN input.
     */
    document.getElementById("pin").addEventListener("keyup", () => {
        let pinField = document.getElementById("pin");
        const pinError = document.getElementById("pinError");

        if (!/^\d*$/.test(pinField.value) || pinField.value.length !== 6) {
            pinError.style.display = "block";
            document.getElementById("save-btn").disabled = true;
        } else {
            pinError.style.display = "none";
            document.getElementById("save-btn").disabled = false;
        }
    });

    /**
     * Handles profile form submission, saves data, redirects on success.
     */
    document.getElementById('profile-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const data = {
            id: document.getElementById('save-btn').getAttribute('data-id'),
            name: document.getElementById('name').value,
            avatar: document.getElementById('avatar').value,
            pin: parseInt(document.getElementById('pin').value),
            age: parseInt(document.getElementById('age').value),
        }

        console.log(data);

        save(data)
            .then(() => {
                window.location.href = "http://127.0.0.1:5500/html/index.html?c=a";
            })
            .catch(error => {
                if (error.status == 404) {
                    errorContainer.innerHTML = '<div class="alert text-danger"> No se ha encontrado el perfil. </div>';
                } else if (error.status == 422) {
                    errorContainer.innerHTML = '<div class="alert text-danger"> Ha ocurrido un error al guardar los cambios. </div>';
                }
                errorContainer.innerHTML = '<div class="alert text-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
            });
    });
}

/**
 * Handles the click event of an avatar option.
 * Updates the avatar input value and image source based on the selected avatar.
 * 
 * @param {string} img - The URL of the selected avatar image.
 */
const avatarClicked = (img) => {
    document.getElementById('avatar').value = img;
    document.getElementById('avatar-image').src = img;
}