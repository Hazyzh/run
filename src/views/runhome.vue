<template>
	<div>
		<run-header>
			<router-link to="/userinfo" slot="back"><img  class="userinfo" src="../assets/imgs/icon_user.png"></router-link>
		</run-header>
		<banner></banner>
		<div class="user-list">
			<el-row :gutter="10">
			  <el-col :xs="11" :push="1"><router-link to="/tobuy"><img src="../assets/imgs/use_tp1.png"></router-link></el-col>
			  <el-col :xs="11" :push="1"><router-link to="/tosend"><img src="../assets/imgs/use_tp2.png"></router-link></el-col>
			  <el-col :xs="11" :push="1"><router-link to="/toqueue"><img src="../assets/imgs/use_tp3.png"></router-link></el-col>
			  <el-col :xs="11" :push="1"><router-link to="/toget"><img src="../assets/imgs/use_tp4.png"></router-link></el-col>
			</el-row>
		</div>
		<div class="user-list function-list">
			<hr>
			<el-row :gutter="20" type="flex" justify="space-between">
			  <el-col :xs="6">
				  <router-link to="/toorderList">
					  <img src="../assets/imgs/use_benefit2.png">
					  <p>发货记录</p>
				  </router-link>
			  </el-col>
			  <el-col :xs="6">
				  <router-link to="/toorderList">
				  	<img src="../assets/imgs/use_benefit3.png">
				  	 <p>收货记录</p>
				  </router-link>
			  </el-col>
			  <el-col :xs="6">
				  <router-link to="/coupon">
					  <img src="../assets/imgs/use_benefit4.png">
					  <p>充值优惠</p>
				  </router-link>
			  </el-col>
			  <el-col :xs="6">
				  <router-link to="/coupon">
				  	<img src="../assets/imgs/use_benefit5.png">
				  	<p>口令优惠卷</p>
				  </router-link>
			  </el-col>
			</el-row>
		</div>
		<br><br>

		<el-dialog v-model="dialogFormVisible" size="large" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
		  <el-form :model="loginFrom" :rules="rules" ref="loginFrom" class="login-form">
			<h3>登 录</h3>
			  <el-form-item label="手机号码" prop="phoneNumber" ref="phoneNumber">
			  	<el-input type="number" v-model.number="loginFrom.phoneNumber" size="large"></el-input>
			  </el-form-item>
			  <el-form-item label="验证码" prop="code" class="phonecode">
			  	<el-input v-model="loginFrom.code" size="large"></el-input>
			  	<el-button type="primary" class="getcode" @click="getCode('phoneNumber')" :disabled="counttime!=0">{{getCodetext}}</el-button>
			  </el-form-item>
			  <hr>
			  <el-button size="large"><router-link to="/login">注 册</router-link></el-button>
			  <el-button type="danger" size="large" @click="submitFun('loginFrom')">确认登录</el-button>
		  </el-form>
		</el-dialog>
	</div>
</template>

<script>
import RunHeader from '@/components/runHeader'
import Banner from '@/components/banner'
import { MessageBox } from 'mint-ui';

export default{
	data () {
		var phoneCheck = function(rule, value, callback){
			if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))){
		        callback(new Error('请输入密码'));
			}else{
				callback();
			}
		}
		return {
			dialogFormVisible:true,
			loginFrom:{},
			counttime:0,
			rules:{
	          phoneNumber: [
	          	{ required: true, message: '必须填写'},
				{ validator: phoneCheck, message: '请输入正确的号码', trigger: 'blur' }
	          ],
	          code:[
	          	{ required: true, message: '必须填写'}
	          ]
			},
		}
	},
	components:{
		RunHeader,
		Banner
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
		getCode(formName){
			this.$refs[formName].validate();
			if((/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.loginFrom.phoneNumber))){
				// 发送短信验证请求
				this.$http({
			    	method:'post',
			    	body:{phone:this.loginFrom.phoneNumber},
			        url:'/hx160803/tp/index.php/home/User/phoneCode',
			    }).then(function(data){
			    	if(data.body==1){
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
			    	}else {
						alert('失败');
			    	}
			    })
			}
	    },
	    submitFun(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//注册按钮
					this.$http({
				    	method:'post',
				    	body:this.$refs[formName].model,
				        url:'/hx160803/tp/index.php/home/user/logT',
				    }).then(function(data){
				    	var info = data.body;
						this.$store.commit('login', info['token']);
						this.$store.state.userinfo = info;
						MessageBox('登录成功');
						this.dialogFormVisible = false;
				    })
				} else {
				// console.log('error submit!!');
				return false;
				}
	    	})
    	}
	},
	mounted () {
    	if(this.$store.state.token){
    		this.dialogFormVisible = false;
    	}
    }
}
</script>

<style scoped>
.userinfo{
	vertical-align: middle;
}
.user-list img{
	width: 100%;
}
.function-list .el-col{
	margin-top:.6rem;
	border-right:1px dashed #CFCFCF;
}
.function-list .el-col:nth-child(4){
	border-right:none;
}
p{
	font-size: .6rem;
}
.function-list{
	width: 90%;
	margin: auto;
}
hr{
	margin-bottom:1rem;
}
.getcode{
		float: right;
		margin-top:.3rem;
	}
</style>