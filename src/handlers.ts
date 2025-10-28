import { View, type TemperatureUnit, type State } from "./types";

export function changeView(state: State, targetView: View) {
	const content = document.querySelector("div.content") as HTMLDivElement;
	content.removeChild(content.lastChild as Node);

	switch (targetView) {
		case View.Temperature: {
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

			const minTemp = document.createElement("p");
			minTemp.className = "minimum-temp";

			const maxTemp = document.createElement("p");
			maxTemp.className = "maximum-temp";

			[currentTemp, minTemp, maxTemp].forEach((child) => {
				tempContainer.appendChild(child);
			});

			[representationImg, tempContainer].forEach((viewChild) => {
				tempView.appendChild(viewChild);
			});

			content.appendChild(tempView);

			break;
		}
		case View.Wind: {
			const windView = document.createElement("div");
			windView.className = "temperature view";

			const representationImg = document.createElement("img");
			representationImg.src = "#";
			representationImg.alt = "Wind Image";
			representationImg.className = "representation";

			const wind = document.createElement("p");
			wind.className = "current-wind pop";

			[representationImg, wind].forEach((viewChild) => {
				windView.appendChild(viewChild);
			});

			content.appendChild(windView);

			break;
		}
		case View.Rain: {
			const rainView = document.createElement("div");
			rainView.className = "temperature view";

			const representationImg = document.createElement("img");
			representationImg.src = "#";
			representationImg.alt = "Rain Image";
			representationImg.className = "representation";

			const rain = document.createElement("p");
			rain.className = "current-rain pop";

			[representationImg, rain].forEach((viewChild) => {
				rainView.appendChild(viewChild);
			});

			content.appendChild(rainView);
			break;
		}
	}

	state.view = targetView;
}

export function changeUnit(state: State, targetUnit: TemperatureUnit) {
	if (targetUnit === "celsius") {
		document.querySelector(".idk");
		return;
	}

	return;
}
