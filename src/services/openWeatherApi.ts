import axios from "axios";
import type { OpenWeatherResponse } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
const BASE_URL =
  (import.meta.env.VITE_OPENWEATHER_BASE_URL as string) ??
  "https://api.openweathermap.org";

export const fetchCurrentWeather = async (
  city: string,
  country: string
): Promise<OpenWeatherResponse> => {
  if (!API_KEY) throw new Error("Missing OpenWeather API Key");

  try {
    // To get Weather Data using Lat/Lon retrieved above
    const weatherRes = await axios.get<OpenWeatherResponse>(
      `${BASE_URL}/data/2.5/weather`,
      {
        params: {
          q: `${city},${country}`,
          appid: API_KEY,
          units: "metric",
          exclude: "minutely",
        },
      }
    );

    return weatherRes.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Unable to fetch weather data. Please try again.";
    throw new Error(message);
  }
};
