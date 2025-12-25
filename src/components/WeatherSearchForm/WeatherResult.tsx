import type { OpenWeatherResponse } from "../../types/weather";
import { formatDateTime } from "../../utils/formatDateTime";

import sunIcon from "../../assets/sun.png";
import cloudIcon from "../../assets/cloud.png";

type WeatherResultProps = {
  weather: OpenWeatherResponse | null;
};

const WeatherResult = ({ weather }: WeatherResultProps) => {
  if (!weather) return null;

  const main = weather.weather[0].main.toLowerCase();
  const isClear = main === "clear";

  const iconSrc = isClear ? sunIcon : cloudIcon;
  const iconAlt = isClear ? "Sunny" : "Cloudy";

  return (
    <div className="text-xs lg:text-sm space-y-1 text-black dark:text-white relative">
      <img
        src={iconSrc}
        alt={iconAlt}
        className="
    absolute
    right-0
    top-0
    translate-x-6
    -translate-y-[calc(50%+1.5rem)]
    md:-translate-y-1/2
    w-[157px] md:w-[300px]
    aspect-square
    object-contain
    pointer-events-none
    select-none
  "
      />

      <p className="font-semibold">Today&apos;s Weather</p>

      <h1 className="text-5xl lg:text-7xl font-bold text-[#6C40B5] dark:text-white">
        {weather.main.temp}°
      </h1>

      <p className="font-semibold">
        H: {weather.main.temp_max}° L: {weather.main.temp_min}°
      </p>

      <div className="flex justify-between items-end text-[#666666] dark:text-white gap-3 -translate-y-3/4 lg:-translate-y-0">
        <p className="font-bold min-w-[25%]">
          {weather.name}, {weather.sys.country}
        </p>

        <div
          className="
            flex
            flex-col lg:flex-row
            items-end lg:items-center lg:flex-1 lg:justify-between
            gap-1 lg:gap-4
            text-right
          "
        >
          <p className="capitalize order-1 lg:order-3">
            {weather.weather[0].description}
          </p>

          <p className="order-2 lg:order-2">
            Humidity: {weather.main.humidity}%
          </p>

          <p className="order-3 lg:order-1">
            {formatDateTime(weather.dt, weather.timezone)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherResult;
