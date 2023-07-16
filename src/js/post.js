document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://piyushsharma.one/wiki/wp-json/wp/v2/posts";
    const postContainer = document.getElementById("postContainer");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");


    navbarToggler.addEventListener("click", function () {
        navbarCollapse.classList.toggle("show");
    });

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    function fetchPost() {
        const postUrl = `${apiUrl}/${postId}`;
        fetch(postUrl)
            .then((response) => response.json())
            .then((data) => {
                displayPost(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function displayPost(post) {
        const postCard = document.createElement("div");
        postCard.classList.add("card", "mb-3");

        const postCardBody = document.createElement("div");
        postCardBody.classList.add("card-body");

        const postTitle = document.createElement("h5");
        postTitle.classList.add("card-title");
        postTitle.textContent = post.title.rendered;

        const postContent = document.createElement("div");
        postContent.classList.add("card-text");
        postContent.innerHTML = post.content.rendered;

        postCardBody.appendChild(postTitle);
        postCardBody.appendChild(postContent);
        postCard.appendChild(postCardBody);
        postContainer.appendChild(postCard);
    }

    fetchPost();
});
