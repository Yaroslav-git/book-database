import { combineReducers } from 'redux';
import { apiReducer } from './api/reducers';
import { userReducer } from './user/reducers';
import { bookEditFormReducer } from './bookEditForm/reducers';
import { bookListReducer } from './bookList/reducers';

export default combineReducers({
    api: apiReducer,
    user: userReducer,
    bookEditForm: bookEditFormReducer,
    bookList: bookListReducer
});