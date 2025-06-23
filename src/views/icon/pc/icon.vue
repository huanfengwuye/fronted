<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'

@Component
export default class IconManual extends Vue
{
	public icons =
	[
		'all', 'top', 'user', 'member', 'message', 'group', 'group-fill', 'red-packet', 'online',
		'arrow-down', 'arrow-left', 'arrow-right', 'grade', 'time', 'uphorn', 'wnhorn', 'mall',
		'mail', 'facebook', 'gold', 'goldh', 'goldj', 'container', 'instagram', 'youtube', 
		'dy', 'twtter', 'checkbox-off', 'checkbox-on', 'towards', 'lock', 'wallet', 'wallet-open',
		'app', 'chat', 'opendoor', 'back', 'ticket', 'copy', 'exchange', 'realname', 'box',
		'service', 'users', 'share', 'help', 'vip', 'password', 'email', 'revise', 'sort', 'tag',
		'packet', 'eye', 'link', 'volume', 'loadMore', 'loading', 'home', 'arrow-right-lite', 'gun',
		'search', 'close', 'down', 'up', 'sort-m', 'fav-fill', 'fav', 'steam', 'down-fill', 'prev',
		'next', 'loader', 'filter', 'help-circle', 'not-realname', 'rss', 'user-line', 'battle', 'right',
		'box-open', 'reload', 'shares','unlock','noUnlock','stock','customerService', 'clock', 'success'
	]

	public mounted()
	{
		this.icons.sort()
	}

	public copy( icon:string )
	{
		
	}
}
</script>
<template>
	<div class="icon-container">
		<div class="icon-item" v-for="( item, index ) in icons" :key="index">
			<div><Icon :name="item" color="#fff" size="32"></Icon></div>
			<div>{{ item }}</div>
		</div>
	</div>
</template>
<style lang="scss">
%dev
{
	border: 1px solid #444;
	box-sizing: border-box;
}

.icon-container
{
	display: flex;
	justify-content: center;
	// @extend %dev;
	padding-top: 60px;
	width: 100%;
	max-width: 1860px;
	flex-wrap: wrap;
	// background: rgba( 255, 255, 255, .1 );
	gap: -1px;

	.icon-item
	{
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		flex-direction: column;
		width: 120px;
		height: 120px;
		@extend %dev;

		div
		{
			&:last-child
			{
				color: #fff;
				font-size: 16px;
			}
		}
	}
}
</style>