import { useState } from "react";
import { useForm } from "react-hook-form";

import { fetchCurrentWeather } from "../../services/openWeatherApi";
import type {
  OpenWeatherResponse,
  WeatherSearchHistoryItem,
} from "../../types/weather";
import { useWeatherSearchHistory } from "../../hooks/useWeatherSearchHistory";

type WeatherFormValues = {
  city: string;
  country: string;
};

const DEFAULT_VALUES: WeatherFormValues = {
  city: "",
  country: "",
};

const WeatherSearchForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<WeatherFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const [weather, setWeather] = useState<OpenWeatherResponse | null>(null);

  const {
    items: history,
    addItem,
    removeItem,
    clearHistory,
  } = useWeatherSearchHistory();

  const performSearch = async (city: string, country: string) => {
    try {
      // Reset previous errors and search weather
      clearErrors("root");
      setWeather(null);

      const trimmedCity = city.trim();
      const trimmedCountry = country.trim();

      const data = await fetchCurrentWeather(trimmedCity, trimmedCountry);
      setWeather(data);

      // Add to history on successful search
      addItem(trimmedCity, trimmedCountry);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching weather data.";

      setError("root", {
        type: "server",
        message,
      });
    }
  };

  const onSubmit = async (values: WeatherFormValues) => {
    await performSearch(values.city, values.country);
  };

  const handleClearForm = () => {
    reset(DEFAULT_VALUES);
    clearErrors();
    setWeather(null);
  };

  const handleHistorySearch = (item: WeatherSearchHistoryItem) => {
    // populate form with selected history item
    reset({
      city: item.city,
      country: item.country,
    });

    performSearch(item.city, item.country);
  };

  return (
    <div className="w-full max-w-md space-y-6 bg-white/80 dark:bg-slate-900/80 p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-2">
        Today&apos;s Weather
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* City Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="city" className="font-medium text-sm">
            City
          </label>
          <input
            id="city"
            type="text"
            className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Singapore"
            {...register("city", {
              required: "City is required.",
            })}
          />
          {errors.city && (
            <p className="text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>

        {/* Country Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="country" className="font-medium text-sm">
            Country
          </label>
          <input
            id="country"
            type="text"
            className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. SG, MY, US"
            {...register("country", {
              required: "Country is required.",
            })}
          />
          {errors.country && (
            <p className="text-xs text-red-500">{errors.country.message}</p>
          )}
        </div>

        {/* API / root-level errors */}
        {errors.root && errors.root.type === "server" && (
          <p className="text-sm text-red-600">{errors.root.message}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleClearForm}
            className="px-4 py-2 rounded-md border text-sm"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm disabled:opacity-60"
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>

      {/* Weather Result */}
      {weather && (
        <div className="mt-4 text-sm space-y-1">
          <p className="font-semibold">
            {weather.name}, {weather.sys.country}
          </p>

          <p>Temperature: {weather.main.temp} °C</p>
          <p>Feels Like: {weather.main.feels_like} °C</p>
          <p>
            High:{" "}
            <span className="font-medium">{weather.main.temp_max} °C</span>
          </p>
          <p>
            Low: <span className="font-medium">{weather.main.temp_min} °C</span>
          </p>
          <p>Humidity: {weather.main.humidity}%</p>

          {weather.weather?.[0] && (
            <p>Description: {weather.weather[0].description}</p>
          )}
        </div>
      )}

      {/* Search History */}
      {history.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold">Search History</h2>
            {history.length > 1 && (
              <button
                type="button"
                onClick={clearHistory}
                className="text-[11px] underline text-slate-500 hover:text-slate-700"
              >
                Clear all
              </button>
            )}
          </div>

          <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {history.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 border rounded-md px-2 py-1 text-xs"
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {item.city}, {item.country}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleHistorySearch(item)}
                    className="px-2 py-1 rounded-md border text-[11px]"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="px-2 py-1 rounded-md border border-red-400 text-[11px] text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherSearchForm;
