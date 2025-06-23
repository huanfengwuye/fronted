<template>
	<div :id="id">
		<slot></slot>
		<div class="loading" v-if="loading">加载中...</div>
		<div class="finished" v-if="finished">没有更多了</div>
	</div>
</template>
<script lang="ts" src="@/scripts/components/list/list.ts"></script>
<style scoped lang="scss">
#list-load-component--container
{
	display: flex;
	flex-direction: column;

	.loading,
	.finished
	{
		display: flex;
		justify-content: center;
		color: #eee;
		padding: 24px 0 0 0;
	}
}
</style>