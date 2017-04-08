<template>
	<div>
		<run-header></run-header>
		<div class="card-container main" v-show="!ruleshow">
			<div class="title">
				<img src="../assets/imgs/coupon.png">
			</div>
			<div class="code">
				<el-input v-model="code" placeholder="请输入口令" size="large"></el-input>
			</div>
			<div>
				<el-button type="primary" :disabled="!codeflag" size="large" class="button primary">兑换</el-button>
			</div>
			<p class="info">
				<span @click="rulefun(1)"><i class="el-icon-warning"></i> 兑换规则</span>
			</p>
		</div>
		<div class="card-container coupon-rules" v-show="ruleshow">
			<div class="box-card" v-for="(item,index) in rules">
			  <div class="header">
			  	<el-tag color="orange">{{index+1}}</el-tag>
			    <span class="rule-title">{{item.title}}</span>
			  </div>
			  <i class="line"></i>
			  <div class="text">
			   	{{item.content}}
			  </div>
			</div>
			<div class="button">
				<el-button type="primary" size="large" @click="rulefun(0)">确定</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import RunHeader from '@/components/runHeader'
	export default{
		data () {
			var rules = [
				{
					title:'什么是口令兑换码？',
					content:'口令兑换码是uu跑腿平台发给uu用户的，作为兑换uu跑腿优惠的凭证，成功兑换后将以优惠券的形式保存至uu跑腿”个人中心账户”，”优惠券“ 优惠券的使用规则详见优惠券规则页面。'
				},
				{
					title:'口令兑换码是什么样子的？',
					content:'口令兑换码是一串中文、数字、或字母组合。'
				},
				{
					title:'怎样获得口令兑换码？',
					content:'口令兑换码是uu跑腿平台发出的，它有可能出现这些地方：1.uu跑腿的新浪官方微博、微信公众号；2.其他途径。温馨提示：每种口令兑换码名额有限，大家看到第一时间领取哦'
				},
				{
					title:'一个用户一天内最多能兑换几次口令兑换码？',
					content:'一个用户不限优惠劵的兑换次数，每日可用的优惠券上限张数请见优惠券使用规则'
				},
				{
					title:'口令兑换码可以重复兑换么',
					content:'不能哦~一个口令兑换码只能兑换一张优惠券，不能重复兑换。'
				},
				{
					title:'口令兑换码可以找零或兑换么？',
					content:'不可以。使用口令兑换码兑换成功的优惠券支付订单时，优惠券金额高于订单金额的，差额 部分不找零不兑换；优惠券低于订单金额的，差额部分由用户支付。'
				},
				{
					title:'什么是口令兑换码的“有效期”？',
					content:'口令兑换码所兑换的优惠券上会注明“有效期”，该优惠券仅能在注明的有效期内使用。'
				}
			]
			return {
				code : '',
				rules,
				ruleshow:false,
			}
		},
		components:{
			RunHeader
		},
		computed : {
			codeflag () {
				return this.code.length>10;
			}
		},
		methods : {
			rulefun (i) {
				if(i==1){
					this.ruleshow = true;
				}else{
					this.ruleshow = false;
				}
			}
		}
	}
</script>
<style scoped lang="less">
	.main{
		.title{
			width: 100%;
			img{width: 100%;}
		}
		.code{
			width: 90%;
			margin: auto;
		}
		.button{
			margin: 20px 0;
			width: 90%;
		}
		.info{
			color: #99A9BF;
			text-align: right;
			width: 90%;
			padding-bottom: 10px;
		}
	}
	.coupon-rules{
		text-align: left;
		.box-card{
			padding: 10px 20px 0px;
		}
		.rule-title{
			font-size: 20px;
			color: #324057;
		}
		.text {
		    font-size: 14px;
		    padding: 18px 0;
		    text-indent: 2em;
		}
		.button{
			text-align: center;
			button{
				width: 90%;
				margin-bottom: 20px;
			}
		}
	}
</style>