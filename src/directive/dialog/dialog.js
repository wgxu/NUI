;(function () {
    'use strict';
    /**
     * @author: xuwg
     * 用法:
     * 基于angualr编写的弹出框自定义指令
     * 使用方法:
     *<dialog dialog-data="data"></dialog>
     * 初始化contrller时，初始化data时，通过判断isShow来打开或者关闭弹出框
     * $scope.data = {
     *      isShow: false,
     *      template: {
     *          url: '',
     *          renderData: function(event){
     *              //填充数据
     *          }
     *      },
     *      button: {
     *          key: 'name' // 自定义key值，
     *          list: [{
     *              name: '测试',
     *              value: true
     *          }],
     *          callback: function(index,item){} //点击回调后触发
     *      }
     * }
     * */
    angular.module('hb.dialog',['hb.webRoot']).directive('dialog',function (webRoot) {
        return {
            restrict: 'AE',
            scope: {
                dialogData: '=dialogData'
            },
            replace: true,
            templateUrl: webRoot + '/directive/dialog/template.html',
            link: function(scope,element,attrs){
                var buttons = {
                    //设置默认按钮
                    key: 'name',
                    list: [],
                    callback:function(){}
                };
                scope.events = {};
                scope.init = function() {
                    if(!scope.dialogData)return;
                    if(scope.dialogData.template) {//通过event给
                        scope.dialogData.template.renderData && scope.dialogData.template.renderData(scope.events);
                    }

                    if(!scope.dialogData.buttons) {//是否采用默认按钮
                        scope.dialogData.buttons = buttons;
                    }
                    scope.key = scope.dialogData.buttons.key;
                    scope.clickBtn = function(index,item) {
                        scope.dialogData.buttons.callback(index,item);
                    }
                }
                scope.close = function() {
                    scope.dialogData.isShow = false;
                }
                if(scope.dialogData) {
                    scope.init();
                }
                scope.$watch('dialogData',function(){
                    scope.init();
                });
            }
        };
    });



})();