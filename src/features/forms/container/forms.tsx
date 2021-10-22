import { CSSProperties, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Table, TableHead, TableRow, TableBody, TableCell, TableHeadingCell } from '../../../shared/component/table';
import { FormDetail, State } from '../../../shared/interface/interface';
import Modal from '../component/questionModal';
import { FormState } from '../interface/interface';
import { LTO_COLUMNS } from '../utility/utility';
import { setFormData } from '../store/forms.action';
import { APP_URL } from '../../../shared/utitlity/utility';

export interface ColumnsInfo {
	name: string;
	order: string;
	orderBy: string;
	className?: string;
	sort: boolean;
	style?: CSSProperties;
}

const Forms = () => {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch();
	const forms = useSelector<State, FormState['forms']>((state) => state.forms.forms);

	const onCreateForm = (item: FormDetail) => {
		setIsModalOpen(false);
		dispatch(setFormData([...forms, item]));
	};

	return (
		<div className='main-container'>

			<div className='form-container'>
				{console.log(forms, 'forms')}
				<button className='form-button' onClick={() => setIsModalOpen(!isModalOpen)}>
					Add Form
				</button>
				<h2 className='app-title'>Form Builder</h2>
				<Table>
					<TableHead>
						<TableRow>
							{LTO_COLUMNS.map((column: ColumnsInfo, index) => (
								<TableHeadingCell className='table-data' key={index}>
									{column.name}
								</TableHeadingCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{forms.length > 0 ? (
							forms.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{item.formName}</TableCell>
									<TableCell>
										<Link to={`${APP_URL.form}/${item.formUrl}`}>{item.formUrl}</Link>
									</TableCell>
									<TableCell>{new Date(item.createdAt).toLocaleDateString('en-US')}</TableCell>
									<TableCell>{item.responses.length}</TableCell>
								</TableRow>
							))
						)
							:
							(
								<TableRow>
									<TableCell colSpan={5}>
										<div className='no-data'>No Forms found</div>
									</TableCell>
								</TableRow>
							)
						}
					</TableBody>
				</Table>
				<Modal isModalOpen={isModalOpen} onCreateForm={onCreateForm} onClickCloseModal={() => setIsModalOpen(false)} />
			</div>
		</div>
	);
};

export default Forms;
