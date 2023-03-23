// main variables
const theInput = document.querySelector(".get-repos input");
const getButton = document.querySelector(".get-button");
const reposData = document.querySelector(".show-data");
getButton.onclick = function () {
    getRepos();
};
// get repos function
function getRepos() {
    if (theInput.value == "") 
    { // if value is empty
        reposData.innerHTML = "<span>please write Github username!</span>";
    }
    else
    {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) => response.json())
        .then((repositories) => 
        {
            // empty the container
            reposData.innerHTML = '';
            // loop on repositories
            repositories.forEach(repo => {
                // create the main div element
                const mainDiv = document.createElement("div");
                // create repo name text
                const repoName = document.createTextNode(repo.name);
                // append the text to main div
                mainDiv.appendChild(repoName);
                // create repo URL anchor
                const theUrl = document.createElement('a');
                // create repo URL text
                const theUrlText = document.createTextNode("Visit");
                // append the repo URL text to anchor tag
                theUrl.appendChild(theUrlText);
                // add the Hypertext reference "href"
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                // set attribute blank
                theUrl.setAttribute('target', '_blank');
                // append URL anchor to main div
                mainDiv.appendChild(theUrl);
                // create stars count span
                const starsSpan = document.createElement("span");
                // create the stars count text
                const starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
                // add stars count text to stars span
                starsSpan.appendChild(starsText);
                // append stars count span to main div
                mainDiv.appendChild(starsSpan);
                // add class on main div
                mainDiv.className = 'repo-box';
                // append the main div to container
                reposData.appendChild(mainDiv);
            });
        });
    }
}