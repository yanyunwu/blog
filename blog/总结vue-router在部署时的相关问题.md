### 总结vue-router以及vue打包后在部署时的相关问题



我们知道`vue-router`有`hash`和`history`模式，但我当我们部署在服务器上时，总会遇到以下问题：

1. 在`history`模式下，我们在浏览器直接打开某个前端路由时（index.html除外），总是会出现404的错误，而这个错误通常是由后端服务器发给我们的，这就说明前端路由并没有起效。	

   解决办法：拦截所有的get请求，并将他们转换为请求主页，也就是index.html文件，这样当我们的js文件被请求到浏览器后，就会自动在前端路由寻找我们想要的页面，注意：一定要在所有get请求的最后进行拦截，以防我们其他的xhr get请求失效，当然你也可以将所有的前端路由放在后端进行精确匹配。

2. `history`模式中的base属性，这个base属性必须和vue.config.js中的publicPath同时使用

   例如：

   ```js
   // router
   new Router({
     mode: 'history',
     base: '/aaa'
   });
   // vue.config.js
   module.exports = {
       publicPath: '/aaa/'
   }
   ```

   事实上，base默认是`process.env.VUE_APP_baseUrl`，这时我们只需更改publicPath即可，因为这个环境变量是脚手架帮我们配置的

3. 关于`publicPath`的设置，当设置为`./`，是访问路径是相对与index.html文件，而设置为`/`或者`/aaa/`时，是相对于打包文件被部署的那个服务器的域名，也就是`http://XXX.com/*.js`和``http://XXX.com/aaa/*.js`，所以要根据需求进行配置，一般我们都配置成

   ~~~js
   // vue.config.js
   module.exports = {
       publicPath: publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
   }
   // 测试环境（vue脚手架）为/   生成环境为./（避免因服务器的变化而产生错误）
   ~~~

以上就是我的总结