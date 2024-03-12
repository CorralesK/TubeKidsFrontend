
/**
 * Generates and appends the video form to the container.
 */
const renderFormVideo = () => {
    const session = document.createElement('div');
    session.className = "row justify-content-center align-items-center mt-5";

    const div = document.createElement('div');
    div.className = "col-md-6";

    const formVideo = document.createElement('form');
    formVideo.id = "video-form";

    //Create session of  video name
    const sessionName = document.createElement('div');
    sessionName.className = "mb-3";

    const labelName = document.createElement('label');
    labelName.setAttribute("for", "name");
    labelName.className = "form-label";
    labelName.innerText = "Nombre";

    sessionName.appendChild(labelName);

    const inputName = document.createElement('input');
    inputName.type = "text";
    inputName.className = "form-control bg-dark text-light";
    inputName.placeholder = "Ingrese el nombre del video";
    inputName.required = true;
    inputName.id = "name";

    sessionName.appendChild(inputName);
    formVideo.appendChild(sessionName);

    //Create session of  video url
    const sessionURL = document.createElement('div');
    sessionURL.className = "mb-3";

    const labelURL = document.createElement('label');
    labelURL.setAttribute("for", "url");
    labelURL.classURL = "form-label";
    labelURL.innerText = "URL";

    sessionURL.appendChild(labelURL);

    const inputURL = document.createElement('input');
    inputURL.type = "url";
    inputURL.className = "form-control bg-dark text-light";
    inputURL.placeholder = "Ingrese la url del video";
    inputURL.required = true;
    inputURL.id = "url";

    sessionURL.appendChild(inputURL);

    //Menssage error
    const  messageError = document.createElement('p');
    messageError.className = "text-danger";
    messageError.style.display="none";
    messageError.id ="urlError"
    messageError.innerText = "Solo  se permiten URL de YouTube.";
    sessionURL.appendChild(messageError);

    formVideo.appendChild(sessionURL);

    //Create the button of cancel and redirect to playlist page
    const btnCancel = document.createElement('a');
    btnCancel.href = "http://127.0.0.1:5500/html/videos/playlist.html?c=v";
    btnCancel.className = "btn btn-secondary me-2";
    btnCancel.type = "button";
    btnCancel.innerText = "Volver";
    formVideo.appendChild(btnCancel);

    //Create  the button of submit and add it to the form
    const btnAddVideo = document.createElement('button');
    btnAddVideo.type = "submit";
    btnAddVideo.className = "btn btn-success"
    btnAddVideo.id = "save-btn";
    btnAddVideo.innerText = "Guardar";

    formVideo.appendChild(btnAddVideo);

    div.appendChild(formVideo);
    session.appendChild(div);

    container.appendChild(session);
}

/**
 * Pre-populates video form with provided data for editing.
 * 
 * @param {object} data Video data to load into the form.
 */
const loadVideo = (data) => {
    document.getElementById('sessionTitle').textContent = "Editar video";

    document.getElementById('name').value = data.name;
    document.getElementById('url').value = data.url;

    document.getElementById('save-btn').setAttribute('data-id', `${data._id}`);
}
