import conditions from './conditions.js'


const apiKey = 'b45887a7acfd4a448a1125042240902'

const form = document.querySelector('#form')
const input = document.querySelector('#inputCity')
const header = document.querySelector('.header')


function removeCard () {
    const prevCard = document.querySelector('.main');
	if (prevCard) prevCard.remove();
}

function showError (errorMessage) {
    const html = `<main class="main">
    <section class="section">
        <div class="card-box">${errorMessage}</div>
    </section>
    </main>`
    
    header.insertAdjacentHTML ('afterend', html)
}

function showCard (name, country, temp_c, condition, imgPath) {

    const html = `    <main class="main">
    <section class="section">
        <div class="card-box">
            <h2 class="section-title-text section-title-text-h2">${name} <span>${country}</span></h2>
              
            <div class="card-weather">
                <div class="section-text-main section-text-p">${temp_c}<sup>°с</sup></div>
                <img src="${imgPath}" alt="weather" class="icon-weather">
            </div>
                
            <div class="section-text-footer section-text-footer-p">${condition}</div>
        </div>
    </section>
</main>`

    header.insertAdjacentHTML ('afterend', html)
}

async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)   
    return data
}

form.onsubmit = async function (event) {
    event.preventDefault()
    
    let city = input.value.trim()
    const data = await getWeather(city) // получаем данные с сервера
    
    if (data.error) {

        removeCard()
        showError(data.error.message)

        } else {

        removeCard()

        const info = conditions.find((obj) => obj.code === data.current.condition.code)
        const filePath = './images/' + (data.current.is_day ? 'day' : 'night') + '/'
        const fileName = (data.current.is_day ? info.day : info.night) + '.png'
        const imgPath = filePath + fileName

        showCard(
            data.location.name,
            data.location.country,
            data.current.temp_c,
            data.current.is_day 
            ? info.languages[23]['day_text']
            : info.languages[23]['night_text'],
            imgPath,
        )
        }


}