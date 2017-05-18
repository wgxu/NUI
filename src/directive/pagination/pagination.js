
(function(){
    'use strict';
    /**
     * Created by Administrator on 2017/4/26 0026.
     * 用法:
     * 翻页指令
     * 基于angularjs框架进行开发自定义指令
     * 使用方法:
     * <paination flip-page="flip(currentPage)" conf="paginationConf"></paination>
     * 初始化时，传入事件名称，主要用于点击分页后的回调接口，传入当前点击页
     * 传入配置参数，{currentPage:${page},totalItems:${total}
 * 结合controller时,传入conf配置即可
 *  angular.module('myApp',[]).controller('demo',['$scope',function($scope){
 *      $scope.paginationConf = {
            currentPage: 5,
            totalItems: 80
	   };
	   $scope.flip = function(current){
	        //todo
	   }
 *  }])
 */
    angular
        .module('hb.paination',['hb.webRoot'])
        .directive('paination',function (webRoot) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    conf: '=',
                    flipPage: '&'
                },
                templateUrl: webRoot +　'/directive/pagination/template.html',
                link: function(scope,element,attrs){
                    function getPagination() {
                        scope.conf.pagesLength = 9; //定义最多出现9个跳转标签
                        scope.conf.itemsPerPage = 10; //每页显示多少条

                        scope.conf.currentPage = parseInt(scope.conf.currentPage) ? parseInt(scope.conf.currentPage) : 1;
                        scope.conf.totalItems = parseInt(scope.conf.totalItems);
                        scope.conf.numberOfPages = Math.ceil(scope.conf.totalItems/scope.conf.itemsPerPage);
                        scope.pageList = [];

                        scope.conf.currentPage = scope.conf.currentPage > scope.conf.numberOfPages ? scope.conf.numberOfPages : scope.conf.currentPage;
                        if(!scope.conf.numberOfPages) {
                            scope.pageList.push(1);
                            return;
                        }
                        //标签长度可以完全显示
                        if(scope.conf.numberOfPages <= scope.conf.pagesLength) {
                            for(var i =0; i< scope.conf.numberOfPages;i++) {
                                scope.pageList.push(i+1);
                            }
                        }else {
                            //总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                            //计算中心偏移量
                            debugger
                            var offset = (scope.conf.pagesLength -1) /2;
                            if(scope.conf.currentPage < offset) {
                                //左边没有...
                                for(var i = 1; i < offset + 1; i++) {
                                    scope.pageList.push(i);
                                }
                                scope.pageList.push('...');
                                scope.pageList.push(scope.conf.numberOfPages);
                            }else if(scope.conf.currentPage > scope.conf.numberOfPages - offset){
                                scope.pageList.push(1);
                                scope.pageList.push('...');
                                for(var i = offset + 1; i >=1; i--) {
                                    scope.pageList.push(scope.conf.numberOfPages - i);
                                }
                                scope.pageList.push(scope.conf.numberOfPages);
                            }else {
                                scope.pageList.push(1);
                                scope.pageList.push('...');
                                for(i = Math.ceil(offset/2) ; i >= 1; i--){
                                    scope.pageList.push(scope.conf.currentPage - i);
                                }
                                scope.pageList.push(scope.conf.currentPage);

                                for(i = 1; i <= offset/2; i++){
                                    scope.pageList.push(scope.conf.currentPage + i);
                                }

                                scope.pageList.push('...');
                                scope.pageList.push(scope.conf.numberOfPages);
                            }
                        }
                    }
                    //下一页
                    scope.nextPage = function(){
                        if(scope.conf.currentPage >= scope.conf.numberOfPages)return;
                        scope.conf.currentPage++;
                        scope.flipPage({currentPage: scope.conf.currentPage});
                    }
                    //上一页
                    scope.prevPage = function(){
                        if(scope.conf.currentPage <= 1)return;
                        scope.conf.currentPage--;
                        scope.flipPage({currentPage: scope.conf.currentPage});
                    }

                    //跳转
                    scope.jump = function(num){
                        if(num == 999)return
                        if(num == scope.conf.currentPage)return;
                        scope.conf.currentPage = num;
                        scope.flipPage({currentPage: scope.conf.currentPage});
                    }
                    scope.$watch(function(){
                        if(!(scope.conf.totalItems && scope.conf.currentPage))return;
                        return scope.conf.totalItems + scope.conf.currentPage;
                    },function(){
                       if(!(scope.conf.totalItems && scope.conf.currentPage))return;
                        getPagination();
                    });

                }
            };
        });
})();
