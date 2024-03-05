/**
 * Render a button to manage the main account.
 */
const renderManagerButton = () => {
    // Create a session element for the manager button
    const session = document.createElement('div');
    session.className = "row justify-content-center align-items-center text-center pt-5 mt-5";

    // Create an inner div for the content
    const innerDiv = document.createElement('div');
    innerDiv.className = "col-md-6";

    // Create the manager button and add it to inner div
    const button = document.createElement('button');
    button.className = "btn btn-outline-success";
    button.id = "manager-account";
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#staticBackdrop');
    button.setAttribute("data-action", "admin");
    button.textContent = "Administrar cuenta";
    innerDiv.appendChild(button);

    // Append inner div to session
    session.appendChild(innerDiv);

    // Append session to the main container
    container.appendChild(session);
}