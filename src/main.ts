import "./style.css";

import { View, type TemperatureUnit, type State } from "./types";
import { changeUnit, changeView } from "./handlers";

const state: State = {
	query: null,

	loading: false,

	unit: "celsius",
	view: null,
};

const location = document.querySelector(
	"div.inputs > input#location",
) as HTMLInputElement;
const dateElem = document.querySelector(
	"div.inputs > input#initial_date",
) as HTMLInputElement;

document.querySelectorAll("nav.header > h2").forEach((elem) => {
	elem.addEventListener("click", () =>
		changeView(state, elem.firstElementChild?.textContent as keyof typeof View),
	);
});

document.querySelectorAll("h2.temperature > span.units").forEach((elem) => {
	const unit: TemperatureUnit =
		elem.textContent === "ºc" ? "celsius" : "feirenheit";
	elem.addEventListener("click", () => changeUnit(state, unit));
});

location.addEventListener("keypress", (e) => {
	if (e.key !== "Enter") return;

	const date = dateElem.value ? new Date(dateElem.value) : new Date();

	getWeatherData(location.value, date).then((json) => {
		state.query = {
			resolvedAddress: json.resolvedAddress,

			temperature: {
				temp: json.currentConditions.temp,
				tempmin: json.days[0].tempmin,
				tempmax: json.days[0].tempmax,
			},

			wind: {
				windgust: json.days[0].windgust,
				windspeed: json.days[0].windspeed,
			},

			rain: json.days[0].preciptype.includes("rain")
				? {
						precip: json.days[0].precip,
						precipprob: json.days[0].precipprob,
						precipcover: json.days[0].precipcover,
					}
				: {
						precip: 0,
						precipprob: 0,
						precipcover: 0,
					},
		};
		const body = document.querySelector("div.content > div.body");
		if (body?.children.length)
			body?.removeChild(body.children[body.children.length - 1]);

		const resolvedCity = document.createElement("p");
		resolvedCity.className = "resolved-city";
		resolvedCity.insertAdjacentHTML(
			"afterbegin",
			`Results for: <span class="city">${state.query.resolvedAddress}</span>`,
		);

		body?.appendChild(resolvedCity);

		state.view = View.Temperature;

		changeView(state, View[state.view] as keyof typeof View);

		console.log(state.query);
	});
});

function showSpinner() {}

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
