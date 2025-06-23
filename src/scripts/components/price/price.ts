import { _isMobile } from "@/util/common"
import { Component, Emit, Prop, Vue } from "vue-facing-decorator"

/**
 * example 1 > props :
 * <Price :value="item.price" color="#fff" before-color="#fff" before-size="20px"></Price>
 * 
 * example 2 > slot :
 * <Price>
 * 	<div #before>{{item.price.split( '.' )[0]}}.</div>
 * 	<div #after>{{item.price.split( '.' )[1]}}</div>
 * </Price>
 */
@Component
export default class Price extends Vue
{
	///	pc传值
	@Prop()
	public value!: string | number | boolean | undefined

	///	h5传值
	@Prop()
	public currency!: string | number | boolean | undefined

	@Prop({ default : '#fff' })
	public color!: string

	@Prop({ default : true })
	public showIcon: boolean = true

	@Prop({ default : '16px' })
	public size: string | number = '16px'

	@Prop()
	public beforeColor!: string | undefined

	@Prop()
	public afterColor!: string | undefined

	@Prop()
	public beforeSize!: string | number

	@Prop()
	public afterSize!: string | number

	///	隐藏小数点后面的值
	@Prop({ default : false })
	public hidePoint: boolean = false

	@Prop({ default : 400 })
	public fontWeight: number = 400

	///	const fontSize = computed( () => { return xxx } )
	public get iconSize()
	{
		return this.beforeSize ? this.beforeFontSize : this.fontSize
	}

	public get price()
	{
		// window.$dev && console.log(this.currency)
		return this.currency ? this.currency.toString() : this.value?.toString()
	}

	public get fontSize()
	{
		return `${ parseInt( <string>this.size ) }px`
		// return _isMobile() ? `${ parseInt( <string>this.size ) * 2 }px` : `${ parseInt( <string>this.size ) }px`
	}

	public get beforeFontSize()
	{
		let size = this.beforeSize ? this.beforeSize : this.size

		return `${ parseInt( <string>size ) }px`
		// return _isMobile() ? `${ parseInt( <string>size ) * 2 }px` : `${ parseInt( <string>size ) }px`
	}

	public get afterFontSize()
	{
		let size = this.afterSize ? this.afterSize : this.size

		return `${ parseInt( <string>size ) }px`
		// return _isMobile() ? `${ parseInt( <string>size ) * 2 }px` : `${ parseInt( <string>size ) }px`
	}
}