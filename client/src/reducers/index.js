import { combineReducers } from 'redux';
import authReducer from './authReducer';
import surveyReducer from './surveyReducer';
import { reducer as formReducer } from 'redux-form';

const reducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    survey: surveyReducer
});

export default reducer;