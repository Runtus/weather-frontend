import axios, { ResponseType } from './index';

export type CurrentWeather = {
    current: {
        obsTime: string; // 数据观测时间
        temp: string; // 温度 -> 摄氏度
        feelsLike: string; // 体感温度 -> 摄氏度
        icon: string;
        text: string; // 天气状况文字描述
        wind360: string; // 风向360角度
        windDir: string; // 风向
        windScale: string; // 风向等级
        windSpeed: string; // 风速
        humidity: string; // 相对湿度
        precip: string; // 小时累计降水量 -> 毫米
        pressure: string; //  大气压强 -> 百帕
        vis: string; // 能见度 -> km
        cloud: string; // 云量 -> 百分比
        dew: string; // 露点温度
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
    air: {
        pubTime: string; // 发布时间
        aqi: string; // 空气质量指数
        level: string; // 空气质量指数等级s
        primary: string; // 空气主要污染物
        pm10: string;
        pm2p5: string;
        no2: string;
        so2: string;
        co: string;
        o3: string;
    };
};

export const requestCurrentWeather: (location: string) => Promise<ResponseType<CurrentWeather>> = location =>
    axios({
        url: '/current',
        params: {
            location,
        },
    }).then(res => res.data);
