import firebase from 'firebase';
import {
    USER_COMPLETED_TASKS_CHANGE,
    USER_STATE_CHANGE,
    UPDATE_FOCUS_TIME,
    UPDATE_STATS,
} from '../constants';

// const days = {
//     1: 'Mon',
//     2: 'Tue',
//     3: 'Wed',
//     4: 'Thur',
//     5: 'Fri',
//     6: 'Sat',
//     7: 'Sun',
// };
const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDay();
    const dateNum = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${dateNum}/${month}/${year}/${day}`.split('/');
};

// use like this --> isSameDay(new Date(date), new Date(date))
const isSameDay = (first, second) =>
    first[0] === second[0] && first[1] === second[1] && first[2] === second[2];

// checks if the last focus time information is of the same day
const lastFocusDay = (lastFocusTime) => {
    let today = getCurrentDate();
    let lastFocusDate = lastFocusTime['date'];
    // console.log('TODAY ---->', today);
    // console.log('LAST FOCUS DATE ---->', lastFocusDate);
    if (isSameDay(lastFocusDate, today)) {
        return lastFocusTime;
    } else {
        return { time: 0, date: today };
    }
};
const initialState = {
    currentUser: null,
    uncompletedTasks: [],
    focusTime: null,
    stats: [],
    weeksStats: [0, 0, 0, 0, 0, 0, 0],
};
async function updateStatsDB(stats, focusTime) {
    await firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({ stats, lastFocusTime: focusTime });
}

const updateStats = (focusTime, stats) => {
    console.log('stats ======>>>', stats);
    console.log('stats ======>>>', focusTime);
    const { date, time } = focusTime;
    console.log('FOCUS TIME --->>>>', focusTime);
    if (stats.length) {
        let lastStat = stats[stats.length - 1];
        console.log('UPDATE STATS DATE--->>', lastStat);
        console.log('UPDATE STATS DATE--->>', date);
        if (isSameDay(lastStat.date, date)) {
            console.log('I AM HEREEEEEE IT IS THE SAME DAY');
            lastStat.time = time;
        } else {
            stats.push(focusTime);
            console.log('I AM HEREEEEEE IT IS NOT THE SAME DAY');
        }
    } else {
        stats.push(focusTime);
        console.log('I AM HEREEEEEE STATS.LENGTH IS FALSY');
    }
    updateStatsDB(stats, focusTime);
    return stats;
};

const weeksStats = (stats) => {
    let newStats = [0, 0, 0, 0, 0, 0, 0];
    stats.forEach((stats) => {
        newStats[parseInt(stats['date'][3]) - 1] = stats['time'];
    });
    console.log('NEW STATS FROM REDUCER --->', newStats);
    return newStats;
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser,
                uncompletedTasks: action.currentUser.uncompletedTasks,
                focusTime: lastFocusDay(action.lastFocusTime),
                stats: action.currentUser.stats,
                weeksStats: weeksStats(action.currentUser.stats),
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
                    time: state.focusTime ? state.focusTime.time + 1 : 0 + 1,
                },
            };
        case UPDATE_STATS:
            return {
                ...state,
                stats: updateStats(state.focusTime, state.stats),
                weeksStats: weeksStats(state.stats),
            };
        default:
            return state;
    }
};
