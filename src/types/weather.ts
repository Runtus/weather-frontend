export type NowWeather = {
    wind: string;
    sd: string; // 相对湿度
    temp: number;
    water: number; // 降水量
    weather: '晴' | '阴' | '雨'; // 后续有增加在这里增加
    comment: string; // 当地天气评价
};

export type WeatherKeys = 'wind' | 'sd' | 'temp' | 'water' | 'weather' | 'comment';
