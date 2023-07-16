document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://piyushsharma.one/wiki/wp-json/wp/v2/posts";
    const profileContainer = document.getElementById("profileContainer");
    const createPostForm = document.getElementById("createPostForm");
    const myPostsContainer = document.getElementById("myPostsContainer");
    const logoutButton = document.getElementById("logoutButton");

    function checkAuthentication() {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "login.html";
        } else {
            profileContainer.style.display = "block";
            fetchMyPosts();
        }
    }

    function fetchMyPosts() {
        const token = localStorage.getItem("token");
        const myPostsUrl = `${apiUrl}?author=${getUserId()}&per_page=10`;
        const requestData = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(myPostsUrl, requestData)
            .then((response) => response.json())
            .then((data) => {
                displayMyPosts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function getUserId() {
        const token = localStorage.getItem("token");
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        return tokenPayload.data.user.id;
    }

    function displayMyPosts(posts) {
        myPostsContainer.innerHTML = "";

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
                window.location.href = `editpost.html?id=${post.id}`;
            });

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("btn", "btn-danger");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
                deletePost(post.id);
            });

            postCardBody.appendChild(postTitle);
            postCardBody.appendChild(postContent);
            postCardBody.appendChild(deleteButton);
            postCard.appendChild(postCardBody);
            myPostsContainer.appendChild(postCard);
        });
    }

    function createPost(title, content) {
        const token = localStorage.getItem("token");

        const createPostUrl = `${apiUrl}`;
        const requestData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: title,
                content: content,
                status: "publish",
            }),
        };

        fetch(createPostUrl, requestData)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                document.getElementById("postTitle").value = "";
                document.getElementById("postContent").value = "";
                fetchMyPosts();
            })
            .catch((error) => {
                console.log(error);
            });
    }


    function deletePost(postId) {
        const token = localStorage.getItem("token");

        const deletePostUrl = `${apiUrl}/${postId}`;
        const requestData = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(deletePostUrl, requestData)
            .then((response) => {
                if (response.ok) {
                    fetchMyPosts();
                } else {
                    throw new Error("Failed to delete post.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function editPost(postId, title, content) {
        const token = localStorage.getItem("token");

        const editPostUrl = `${apiUrl}/${postId}`;
        const requestData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: title,
                content: content,
            }),
        };

        fetch(editPostUrl, requestData)
            .then((response) => {
                if (response.ok) {
                    fetchMyPosts();
                } else {
                    throw new Error("Failed to edit post.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function logoutUser() {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    }

    createPostForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const postTitle = document.getElementById("postTitle").value;
        const postContent = document.getElementById("postContent").value;

        createPost(postTitle, postContent);
    });

    logoutButton.addEventListener("click", logoutUser);

    checkAuthentication();
});
