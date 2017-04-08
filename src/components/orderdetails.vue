<template>
<div>
	<el-card class="card-container box-card">
	  	<div slot="header">
		    <span style="line-height: 26px" class="title">
		    	订单详情
		    </span>
		</div>
		<div>
			<div>
				<i class="el-icon-menu"></i><span class="innertitle">任务类型</span>
				<p>
					<span>{{order.ordertype | gettype}}</span>
					<span>{{order.otype +'/'+ order.thingname?order.thingname:''}}</span>
				</p>
			</div>
			<div>
				<i class="el-icon-information"></i><span class="innertitle">出发地址</span>
				<p>
					<span>{{order.formaddres1}}</span>
					<span>{{order.formaddres2}}</span>
				</p>
			</div>
			<div>
				<i class="el-icon-information"></i><span class="innertitle">目的地址</span>
				<p>
					<span>{{order.sendaddress1}}</span>
					<span>{{order.sendaddress2}}</span>
				</p>	
			</div>
			<div>
				<i><img src="../assets/imgs/price.png"></i><span class="innertitle">金额</span>
				<p><span>{{order.price | currency}}</span></p>
			</div>
			<div>
				<i><img src="../assets/imgs/price.png"></i><span class="innertitle">佣金</span>
				<p><span>{{order.commission | currency}}</span></p>
			</div>
			<div>
				<i class="el-icon-share"></i><span class="innertitle">电话</span>
				<p><span>{{order.formphone}}</span></p>
			</div>
			<div>
				<i class="el-icon-date"></i><span class="innertitle">时间</span>
				<p><span>{{order.time}}</span></p>
			</div>
		</div>
	</el-card>
</div>
</template>

<script>

export default{
	data () {
		return {
			
		}
	},
	watch: {

	},
	props:['order'],
	filters:{
		countLength(value){
		  if (!value) { value = ''}
		  if (value.length>20){
		  	value = value.toString();
		  	value = value.slice(0,20)+'...'
		  }
		  return value;
		},
		currency(value){
			if(value){
				var value = value*1;
		 		 return  value.toFixed(2)+'元';
			}else{
				return '0.00元';
			}
		},
		gettype(val){
			var state = val*1;
			var type = '';
			switch(state){
				case 0:
					type = '帮我买';
				break;
				case 1:
					type = '帮我送';
				break;
				case 2:
					type = '带排队';
				break;
				case 3:
					type = '帮我取';
				break;
			}
			return type;
		}
	},
	methods:{
		
	},
	mounted () {
		console.log(this.order);
	}
}
</script>

<style scoped lang="less">
	.box-card{
		text-align: left;
		.title{
			color: #324057;
			font-family: 'Microsoft YaHei';
			font-weight: bold;
			font-size: 26px;
		}
		img,i{
			font-size: 20px;
			vertical-align: middle;
			width: 20px;
			height: 20px;
			overflow: hidden;
		}
		.innertitle{
			margin-left: 20px;
			font-size: 20px;
			color: #8492A6;
		}
		p{	
			line-height: 30px;
			margin-left: 50px;
			span:nth-child(2){
				font-size: 12px;
				color: #8492A6;
			}
			border-bottom: 1px solid #E5E9F2;
		}
	}
</style>