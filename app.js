const apiKey = 'b45887a7acfd4a448a1125042240902'
const form = document.querySelector('#form')
const input = document.querySelector('#inputCity')
const header = document.querySelector('.header')


function showError (errorMessage) {

}


function removeCard () {

}

function showCard () {

}



form.onsubmit = function (event) {
    event.preventDefault()

    let city = input.value.trim()
    
    const prevCard = document.querySelector('.card-box')

    if (prevCard) prevCard.remove()





    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`


    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {

        if (data.error) {

        if (prevCard) prevCard.remove()

        const html = `<main class="main">
        <section class="section">
            <div class="card-box">${data.error.message}</div>
        </section>
        </main>`
        
        
        header.insertAdjacentHTML ('afterend', html)

        } else {

            const html = `    <main class="main">
            <section class="section">
                <div class="card-box">
                    <h2 class="section-title-text section-title-text-h2">${data.location.name} <span>${data.location.country}</span></h2>
                      
                    <div class="card-weather">
                        <div class="section-text-main section-text-p">${data.current.temp_c}<sup>°с</sup></div>
                        <img src="./images/icons_svg/icon-weather.svg" alt="weather" class="icon-weather">
                    </div>
                        
                    <div class="section-text-footer section-text-footer-p">${data.current.condition.text}}</div>
                </div>
            </section>
    </main>`
    
            header.insertAdjacentHTML ('afterend', html)


        }


    })
}