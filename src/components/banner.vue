<template>
   	<div class="banner">
   		<mt-swipe :auto="4000">
		  <mt-swipe-item><img src="../assets/imgs/use_banner.png"></mt-swipe-item>
		  <mt-swipe-item><img src="../assets/imgs/banner2.jpg"></mt-swipe-item>
		  <mt-swipe-item><img src="../assets/imgs/banner3.jpg"></mt-swipe-item>
		</mt-swipe>
   	</div>
</template>

<script>
	// import { Swipe, SwipeItem } from 'mint-ui'

export default{
	data () {
		return {
			msg:'hello',
		}
	},
}
</script>

<style scoped>
	.banner{
		position: relative;
		height: 10rem;
		margin-bottom: 1rem;
	}
	img{
		width: 100%;
		height: 100%;
	}
</style>