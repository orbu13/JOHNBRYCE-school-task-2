const totalCountries = document.querySelector("#totalCountries")
const totalPopulation = document.querySelector("#totalPopulation")
const averagePopulation = document.querySelector("#averagePopulation")
const regionTable = document.querySelector("#regionTable")
const currenciesDisplay = document.querySelector("#currenciesDisplay")

const searchButton = document.querySelector("#button")
searchButton.addEventListener("click", search)

function search(){
    addSpinner()
    const userInput = document.querySelector("#input").value;
    console.log(userInput);
    
    fetch(`https://restcountries.com/v3.1/name/${userInput}`)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data);
        displayCountries(data)
    })
    .catch(function(error){
        console.log('Error fetching data:', error);
    })
    
    removeSpinner()
}

function displayCountries(countries){
    totalCountries.textContent = "Total Countries Result: " + countries.length 
    const totalPopulationValue = countries.reduce(function(acc,next){
        return acc + next.population
    },0)

    totalPopulation.textContent = "Total Countries Population: " + totalPopulationValue
    averagePopulation.textContent = "Average Population: " + parseInt(totalPopulationValue/countries.length)


    const countriesTable = document.querySelector("#countriesTable")
    countriesTable.innerHTML = " "
    
    const headerRow = document.createElement("tr")

    const countriesName = document.createElement("th")
    countriesName.textContent = "Country Name:"
    headerRow.appendChild(countriesName)
    countriesTable.appendChild(countriesName)

    const populationHeading = document.createElement("th")
    populationHeading.textContent = "Population:"
    headerRow.appendChild(populationHeading)
    countriesTable.appendChild(populationHeading)
    
    const topRow = document.createElement("tr")
    const continentCell = document.createElement("td")
    continentCell.textContent = "Continent:"
    const continentNames = {}

    regionTable.appendChild(topRow)
    topRow.appendChild(continentCell)

    const currencies = {}

    countries.slice(0,9).forEach(element => {
        const row = document.createElement("tr")
        const nameCell = document.createElement("td")
        nameCell.textContent = element.name.common
        row.appendChild(nameCell)

        const populationCell = document.createElement("td")
        populationCell.textContent = element.population
        row.appendChild(populationCell)

        countriesTable.appendChild(row)

        if(continentNames[element.region] === undefined){
            continentNames[element.region] = 1
        }else{
            continentNames[element.region] ++
        }

        for(let key in element.currencies){
            console.log(element.currencies[key]);
            if(currencies[key] === undefined){
                currencies[key] = 1
            }else{
                currencies[key] ++
            }
        }
    });

    for(let key in currencies){
        const currenciesItem = document.createElement("li")
        currenciesItem.textContent = currencies[key] + " Countries Used: " + key
        currenciesDisplay.appendChild(currenciesItem)
    }

    console.log(currencies);
    console.log(continentNames);
    for(let key in continentNames){
        const row = document.createElement("tr")
        const continentCell = document.createElement("td")
        continentCell.textContent = key + ": " + continentNames[key]
        row.appendChild(continentCell)
        regionTable.appendChild(row)
    }
}

function addSpinner(){
    let spinnerOverLay = document.createElement("div")
    spinnerOverLay.classList.add("spinnerOverLay")
    let spinnerContainer = document.createElement("div")
    spinnerContainer.classList.add("spinnerContainer")
    spinner = document.createElement("span")

    spinnerContainer.appendChild(spinner)
    spinnerOverLay.appendChild(spinnerContainer)

    let body = document.querySelector("body")
    body.append(spinnerOverLay)
}

function removeSpinner(){
    setTimeout(() => {
        const spinnerOverLay = document.querySelector(".spinnerOverLay");
        if (spinnerOverLay) {
            spinnerOverLay.remove();
        }
    }, 3500);
}