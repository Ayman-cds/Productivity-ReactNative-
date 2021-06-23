import {
    USER_COMPLETED_TASKS_CHANGE,
    USER_STATE_CHANGE,
    UPDATE_FOCUS_TIME,
    UPDATE_STATS,
} from '../constants';

const getCurrentDate = () => {
    var date = new Date();
    return date;
};
var date1 = new Date(getCurrentDate());
const initialState = {
    currentUser: null,
    uncompletedTasks: [],
    focusTime: { time: 0, date: getCurrentDate() },
    stats: [],
};

const updateStats = (focusTime, stats) => {
    const { date, time } = focusTime;
    if (stats.length) {
        let lastStat = stats[stats.length - 1];
        let lastStatDate = new Date(lastStat.date);
        if (lastStat.date === lastStatDate) {
            lastStat.time = time;
        } else {
            stats.push(focusTime);
        }
    } else {
        stats.push(focusTime);
    }

    return stats;
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
                focusTime: {
                    ...state.focusTime,
                    time: state.focusTime.time + 1,
                },
            };
        case UPDATE_STATS:
            return {
                ...state,
                stats: updateStats(state.focusTime, state.stats),
            };
        default:
            return state;
    }
};
