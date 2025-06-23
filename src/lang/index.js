import { createI18n } from 'vue-i18n'
import zh_CN from './locales/zh_CN'
import en_US from './locales/en_US'
import ko_KR from './locales/ko_KR'
import vi_VN from './locales/vi_VN'
import zh_TW from './locales/zh_TW'

const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: localStorage.getItem( 'lang' ) || 'zh',//navigator.language,
	fallbackLocale: localStorage.getItem( 'lang' ) || 'zh',//navigator.language,
	messages: {
		'zh': zh_CN,
		'en': en_US,
		'vi': vi_VN,
		'ko': ko_KR,
		'tw': zh_TW
	}
})

export default i18n