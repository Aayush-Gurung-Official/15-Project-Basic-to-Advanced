const username = document.getElementById('username');
const searchButton = document.querySelector('#search-button');
const profileContainer = document.querySelector('.profile-card');

searchButton.addEventListener('click', async () => {

    const user = username.value.trim();

    if (user === "") {
        alert("Please enter a username");
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${user}`);

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();

        // Remove hidden class
        profileContainer.classList.remove("hidden");

        profileContainer.innerHTML = `
            <div class="profile-header">
                <img src="${data.avatar_url}" alt="Profile Image">
                <div class="profile-info">
                    <h2>${data.name || data.login}</h2>
                    <p>${data.bio || "No bio available"}</p>
                    <div class="stats">
                        <span>Repos: ${data.public_repos}</span>
                        <span>Followers: ${data.followers}</span>
                        <span>Following: ${data.following}</span>
                    </div>
                </div>
            </div>
        `;

    } catch (error) {
        profileContainer.classList.remove("hidden");
        profileContainer.innerHTML = `<p style="color:red;">User not found</p>`;
    }

});