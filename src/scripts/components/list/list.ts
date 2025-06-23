import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component
export default class List extends Vue
{
	public el!: HTMLElement | null

	@Prop( { default : false } )
	public loading: boolean = false
	@Prop( { default : false } )
	public finished: boolean = false
	@Prop( { default : 100 } )
	public offset: number = 100

	@Prop()
	public onLoad!: Function

	@Prop()
	public parent!: any

	@Prop({ default: 'list-load-component--container' })
	public id: string = 'list-load-component--container'

	public event!: any

	public win!: HTMLElement | any

	public mounted()
	{
		this.el = document.querySelector( `#${this.id}` )

		this.win = !this.parent ? window : this.el! //document.querySelector( this.parent )

		this.event = this.scrollEvent.bind( this )
		this.win.addEventListener( 'scroll', this.event )
	}

	public destroyed()
	{
		window.$dev && console.log( 'destroyed' )
		this.win.removeEventListener( 'scroll', this.event )
	}

	public unmounted()
	{
		window.$dev && console.log( 'unmounted' )
		this.win.removeEventListener( 'scroll', this.event, false )
		// this.destroyed()
	}

	public scrollEvent( e: Event )
	{

		// window.$dev && console.log( '在list组件中this.loading',this.loading )

		if( this.loading || this.finished || this.el?.scrollHeight == 0 ) return

		let scroll = this.el?.scrollHeight
		let top: any = ""
		if(!this.parent){
			top = document.documentElement.scrollTop || document.body.scrollTop
		}else{
			top = this.win.scrollTop || this.win.scrollTop
		}
		window.$dev && console.log( scroll, top, this.offset)
		if( scroll as number - top < this.offset ) this.onLoad()
	}
}