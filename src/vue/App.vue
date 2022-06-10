<template>
	<transition name="loadingScreen-fade">
		<LoadingScreen ref="loadingScreen" v-show="!isReady"></LoadingScreen>
	</transition>
	<Index @mounted="indexReady()"></Index>
</template>

<script>
	import { defineComponent } from "vue";

	import { get, set } from "@ts/theme";

	import LoadingScreen from "./components/LoadingScreen.vue";
	import Index from "./components/Index.vue";

	export default {
		data() {
			return {
				isReady: false,
			};
		},
		methods: {
			indexReady() {
				this.$refs.loadingScreen.drawLogo(100);
				setTimeout(() => {
					this.isReady = true;
				}, 500);
			},
		},
		beforeCreate() {
			get((isLight) => {
				set(isLight);
			});
		},
		components: {
			LoadingScreen,
			Index,
		},
	};
</script>

<style lang="scss">
	@import "@scss/main.scss";

	.loadingScreen-fade-enter-active,
	.loadingScreen-fade-leave-active {
		transition: opacity 0.5s;
	}
	.loadingScreen-fade-enter,
	.loadingScreen-fade-leave-to {
		opacity: 0;
	}
</style>
