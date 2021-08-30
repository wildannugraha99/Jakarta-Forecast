fetch('https://api.openweathermap.org/data/2.5/onecall?lat=-6.210970297206947&lon=106.844278688916&lang=id&exclude=hourly,current,minutely,hourly,alerts&appid=acb3bb9a964db32511b95b72b962686b')
.then(Response => Response.json())
.then(Response =>{
    console.log(Response)
    const respon = Response.daily
    
    const timeZone = document.createElement('h1')
    timeZone.className ='titleZone'
    timeZone.innerHTML =`<img class="icon-loc" src="assets/location.png">`+' '+ Response.timezone + 
    `<sup><img class="indo-flag" src="assets/indonesia.png"></sup>`
    
    const koordinat = document.createElement('div')
    koordinat.className = 'koordinat'
    koordinat.innerHTML = `<p class="lat">Latitude: ${Response.lat}</p>
    <p class="lon">Longtitude: ${Response.lon}</p>`

    const rootHtml = document.querySelector('#jumbotron')
    rootHtml.append(timeZone,koordinat)
    
    respon.forEach(data => {
        const tanggal = data.dt
        let dt = new Date(tanggal*1000);
        let hrs = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
        let blns = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
        let hr = hrs[dt.getDay()] ;
        let tgl = dt.getDate();
        let bln = blns[dt.getMonth()];
        let thn = dt.getFullYear();

        let suhuMaks = data.temp.max
        let convertValMaks = suhuMaks.toFixed(0)
        let valBagiMaks = convertValMaks/10
       

        let suhuMin = data.temp.min
        let convertValMin = suhuMin.toFixed(0)
        let valBagiMin = convertValMin/10
        
        
        const card = document.createElement('div')
        card.className ='card'
        
        card.innerHTML =`<div class="left">
        <b><p class="tanggal"><img class="icon-date" src="assets/schedule.png"> ${hr}, ${tgl} ${bln} ${thn}</p></b>
        <b><p><img class="icon-weather" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"> ${data.weather[0].description}</p></b>
        </div>

        <div class="right">
        <b><p><img class="icon-humidity" src="assets/humidity.png"> Kelembaban: ${data.humidity}%</p></b>
        <b><p><img class="icon-suhu" src="assets/thermometer.png"> Suhu: ${valBagiMin}°C ~ ${valBagiMaks}°C</p></b>
        </div>`

        const cardWrapper = document.querySelector('.card-wrapper')
        cardWrapper.append(card)
        
        const rootHtml = document.querySelector('#outer')
        rootHtml.append(cardWrapper)
      
    });
})