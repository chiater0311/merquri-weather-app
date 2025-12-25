export interface OpenWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  name: string;
  dt: number;
  timezone: number;

  sys: {
    country: string;
    sunrise?: number;
    sunset?: number;
  };

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };

  weather: {
    main: string;
    description: string;
    icon: string;
  }[];

  wind: {
    speed: number;
    deg: number;
  };
}

export interface WeatherSearchHistoryItem {
  id: string;
  city: string;
  country: string;

  createdAt: string;

  dt?: number;
  timezone?: number;
}
