<template>
	<header class="clearfix">
		<div class="back">
		 	<slot name="back"><router-link to="/"><i class="el-icon-arrow-left"></i></router-link></slot>
		</div>
		<div class="logo">
			<slot name="logo"><img src="../assets/imgs/use_logo.png"></slot>
		</div>
		<div class="right">
			<slot name="right"><p class="address">{{this.$store.state.userinfo.addres}}</p></slot>
		</div>
	</header>
</template>

<script>
	
</script>

<style scoped lang="less">
header {
	background: #fff;
	width: 100%;
	height: 3rem;
	line-height: 3rem;
	a{color:#999;}
	div{
		float: left;
	}
	.back{
		width: 15%;
		font-size: 1rem;
	}
	.logo{
		width: 70%;
		display: table-cell;
		vertical-align: middle;
		height: 100%;
		img{
			vertical-align:middle;
			height: 40%;
		}
	}
	.right{
		font-size: 1.2rem;
		width: 15%;

	}
	.address{
		font-size: 12px;
		ord-wrap:break-word;
		overflow: hidden;
		margin-right: 10px;
	}
}
</style>