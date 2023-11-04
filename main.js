
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
var genPreviewCard = (project, index) => {
    var htmlString = `
        <div class="project-card" id="project-card-${index}" onclick="setActiveProject(${index})">
            <img src="${project.image}"/>
            <h3 class="project-card-title">${project.title}</h3>
        </div>
    `
    return htmlString
}

window.onload = () => {
    var projectsData = genFakeProjectsData();
    var projectsContainer = document.getElementById("projects-container");
    var i = 0;
    projectsData.forEach((project) => {
        projectsContainer.innerHTML += genPreviewCard(project, i);
        i++;
    });
}

var activeProject = -1;

var setActiveProject = (index) => {
    var detailView = document.getElementById("project-details");
    if(activeProject != -1){
        // unactivate old one
        var oldActive = document.getElementById("project-card-" + activeProject);
        oldActive.classList.remove("active-project");
        detailView.classList.remove("visible");
        if(activeProject == index){
            document.body.style.setProperty("--active-project", -1);
            activeProject = -1;
            return;
        }
    }
    var newActive = document.getElementById("project-card-" + index);
    newActive.classList.add("active-project");
    detailView.classList.add("visible");
    document.body.style.setProperty("--active-project", index);
    activeProject = index;
    updateDetailPosition();
}

var updateDetailPosition = () => {
    var detailView = document.getElementById("project-details");
    var projectColumns = getComputedStyle(document.body).getPropertyValue("--project-columns");
    var projectRow = Math.floor(activeProject / projectColumns) + 2;
    detailView.style.setProperty("grid-row", projectRow);
}

window.onresize = () => {
    updateDetailPosition();
}