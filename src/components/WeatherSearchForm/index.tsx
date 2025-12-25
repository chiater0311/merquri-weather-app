import { useState } from "react";
import { useForm, type FieldError } from "react-hook-form";

import SearchBar from "./SearchBar";
import WeatherResult from "./WeatherResult";
import HistoryList from "./HistoryList";

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
      clearErrors("root");
      setWeather(null);

      const trimmedCity = city.trim();
      const trimmedCountry = country.trim();

      const data = await fetchCurrentWeather(trimmedCity, trimmedCountry);
      setWeather(data);

      addItem(trimmedCity, trimmedCountry, data.dt, data.timezone);
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
    reset({
      city: item.city,
      country: item.country,
    });

    performSearch(item.city, item.country);
  };

  return (
    <div className="flex flex-col gap-24 w-full lg:w-3xl">
      <SearchBar
        onSubmit={handleSubmit(onSubmit)}
        onClear={handleClearForm}
        register={register}
        errors={{
          city: errors.city,
          country: errors.country,
          root: errors.root as FieldError | undefined,
        }}
        isSubmitting={isSubmitting}
      />
      <div className="w-full space-y-5 bg-white/20 dark:bg-[#1A1A1A4D]/70 p-6 rounded-xl shadow-md">
        <WeatherResult weather={weather} />

        <HistoryList
          history={history}
          onSearch={handleHistorySearch}
          onDelete={removeItem}
          onClearAll={clearHistory}
        />
      </div>
    </div>
  );
};

export default WeatherSearchForm;
