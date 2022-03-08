// export const throttling
export const throttling = (func: (...doc: any) => any, time?: number) => {
    let now = new Date().getTime();
    return () => {
        const temp_time = new Date().getTime();
        if (temp_time - now > (time || 500)) {
            func();
            // 更新时间
            now = temp_time;
        }
    };
};
