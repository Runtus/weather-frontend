import { PreWeather30, PreWeather30Item } from '@/axios/weatherPre';
import { CurrentWeather } from '@/axios/weatherCurrent';
import { HistoricalTemp, HistoricalWeather } from '@/axios/weatherHistory';

type OptionSeriesItem = {
    name: string;
    type: 'line';
    data: Array<number>;
};

export const preWeatherYData = (type: 'temp' | 'sd' | 'rain', data: PreWeather30) => {
    const yData: number[] = [];
    if (type === 'temp') {
        data.forEach(item => {
            yData.push((Number(item.maxTmp) + Number(item.minTmp)) / 2);
        });
        return yData;
    }

    if (type === 'sd') {
        data.forEach(item => {
            yData.push(Number(item.hum));
        });
        return yData;
    }

    if (type === 'rain') {
        data.forEach(item => {
            yData.push(Number(item.pcpn));
        });
        return yData;
    }

    return [];
};
