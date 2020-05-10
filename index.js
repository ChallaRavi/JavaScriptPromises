// #region setup
const API_URL = "https://starwars.egghead.training/";
const spinner = document.getElementById("spinner")

function getFilmTitles(films) {
    return films
        .sort((a, b) => a.episode_id - b.episode_id)
        .map(film => `${film.episode_id}.${film.title}`)
        .join("\n")
}

function getPeople(people){
    console.log(people)
    return people
            .map(p => `${p.gender}.${p.name}`)
            .join("\n")
}

async function fetchAllTheData() {
    await Promise.all([
        queryviaAsync(API_URL, "films"),    
        queryviaAsync(API_URL, "species"),
        queryviaAsync(API_URL, "people")
    ])
    .then(([films, species, people]) => {
        output.innerText = `${getFilmTitles(films)}\n\n ` +   `Species Number = ${species.length}`
        outputTWO.innerText = getPeople(people)
    })
    .catch(error => {
        console.warn(error)
        output.innerText = ":("
        outputTWO.innerText = ":("
    })
    .finally(() => {
        spinner.remove();
    })

}

fetchAllTheData()


function queryviaNonAsync(rootURL, endpoint =""){
    return fetch(rootURL + endpoint).then(response => {
        return response.ok ? response.json() : Promise.reject(Error("Unsuccessful Message"))
    })  
}

async function queryviaAsync(rootURL, endpoint) {
    const response = await fetch(rootURL + endpoint)
    if(response.ok) {
        return response.json();
    }
    throw Error("Unsuccessful Response..");
} 
