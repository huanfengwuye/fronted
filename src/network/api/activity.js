import axios from '../axios'

export function getConsumeReward(data) {
	return axios({
		url: '/api/activity/getConsumeReward',
		method: 'post',
		data
	})
}

export function getFestivalResult(data) {
	return axios({
		url: '/api/activity/getFestivalResult',
		method: 'post',
		data
	})
}

export function getTodayConsume(data) {
	return axios({
		url: '/api/activity/getTodayConsume',
		method: 'post',
		data
	})
}

export function joinFestival(data) {
	return axios({
		url: '/api/activity/joinFestival',
		method: 'post',
		data
	})
}

/// 获取印花奖品列表
export function getRewardList( data )
{
	return axios({
		url : '/api/sticker/getRewardList',
		method : 'post',
		data
	})
}

/// 兑换奖品
export function exchangeReward( data )
{
	return axios( {
		url : '/api/user/stickerReward',
		method : 'post',
		data
	} )
}

/// 获取今日充值金额
export function getTodayRecharge( data )
{
	return axios({
		url : '/api/activity/getTodayRecharge',
		method : 'post',
		data
	})
}

/// 获取幸运转盘奖项记录
export function getLuckyWheelRewardRecords()
{
	return axios({
		url : '/api/activity/getLuckyWheelRewardRecord',
		method : 'post'
	})
}

/// 幸运转盘抽奖
export function luckyWheelLottery()
{
	return axios({
		url : '/api/activity/luckyWheelLottery',
		method : 'post'
	})
}

/// 任务中心数据获取
export function getMissionProgress()
{
	return axios({
		url : '/api/activity/missionProgress',
		method : 'post'
	})
}

/// 任务中心数据获取
export function missionReward(data)
{
	return axios({
		url : '/api/activity/missionReward',
		method : 'post',
		data
	})
}

/// 碎片兑奖记录数据获取
export function getAllStickerRewardRecords(data)
{
	return axios({
		url : '/api/activity/getAllStickerRewardRecords',
		method : 'post',
		data
	})
}