import { createApp } from "vue";
import { get } from "@ts/theme.ts";

import App from "./vue/App.vue";

const app = createApp(App);
app.mount("#app");

get((isLight) => {
	console.log(isLight ? "C'est clair !" : "Where lumière?");
	app.config.globalProperties.msg = isLight;
});
