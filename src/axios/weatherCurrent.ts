import axios, { ResponseType } from './index';
import { AxiosPromise } from 'axios';

type CurrentWeather = {
    current: {
        name: string;
        lat: string;
        lon: string;
        temp: string;
        pm25: string;
        sd: string; // 湿度
        err?: string;
    };
    observer24: Array<{
        hour: string;
        temp: string;
        wind_d: string;
        wind_l: string;
        rain: string;
        SD: string;
        aqi: string;
    }>;
};

export const requestCurrentWeather: (location: string) => AxiosPromise<ResponseType<CurrentWeather>> = location =>
    axios({
        url: '/current',
        params: {
            location,
        },
    });
