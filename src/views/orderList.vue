<template>
	<div>
		<run-header></run-header>
		<mt-tabbar v-model="selected" class="checkbox" fixed>
		  <mt-tab-item id="10">
		  <i slot="icon" class="el-icon-more"></i>
		    全部订单
		  </mt-tab-item>
		  <mt-tab-item id="0">
		  <i slot="icon" class="el-icon-minus"></i>
		    未开始
		  </mt-tab-item>
		  <mt-tab-item id="1">
		  <i slot="icon" class="el-icon-d-arrow-right"></i>
		    进行中
		  </mt-tab-item>
		  <mt-tab-item id="2">
		  <i slot="icon" class="el-icon-check"></i>
		    已完成
		  </mt-tab-item>
		</mt-tabbar>
		<div class="content">
			<el-card class="box-card" v-for="listone in showlist" :key="listone.ordertype">
				<div  slot="header">
					<el-row>
					  <el-col :span="6"><el-tag :color="listone.ordertype | getcolor">{{listone.ordertype | gettype}}</el-tag></el-col>
					  <el-col :span="10" class="order-time">{{listone.time}}</el-col>
					  <el-col :span="6">{{listone.price | currency}}</el-col>
					  <el-col :span="2">
					  	<i class="el-icon-caret-right link" @click="gohtml(listone)"></i>
					  </el-col>
					</el-row>
					<p class="orderinfo">{{listone.stade | getstate}}</p>
				</div>
				<el-progress type="line" :percentage="listone.stade*50" class="progress" :show-text="false"></el-progress>
			</el-card>
		</div>
	</div>
</template>

<script>
import RunHeader from '@/components/runHeader'
import { Tabbar, TabItem } from 'mint-ui'
import { Indicator } from 'mint-ui';

export default{
	data () {
		return {
			selected:'10',
			orderlist:[],
		}
	},
	components:{
		RunHeader,
		Tabbar,
		TabItem,
	},
	computed: {
		showlist () {
			var newarr = [];
			var stade = this.selected;
			if(stade==10){
				newarr = this.orderlist;
			}else{
				this.orderlist.forEach((val,index)=>{
					if(val.stade==stade){
						newarr.push(val);
					}
				})
			}
			return newarr;
		},
	},
	filters:{
		currency(value){
			var value = value*1;
		  return  value.toFixed(2)+'元';
		},
		getstate(val){
			var state = val*1;
			var str;
			switch(state){
				case 0:
					str = '未开始';
				break;
				case 1:
					str = '进行中';
				break;
				case 2:
					str = '已完成';
				break;
			}
			return str;
		},
		getcolor(val){
			var state = val*1;
			var color = '#333';
			switch(state){
				case 0:
					color = '#FF8AAE';
				break;
				case 1:
					color = '#58D5EF';
				break;
				case 2:
					color = '#B5E275';
				break;
				case 3:
					color = '#FFC853';
				break;
			}
			return color;
		},
		gettype(val){
			var state = val*1;
			var type = '#333';
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
		getUserOrder () {
			var _this = this;
			this.$http({
		    	method:'post',
		    	body:{token:this.$store.state.token},
		        url:'/hx160803/tp/index.php/admin/prot/getUserOrder',
		    }).then(function(data){
				var orderarr = data.body;
				_this.orderlist = orderarr;
				Indicator.close();
			})
		},
		gohtml(item){
			var type = item.stade*1;
			switch(type){
				case 0:
					this.$router.push({ path: `/toorderInfo/${item.id}`});
				break;
				case 1:
					this.$router.push({ path: `/toorderworking/${item.id}`});
				break;
				case 2:
					this.$router.push({ path: `/toorderworking/${item.id}`});
				break;
			}
			
		}
	},
	mounted:function(){
		Indicator.open();
		this.getUserOrder();
	},
}
</script>

<style scoped lang="less">

	.mint-tabbar >.mint-tab-item{color:#333;}
	.mint-tabbar >.mint-tab-item.is-selected{
		color: #FF4949;
	}
	.content{
		padding-bottom: 55px;
		text-align: left;
		.box-card{
			margin-top: 5px;
		}
		.link{
			color: #58B7FF;
		}
		.orderinfo{
			text-align: center;
			color:#D3DCE6;
		}
	}
	.order-time{
		font-size: 14px;
	}
</style>