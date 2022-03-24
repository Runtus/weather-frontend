export const tempColorSetting = (temp: number | string) => {
    const format = typeof temp === 'string' ? Number(temp) : temp;
    if (format < -40) {
        return '#5E3794';
    } else if (format < -30) {
        return '#332B81';
    } else if (format < -20) {
        return '#2B4293';
    } else if (format < -10) {
        return '#255EA4';
    } else if (format < 0) {
        return '#3C81B5';
    } else if (format < 10) {
        return '#3B975D';
    } else if (format < 20) {
        return '#C3B237';
    } else if (format < 30) {
        return '#E07C26';
    } else if (format < 40) {
        return '#D25E1F';
    } else {
        return '#B84617';
    }
};

export const sdColorSetting = (sd: number | string) => {
    const format = typeof sd === 'string' ? Number(sd) : sd;
    if (format < 20) {
        return '#A49A1B';
    } else if (format < 30) {
        return '#7FA537';
    } else if (format < 40) {
        return '#43C793';
    } else if (format < 50) {
        return '#30C071';
    } else if (format < 60) {
        return '#6794DA';
    } else if (format < 70) {
        return '#5D80D0';
    } else if (format < 80) {
        return '#5D71CD';
    } else if (format < 90) {
        return '#605AB4';
    } else {
        return '#533F75';
    }
};

export const colorSetting = {
    sd: (sd: number | string) => {
        const format = typeof sd === 'string' ? Number(sd) : sd;
        if (format < 20) {
            return '#A49A1B';
        } else if (format < 30) {
            return '#7FA537';
        } else if (format < 40) {
            return '#43C793';
        } else if (format < 50) {
            return '#30C071';
        } else if (format < 60) {
            return '#6794DA';
        } else if (format < 70) {
            return '#5D80D0';
        } else if (format < 80) {
            return '#5D71CD';
        } else if (format < 90) {
            return '#605AB4';
        } else {
            return '#533F75';
        }
    },
    temp: (temp: number | string) => {
        const format = typeof temp === 'string' ? Number(temp) : temp;
        if (format < -40) {
            return '#5E3794';
        } else if (format < -30) {
            return '#332B81';
        } else if (format < -20) {
            return '#2B4293';
        } else if (format < -10) {
            return '#255EA4';
        } else if (format < 0) {
            return '#3C81B5';
        } else if (format < 10) {
            return '#3B975D';
        } else if (format < 20) {
            return '#C3B237';
        } else if (format < 30) {
            return '#E07C26';
        } else if (format < 40) {
            return '#D25E1F';
        } else {
            return '#B84617';
        }
    },
    aqi: (aqi: number | string) => {
        const format = typeof aqi === 'string' ? Number(aqi) : aqi;
    }
};
