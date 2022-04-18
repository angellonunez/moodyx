let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");
let moods = document.getElementById("moods");
let singleMood = document.getElementsByClassName("mood-value");
let data = [];

// I need a function to display the current time each time the person write a post
function getTime() {
    const date = new Date();

    const formattedDate = date.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
});

    return formattedDate;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("button clicked");

    formValidation();
});

let acceptData = () => {
    data.push({
        text: input.value,
        mood: moods.value,
        date: getTime(),
    })
    console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
    createPost();
};

let formValidation = () => {
    if (input.value === "") {
        msg.innerHTML = "Post cannot be blank";
        console.log("failure");
    } else {
        console.log("successs");
        msg.innerHTML = "";
        acceptData();
    }
};

let createPost = () => {
    posts.innerHTML = '';
    data.map((element, box) => {
        return (posts.innerHTML += `
    <div id=${box} class="box">
        <div class="post">
            <p>${element.text}</p>
            <span class="options">
                <i onClick="editPost(this)" class="fas fa-edit"></i>
                <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
            </span>
        </div>
        <div class="mood-date">
            <div class="mood-box">
                <p class="mood-value">${element.mood}</p>
            </div>
            <p class="date">${element.date}</p>
        </div>
    </div>
    `);

    })
    input.value = "";
};

let deletePost = (e) => {
    e.parentElement.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
};

let editPost = (e) => {
    let selectedPost = e.parentElement.parentElement;
    input.value = selectedPost.children[0].innerHTML;
    deletePost(e);
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createPost();
})();