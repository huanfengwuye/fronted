import axios from "../axios";

export function exchangeGoods(data) {
	return axios({
		url: "/api/extend/exchangeGoods",
		method: "post",
		data,
	});
}

export function getExchangeGoods(data) {
	return axios({
		url: "/api/extend/getExchangeGoods",
		method: "post",
		data,
	});
}

export function userRucksackWeaponsExchange(data) {
	return axios({
		url: "/api/extend/userRucksackWeaponsExchange",
		method: "post",
		data,
	});
}

export function getPointRank(data) {
	return axios({
		url: "/api/rank/getRankList",
		method: "post",
		data,
	});
}

export function refineGoods(data) {
	return axios({
		url: "/api/extend/userRefineGoods",
		method: "post",
		data,
	});
}

export function getRefineWaterList(data) {
	return axios({
		url: "/api/extend/getRefineWaterList",
		method: "post",
		data,
	});
}


// export function getExchangeGoods(data) {
// 	return axios({
// 		url: "/api/extend/getExchangeGoods",
// 		method: "post",
// 		data,
// 	});
// }



