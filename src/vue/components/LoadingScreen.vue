<template>
	<div>
		<img
			svg-inline
			ref="logoBlured"
			class="blured"
			src="/assets/img/svg/LB.svg"
		/>
		<img svg-inline ref="logoNonBlured" src="/assets/img/svg/LB.svg" />
	</div>
</template>

<script>
	import { get } from "@ts/cssGetter";
	import { toRad, scale } from "@ts/math";
	import * as $ from "jquery";

	export default {
		mounted() {
			this.$emit("mounted");

			this.drawLogo(0);
			this.drawLogo(50);
		},
		methods: {
			drawLogo(percent) {
				const angle = 45;

				const logoNonBlured = this.$refs["logoNonBlured"];
				const logoBlured = this.$refs["logoBlured"];

				const h = parseFloat(get(logoBlured, "height").slice(0, -2));
				const l = parseFloat(get(logoBlured, "width").slice(0, -2));
				const blurBorder =
					parseInt(get(logoBlured, "filter").slice(5, -3)) * 3;

				const a = { x: 0, y: 0 };
				const b = { x: l, y: 0 };
				const c = { x: l, y: h };
				const d = { x: 0, y: h };

				const blurZone = {
					height:
						Math.sqrt(
							Math.pow(d.y - a.y, 2) + Math.pow(d.x - a.x, 2)
						) +
						2 * blurBorder,
					large:
						Math.sqrt(
							Math.pow(b.y - a.y, 2) + Math.pow(b.x - a.x, 2)
						) +
						2 * blurBorder,
				};

				const separator = {
					height: blurZone.height,
					large:
						Math.sqrt(Math.pow(blurZone.height, 2)) *
						Math.tan(toRad(90 - angle)),
				};

				const s1 = {
					x: scale(
						percent,
						0,
						100,
						a.x - blurBorder,
						a.x - blurBorder + blurZone.large + separator.large
					),
					y: a.y - blurBorder,
				};
				const s2 = {
					x: scale(
						percent,
						0,
						100,
						a.x - blurBorder - separator.large,
						a.x - blurBorder + blurZone.large
					),
					y: d.y + blurBorder,
				};

				const ap = {
					x: scale(a.x - blurBorder, 0, l, 0, 100),
					y: scale(a.y - blurBorder, 0, h, 0, 100),
				};
				const bp = {
					x: scale(b.x + blurBorder, 0, l, 0, 100),
					y: scale(b.y - blurBorder, 0, h, 0, 100),
				};
				const cp = {
					x: scale(c.x + blurBorder, 0, l, 0, 100),
					y: scale(c.y + blurBorder, 0, h, 0, 100),
				};
				const dp = {
					x: scale(d.x - blurBorder, 0, l, 0, 100),
					y: scale(d.y + blurBorder, 0, h, 0, 100),
				};
				const s1p = {
					x: scale(s1.x, 0, l, 0, 100),
					y: scale(s1.y, 0, h, 0, 100),
				};
				const s2p = {
					x: scale(s2.x, 0, l, 0, 100),
					y: scale(s2.y, 0, h, 0, 100),
				};

				const polygonNonBlur = [ap, s1p, s2p, dp]
					.map((coordinate) => {
						return `${coordinate.x}% ${coordinate.y}%`;
					})
					.join(", ");
				const polygonBlur = [bp, s1p, s2p, cp]
					.map((coordinate) => {
						return `${coordinate.x}% ${coordinate.y}%`;
					})
					.join(", ");

				$(logoNonBlured).css("clip-path", `polygon(${polygonNonBlur})`);
				$(logoBlured).css("clip-path", `polygon(${polygonBlur})`);
			},
		},
	};
</script>

<style scoped lang="scss">
	@use "@scss/utils";

	$stroke-dasharray: 800;
	$animation-delay: 1ms;

	div {
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		background-color: var(--background-color);
	}

	[svg-inline] {
		@include utils.centerDiv;
		height: 20%;

		fill: var(--selfColor);
		transition: clip-path 1s;

		&.blured {
			filter: blur(10px);
		}

		&:not(.blured) {
			clip-path: circle(0);
		}
	}
</style>
