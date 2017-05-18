/**
 * Created by Administrator on 2017/5/17 0017.
 * 项目启动配置文件
 */
angular.module('hb.webRoot',[]).factory('webRoot',function ($location) {
   return $location.$$protocol + '://' + $location.$$host + ':' + $location.$$port + '/src';
});