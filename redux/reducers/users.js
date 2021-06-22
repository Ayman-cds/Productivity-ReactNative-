import {
    USER_COMPLETED_TASKS_CHANGE,
    USER_STATE_CHANGE,
    UPDATE_FOCUS_TIME,
} from '../constants';

const initialState = {
    currentUser: null,
    uncompletedTasks: [],
    focusTime: 0,
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser,
                uncompletedTasks: action.currentUser.uncompletedTasks,
            };
        case USER_COMPLETED_TASKS_CHANGE:
            return {
                ...state,
                uncompletedTasks: action.uncompletedTasks,
            };
        case UPDATE_FOCUS_TIME:
            return {
                ...state,
                focusTime: state.focusTime + action.focusTime,
            };
        default:
            return state;
    }
};
