<template>
<div class="card-container position-box">
	<el-row type="flex" justify="space-around">
		<el-col :span="3">
			<i class="myicon"><slot name="icon"></slot></i>
		</el-col>
		<el-col :span="6">
			<p class="title">{{text}}</p>
		</el-col>
		<el-col :span="10">
			<el-form-item :prop="prop+'.title'" :ref="prop+'.title'"
			    :rules="[
			      { required: true, message: '不能为空'},
			    ]" class="inputbox">
			    <el-input v-model="forfrom[prop]['title']" :placeholder="'请输入'+text" @focus="showInfo" readonly="readonly"></el-input>
			 </el-form-item>
		</el-col>
		<el-col :span="3">
			<i :class="['collect',{'el-icon-star-off':!iscollect},{'el-icon-star-on':iscollect} ]" @click="collectionFun"></i>
		</el-col>
	</el-row>

	<!-- check -->
	<div v-show="addressFlag" class="addressFlag">
		<div v-show="addressFlagInner">
			<div class="card-container clearfix address">
				<i class="myicon inner-icon"><slot name="icon1"></slot></i>
				<div class="inner-content">
					<p @click="chooseAddress" v-if="!forfrom[prop]['title']">请输入{{text}}</p>
					<p @click="chooseAddress" v-else>{{forfrom[prop]['title']}} <br> <span>{{forfrom[prop]['address'] | countLength}} </span></p>
					<div>
						<input v-model="supply" placeholder="请补充具体地址" class="supply"></input>
					</div>
				</div>
			</div>
			<el-button type="warning" @click="cancel('outer')">取消</el-button>
    		<el-button type="danger" @click="sureAddress">确认</el-button>

			<div class="card-container clearfix mycollect">
				<h3>收藏地址</h3>
				<i class="line"></i>
				<ul>
					<li v-for="item in mycollect" @click="checkcollectFun(item)">
						{{item.addres2}} <br> <span class="mycollectinfo">{{ item.addres1 | countLength}} </span>
						<i class="star el-icon-star-on"></i>
					</li>
				</ul>
			</div>
		</div>
		<div v-show="!addressFlagInner" class="seachPosition">
			<el-row type="flex" justify="space-around" class="card-container address">
				<el-col :span="3">
					<i class="myicon"><slot name="icon2"></slot></i>
				</el-col>
				<el-col :span="14">
					<input v-model.trim="keywords" placeholder="输入搜索内容" class="keywords">
				</el-col>
				<el-col :span="6">
					<el-button type="warning" @click="cancel('inner')"> 取消 </el-button>
				</el-col>
			</el-row>
			<p><i class="el-icon-circle-check"></i>选择搜索结果项</p>
			<ul>
				<li v-for="item in adds" @click="checkFun(item)">
					<div>
						<i class="map-icon"></i>
						<div class="content">
							<h4>{{item.title}}</h4>
							<p>{{item.address | countLength}}</p>
						</div>
					</div>
					<i class="line"></i>
				</li>
			</ul>
		</div>
		
	</div>
</div>
</template>

<script>
export default{
	created() {
      
  	},
	data () {
		return {
			addressFlag:false,
			addressFlagInner:true,
			supply:'',
			iscollect:false,
			keywords:'',
			adds:[],
			mycollect:[],
		}
	},
	mounted:function(){
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://api.map.baidu.com/api?v=2.0&ak=6kfqE4tc0Zyje4XArQiviEGt&callback=init";
		document.body.appendChild(script);
		// 初始化收藏信息
		this.getmycollect();
		},
	watch: {
	    keywords: function () {
	      this.getAnswer()
	    },
	    forfrom:function(val){
	    	console.log(val)
	    }
	},
	props:['forfrom','prop','text'],
	filters:{
		countLength(value){
		  if (!value) { value = ''}
		  if (value.length>20){
		  	value = value.toString();
		  	value = value.slice(0,20)+'...'
		  }
		  return value;
		}
	},
	methods:{
		chooseAddress () {
			this.keywords = '';
			this.addressFlagInner = false;
		},
		getAnswer () {
			var _this = this;
			var options = {      
			  	onSearchComplete: function(results){      
					if (local.getStatus() == BMAP_STATUS_SUCCESS){      
					    // 判断状态是否正确      
					    var s = [];      
					    for (var i = 0; i < results.getCurrentNumPois(); i ++){      
					        s.push(results.getPoi(i));      
					    }
					    _this.adds = s;         
					}      
			  	}
			}
			var local = new BMap.LocalSearch('厦门',options);
			local.search(this.keywords)
		},
		checkFun(item){
			this.forfrom[this.prop]['title'] = item.title;
			this.forfrom[this.prop]['address'] = item.address;
			this.forfrom[this.prop]['point'] = item.point;
			this.addressFlagInner = true;
			this.iscollect = false;
			this.$toast({
				message: '选择成功',
				iconClass: 'el-icon-check',
				duration:1000
			});
		},
		sureAddress(){
			this.forfrom[this.prop]['userinfo'] = this.supply;
			this.addressFlag = false;
		},
		cancel(name){
			if(name=='outer'){
				this.forfrom[this.prop] = {};
				this.supply = '';
				this.addressFlag = false;
				this.iscollect = false;
			}else{
				this.addressFlagInner = true;
			}
		},
		showInfo(){
			this.addressFlag = true;
		},
		collectionFun(){
			if(this.iscollect){
				this.$toast({
					message: '你已收藏过本地址',
					iconClass: 'el-icon-warning',
					duration:1000
				});
				return false;
			};
			var obj = this.forfrom[this.prop];
			if(obj.title){
				var address = obj.address,
					title = obj.title,
					userinfo = obj.userinfo,
					lat = obj.point.lat,
					lng = obj.point.lng,
					token = this.$store.state.token;
				this.$http({
			    	method:'post',
			    	body:{
			    		address,
			    		title,
			    		userinfo,
			    		lat,
			    		lng,
			    		token
			    	},
			        url:'/hx160803/tp/index.php/admin/prot/saveAddres',
			    }).then(function(data){
			    	if(data.body == 1){
						this.iscollect = true;
						this.getmycollect();
						this.$toast({
							message: '收藏成功',
							iconClass: 'el-icon-check',
							duration:1000
						});
			    	}
			    })	
			}	
		},
		getmycollect(){
			this.$http({
		    	method:'post',
		    	body:{
		    		token:this.$store.state.token
		    	},
		        url:'/hx160803/tp/index.php/Home/User/getCollect',
		    }).then(function(data){
		    	// console.log(data.body);
		    	this.mycollect = data.body;
		    })	
		},
		checkcollectFun(item){
			this.forfrom[this.prop].address = item.addres1;
			this.forfrom[this.prop].title = item.addres2;
			this.forfrom[this.prop].userinfo = this.supply = item.addres3,
			this.forfrom[this.prop].point = {
				lat:item.lat,
				lng:item.lng,
			}
			this.iscollect = true;
			this.$toast({
				message: '选择成功',
				iconClass: 'el-icon-check',
				duration:1000
			});
		}
	}
}
</script>

<style scoped lang="less">
	.position-box{
		height: 3rem;
		line-height: 3rem;
	}
	.myicon{
		display: inline-block;
		height: 3rem;
		width: 1.5rem;
		height: 1.5rem;
		margin-top: .5rem;
		img{
			width: 100%;
		}
	}
	.collect{
		font-size: 1.2rem;
		line-height: 3rem;
		// color: orange;
	}
	.el-icon-star-on{
		color: orange;
	}
	.inputbox{
		height: 2rem;
	  	margin-top: .5rem;
	}
	.addressFlag{
		background:#F4F7F7;
		position: absolute;
		overflow-y: scroll;
    	-webkit-overflow-scrolling: touch;
		width: 100%;
		height: 120%;
		top: 0;
		z-index: 999;
		.supply{
			font-size: .8rem;
			color: #999;
		}
	}
	// 弹窗
	.inner-icon{
		float: left;
		margin-right: .3rem;
	}
	.address{
		margin-top: 0;
	}
	.inner-content{
		overflow:hidden;
		text-align: left;
		p{	
			min-height: 2rem;
			border-bottom: 1px solid #EBEBEB;
			font-size: 1rem;
			line-height: 1rem;
			margin: .5rem 0;
			span{
				font-size: .6rem;
				margin-top: .2rem;
				color: #999;
			}
		}
		input{
			border:none;
			width: 80%;
			font-size: 1rem;
		}
	}
	.mycollect{
		position: absolute;
		bottom: 0;
		height: 18rem;
		text-align: left;
		h3{
			line-height: 1rem;
			height: 1rem;
			text-indent: 1rem;
		}
	 	ul{
			overflow-y: scroll;
			height: 10rem;
		}
		li{
			display: block;
			position: relative;
			border-bottom: 1px solid #EBEBEB;
			margin-left: 2rem;
			line-height: 2;	
			.mycollectinfo{
				text-indent: 2rem;
				font-size: 12px;
				color: #999;
			}
			.star{
				font-size: 1.5rem;
				position: absolute;
				right: 20px;
				bottom: 10px;
				color: orange;
			}
		} 
	}
	.seachPosition{
		overflow-y: auto;
		.keywords{
			border:none;
			width: 100%;
			height: 2rem;
			border-radius: 5px;
			text-indent: 1rem;
		}
		.map-icon{
			display: inline-block;
			vertical-align: middle;
		  	width: 1rem;
		  	height: 2rem;
		  	background: url('../assets/imgs/map3.png')center center no-repeat;
		  	background-size: 100%;
		  	color: #8492A6;
		  	margin:0 1rem;
		  	float: left;
		}
		p{
			text-align: left;
			color: #8492A6;
			line-height: 2rem;
			text-indent: 5px;
		}
		li{
			display: block;
			text-align: left;
			div{
				.content{
					overflow: hidden;
					h4{
						line-height: 1rem;
						margin: .3rem 0;
					}
					p{	
						font-size: .8rem;
						line-height: 1rem;
						margin-bottom: .2rem;
					}
				}
			}
		}
	}
</style>