import { get as getLocation } from "./location";
import { getTimes } from "suncalc";

const localStorageKey = "theme";
const themes = {
	light: "light",
	dark: "dark",
};

function get(cb: (isLight: boolean) => void): void {
	const localStorageTheme = localStorage[localStorageKey];

	if (localStorageTheme == themes.light) {
		cb(true);
	} else if (localStorageTheme == themes.dark) {
		cb(false);
	} else if (window.matchMedia) {
		cb(window.matchMedia("(prefers-color-scheme: light)").matches);
	} else {
		localStorage.removeItem(localStorageKey);

		getLocation((record) => {
			const now = new Date();

			if (record) {
				const latitude = record.latitude;
				const longitude = record.longitude;

				const sunTimes = getTimes(now, latitude, longitude);

				cb(sunTimes.sunrise <= now && now <= sunTimes.sunset);
			} else {
				const nowHours = now.getHours();

				cb(6 <= nowHours && nowHours <= 18);
			}
		});
	}
}

function set(isLight: boolean) {
	const vueApp = document.getElementById("app");

	const newTheme = isLight ? "light" : "dark";

	localStorage[localStorageKey] = newTheme;
	vueApp.className = newTheme;
}

export { get, set };
