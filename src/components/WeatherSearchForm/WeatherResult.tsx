import type { OpenWeatherResponse } from "../../types/weather";
import { formatDateTime } from "../../utils/formatDateTime";

type WeatherResultProps = {
  weather: OpenWeatherResponse | null;
};

const WeatherResult = ({ weather }: WeatherResultProps) => {
  if (!weather) return null;

  return (
    <div className="mt-4 text-sm space-y-1 text-black dark:text-white">
      <p className="font-semibold">Today&apos;s Weather</p>

      <h1 className="text-5xl lg:text-7xl font-bold text-[#6C40B5] dark:text-white">
        {weather.main.temp}°
      </h1>

      <p className="font-semibold">
        H: {weather.main.temp_max}° L: {weather.main.temp_min}°
      </p>

      <div className="flex justify-between items-end text-[#666666] dark:text-white gap-3 -translate-y-3/4 lg:-translate-y-0">
        <p className="font-bold">
          {weather.name}, {weather.sys.country}
        </p>

        <div
          className="
            flex
            flex-col lg:flex-row
            items-end lg:items-center
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
