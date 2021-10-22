import { FormState } from "../../features/forms/interface/interface";

export interface Action {
	type: string;
	payload: any;
}

export interface State {
	forms: FormState;
};


export interface Schema {
	type: string;
	label: string;
	required: true;
	options?: {
		label: string;
		value: string;
	}[];
	value?: string;
}

export interface SchemaMap { [key: string]: Schema; }

export interface FormDetail {
	createdAt: number;
	formBody: { [key: string]: Schema; };
	formName: string;
	formUrl: string;
	responses: Record<string, any>[];
}