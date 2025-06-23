import { Component, Prop, Vue, Emit, Watch } from "vue-facing-decorator";
import i18n from "@/lang"; // 导入国际化语言模块
import ShowDialog from "@/components/h5/common/ShowDialog.vue"; // 引入对话框组件
import goldBig from "@/assets/romimg/turntable/gold.png"; // 大金币图标
import goldSmall from "@/assets/romimg/turntable/goldSmall.png"; // 小金币图标
import laugh from "@/assets/romimg/turntable/laugh.png"; // 笑脸图标
import { getLuckyWheelRewardRecords, luckyWheelLottery } from '@/network/api/activity'; // 导入抽奖相关的网络请求方法
import TopTitleBack from "@/components/h5/common/TopTitleBack.vue"; // 顶部返回标题组件
import { siteUrl } from "@/config"; // 网站配置信息
import useClipboard from "vue-clipboard3"; // 使用剪贴板功能
import { computed, ref, watch } from 'vue'; // 导入 Vue 相关的库
const { toClipboard } = useClipboard(); // 获取剪贴板功能
import router from "@/router"; // 导入路由对象
import { useStore } from "vuex"; // 使用 Vuex
import { NotifyF, NotifyS, Success, _isMobile } from "@/util/common"; // 导入通知相关的工具方法
import { t } from "@/network/axios"; // 导入翻译函数

@Component({
	components: { ShowDialog, TopTitleBack }, // 注册组件
})
export default class TurnTable extends Vue {
	@Prop({ default: false })
	public overallShow!: boolean; // 总体显示状态，从父组件传递而来

	public store = useStore(); // Vuex store 对象
	public siteUrl = siteUrl; // 网站地址

	// 初始化状态变量
	public detailScreenShow: boolean = false; // 详情屏幕显示状态
	public btnActive: boolean = false; // 按钮动画状态
	public pcOverallShow: boolean = false; // PC端总体显示状态
	public btnPrize: boolean = false; // 金币飞散动画状态
	public extractionStatus: boolean = false; // 提取状态
	public grayPopShow: boolean = false; // 灰色弹窗显示状态
	public prizeShow: boolean = false; // 获取金币弹窗显示状态
	public successShow: boolean = false; // 福利页面倒计时显示状态	
	public PcSuccessShow: boolean = false; // PC端福利页面倒计时显示状态	
	public systemAssistance: boolean = false; // 系统助力状态
	public prizePictures: string = ''; // 奖品图片地址
	public countdownEnd: string = ''; // 倒计时结束时间
	public angle: number = 0; // 转盘角度
	public goldSmall: string = goldSmall; // 单个金币图标地址
	public awardId: number = 0; // 奖品类型id
	public awardType: number = 0; // 奖品类型
	public awardAmout: number = 0; // 奖品金额
	public progress: number = 0; // 奖品进度条
	public thankParticipation: boolean = false; // 是否为谢谢参与
	public pcTurntable: boolean = false; // PC端转盘结束状态
	public pcCopyLink: boolean = false; // PC端复制链接状态
	public resRecord: any = ''; // 抽奖记录
	public t = i18n.global.t; // i18n 翻译函数
	public aaa = false; // AAA状态
	public ownerInvitation: string = ''; // 邀请链接

	// 获取是否已登录的状态和邀请码
	public get hasLogin() { return this.store.getters.hasLogin; }
	public get spreadCode() { return this.store.state.userInfoExt.spreadCode; }

	public endTime: any = ''; // 结束时间
	public countdown: any = ''; // 倒计时

	// 倒计时相关变量
	public threeCountdown: number = 3; // 初始倒计时数字
	private countdownInterval: any; // 保存 setInterval 的引用

	// 监听登录状态变化
	@Watch('hasLogin') 
	public async mounted() {
		if(this.hasLogin){
			// this.ownerInvitation = this.siteUrl + "?code=" + this.store.state.userInfoExt.spreadCode;
			// await this.getLuckyWheelRewardRecords();
			// setInterval(() => {
			// 	this.countdown = this.calculateCountdown();
			// }, 1000);
		}
	}

	/**
	 * 监听总体显示状态，用于还原值
	 */
	@Watch('overallShow')
	public async signView(val: any) {
		if (this.overallShow && this.resRecord == null) {
			this.startCountdown();
		}
	}

	// 获取抽奖记录
	public async getLuckyWheelRewardRecords() {
		const res = await getLuckyWheelRewardRecords();
		if (res.code === 0) {
			this.resRecord = res.data.record;
			this.countdownEnd = res.data.endTime.replace(/\s\+(.+)$/g, '').replace(/\s/, 'T');
			this.endTime = new Date(this.countdownEnd).getTime();
			if (this.resRecord != null) {
				this.progress = this.resRecord.progress;
				this.awardType = this.resRecord.awardType;
				this.awardId = this.resRecord.awardId;
				this.awardAmout = this.resRecord.amout;
			}
			if (this.resRecord == null) {
				this.extractionStatus = false;
				this.successShow = true;
				this.systemAssistance = false;
				if (_isMobile()) {
					this.startCountdown();
				}
			} else if (this.awardId != 0 && this.progress != 100) {
				this.extractionStatus = true;
			} else if (this.awardId != 0 && this.progress == 100 && this.awardType == 2) {
				this.extractionStatus = true;
			} else if (this.awardId != 0 && this.progress == 100 && this.awardType == 1) {
				if (_isMobile()) {
					this.extractionStatus = false;
					this.successShow = false;
					this.grayPopShow = true;
					this.prizeShow = false;
				}
				this.pcTurntable = true;
			}
		}
	}

	// 发起抽奖
	public async getLuckyWheelLottery() {
		const res = await luckyWheelLottery();
		if (res.code === 0) {
			this.awardType = res.data.data.type;
			this.awardAmout = res.data.data.amount;
			this.progress = res.data.data.progress;
			if (this.awardAmout == 0) {
				this.thankParticipation = true;
			}
			if (this.awardAmout == 0) {
				this.prizePictures = laugh;
			} else if (this.awardAmout > 0 && this.awardAmout < 100) {
				this.prizePictures = goldSmall;
			} else if (this.awardAmout == 100) {
				this.prizePictures = goldBig;
			}
			this.handleRandomNumber(this.awardAmout);
			this.aaa = true;
			this.btnActive = true;
		}
	}

	// 计算倒计时
	public calculateCountdown() {
		const now = new Date().getTime();
		const timeDifference = this.endTime - now;
	  
		const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
		const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
	  
		const formattedHours = hours < 10 ? `0${hours}` : `${hours}`; // 补零
		const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`; // 补零
		const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`; // 补零

		return `${days}天 ${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
	}

	// 生成指定区间的随机数
	public generateRandomNumber(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// 点击帮助按钮
	public onClickHelp() {
		let data = {
			show: true,
			html: `<p>${ t('turntable.LuckyTurntable') }</p><br><p>${ t('turntable.ruleText1') }</p><br><p>${ t('turntable.ruleText2') }</p><br><p>${ t('turntable.ruleText3') }</p><br><p>${ t('turntable.ruleText4') }</p><br><p>${ t('turntable.ruleText5') }</p>`
		}
		this.store.commit('setHowPlay', data);
	}

	// 处理随机数
	public handleRandomNumber(awardAmout: number): void {
		if (awardAmout == 1) {
			this.angle = this.generateRandomNumber(0, -62);
		} else if (awardAmout == 2) {
			this.angle = this.generateRandomNumber(-64, -123);
		} else if (awardAmout == 5) {
			this.angle = this.generateRandomNumber(-125, -179);
		} else if (awardAmout == 100) {
			this.angle = this.generateRandomNumber(178, 153);
		} else if (awardAmout == 0) {
			this.angle = this.generateRandomNumber(151, 91);
		} else if (awardAmout == 0.20) {
			this.angle = this.generateRandomNumber(89, 47);
		} else if (awardAmout == 0.50) {
			this.angle = this.generateRandomNumber(45, 1);
		}
		this.angle += 3600;
	}

	// 关闭总体显示状态
	@Emit('update')
	public closeOverallShow() {
		return false;
	}

	// 提取金币
	public withdrawCoins() {
		if (this.awardAmout != 0) {
			this.btnPrize = true;
			setTimeout(() => {
				if (_isMobile()) {
					router.replace("/m/home");
				} else {
					this.grayPopShow = false;
					this.closeOverallShow();
					this.getLuckyWheelRewardRecords();
				}
			}, 1700); // 2000毫秒，即3秒
		} else {
			if (_isMobile()) {
				router.replace("/m/home");
			} else {
				this.grayPopShow = false;
				this.closeOverallShow();
				this.getLuckyWheelRewardRecords();
			}
		}
	}

	// 邀请好友
	public inviteFriends() {
		this.grayPopShow = false;
		this.copy(this.ownerInvitation);
		this.successShow = true;
		this.systemAssistance = true;
		this.startCountdown();
		this.extractionStatus = true;
		this.getLuckyWheelRewardRecords();
	}
	
	// 开始倒计时
	public startCountdown() {
		this.threeCountdown = 3;
		this.countdownInterval = setInterval(() => {
			this.threeCountdown--;
			if (this.threeCountdown <= 0) {
				clearInterval(this.countdownInterval);
				if (this.pcCopyLink) {
					if (this.successShow) {
						this.successShow = false;
						this.closeOverallShow()
					}
				} else {
					this.successShow = false;
				}
			}
		}, 1000);
	}

	// 复制链接
	public async copy(likn: string) {
		try {
			await toClipboard(likn);
			if (_isMobile()) {
				NotifyS('您的推广链接复制成功，赶快去转发邀请好友注册吧');
			} else {
				Success({ offset: 100, message: '您的推广链接复制成功，赶快去转发邀请好友注册吧' });
			}
		} catch (e) {
			NotifyF(this.t('common.copyFail'));
		}
	}

	// PC端复制链接
	public async pcCopy(likn: string) {
		await toClipboard(likn);
		this.pcCopyLink = true;
		this.successShow = true;
		this.startCountdown();
	}

	// 关闭弹窗
	public close() {
		if (this.pcCopyLink) {
			this.successShow = false;
			this.closeOverallShow();
		} else {
			this.successShow = false;
		}
	}

	// 显示帮助界面
	public showHelper() {
		this.detailScreenShow = true;
	}

	// 开始抽奖
	public start() {
		this.getLuckyWheelLottery();
	}

	// 抽奖动画结束
	public a() {
		this.grayPopShow = true;
		this.prizeShow = true;
	}
}
