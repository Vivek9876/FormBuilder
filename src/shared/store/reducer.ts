import { combineReducers } from 'redux';
import { State, Action } from '../interface/interface';
import FormReducer from '../../features/forms/store/forms.reducer';

const appReducer = combineReducers({
	forms: FormReducer,
});

const rootReducer = (state: State | undefined, action: Action): any => {
	return appReducer(state, action);
};

export default rootReducer;
