<template>
	<div>
		<run-header></run-header>
		<el-form :model="togetFrom" ref="togetFrom" :rules="rules">
			<!-- 出发地 -->
			<position :forfrom="togetFrom" prop="buyaddress" text="取货地址">
				<img src="../assets/imgs/map1.png" slot="icon">
				<img src="../assets/imgs/map1.png" slot="icon1">
				<img src="../assets/imgs/map1.png" slot="icon2">
			</position>
			<!-- 目的地 -->
			<position :forfrom="togetFrom" prop="sendaddress" text="收获地址">
				<img src="../assets/imgs/map2.png" slot="icon">
				<img src="../assets/imgs/map2.png" slot="icon1">
				<img src="../assets/imgs/map2.png" slot="icon2">
			</position>
			<!-- lists -->
				<!-- require -->
			<listone>
				<i class="el-icon-information" slot="icon"></i>
				<span slot="text">物品类型</span>
				<el-form-item slot="data">
					<el-checkbox-group v-model="togetFrom.type">
					  <el-checkbox label="普通" name="type"></el-checkbox>
					  <el-checkbox label="贵重" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</listone>
				<!--  -->
			<div class="card-container thingbox">
	 			<el-row type="flex" justify="space-around">
	 				<el-col :span="3">
	 					<i class="buycar"></i>
	 				</el-col>
	 				<el-col :span="6">
	 					<span class="thingtip">备注信息</span>
	 				</el-col>
	 				<el-col :span="12">
	 					<el-form-item prop="thingtip" class="textareabox">
						    <el-input  type="textarea" resize="none" :rows="2" v-model="togetFrom.thingtip"   placeholder=" 填写商品信息" :maxlength="36"></el-input>
						    <p class="length-tip">{{lengthTip}}</p>
						</el-form-item>
	 				</el-col>
	 			</el-row>
			</div>
				<!-- phone -->
			<listone>
				<img src="../assets/imgs/phone2.png" slot="icon">
				<span slot="text">电话号码</span>
				<el-form-item slot="data">
					<el-form-item prop="phoneNumber" ref="phoneNumber">
				  		<el-input type="number" v-model.number="togetFrom.phoneNumber" size="small"></el-input>
				  </el-form-item>
				</el-form-item>
			</listone>
				<!-- price -->
			<listone>
				<img src="../assets/imgs/price.png" slot="icon">
				<span slot="text">商品价格</span>
				<el-form-item slot="data">
					<el-form-item prop="price" ref="price">
				  		<el-input type="number" v-model.number="togetFrom.price" size="small"></el-input>
				  </el-form-item>
				</el-form-item>
			</listone>
			
			<el-button type="danger" class="submitBtn" @click="submitFun">提交订单</el-button>
		</el-form>
	</div>
</template>

<script>
import RunHeader from '@/components/runHeader'
import Position from '@/components/position'
import Listone from '@/components/Listone'

export default{
data () {
	var phoneCheck = function(rule, value, callback){
		if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))){
	        callback(new Error('请输入密码'));
		}else{
			callback();
		}
	}
	return{
		things:[],
		thing:'',
		togetFrom:{
			buyaddress:{},
			sendaddress:{},
			type:[],
			thingtip:'',
			phoneNumber:this.$store.state.userinfo.phone,
			price:'',
		},
		rules:{
		  thingtip: [
            { required: true, message: '请填写商品信息'}
          ],
          phoneNumber: [
          	{ required: true, message: '必须填写'},
			{ validator: phoneCheck, message: '请输入正确的号码', trigger: 'blur' }
          ],
		  price: [
		  	{ required: true, message: '必须填写'},
		  ]
		},
	}
},
computed: {
	lengthTip () {
		return this.togetFrom.thingtip.length+'/36';
	}
},
components:{
	RunHeader,
	Position,
	Listone
},
mounted:function(){
	
},
methods:{
	submitFun(){
		this.$refs.togetFrom.validate((valid) => {
			if (valid) {
			alert('submit!');
			} else {
			console.log('error submit!!');
			return false;
			}
    	})
	}
}
}
</script>

<style scoped lang="less">
  .thingbox{
  	height: 4.2rem;
	.thingtip{
		display: block;
		padding-right: .5rem;
		line-height: 3rem;
		margin-top:.5rem;
		border-right:1px solid #DBD5D5;
		font-size: .8rem;
	}
  	.buycar{
	  	display: block;
	  	width: 2rem;
	  	height: 2rem;
	  	margin-top:1rem;
	  	background: url('../assets/imgs/cart.png')center center no-repeat;
	  	background-size: 100% 100%;
	  }
	  .textareabox{
	  	height: 2rem;
	  	margin-top: .5rem;
	  }
	  .length-tip{
	  	font-size: .8rem;
	    line-height: 1;
	    padding-top: 4px;
	    top: 100%;
	    color: #B7B3B3;
	    position: absolute;
	    right: 5px;
	    bottom: 0;
	  }
  }
  img{width: 100%;}
  .submitBtn{
  	width: 100%;
  	min-height: 3rem;
  	margin-top: .5rem;
  	font-size: 1rem;
  	letter-spacing: .2rem;
  }
</style>