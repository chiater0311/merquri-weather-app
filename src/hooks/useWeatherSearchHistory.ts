import { useEffect, useState } from "react";
import type { WeatherSearchHistoryItem } from "../types/weather";

const STORAGE_KEY = "weather_search_history";

const loadInitialHistory: () => WeatherSearchHistoryItem[] = () => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WeatherSearchHistoryItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

export const useWeatherSearchHistory = () => {
  const [items, setItems] = useState<WeatherSearchHistoryItem[]>(() =>
    loadInitialHistory()
  );

  // Persist to localStorage on change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      console.warn("Failed to save weather search history to localStorage");
    }
  }, [items]);

  const addItem = (
    city: string,
    country: string,
    dt?: number,
    timezone?: number
  ) => {
    const trimmedCity = city.trim();
    const trimmedCountry = country.trim();

    if (!trimmedCity || !trimmedCountry) return;

    setItems((prev) => {
      // to avoid duplicates with same city+country
      const withoutDuplicate = prev.filter(
        (item) =>
          item.city.toLowerCase() !== trimmedCity.toLowerCase() ||
          item.country.toLowerCase() !== trimmedCountry.toLowerCase()
      );

      const newItem: WeatherSearchHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        city: trimmedCity,
        country: trimmedCountry,
        createdAt: new Date().toISOString(),
        dt,
        timezone,
      };

      return [newItem, ...withoutDuplicate];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setItems([]);
  };

  return {
    items,
    addItem,
    removeItem,
    clearHistory,
  };
};
