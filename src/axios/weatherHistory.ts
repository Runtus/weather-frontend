import axios, { ResponseType } from './index';

export type HistoricalTemp = {
    year: string;
    month: string;
    legend: Array<string>; // 日期数组
    maxTmp: Array<number>; // 最高温度数组
    minTmp: Array<number>; // 最低温度数组
    avgTmp: Array<string>; // 平均温度
};

export type HistoricalWeather = {
    temp: {
        legend: Array<string>,
        minTmp: Array<number>,
        maxTmp: Array<number>,
        avgTmp: Array<number>
    },
    rain: {
        legend: Array<string>,
        rain_days: Array<number>,
        pcpn: Array<number> // 降水量
    },
    sd: {
        legend: Array<string>,
        value: Array<number>
    },
    aqi: Array<{
        date: string,
        value: Array<number>
    }>
}



export const fetchHistorical: (location: string, year?: string, month?: string) => Promise<ResponseType<HistoricalTemp>> = (location, year, month) =>
    axios({
        url: '/historical/temp',
        params: {
            location,
            year,
            month,
        },
    }).then(res => res.data);

export const fetchHistoricalTotalWeather: (location: string) => Promise<ResponseType<HistoricalWeather>> = (location) =>
    axios({
        url: `/historical/total`,
        params: {
            location
        }
    }).then(res => res.data);
