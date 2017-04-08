<template>
	<div>
		<run-header></run-header>
		<div class="headerinfo">
			<div class="header-img">
				<img src="../assets/imgs/headpic.png">
			</div>
			<p class="phone">{{this.$store.state.userinfo.phone}}</p>
		</div>
		<div class="account-info">
			<el-row type="flex" justify="space-between" align="middle">
			  <el-col :span="6">
			  		<div>
		  				<p class="title">0</p>
			  			<p class="info">优惠券</p>
			  		</div>
			  </el-col>
			  <el-col :span="6">
			  		<div>
			  			<p class="title">{{this.$store.state.userinfo.money | currency}}</p>
			  			<p class="info">账户余额</p>
			  		</div>
			  </el-col>
			  <el-col :span="6">
					<div>
						<p class="title">充值优惠</p>
			  			<p class="info">去充值</p>
					</div>
			  </el-col>
			</el-row>
		</div>
		<div class="card-container cardone">
			<mt-cell title="口令优惠券" is-link to="/coupon">
			  <img slot="icon" src="../assets/imgs/discount.png" width="30" height="30">
			</mt-cell>
		</div>
		<div class="card-container cardone">
			<mt-cell title="我的订单" is-link to="/toorderList">
			  <img slot="icon" src="../assets/imgs/font-508.png" width="30" height="30">
			</mt-cell>
		</div>
		<div class="card-container cardone">
			<mt-cell title="收件记录" is-link to="/toorderList">
			  <img slot="icon" src="../assets/imgs/purchase_order.png" width="30" height="30">
			</mt-cell>
		</div>
		<div class="card-container ads">
			<img src="../assets/imgs/side_down.jpg">
		</div>
		<div class="logout">
			<mt-button size="large" type="danger" @click="logout">退出登录</mt-button>
		</div>
	</div>
</template>

<script>
import RunHeader from '@/components/runHeader'
export default{
	components:{
		RunHeader
	},
	filters:{
		currency(value){
			var value = value * 1;
		  return  value.toFixed(2);
		},
	},
	methods:{
		logout(){
			console.log(this.$store.state.userinfo)
			/*this.$store.commit('logout')
			this.$router.push({ path: '/' })*/
		}
	}
}
</script>
<style scoped lang="less">
    .headerinfo{
    	width: 100%;
    	height: 10rem;
    	background: orange;
    	overflow:hidden;
    	.header-img{
    		height: 5rem;
    		width: 5rem;
    		margin:auto;
    		margin-top: 2rem;
    		img{width: 100%}
    	}
    	.phone{
    		font-size: 20px;
    		font-weight: bold;
    		color: #fff;
    	}
    }
    .account-info{
    	height: 5rem;
    	background:#F0F8FF;
    	.title{
			font-size: 20px;
			font-weight: bold;
			margin-top: 1.6rem;
    	}
    	.info{
    		margin-top: .4rem;
			font-size: 14px;
			font-weight: bold;
			color: #8492A6;
    	}
    }
    .cardone{
    	text-align: left;
    }
    .ads{
    	img{width: 100%;}
    	margin: .5rem 0;
    }
</style>