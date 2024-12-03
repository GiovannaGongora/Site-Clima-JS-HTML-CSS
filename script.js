document.querySelector('#search').addEventListener('submit', async (event) => {
event.preventDefault(); /* previnindo que quando 
clicamos em buscar ele atualize a pagina (padrão )*/

const city_name = document.querySelector('#cityname').value;
/* armazenando o nome da cidade na variavel */

if (!city_name) {
    return showalert('Você precisa digitar uma cidade..')
}

const apikey = 'e14a61d20a96eb59364f8209ca0f33de';
const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city_name)}&appid=${apikey}&units=metric&lang=pt_br`


const result = await fetch (apiurl);
const json = await result.json();

if (json.cod === 200) {

    showinfo({
        city: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempMax: json.main.temp_max,
        tempMin: json.main.temp_min,
        description: json.weather[0].description,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        humidity: json.main.humidity,
    })

} else {
    showalert('Não e possivel localizar....')
}


});

function showinfo(json)
{
    showalert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#tempvalue').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_des').innerHTML = `${json.description}`;
    document.querySelector('#tempimage').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('#tempmax').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#tempmin').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#humida').innerHTML = `${json.humidity}%`;
    document.querySelector('#vento').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}


function showalert(msg) {

    document.querySelector('#alert').innerHTML = msg;
    /* armazenando o nome da cidade na variavel */
    }


