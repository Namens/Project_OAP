const apiKey = '3199883551d04ac69be164059240602'


/* Получаем название из города */

const form = document.querySelector('#form')
const input = document.querySelector('#inputCity')
let city
const header = document.querySelector('.header')



function removeCard() {
    const prevCard = document.querySelector('.card-front')
    if (prevCard) prevCard.remove()
}


function showCard (name, country, temp_c, condition) {
    
    const html = `<div class="card-front">
    <div class="section-text">
    
    <div class="section-title">
    <h2 class="section-title-text section-title-text-h2">${name}</h2>
    <span class="section-title-image"> ${country} </span>
    </div>
    
    <p class="section-text-main section-text-p">${temp_c}°c</p>
    
    <p class="section-text-footer section-text-footer-p">${condition}</p>
    </div>
    
    <img src="./images/icons_svg/icon-weather.svg" alt="weather" class="icon-weather">
    
    </div>`
    
    
    header.insertAdjacentHTML('afterend', html)
}





form.onsubmit = function(event){
    // отменяем отправку формы
    event.preventDefault();
    
    //    берём значение из инпута, trim убирает пробелы
    city = input.value.trim();
    
    // делаем запрос на сервер
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    
    // выполнение запроса
    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        
        
        

        // проверка на ошибку
        if (data.error) {
            
            removeCard()
            const html = `<div class="card-front">${'Takova goroda net'}</div>`
            header.insertAdjacentHTML('afterend', html)
            

        }else{

            removeCard()

            showCard(
                data.location.name, 
                data.location.country, 
                data.current.temp_c, 
                data.current.condition.text
            )
            
        }
        
        
        
        
    })
    
    console.log(data)
}