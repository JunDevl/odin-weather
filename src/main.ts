import "./style.css";

enum View {
	Temperature,
	Wind,
	Rain,
}

type TemperatureUnit = "celsius" | "feirenheit";

const currentUnit: TemperatureUnit = "celsius";
const currentView = View.Temperature;

const location = document.querySelector("input.location") as HTMLInputElement;
const dateElem = document.querySelector(
	"input.initial_date",
) as HTMLInputElement;
const result = document.querySelector("p.result") as HTMLParagraphElement;

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
