
import TopButton from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureDetails from './components/TemperatureDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherServices';
import { useEffect, useState } from 'react';
import LeftAd from './components/ads/LeftAdd';
import RightAd from './components/ads/RightAdd';
import React from 'react';
function Weather() {
  const [query, setQuery] = useState({ q: 'Bhubaneshwar' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
        console.log('You are seeing updated weather', data);
      });
    }
    fetchWeather();
  }, [query, units])

  const formatBackground = () => {
    if (!weather?.temp) return 'from-cyan-700 to-blue-700';
  
    const temp = weather.temp;
    const isMetric = units === 'metric';
    const minTemp = isMetric ? -10 : 14;  
    const maxTemp = isMetric ? 40 : 104;  
    const percentage = (temp - minTemp) / (maxTemp - minTemp);
  
    if (percentage < 0.3) return 'from-cyan-700 to-blue-500';
    if (percentage < 0.6) return 'from-green-400 to-yellow-300';
    return 'from-yellow-300 to-red-600';
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 gap-4">
      
      
      <div className="hidden lg:block w-1/5">
        <LeftAd />
      </div>
      
     
      <div className={`flex-1 max-w-screen-md py-5 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
        <TopButton setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureDetails weather={weather} />
            <Forecast title="Hourly forecast" items={weather.hourly} />
            <Forecast title="Daily forecast" items={weather.daily} />
          </div>
        )}
      </div>
      
     
      <div className="hidden lg:block w-1/5">
        <RightAd />
      </div>
    </div>
  );
}

export default  Weather;