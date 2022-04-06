// 动态引入bmap，否则会因为echarts的undefined导致地图渲染失败

const BMap_URL = 'https://cdn.jsdelivr.net/npm/echarts@5/dist/extension/bmap.js';
export default {
    init: () => {
        const scriptNode = document.createElement('script');
        scriptNode.setAttribute('type', 'text/javascript');
        scriptNode.setAttribute('src', BMap_URL);
        document.body.appendChild(scriptNode);
    },
};
