import * as Yup from 'yup';

import { TextField, RadioField, SelectFormField } from '../component/element';
import { Action, Schema, SchemaMap } from '../interface/interface';

export const createAction = (ACTION: string, data: any = null): Action => {
	return {
		type: ACTION,
		payload: data,
	};
};

export const getFormElement = (elementName: string, elementSchema: Schema) => {
	const props = {
		name: elementName,
		label: elementSchema.label,
		options: elementSchema.options,
		value: elementSchema.value,
	};

	if (elementSchema.type === 'text') {
		return <TextField {...props} />;
	}
	if (elementSchema.type === 'radio') {
		return <RadioField {...props} />;
	}
	if (elementSchema.type === 'select') {
		return <SelectFormField {...props} />;
	}
};

export const questionSchema: SchemaMap = {
	questionName: {
		type: 'text',
		label: 'Question Name',
		required: true,
	},
	questionType: {
		type: 'select',
		label: 'Question Type',
		required: true,
		options: [
			{
				label: 'Text',
				value: 'text',
			},
			{
				label: 'Radio',
				value: 'Radio',
			},
			{
				label: 'Multiple Choice',
				value: 'select',
			},
		],
	},
	questionOption: {
		type: 'text',
		label: 'Question Option',
		required: true,
	},
};

export const APP_URL = {
	root: '/',
	home: '/forms',
	form: '/form',
};

export const initForm = (formSchema: SchemaMap) => {
	let _formData: any = {};
	let _validationSchema: any = {};

	for (var key of Object.keys(formSchema)) {
		_formData[key] = '';

		if (formSchema[key].type === 'text') {
			_validationSchema[key] = Yup.string();
		} else if (formSchema[key].type === 'select') {
			_validationSchema[key] = Yup.string();
			if (formSchema[key].options) {
				_validationSchema[key].oneOf(formSchema[key].options?.map(o => o.value))
			}
		} else if (formSchema[key].type === 'radio') {
			_validationSchema[key] = Yup.string();
			if (formSchema[key].options) {
				_validationSchema[key].oneOf(formSchema[key].options?.map(o => o.value))
			}
		}

		if (formSchema[key].required) {
			_validationSchema[key] = _validationSchema[key].required('Required');
		}
	}
	return { _formData: _formData, validation: Yup.object().shape({ ..._validationSchema }) };
};
