const ApiKey = "";
const baseUrl = "http://ergast.com/api/f1/";
const seasson = "2020";
const teamEndPoin = `${baseUrl}${seasson}/constructors.json`;
const matchEndPoin = `${baseUrl}${seasson}.json`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchres = fetch(teamEndPoin);
const fetchresmatch = fetch(matchEndPoin);




console.log(teamEndPoin);
function getListConstructors() {
    title.innerHTML = "Daftar Tim FORMULA 1 2020"
    fetchres
        .then(response => response.json())
        .then(resJson => {
            let ConstructorsLists = "";
            resJson.MRData.ConstructorTable.Constructors.forEach(Constructors => 
                ConstructorsLists += `
                <li class="collection-item avatar">
                    <img src="${Constructors.url}" alt="" class="circle">
                    <span class="title">${Constructors.name}</span>
                    <p>Inisial: ${Constructors.constructorId} <br>
                       Negara Tim: ${Constructors.nationality}
                    </p>
                    <a href="#" data-id="${Constructors.id}" class="secondary-content"><i class="material-icons" data-id="${Constructors.id}">info</i></a>
                </li>
                `
            );
            contents.innerHTML = '<ul class="collection">' + ConstructorsLists + '</ul>';
        }).catch(err => {
            console.error(err);
        })
}


console.log(matchEndPoin);
function getListMatches() {
    title.innerHTML = "Jadwal Race F1 2020";
    fetchresmatch
        .then(response => response.json())
        .then(resJson => {
            let RacesLists = "";
            console.log(resJson.MRData.RaceTable.Races);
            resJson.MRData.RaceTable.Races.forEach(Races => 
                RacesLists += `
                <li class="collection-item avatar">
                    <span class="title">${Races.raceName}</span>
                    <p>Ronde: ${Races.round}<br>
                       Nama Circuit: ${Races.Circuit.circuitName} <br>
                       Lokasi: ${Races.Circuit.Location.locality}<br>
                       Negara: ${Races.Circuit.Location.country}<br>
                       Jadwal: ${Races.date}<br>
                    </p>
                    <a href="#" data-id="${Races.id}" class="secondary-content"><i class="material-icons" data-id="${Races.id}">info</i></a>
                </li>
                `
            );
            contents.innerHTML = '<ul class="collection">' + RacesLists + '</ul>';
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListConstructors();
            break;
        case "matches":
            getListMatches();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});