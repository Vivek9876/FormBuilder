import { FormDetail } from "../../../shared/interface/interface";

export interface FormState {
    forms: FormDetail[];
}

export interface Options {
    label: string;
    value: string;
}
export interface FormNameformSchema {
    formName: {
        type: string,
        label: string,
        required: boolean,
        options: Options[];
    },
}