"strict";
const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.querySelector(".filter");

let limit = 5;
let page = 1;

// Fetch posts from API
const getPosts = async function () {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
};

// Show Posts in Dom
const showPosts = async function () {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
     <div class='number'>${post.id}</div>
     <div class='post-info'>
      <h2 class='post-title'>${post.title}</h2>
      <p class ='post-body'>${post.body}</p>
     </div>
    `;
    postsContainer.appendChild(postEl);
  });
};

// Show loader and fetch more posts
function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

//Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

// Show posts
showPosts();

//Scroll Event
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

//Filter Event
filter.addEventListener("input", filterPosts);
