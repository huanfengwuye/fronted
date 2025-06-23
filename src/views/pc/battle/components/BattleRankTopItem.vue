<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { ref } from 'vue'

const top = defineProps( [ 'rank' ] )
</script>
<template>
	<div :class="[ 'top-container' ]">
		<slot></slot>
	</div>
</template>
<style lang="scss">
</style>