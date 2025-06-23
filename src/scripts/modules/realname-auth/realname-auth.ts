import { Component, Vue, Ref } from "vue-facing-decorator"
import { useStore } from "vuex"
import { realName, queryRealName } from "@/network/api/user"
import i18n from "@/lang"
import { Success, Warn } from "@/util/common";
///	@ts-ignore
import QRCode from 'qrcodejs2-fix';
import { nextTick } from 'vue'

@Component
export default class RealnameAuth extends Vue
{
	public t = i18n.global.t
	public store = useStore()

	public get userInfoExt() { return this.store.state.userInfoExt }
	public get hasLogin() { return this.store.getters.hasLogin }

	///	是否已经实名认证
	public get hasReal() { return this.hasLogin && this.userInfoExt.idNumber != '' && this.userInfoExt.realname != '' }
	///	提示信息的弹窗状态
	public get showTip() { return this.store.state.showRealnameView && !this.hasReal }

	///	认证表单控制
	public diagReal: boolean = false
	// public hasReal: boolean = false
	public set hasReal(val) {this.hasReal = val}

	///	提交状态
	public submiting: boolean = false

	public inputRealContent =
	{
		realName: this.userInfoExt.realName,
		idNumber: this.userInfoExt.idNumber 
	}

	public QRCodeUrl: string = ''
	public intervalID: any = 0

	@Ref
	public qrCodeDivRef: any = null
	public QRCodeShow: boolean = false

	///	关闭提示
	public closeTip()
	{
		this.store.commit( 'setRealnameView', false )
		this.store.commit( 'setRechargeView', false )
	}

	///	确认提示
	public confirmTip()
	{
		this.closeTip()
		this.diagReal = true
	}

	/**
	 * 提交实名信息
	 */
	public async confirmRealName() {
		if( this.submiting ) return

		let params = {
			realName: this.inputRealContent.realName,
			idNumber: this.inputRealContent.idNumber,
		}

		// this.submiting = true
		let res = await realName( params )
		// this.submiting = false
		if( res.code != 0 ) return 

		// if( res.code == 0 )
		// {
		// 	this.store.dispatch( 'getUserInfo' )
		// 	this.diagReal = false
		// 	// this.hasReal = true

		// 	if( res.data.rewardAmount && res.data.rewardAmount > 0 )
		// 		window.Success( this.t( 'users.realnameRewardTip',{num: res.data.rewardAmount} ) )
		// }

		this.QRCodeUrl = res.data.verifyUrl
		this.QRCodeShow = true

		this.diagReal = false
		window.$dev && console.log( "this.QRCodeUrl链接的值为",this.QRCodeUrl )
		this.createQRCode( this.QRCodeUrl )

		nextTick( () => {
			 this.intervalID = setInterval( this.queryReal, 5000 )
		} )

		return window.$dev && console.log( res )
	}

		/// 创建二维码
	public async  createQRCode(v: string)
	{
		await nextTick()
		this.qrCodeDivRef.innerHTML = '';
		window.$dev && console.log( "进入创建二维码方法",this.qrCodeDivRef )
		new QRCode( this.qrCodeDivRef, {
			text: v,
			width: 182,
			height: 182,
			colorDark: "#000", //二维码颜色
			colorLight: "#fff", //二维码背景色
			correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
		} )
		window.$dev && console.log( "下 this.qrCodeDivRef链接的值为",this.qrCodeDivRef )
	}

	/// 验证实名情况
	public async queryReal()
	{
		let res = await queryRealName()

		if (res.code == 0 ) {

			if( res.data.state == 1 )
			{
				clearInterval( this.intervalID )
				this.store.dispatch("getUserInfo")
				this.diagReal = false;
				this.QRCodeShow = false
				this.hasReal = true;
				if (res.data.rewardAmount && res.data.rewardAmount > 0) {
					Success( { offset : 100, message : '实名认证成功 获得' + res.data.rewardAmount + '个金币！' } );
				}
			}
			else if( res.data.state == 2 )
			{
				Warn( { offset : 100, message : this.t( 'users.realnameFail' ), customClass : 'error' } )
			}
		}else{

		}
	}

	public closeQRcodeDialog()
{
	this.QRCodeShow = false
	clearInterval( this.intervalID )
	if( !this.hasReal ) this.diagReal = true
}
}