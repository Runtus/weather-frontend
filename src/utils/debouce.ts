export const debounce: (fn: () => any, time: number) => () => unknown = (fn, time) => {
    let timeout = 0;
    return () => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            fn();
            timeout = 0;
        }, time);
    };
};
