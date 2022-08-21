// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById("missionTarget");
   missionTarget.innerHTML =`
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${imageUrl}">
`
}

function validateInput(testInput) {
    testInput = testInput.trim();
    if(testInput==="" || testInput=== 0) {
         return "Empty";
} else if (isNaN(testInput)===true) {
    return "Not a Number";
} else {
      return "Is a Number";
}
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let aPilot = document.getElementById("pilotStatus");
    let aCopilot = document.getElementById("copilotStatus");
    let aFuelLevel = document.getElementById("fuelStatus");
    let aCargoLevel = document.getElementById("cargoStatus");
    let launch = document.getElementById("launchStatus");

    if (validateInput(pilot)=== 'Empty' || validateInput(copilot)==='Empty' || validateInput(fuelLevel)==='Empty' || validateInput(cargoLevel)==='Empty') {
       alert("All fields are required!"); 
    } else if (validateInput(fuelLevel)==="Not a Number" || validateInput(cargoLevel)==="Not a Number") {
        alert("Make sure to enter valid information for each field!");
    } else if (validateInput(pilot)==="Is a Number" || validateInput(copilot)==="Is a Number") {
        alert("Make sure to enter valid information for each field!");
    } else {
    aPilot.innerHTML = `Pilot ${pilot} is ready for launch`;
    aCopilot.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    list.style.visibility = 'hidden';
    }
    if (Number(fuelLevel)<10000 && Number(cargoLevel) > 10000) {
        list.style.visibility = 'visible';
        aFuelLevel.innerHTML = "Not enough fuel for journey";
        aCargoLevel.innerHTML = "Cargo too heavy for takeoff";
        launch.innerHTML = "Shuttle not ready for launch";
        launch.style.color = 'red';
    }else if(Number(fuelLevel)<10000) {
        aFuelLevel.innerHTML = "Not enough fuel for journey";
        launch.innerHTML = "Shuttle not ready for launch";
        launch.style.color = "red";
        list.style.visibility = 'visible';
    } else if (Number(cargoLevel) > 10000) {
        aCargoLevel.innerHTML = 'Cargo too heavy for takeoff';
        list.style.visibility = 'visible';
        launch.innerHTML = 'Shuttle not ready for launch';
        launch.style.color = 'red';
    }else {
        list.style.visibility = 'visible';
        aFuelLevel.innerHTML = 'Enough fuel for journey';
        aCargoLevel.innerHTML = 'Cargo light enough for takeoff';
        launch.innerHTML = 'Shuttle ready for launch';
        launch.style.color = 'green';
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
       return response.json()
    });
    return planetsReturned;
    }


function pickPlanet(planets) {
    let index = Number(Math.floor(Math.random() * planets.length));
    return planets[index];;
}
;
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
