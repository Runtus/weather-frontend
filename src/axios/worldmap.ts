import axios, { ResponseType } from './index';

export type renderTempItem = {
    lat: string;
    lon: string;
    temp: string;
    name: string;
    aqi: string;
    sd: string;
};

export const fetchWorldMapTemps: () => Promise<ResponseType<Array<renderTempItem>>> = () =>
    axios({
        url: '/map/temps',
    }).then(res => res.data);
