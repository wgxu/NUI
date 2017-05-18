/**
 * auther: xuwg
 * createTime: 2017/4/17 0017
 * describe: [ajax帮助文件]
 */

/**
 * @param url：    ajax路径
 * @param data： 请求参数
 * @param okFun： 成功回调
 * @param type：  请求类型，默认‘post’
 * @param loadingFlag： 是否启用loading，默认启用,true false
 * @param async： 请求方式，默认false，异步
 * @param errFn：请求失败回调
 */
utilHB.ajax = function (url, okFun,data, type, loadingFlag, async, errFn) {
    var _t = this,
        type = type || 'POST',
        data = data || {},
        loadingFlag = typeof loadingFlag == void(0) ? true : loadingFlag,
        async = typeof async == void(0) ? true : async,
        errFn = errFn || utilHB.noop;
    try {
        jQuery
    } catch (e) {
        throw  new Error('ajax方法依赖库jQuery未引入');
    }
    data['authToken'] = 'dd8f7d066f0fe354e0e9a5bcc988130a';
    $.ajax({
        type: type,
        url: url,
        dataType: 'json',
        xhrFields: {withCredentials: true},
        async: async,
        data: data,
        success: function (res) {
            if(res.successful) {
                okFun && okFun(res.data);
            }
        },
        error: function (e) {
            errFn && errFn(e);
        }
    })
}
