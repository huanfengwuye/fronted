import { Component, Prop, Vue } from 'vue-facing-decorator'
import defaultIcon from '@/assets/romimg/common/defaultIcon.png'
import anchorImgUrl from '@/assets/pcimg/battle/tv.png'
import { _isMobile } from '@/util/common'

@Component
export default class Avatar extends Vue
{
	@Prop()
	public userModel: any

	@Prop()
	public size!: number | string

	@Prop()
	public hideFrame: boolean = false

	public anchorImgUrl = anchorImgUrl
	public defaultIcon = defaultIcon

	public get isMobile()
	{
		return _isMobile()
	}
	
	public changeMyClass()
	{
		switch( this.size )
		{
			case 'm-head-200' 		: return 'm-head-200'; 			break
			case '120' 				: return "head_120";			break
			case 'header' 			: return "head_header"; 		break
			case 'one' 				: return "m-head-one";		 	break
			case 'two' 				: return "m-head-two"; 			break
			case 'three' 			: return "m-head-three"; 		break
			case 'four' 			: return "m-head-four"; 		break
			case 'five' 			: return "m-head-five"; 		break
			case 'history' 			: return "m-head-history"; 		break
			case 'battleDetail' 	: return "m-head-battleDetail"; break
			case 'timing' 			: return "m-head-timing"; 		break
			case 'open' 			: return "m-head-open"; 		break
			case 'item_pic' 		: return "m-head-itempic"; 		break
			case 'main_data' 		: return "m-head-maindata"; 	break
			case 'head_n_one' 		: return "head_n_one"; 			break
			case 'head_n_rank_t' 	: return "head_n_rank_t"; 		break
			default 				: return this.size; 			break
		}
	}

	public hasFrame()
	{
		return this.userModel.avaterFrame != 0 && this.userModel.avaterFrame != undefined
	}
}