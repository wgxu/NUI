/**
 * auther: xuwg
 * createTime: 2017/4/17 0017
 * describe: [工具种子文件]
 */
var utilHB = {};  //申明工具命名空间
utilHB.noop = function (){}; //懒函数

window.utilHB = utilHB;

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

/**
 * auther: xuwg
 * createTime: 2017/4/18 0018
 * describe: [关于date的方法扩展]
 */

/**
 * @type {js操作date内置对象方法}
 */
utilHB.date = {
    //获取整年,isNow判断是否获当前取时间
    _year: function(isNow,now){
        return isNow ? new Date().getFullYear() : new Date(now).getFullYear();
    },
    //获取月份,isNow同上
    _month: function (isNow,now) {
        return isNow ?　new Date().getMonth() + 1 >= 10 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1) : new Date(now).getMonth() + 1 >= 10 ? new Date(now).getMonth() + 1 : '0' + (new Date(now).getMonth() + 1)
    },
    //获取日，isNow同上
    _day: function (isNow,now) {
        return isNow ?　new Date(now).getDate() >= 10　? new Date().getDate() :　'0' + new Date().getDate() : new Date().getDate() >= 10　? new Date(now).getDate() :　'0' + new Date(now).getDate();
    },
    //获取时，isNow同上
    _hour: function (isNow,now) {
        return isNow ?　new Date().getHours() >=10 ?  new Date().getHours() : '0' +  new Date().getHours() : new Date(now).getHours() >=10 ?  new Date(now).getHours() : '0' +  new Date(now).getHours();
    },
    //获取分, isNow同上
    _minute: function (isNow,now) {
        return isNow ?　new Date().getMinutes() >= 10 ? new Date().getMinutes() : '0' + new Date().getMinutes() : new Date(now).getMinutes() >= 10 ? new Date(now).getMinutes() : '0' + new Date(now).getMinutes();
    },
    /**
     * 格式化时间
     * @param now
     * @param separator
     * @param isNow
     * @param type
     * @private
     */
    _format: function(now,separator,isNow,type){
        var now = now || '',
            separator = separator || '-',
            isNow = isNow == void(0) ? false : isNow,
            retVal = [],
            retArr = [];
        switch (type) {
            case 'date':
                return retVal.push(this._year(isNow,now),this._month(isNow,now),this._day(isNow,now)).join(separator);
                break;
            case 'time':
                return retVal.push(this._year(isNow,now),this._month(isNow,now),this._day(isNow,now)).join(separator) + " " + retArr.push(this._hour(isNow,now),this._minute(isNow,now)).join(":");
                break;
        }

    },
    /**
     * 获取时间戳
     * @returns {number}
     */
    getTimeStamp: function () {
        return new Date().getTime();
    },
    /**
     * @param now: 时间戳
     * @param separator：分隔符，默认是'-'
     * @param isNow: 同上
     * @returns {*|string}
     */
    getDate: function (now,separator,isNow) {
        return this._format(now,separator,isNow,'date');
    },
    /**
     *
     * @param now: 时间戳
     * @param separator：分隔符，默认是'-'
     * @param isNow: 同上
     */
    getDateTime: function (now,separator,isNow) {
        return this._format(now,separator,isNow,'time');
    },
    /**
     * 评论时间，有刚刚，几分钟前等
     * @param num
     */
    commentTime: function (num) {
        var now   = new Date().getTime(),
            distanceTime = (now - num)/1000,
            date = new Date(num),
            year = date.getFullYear(),
            month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
            day = date.getDate() >= 10　? date.getDate() :　'0' + date.getDate(),
            hour = date.getHours() >=10 ? date.getHours() : '0' +  date.getHours(),
            minute = date.getMinutes() >=10 ?  date.getMinutes() : '0' +  date.getMinutes(),
            second =date.getSeconds() >= 10 ? date.getSeconds() :  '0' + date.getSeconds();
        if(distanceTime < 60) { //小于1分钟
            return '刚刚';
        }else if(distanceTime < 60*60) {//小于1个小时
            return  Math.floor(distanceTime/60) +　'分钟前';
        }else if(distanceTime < 60*60*24) {
            return '今天';
        }else  if(distanceTime < 60*60*24*2) {
            return  '昨天';
        }else if(distanceTime < 60*60*24*365) {
            return month + '月' + day + '日 '+ hour + ':' + minute;
        }else {
            return year + ':' + month + ':' + day + ' ' + hour + ':' + minute;
        }
    }
};
