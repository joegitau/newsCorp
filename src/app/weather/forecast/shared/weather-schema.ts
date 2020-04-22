export interface WeatherRes {
  list: {
    dt_txt: string;
    main: {
      temp: string;
    }
  }[];
}

export interface Forecast {
  dateStr: string;
  temp: string;
}
