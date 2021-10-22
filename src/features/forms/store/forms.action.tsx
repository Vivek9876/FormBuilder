import { ThunkDispatch } from 'redux-thunk';

import { FormDetail } from '../../../shared/interface/interface';
import { SET_FORM_DATA } from '../../../shared/store/actionTypes';
import { createAction } from '../../../shared/utitlity/utility';

export const setFormData = (item: FormDetail[]) => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        localStorage.setItem('forms', JSON.stringify(item))
        dispatch(
            createAction(SET_FORM_DATA, {
                forms: item,
            })
        );
    };
};