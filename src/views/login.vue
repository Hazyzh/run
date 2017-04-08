<template>
<div>
	<el-card class="city-card" ref="citysbox" v-show="checkCity">
	  <div slot="header">
	    <span style="line-height: 20px;">已开通城市</span>
	  </div>
	  <mt-index-list>
		  	<mt-index-section v-for="o in citys" :index="o.name | uppercase" key="1">
				    <mt-cell v-for="city in o.city" :title="city" @click.native="chooseCity(city)" key="1"></mt-cell>
			</mt-index-section>
	</mt-index-list>
	</el-card>
	<el-form :model="loginFrom" :rules="rules" ref="loginFrom" class="login-form">
		<h3>注册</h3>
		<el-card class="box-card">
		  <el-form-item label="所在城市" prop="name">
		  	<el-input v-model="loginFrom.name" size="large" v-on:focus="showCity" readonly="readonly"></el-input>
		  </el-form-item>
		  <el-form-item label="手机号码" prop="phoneNumber" ref="phoneNumber">
		  	<el-input type="number" v-model.number="loginFrom.phoneNumber" size="large"></el-input>
		  </el-form-item>
		  <el-form-item label="验证码" prop="code" class="phonecode">
		  	<el-input v-model="loginFrom.code" size="large"></el-input>
		  	<el-button type="primary" class="getcode" @click="getCode('phoneNumber')" :disabled="counttime!=0">{{getCodetext}}</el-button>
		  </el-form-item>
		  <hr>
		  <el-button type="danger" size="large" @click="submitFun('loginFrom')">确认注册</el-button>
		</el-card>
	</el-form>

</div>
</template>

<script>
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
		citys:[],
		checkCity:false,
		counttime:0,
		loginFrom:{
		},
		rules:{
		  name: [
            { required: true, message: '请选择城市'}
          ],
          phoneNumber: [
          	{ required: true, message: '必须填写'},
			{ validator: phoneCheck, message: '请输入正确的号码', trigger: 'blur' }
          ],
          code:[
          	{ required: true, message: '必须填写'}
          ]
		}
	}
},
computed:{
	getCodetext(){
		if(this.counttime==0){
			return '获取验证码';
		}else{
			return `${this.counttime}秒后重新获取`;
		}
	}
},
methods:{
	showCity(){
		this.$http({
	    	method:'post',
	        url:'/hx160803/tp/index.php/admin/city/getCity',
	    }).then(function(data){
	    	for(var i=0;i<data.body.length;i++){
	    		data.body[i].isActive = !i?true:false;
	    	}
			this.citys = data.body;
			this.checkCity = true;
	    })
	},
	chooseCity(city){
		this.checkCity = false;
		this.loginFrom.name = city;
	},
	getCode(formName){
		this.$refs[formName].validate();
		if((/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.loginFrom.phoneNumber))){
			// 发送短信验证请求
		this.$http({
	    	method:'post',
	    	body:{phone:this.loginFrom.phoneNumber},
	        url:'/hx160803/tp/index.php/home/User/ckPhoneCode',
	    }).then(function(data){
	    	if(data.body==2){
	    		this.counttime = 60;
	    		var _this = this;
	    		var fun = function(){
	    			setTimeout(()=>{
	    				if(_this.counttime>0){
	    					_this.counttime--;
	    					fun();
	    				}						
		    		},1000)
	    		}
	    		fun();
	    	}else if(data.body==1){
				alert('失败');
	    	}else if(data.body==0){
	    		MessageBox('提示', '手机号码已经被注册')
	    	}
	    })
		}else{
			MessageBox('提示', '请输入正确的手机号码')
		}
    },
    submitFun(formName){
		this.$refs[formName].validate((valid) => {
			if (valid) {
				//注册按钮
				this.$http({
			    	method:'post',
			    	body:this.$refs[formName].model,
			        url:'/hx160803/tp/index.php/home/User/phoneCheck',
			    }).then(function(data){
			    	var token = data.body;
			    	// console.log(token);
			    	if(token!=0){
			    		window.localStorage.setItem('token',token);
						this.$store.commit('login', token);
						this.$router.push({ path: '/Runhome' })
			    	}else{
			    		alert('验证码错误');
			    	}
			    })
			} else {
			// console.log('error submit!!');
			return false;
			}
    	})
    }
},
filters:{
	uppercase(value){
	  if (!value) { return ''}
	  value = value.toString()
	  return value.toUpperCase();
	}
},
mounted:function(){
}
}
</script>

<style scoped lang="less">
	.login-form{
		width: 80%;
		margin: auto;

	}
	.city-card{
		position: absolute;
		width: 90%;
		left: 0;right: 0;
		margin: auto;
		z-index: 999;
		text-align: left;
		height: 100%;
		overflow-y: scroll;
		ul{
			list-style: none;
		}
		li{
			display: block;
			background: #eee;
			margin-bottom: .3rem;
			line-height: 2rem;
			text-indent: 1rem;
		}
		.tip,hr{margin-top: 1rem;line-height: 2rem;}
	}
	.hash-key{
		position: fixed;
		right: 10%;
		top: 0;bottom: 0;
		height: 0;
		margin: auto;
		ul{	
			height: auto;
			list-style: none;
		}
		li{
			line-height: 1;
			margin: .1rem 0;
			text-indent: 0;
			text-align: center;
			a{	
				font-size: .6rem;
				display: block;
				background: #999;
				border-radius: 50%;
				color: #eee;
				padding: .3rem;
			}
		}
	}
	.active{
		background: orange !important;
	}
	.getcode{
		float: right;
		margin-top:.3rem;
	}
</style>