export interface State {
	unit: TemperatureUnit;
	view: View;
}

export enum View {
	Temperature,
	Wind,
	Rain,
}

export type TemperatureUnit = "celsius" | "feirenheit";
