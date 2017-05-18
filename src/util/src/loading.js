/**
 * auther: xuwg
 * createTime: 2017/4/18 0018
 * describe: [加载组件，用于数据请求，弹框等背景遮罩]
 */


/**
 * @type {{show: utilHB.loading.show, hide: utilHB.loading.hide}}
 * show: title 遮罩层名称
 *       mask  true，启动遮罩，false关闭遮罩，默认false
 * hide: 关闭遮罩层
 * describe: 遮罩层需要
 */
utilHB.loading = {
    show: function (title,mask) {},
    hide: function () {}
}