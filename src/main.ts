import "./style.css";

import { View, type TemperatureUnit, type State } from "./types";
import { changeUnit, changeView } from "./handlers";

const state: State = {
	unit: "celsius",
	view: View.Temperature,
};

const location = document.querySelector("input.location") as HTMLInputElement;
const dateElem = document.querySelector(
	"input.initial_date",
) as HTMLInputElement;

document.querySelectorAll("nav.header > h2").forEach((elem) => {
	//	elem.addEventListener("click", ());
});

document.addEventListener("keypress", (e) => {
	if (e.key !== "Enter") return;

	const date = dateElem.value ? new Date(dateElem.value) : new Date();

	getWeatherData(location.value, date).then((json) => {
		console.log(json);
		//result.textContent = JSON.stringify(json);
	});
});

async function getWeatherData(location: string, date: Date) {
	try {
		const dateString = date.toISOString();

		const weatherOfLocation = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${dateString}/${dateString}?unitGroup=metric&key=${process.env.API_KEY}`,
		);

		const weatherJson = await weatherOfLocation.json();

		return weatherJson;
	} catch (error) {
		console.dir(error);
	}
}
