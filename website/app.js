/* Global Variables */
const myAPIKey = '&appid=616781221ed0cd8d7dd466ee9dbfbe48&units=metric';
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const myZipCode = document.getElementById('zip');
const userFeelings = document.getElementById('feelings');
const generateButton = document.getElementById('generate');
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();

generateButton.addEventListener('click', generateData);

function generateData() {

    let zipValue = myZipCode.value;
    let contentValue = userFeelings.value;

    if (zipValue != '') {
        getWeatherData(baseURL, zipValue, myAPIKey)
            .then(function(data) {
                console.log(data);
                postData('/addProjectData', { date: newDate, temp: data.list[0].main.temp, content: contentValue });
                updateUI();
            });
    } else {
        alert("You have to enter a zip code value");
    }

}

// getFunction to get api data with apikey
const getWeatherData = async(url, zipCode, apiKey) => {
    const data = await fetch(url + zipCode + apiKey);

    try {
        const weatherData = await data.json();
        return weatherData;
    } catch (error) {
        console.log(error);
    }
}

const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
}

const updateUI = async() => {
    const res = await fetch('/getProjectData');
    console.log(res);
    try {
        const allData = await res.json();
        console.log(allData)
        dateDiv.innerHTML = "date: " + allData.date;
        tempDiv.innerHTML = "temperature: " + allData.temp;
        if (userFeelings.value != '') {
            contentDiv.innerHTML = "feelings: " + allData.content;
        } else {
            contentDiv.innerHTML = '';
        }

    } catch (error) {
        console.log(error);
    }
}
