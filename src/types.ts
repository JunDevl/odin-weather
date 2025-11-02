export interface State {
	query: {
		resolvedAddress: string;

		temperature: {
			temp: string;
			tempmin: string;
			tempmax: string;
		};

		wind: {
			windspeed: number;
			windgust: number;
		};

		rain: {
			precip: number;
			precipprob: number;
			precipcover: number;
		};
	} | null;

	loading: boolean;

	unit: TemperatureUnit;
	view: View;
}

export enum View {
	Temperature,
	Wind,
	Rain,
}

export type TemperatureUnit = "celsius" | "feirenheit";
