import { useState } from 'react';
import * as Yup from 'yup';

import { Form, SubmitButton } from '../../../shared/component/element';
import { SchemaMap } from '../../../shared/interface/interface';
import { getFormElement } from '../../../shared/utitlity/utility';

const formNameformSchema: SchemaMap = {
	formName: {
		type: 'text',
		label: 'Form Name',
		required: true,
	},
};

const FormName: React.FC<{ setFormName: (item: string) => void; formName: string }> = (props) => {
	const [isEditMode, setIsEditMode] = useState(true);

	const onSubmit = (values: { formName: string }) => {
		setIsEditMode(false);
		props.setFormName(values.formName);
	};

	return (
		<div className='form-name-container'>
			{isEditMode ? (
				<>
					<Form
						enableReinitialize
						initialValues={{ formName: props.formName }}
						validationSchema={validationSchema}
						className='content'
						onSubmit={onSubmit}
					>
						{Object.keys(formNameformSchema).map((key) => (
							<>
								{console.log('formSchemea', formNameformSchema[key])}
								<div key={key}>{getFormElement(key, formNameformSchema[key])}</div>
							</>
						))}
						<SubmitButton className='submit-button' title='Submit' />
					</Form>
				</>
			) : (
				<>
					<span>{props.formName} : </span>
					<button className='edit-button' onClick={() => setIsEditMode(true)}>
						Edit Name
					</button>
				</>
			)}
		</div>
	);
};

const validationSchema = Yup.object().shape({
	formName: Yup.string().required('Required!'),
});

export default FormName;
