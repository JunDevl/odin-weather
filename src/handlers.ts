import { View, type TemperatureUnit, type State } from "./types";

export function changeView(
	state: State,
	targetView: keyof typeof View,
	e?: MouseEvent,
) {
	if ((state.view && View[state.view] === targetView) || !state.query) return;

	if (e) {
		const prevSelected = document.querySelector("nav.header > h2.selected");

		if (e.currentTarget === prevSelected || e.target !== e.currentTarget)
			return;

		prevSelected?.classList.remove("selected");
		(e.currentTarget as HTMLElement).classList.add("selected");
	}

	state.view = View[targetView];

	const temperatureUnit = state.unit === "celsius" ? "ºc" : "ºF";

	const body = document.querySelector(
		"div.content > div.body",
	) as HTMLDivElement;
	if (body.children.length > 1)
		body.removeChild(body.children[body.children.length - 1]);

	switch (targetView) {
		case "Temperature": {
			const tempView = document.createElement("div");
			tempView.className = "temperature view";

			const tempContainer = document.createElement("div");
			tempContainer.className = "temp";

			const currentTemp = document.createElement("p");
			currentTemp.className = "current-temp pop";
			currentTemp.insertAdjacentHTML(
				"afterbegin",
				`<span class="cur-temp">${state.query?.temperature.temp}</span>${temperatureUnit}`,
			);

			const minTemp = document.createElement("p");
			minTemp.className = "minimum-temp";
			minTemp.insertAdjacentHTML(
				"afterbegin",
				`Min: <span class="min-temp">${state.query?.temperature.tempmin}</span>${temperatureUnit}`,
			);

			const maxTemp = document.createElement("p");
			maxTemp.className = "maximum-temp";
			maxTemp.insertAdjacentHTML(
				"afterbegin",
				`Max: <span class="max-temp">${state.query?.temperature.tempmax}</span>${temperatureUnit}`,
			);

			[currentTemp, minTemp, maxTemp].forEach((child) => {
				tempContainer.appendChild(child);
			});

			tempView.appendChild(tempContainer);

			body.appendChild(tempView);

			break;
		}
		case "Wind": {
			const windView = document.createElement("div");
			windView.className = "wind view";

			const windContainer = document.createElement("div");
			windContainer.className = "wind";

			const avgSpeed = document.createElement("p");
			avgSpeed.className = "avg-day-speed pop";
			avgSpeed.insertAdjacentHTML(
				"afterbegin",
				`Wind: <span class="wind-speed">${state.query.wind.windspeed}</span>km/h`,
			);

			const windGust = document.createElement("p");
			windGust.className = "max-wind-gust";
			windGust.insertAdjacentHTML(
				"afterbegin",
				`Wind Gust: <span class="wind-gust">${state.query.wind.windgust}</span>km/h`,
			);

			[avgSpeed, windGust].forEach((child) => {
				windContainer.appendChild(child);
			});

			windView.appendChild(windContainer);

			body.appendChild(windView);

			break;
		}
		case "Rain": {
			const rainView = document.createElement("div");
			rainView.className = "rain view";

			const rainContainer = document.createElement("div");
			rainContainer.className = "rain";

			const rain = document.createElement("p");
			rain.className = "rain pop";
			rain.insertAdjacentHTML(
				"afterbegin",
				`Rain: <span class="precipitaion">${state.query.rain.precip}</span>mm`,
			);

			const probability = document.createElement("p");
			probability.className = "rain-probability";
			probability.insertAdjacentHTML(
				"afterbegin",
				`Probability: <span class="probability">${state.query.rain.precipprob}</span>%`,
			);

			const coverage = document.createElement("p");
			coverage.className = "coverage";
			coverage.insertAdjacentHTML(
				"afterbegin",
				`City Coverage: <span class="city-coverage">${state.query.rain.precipcover}</span>%`,
			);

			[rain, probability, coverage].forEach((child) => {
				rainContainer.appendChild(child);
			});

			rainView.appendChild(rainContainer);

			body.appendChild(rainView);
			break;
		}
	}
}

export function changeUnit(
	state: State,
	targetUnit: TemperatureUnit,
	e: MouseEvent,
) {
	const prevSelected = document.querySelector(
		"span.units > span.selected",
	) as HTMLElement;
	const current = e.currentTarget as HTMLElement;

	if (current === prevSelected) return;

	prevSelected?.classList.remove("selected");
	current.classList.add("selected");

	const units = document.querySelector("span.units") as HTMLSpanElement;

	if (targetUnit === "celsius") {
		units.style.setProperty("--highlight-right", "auto");
		units.style.setProperty("--highlight-left", "0");
		state.unit = "celsius";
	} else {
		units.style.setProperty("--highlight-right", "0");
		units.style.setProperty("--highlight-left", "auto");
		state.unit = "feirenheit";
	}

	if (!state.query) return;

	if (state.query.temperature.temp !== "")
		state.query.temperature.temp = convertUnits(
			Number(state.query?.temperature.temp),
			targetUnit,
		);

	state.query.temperature.tempmin = convertUnits(
		Number(state.query?.temperature.tempmin),
		targetUnit,
	);
	state.query.temperature.tempmax = convertUnits(
		Number(state.query?.temperature.tempmax),
		targetUnit,
	);

	changeView(state, View[state.view] as keyof typeof View);
}

function convertUnits(origin: number, targetUnit: TemperatureUnit) {
	const calc =
		targetUnit === "celsius" ? (origin - 32) / 1.8 : origin * 1.8 + 32;

	const result = calc.toFixed(1);
	return result;
}
