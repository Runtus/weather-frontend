// 后续在此处设置请求所需求的一些配置
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

export type ResponseType<T> = {
    code: '0' | '1';
    data: T | null;
    info: string;
};

export default axios;
