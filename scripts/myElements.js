// Author: Shen Hua
// date: 2024-08-16

// 自定义构造函数，显示一个附带超链接的图片。其中默认显示小图，点击后显示原图。原图路径相比于小图路径缺少一个“_small”后缀。同时提供自动挑选可以使用的cdn服务器
class ImgATag extends HTMLElement {
    constructor() {
        super();
        // cdn服务器列表
        var cdnUrls = [
            'https://jsd.cdn.zzko.cn/gh/fawninmyheart/blog_img',
            // 'https://jsd.onmicrosoft.cn/gh/fawninmyheart/blog_img',
            'https://jsd.onmicrosoft.cn/gh/fawninmyheart/blog_img'
        ]
        // 创建img和anchor元素
        const a = document.createElement('a');
        const img = document.createElement('img');
        // 设置img元素属性
        img.src = cdnUrls[0] + this.getAttribute('src');
        img.title = this.getAttribute('title') || "图片";
        img.alt = this.getAttribute('alt') || "图片加载失败";
        // img.style = this.getAttribute('style') || "zoom:100%;";
        img.onload = () => {
            if (img.naturalWidth >= img.naturalHeight) {
                img.width = 800;
            } else if (img.naturalWidth < img.naturalHeight) {
                img.width = 500;
            }
        }
        // img.onerror = cdnBackup;
        img.onerror = () => {
            // 这里可以添加更多的备用图片路径
            if (img.src.includes(cdnUrls[0])) {
                img.src = img.getAttribute('src').replace(cdnUrls[0], cdnUrls[1]);
                a.href = img.src.replace("_small","");
            } else if (img.src.includes(cdnUrls[1])) {
                img.onerror = null; // 控制不要一直跳动 
            }
        }
        // 设置anchor元素属性
        a.href = img.src.replace("_small","");
        a.target = this.getAttribute('target') || '_blank';

        a.appendChild(img);
        // 将自定义元素内容设置为<a>元素
        this.appendChild(a);
    }
}
// 定义元素的 'a-img-cdn' 标签名称
customElements.define('a-img-cdn', ImgATag);