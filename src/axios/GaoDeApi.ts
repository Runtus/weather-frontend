import axios from 'axios';
import Axios from './index';
// import {  } from 'axios'

const KEY = '32b1a7f5d70316d66e15d117ff3576f1';

type CityInfo = {
    regeocode: {
        addressComponent: {
            city: string;
            district: string;
            province: string;
            adcode: string;
            country: string;
        };
        formatted_address: string;
    };
};

export const getCityInfoByLocation: (location: string) => Promise<CityInfo | null> = async location =>
    Axios({
        url: 'https://restapi.amap.com/v3/geocode/regeo',
        method: 'get',
        params: {
            location,
            key: KEY,
        },
    })
        .then(res => res.data)
        .catch(() => {
            console.error('高德地图逆地址转换失败');
        });

type WeatherResp = {
    count: string;
    info: string;
    infocode: string;
    lives: Array<{
        adcode: string;
        city: string;
        reporttime: string;
        temperature: string;
        weather: string;
        winddirection: string;
        windpower: string;
    }>;
};
export const getWeatherByGaode: (adCode: string) => Promise<WeatherResp | null> = async adCode =>
    axios({
        url: 'https://restapi.amap.com/v3/weather/weatherInfo',
        params: {
            key: KEY,
            city: adCode,
        },
    })
        .then(res => {
            if (res.data.infocode === '10000') {
                return res.data;
            } else {
                throw new Error('Error: Request faild.');
            }
        })
        .catch(() => {
            console.error('请求当地天气失败');
        });
