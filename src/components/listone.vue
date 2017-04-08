<template>
   	<div class="card-container listone-thingbox">
		<el-row type="flex" justify="space-around">
			<el-col :span="3">
				<i class="buycar">
					<slot name="icon">aaa</slot>
				</i>
			</el-col>
			<el-col :span="6">
				<span class="thingname">
					<slot name="text">aaa</slot>
				</span>
			</el-col>
			<el-col :span="1">
			</el-col>
			<el-col :span="12">
				<div class="box">
					<div class="content">
						<slot name="data">aaa</slot>	
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<style lang="less">
	.listone-thingbox{
		max-height: 3rem;
		line-height: 3rem;
		.buycar{
			img,i{
				font-size: 1.2rem;
    			vertical-align: middle;
				width: 1.5rem;
				height: 1.5rem;
				// margin-top: .25rem;
			}
		}
		.thingname{
			font-size: .8rem;
		}
		.box{
			height: 3rem;
			display:table-cell;
   			text-align:center;
     		vertical-align:middle;
     		.content{
     			display: inline-block;
     		}
		}
	}
</style>