<template>
	<div>
		<run-header></run-header>
		<div class="map-box">
			 <baidu-map class="bm-view" :center="center" @ready="initMap" :zoom="12">
			 	<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>
			 	<!-- 中心点 -->
			 	 <bm-marker :position="center" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :label="{content: '订单出发点', opts: {offset: {width: 20, height: -10}}}"></bm-marker>
			 	 <bm-marker :position="gocenter" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :label="{content: '订单到达地', opts: {offset: {width: 20, height: -10}}}"></bm-marker>
		  	</baidu-map>
		</div>
		<mt-spinner type="triple-bounce"></mt-spinner>
		<div v-if="orderinfo.stade==1">
			<p class="info">跑男正在奔跑中...</p>
			<mt-button size="large" type="danger" @click="sureOrderHander">确认完成订单</mt-button>
		</div>
		<div v-else>
			<p class="info">订单已经完成</p>
		</div>
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
			gocenter:{
				lng: 0,
				lat: 0
			},
	        orderinfo:{},
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
		initMap(lng,lat,lng2,lat2){
			var lng = lng*1,
				lat = lat*1,
				lng2 = lng2*1,
				lat2 = lat2*1;

			// 初始化中心点
			this.center.lng = lng;
	      	this.center.lat = lat;
	      	this.gocenter.lng = lng2;
	      	this.gocenter.lat = lat2;
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
				_this.initMap(order.formpointlan,order.formpointlat,order.sendpointlan,order.sendpointlat);
				Indicator.close();
			})
		},
		sureOrderHander () {
			MessageBox({
				title: '订单确认',
				message: '确定要完成订单吗?',
				showCancelButton: true
			}).then(action => {
				if(action=='confirm'){
				  	var touid = 'running'+this.orderinfo.runman;
					var content = 'runok'+this.orderinfo.id;
					// 传到数据库
					this.$http({
				    	method:'post',
				    	body:{id:this.orderinfo.id},
				        url:'/hx160803/tp/index.php/admin/prot/sureOrder',
				    }).then((data)=>{
				    	if(data.body==1){
				    		this.$http({
						    	method:'post',
						    	body:{to:touid,content},
						        url:'/hx160803/socket/test.php',
						    }).then((data)=>{
						    	console.log(data.body)
							})
							this.orderinfo.stade=2;
				    	}else{

				    	}
					})
					
				}
			});
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