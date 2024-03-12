//Get all profiles for the administrator
if (context == "a") {
    const showProfiles = async () => {
        container.innerHTML = "";
        renderNavManager();
        renderHeader("Todo los perfiles de esta cuenta");

        await get()
            .then(data => {
                renderProfiles(data);
                const profiles = document.querySelectorAll('.profile');
                profiles.forEach(profile => {
                    const buttons = renderEditDeleteButtons(profile.getAttribute('data-profile-id'));
                    profile.appendChild(buttons.cloneNode(true));
                });
            })
            .catch(error => {
                if (error.status == 404) {
                    document.getElementById("message").style.display = 'block';
                    document.getElementById("message").textContent = "No hay perfiles registrados para esta cuenta, para comenzar registre uno!!!";
                } else {
                    errorContainer.innerHTML = '<div class="alert text-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
                }
            });
        renderAddProfileButton();
    }

    showProfiles();
}

/**
 * Redirects user to profile edit form with provided ID.
 * 
 * @param {string} id Profile ID for editing.
 */
const redirectEdit = (id) => {
    window.location.href = "http://127.0.0.1:5500/html/index.html?c=f&id=" + id;
}

/**
 * Deletes a profile and displays a success or error message.
 * 
 * @param {string} id ID of the profile to delete.
 */
const deleteElement = async (id) => {
    await deleteProfile(id).then(() => {
        errorContainer.innerHTML = '<div class="alert text-success"> Se ha eliminado el perfil correctamente. </div>';
        location.reload();
    }).catch((err) => {
        if (err.response.status == 404) {
            errorContainer.innerHTML = '<div class="alert text-danger"> No se ha encontrado el perfil. Vuelva a intentarlo más tarde. </div>';
        }
        if (err.response.status == 422) {
            errorContainer.innerHTML = '<div class="alert text-danger"> Ha ocurrido un error al intentar eliminar el perfil. Vuelva a intentarlo más tarde. </div>';
        }
        errorContainer.innerHTML = '<div class="alert text-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
    });
}