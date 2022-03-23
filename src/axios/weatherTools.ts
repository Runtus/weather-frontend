import axios, { ResponseType } from './index';

type CitySearchItem = {
    name: string;
    province: string;
    location_id: string;
    pinyin: string;
};

export const fetchSearchCitys: (keywords: string) => Promise<ResponseType<Array<CitySearchItem>>> = (keywords: string) =>
    axios({
        url: '/tools/search',
        params: {
            keywords,
        },
    }).then(res => {
        return res.data;
    });
