<template>
	<div><img id="logo" src="@svg/LB_path.svg" class="logo" /></div>
</template>

<script setup></script>

<style scoped lang="scss">
	#logo {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 30%;

		filter: var(--filter-to-background);
	}
</style>
