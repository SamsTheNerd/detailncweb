
// mostly reusing code here from the hexaddons website

var getProjectsData = () => {
    var request = new XMLHttpRequest();
    request.open("GET", "./projects.json", false);
    request.send(null)
    var allProjectsData = JSON.parse(request.responseText);
    return allProjectsData;
}

var genFakeProjectsData = () => {
    var cards = [];
    for(i = 0; i < 10; i++) {
        var card = {
            "title": "Project " + i,
            "description": "This is a fake project",
            "image": "http://detailnc.com/images/242.JPG"
        }
        cards.push(card);
    }
    return cards;
}

// returns string of html for a single project card -- only 
var genPreviewCard = (project) => {
    var htmlString = `
        <div class="project-card">
            <img src="${project.image}"/>
            <h3 class="project-card-title">${project.title}</h3>
        </div>
    `
    return htmlString
}

window.onload = () => {
    var projectsData = genFakeProjectsData();
    var projectsContainer = document.getElementById("projects-container");
    projectsData.forEach((project) => {
        projectsContainer.innerHTML += genPreviewCard(project);
    });
}