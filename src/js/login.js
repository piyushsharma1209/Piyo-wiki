document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const errorContainer = document.getElementById("errorContainer");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    navbarToggler.addEventListener("click", function () {
        navbarCollapse.classList.toggle("show");
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Perform login API request
        const apiUrl = "https://piyushsharma.one/wiki/wp-json/jwt-auth/v1/token";
        const requestData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        };

        fetch(apiUrl, requestData)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Login failed. Please check your credentials.");
                }
            })
            .then((data) => {
                const token = data.token;
                localStorage.setItem("token", token);
                window.location.href = "profile.html";
            })
            .catch((error) => {
                console.log(error);
                displayError(error.message);
            });
    });

    function displayError(message) {
        errorContainer.textContent = message;
    }
});
