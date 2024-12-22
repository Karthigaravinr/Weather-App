import React, {  useEffect, useState } from 'react'
import './App.css';
import Search from './image/download.png';
import sun from './image/sun.png';
import rain from './image/rain1.png';
import  cloud from './image/rain in sun.png'
import win from './image/wind1.png'
import humidit from './image/humi.png'
import clearkey from './image/clearsky.png'
import fewclouds from './image/few clouds.jpg'
import scattered from './image/scatted clouds.jpg'
import thun from'./image/thunderstorm.png'


const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
     return(
     <>
        <div className='image'> 
            <img  src={icon} alt="imgage"/>
        </div>
        <div className='temp'>{temp}°C</div>
        <div className='location'>{city}</div>
        <div className='country'>{country}</div>
          <div className='cord'>
            <div>
               <span className='lat'>latitude</span>
               <span>{lat}</span>
            </div>
            <div>
               <span className='log'>longitude</span>
               <span>{log}</span>
            </div>
          </div>
            <div className='data-container'>
               <div className='element'>
                    <img src={humidit} alt='humidity' className='icon'/>
                    <div className='data'>
                         <div className='humidity-percent'>{humidity}%</div>
                         <div className='text'>Humidity</div>
                    </div>
               </div>
               <div className='element'>
                    <img src={win} alt='wind' className='icon'/>
                    <div className='data'>
                         <div className='humidity-percent'>{wind}km/h</div>
                         <div className='text'>Wind speed</div>
                    </div>
               </div>
               
            </div>
        
     </>
     )
}


function App() {
     const[text,settext]=useState("chennai")
     const[icon,seticon]=useState('')
     const[temp,settemp]=useState(0);
     const[city,setcity]=useState("");
     const[country,setcountry]=useState("");
     const[lat,setlat]=useState(0);
     const[log,setlog]=useState(0);
     const[humidity,sethumidity]=useState(0);
     const[wind,setwind]=useState(0);
     const[citynotfound,setcitynotfound]=useState(false);
     const[loading,setloading]=useState(false);
     const[error,seterror]=useState(null);



      const weathericonMap={
          "01d":clearkey,
          "01n":clearkey,
          "02d":fewclouds,
          "02n":fewclouds,
          "03d":scattered,
          "03n":scattered,
          "04d":scattered,
          "o4n":scattered,
          "09d":rain,
          "09n":rain,
          "10d":cloud,
          "10n":cloud,
          "11d":thun,
          "11n":thun

      }

const search=async()=>{
          setloading(true);
          let api_key="dfece4b421e566270a2d9ae6e256cedd"
          let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`

          try{
             let res=await fetch(url);
             let data=await res.json();
              if(data.cod==="404"){
               console.log("city not found")
               setcitynotfound(true)
               setloading(false);
               return;
              }
              sethumidity(data.main.humidity);
              setwind(data.wind.speed);
              settemp(Math.floor(data.main.temp));
              setcity(data.name);
              setcountry(data.sys.country);
              setlat(data.coord.lat)
              setlog(data.coord.lon)
              const weathericoncode=data.weather[0].icon;
              seticon(weathericonMap [weathericoncode]|| sun)
              setcitynotfound(false);

          }catch(error){
              console.error("AN error occurred:", error.message);
              seterror("An error Occurred while fetching weather data.");
          }finally{
               setloading(false)
          }
     };
     const handlecity=(e)=>{
         settext(e.target.value);
     }
     const handlekeydown=(e)=>{
          if(e.key==="Enter"){
               search();
          }
     }
     useEffect(function(){
          search()
     },[ ])


   return (
     <div className='container'>
          <div className='input-container'> 
            <input  type='text' className='cityInput' placeholder='Search City' 
                    onChange={handlecity} value={text} onKeyDown={handlekeydown}/>
                <div className='search-icon' onClick={()=>search()}>
                     <img  src={Search} alt='search'/>
               </div>
          </div>
          {loading &&<div className='loading-message'>Loading...</div>}
          {error &&<div className='error-message'>{error}</div>}
          {citynotfound &&<div className='city-not-found'>City not found</div>}
          {!loading && !citynotfound &&<WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log}
                       humidity={humidity} wind={wind}/>}

         <p className='copyright'>
            &#169; Designed by<span>&#x2764;&#xfe0f;Karthiga</span>
         </p>
     </div>
  );
}

export default App;
