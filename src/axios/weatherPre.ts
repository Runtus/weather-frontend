import axios, { ResponseType } from './index';

export type PreWeather30Item = {
    date: string;
    day: string;
    code: string;
    text: string;
    maxTmp: string;
    minTmp: string;
    windDir: string;
    windSc: string;
    windSpeed: string;
    hum: string; // 相对湿度
    uv: string; // 紫外线
    pcpn: string; // 降水量
    sunRise: string;
    sunSet: string;
};

export type PreWeather30 = Array<PreWeather30Item>;

export const fetchPreWeather: (location: string) => Promise<ResponseType<PreWeather30>> = location =>
    axios({
        url: '/pre',
        params: {
            location,
        },
    }).then(res => res.data);
