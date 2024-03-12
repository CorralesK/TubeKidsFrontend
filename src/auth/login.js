// Login
if (!context) {
    /**
     *  Event listener for user login.
     */
    document.getElementById("login-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        await login(data)
            .then(response => {
                document.location.href = "http://127.0.0.1:5500/html/index.html?c=1";
            })
            .catch(error);
    });
}