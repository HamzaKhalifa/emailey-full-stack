import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from '../actions/types';

const initialState = {
    loading: false,
    user: null,
    error: ''
}

const fetchUser = (state, action) => {
    return {
        ...state,
        loading: true,
        user: null,
        error: ''
    }
}

const fetchUserSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        user: action.payload,
        error: ''
    }
}

const fetchUserError = (state, action) => {
    return {
        ...state,
        loading: false,
        user: null,
        error: action.payload
    }
}

const actionHandler = {
    [FETCH_USER]: fetchUser,
    [FETCH_USER_SUCCESS]: fetchUserSuccess,
    [FETCH_USER_ERROR]: fetchUserError
}

export default (state = initialState, action) => {
    const handler = actionHandler[action.type];

    return handler ? handler(state, action) : state;
}