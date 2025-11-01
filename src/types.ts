export interface State {
	query: {
		resolvedAddress: string;

		temperature: {
			temp: number;
			tempmin: number;
			tempmax: number;
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
	view: View | null;
}

export enum View {
	Temperature,
	Wind,
	Rain,
}

export type TemperatureUnit = "celsius" | "feirenheit";
