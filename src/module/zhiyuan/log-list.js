/**
 * Created by Administrator on 2017/5/18 0018.
 * 日记列表模块
 */
angular.module('app',['hb.dialog','hb.paination'])
    .controller('myCtrl',function ($scope) {

        //函数获取数据
        function getData($scope,num) {
            var num = num || 1;
            utilHB.ajax(urls.logList,function(data){
                $scope.$apply(function($scope){
                    $scope.paginationConf = {
                        currentPage: num,
                        totalItems: data.totalCount
                    }
                    $scope.list = data.data;
                })
            },{limit:10,page:num});
        }
        //定义指令参数
        $scope.paginationConf ={};
        $scope.list = [];
        getData($scope); //请求数据

        $scope.data = {
            isShow: false,
            template: {
                url: 'message.html'
            }
        }

        $scope.flip = function(current){
            getData($scope,current);
        }
        
        $scope.open = function () {
            $scope.data.isShow = true;
        }
    });




