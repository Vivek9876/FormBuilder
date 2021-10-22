import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { Form, SubmitButton } from '../../../shared/component/element';
import { FormDetail, State } from '../../../shared/interface/interface';
import { FormState } from '../../forms/interface/interface';
import { getFormElement, initForm } from '../../../shared/utitlity/utility';
import { setFormData } from '../../forms/store/forms.action';

const Forms = () => {
	const [initialFormData, setInitialFormData] = useState({});
	const [validationSchema, setValidationSchema] = useState({});
	const params = useParams<{ id: string }>();
	const forms = useSelector<State, FormState['forms']>((state) => state.forms.forms);
	const dispatch = useDispatch();

	const formDetail = useMemo(() => forms.find(item => item.formUrl === params.id) as FormDetail, [forms, params.id]);
	const [formResponses, setFormResponses] = useState(formDetail.responses);

	useEffect(() => {
		const response = initForm(formDetail.formBody);
		setInitialFormData(response._formData);
		setValidationSchema(response.validation);
	}, []);

	const onSubmit = (values: { [key: string]: string; }, { resetForm }: { resetForm: any }) => {
		setFormResponses([...formResponses, values]);
		const index = forms.findIndex((item) => item.formUrl === params.id);
		forms[index] = { ...formDetail, responses: [...formResponses, values] };
		dispatch(setFormData(forms));
		resetForm();
	};

	return (
		<div className='form-container_2'>
			<h2>{formDetail.formName}</h2>
			<Form className='content_2' enableReinitialize initialValues={initialFormData} validationSchema={validationSchema} onSubmit={onSubmit}>
				{Object.keys(formDetail.formBody).map((key, ind) => (
					<div className='padding-10px' key={key}>
						{getFormElement(key, formDetail.formBody[key])}
					</div>
				))}
				<SubmitButton className='submit-button_2' title='Submit' />
			</Form>
		</div>
	);
}

export default Forms;
