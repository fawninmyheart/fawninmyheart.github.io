// Author: Shen Hua
// date: 2024-08-16

var cdnUrls = [
    'https://jsd.cdn.zzko.cn/gh/fawninmyheart/blog_img',
    'https://jsd.onmicrosoft.cn/gh/fawninmyheart/blog_img'
]

function cdnBackup(e) {
    var image = e.target;

    // 这里可以添加更多的备用图片路径
    if (image.src.includes(cdnUrls[0])) {
        image.src = image.getAttribute('src').replace(cdnUrls[0], cdnUrls[1]);
    } else if (image.src.includes(cdnUrls[1])) {
        image.onerror = null; // 控制不要一直跳动
    }
}

var imgs = document.querySelectorAll("#img");
imgs.forEach(function(img) {
    // 对每个元素执行操作
    img.src = cdnUrls[0]+img.getAttribute('src');
    img.onerror = cdnBackup;
});
