document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://piyushsharma.one/wiki/wp-json/wp/v2/posts";
    const wikiContainer = document.getElementById("wikiContainer");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");


    navbarToggler.addEventListener("click", function () {
        navbarCollapse.classList.toggle("show");
    });

    function fetchLatestPosts() {
        const latestPostsUrl = `${apiUrl}?per_page=10&order=desc&orderby=date`;
        fetch(latestPostsUrl)
            .then((response) => response.json())
            .then((data) => {
                displayPosts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function displayPosts(posts) {
        wikiContainer.innerHTML = "";

        posts.forEach((post) => {
            const postCard = document.createElement("div");
            postCard.classList.add("card", "mb-3");

            const postCardBody = document.createElement("div");
            postCardBody.classList.add("card-body");

            const postTitle = document.createElement("h5");
            postTitle.classList.add("card-title");
            postTitle.textContent = post.title.rendered;

            const postContent = document.createElement("div");

            postTitle.style.cursor = "pointer";

            postTitle.addEventListener("click", function () {
                window.location.href = "post.html?id=" + post.id;
            });

            postCardBody.appendChild(postTitle);
            postCardBody.appendChild(postContent);
            postCard.appendChild(postCardBody);
            wikiContainer.appendChild(postCard);
        });
    }


    fetchLatestPosts();
});
