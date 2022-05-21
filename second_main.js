const weatherBlock = document.querySelector("#weather");

const container = document.createElement("div");
container.classList.add("container");


const inputCitu = document.createElement("input");
inputCitu.setAttribute("type", "text");
inputCitu.setAttribute("placeholder", "City Name");
inputCitu.classList.add("inp")

const submitButton = document.createElement("button");
submitButton.classList.add("btn");
submitButton.innerHTML = `select`;

container.appendChild(inputCitu);
container.appendChild(submitButton);

// var inputValue = document.querySelector(".inp").value;

console.log(container);
console.log(inputCitu);
console.log(submitButton);



const appID = "280de99cfa9dd8422a7cd6220333136b"
const units = "metric"


function actionInput(){
    weatherBlock.innerHTML = " "
    weatherBlock.appendChild(container);
    submitButton.addEventListener("click", (e)=>{
        var valueOfInput = document.querySelector(".inp").value;
        var city = valueOfInput;

        console.log(city)
        
        async function loadWeather(){    

            weatherBlock.innerHTML = `
            <div class="weather_loading">
                <img src="https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif">
            </div>`
        
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${appID}`;
            
            var response = await fetch(url, {
                method: "GET",
            });
        
            var responseResult = await response.json();
        
            if(response.ok){
                getWeather(responseResult);
            }else{
                weatherBlock.innerHTML = `${response.message}`
            
            }
            
        
        };

        const getWeather = (data)=>{
            console.log(data)
            const myCity = data.name;
            const temperature = Math.floor(data.main.temp);
            const temperatureFeelsLike = Math.floor(data.main.feels_like);
            const description = data.weather[0].main;
            const icon = data.weather[0].icon;
        
            const HTML_Template = `
            <div class="weather_header">
               <div class="main">
                   <div class="city">${myCity}</div>
                   <div class="status">${description}</div>
               </div>
               <div class="icon">
                   <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">
               </div>
             </div>
                 <div class="temperature">Temperature outside: ${temperature}</div>
                 <div class="feels_like">Feels like: ${temperatureFeelsLike}</div>
                   
                    `
            weatherBlock.innerHTML = HTML_Template;
        };

        loadWeather();
        
    })
}



// const link = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&appid=" + appID;










if(weatherBlock){
    actionInput();    
};