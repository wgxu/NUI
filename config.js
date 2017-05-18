/**
 * auther: xuwg
 * createTime: 2017/4/17 0017
 * describe: [打包配置文件]
 */

var sourceUrl = './src/' //研发目录
    targetUrl = './build/'; // build目录


var url = {
    //util打包js
    utilArr: [
        sourceUrl + 'util/src/core.js',
        sourceUrl + 'util/src/loading.js',
        sourceUrl + 'util/src/ajax.js',
        sourceUrl + 'util/src/date.js',
    ],
    //打包sass文件到style.css
    sassArr: [
        sourceUrl + 'scss/comm.scss', //页面通用样式
        sourceUrl + 'scss/fight.scss', //合成作战
        sourceUrl + 'scss/search.scss', //合成作战
        sourceUrl + 'scss/fightfeedback.scss', //合成作战反馈
        sourceUrl + 'scss/orderdetails.scss', //指令详情页
        sourceUrl + 'scss/search.scss' ,//高级搜索
        sourceUrl + 'scss/feedback.scss',  //配侦反馈
        sourceUrl + 'scss/trial.scss' ,//研判组长初审
        sourceUrl + 'scss/approval.scss' //研判组长初审
    ],
    //公用css文件打包
    commCssArr: [
        sourceUrl + 'scss/comm/global.scss',
        sourceUrl + 'scss/comm/layout.scss',
        sourceUrl + 'scss/comm/color.scss',
        sourceUrl + 'scss/comm/interval.scss',
        sourceUrl + 'scss/comm/input.scss',
        sourceUrl + 'scss/comm/button.scss',
        sourceUrl + 'scss/comm/table.scss',
        sourceUrl + 'scss/comm/dialog.scss'
    ]
};

module.exports = {
    url: url,
    sourceUrl: sourceUrl,
    targetUrl: targetUrl
};

