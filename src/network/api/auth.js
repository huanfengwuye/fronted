import axios from '../axios'

export function bindWechatPublic(data) {
	return axios({
		url: '/api/auth/bindWechatPublic',
		method: 'post',
		data
	})
}