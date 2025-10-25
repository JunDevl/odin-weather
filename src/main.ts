import "./style.css";

const location = document.querySelector("input.location") as HTMLInputElement;
const date1 = document.querySelector("input.initial_date") as HTMLInputElement;
const date2 = document.querySelector("input.final_date") as HTMLInputElement;
const result = document.querySelector("p.result") as HTMLParagraphElement;

document.addEventListener("keypress", (e) => {
	if (e.key !== "Enter") return;

	let dates: Date[] = [];

	if (!date1.value) {
		dates = [new Date()];
	} else {
		dates = date2.value
			? [new Date(date1.value), new Date(date2.value)]
			: [new Date(date1.value)];
	}

	getWeatherData(location.value, dates).then((json) => {
		result.textContent = JSON.stringify(json);
	});
});

async function getWeatherData(location: string, dates: Date[]) {
	if (dates.length > 2)
		throw new Error(
			"Only two dates are allowed to be passed as arguments of this function.",
		);

	const date1 = Math.floor(Number(dates[0]) / 1000);
	const date2 = dates[1] ? Math.floor(Number(dates[1]) / 1000) : date1;

	try {
		const weatherOfLocation = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2}?unitGroup=metric&key=${process.env.API_KEY}`,
		);
		const weatherJson = await weatherOfLocation.json();

		return weatherJson;
	} catch (error) {
		console.dir(error);
	}
}
