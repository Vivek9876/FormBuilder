import { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { SubmitButton, TextField, SelectField, CancelButton } from '../../../shared/component/element';
import FormName from './formName';
import { FormDetail } from '../../../shared/interface/interface';

const Modal: React.FC<{ isModalOpen: boolean; onClickCloseModal: (item: boolean) => void; onCreateForm: (item: FormDetail) => void }> = (props) => {

	const { isModalOpen, onClickCloseModal } = props;
	const [isQuestion, setIsQuestion] = useState(false);
	const [questionObj, setQuestionObj] = useState({});
	const [formName, setFormName] = useState('');
	const initialValue = { questionName: '', questionType: 'text', questionOption: '' };

	const onCreateForm = () => {
		props.onCreateForm({
			formName: formName,
			formUrl: `${new Date().getTime()}`,
			createdAt: new Date().getTime(),
			formBody: questionObj,
			responses: [],
		});
	};

	const onSubmit = (values: { [key: string]: string; }) => {
		if (values.questionType === 'text') {
			setQuestionObj({
				...questionObj,
				[values.questionName]: {
					type: values.questionType,
					label: values.questionName,
					required: true,
				},
			});
		} else {
			const options = values.questionOption.split(',').map(item => ({
				label: item,
				value: item,
			}));
			setQuestionObj({
				...questionObj,
				[values.questionName]: {
					type: values.questionType,
					label: values.questionName,
					required: false,
					options: options,
				},
			});
		}
	};


	return (
		<div className={isModalOpen ? 'modal' : ''}>

			<dialog className='sub_modal' style={{ width: '80%', height: 'auto', marginTop: 10, backgroundColor: '#eee' }} open={isModalOpen}>
				<span onClick={() => onClickCloseModal(false)} className='close'>
					&times;
				</span>
				<FormName setFormName={setFormName} formName={formName} />

				<button className='add-question-button' disabled={!formName} onClick={() => setIsQuestion(true)}>Add Question</button>


				{isQuestion && (
					<>
						<div className='question-form'>
							<Formik
								enableReinitialize={true}
								initialValues={initialValue}
								validationSchema={validationSchema}
								validateOnBlur={true}
								validateOnChange={true}
								onSubmit={onSubmit}
							>
								{({ handleSubmit, setFieldValue, values }) => (
									<form onSubmit={handleSubmit}>
										<fieldset className='row'>
											<div className='form-group col-xs-12 col-sm-12 col-md-4'>
												<TextField
													name='questionName'
													id='questionName'
													className={`form-control`}
													placeholder={'Question Name'}
													autoComplete={`off`}
													label='Question Name'
												/>
											</div>
											<div className='form-group col-xs-12 col-sm-12 col-md-4'>
												<SelectField
													name='questionType'
													id='questionType'
													options={[
														{
															label: 'Text',
															value: 'text',
														},
														{
															label: 'Radio',
															value: 'radio',
														},
														{
															label: 'Multiple Choice',
															value: 'select',
														},
													]}
													setFieldValue={setFieldValue}
													label='Question Type'
												/>
											</div>
											{(values.questionType === 'select' || values.questionType === 'radio') && (
												<div className='form-group col-xs-12 col-sm-12 col-md-4'>
													<TextField
														name='questionOption'
														id='questionOption'
														className={`form-control`}
														placeholder={'Question Option'}
														autoComplete={`off`}
														label='Enter Option Coma Seperated'
													/>
												</div>
											)}
											<div className='button-wrapper'>
												<SubmitButton title='Submit' />
												<CancelButton onClick={() => setIsQuestion(false)} title='Cancel' />
											</div>
										</fieldset>
									</form>
								)}
							</Formik>
						</div>
						<div className='text-align-center'>
							<button className='create-form-button' onClick={() => onCreateForm()}>Create Form</button>
						</div>
					</>
				)}

			</dialog>
		</div>
	);
};

export const validationSchema = Yup.object().shape({
	questionName: Yup.string().required('Require'),
	questionType: Yup.string().required('Require'),
	questionOption: Yup.string()
		.when('questionType', (questionType: string, schema: any) => {
			if (questionType === 'text') {
				return schema.optional().nullable();
			}
			return schema.required('Required');
		})
		.trim(),
});

export default Modal;
