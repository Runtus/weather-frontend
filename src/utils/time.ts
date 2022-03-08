export const current = (exact?: 'day' | 'min') => {
    const exact_time = exact || 'day';
    const time = new Date();
    let result = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;

    if (exact_time === 'min') {
        result += ` ${time.getHours()}:${time.getMinutes()}`;
    }
    return result;
};

export const formatTime = (date?: Date, format?: 'xx-xx' | 'xx-xx-xx') => {
    const time = date || new Date();
    const formatStyle = format || 'xx-xx';
    const year = time.getFullYear() % 100;
    const month = `${time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)}`;
    const day = `${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}`;
    let result: string;
    switch (formatStyle) {
        case 'xx-xx':
            result = `${month}-${day}`;
            break;
        case 'xx-xx-xx':
            result = `${year}-${month}-${day}`;
            break;
    }
    return result;
};
