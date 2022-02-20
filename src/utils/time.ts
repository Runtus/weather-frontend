export const current = (exact?: 'day' | 'min') => {
    const exact_time = exact || 'day';
    const time = new Date();
    let result = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;

    if (exact_time === 'min') {
        result += ` ${time.getHours()}:${time.getMinutes()}`;
    }
    return result;
};
