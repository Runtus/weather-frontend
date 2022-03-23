import { PreWeather30 } from '@/axios/weatherPre';
import { CurrentWeather } from '@/axios/weatherCurrent';
import { HistoricalWeather } from '@/axios/weatherHistory';

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

const CURRENT_WEATHER_MAP = {
    temp: 'temp',
    sd: 'SD',
    rain: 'rain',
    aqi: 'aqi'
}

export const currentWeatherYData = (type: 'temp' | 'sd' | 'rain' | 'aqi', data: CurrentWeather) => {
    const yData: number[] = [];
    const key = CURRENT_WEATHER_MAP[type];
    data.observer24.forEach(item => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        yData.push(item[key]);
    });
    return yData;
}

export const historicalWeather = (type: 'temp' | 'sd' | 'rain' | 'aqi', data: HistoricalWeather) => {
    let yData: number[] = [];
    if (type === 'temp') {
        yData = [...data.temp.avgTmp];
    } else if (type === 'aqi') {
        data.aqi.forEach(item => {
            yData.push(Number(item.value))
        })
    } else if (type === 'rain') {
        yData = [...data.rain.pcpn]
    } else if (type === 'sd') {
        yData = [...data.sd.value]
    }

    return yData;
}

export const historicalXAxias = (type: 'temp' | 'sd' | 'rain' | 'aqi', data: HistoricalWeather) => {
    let x: Array<string> = []
    if (type === 'aqi') {
        data.aqi.forEach(item => {
            x.unshift(item.date);
        })
    } else {
        // rain temp sd 的 x轴是相同的，所以直接用rain的legend去替代
        x = [...data.rain.legend]
    }
    return x;
}