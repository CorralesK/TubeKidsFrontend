/**
 * Function to render a modal for PIN input.
 */
const renderModal = () => {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = "modal fade";
    modal.id = "staticBackdrop";
    modal.setAttribute('data-bs-backdrop', 'static');
    modal.setAttribute('data-bs-keyboard', 'false');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'staticBackdropLabel');
    modal.setAttribute('aria-hidden', 'true');

    // Create modal dialog
    const modalDialog = document.createElement('div');
    modalDialog.className = "modal-dialog";

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = "modal-content bg-dark";

    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = "modal-header";

    // Create modal title
    const modalTitle = document.createElement('h1');
    modalTitle.className = "modal-title fs-5 text-light";
    modalTitle.id = "exampleModalLabel";
    modalTitle.textContent = "Escribe tu PIN para acceder";

    // Create close button for modal
    const closeButton = document.createElement('button');
    closeButton.type = "button";
    closeButton.className = "btn-close text-light";
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    // Create form for PIN input
    const form = document.createElement('form');
    form.id = "modal-pin";

    // Create modal body
    const modalBody = document.createElement('div');
    modalBody.className = "modal-body";

    // Create form group for PIN input
    const formGroup = document.createElement('div');
    formGroup.className = "form-group mx-sm-5";

    // Create input field for PIN
    const inputPin = document.createElement('input');
    inputPin.type = "password";
    inputPin.className = "form-control bg-dark text-light";
    inputPin.id = "pin";
    inputPin.placeholder = "Pin de acceso";
    inputPin.required = true;

    // Create error message for incorrect PIN
    const errorPin = document.createElement('h5');
    errorPin.id = "error-pin";
    errorPin.className = "text-danger";
    errorPin.style.display = "none";
    errorPin.textContent = "¡PIN incorrecto!";

    formGroup.appendChild(inputPin);
    formGroup.appendChild(errorPin);

    modalBody.appendChild(formGroup);

    // Create modal footer
    const modalFooter = document.createElement('div');
    modalFooter.className = "modal-footer";

    // Create close button for modal footer
    const closeButtonModal = document.createElement('button');
    closeButtonModal.type = "reset";
    closeButtonModal.className = "btn btn-secondary";
    closeButtonModal.setAttribute('data-bs-dismiss', 'modal');
    closeButtonModal.textContent = "Cerrar";

    // Create submit button for modal footer
    const submitButton = document.createElement('button');
    submitButton.type = "submit";
    submitButton.className = "btn btn-info";
    submitButton.textContent = "Ingresar";

    modalFooter.appendChild(closeButtonModal);
    modalFooter.appendChild(submitButton);

    form.appendChild(modalBody);
    form.appendChild(modalFooter);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(form);

    modalDialog.appendChild(modalContent);

    modal.appendChild(modalDialog);

    // Append modal to the header session element
    document.getElementById("headerSession").appendChild(modal);
}