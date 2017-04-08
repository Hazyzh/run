<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';

export default {
  name: 'app',
  methods:{
    initSocket () {
      var _this = this;
      var uid = 'runuser'+this.$store.state.userinfo.id;
      var socket = io('http://cykj.online:2120');
        // socket连接后以uid登录
        socket.on('connect', function(){
          socket.emit('login', uid);
        });
        // 后端推送来消息时
        socket.on('new_msg', function(msg){
            if(msg.startsWith('runok')){
              var id = msg.substring(5);
              MessageBox({
                title: '你有新的订单被完成',
                message: '前往详情页确认',
                showCancelButton: true
              }).then(action => {
                if(action=='confirm'){
                  _this.$router.push({ path: `/toorderworking/${id}`});
                }
              });
            }else if(msg.startsWith('orderok')){
              var id = msg.substring(7);
              MessageBox({
                title: '你有新的订单被接收',
                message: '前往查看详情',
                showCancelButton: true
              }).then(action => {
                if(action=='confirm'){
                  _this.$router.push({ path: `/toorderworking/${id}`});
                }
              });
            }
        });
    }
  },
  mounted:function(){
    // 获取信息
    this.$http({
      method:'post',
      body:{token:this.$store.state.token},
      url:'/hx160803/tp/index.php/home/user/userOne',
    }).then(function(data){
      var runmen = data.body[0];
      this.$store.commit('setinfo', runmen);

      var _this = this;
      function init(){
        if(window.io){
          clearInterval(t);
            // 初始化地图
          _this.initSocket();
        }
      }
      var t = setInterval(init,200);
    })
    // 加载第三方插件
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://cdn.bootcss.com/socket.io/1.3.7/socket.io.js";
    document.body.appendChild(script);
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size:.8rem;
}
html,body{
  height: 100%;
}
li{
  display: inline-block;
}
@import './assets/css/run.css';
</style>
