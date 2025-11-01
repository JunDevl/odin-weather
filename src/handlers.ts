import { View, type TemperatureUnit, type State } from "./types";

export function changeView(state: State, targetView: keyof typeof View) {
	if ((state.view && View[state.view] === targetView) || !state.query) return;

	state.view = View[targetView];

	const body = document.querySelector(
		"div.content > div.body",
	) as HTMLDivElement;
	if (body.children.length > 1)
		body.removeChild(body.children[body.children.length - 1]);

	switch (targetView) {
		case "Temperature": {
			const tempView = document.createElement("div");
			tempView.className = "temperature view";

			const representationImg = document.createElement("img");
			representationImg.src = "#";
			representationImg.alt = "Climate Image";
			representationImg.className = "representation";

			const tempContainer = document.createElement("div");
			tempContainer.className = "temp";

			const currentTemp = document.createElement("p");
			currentTemp.className = "current-temp pop";
			currentTemp.insertAdjacentHTML(
				"afterbegin",
				`<span class="cur-temp">${state.query?.temperature.temp}ºc</span>`,
			);

			const minTemp = document.createElement("p");
			minTemp.className = "minimum-temp";
			minTemp.insertAdjacentHTML(
				"afterbegin",
				`Min: <span class="min-temp">${state.query?.temperature.tempmin}</span>ºc`,
			);

			const maxTemp = document.createElement("p");
			maxTemp.className = "maximum-temp";
			maxTemp.insertAdjacentHTML(
				"afterbegin",
				`Max: <span class="max-temp">${state.query?.temperature.tempmax}</span>ºc`,
			);

			[currentTemp, minTemp, maxTemp].forEach((child) => {
				tempContainer.appendChild(child);
			});

			[representationImg, tempContainer].forEach((viewChild) => {
				tempView.appendChild(viewChild);
			});

			body.appendChild(tempView);

			break;
		}
		case "Wind": {
			const windView = document.createElement("div");
			windView.className = "wind view";

			const representationImg = document.createElement("img");
			representationImg.src = "#";
			representationImg.alt = "Wind Image";
			representationImg.className = "representation";

			const windContainer = document.createElement("div");
			windContainer.className = "wind";

			const avgSpeed = document.createElement("p");
			avgSpeed.className = "avg-day-speed pop";
			avgSpeed.insertAdjacentHTML(
				"afterbegin",
				`Wind: <span class="wind-speed">${state.query.wind.windspeed}</span>ºc`,
			);

			const windGust = document.createElement("p");
			windGust.className = "max-wind-gust";
			windGust.insertAdjacentHTML(
				"afterbegin",
				`Wind Gust: <span class="wind-gust">${state.query.wind.windgust}</span>ºc`,
			);

			[avgSpeed, windGust].forEach((child) => {
				windContainer.appendChild(child);
			});

			[representationImg, windContainer].forEach((viewChild) => {
				windView.appendChild(viewChild);
			});

			body.appendChild(windView);

			break;
		}
		case "Rain": {
			const rainView = document.createElement("div");
			rainView.className = "rain view";

			const representationImg = document.createElement("img");
			representationImg.src = "#";
			representationImg.alt = "Rain Image";
			representationImg.className = "representation";

			const rainContainer = document.createElement("div");
			rainContainer.className = "temp";

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
			coverage.className = "maximum-temp";
			coverage.insertAdjacentHTML(
				"afterbegin",
				`City Coverage: <span class="city-coverage">${state.query.rain.precipcover}</span>%`,
			);

			[rain, probability, coverage].forEach((child) => {
				rainContainer.appendChild(child);
			});

			[representationImg, rainContainer].forEach((viewChild) => {
				rainView.appendChild(viewChild);
			});

			body.appendChild(rainView);
			break;
		}
	}
}

export function changeUnit(state: State, targetUnit: TemperatureUnit) {
	if (targetUnit === "celsius") {
		document
			.querySelector("span.units > span.celsius")
			?.classList.add("selected");
		state.unit = "celsius";
		return;
	}

	document
		.querySelector("span.units > span.feirenheit")
		?.classList.add("selected");
	state.unit = "feirenheit";

	return;
}
