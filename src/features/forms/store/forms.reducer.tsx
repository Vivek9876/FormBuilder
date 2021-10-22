import { SET_FORM_DATA } from '../../../shared/store/actionTypes';
import { Action, FormDetail } from '../../../shared/interface/interface';
import { FormState } from '../interface/interface';

const forms: FormDetail[] = JSON.parse(localStorage.getItem('forms') || '[]');

const storageFlag = forms.length === 0;

const defaultIntialState: FormDetail[] = [];

if (storageFlag) {
	localStorage.setItem('forms', JSON.stringify(defaultIntialState));
}

const initialState: FormState = {
	forms: storageFlag ? defaultIntialState : forms
};

const reducer = (
	state: FormState = initialState,
	action: Action
): FormState => {
	switch (action.type) {
		case SET_FORM_DATA:
			console.log('action.payload.forms', action.payload.forms)
			return {
				...state,
				forms: action.payload.forms
			};
		default:
			return state;
	}
};

export default reducer;
