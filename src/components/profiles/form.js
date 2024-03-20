/**
 * Generates and appends the profile form to the container.
 */
const renderFormProfile = () => {
    // Create elements for the profile form
    const section = document.createElement('div');
    section.classList.add('row', 'justify-content-center', 'mt-5');

    const col = document.createElement('div');
    col.classList.add('col-md-6');

    const form = document.createElement('form');
    form.id = 'profile-form';

    const row = document.createElement('div');
    row.classList.add('row');

    // Avatar section
    const sectionAvatar = document.createElement('div');
    sectionAvatar.className = "col-md-4 mt-2";
    sectionAvatar.id = "avatarSection";

    // Input avatar
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.id = 'avatar';
    hiddenInput.value  = 'https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-w3lqr61qe57e9yt8.webp';

    sectionAvatar.appendChild(hiddenInput);
    row.appendChild(sectionAvatar);

    // Text section
    const sectionText = document.createElement('div');
    sectionText.className = "col-md-6";

    // Name section
    const nameSection = document.createElement('div');
    nameSection.classList.add('mb-3');

    // Label name
    const nameLabel = document.createElement('label');
    nameLabel.className = 'form-label';
    nameLabel.htmlFor = 'name';
    nameLabel.innerText = 'Nombre Completo:';
    nameSection.appendChild(nameLabel);

    // Input name
    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.className = 'form-control bg-transparent text-light';
    inputName.placeholder = "Ingrese el nombre";
    inputName.id = 'name';
    inputName.required = true;
    nameSection.appendChild(inputName);

    sectionText.appendChild(nameSection);

    // Pin section
    const pinSection = document.createElement('div');
    pinSection.classList.add('mb-3');

    // Label pin
    const pinLabel = document.createElement('label');
    pinLabel.className = 'form-label';
    pinLabel.htmlFor = 'pin';
    pinLabel.innerText = 'Pin (6 digitos):';
    pinSection.appendChild(pinLabel);

    // Input pin
    const inputPin = document.createElement('input');
    inputPin.type = 'number';
    inputPin.className = 'form-control bg-transparent text-light';
    inputPin.placeholder = "Ingrese el pin";
    inputPin.id = 'pin';
    inputPin.required = true;
    inputPin.minLength = 6;
    pinSection.appendChild(inputPin);

    //Menssage error
    const  messageError = document.createElement('p');
    messageError.className = "text-danger";
    messageError.style.display="none";
    messageError.id ="pinError"
    messageError.innerText = "El PIN debe ser de 6 digitos.";
    pinSection.appendChild(messageError);

    sectionText.appendChild(pinSection);

    // Age section
    const ageSection = document.createElement('div');
    ageSection.classList.add('mb-3');

    // Label age
    const ageLabel = document.createElement('label');
    ageLabel.className = 'form-label';
    ageLabel.htmlFor = 'age';
    ageLabel.innerText = 'Edad:';
    ageSection.appendChild(ageLabel);

    // Input age
    const inputAge = document.createElement('input');
    inputAge.type = 'number';
    inputAge.className = 'form-control bg-transparent text-light';
    inputAge.placeholder = "Ingrese la edad";
    inputAge.id = 'age';
    ageSection.appendChild(inputAge);

    sectionText.appendChild(ageSection);
    row.appendChild(sectionText);

    form.appendChild(row);

    // Buttons
    // Create the cancel button and redirect to the playlist page
    const btnCancel = document.createElement('a');
    btnCancel.href = "http://127.0.0.1:5500/html/index.html?c=a";
    btnCancel.className = "btn btn-outline-secondary me-2";
    btnCancel.type = "button";
    btnCancel.innerText = "Volver";
    form.appendChild(btnCancel);

    // Create the submit button and add it to the form
    const btnAdd = document.createElement('button');
    btnAdd.type = "submit";
    btnAdd.className = "btn btn-outline-success";
    btnAdd.id = "save-btn";
    btnAdd.innerText = "Guardar";
    form.appendChild(btnAdd);

    col.appendChild(form);
    section.appendChild(col);

    container.appendChild(section);
}

/**
 * Loads profile data into the form for editing.
 * 
 * @param {*} data - Profile data to be loaded into the form.
 */
const loadProfile = (data) => {
    document.getElementById('sectionTitle').textContent = "Edit Profile";

    document.getElementById('name').value = data.name;
    document.getElementById('pin').value = data.pin;
    document.getElementById('avatar').value = data.avatar;
    document.getElementById('avatar-image').src = data.avatar;
    document.getElementById('age').value = data.age;

    document.getElementById('save-btn').setAttribute('data-id', `${data._id}`);
}