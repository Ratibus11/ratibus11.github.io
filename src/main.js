import { createApp } from "vue";
import { get, set } from "@ts/theme.ts";

import App from "./vue/App.vue";

const app = createApp(App);

get((isLight) => {
	set(isLight);
	console.log(isLight ? "C'est clair !" : "Where lumière?");
	app.config.globalProperties.msg = isLight;
	app.mount("#app");
});
