import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';

export const Form = (props: any) => {
	return (
		<Formik {...props}>
			<FormikForm className='needs-validation' noValidate={false}>
				<div className={props.className}>{props.children}</div>
			</FormikForm>
		</Formik>
	);
}

export const TextField = (props: any) => {
	const { name, label, placeholder, ...rest } = props;
	return (
		<div>
			{label && (
				<label className={label === 'Form Name' ? 'form-name-label' : ''} htmlFor={name}>
					{label} :{' '}
				</label>
			)}
			<Field className='form-control' type='text' name={name} id={name} placeholder={placeholder || ''} {...rest} />
			<ErrorMessage name={name} render={(msg) => <div className='error-message'>{msg}</div>} />
		</div>
	);
}

export const RadioField = (props: any) => {
	const { label, name, options, ...rest } = props;
	return (
		<div className='d-flex'>
			<label htmlFor={name}>{label} : </label>
			<Field name={name} {...rest}>
				{({ field }: any) => {
					return options.map((option: any) => {
						return (
							<div className='radio-fields' key={option.label}>
								<input type='radio' id={option.label} {...field} value={option.value} checked={field.value === option.value} />
								<label htmlFor={option.label}>{option.label}</label>
							</div>
						);
					});
				}}
			</Field>
		</div>
	);
}

export function SelectField(props: any) {
	const { name, label, options, setFieldValue } = props;
	return (
		<>
			{label && <label htmlFor={name}>{label} : </label>}
			<Field
				as='select'
				id={name}
				name={name}
				onChange={(value: any) => {
					setFieldValue(name, value.target.value);
				}}
			>
				{options.map((optn: any, index: any) => (
					<option value={optn.value} label={optn.label || optn.value} />
				))}
			</Field>
			<ErrorMessage name={name} render={(msg) => <div style={{ color: 'red' }}>{msg}</div>} />
		</>
	);
}

export const SelectFormField = (props: any) => {
	const { name, label, options } = props;
	return (
		<>
			{label && <label htmlFor={name}>{label} : </label>}
			<Field as='select' id={name} name={name}>
				{options.map((optn: any) => (
					<option value={optn.value} label={optn.label || optn.value} />
				))}
			</Field>
			<ErrorMessage name={name} render={(msg) => <div style={{ color: 'red' }}>{msg}</div>} />
		</>
	);
}

export const SubmitButton = (props: any) => {
	const { title, ...rest } = props;

	return (
		<button className={props.className} type='submit' {...rest}>
			{title}
		</button>
	);
}

export const CancelButton = (props: any) => {
	const { title, onClick } = props;

	return (
		<button className='cancel-button' onClick={() => onClick()}>
			{title}
		</button>
	);
}
