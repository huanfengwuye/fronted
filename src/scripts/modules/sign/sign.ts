import { Component, Vue, Ref, Watch } from 'vue-facing-decorator'
import { useStore } from "vuex"
import { getUUID, getDeviceType } from "@/util/common"
import { re } from "mathjs"
import { login, getVerifyCode, register, forgotPassword } from "@/network/api/login"
import DragVerify from "@/components/pc/common/DragVerify.vue"
import i18n from "@/lang"

@Component({
	components: { DragVerify }
})
export default class Sign extends Vue
{
	public t = i18n.global.t

	public store = useStore()

	public get showSignView() { return this.store.state.showSignView }
	public get showSignViewTab() { return this.store.state.showSignViewTab }
	public agreementChecked = true
	public signType = 'account' 		// account tel
	public remember = false
	public accountSign: any = {
		account: "",
		password: "",
		mobile: "",
		inviteCode: "",
		nickname: "",
		verifyCode: "",
	}

	// public telSign = {
	// 	tel: "",
	// 	verifyCode: "",
	// }

	// public countDownVal = null
	// public countDownTel = true
	// public countDownTelText = "发送"

	public regcountDownVal = null
	public regcountDownTel = true
	public regcountDownTelText = this.t( 'sign.send' )

	// public verificationRef = null
	// public verificationShow = false

	// public telReg = {
	// 	tel: "",
	// 	verifyCode: "",
	// 	password: "",
	// 	name: "",
	// 	inviteCode: "",
	// }
	public inputInviteAbled = false

	// public formatterInvite = (value) => value.toUpperCase();
	// public tabType = 1); //1-login 2-reg

	public showPwd = false 			///	是否显示密码
	public errorMsg = '' 			///	错误信息
	public showErrorMsg = false 	///	错误显示状态
	public sending = false 			///	验证码发送状态

	public intervalId = 0; 			///	计时器

	public countDownVal = 120 		///	倒计时
	public countDownText = this.t( 'sign.getVCode' )
	public sended = false 			///	验证码是否已经发送

	public accountError = false 	///	账号错误标识
	public passwordError = false 	///	密码错误标识
	public mobileError = false		///	手机号码错误标识
	public verifyCodeError = false	///	验证吗错误标识
	public dragVerifyError = false	///	滑动验证错误标识
	// public nicknameError =  false )		///	昵称格式错误

	@Ref()
	public account: null | HTMLElement = null 			///	refs
	@Ref()
	public password: null | HTMLElement = null
	@Ref()
	public mobile: null | HTMLElement = null
	@Ref()
	public verifyCode: null | HTMLElement = null

	public dragVerify = null
	public nickname = null

	@Ref()
	public signContainer: null | HTMLElement = null

	public type = "login" 			///	当前类型
	public country = "china" 		///	当前选中的国家
	public type2 = "login"          /// 需要打开的弹窗类型
	public showDragVerify = false 	///	是否显示拖拽组建
	public isPassing = false

	/**
	 * 检测账号和密码输入情况
	 */
	public checkInput()
	{
		this.accountSign.account = this.accountSign.account.replace( /[^\d]/g, "" )
		this.accountSign.mobile = this.accountSign.mobile.replace( /[^\d]/g, "" )

		if(  !/^1\d{10}$/.test(this.accountSign.mobile) || this.accountSign.password.length < 6 ) 
		{
			this.isPassing = false
			return this.showDragVerify = false
		}

		return this.showDragVerify = true
	}

	/**
	 * 重设账号信息
	 * @returns object
	 */
	public resetData()
	{
		this.accountSign = {
			account: "",
			password: "",
			mobile: "",
			inviteCode: "",
			verifyCode: "",
			nickname: "",
		};
		this.showDragVerify = false;
		this.showErrorMsg = false;

		this.errorMsg = "";

		this.isPassing = false;
		this.sended = false;
		this.sending = false;

		this.accountError = false;
		this.passwordError = false;
		this.mobileError = false;
		this.verifyCodeError = false;
		this.dragVerifyError = false;
	}

	/**
	 * 获取模块标题头
	 * @returns string 账号名称
	 */
	public getTitle()
	{
		switch( this.type )
		{
			default:
			case "login":
				return this.t( 'sign.loginTitle' );

			case "forget":
				return this.t( 'sign.forgetPassword' );

			case "register":
				return this.t( 'sign.registerTitle' );
		}
	}

	public dragResult( val: boolean )
	{
		this.isPassing = val;
	}

	/**
	 * 切换类型
	 * @param module string 调用的模块类型名称
	 */
	public changeType( module: string )
	{
		this.type = module;
		switch( module )
		{
			case "login":
				( <HTMLElement>this.signContainer )!.style.top = `calc( 50% - 493px / 2 )`;
				break;

			case "register":
				( <HTMLElement>this.signContainer ).style.top = `calc( 50% - 624px / 2 )`;
				break;

			case "forget":
				( <HTMLElement>this.signContainer ).style.top = `calc( 50% - 454px / 2 )`;
				break;
		}
		this.resetData()
		this.initInviteCode()
	}

	/**
	 * 发送验证码
	 */
	public async sendSMS()
	{
		if( this.sending ) return
		if( !this.checkMobile() || !this.checkPassword() ) return
		if( !this.checkDragResult() ) return

		let params: any = {}
			params.mobile = this.accountSign.mobile
			params.type = 1;
			params.platformId = this.store.state.platformId;
			params.graphicId = "eBsJRDsthDQ0u22GRudJ"; ///	无效值，占位用
			params.graphicCode = "";
			params.isRegister = this.type == "register";

		const res = await getVerifyCode(params);
		if( res.code != 0) return;

		this.sended = true;
		this.sending = true;
		this.verifyCode?.focus()
		this.countDownText = this.t( 'sign.countDown', { sec : this.countDownVal } )

		this.intervalId = setInterval(() => {
			if( this.countDownVal == 0) {
				this.sending = false;
				this.countDownText = this.t( 'sign.getVCode' )
				clearInterval( this.intervalId )
				this.countDownVal = 120
			} else {
				this.countDownVal--;
				this.countDownText = this.t( 'sign.countDown', { sec : this.countDownVal } )
			}
		}, 1000);
	}

	/**
	 * 监听一下显示状态用来还原值
	 */
	@Watch( 'showSignView' )
	public async signView( val: any )
	{
		if( val )
		{
		console.log( 'showSignView', val )

			this.type = this.type2
			await this.resetData()
			this.initInviteCode()

		}
	}

	@Watch( 'showSignViewTab' )
	public signViewTab( val: any )
	{
		this.type2 = val
	}

	// watch(
	// 	() => this.store.state.showSignViewTab,
	// 	(newTab: any, pretab: any) => {
	// 		tabthis.Type = newTab;
	// 	}
	// );

	public mounted()
	{
		if( localStorage.getItem( "login_account" ) )
		{
			this.remember = true;
			this.accountSign = JSON.parse( <string>localStorage.getItem( "login_account" ) )
		}
		this.initInviteCode()
	}

	public initInviteCode()
	{
		if( localStorage.getItem( 'mskins_fcode' ) )
		{
			this.accountSign.inviteCode = localStorage.getItem( 'mskins_fcode' )
			this.inputInviteAbled = true
		}
		// if( this.$route.query.code )
		// {
		// 	this.accountSign.inviteCode = this.$route.query.code
		// }
		// else
		// {
		// 	let query: any = { code: "" }
		// 	location.search
		// 		.substring(1)
		// 		.split("&")
		// 		.forEach( item => {
		// 			query[ item.split( "=" )[0] ] = item.split( "=" )[1]
		// 		});
		// 	this.accountSign.inviteCode = localStorage.getItem( 'mskins_fcode' )//query.code
		// }

		// if( this.accountSign.inviteCode != "" )
		// 	this.inputInviteAbled = true
	}

	// public switchSignType(str) {
	// 	signthis.Type = str;
	// }

	public onClickClose()
	{
		this.store.commit( "setSignView", false )
		this.store.commit( "setRegPacket", {
			closeRed: false,
			openRed: false,
			leftSmall: true,
			money: 0,
		})
	}

	/**
	 * 显示错误消息
	 * @param msg string 错误提示
	 */
	public showError(msg: string)
	{
		this.errorMsg = msg
		this.showErrorMsg = true
		this.hideError()
	}

	/**
	 * 隐藏错误消息
	 */
	public hideError()
	{
		setTimeout(() => {
			this.showErrorMsg = false;
			this.accountError = false;
			this.passwordError = false;
		}, 5000)
	}

	public async onAccountReset() {
		if( !this.checkMobile() || !this.checkPassword() || !this.checkDragResult() || !this.checkVerifyCode() )
			return

		let params: any = {}
			params.mobile = this.accountSign.mobile
			params.platformId = this.store.state.platformId;
			params.password = this.accountSign.password;
			params.type = 1;
			params.verifyCode = this.accountSign.verifyCode;

		const res = await forgotPassword(params);
		if( res.code === 0 )
		{
			window.Success( res.message )
			this.changeType( "login" )
		}
	}

	public async onAccountRegister() {
		if( !this.checkMobile() || !this.checkPassword() || !this.checkDragResult() || !this.checkVerifyCode() || !this.checkAgreement() )
			return;

		let vid = localStorage.getItem( 'wx_vid' ) ? localStorage.getItem( 'wx_vid' ) : localStorage.getItem( 'bd_vid' )

		let params: any = {}
			params.mobile = this.accountSign.mobile
			params.hdCode = getUUID();
			params.hdType = getDeviceType();
			params.inviteCode = this.accountSign.inviteCode;
			params.nickName = this.accountSign.name;
			params.platformId = this.store.state.platformId;
			params.password = this.accountSign.password;
			params.type = 1;
			params.verifyCode = this.accountSign.verifyCode;
			params.spreadVid = vid//localStorage.getItem("bd_vid");

		const res = await register(params);
		if( res.code === 0 )
		{
			window.Success( res.message )
			this.accountSign.account = this.accountSign.mobile
			this.onAccountLogin()
		}
	}

	public checkVerifyCode()
	{
		if( this.accountSign.verifyCode.trim() == "" || Number( this.accountSign.verifyCode.trim().length ) != 6 )
		{
			this.showError( this.t( 'sign.vCodeFail' ) )
			this.verifyCodeError = true;
			this.verifyCode?.focus();
			return false;
		}
		return true;
	}

	public checkDragResult()
	{
		window.$dev && console.log( this.isPassing )
		if( !this.isPassing) {
			this.showError( this.t( 'sign.dropFail' ) )
			this.dragVerifyError = true;
			return false;
		}
		return true;
	}

	public checkMobile()
	{
		if( !/^1\d{10}$/.test( this.accountSign.mobile ) )
		{
			this.showError( this.t( 'sign.accountFormatFail' ) );
			this.mobileError = true;
			this.mobile?.focus();
			return false;
		}
		return true;
	}

	public checkAccount() {
		if( !/^1\d{10}$/.test(this.accountSign.account)) {
			this.showError( this.t( 'sign.accountFormatFail' ) );
			this.accountError = true;
			this.account?.focus();
			return false;
		}
		return true;
	}

	public checkPassword()
	{
		if( this.accountSign.password.length < 6) {
			this.showError( this.t( 'sign.passwordToShort' ) );
			this.passwordError = true;
			this.password?.focus();
			return false;
		}

		if( this.accountSign.password.length > 16) {
			this.showError( this.t( 'sign.passwordTooLong' ) );
			this.passwordError = true;
			this.password?.focus();
			return false;
		}
		return true;
	}

	public checkAgreement()
	{
		if( !this.agreementChecked )
		{
			this.showError( this.t( 'sign.checkAgreementAndPrivacy' ) )
			return false
		}
		return true;
	}

	///	账号登录
	public async onAccountLogin() {
		if( !this.checkAccount() || !this.checkPassword() || !this.checkAgreement()) return;

		let params: any = {};
			params.account = this.accountSign.account
			params.platformId = this.store.state.platformId;
			params.password = this.accountSign.password;
			params.type = 2;
		// console.log( params, this.accountSign, /^\d{9}$/.test(this.accountSign.mobile) )

		const res = await login(params);
		if( res.code === 0) {
			window.Success({ offset: 100, message: '登陆成功' });
			this.onLoginSuc(res.data);
			this.rememberPW();
		}
	}

	public onLoginSuc( data: { token: any } )
	{
		this.store.commit("setLoginInfo", data)
		this.store.dispatch("getUserInfo");
		this.store.dispatch("initModuleList");
		// this.store.dispatch("getNewYourConfig");
		this.store.commit("setSignView", false);
		this.store.commit("setSwitchNotice", true);
		this.store.commit("setActivityDialogVisible", true);
		
		window.ws.send( JSON.stringify( {
			cid : 11,
			data : { token : data.token }
		} ) )
		// Window.webSocketSend({
		//	 cid: 11,
		//	 data: JSON.stringify({ token: data.token }),
		// });
	}

	public toRoute(path: any)
	{
		this.$router.push(path);
		this.store.commit("setSignView", false);
	}

	public rememberPW()
	{
		if( this.remember )
			localStorage.setItem("login_account", JSON.stringify(this.accountSign));
		else
			localStorage.removeItem("login_account")
	}

	//账号格式验证
	public validatorAccount(val: string)
	{
		// if( /^(\\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/.test(val)) {
		if( /^1\d{10}$/.test(val))
		{
			return true;
		}
		else
		{
			if( 
				/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val)
			) {
				return true;
			} else {
				if( /^[A-Za-z]{2}\d{6}$/.test(val)) {
					return true;
				} else {
					if( /^jiqiren\d+$/.test(val)) {
						return true;
					} else {
						return false;
					}
				}
			}
		}
	}

	//账号格式验证
	public validatorTel(val: string)
	{
		return /^1\d{10}$/.test(val)
	}

	// public onClickTab(tab) {
	// 	tabthis.Type = tab;
	// }

	public submit( e: { key: string } )
	{
		if( e.key == "Enter" && this.type == "login")
			this.onAccountLogin()

		if( e.key == "Enter" && this.type == "register")
			this.onAccountRegister()

		if( e.key == "Enter" && this.type == "forget")
			this.onAccountReset()
	}
}