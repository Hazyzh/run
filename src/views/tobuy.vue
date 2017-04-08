<template>
	<div>
		<run-header></run-header>
		<div class="card-container">
			<el-row type="flex" class="row-bg" justify="space-around">
			 	<el-col :span="5" v-for="item in things" :key="item.name">
			 		<div @click="chooseThing(item)" :class="['grid-content',{active:item.isActive}]">{{item.name}}</div>
			 	</el-col>
			</el-row>
		</div>
		<el-form :model="formInline" ref="formInline" :rules="rules">
 			<div class="card-container thingbox">
	 			<el-row type="flex" justify="space-around">
	 				<el-col :span="3">
	 					<i class="buycar"></i>
	 				</el-col>
	 				<el-col :span="6">
	 					<span class="thingname">{{thing}}</span>
	 				</el-col>
	 				<el-col :span="12">
	 					<el-form-item prop="thingname" class="textareabox">
						    <el-input  type="textarea" resize="none" :rows="2" v-model="formInline.thingname"   placeholder=" 填写购买商品信息" :maxlength="36"></el-input>
						    <p class="length-tip">{{lengthTip}}</p>
						</el-form-item>
	 				</el-col>
	 			</el-row>
			</div>
			<!-- 出发地 -->
			<position :forfrom="formInline" prop="buyaddress" text="购买地址">
				<img src="../assets/imgs/map1.png" slot="icon">
				<img src="../assets/imgs/map1.png" slot="icon1">
				<img src="../assets/imgs/map1.png" slot="icon2">
			</position>
			<!-- 目的地 -->
			<position :forfrom="formInline" prop="sendaddress" text="送货地址">
				<img src="../assets/imgs/map2.png" slot="icon">
				<img src="../assets/imgs/map2.png" slot="icon1">
				<img src="../assets/imgs/map2.png" slot="icon2">
			</position>
			<!-- lists -->
				<!-- require -->
			<listone>
				<i class="el-icon-information" slot="icon"></i>
				<span slot="text">特殊要求</span>
				<el-form-item slot="data">
					<el-checkbox-group v-model="formInline.type">
					  <el-checkbox label="保价" name="type"></el-checkbox>
					  <el-checkbox label="保温" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</listone>
				<!-- phone -->
			<listone>
				<img src="../assets/imgs/phone2.png" slot="icon">
				<span slot="text">联系电话</span>
				<el-form-item slot="data">
					<el-form-item prop="phoneNumber" ref="phoneNumber">
				  		<el-input type="number" v-model.number="formInline.phoneNumber" size="small"></el-input>
				  </el-form-item>
				</el-form-item>
			</listone>
				<!-- price -->
			<listone>
				<img src="../assets/imgs/price.png" slot="icon">
				<span slot="text">商品价格</span>
				<el-form-item slot="data">
					<el-form-item prop="price" ref="price">
				  		<el-input type="number" v-model.number="formInline.price" size="small"></el-input>
				  </el-form-item>
				</el-form-item>
			</listone>
					<!-- price -->
			<listone>
				<img src="../assets/imgs/price.png" slot="icon">
				<span slot="text">跑男佣金</span>
				<el-form-item slot="data">
					<el-form-item prop="commission" ref="commission">
				  		<el-input type="number" v-model.number="formInline.commission" size="small"></el-input>
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
import { MessageBox } from 'mint-ui';

export default{
data () {
	var phoneCheck = function(rule, value, callback){
		if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(value))){
	        callback(new Error('请输入密码'));
		}else{
			callback();
		}
	}
	return{
		things:[],
		thing:'',
		formInline:{
			thingCategory:'',
			thingname:'',
			buyaddress:{},
			sendaddress:{},
			type:[],
			phoneNumber:this.$store.state.userinfo.phone,
			price:'',
			commission:'',
			token:this.$store.state.token
		},
		rules:{
		  thingname: [
            { required: true, message: '请填写购买信息'}
          ],
          phoneNumber: [
          	{ required: true, message: '必须填写'},
			{ validator: phoneCheck, message: '请输入正确的号码', trigger: 'blur' }
          ],
		  price: [
		  	{ required: true, message: '必须填写'},
		  ],
		  commission : [
			{ required: true, message: '必须填写'},
		  ]
		},
	}
},	
components:{
	RunHeader,
	Position,
	Listone
},
computed: {
	lengthTip () {
		return this.formInline.thingname.length+'/36';
	}
},
mounted:function(){
	var _this = this;
	var data = [
	{name:'随意购',isActive:true},
	{name:'买咖啡',isActive:false},
	{name:'买香烟',isActive:false},
	{name:'买酒',isActive:false},
	{name:'买早餐',isActive:false},
	{name:'买宵夜',isActive:false},
	{name:'买药品',isActive:false},
	{name:'买水果',isActive:false},
	];
	this.things=data;
	this.thing = data[0].name;
	this.formInline.thingCategory = this.thing;
},
methods:{
	chooseThing(item){
		this.thing = item.name;
		this.things.forEach((a)=>{
			a.isActive = false;
		})
		item.isActive = true;
		this.formInline.thingCategory = item.name;
	},
	submitFun(){
		this.$refs.formInline.validate((valid) => {
			if (valid) {
				MessageBox.confirm('请确认下单').then(action => {
					if(action=='confirm'){
						this.$http({
					    	method:'post',
					    	body:{data:window.JSON.stringify(this.formInline)},
					        url:'/hx160803/tp/index.php/admin/prot/order',
					    }).then(function(data){
					    	if(data.body!=0){
								MessageBox.alert('下单成功,请等待跑男接单!').then(action => {
								 	this.$router.push({ path: `/toorderInfo/${data.body}`});
								});
					    	}else{
					    		alert('下单失败');
					    	}
					    })
					}
				});				
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
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  img{width: 100%;}
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
  	 background: #F5F5F5;
    border-radius: 4px;
    margin-top:.4rem;
    min-height: 2.2rem;
    line-height: 2rem;
  }
  .row-bg {
    padding: 10px 0;
    flex-wrap:wrap;
  }

  // 选中
  .active{
  	border:1px solid #F1674A;
  	position: relative;
  	background: #F0FFFF;
  }
  .active:after{
  	font-family:element-icons!important;
  	content:"\e608";
  	font-size: 12px;
  	color: #fff;
  	background:#F1674A;
  	width: 20px;height: 20px;
  	border-radius: 50%;
  	line-height: 20px;
	position: absolute;
	right: -5px;
	bottom: -5px;
  }
  
  .thingbox{
  	height: 4.2rem;
	.thingname{
		display: block;
		padding-right: .5rem;
		line-height: 3rem;
		margin-top:.5rem;
		border-right:1px solid #DBD5D5;
		font-size: 1rem;
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
  .submitBtn{
  	width: 100%;
  	min-height: 3rem;
  	margin-top: .5rem;
  	font-size: 1rem;
  	letter-spacing: .2rem;
  }
</style>