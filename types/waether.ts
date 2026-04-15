export type Geo = { lat: number; lon: number };

export type OpenMeteoResponse = {
  current?: {
    time: string;
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  current_units?: {
    temperature_2m?: string;
    wind_speed_10m?: string;
  };
};