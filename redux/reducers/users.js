import { USER_COMPLETEDTASKS_CHANGE, USER_STATE_CHANGE } from '../constants';

const initialState = {
    currentUser: null,
    uncompletedTasks: [],
};

export const user = (state = initialState, action) => {
    console.log('THIS IS THE ACTION ---->>  ', action);
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser,
            };
        case USER_COMPLETEDTASKS_CHANGE:
            return {
                ...state,
                uncompletedTasks: action.uncompletedTasks,
            };
        default:
            return state;
    }
};
