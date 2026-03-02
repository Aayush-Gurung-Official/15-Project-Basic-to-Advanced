const app = document.getElementById("app");

// LocalStorage Database
function getPosts() {
  return JSON.parse(localStorage.getItem("posts")) || [];
}

function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Navigation
function navigate(route) {
  window.location.hash = route;
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

// Router
function router() {
  const hash = window.location.hash.replace("#", "");

  if (hash.startsWith("view-")) {
    const id = hash.split("-")[1];
    viewPost(id);
  } else if (hash.startsWith("edit-")) {
    const id = hash.split("-")[1];
    editPostForm(id);
  } else if (hash === "create") {
    createPostForm();
  } else {
    homePage();
  }
}

// Home Page
function homePage() {
  const posts = getPosts();

  app.innerHTML = "<h1>All Blog Posts</h1>";

  if (posts.length === 0) {
    app.innerHTML += "<p>No posts yet.</p>";
    return;
  }

  posts.forEach(post => {
    app.innerHTML += `
      <div class="card">
        <h3>${post.title}</h3>
        <p>${post.content.substring(0,100)}...</p>
        <button class="btn-view" onclick="navigate('view-${post.id}')">View</button>
        <button class="btn-edit" onclick="navigate('edit-${post.id}')">Edit</button>
        <button class="btn-delete" onclick="deletePost(${post.id})">Delete</button>
      </div>
    `;
  });
}

// Create Post
function createPostForm() {
  app.innerHTML = `
    <h1>Create New Post</h1>
    <form onsubmit="createPost(event)">
      <input type="text" id="title" placeholder="Title" required>
      <textarea id="content" rows="6" placeholder="Content" required></textarea>
      <button type="submit">Publish</button>
    </form>
  `;
}

function createPost(e) {
  e.preventDefault();
  const posts = getPosts();

  const newPost = {
    id: Date.now(),
    title: document.getElementById("title").value,
    content: document.getElementById("content").value
  };

  posts.push(newPost);
  savePosts(posts);

  navigate("home");
}

// View Post
function viewPost(id) {
  const posts = getPosts();
  const post = posts.find(p => p.id == id);

  app.innerHTML = `
    <div class="card">
      <h1>${post.title}</h1>
      <p>${post.content}</p>
      <button onclick="navigate('home')">Back</button>
    </div>
  `;
}

// Edit Post
function editPostForm(id) {
  const posts = getPosts();
  const post = posts.find(p => p.id == id);

  app.innerHTML = `
    <h1>Edit Post</h1>
    <form onsubmit="updatePost(event, ${id})">
      <input type="text" id="title" value="${post.title}" required>
      <textarea id="content" rows="6" required>${post.content}</textarea>
      <button type="submit">Update</button>
    </form>
  `;
}

function updatePost(e, id) {
  e.preventDefault();
  let posts = getPosts();

  posts = posts.map(post => 
    post.id == id 
      ? { ...post, title: title.value, content: content.value }
      : post
  );

  savePosts(posts);
  navigate("home");
}

// Delete Post
function deletePost(id) {
  let posts = getPosts();
  posts = posts.filter(post => post.id != id);
  savePosts(posts);
  homePage();
}