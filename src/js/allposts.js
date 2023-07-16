document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://piyushsharma.one/wiki/wp-json/wp/v2/posts";
    const allPostsContainer = document.getElementById("allPostsContainer");
    const searchInput = document.getElementById("searchInput");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");


    navbarToggler.addEventListener("click", function () {
        navbarCollapse.classList.toggle("show");
    });

    function fetchAllPosts() {
        const allPostsUrl = `${apiUrl}?per_page=100&_embed`;
        fetch(allPostsUrl)
            .then((response) => response.json())
            .then((data) => {
                displayPosts(data, allPostsContainer);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function displayPosts(posts, container) {
        container.innerHTML = "";

        posts.forEach((post) => {
            const postCard = document.createElement("div");
            postCard.classList.add("card", "mb-3");

            const postCardBody = document.createElement("div");
            postCardBody.classList.add("card-body");

            const postTitle = document.createElement("h5");
            postTitle.classList.add("card-title");
            postTitle.textContent = post.title.rendered;

            postTitle.style.cursor = "pointer";

            const postContent = document.createElement("div");

            postTitle.addEventListener("click", function () {
                window.location.href = "post.html?id=" + post.id;
            });

            postCardBody.appendChild(postTitle);
            postCardBody.appendChild(postContent);
            postCard.appendChild(postCardBody);
            container.appendChild(postCard);
        });
    }

    fetchAllPosts();

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value;
        searchPosts(searchTerm);
    });

    function searchPosts(term) {
        const searchUrl = `${apiUrl}?search=${encodeURIComponent(term)}&_embed`;
        fetch(searchUrl)
            .then((response) => response.json())
            .then((data) => {
                displayPosts(data, allPostsContainer);
            })
            .catch((error) => {
                console.log(error);
            });
    }
});
