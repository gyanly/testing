const cityForm = document.querySelector('form');
const detials = document.querySelector('.details');
const icon = document.querySelector('.icon img');
const time = document.querySelector('img.time');
const card = document.querySelector('.card');

const updateUI = (data)=>{

    const {cityDets, weather} = data;

    const html = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>  
    `;
    detials.innerHTML = html;

    const iconScr = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconScr);

    let timeSrc = weather.IsDayTime;

    let DNimage = '';

    if(timeSrc){
        DNimage = 'img/day.svg';

    }else{
        DNimage = 'img/night.svg';
    }

    time.setAttribute('src',DNimage);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

const updateCity = async(city)=>{

    const cityDets = await getCity(city);
    const weather = await getWether(cityDets.Key);
    return {cityDets, weather};
}


cityForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();
    updateCity(city)
    .then(data =>{
        updateUI(data);
    })
    .catch(err=>{
        console.log(err);
    });
    localStorage.setItem('city',city);
})

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data=>{
        updateUI(data);
    })
    .catch(err =>{
        console.log(err);
    })
}

