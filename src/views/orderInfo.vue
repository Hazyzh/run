<template>
	<div>
		<run-header></run-header>
		<div class="map-box">
			 <baidu-map class="bm-view" :center="center" @ready="initMap" :zoom="13">
			 	<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>
			 	<!-- 中心点 -->
			 	 <bm-marker :position="center" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :label="{content: '订单出发点', opts: {offset: {width: 20, height: -10}}}"></bm-marker>
			 	 <!-- 中心圆 -->
			 	 <bm-circle :center="center" :radius="search" stroke-color="#fff" :stroke-opacity="1" :fill-opacity=".3" :stroke-weight="2"></bm-circle>
			 	 <!-- 跑男位置 -->
			 	 <bm-marker v-for="item in testarr" key="1" :position="item" :dragging="false" :icon="{url: '/static/imgs/moto-courier.png', size: {width: 50, height: 50}}"></bm-marker>
		  	</baidu-map>
		</div>
		<mt-spinner type="triple-bounce"></mt-spinner>
		<p class="info">附近有{{testarr.length}}个跑男 | 等待接单中...</p>
		<order-details :order="orderinfo"></order-details>
	</div>
</template>

<script>
import RunHeader from '@/components/runHeader'
import OrderDetails from '@/components/orderdetails'
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';

export default{
	data () {
		return {
			center: {
				lng: 0,
				lat: 0
			},
	        search:5000,
	        testarr:[],
	        orderinfo:{},
	        socket:null,
		}
	},
	components:{
		RunHeader,
		OrderDetails
	},
	computed: {
	
	},
	filters:{
		currency(value){
			if(value){
				var value = value * 1;
		  		return  value.toFixed(2)+'元';
			}	
		},
	},
	methods:{
		initMap(lng,lat){
			var lng = lng*1;
			var lat = lat*1;
			// 初始化中心点
			this.center.lng = lng;
	      	this.center.lat = lat;
		},
		getOrderInfo () {
			var _this = this;
			this.$http({
		    	method:'post',
		    	body:{id:this.$route.params.id},
		        url:'/hx160803/tp/index.php/home/order/orderOne',
		    }).then(function(data){
		    	var order = data.body[0];
		    	_this.orderinfo = order;
				_this.initMap(order.formpointlan,order.formpointlat);
				_this.testarr = _this.getRunmenArr(order.formpointlan,order.formpointlat);
				Indicator.close();
			})
		},
		getRunmenArr(lng,lat){
			var lng = lng*1;
			var lat = lat*1;
			
			var arr = [];
			for(var i=0;i<5;i++){
				var newlng = lng+(Math.floor((Math.random()-0.5)*i*100)/10000);
				var newlat = lat+(Math.floor((Math.random()-0.5)*i*100)/10000);
				var obj = {
					lng:newlng,
					lat:newlat
				}
				arr.push(obj)
			}
			return arr;
		}
	},
	mounted:function(){
		Indicator.open('加载信息中');
		this.getOrderInfo();
	},
}
</script>

<style scoped lang="less">
    .bm-view {
	  width: 100%;
	  height: 300px;
	}
	.map-box{
		border: 5px solid #eee;
	}
	.info{
		color: #475669;
	}
</style>