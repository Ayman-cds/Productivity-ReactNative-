import firebase from 'firebase';
import {
    USER_COMPLETED_TASKS_CHANGE,
    USER_STATE_CHANGE,
    UPDATE_FOCUS_TIME,
    UPDATE_STATS,
    UPDATE_COMPLETED_TASKS_STATS,
} from '../constants';
export function fetchUser() {
    return (dispatch) => {
        if (firebase.auth().currentUser) {
            firebase
                .firestore()
                .collection('users')
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        dispatch({
                            type: USER_STATE_CHANGE,
                            currentUser: snapshot.data(),
                            lastFocusTime: snapshot.data().lastFocusTime,
                        });
                    } else {
                        console.log('THIS USER DOES NOT EXIST');
                    }
                });
        }
    };
}

export function updateUserTasks(tasks) {
    return (dispatch) => {
        firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update({ uncompletedTasks: tasks })
            .then(() => {
                dispatch({
                    type: USER_COMPLETED_TASKS_CHANGE,
                    uncompletedTasks: tasks,
                });
            });
    };
}
export function updateFocusTime() {
    return (dispatch) => {
        dispatch({
            type: UPDATE_FOCUS_TIME,
        });
    };
}

export function updateStats() {
    return (dispatch) => {
        dispatch({
            type: UPDATE_STATS,
        });
    };
}

export function updateCompletedTasks() {
    return (dispatch) => {
        dispatch({
            type: UPDATE_COMPLETED_TASKS_STATS,
        });
    };
}
