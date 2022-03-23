const type_range_map: {
    [key: string]: {
        type: string;
        name: string;
        min: number;
        max: number;
        interval?: number;
        axisLabel?: {
            formatter: string;
        };
    };
} = {
    temp: {
        type: 'value',
        name: '温度',
        min: -20,
        max: 50,
        interval: 10,
        axisLabel: {
            formatter: '{value} °C',
        },
    },
    sd: {
        type: 'value',
        name: '湿度',
        min: 0,
        interval: 10,
        max: 100,
        axisLabel: {
            formatter: '{value} %',
        },
    },
    rain: {
        type: 'value',
        name: '降水量',
        min: 0,
        max: 6000,
        interval: 2000,
        axisLabel: {
            formatter: '+{value} mm',
        },
    },
    aqi: {
        type: 'value',
        name: '空气质量',
        interval: 30,
        min: 0,
        max: 300,
        axisLabel: {
            formatter: '{value}'
        }
    },
};

export const rangeSettingOption = (type: string) => {
    // TODO 关于键值对的最佳实践
    for (const [key, value] of Object.entries(type_range_map)) {
        if (type === key) {
            return value;
        }
    }

    return type_range_map['temp'];
};
