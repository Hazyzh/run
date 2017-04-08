<template>
	<div>
		<div class="container">
			<div class="adimg"><img src="../../assets/imgs/aaa.png"></div>
			<div class="register-info">
				<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
				<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phonenumber"></mt-field>
				<mt-field label="验证码" v-model="showcode">
				  <el-button @click="fun3"  type="primary">获取验证码</el-button>
				</mt-field>
				<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
				<mt-field label="现居地" placeholder="请填写现在居住地的详细地址" v-model="nowaddress"></mt-field>
				<mt-field label="从事职业" placeholder="请填写从事的职业" v-model="profession"></mt-field>
				<mt-field label="第二联系人" placeholder="请填写联系人的手机号码" v-model="otherphonenumber"></mt-field>
				<i class="line"></i>
				<span class="title">1.个人形象照片</span>
				<el-upload
				  :on-success = "changephoto1"
				  class="upload-demo"
				  action="/hx160803/uploadimg/upload.php"
				  name="imgFile"
				  :multiple = "false"
				  list-type="picture">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">个人形象照片-只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
				<span class="title">2.身份证正面</span>
				<el-upload
				  :on-success = "changephoto2"
				  class="upload-demo"
				  action="/hx160803/uploadimg/upload.php"
				  name="imgFile"
				  :multiple = "false"
				  list-type="picture">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">身份证正面图-只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
				<span class="title">3.身份证反面</span>
				<el-upload
				  :on-success = "changephoto3"
				  class="upload-demo"
				  action="/hx160803/uploadimg/upload.php"
				  name="imgFile"
				  :multiple = "false"
				  list-type="picture">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">身份证反面图-只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
				<i class="line"></i>
				<br>
				<mt-button size="large" type="primary" @click="submit">注册</mt-button>
				<br>
			</div>
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default{
	data () {
		return {
			username:'',
			phonenumber:'',
			password:'',
			showcode:'',
			nowaddress:'',
			profession:'',
			otherphonenumber:'',
			userphoto:'',
			idcardp:'',
			idcardr:'',
		}
	},
	methods:{
		changephoto1(e,file,filelist){
			var url = file.response;
			this.userphoto = url;
			while(filelist.length>1){
				filelist.splice(0,1);
			}
		},
		changephoto2(e,file,filelist){
			var url = file.response;
			this.idcardp = url;
			while(filelist.length>1){
				filelist.splice(0,1);
			}
		},
		changephoto3(e,file,filelist){
			var url = file.response;
			this.idcardr = url;
			while(filelist.length>1){
				filelist.splice(0,1);
			}
		},
		fun3(){
			alert(1);
		},
		submit(){
			var data = {
				username:this.username,
				phonenumber:this.phonenumber,
				password:this.password,
				showcode:this.showcode,
				nowaddress:this.nowaddress,
				profession:this.profession,
				otherphonenumber:this.otherphonenumber,
				userphoto:this.userphoto,
				idcardp:this.idcardp,
				idcardr:this.idcardr,
			}
			this.$http({
		    	method:'post',
		    	body:data,
		        url:'/hx160803/tp/index.php/admin/prot/runmanRegister',
		    }).then(function(data){
		    	if(data.body==1){
		    		MessageBox.alert('请等待审核成功','注册成功');
		    	}else{
		    		MessageBox.alert('请稍候重试','注册失败');
		    	}
		    })	
		}
	}
}
</script>

<style scoped lang="less">
	.mint-header{
		background: #F5F5F5;
		color: #333;
	}
	.adimg{
		line-height: 0px;
	}
	.container{
		height: 100%;
		padding-top: 40px;
		background: #EE5857;
		overflow:hidden;
		.title{
			display: inline-block;
			margin: 10px;
			color: #8492A6;
		}
	}
	.register-info{
		text-align: left;
		margin: 0px 20px 20px 20px;
		padding: 0 10px;
		background: #fff;

	}
	.upload-demo{
		// height: 5rem;
		min-height: 162px;
	}
</style>