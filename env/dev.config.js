import { DeviceType } from "@/util/util";


//pnpm run build 正式包
// pnpm run staging 测试包
///	开发服
export const url = import.meta.env.MODE === 'development' || import.meta.env.MODE === 'staging' ? 'https://testapi.mskins.com' : "https://api.mskins.com";
export const wsurl = import.meta.env.MODE === 'development' || import.meta.env.MODE === 'staging' ? 'wss://testapi.mskins.com/gate' : "wss://api.mskins.com/gate";

//设备类型  0.默认 1.pc 2.h5 3.android 4.ios
export const runDeviceType = DeviceType.h5;

//打包渠道用于app 199 baidu
let buildChannel = "mskins";

export const localAndroidVersion = "1.9.0";

//默认平台
export const defaultPlatformId = 1;
//默认渠道
export const defaultChannelCode = "DEFAULT";

//siteUrl
let officailAppSiteUtl = "https://mskins.com";
let bdAppSiteUtl = "https://bd.mskins.com";


function getSiteUrl() {
  let url = location.origin;
  if (runDeviceType == DeviceType.android || runDeviceType == DeviceType.ios) {
	if (buildChannel == "baidu") {
	  url = bdAppSiteUtl;
	} else {
	  url = officailAppSiteUtl;
	}
  }
  return url;
}
export const siteUrl = getSiteUrl();

function getRuterHistoryType() {
  let type = 1;
  if (runDeviceType == DeviceType.h5 || runDeviceType == DeviceType.pc) {
	if (buildChannel == "baidu") {
	  type = 2;
	}
  }
  return type;
}
export const routerHistoryType = getRuterHistoryType();

//token key
export const tokenName = "mskins_token";
