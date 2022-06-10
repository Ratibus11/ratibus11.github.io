<template><div>Ecran d'accueil</div></template>

<script>
	import { onMounted } from "vue";

	export default {
		setup(props, context) {
			onMounted(() => {
				context.emit("mounted");
			});
		},
	};
</script>

<style></style>
