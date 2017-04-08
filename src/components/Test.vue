<template>
	<div>
		<div id="map">
			
		</div>
		{{msg}}
		<button @click="fun">clcik</button>
		<!-- <remote-js src='http://api.map.baidu.com/api?v=2.0&ak=6kfqE4tc0Zyje4XArQiviEGt'></remote-js> -->
		<remote-js src="http://cdn.bootcss.com/socket.io/1.3.7/socket.io.js"></remote-js>
	</div>
</template>

<script>
import RemoteJs from '../tools/remoteJs.vue'
export default{
	data () {
		return {
			msg:'hello',
			map:'',
			socket:{},
		}
	},
	methods: {
		fun(){
			console.log(this.socket)
	  		this.$http({
		    	method:'post',
		    	body:{type:'publish',content:'跑男信息',to:123},
		        url:'/hx160803/socket/test.php',
		    }).then(function(data){
		    	console.log(data.body);
		    })
		}
    },
    mounted () {
    	var _this = this;
    	window.onload = function(){
    		// 连接服务端，workerman.net:2120换成实际部署web-msg-sender服务的域名或者ip
		     _this.socket = io('http://cykj.online:2120');
		    // uid可以是自己网站的用户id，以便针对uid推送以及统计在线人数
		    var uid = Math.floor(Math.random()*20);
		    // socket连接后以uid登录
		    _this.socket.on('connect', function(){
		    	_this.socket.emit('login', uid);
		    	_this.socket.emit('asas');
		    });
		    // 后端推送来消息时
		    _this.socket.on('new_msg', function(msg){
		        console.log(msg);
		    });
		    // 后端推送来在线数据时
		    _this.socket.on('update_online_count', function(online_stat){
		        console.log(online_stat);
		    });
    	}
    	function loadScript() {  
		  var script = document.createElement("script");  
		  script.src = "http://api.map.baidu.com/api?v=2.0&ak=6kfqE4tc0Zyje4XArQiviEGt&callback=initialize1";//此为v2.0版本的引用方式  
		  // http://api.map.baidu.com/api?v=1.4&ak=您的密钥&callback=initialize"; //此为v1.4版本及以前版本的引用方式
		  document.body.appendChild(script);
		}
		/*while(!window.initialize){
			this.map = window.initialize
		}*/
    },
    components:{
    	RemoteJs
    }
}
</script>

<style scoped>
	h1{
		font-size: 2rem;
	}
	#map{
		width: 100%;
		height: 10rem;
	}
</style>