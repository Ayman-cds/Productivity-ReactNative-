import firebase from 'firebase';
import {
    USER_COMPLETED_TASKS_CHANGE,
    USER_STATE_CHANGE,
    UPDATE_FOCUS_TIME,
    UPDATE_STATS,
} from '../constants';

const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// use like this --> isSameDay(new Date(date), new Date(date))
const isSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

// checks if the last focus time information is of the same day
const lastFocusDay = (lastFocusTime) => {
    let today = getCurrentDate();
    let lastFocusDate = lastFocusTime;
    console.log('TODAY ---->', today);
    console.log('LAST FOCUS DATE ---->', new Date(lastFocusDate));
    if (isSameDay(new Date(lastFocusDate), new Date(today))) {
        return lastFocusTime;
    } else {
        return { time: 0, date: today };
    }
};
const initialState = {
    currentUser: null,
    uncompletedTasks: [],
    focusTime: { time: 0, date: getCurrentDate() },
    stats: [],
};
async function updateStatsDB(stats, focusTime) {
    await firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({ stats, lastFocusTime: focusTime });
}

const updateStats = (focusTime, stats) => {
    const { date, time } = focusTime;
    if (stats.length) {
        let lastStat = stats[stats.length - 1];
        if (isSameDay(new Date(lastStat.date), new Date(date))) {
            lastStat.time = time;
        } else {
            stats.push(focusTime);
        }
    } else {
        stats.push(focusTime);
    }
    updateStatsDB(stats, focusTime);
    return stats;
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser,
                uncompletedTasks: action.currentUser.uncompletedTasks,
                focusTime: lastFocusDay(state.focusTime),
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
