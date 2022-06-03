<template>
	<div ref="root">
		<img svg-inline class="logo" src="/assets/img/svg/LB_path.svg" />
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import "gsap";

	const root = ref(null);

	onMounted(() => {
		const timeLine = new gsap.timeline();
		const logo = root.value.getElementsByClassName("logo");

		timeLine.add(createLineTween(logo), "-=1");
	});

	function createLineTween(svg) {
		var pathObject = { length: 0, pathLength: svg.getTotalLength() };
		var tween = TweenLite.to(pathObject, 2, {
			length: pathObject.pathLength,
			onUpdate: drawLine,
			onUpdateParams: [pathObject, svg],
			immediateRender: true,
		});
		return tween;
	}

	function drawLine(obj, svg) {
		svg.style.strokeDasharray = [obj.length, obj.pathLength].join(" ");
	}
</script>

<style scoped lang="scss">
	.logo {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 30%;

		/*filter: var(--filter-to-background);*/
	}
</style>
