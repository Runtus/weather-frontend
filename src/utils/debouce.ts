export const debounce: (fn: (...args: any) => any, time: number) => () => unknown = (fn, time) => {
    let timeout = 0;
    return (...args: any) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            fn(...args);
            timeout = 0;
        }, time);
    };
};
