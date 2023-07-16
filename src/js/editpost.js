document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://piyushsharma.one/wiki/wp-json/wp/v2/posts";
    const editPostForm = document.getElementById("editPostForm");

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    function fetchPost() {
        const postUrl = `${apiUrl}/${postId}`;
        fetch(postUrl)
            .then((response) => response.json())
            .then((data) => {
                displayPostForm(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function displayPostForm(post) {
        const postForm = document.createElement("form");
        postForm.id = "updatePostForm";

        const formGroup1 = document.createElement("div");
        formGroup1.classList.add("form-group");

        const titleLabel = document.createElement("label");
        titleLabel.htmlFor = "postTitle";
        titleLabel.textContent = "Title";

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.classList.add("form-control");
        titleInput.id = "postTitle";
        titleInput.value = post.title.rendered;
        titleInput.required = true;

        formGroup1.appendChild(titleLabel);
        formGroup1.appendChild(titleInput);

        const formGroup2 = document.createElement("div");
        formGroup2.classList.add("form-group");

        const contentLabel = document.createElement("label");
        contentLabel.htmlFor = "postContent";
        contentLabel.textContent = "Content";

        const contentTextarea = document.createElement("textarea");
        contentTextarea.classList.add("form-control");
        contentTextarea.id = "postContent";
        contentTextarea.value = stripTags(post.content.rendered);
        contentTextarea.required = true;

        formGroup2.appendChild(contentLabel);
        formGroup2.appendChild(contentTextarea);

        const updateButton = document.createElement("button");
        updateButton.type = "submit";
        updateButton.classList.add("btn", "btn-primary");
        updateButton.textContent = "Update Post";

        postForm.appendChild(formGroup1);
        postForm.appendChild(formGroup2);
        postForm.appendChild(updateButton);

        editPostForm.appendChild(postForm);

        postForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const updatedTitle = document.getElementById("postTitle").value;
            const updatedContent = document.getElementById("postContent").value;

            updatePost(postId, updatedTitle, updatedContent);
        });
    }

    function updatePost(postId, title, content) {
        const token = localStorage.getItem("token");

        const updatePostUrl = `${apiUrl}/${postId}`;
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

        fetch(updatePostUrl, requestData)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.href = "profile.html";
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function stripTags(html) {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    fetchPost();
});
