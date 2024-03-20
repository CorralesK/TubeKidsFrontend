const container = document.getElementById('container');

/**
 * Renders a section with a title and an optional message.
 * @param {string} title - Title of the section.
 */
const renderHeader = (title) => {
    // Create a section element for the header
    const section = document.createElement('div');
    section.className = "row justify-content-center align-items-center text-center pt-5 mt-5";
    section.id = "headerSection";

    // Create an inner div for the content
    const innerDiv = document.createElement('div');
    innerDiv.className = "col-md-6";

    // Create title element and add it to inner div
    const titleSession = document.createElement('h2');
    titleSession.textContent = title;
    titleSession.id  = 'sectionTitle';
    innerDiv.appendChild(titleSession);

    // Create message paragraph if applicable and add it to inner div
    const messageParagraph = document.createElement('p');
    messageParagraph.className = 'text-info';
    messageParagraph.id = 'message';
    messageParagraph.style.display = 'none';
    innerDiv.appendChild(messageParagraph);

    // Append inner div to section
    section.appendChild(innerDiv);

    // Append section to the main container
    container.appendChild(section);
}